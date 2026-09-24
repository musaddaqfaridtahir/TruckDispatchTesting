import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

const ALLOWED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png'];
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB limit per file

function isValidFile(file: File | null): boolean {
  if (!file || file.size === 0) return false;
  const name = file.name.toLowerCase();
  const hasValidExt = ALLOWED_EXTENSIONS.some((ext) => name.endsWith(ext));
  return hasValidExt && file.size <= MAX_FILE_SIZE;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // 1. Text Fields
    const companyName = (formData.get('companyName') as string || '').trim();
    const contactPerson = (formData.get('contactPerson') as string || '').trim();
    const phone = (formData.get('phone') as string || '').trim();
    const email = (formData.get('email') as string || '').trim();
    const equipmentType = (formData.get('equipmentType') as string || '').trim();
    const truckCount = (formData.get('truckCount') as string || '').trim();
    const notes = (formData.get('notes') as string || '').trim();

    // 2. Validation of Required Text Fields
    if (!companyName || !contactPerson || !phone || !email || !equipmentType || !truckCount) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields. Please ensure Company Name, Contact Person, Phone, Email, Equipment Type, and Truck Count are filled.' 
        },
        { status: 400 }
      );
    }

    // 3. File Attachments
    const mcCertificate = formData.get('mcCertificate') as File | null;
    const coiCertificate = formData.get('coiCertificate') as File | null;
    const w9Form = formData.get('w9Form') as File | null;
    const voidCheque = formData.get('voidCheque') as File | null;

    if (!isValidFile(mcCertificate)) {
      return NextResponse.json(
        { success: false, error: 'MC Authority Certificate is required (PDF, JPG, or PNG under 15MB).' },
        { status: 400 }
      );
    }

    if (!isValidFile(coiCertificate)) {
      return NextResponse.json(
        { success: false, error: 'Certificate of Insurance (COI) is required (PDF, JPG, or PNG under 15MB).' },
        { status: 400 }
      );
    }

    if (!isValidFile(w9Form)) {
      return NextResponse.json(
        { success: false, error: 'W-9 Form is required (PDF, JPG, or PNG under 15MB).' },
        { status: 400 }
      );
    }

    // 4. Build Attachments Array
    const attachments: Array<{ filename: string; content: Buffer; contentType: string }> = [];

    const filesToAttach = [
      { label: 'MC_Authority_Certificate', file: mcCertificate },
      { label: 'Certificate_of_Insurance_COI', file: coiCertificate },
      { label: 'W9_Form', file: w9Form },
      { label: 'Void_Cheque_NOA', file: voidCheque },
    ];

    for (const item of filesToAttach) {
      if (item.file && item.file.size > 0) {
        const ext = item.file.name.substring(item.file.name.lastIndexOf('.'));
        const cleanName = `${item.label}_${companyName.replace(/[^a-zA-Z0-9]/g, '_')}${ext}`;
        const arrayBuffer = await item.file.arrayBuffer();
        attachments.push({
          filename: cleanName,
          content: Buffer.from(arrayBuffer),
          contentType: item.file.type || 'application/octet-stream',
        });
      }
    }

    // 5. Build HTML Email
    const submissionDate = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
    const packetId = `OTR-${Date.now().toString().slice(-6)}`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 24px; margin: 0; }
          .container { max-width: 600px; margin: 0 auto; background-color: #1e293b; border-radius: 16px; border: 1px solid #334155; overflow: hidden; }
          .header { background: linear-gradient(135deg, #d97706, #b45309); padding: 24px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 1px; }
          .header p { color: #fef3c7; margin: 6px 0 0 0; font-size: 13px; font-weight: 500; }
          .content { padding: 28px; }
          .badge { display: inline-block; background-color: #3b82f6; color: white; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: bold; text-transform: uppercase; margin-bottom: 16px; }
          table { width: 100%; border-collapse: collapse; margin-top: 12px; }
          td { padding: 12px; border-bottom: 1px solid #334155; font-size: 14px; }
          td.label { color: #94a3b8; font-weight: 600; width: 38%; }
          td.value { color: #f8fafc; font-weight: 700; }
          .files-box { margin-top: 24px; background-color: #0f172a; border-radius: 12px; padding: 16px; border: 1px solid #334155; }
          .files-box h3 { color: #f59e0b; font-size: 13px; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 0.5px; }
          .file-pill { display: inline-block; background-color: #1e293b; border: 1px solid #475569; color: #38bdf8; font-size: 12px; padding: 6px 12px; border-radius: 8px; margin: 4px; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #64748b; border-top: 1px solid #334155; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>OTR DISPATCH</h1>
            <p>New Carrier Onboarding & Document Packet</p>
          </div>
          <div class="content">
            <span class="badge">Packet ID: ${packetId}</span>
            <p style="margin: 0 0 16px 0; font-size: 14px; color: #cbd5e1;">
              A new carrier has submitted their complete setup packet via the online portal on <strong>${submissionDate} (CST)</strong>.
            </p>

            <table>
              <tr>
                <td class="label">Carrier / Company</td>
                <td class="value">${companyName}</td>
              </tr>
              <tr>
                <td class="label">Contact Person</td>
                <td class="value">${contactPerson}</td>
              </tr>
              <tr>
                <td class="label">Direct Phone</td>
                <td class="value"><a href="tel:${phone}" style="color: #f59e0b; text-decoration: none;">${phone}</a></td>
              </tr>
              <tr>
                <td class="label">Email Address</td>
                <td class="value"><a href="mailto:${email}" style="color: #f59e0b; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td class="label">Primary Equipment</td>
                <td class="value">${equipmentType}</td>
              </tr>
              <tr>
                <td class="label">Available Units</td>
                <td class="value">${truckCount} Truck(s)</td>
              </tr>
              ${notes ? `<tr><td class="label">Carrier Notes</td><td class="value" style="font-weight: 400; color: #e2e8f0;">${notes}</td></tr>` : ''}
            </table>

            <div class="files-box">
              <h3>Attached Verification Documents (${attachments.length})</h3>
              ${attachments.map((a) => `<span class="file-pill">📎 ${a.filename}</span>`).join('')}
            </div>
          </div>
          <div class="footer">
            OTR Dispatch • Independent Freight Dispatch Service Provider • <a href="https://otrdispach.us" style="color: #f59e0b;">https://otrdispach.us</a>
          </div>
        </div>
      </body>
      </html>
    `;

    // 6. Nodemailer Configuration
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpSecure = process.env.SMTP_SECURE !== 'false';
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const receiverEmail = process.env.NOTIFICATION_RECEIVER_EMAIL || 'dispatch@otrdispach.us';

    if (smtpUser && smtpPass && smtpUser !== 'dispatch@otrdispach.us') {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpSecure,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"OTR Dispatch Onboarding" <${smtpUser}>`,
          to: receiverEmail,
          replyTo: email,
          subject: `[New Carrier Setup] ${companyName} - ${equipmentType} (${truckCount} Units)`,
          html: htmlContent,
          attachments,
        });

        console.log(`[SMTP] Onboarding email sent successfully to ${receiverEmail}`);
      } catch (smtpError: any) {
        console.error('[SMTP Error] Failed to send email via Gmail SMTP:', smtpError);
        // We log the error but still confirm packet received to avoid losing the carrier
      }
    } else {
      console.log(`[SMTP Demo Mode] Valid packet received for ${companyName} with ${attachments.length} attachments. (Configure SMTP_USER & SMTP_PASS in .env to send live emails).`);
    }

    return NextResponse.json({
      success: true,
      message: 'Carrier onboarding packet received successfully! Our operations desk will review your credentials and contact you within 2 hours.',
      packetId,
      carrier: {
        companyName,
        contactPerson,
        phone,
        email,
        equipmentType,
        truckCount,
        filesAttached: attachments.map((a) => a.filename),
      },
    });

  } catch (error: any) {
    console.error('Carrier Onboarding Error:', error);
    return NextResponse.json(
      { success: false, error: 'Server processing error: ' + (error.message || 'Unknown error') },
      { status: 500 }
    );
  }
}
