'use client';

import { useEffect, useMemo, useState } from 'react';
import { collection, onSnapshot, orderBy, query, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import RecipeEditor, { RecipeData } from './RecipeEditor';
import RecipeModal from './RecipeModal';

type ItemMeta = {
  id: string;
  title: string;
  cover?: string;
  createdAt: number;
  updatedAt: number;
  status?: 'draft' | 'published';
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
  const [drafts, setDrafts] = useState<ItemMeta[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [viewerId, setViewerId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // ---- Firestore listener (published recipes)
  useEffect(() => {
    const q = query(collection(db, ns), orderBy('updatedAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      const list: ItemMeta[] = [];
      snap.forEach((docSnap) => {
        const d = docSnap.data() as any;
        if (!d || d.status === 'draft') return; // only published
        list.push({
          id: docSnap.id,
          title: d.title || 'Untitled',
          cover: d.cover,
          createdAt: d.createdAt?._seconds ? d.createdAt._seconds * 1000 : d.createdAt ?? Date.now(),
          updatedAt: d.updatedAt?._seconds ? d.updatedAt._seconds * 1000 : d.updatedAt ?? Date.now(),
          status: 'published',
        });
      });
      setItems(list);
    });
    return () => unsub();
  }, [ns]);

  // ---- Load local drafts only
  useEffect(() => {
    const prefix = `${ns}:item:`;
    const list: ItemMeta[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)!;
      if (!key.startsWith(prefix)) continue;
      try {
        const r: RecipeData = JSON.parse(localStorage.getItem(key)!);
        if (r.status === 'draft') {
          list.push({
            id: r.id,
            title: r.title || 'Untitled',
            cover: r.cover,
            createdAt: r.createdAt ?? Date.now(),
            updatedAt: r.updatedAt ?? Date.now(),
            status: 'draft',
          });
        }
      } catch {}
    }
    list.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    setDrafts(list);
  }, [ns, activeId]);

  const combined = useMemo(() => {
    // remove drafts that were already published
    const publishedIds = new Set(items.map((i) => i.id));
    return [...drafts.filter((d) => !publishedIds.has(d.id)), ...items];
  }, [drafts, items]);

  // ---- Create a new recipe
  function createNew() {
    const id = uid();
    const now = Date.now();
    const payload: RecipeData & { status: 'draft' } = {
      id,
      title: 'New Recipe',
      baseYield: 1,
      targetYield: 1,
      ingredients: [],
      steps: [{ id: uid(), text: '' }],
      cover: '',
      createdAt: now,
      updatedAt: now,
      status: 'draft',
    };
    localStorage.setItem(`${ns}:item:${id}`, JSON.stringify(payload));
    setActiveId(id);
  }

  // ---- Open editor / viewer
  function openEditor(id: string) {
    setActiveId(id);
  }
  function openViewer(id: string) {
    setViewerId(id);
  }

  // ---- Delete recipe (cloud + local)
  async function removeItem(id: string) {
    if (!confirm('Delete this recipe permanently?')) return;

    try {
      // 1️⃣ Remove from Firestore
      await deleteDoc(doc(db, ns, id));

      // 2️⃣ Remove from local storage
      localStorage.removeItem(`${ns}:item:${id}`);

      // 3️⃣ Update UI
      setDrafts((prev) => prev.filter((d) => d.id !== id));
      setItems((prev) => prev.filter((i) => i.id !== id));

      // 4️⃣ Show toast feedback
      setToast('🗑️ Deleted permanently');
      setTimeout(() => setToast(null), 2200);
    } catch (err) {
      console.error('Delete failed:', err);
      alert('⚠️ Failed to delete recipe. Please check your network or Firebase.');
    }
  }

  if (activeId) {
    return (
      <RecipeEditor
        storageNS={ns}
        recipeId={activeId}
        heading={heading}
        subtitle={subtitle}
        onBack={() => setActiveId(null)}
        onMetaUpdate={() => {}}
      />
    );
  }

  return (
    <main className="container" style={{ paddingTop: '112px', paddingBottom: '48px' }}>
      {/* Toast notification */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: 20,
            right: 20,
            background: 'rgba(0,0,0,0.85)',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: 10,
            fontSize: '.9rem',
            zIndex: 9999,
            animation: 'fadeInOut 2.5s ease',
          }}
        >
          {toast}
          <style>{`
            @keyframes fadeInOut {
              0% {opacity: 0; transform: translateY(-10px);}
              10% {opacity: 1; transform: translateY(0);}
              90% {opacity: 1;}
              100% {opacity: 0; transform: translateY(-10px);}
            }
          `}</style>
        </div>
      )}

      <section style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
        <h1 className="title" style={{ marginBottom: 8 }}>{heading}</h1>
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </section>

      <section className="card" style={{ padding: 16, borderRadius: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Your Recipes</h2>
          <button className="btn" onClick={createNew}>+ New Recipe</button>
        </div>

        {combined.length === 0 ? (
          <p style={{ marginTop: 20, opacity: 0.7 }}>No recipes yet. Create one.</p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 12,
              marginTop: 16,
            }}
          >
            {combined.map((m) => (
              <article key={m.id} className="card" style={{ padding: 12, borderRadius: 12 }}>
                <div onClick={() => openViewer(m.id)} style={{ cursor: 'pointer' }}>
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      paddingTop: '62%',
                      borderRadius: 10,
                      overflow: 'hidden',
                      background: '#f3f4f6',
                    }}
                  >
                    {m.cover && (
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
                        }}
                      />
                    )}
                  </div>
                  <h3 style={{ margin: '10px 2px 0', fontSize: '1rem' }}>
                    {m.title}{' '}
                    {m.status === 'draft' && (
                      <span
                        style={{
                          fontSize: 12,
                          marginLeft: 6,
                          padding: '2px 8px',
                          borderRadius: 999,
                          background: '#fde68a',
                          color: '#78350f',
                        }}
                      >
                        Draft
                      </span>
                    )}
                  </h3>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>
                    Updated {new Date(m.updatedAt || m.createdAt).toLocaleString()}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                  <button className="btn-ghost" onClick={() => openViewer(m.id)}>View</button>
                  <button className="btn-ghost" onClick={() => openEditor(m.id)}>Edit</button>
                  <button className="btn-ghost" onClick={() => removeItem(m.id)}>Delete</button>
                </div>
              </article>
            ))}
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
