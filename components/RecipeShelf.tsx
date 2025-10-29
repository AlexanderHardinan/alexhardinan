'use client';

import { useState, useEffect } from 'react';
import PasswordModal from './PasswordModal';
import RecipeEditor from './RecipeEditor';
import RecipeModal from './RecipeModal';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type RecipeMeta = {
  id: string;
  title: string;
  cover?: string;
  updatedAt?: number;
};

export default function RecipeShelf({
  storageNS,
  heading,
  subtitle,
}: {
  storageNS: string;
  heading: string;
  subtitle?: string;
}) {
  const [recipes, setRecipes] = useState<RecipeMeta[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [viewerId, setViewerId] = useState<string | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<null | (() => void)>(null);
  const [toast, setToast] = useState<string | null>(null);

  // === Fetch live recipes ===
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

  // === PASSWORD CONTROL ===
  const requirePassword = (action: () => void) => {
    setPendingAction(() => action);
    setShowPasswordModal(true);
  };

  const handlePasswordSuccess = () => {
    if (pendingAction) pendingAction();
    setPendingAction(null);
  };

  // === Toast helper ===
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  // === Create ===
  const handleNewRecipe = () => {
    requirePassword(() => {
      const id = Math.random().toString(36).slice(2, 9);
      localStorage.removeItem(`${storageNS}:item:${id}`);
      setSelectedId(id);
    });
  };

  // === Edit ===
  const handleEditRecipe = (id: string) => {
    requirePassword(() => setSelectedId(id));
  };

  // === View ===
  const handleViewRecipe = (id: string) => {
    setViewerId(id);
  };

  // === Delete ===
  const handleDeleteRecipe = (id: string) => {
    requirePassword(async () => {
      if (!confirm('Delete this recipe?')) return;
      await deleteDoc(doc(db, storageNS, id));
      showToast('🗑️ Deleted');
    });
  };

  // === Back ===
  const handleBack = () => setSelectedId(null);

  // === Meta update ===
  const handleMetaUpdate = (partial: Partial<RecipeMeta>) => {
    setRecipes((prev) =>
      prev.map((r) => (r.id === selectedId ? { ...r, ...partial } : r))
    );
  };

  // === Render ===
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
        <button
          onClick={handleNewRecipe}
          style={{
            marginTop: '1rem',
            background: 'linear-gradient(90deg,#c59d5f,#d4af37)',
            color: 'white',
            border: 'none',
            padding: '10px 22px',
            borderRadius: '999px',
            cursor: 'pointer',
          }}
        >
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
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
              background: 'white',
              transition: 'transform 0.2s ease',
            }}
          >
            <div
              style={{
                position: 'relative',
                overflow: 'hidden',
                height: 180,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={r.cover || '/placeholder.png'}
                alt={r.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                }}
              />
            </div>
            <div style={{ padding: '14px 16px' }}>
              <h3 style={{ marginBottom: 6 }}>{r.title}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}>
                <button
                  onClick={() => handleViewRecipe(r.id)}
                  style={{
                    background: 'white',
                    border: '1px solid #d4af37',
                    color: '#d4af37',
                    borderRadius: 999,
                    padding: '6px 14px',
                    cursor: 'pointer',
                  }}
                >
                  View
                </button>
                <button
                  onClick={() => handleEditRecipe(r.id)}
                  style={{
                    background: 'linear-gradient(90deg,#c59d5f,#d4af37)',
                    border: 'none',
                    color: 'white',
                    borderRadius: 999,
                    padding: '6px 14px',
                    cursor: 'pointer',
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteRecipe(r.id)}
                  style={{
                    background: '#ffbaba',
                    border: 'none',
                    borderRadius: 999,
                    padding: '6px 14px',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* View Recipe Modal */}
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

      {/* Password Modal */}
      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSuccess={handlePasswordSuccess}
      />
    </main>
  );
}
