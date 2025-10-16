'use client';

import { useState } from 'react';

export default function ContactWidget() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="fab">
        <button className="btn" onClick={()=>setOpen(true)}>Get in touch</button>
      </div>
      <div className={`modal ${open?'open':''}`} onClick={()=>setOpen(false)}>
        <div className="modal-content" onClick={(e)=>e.stopPropagation()}>
          <ContactForm onDone={()=>setOpen(false)} />
        </div>
      </div>
    </>
  );
}

function ContactForm({ onDone }: { onDone: ()=>void }) {
  const [state, setState] = useState<'idle'|'sending'|'sent'|'error'>('idle');

  async function submit(formData: FormData) {
    setState('sending');
    try {
      const res = await fetch('/api/contact', { method:'POST', body: formData });
      if (!res.ok) throw new Error('send failed');
      setState('sent');
      setTimeout(onDone, 800);
    } catch {
      setState('error');
    }
  }

  return (
    <form action={submit} id="contact" style={{ padding:16, color:'#fff' }}>
      <h3 style={{ marginTop:0 }}>Get in touch</h3>
      <label>Name<input name="name" required style={{ width:'100%', padding:10, margin:'6px 0 12px' }} /></label>
      <label>Email<input name="email" type="email" required style={{ width:'100%', padding:10, margin:'6px 0 12px' }} /></label>
      <label>Message<textarea name="message" required rows={5} style={{ width:'100%', padding:10, margin:'6px 0 12px' }} /></label>
      <button className="btn" disabled={state==='sending'}>{state==='sending'?'Sending…':'Send'}</button>
      {state==='sent' && <p>Sent.</p>}
      {state==='error' && <p>Failed. Try again.</p>}
    </form>
  );
}
