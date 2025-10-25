'use client';

import { useEffect, useMemo, useState } from 'react';
import RecipeEditor, { RecipeData } from './RecipeEditor';
import RecipeModal from './RecipeModal';
import { db } from '@/lib/firebase';
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore';

type ItemMeta = {
  id: string;
  title: string;
  cover?: string;
  createdAt: number;
  updatedAt: number;
};

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export default function RecipeShelf({
  ns,
  heading,
  subtitle,
}: {
  ns: string;
  heading: string;
  subtitle?: string;
}) {
  const [items, setItems] = useState<ItemMeta[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [viewerId, setViewerId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ===== REALTIME LOAD =====
  useEffect(() => {
    const unsub = onSnapshot(collection(db, ns), (snap) => {
      const list: ItemMeta[] = [];
      snap.forEach((d) => {
        const data = d.data() as RecipeData;
        list.push({
          id: data.id,
          title: data.title,
          cover: data.cover,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        });
      });
      setItems(
        list.sort(
          (a, b) =>
            (b.updatedAt || b.createdAt) - (a.updatedAt || a.createdAt)
        )
      );
    });
    return () => unsub();
  }, [ns]);

  // ===== CREATE NEW FIXED =====
  async function createNew() {
    try {
      setLoading(true);
      const id = uid();
      const now = Date.now();

      // Check if already exists (failsafe)
      const docRef = doc(db, ns, id);
      const existing = await getDoc(docRef);
      if (existing.exists()) return setActiveId(id);

      const seed: RecipeData = {
        id,
        title: 'New Recipe',
        baseYield: 10,
        targetYield: 10,
        ingredients: [],
        steps: [],
        createdAt: now,
        updatedAt: now,
      };

      await setDoc(docRef, seed);
      setItems((v) => [
        { id, title: 'New Recipe', createdAt: now, updatedAt: now },
        ...v,
      ]);
      setActiveId(id);
    } catch (err) {
      console.error('Create recipe failed:', err);
      alert('⚠️ Unable to create a new recipe. Check Firebase config.');
    } finally {
      setLoading(false);
    }
  }

  async function removeItem(id: string) {
    if (!confirm('Delete this recipe?')) return;
    try {
      await deleteDoc(doc(db, ns, id));
      setItems((v) => v.filter((m) => m.id !== id));
      if (activeId === id) setActiveId(null);
      if (viewerId === id) setViewerId(null);
    } catch (err) {
      console.error('Delete failed:', err);
      alert('⚠️ Failed to delete recipe. Check Firebase permissions.');
    }
  }

  function onMetaUpdate(partial: Partial<ItemMeta>) {
    if (!activeId) return;
    setItems((v) =>
      v.map((m) =>
        m.id === activeId
          ? { ...m, ...partial, updatedAt: partial.updatedAt ?? Date.now() }
          : m
      )
    );
  }

  // ===== VIEW =====
  if (activeId) {
    return (
      <RecipeEditor
        storageNS={ns}
        recipeId={activeId}
        heading={heading}
        subtitle={subtitle}
        onBack={() => setActiveId(null)}
        onMetaUpdate={onMetaUpdate}
      />
    );
  }

  return (
    <main className="container" style={{ paddingTop: '112px', paddingBottom: '48px' }}>
      <section style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
        <h1 className="title" style={{ marginBottom: 8 }}>
          {heading}
        </h1>
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </section>

      <section className="card" style={{ padding: 16, borderRadius: 16 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <h2 style={{ margin: 0 }}>Your Recipes</h2>
          <button
            className="btn"
            onClick={createNew}
            disabled={loading}
            style={{
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'wait' : 'pointer',
            }}
          >
            {loading ? 'Creating...' : '+ New Recipe'}
          </button>
        </div>

        {items.length === 0 ? (
          <p style={{ margin: '16px 0 0', opacity: 0.8 }}>
            No recipes yet. Create your first one.
          </p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: 12,
              marginTop: 12,
            }}
          >
            {items.map((m) => (
              <article
                key={m.id}
                className="card"
                style={{
                  gridColumn: 'span 3',
                  padding: 12,
                  borderRadius: 12,
                  display: 'grid',
                  gap: 10,
                  cursor: 'pointer',
                  overflow: 'hidden',
                  transition: 'transform .2s ease, box-shadow .2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow =
                    '0 8px 20px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* COVER */}
                <div onClick={() => setViewerId(m.id)}>
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16/9',
                      borderRadius: 10,
                      overflow: 'hidden',
                      background: 'var(--muted,#f3f4f6)',
                    }}
                  >
                    {m.cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={m.cover}
                        alt={m.title}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          opacity: 0,
                          animation: 'fadeInImage .6s forwards ease-out',
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '100%',
                          color: '#aaa',
                          fontSize: '0.9rem',
                        }}
                      >
                        No image
                      </div>
                    )}
                  </div>
                  <h3 style={{ margin: '10px 2px 0', fontSize: '1rem' }}>
                    {m.title}
                  </h3>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>
                    Updated {new Date(m.updatedAt).toLocaleString()}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn-ghost" onClick={() => setViewerId(m.id)} style={{ flex: 1 }}>
                    View
                  </button>
                  <button className="btn-ghost" onClick={() => setActiveId(m.id)}>
                    Edit
                  </button>
                  <button className="btn-ghost" onClick={() => removeItem(m.id)}>
                    Delete
                  </button>
                </div>
              </article>
            ))}

            <style>{`
              @keyframes fadeInImage {
                from { opacity: 0; transform: scale(1.05); }
                to { opacity: 1; transform: scale(1); }
              }
              @media (max-width:1280px){ article.card{ grid-column:span 4; } }
              @media (max-width:900px){  article.card{ grid-column:span 6; } }
              @media (max-width:640px){  article.card{ grid-column:span 12; } }
            `}</style>
          </div>
        )}
      </section>

      {viewerId && (
        <RecipeModal
          ns={ns}
          id={viewerId}
          onClose={() => setViewerId(null)}
          onEdit={() => {
            setActiveId(viewerId);
            setViewerId(null);
          }}
        />
      )}
    </main>
  );
}
