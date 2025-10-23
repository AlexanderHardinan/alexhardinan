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

  // ===== FACTOR =====
  const factor = useMemo(() => {
    if (!baseYield || !targetYield) return 1;
    return targetYield / baseYield;
  }, [baseYield, targetYield]);

  // ===== SAVE FUNCTION =====
  function saveRecipe() {
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
    setToast('Recipe saved successfully ✅');
    setTimeout(() => {
      setToast(null);
      onBack();
    }, 1200);
  }

  // ===== IMAGE UPLOAD (FIXED) =====
  async function onCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      alert('Please upload a PNG or JPEG image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        setCover(result);
        setToast('Image uploaded successfully ✅');
        setTimeout(() => setToast(null), 2000);
      }
    };
    reader.onerror = () => alert('Image upload failed. Please try again.');
    reader.readAsDataURL(file);
  }

  // ===== INGREDIENT HANDLERS =====
  function addIngredient() {
    setIngredients([...ingredients, { id: uid(), amount: '', unit: '', item: '' }]);
  }
  function updateIngredient(id: string, field: keyof Ingredient, value: any) {
    setIngredients((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  }
  function removeIngredient(id: string) {
    setIngredients((prev) => prev.filter((i) => i.id !== id));
  }

  // ===== STEP HANDLERS =====
  function addStep() {
    setSteps([...steps, { id: uid(), text: '' }]);
  }
  function updateStep(id: string, text: string) {
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, text } : s)));
  }
  function removeStep(id: string) {
    setSteps((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <main className="container" style={{ paddingTop: '110px', paddingBottom: '60px' }}>
      {/* Toast */}
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
          onClick={() => {
            if (onBack) onBack();
            else router.push('/myrecipebook');
          }}
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
        >
          ← Back to My Recipe Book
        </button>
      </div>

      {/* Header */}
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
          Cover Image (PNG or JPEG)
          <input
            type="file"
            accept="image/png, image/jpeg"
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

      {/* Recipe Info */}
      <section className="card" style={{ maxWidth: 1100, margin: '0 auto', padding: 20, borderRadius: 16 }}>
        <label>
          <strong>Recipe Title</strong>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: '100%',
              marginTop: 8,
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: 8,
            }}
          />
        </label>

        <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
          <label style={{ flex: 1 }}>
            <strong>Base Yield</strong>
            <input
              type="number"
              value={baseYield}
              onChange={(e) => setBaseYield(Number(e.target.value))}
              style={{ width: '100%', marginTop: 8, padding: '8px', borderRadius: 8, border: '1px solid #ccc' }}
            />
          </label>
          <label style={{ flex: 1 }}>
            <strong>Target Yield</strong>
            <input
              type="number"
              value={targetYield}
              onChange={(e) => setTargetYield(Number(e.target.value))}
              style={{ width: '100%', marginTop: 8, padding: '8px', borderRadius: 8, border: '1px solid #ccc' }}
            />
          </label>
        </div>
      </section>

      {/* Ingredients */}
      <section className="card" style={{ maxWidth: 1100, margin: '1.5rem auto', padding: 20, borderRadius: 16 }}>
        <h3>Ingredients</h3>
        {ingredients.map((ing) => (
          <div key={ing.id} style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <input
              type="number"
              value={ing.amount}
              onChange={(e) => updateIngredient(ing.id, 'amount', e.target.value)}
              placeholder="Amount"
              style={{ width: '20%', padding: 6, borderRadius: 6, border: '1px solid #ccc' }}
            />
            <input
              value={ing.unit}
              onChange={(e) => updateIngredient(ing.id, 'unit', e.target.value)}
              placeholder="Unit"
              style={{ width: '20%', padding: 6, borderRadius: 6, border: '1px solid #ccc' }}
            />
            <input
              value={ing.item}
              onChange={(e) => updateIngredient(ing.id, 'item', e.target.value)}
              placeholder="Ingredient"
              style={{ flex: 1, padding: 6, borderRadius: 6, border: '1px solid #ccc' }}
            />
            <button onClick={() => removeIngredient(ing.id)} className="btn-ghost">✕</button>
          </div>
        ))}

        {/* Synced quantity display */}
        {factor !== 1 && (
          <p style={{ marginTop: 10, fontSize: '0.9rem', color: '#444' }}>
            Adjusted for yield: ×{factor.toFixed(2)} (quantities scaled automatically)
          </p>
        )}

        <button onClick={addIngredient} className="btn" style={{ marginTop: 10 }}>
          + Add Ingredient
        </button>
      </section>

      {/* Steps */}
      <section className="card" style={{ maxWidth: 1100, margin: '0 auto', padding: 20, borderRadius: 16 }}>
        <h3>Procedure</h3>
        {steps.map((s, i) => (
          <div key={s.id} style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <textarea
              value={s.text}
              onChange={(e) => updateStep(s.id, e.target.value)}
              placeholder={`Step ${i + 1}`}
              style={{
                flex: 1,
                padding: 8,
                borderRadius: 8,
                border: '1px solid #ccc',
                minHeight: 60,
              }}
            />
            <button onClick={() => removeStep(s.id)} className="btn-ghost">✕</button>
          </div>
        ))}
        <button onClick={addStep} className="btn" style={{ marginTop: 10 }}>
          + Add Step
        </button>
      </section>

      {/* Save Button */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button
          onClick={saveRecipe}
          style={{
            background: 'linear-gradient(90deg, #c59d5f, #d4af37)',
            color: 'white',
            border: 'none',
            padding: '12px 28px',
            fontSize: '1rem',
            borderRadius: '999px',
            cursor: 'pointer',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
        >
          💾 Save Recipe
        </button>
      </div>
    </main>
  );
}
