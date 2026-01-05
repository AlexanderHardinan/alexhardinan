'use client';

import { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
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

export default function RecipeShelf({ storageNS, heading, subtitle }: Props) {
  const [recipes, setRecipes] = useState<RecipeMeta[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [viewerId, setViewerId] = useState<string | null>(null);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<null | (() => void)>(null);

  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, storageNS), (snap) => {
      const items = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as any),
      })) as RecipeMeta[];

      setRecipes(items.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)));
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

  const handleBack = () => {
    setSelectedId(null);
  };

  const handleMetaUpdate = (partial: Partial<RecipeMeta>) => {
    setRecipes((prev) => prev.map((r) => (r.id === selectedId ? { ...r, ...partial } : r)));
  };

  if (selectedId) {
    return (
      <RecipeEditor
        storageNS={storageNS}
        recipeId={selectedId}
        heading={heading}
        subtitle={subtitle}
        onBack={handleBack}
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

      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '.3rem' }}>{heading}</h1>
        {subtitle && <p style={{ color: 'rgba(0,0,0,0.6)' }}>{subtitle}</p>}

        <button onClick={handleNewRecipe} className="btn btn--primary" style={{ marginTop: '1rem' }}>
          ➕ New Recipe
        </button>
      </div>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
          gap: '1.5rem',
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        {recipes.map((r) => (
          <div
            key={r.id}
            style={{
              borderRadius: 16,
              overflow: 'hidden',
              background: 'white',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
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
