import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      companyName,
      contactPerson,
      phone,
      email,
      mcDotNumber,
      powerUnitsCount,
      homeBaseCityState,
      equipmentType,
      maxPayloadCapacity,
      preferredLanes,
      minTargetRpm,
      agreeToTerms,
    } = body;

    // Server-side validation
    if (!companyName || !contactPerson || !phone || !mcDotNumber) {
      return NextResponse.json(
        { success: false, error: 'Validation Error: Company Name, Contact Person, Phone, and MC/DOT Number are required.' },
        { status: 400 }
      );
    }

    if (!agreeToTerms) {
      return NextResponse.json(
        { success: false, error: 'Validation Error: You must accept the Carrier Representation Agreement terms.' },
        { status: 400 }
      );
    }

    const carrierTicketId = `OTR-${Math.floor(100000 + Math.random() * 900000)}`;

    const carrierRecord = {
      carrier_id: carrierTicketId,
      company_name: companyName,
      contact_person: contactPerson,
      phone: phone,
      email: email || '',
      mc_dot_number: mcDotNumber,
      power_units_count: powerUnitsCount || '1 Owner-Operator',
      home_base: homeBaseCityState || 'Dallas, TX',
      equipment_type: equipmentType || "53' Dry Van",
      max_payload: maxPayloadCapacity || '45,000 lbs',
      preferred_lanes: preferredLanes || 'Nationwide',
      min_target_rpm: minTargetRpm || '3.40',
      status: 'New',
      created_at: new Date().toISOString(),
      assigned_dispatcher: 'Unassigned',
      notes: [`Carrier onboarding submission received via online portal on ${new Date().toLocaleDateString()}.`],
      documents: {
        mcLetter: true,
        w9Form: true,
        coiCertificate: true,
      },
    };

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      try {
        const dbResponse = await fetch(`${supabaseUrl}/rest/v1/carriers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Prefer': 'return=representation',
          },
          body: JSON.stringify(carrierRecord),
        });

        if (dbResponse.ok) {
          const insertedData = await dbResponse.json();
          return NextResponse.json({
            success: true,
            message: 'Carrier onboarded successfully to database',
            carrierId: carrierTicketId,
            carrier: insertedData[0],
          }, { status: 201 });
        }
      } catch (dbErr) {
        console.warn('Supabase DB Insert Warning (Falling back to demo mode response):', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Carrier onboarded successfully (Demo Mode)',
      carrierId: carrierTicketId,
      carrier: carrierRecord,
    }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Internal Server Error: ' + (error.message || 'Unknown error occurred') },
      { status: 500 }
    );
  }
}
