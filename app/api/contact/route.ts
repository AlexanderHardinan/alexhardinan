import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const form = await req.formData();
  const name = String(form.get('name')||'');
  const email = String(form.get('email')||'');
  const message = String(form.get('message')||'');

  console.log('Contact', { name, email, message });

  const mailto = `mailto:chefalex.theglobeasia@gmail.com?subject=${encodeURIComponent('Website inquiry from '+name)}&body=${encodeURIComponent(message+'\n\nFrom: '+email)}`;
  return NextResponse.json({ ok:true, mailto });
}
