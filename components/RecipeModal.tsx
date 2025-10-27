'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { RecipeData } from './RecipeEditor';

export default function RecipeModal({
  ns,
  id,
  onClose,
  onEdit,
}: {
  ns: string;
  id: string;
  onClose: () => void;
  onEdit: () => void;
}) {
  const [data, setData] = useState<RecipeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ref = doc(db, ns, id);
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const d = snap.data() as any;
        setData({
          id: id,
          title: d.title || 'Untitled Recipe',
          baseYield: d.baseYield || 1,
          targetYield: d.targetYield || 1,
          ingredients: d.ingredients || [],
          steps: d.steps || [],
          cover: d.cover || '',
          createdAt: d.createdAt?._seconds ? d.createdAt._seconds * 1000 : d.createdAt ?? Date.now(),
          updatedAt: d.updatedAt?._seconds ? d.updatedAt._seconds * 1000 : d.updatedAt ?? Date.now(),
        });
      } else {
        setData(null);
      }
      setLoading(false);
    });

    return () => unsub();
  }, [id, ns]);

  if (loading)
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.55)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}
      >
        <div style={{ background: 'white', borderRadius: 12, padding: 40 }}>
          <p>Loading recipe...</p>
        </div>
      </div>
    );

  if (!data)
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.55)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}
      >
        <div style={{ background: 'white', borderRadius: 12, padding: 40 }}>
          <p>Recipe not found.</p>
          <button onClick={onClose} style={{ marginTop: 10 }}>Close</button>
        </div>
      </div>
    );

  const { title, cover, ingredients, steps } = data;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: 16,
          width: 'min(90%, 900px)',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
          animation: 'fadeIn 0.3s ease',
        }}
      >
        {/* Cover Image */}
        {cover && (
          <div style={{ position: 'relative' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cover}
              alt={title}
              style={{
                width: '100%',
                height: '300px',
                objectFit: 'cover',
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
              }}
            />
          </div>
        )}

        {/* Content */}
        <div style={{ padding: '24px 28px' }}>
          <h2 style={{ marginBottom: 10 }}>{title}</h2>
          <p style={{ fontSize: 13, opacity: 0.6 }}>
            Updated {new Date(data.updatedAt || Date.now()).toLocaleString()}
          </p>

          <hr style={{ margin: '16px 0' }} />

          {/* Ingredients */}
          <section style={{ marginBottom: 20 }}>
            <h3>Ingredients</h3>
            {ingredients.length > 0 ? (
              <ul style={{ marginTop: 8 }}>
                {ingredients.map((ing) => (
                  <li key={ing.id} style={{ lineHeight: '1.6' }}>
                    {ing.baseAmount ? `${ing.baseAmount} ` : ''}
                    {ing.unit} {ing.item}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ opacity: 0.6 }}>No ingredients yet.</p>
            )}
          </section>

          {/* Method */}
          <section>
            <h3>Method</h3>
            {steps.length > 0 ? (
              <ol style={{ marginTop: 8, paddingLeft: 22 }}>
                {steps.map((s) => (
                  <li key={s.id} style={{ marginBottom: 10, lineHeight: '1.6' }}>
                    {s.text}
                  </li>
                ))}
              </ol>
            ) : (
              <p style={{ opacity: 0.6 }}>No steps yet.</p>
            )}
          </section>

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 24,
              gap: 10,
            }}
          >
            <button
              onClick={onEdit}
              style={{
                background: 'linear-gradient(90deg,#c59d5f,#d4af37)',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: 999,
                cursor: 'pointer',
              }}
            >
              Edit
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(0,0,0,0.1)',
                border: 'none',
                padding: '10px 20px',
                borderRadius: 999,
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
