'use client';
import { useState, useEffect } from 'react';

export default function PasswordModal({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setPassword('');
      setError(false);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  if (!isOpen && !visible) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'CAlex') {
      onSuccess();
      onClose();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backdropFilter: 'blur(8px)',
        background: 'rgba(0,0,0,0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        opacity: isOpen ? 1 : 0,
        transition: 'opacity 0.25s ease-in-out',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: 16,
          padding: '30px 40px',
          backdropFilter: 'blur(16px)',
          color: 'white',
          textAlign: 'center',
          transform: error ? 'translateX(-5px)' : 'translateX(0)',
          transition: 'transform 0.2s ease-in-out',
          boxShadow: '0 0 20px rgba(0,0,0,0.4)',
        }}
      >
        <h3 style={{ marginBottom: 16, fontSize: '1.3rem' }}>🔒 Secure Access</h3>
        <p style={{ marginBottom: 20, opacity: 0.85 }}>Enter the password to continue</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          style={{
            padding: '10px 12px',
            borderRadius: 8,
            border: 'none',
            outline: 'none',
            width: '220px',
            textAlign: 'center',
            marginBottom: 14,
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
          <button
            type="submit"
            style={{
              background: 'linear-gradient(90deg,#c59d5f,#d4af37)',
              border: 'none',
              padding: '8px 20px',
              borderRadius: 999,
              cursor: 'pointer',
              color: 'white',
              fontWeight: 600,
            }}
          >
            Continue
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              padding: '8px 20px',
              borderRadius: 999,
              cursor: 'pointer',
              color: 'white',
            }}
          >
            Cancel
          </button>
        </div>
        {error && (
          <p style={{ color: '#ffbaba', marginTop: 12, fontSize: 13 }}>Access denied</p>
        )}
      </form>
    </div>
  );
}
