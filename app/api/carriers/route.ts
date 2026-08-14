import { NextResponse } from 'next/server';

let demoCarriersStore = [
  {
    id: 'SWIFT-948201',
    carrier_id: 'SWIFT-948201',
    company_name: 'Patriot Freight Logistics LLC',
    contact_person: 'Robert Vance',
    phone: '+92 311 9811007',
    email: 'robert@patriotfreight.com',
    mc_dot_number: 'MC #1489201',
    equipment_type: "53' Dry Van",
    power_units_count: '1 Owner-Operator',
    home_base: 'Dallas, TX',
    preferred_lanes: 'TX Triangle, Midwest, Southeast',
    min_target_rpm: '3.40',
    status: 'New',
    created_at: '2026-08-12T14:30:00Z',
    assigned_dispatcher: 'Unassigned',
    notes: ['Submitted complete onboarding application with COI & W9.'],
    documents: { mcLetter: true, w9Form: true, coiCertificate: true },
  },
  {
    id: 'SWIFT-839202',
    carrier_id: 'SWIFT-839202',
    company_name: 'ColdChain Express LLC',
    contact_person: 'Sarah Jenkins',
    phone: '(800) 555-0244',
    email: 'sarah@coldchainexpress.com',
    mc_dot_number: 'MC #1294811',
    equipment_type: "Reefer 53' (Temp Control)",
    power_units_count: '3 Power Units',
    home_base: 'Atlanta, GA',
    preferred_lanes: 'GA → FL, GA → Midwest',
    min_target_rpm: '3.85',
    status: 'Contacted',
    created_at: '2026-08-12T11:15:00Z',
    assigned_dispatcher: 'David Miller (Senior)',
    notes: ['Called carrier. Driver prefers produce loads over $3.75/mi.', 'Factoring with RTS Capital confirmed.'],
    documents: { mcLetter: true, w9Form: true, coiCertificate: true },
  },
  {
    id: 'SWIFT-748303',
    carrier_id: 'SWIFT-748303',
    company_name: 'SteelHaul Transport Inc',
    contact_person: 'Marcus Rodriguez',
    phone: '(800) 555-0311',
    email: 'marcus@steelhaul.com',
    mc_dot_number: 'MC #948201',
    equipment_type: "Flatbed 48' / Step Deck",
    power_units_count: '5 Power Units',
    home_base: 'Birmingham, AL',
    preferred_lanes: 'AL → IN, Midwest Steel Corridors',
    min_target_rpm: '3.60',
    status: 'Onboarded',
    created_at: '2026-08-11T16:45:00Z',
    assigned_dispatcher: 'Alex Reed (Flatbed Desk)',
    notes: ['Agreement signed. First load booked: Birmingham to Gary, IN ($3,800 gross).'],
    documents: { mcLetter: true, w9Form: true, coiCertificate: true },
  },
  {
    id: 'SWIFT-639404',
    carrier_id: 'SWIFT-639404',
    company_name: 'SwiftRelay Drayage',
    contact_person: 'James Peterson',
    phone: '(800) 555-0488',
    email: 'james@swiftrelay.com',
    mc_dot_number: 'MC #1389402',
    equipment_type: 'Power Only',
    power_units_count: '1 Owner-Operator',
    home_base: 'Phoenix, AZ',
    preferred_lanes: 'AZ → CA, Southwest Regional',
    min_target_rpm: '3.10',
    status: 'Contacted',
    created_at: '2026-08-11T09:20:00Z',
    assigned_dispatcher: 'Sarah K. (Power Desk)',
    notes: ['Awaiting updated COI certificate listing $100k cargo coverage.'],
    documents: { mcLetter: true, w9Form: true, coiCertificate: false },
  },
  {
    id: 'SWIFT-529405',
    carrier_id: 'SWIFT-529405',
    company_name: 'Urban Expedite Lines',
    contact_person: 'Jerome Taylor',
    phone: '(800) 555-0566',
    email: 'jerome@urbanexpedite.com',
    mc_dot_number: 'MC #1402918',
    equipment_type: "Box Truck 26'",
    power_units_count: '2 Power Units',
    home_base: 'Charlotte, NC',
    preferred_lanes: 'NC → VA, Carolinas Expedited',
    min_target_rpm: '2.95',
    status: 'New',
    created_at: '2026-08-10T18:10:00Z',
    assigned_dispatcher: 'Unassigned',
    notes: ['Box truck operator looking for dock-to-dock LTL freight.'],
    documents: { mcLetter: true, w9Form: true, coiCertificate: true },
  },
];

export async function GET() {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      const res = await fetch(`${supabaseUrl}/rest/v1/carriers?select=*&order=created_at.desc`, {
        headers: {
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        cache: 'no-store',
      });

      if (res.ok) {
        const dbData = await res.json();
        return NextResponse.json({ success: true, carriers: dbData });
      }
    }

    const sorted = [...demoCarriersStore].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return NextResponse.json({
      success: true,
      mode: 'demo',
      carriers: sorted,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch carriers: ' + error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { carrierId, status, assignedDispatcher, note } = body;

    if (!carrierId) {
      return NextResponse.json({ success: false, error: 'carrierId is required' }, { status: 400 });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      const patchData: Record<string, any> = { updated_at: new Date().toISOString() };
      if (status) patchData.status = status;
      if (assignedDispatcher) patchData.assigned_dispatcher = assignedDispatcher;

      const res = await fetch(`${supabaseUrl}/rest/v1/carriers?carrier_id=eq.${carrierId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Prefer': 'return=representation',
        },
        body: JSON.stringify(patchData),
      });

      if (res.ok) {
        const updated = await res.json();
        return NextResponse.json({ success: true, carrier: updated[0] });
      }
    }

    demoCarriersStore = demoCarriersStore.map((c) => {
      if (c.carrier_id === carrierId || c.id === carrierId) {
        const updatedNotes = note ? [...c.notes, note] : c.notes;
        return {
          ...c,
          status: status || c.status,
          assigned_dispatcher: assignedDispatcher || c.assigned_dispatcher,
          notes: updatedNotes,
        };
      }
      return c;
    });

    const updatedCarrier = demoCarriersStore.find(
      (c) => c.carrier_id === carrierId || c.id === carrierId
    );

    return NextResponse.json({
      success: true,
      message: 'Carrier updated successfully',
      carrier: updatedCarrier,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to update carrier: ' + error.message },
      { status: 500 }
    );
  }
}
