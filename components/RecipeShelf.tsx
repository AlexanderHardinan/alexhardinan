'use client';

import { useEffect, useMemo, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';

import PasswordModal from './PasswordModal';
import RecipeEditor from './RecipeEditor';
import RecipeModal from './RecipeModal';

type RecipeMeta = {
  id: string;
  title: string;
  cover?: string;
  updatedAt?: number;
};

type Props = {
  storageNS: string;
  heading: string;
  subtitle?: string;
};

type SortMode = 'updated_desc' | 'title_asc' | 'title_desc';

export default function RecipeShelf({ storageNS, heading, subtitle }: Props) {
  const router = useRouter();

  const [recipes, setRecipes] = useState<RecipeMeta[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [viewerId, setViewerId] = useState<string | null>(null);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<null | (() => void)>(null);

  const [toast, setToast] = useState<string | null>(null);

  // Phase 8 UX
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortMode>('updated_desc');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const unsub = onSnapshot(collection(db, storageNS), (snap) => {
      const items = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as any),
      })) as RecipeMeta[];

      setRecipes(items);
      setLoading(false);
    });

    return () => unsub();
  }, [storageNS]);

  const requirePassword = (action: () => void) => {
    setPendingAction(() => action);
    setShowPasswordModal(true);
  };

  const handlePasswordSuccess = () => {
    if (pendingAction) pendingAction();
    setPendingAction(null);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  const handleNewRecipe = () => {
    requirePassword(() => {
      const id = Math.random().toString(36).slice(2, 9);
      localStorage.removeItem(`${storageNS}:item:${id}`);
      setSelectedId(id);
    });
  };

  const handleEditRecipe = (id: string) => {
    requirePassword(() => setSelectedId(id));
  };

  const handleViewRecipe = (id: string) => {
    setViewerId(id);
  };

  const handleDeleteRecipe = (id: string) => {
    requirePassword(async () => {
      if (!confirm('Delete this recipe?')) return;
      await deleteDoc(doc(db, storageNS, id));
      showToast('🗑️ Deleted');
    });
  };

  const handleBackEditor = () => {
    setSelectedId(null);
  };

  const handleMetaUpdate = (partial: Partial<RecipeMeta>) => {
    setRecipes((prev) => prev.map((r) => (r.id === selectedId ? { ...r, ...partial } : r)));
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = recipes.filter((r) => {
      if (!q) return true;
      const t = (r.title || '').toLowerCase();
      return t.includes(q);
    });

    if (sort === 'updated_desc') {
      list = list.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    } else if (sort === 'title_asc') {
      list = list.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    } else if (sort === 'title_desc') {
      list = list.sort((a, b) => (b.title || '').localeCompare(a.title || ''));
    }

    return list;
  }, [recipes, query, sort]);

  if (selectedId) {
    return (
      <RecipeEditor
        storageNS={storageNS}
        recipeId={selectedId}
        heading={heading}
        subtitle={subtitle}
        onBack={handleBackEditor}
        onMetaUpdate={handleMetaUpdate}
      />
    );
  }

  return (
    <main className="container" style={{ paddingTop: '110px', paddingBottom: '60px' }}>
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
            zIndex: 9999,
          }}
        >
          {toast}
        </div>
      )}

      <div style={{ textAlign: 'center', marginBottom: '1.25rem', marginTop: '1rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '.3rem' }}>{heading}</h1>
        {subtitle && <p style={{ color: 'rgba(0,0,0,0.6)' }}>{subtitle}</p>}

        <div
          style={{
            display: 'flex',
            gap: 10,
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '1rem',
          }}
        >
          <button onClick={handleNewRecipe} className="btn btn--primary">
            ➕ New Recipe
          </button>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search recipes…"
            className="recipe-search"
            aria-label="Search recipes"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortMode)}
            className="recipe-sort"
            aria-label="Sort recipes"
          >
            <option value="updated_desc">Newest</option>
            <option value="title_asc">Title A–Z</option>
            <option value="title_desc">Title Z–A</option>
          </select>
        </div>
      </div>

      {/* Loading / Empty */}
      {loading ? (
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 0' }}>
          <div className="recipe-empty">
            <div className="recipe-empty__title">Loading recipes…</div>
            <div className="recipe-empty__sub">Fetching your collection.</div>
          </div>
        </section>
      ) : filtered.length === 0 ? (
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 0' }}>
          <div className="recipe-empty">
            <div className="recipe-empty__title">No recipes found</div>
            <div className="recipe-empty__sub">
              {query.trim()
                ? 'Try a different search term.'
                : 'Create your first recipe to begin building your collection.'}
            </div>
            <button onClick={handleNewRecipe} className="btn btn--primary" style={{ marginTop: 14 }}>
              ➕ New Recipe
            </button>
          </div>
        </section>
      ) : (
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '1.5rem',
            maxWidth: 1100,
            margin: '0 auto',
          }}
        >
          {filtered.map((r) => (
            <div
              key={r.id}
              className="card"
              style={{
                borderRadius: 16,
                overflow: 'hidden',
              }}
            >
              <div style={{ height: 180, overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.cover || '/placeholder.png'}
                  alt={r.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ padding: '14px 16px' }}>
                <h3 style={{ marginBottom: 6 }}>{r.title}</h3>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="btn btn--ghost btn--sm"
                    onClick={() => handleViewRecipe(r.id)}
                  >
                    View
                  </button>

                  <button
                    type="button"
                    className="btn btn--primary btn--sm"
                    onClick={() => handleEditRecipe(r.id)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="btn btn--danger btn--sm"
                    onClick={() => handleDeleteRecipe(r.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {viewerId && (
        <RecipeModal
          storageNS={storageNS}
          id={viewerId}
          onClose={() => setViewerId(null)}
          onEdit={() => {
            setSelectedId(viewerId);
            setViewerId(null);
          }}
        />
      )}

      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSuccess={handlePasswordSuccess}
      />
    </main>
  );
}
