// /components/PasswordModal.tsx
'use client';

import { useState } from 'react';

export default function PasswordModal({
  isOpen,
  onClose,
  onSuccess,
  onFail, // ✅ optional failure handler
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onFail?: () => void;
}) {
  const [input, setInput] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === 'CAlex') {
      setInput('');
      onSuccess();
    } else {
      if (onFail) onFail();
      setToast('❌ Incorrect password');
      setTimeout(() => setToast(null), 2000);
      setInput('');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.55)',
        display: 'grid',
        placeItems: 'center',
        zIndex: 9999,
      }}
    >
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: 20,
            right: 20,
            background: 'rgba(0,0,0,0.85)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: 10,
            fontSize: '.9rem',
            zIndex: 10000,
          }}
        >
          {toast}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '16px',
          width: 'min(90%, 400px)',
          boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
          textAlign: 'center',
          animation: 'fadeIn 0.25s ease',
        }}
      >
        <h2
          style={{
            marginBottom: '1.5rem',
            fontSize: '1.4rem',
            background: 'linear-gradient(90deg,#c59d5f,#d4af37)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Enter Password
        </h2>

        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Password"
          autoFocus
          style={{
            width: '100%',
            padding: '12px 14px',
            borderRadius: '10px',
            border: '1px solid rgba(0,0,0,0.15)',
            marginBottom: '1.5rem',
            fontSize: '1rem',
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button
            type="submit"
            style={{
              background: 'linear-gradient(90deg,#c59d5f,#d4af37)',
              color: 'white',
              border: 'none',
              borderRadius: '999px',
              padding: '10px 24px',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'opacity 0.2s ease',
            }}
          >
            Confirm
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: '#eee',
              border: 'none',
              borderRadius: '999px',
              padding: '10px 24px',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'opacity 0.2s ease',
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
