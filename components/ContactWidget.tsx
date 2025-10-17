'use client';
import { useState } from 'react';

export default function ContactWidget() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="fab">
        <button className="btn" onClick={() => setOpen(true)}>
          Get in touch
        </button>
      </div>

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
  const [showSuccess, setShowSuccess] = useState(false);

  async function submit(formData: FormData) {
    setState('sending');
    try {
      const res = await fetch('/api/contact', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('send failed');
      setState('sent');
      setShowSuccess(true);

      // Reset form after short delay
      const form = document.getElementById('contact') as HTMLFormElement;
      form.reset();

      // Hide success message and close modal
      setTimeout(() => {
        setShowSuccess(false);
        onDone();
        setState('idle');
      }, 2000);
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
        position: 'relative',
        overflow: 'hidden',
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
          width: '100%',
        }}
      >
        {state === 'sending' ? 'Sending…' : 'Send'}
      </button>

      {/* Animated success overlay */}
      {showSuccess && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255,255,255,0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600,
            color: '#0a0',
            fontSize: '1.1rem',
            animation: 'fadeIn 0.4s ease',
          }}
        >
          Sent Successfully ✓
        </div>
      )}

      {state === 'error' && (
        <p style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>Failed. Try again.</p>
      )}
    </form>
  );
}
