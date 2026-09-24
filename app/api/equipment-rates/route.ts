import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';
import { supabase, getServiceSupabase } from '@/lib/supabase';
import { DEFAULT_EQUIPMENT_RATES, EquipmentRate } from '@/lib/defaultEquipmentRates';

export const dynamic = 'force-dynamic';

const DATA_FILE = path.join(process.cwd(), 'data', 'equipment-rates.json');

async function readLocalRates(): Promise<EquipmentRate[] | null> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw.replace(/^\uFEFF/, ''));
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch {}
  return null;
}

async function writeLocalRates(rates: EquipmentRate[]) {
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(rates, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Failed writing local equipment rates:', err);
  }
}

export async function GET() {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('equipment_rates')
        .select('*');

      if (!error && data && data.length > 0) {
        // Map in standard order matching DEFAULT_EQUIPMENT_RATES
        const ordered = DEFAULT_EQUIPMENT_RATES.map((def) => {
          const match = data.find(
            (d: any) => d.equipment_type?.toLowerCase() === def.equipment_type.toLowerCase()
          );
          if (match) {
            return {
              id: match.id,
              equipment_type: def.equipment_type,
              rate_per_mile: match.rate_per_mile || def.rate_per_mile,
              updated_at: match.updated_at,
            };
          }
          return def;
        });

        return NextResponse.json({
          success: true,
          rates: ordered,
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
      rates: DEFAULT_EQUIPMENT_RATES,
      source: 'fallback',
    });
  } catch (error: any) {
    console.error('Error in equipment-rates GET:', error);
    return NextResponse.json({
      success: true,
      rates: DEFAULT_EQUIPMENT_RATES,
      source: 'fallback_on_error',
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, rates } = body;

    const expectedPassword = process.env.ADMIN_PASSWORD || 'otrdispatch2026';
    if (!password || password.trim() !== expectedPassword.trim()) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid Admin Password' },
        { status: 401 }
      );
    }

    if (body.action === 'verify_password') {
      return NextResponse.json({ success: true, message: 'Password verified successfully' });
    }

    if (!Array.isArray(rates) || rates.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Bad Request: Missing rates array' },
        { status: 400 }
      );
    }

    const client = getServiceSupabase() || supabase;

    let savedRates = rates;

    if (client) {
      const upsertRows = rates.map((r: EquipmentRate) => ({
        equipment_type: r.equipment_type,
        rate_per_mile: r.rate_per_mile,
        updated_at: new Date().toISOString(),
      }));

      try {
        const { data, error } = await client
          .from('equipment_rates')
          .upsert(upsertRows, { onConflict: 'equipment_type' })
          .select();

        if (error) {
          console.warn('Supabase equipment_rates upsert notice:', error.message);
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
      message: 'Rates updated successfully live on the website!',
      rates: savedRates,
    });
  } catch (error: any) {
    console.error('equipment-rates POST error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
