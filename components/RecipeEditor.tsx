'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

type Ingredient = { id: string; amount: number | ''; unit: string; item: string };
type Step = { id: string; text: string };

export type RecipeData = {
  id: string;
  title: string;
  baseYield: number;
  targetYield: number;
  ingredients: Ingredient[];
  steps: Step[];
  cover?: string;
  createdAt: number;
  updatedAt: number;
};

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export default function RecipeEditor({
  storageNS,
  recipeId,
  heading,
  subtitle,
  onBack,
  onMetaUpdate,
}: {
  storageNS: string;
  recipeId: string;
  heading: string;
  subtitle?: string;
  onBack: () => void;
  onMetaUpdate: (partial: Partial<Pick<RecipeData, 'title' | 'cover' | 'updatedAt'>>) => void;
}) {
  const router = useRouter();
  const key = `${storageNS}:item:${recipeId}`;

  const [title, setTitle] = useState('New Recipe');
  const [baseYield, setBaseYield] = useState<number>(10);
  const [targetYield, setTargetYield] = useState<number>(10);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [steps, setSteps] = useState<Step[]>([{ id: uid(), text: '' }]);
  const [cover, setCover] = useState<string>('');
  const [toast, setToast] = useState<string | null>(null);

  // ===== LOAD =====
  useEffect(() => {
    const raw = localStorage.getItem(key);
    if (!raw) return;
    try {
      const r: RecipeData = JSON.parse(raw);
      setTitle(r.title ?? 'New Recipe');
      setBaseYield(r.baseYield ?? 10);
      setTargetYield(r.targetYield ?? r.baseYield ?? 10);
      setIngredients(r.ingredients ?? []);
      setSteps(r.steps?.length ? r.steps : [{ id: uid(), text: '' }]);
      setCover(r.cover ?? '');
    } catch (err) {
      console.error('Failed to load recipe:', err);
    }
  }, [key]);

  // ===== SAVE =====
  useEffect(() => {
    const payload: RecipeData = {
      id: recipeId,
      title,
      baseYield,
      targetYield,
      ingredients,
      steps,
      cover,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(payload));
    onMetaUpdate({ title, cover, updatedAt: payload.updatedAt });
  }, [title, baseYield, targetYield, ingredients, steps, cover, key, recipeId, onMetaUpdate]);

  // ===== FACTOR =====
  const factor = useMemo(() => {
    if (!baseYield || !targetYield) return 1;
    return targetYield / baseYield;
  }, [baseYield, targetYield]);

  // ===== IMAGE UPLOAD FIX (WITH TOAST) =====
  async function onCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      const file = e.target.files?.[0];
      if (!file) return;
      if (!file.type.includes('png')) {
        alert('Please upload a PNG image only.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result && typeof reader.result === 'string') {
          setCover(reader.result);
          setToast('Image uploaded successfully ✅');
          setTimeout(() => setToast(null), 2500);
        } else {
          alert('Image load failed. Try again.');
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Upload error:', err);
      alert('Upload failed. Try again.');
    }
  }

  return (
    <main className="container" style={{ paddingTop: '110px', paddingBottom: '60px' }}>
      {/* Toast Notification */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: 20,
            right: 20,
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '10px',
            fontSize: '0.9rem',
            zIndex: 9999,
            animation: 'fadeInOut 2.5s ease',
          }}
        >
          {toast}
          <style>{`
            @keyframes fadeInOut {
              0% { opacity: 0; transform: translateY(-10px); }
              10% { opacity: 1; transform: translateY(0); }
              90% { opacity: 1; transform: translateY(0); }
              100% { opacity: 0; transform: translateY(-10px); }
            }
          `}</style>
        </div>
      )}

      {/* Back Button */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <button
          onClick={() => router.push('/myrecipebook')}
          style={{
            background: 'linear-gradient(90deg, #c59d5f, #d4af37)',
            color: 'white',
            border: 'none',
            padding: '10px 22px',
            fontSize: '0.95rem',
            borderRadius: '999px',
            cursor: 'pointer',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
          onMouseOver={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.05)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              '0 4px 12px rgba(212,175,55,0.4)';
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
          }}
        >
          ← Back to My Recipe Book
        </button>
      </div>

      <section style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 className="title">{heading}</h1>
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </section>

      {/* Cover Image */}
      <section
        className="card"
        style={{
          maxWidth: 1100,
          margin: '0 auto 1.25rem',
          padding: 20,
          borderRadius: 16,
        }}
      >
        <label style={{ fontWeight: 600 }}>
          Cover Image (PNG)
          <input
            type="file"
            accept="image/png"
            onChange={onCoverChange}
            style={{ display: 'block', marginTop: 8 }}
          />
        </label>
        {cover && (
          <img
            src={cover}
            alt="Cover"
            style={{
              width: '100%',
              maxHeight: 420,
              objectFit: 'cover',
              borderRadius: 12,
              marginTop: 10,
              border: '1px solid rgba(0,0,0,.1)',
            }}
          />
        )}
      </section>

      {/* ===== Rest of the recipe fields remain unchanged ===== */}
    </main>
  );
}
