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

  // ===== REALTIME SYNC WITH FIRESTORE =====
  useEffect(() => {
    const unsub = onSnapshot(collection(db, ns), (snap) => {
      const list: ItemMeta[] = [];
      snap.forEach((d) => list.push(d.data() as ItemMeta));
      setItems(
        list.sort(
          (a, b) =>
            (b.updatedAt || b.createdAt) - (a.updatedAt || a.createdAt)
        )
      );
    });
    return () => unsub();
  }, [ns]);

  // ===== CREATE NEW RECIPE =====
  async function createNew() {
    const id = uid();
    const now = Date.now();
    const meta: ItemMeta = {
      id,
      title: 'New Recipe',
      createdAt: now,
      updatedAt: now,
    };
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
    try {
      await setDoc(doc(db, ns, id), seed);
      setItems((v) => [meta, ...v]);
      setActiveId(id);
    } catch (err) {
      console.error('Error creating recipe:', err);
    }
  }

  function openEditor(id: string) {
    setActiveId(id);
  }
  function openViewer(id: string) {
    setViewerId(id);
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

  // ===== RENDER EDITOR =====
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

  // ===== SHELF UI =====
  return (
    <main
      className="container"
      style={{ paddingTop: '112px', paddingBottom: '48px' }}
    >
      <section style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
        <h1 className="title" style={{ marginBottom: 8 }}>
          {heading}
        </h1>
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </section>

      <section
        className="card"
        style={{ padding: 16, borderRadius: 16, overflow: 'hidden' }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <h2 style={{ margin: 0 }}>Your Recipes</h2>
          <button className="btn" onClick={createNew}>
            + New Recipe
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
                onMouseEnter={(e) =>
                  ((e.currentTarget.style.transform = 'translateY(-4px)'),
                  (e.currentTarget.style.boxShadow =
                    '0 8px 20px rgba(0,0,0,0.15)'))
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget.style.transform = 'none'),
                  (e.currentTarget.style.boxShadow = 'none'))
                }
              >
                {/* IMAGE PREVIEW */}
                <div onClick={() => openViewer(m.id)}>
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
                          filter: 'brightness(0.98)',
                          transition: 'transform 0.5s ease, opacity 0.3s ease',
                          opacity: 0,
                          animation: 'fadeInImage 0.5s forwards',
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
                  <button
                    className="btn-ghost"
                    onClick={() => openViewer(m.id)}
                    style={{ flex: 1 }}
                  >
                    View
                  </button>
                  <button
                    className="btn-ghost"
                    onClick={() => openEditor(m.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-ghost"
                    onClick={() => removeItem(m.id)}
                  >
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
