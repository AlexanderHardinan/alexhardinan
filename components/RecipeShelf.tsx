'use client';

import { useEffect, useMemo, useState } from 'react';
import RecipeEditor, { RecipeData } from './RecipeEditor';

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
  ns,          // e.g. "recipe:pastry"
  heading,
  subtitle,
}: {
  ns: string;
  heading: string;
  subtitle?: string;
}) {
  const indexKey = `${ns}:index`;
  const [items, setItems] = useState<ItemMeta[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  // load index
  useEffect(() => {
    const raw = localStorage.getItem(indexKey);
    if (!raw) return;
    try {
      const list: ItemMeta[] = JSON.parse(raw);
      setItems(list);
    } catch {}
  }, [indexKey]);

  // persist index
  useEffect(() => {
    localStorage.setItem(indexKey, JSON.stringify(items));
  }, [items, indexKey]);

  const sorted = useMemo(
    () => [...items].sort((a, b) => (b.updatedAt || b.createdAt) - (a.updatedAt || a.createdAt)),
    [items]
  );

  function createNew() {
    const id = uid();
    const now = Date.now();
    const meta: ItemMeta = { id, title: 'New Recipe', createdAt: now, updatedAt: now };
    setItems((v) => [meta, ...v]);

    // also seed an empty item payload so editor loads instantly
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
    localStorage.setItem(`${ns}:item:${id}`, JSON.stringify(seed));
    setActiveId(id);
  }

  function openItem(id: string) {
    setActiveId(id);
  }

  function removeItem(id: string) {
    if (!confirm('Delete this recipe?')) return;
    // remove item file
    localStorage.removeItem(`${ns}:item:${id}`);
    // remove from index
    setItems((v) => v.filter((m) => m.id !== id));
    if (activeId === id) setActiveId(null);
  }

  function onMetaUpdate(partial: Partial<ItemMeta>) {
    if (!activeId) return;
    setItems((v) =>
      v.map((m) => (m.id === activeId ? { ...m, ...partial, updatedAt: partial.updatedAt ?? Date.now() } : m))
    );
  }

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
        <h1 className="title" style={{ marginBottom: 8 }}>{heading}</h1>
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </section>

      <section className="card" style={{ padding: 16, borderRadius: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <h2 style={{ margin: 0 }}>Your Recipes</h2>
          <button className="btn" onClick={createNew}>+ New Recipe</button>
        </div>

        {sorted.length === 0 ? (
          <p style={{ margin: '16px 0 0', opacity: 0.8 }}>No recipes yet. Create your first one.</p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: 12,
              marginTop: 12,
            }}
          >
            {sorted.map((m) => (
              <article
                key={m.id}
                className="card"
                style={{
                  gridColumn: 'span 3',
                  padding: 12,
                  borderRadius: 12,
                  cursor: 'pointer',
                  display: 'grid',
                  gap: 10,
                }}
              >
                <div onClick={() => openItem(m.id)}>
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      paddingTop: '62%',
                      borderRadius: 10,
                      overflow: 'hidden',
                      background: 'var(--muted, #f3f4f6)',
                    }}
                  >
                    {m.cover ? (
                      <img
                        src={m.cover}
                        alt={m.title}
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : null}
                  </div>
                  <h3 style={{ margin: '10px 2px 0', fontSize: '1rem' }}>{m.title}</h3>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>
                    Updated {new Date(m.updatedAt || m.createdAt).toLocaleString()}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn-ghost" onClick={() => openItem(m.id)} style={{ flex: 1 }}>
                    Open
                  </button>
                  <button className="btn-ghost" onClick={() => removeItem(m.id)}>
                    Delete
                  </button>
                </div>
              </article>
            ))}

            {/* responsive spans */}
            <style>{`
              @media (max-width: 1280px) {
                article.card { grid-column: span 4; }
              }
              @media (max-width: 900px) {
                article.card { grid-column: span 6; }
              }
              @media (max-width: 640px) {
                article.card { grid-column: span 12; }
              }
            `}</style>
          </div>
        )}
      </section>
    </main>
  );
}
