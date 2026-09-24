import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';
import { supabase, getServiceSupabase } from '@/lib/supabase';
import { DEFAULT_RATES, RateItem } from '@/lib/defaultRates';

export const dynamic = 'force-dynamic';

const DATA_FILE = path.join(process.cwd(), 'data', 'rates.json');

async function readLocalRates(): Promise<RateItem[] | null> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw.replace(/^\uFEFF/, ''));
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch {}
  return null;
}

async function writeLocalRates(rates: RateItem[]) {
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(rates, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Failed writing local rates:', err);
  }
}

export async function GET() {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('rates')
        .select('*')
        .order('equipment_type', { ascending: true });

      if (!error && data && data.length > 0) {
        // Merge with DEFAULT_RATES badges/descriptions if not present in DB
        const merged = DEFAULT_RATES.map((def) => {
          const match = data.find(
            (d: any) => d.equipment_type?.toLowerCase() === def.equipment_type.toLowerCase()
          );
          if (match) {
            return {
              ...def,
              id: match.id,
              rate_percentage: match.rate_percentage || def.rate_percentage,
              flat_fee: match.flat_fee || def.flat_fee,
              updated_at: match.updated_at,
            };
          }
          return def;
        });

        return NextResponse.json({
          success: true,
          rates: merged,
          source: 'supabase',
        });
      }
    }

    const localData = await readLocalRates();
    if (localData) {
      return NextResponse.json({
        success: true,
        rates: localData,
        source: 'local_storage',
      });
    }

    return NextResponse.json({
      success: true,
      rates: DEFAULT_RATES,
      source: 'fallback',
    });
  } catch (error: any) {
    console.error('Error fetching rates:', error);
    return NextResponse.json({
      success: true,
      rates: DEFAULT_RATES,
      source: 'fallback_on_error',
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, rates } = body;
    let savedRates = rates;

    const expectedPassword = process.env.ADMIN_PASSWORD || 'otrdispatch2026';
    if (!password || password.trim() !== expectedPassword.trim()) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid Admin PIN / Password' },
        { status: 401 }
      );
    }

    if (!Array.isArray(rates) || rates.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Bad Request: Missing rates array' },
        { status: 400 }
      );
    }

    const client = getServiceSupabase() || supabase;

    if (client) {
      // Upsert into rates table
      const upsertRows = rates.map((r: RateItem) => ({
        equipment_type: r.equipment_type,
        rate_percentage: r.rate_percentage,
        flat_fee: r.flat_fee,
        updated_at: new Date().toISOString(),
      }));

      try {
        const { data, error } = await client
          .from('rates')
          .upsert(upsertRows, { onConflict: 'equipment_type' })
          .select();

        if (error) {
          console.warn('Supabase rates upsert notice:', error.message);
        } else if (data) {
          savedRates = data;
        }
      } catch (dbErr: any) {
        console.warn('Supabase network error, using local storage fallback:', dbErr.message);
      }
    }

    // Always persist to local file storage for reliability
    await writeLocalRates(savedRates);

    // Trigger Next.js cache revalidation for public pages
    try {
      revalidatePath('/');
      revalidatePath('/services');
      revalidatePath('/calculator');
    } catch (revalErr) {
      console.warn('Revalidation warning:', revalErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Dispatch fee matrix updated successfully live on the website!',
      rates,
    });
  } catch (error: any) {
    console.error('Rates POST error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
