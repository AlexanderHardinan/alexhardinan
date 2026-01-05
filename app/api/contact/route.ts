import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    // Prevent build/runtime crash if env is missing
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'Server email is not configured.' },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const name = formData.get('name')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim() || '';
    const message = formData.get('message')?.toString().trim() || '';

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing fields' },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: 'Website Contact <contact@alexhardinan.com>',
      to: 'chefalex.theglobeasia@gmail.com',
      subject: `New Message from ${name}`,
      html: `
        <h2>Website Contact Form</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error sending email:', err);
    return NextResponse.json(
      { success: false, error: 'Email failed' },
      { status: 500 }
    );
  }
}

/**
 * Basic HTML escaping to avoid injection in email content.
 */
function escapeHtml(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
