'use client';

import { useState } from 'react';

export default function ContactWidget() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Floating Action Button */}
      <div className="fab">
        <button className="btn" onClick={() => setOpen(true)}>
          Get in touch
        </button>
      </div>

      {/* Modal Popup */}
      <div className={`modal ${open ? 'open' : ''}`} onClick={() => setOpen(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <ContactForm onDone={() => setOpen(false)} />
        </div>
      </div>
    </>
  );
}

function ContactForm({ onDone }: { onDone: () => void }) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function submit(formData: FormData) {
    setState('sending');
    try {
      const res = await fetch('/api/contact', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('send failed');
      setState('sent');
      setTimeout(onDone, 800);
    } catch {
      setState('error');
    }
  }

  return (
    <form
      action={submit}
      id="contact"
      className="contact-form"
      style={{
        padding: 20,
        color: '#000',
        background: '#fff',
        borderRadius: 16,
        fontSize: 16,
      }}
    >
      <h3 style={{ marginTop: 0, color: '#111', fontWeight: 700 }}>Get in touch</h3>

      <label style={{ display: 'block', marginBottom: 12 }}>
        Name
        <input
          name="name"
          required
          style={{
            width: '100%',
            padding: '10px 14px',
            marginTop: 6,
            borderRadius: 8,
            border: '1px solid #ccc',
            color: '#000',
            background: '#fff',
          }}
        />
      </label>

      <label style={{ display: 'block', marginBottom: 12 }}>
        Email
        <input
          name="email"
          type="email"
          required
          style={{
            width: '100%',
            padding: '10px 14px',
            marginTop: 6,
            borderRadius: 8,
            border: '1px solid #ccc',
            color: '#000',
            background: '#fff',
          }}
        />
      </label>

      <label style={{ display: 'block', marginBottom: 16 }}>
        Message
        <textarea
          name="message"
          required
          rows={5}
          style={{
            width: '100%',
            padding: '10px 14px',
            marginTop: 6,
            borderRadius: 8,
            border: '1px solid #ccc',
            color: '#000',
            background: '#fff',
          }}
        />
      </label>

      <button
        className="btn"
        disabled={state === 'sending'}
        style={{
          background: '#111',
          color: '#fff',
          borderRadius: 999,
          padding: '10px 20px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {state === 'sending' ? 'Sending…' : 'Send'}
      </button>

      {state === 'sent' && <p style={{ color: 'green', marginTop: 10 }}>Sent.</p>}
      {state === 'error' && <p style={{ color: 'red', marginTop: 10 }}>Failed. Try again.</p>}
    </form>
  );
}
