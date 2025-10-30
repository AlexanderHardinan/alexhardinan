// /components/RecipeModal.tsx
'use client';

import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import PasswordModal from './PasswordModal';

type Ingredient = { id: string; baseAmount: number | ''; unit: string; item: string };
type Step = { id: string; text: string };

type RecipeDoc = {
  id: string;
  title: string;
  baseYield: number;
  targetYield: number;
  ingredients: Ingredient[];
  steps: Step[];
  cover?: string;
  createdAt?: number;
  updatedAt?: number;
  status?: 'draft' | 'published';
};

export default function RecipeModal({
  storageNS,
  id,
  onClose,
  onEdit,
}: {
  storageNS: string;
  id: string;
  onClose: () => void;
  onEdit: () => void;
}) {
  const [recipe, setRecipe] = useState<RecipeDoc | null>(null);
  const [loading, setLoading] = useState(true);

  // Password gating
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pendingEdit, setPendingEdit] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // === Live Firestore sync ===
  useEffect(() => {
    const ref = doc(db, storageNS, id);
    const unsub = onSnapshot(
      ref,
      (snap) => {
        if (snap.exists()) {
          const d = snap.data() as any;
          setRecipe({
            id,
            title: d.title || 'Untitled',
            baseYield: d.baseYield ?? 1,
            targetYield: d.targetYield ?? 1,
            ingredients: Array.isArray(d.ingredients) ? d.ingredients : [],
            steps: Array.isArray(d.steps) ? d.steps : [],
            cover: d.cover || '',
            createdAt: d.createdAt?._seconds ? d.createdAt._seconds * 1000 : d.createdAt,
            updatedAt: d.updatedAt?._seconds ? d.updatedAt._seconds * 1000 : d.updatedAt,
            status: d.status,
          });
        } else {
          setRecipe(null);
        }
        setLoading(false);
      },
      () => setLoading(false)
    );
    return () => unsub();
  }, [storageNS, id]);

  // === Password handlers ===
  const handlePasswordSuccess = () => {
    setShowPasswordModal(false);
    if (pendingEdit) {
      setPendingEdit(false);
      onEdit();
    }
  };

  const handlePasswordFail = () => {
    setToast('❌ Incorrect password');
    setTimeout(() => setToast(null), 2000);
  };

  const handleEditClick = () => {
    setPendingEdit(true);
    setShowPasswordModal(true);
  };

  // === Loading state ===
  if (loading) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'grid',
          placeItems: 'center',
          zIndex: 10000,
        }}
      >
        <div style={{ background: '#fff', padding: 20, borderRadius: 12 }}>Loading…</div>
      </div>
    );
  }

  // === Missing recipe ===
  if (!recipe) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'grid',
          placeItems: 'center',
          zIndex: 10000,
        }}
      >
        <div style={{ background: '#fff', padding: 20, borderRadius: 12 }}>
          <p>Recipe not found.</p>
          <div style={{ textAlign: 'right' }}>
            <button
              onClick={onClose}
              style={{
                background: '#eee',
                border: 'none',
                padding: '8px 14px',
                borderRadius: 999,
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  const factor =
    Math.max(1, Number(recipe.baseYield) || 1) > 0
      ? (Number(recipe.targetYield) || 1) / Math.max(1, Number(recipe.baseYield) || 1)
      : 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'grid',
        placeItems: 'center',
        padding: 16,
        zIndex: 10000,
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
            zIndex: 11000,
          }}
        >
          {toast}
        </div>
      )}

      <article
        className="card"
        style={{
          width: 'min(100%, 1000px)',
          maxHeight: '90vh',
          overflow: 'auto',
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          animation: 'fadeIn 0.25s ease',
        }}
      >
        {/* Header */}
        <header
          style={{
            padding: '16px 18px',
            borderBottom: '1px solid rgba(0,0,0,.08)',
          }}
        >
          <h2 style={{ margin: 0 }}>{recipe.title}</h2>
          <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
            Updated{' '}
            {recipe.updatedAt
              ? new Date(recipe.updatedAt).toLocaleString()
              : recipe.createdAt
              ? new Date(recipe.createdAt).toLocaleString()
              : ''}
          </div>
        </header>

        {/* Cover */}
        {recipe.cover ? (
          <div style={{ position: 'relative' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={recipe.cover}
              alt={recipe.title}
              style={{
                width: '100%',
                maxHeight: 420,
                objectFit: 'cover',
              }}
            />
          </div>
        ) : null}

        {/* Body */}
        <div style={{ display: 'grid', gap: 18, padding: 18 }}>
          <section>
            <h3 style={{ margin: '0 0 8px' }}>Yield</h3>
            <div style={{ fontSize: 14 }}>
              Base: <strong>{recipe.baseYield}</strong> &nbsp;|&nbsp; Target:{' '}
              <strong>{recipe.targetYield}</strong> &nbsp;|&nbsp; Scaling ×
              {factor.toFixed(2)}
            </div>
          </section>

          <section>
            <h3 style={{ margin: '0 0 8px' }}>Ingredients</h3>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {recipe.ingredients?.map((ing) => {
                const qty =
                  typeof ing.baseAmount === 'number'
                    ? +(ing.baseAmount * factor).toFixed(2)
                    : '';
                return (
                  <li key={ing.id} style={{ marginBottom: 6 }}>
                    {qty !== '' && <strong>{qty}</strong>} {ing.unit && `${ing.unit} `}
                    {ing.item}
                  </li>
                );
              })}
            </ul>
          </section>

          <section>
            <h3 style={{ margin: '0 0 8px' }}>Method</h3>
            <ol style={{ margin: 0, paddingLeft: 18 }}>
              {recipe.steps?.map((s) => (
                <li key={s.id} style={{ marginBottom: 8, lineHeight: 1.45 }}>
                  {s.text}
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* Footer actions */}
        <footer
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 10,
            padding: 16,
            borderTop: '1px solid rgba(0,0,0,.08)',
          }}
        >
          <button
            onClick={handleEditClick}
            style={{
              background: 'linear-gradient(90deg,#c59d5f,#d4af37)',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: 999,
              cursor: 'pointer',
              transition: 'opacity 0.2s ease',
            }}
          >
            Edit
          </button>
          <button
            onClick={onClose}
            style={{
              background: '#eee',
              border: 'none',
              padding: '8px 16px',
              borderRadius: 999,
              cursor: 'pointer',
              transition: 'opacity 0.2s ease',
            }}
          >
            Close
          </button>
        </footer>
      </article>

      {/* Password modal */}
      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => {
          setShowPasswordModal(false);
          setPendingEdit(false);
        }}
        onSuccess={handlePasswordSuccess}
        onFail={handlePasswordFail}
      />
    </div>
  );
}
