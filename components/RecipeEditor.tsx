'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

type Ingredient = { id: string; baseAmount: number | ''; unit: string; item: string };
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
  const [baseYield, setBaseYield] = useState<number>(1);
  const [targetYield, setTargetYield] = useState<number>(1);
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
      setBaseYield(Math.max(1, r.baseYield ?? 1)); // default+min 1
      setTargetYield(r.targetYield ?? 1);
      setIngredients(r.ingredients ?? []);
      setSteps(r.steps?.length ? r.steps : [{ id: uid(), text: '' }]);
      setCover(r.cover ?? '');
    } catch (err) {
      console.error('Load error:', err);
    }
  }, [key]);

  // ===== FACTOR =====
  const factor = useMemo(() => {
    const b = Math.max(1, Number(baseYield) || 1);
    const t = Number(targetYield) || 1;
    return t / b;
  }, [baseYield, targetYield]);

  // ===== SAVE =====
  const saveRecipe = (customCover?: string) => {
    const payload: RecipeData = {
      id: recipeId,
      title,
      baseYield: Math.max(1, Number(baseYield) || 1),
      targetYield: Number(targetYield) || 1,
      ingredients,
      steps,
      cover: customCover ?? cover,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(payload));
    onMetaUpdate({ title, cover: payload.cover, updatedAt: payload.updatedAt });
  };

  useEffect(() => {
    saveRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, baseYield, targetYield, ingredients, steps, cover]);

  // ===== IMAGE UPLOAD (ROBUST & PERSISTENT) =====
  const onCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.includes('png')) {
      alert('Please upload a PNG image only.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        try {
          // downscale if huge to avoid localStorage quota issues
          const MAX_W = 1600;
          const scale = img.width > MAX_W ? MAX_W / img.width : 1;
          const w = Math.round(img.width * scale);
          const h = Math.round(img.height * scale);
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          if (!ctx) throw new Error('Canvas unsupported');
          ctx.drawImage(img, 0, 0, w, h);
          const dataUrl = canvas.toDataURL('image/png'); // PNG (lossless); size reduced by resize
          setCover(dataUrl);
          saveRecipe(dataUrl);
          setToast('✅ Image uploaded and saved');
          setTimeout(() => setToast(null), 2200);
        } catch (err) {
          console.error(err);
          alert('Image processing failed. Try a smaller PNG.');
        }
      };
      if (typeof reader.result === 'string') {
        img.src = reader.result;
      } else {
        alert('Upload failed. Try again.');
      }
    };
    reader.onerror = () => alert('Upload failed. Try again.');
    reader.readAsDataURL(file);
  };

  // ===== REMOVE IMAGE =====
  const removeCover = () => {
    setCover('');
    saveRecipe('');
    setToast('🗑️ Image removed');
    setTimeout(() => setToast(null), 2000);
  };

  // ===== INGREDIENT HANDLERS =====
  const addIngredient = () =>
    setIngredients([...ingredients, { id: uid(), baseAmount: '', unit: '', item: '' }]);
  const updateIngredient = (id: string, field: keyof Ingredient, value: any) =>
    setIngredients((prev) => prev.map((ing) => (ing.id === id ? { ...ing, [field]: value } : ing)));
  const removeIngredient = (id: string) =>
    setIngredients((prev) => prev.filter((ing) => ing.id !== id));

  // ===== STEP HANDLERS =====
  const addStep = () => setSteps([...steps, { id: uid(), text: '' }]);
  const updateStep = (id: string, text: string) =>
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, text } : s)));
  const removeStep = (id: string) => setSteps((prev) => prev.filter((s) => s.id !== id));

  // ===== SAVE BUTTON =====
  const handleSave = () => {
    saveRecipe();
    setToast('💾 Recipe saved successfully!');
    setTimeout(() => setToast(null), 2500);
    onBack();
  };

  return (
    <main className="container" style={{ paddingTop: '110px', paddingBottom: '60px' }}>
      {/* Toast */}
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
            zIndex: 10000,
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

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <button
          onClick={onBack}
          style={{
            background: 'linear-gradient(90deg,#c59d5f,#d4af37)',
            color: 'white',
            border: 'none',
            padding: '10px 22px',
            fontSize: '0.95rem',
            borderRadius: '999px',
            cursor: 'pointer',
          }}
        >
          ← Back to My Recipe Book
        </button>
      </div>

      <section style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 className="title">{heading}</h1>
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </section>

      {/* Cover Image Section */}
      <section
        className="card"
        style={{ maxWidth: 1100, margin: '0 auto 1.25rem', padding: 20, borderRadius: 16 }}
      >
        <h3 style={{ marginBottom: 10 }}>Cover Image (PNG)</h3>

        {!cover && (
          <div style={{ textAlign: 'center' }}>
            <input
              type="file"
              accept="image/png"
              id="upload"
              onChange={onCoverChange}
              style={{ display: 'none' }}
            />
            <label
              htmlFor="upload"
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                borderRadius: 12,
                background: 'linear-gradient(90deg,#c59d5f,#d4af37)',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              📷 Upload Image
            </label>
          </div>
        )}

        {cover && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              borderRadius: 12,
              marginTop: 10,
              transition: 'opacity .3s ease',
              animation: 'fadeIn .4s ease',
            }}
          >
            {/* No overflow clipping so the rest of the page is fully visible */}
            <img
              src={cover}
              alt="cover"
              style={{
                width: '100%',
                borderRadius: 12,
                border: '1px solid rgba(0,0,0,.1)',
                display: 'block',
              }}
            />

            {/* Replace and Delete Buttons */}
            <div
              style={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                display: 'flex',
                gap: 8,
                background: 'rgba(0,0,0,0.55)',
                padding: '6px 10px',
                borderRadius: 8,
              }}
            >
              <label
                htmlFor="replace"
                style={{
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: 13,
                  textDecoration: 'underline',
                }}
              >
                Replace
              </label>
              <span
                onClick={removeCover}
                style={{
                  color: '#ffbaba',
                  cursor: 'pointer',
                  fontSize: 13,
                  textDecoration: 'underline',
                }}
              >
                Delete
              </span>
              <input
                type="file"
                accept="image/png"
                id="replace"
                onChange={onCoverChange}
                style={{ display: 'none' }}
              />
            </div>
          </div>
        )}

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.98); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </section>

      {/* Yield Section */}
      <section
        className="card"
        style={{ maxWidth: 1100, margin: '0 auto 1.25rem', padding: 20, borderRadius: 16 }}
      >
        <h3>Yield</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <label>
            Base Yield:
            <input
              type="number"
              min={1}
              value={baseYield}
              onChange={(e) => {
                const v = Math.max(1, Number(e.target.value) || 1);
                setBaseYield(v);
              }}
              style={{ marginLeft: 8, width: 80 }}
            />
          </label>
          <label>
            Target Yield:
            <input
              type="number"
              value={targetYield}
              onChange={(e) => setTargetYield(Number(e.target.value) || 1)}
              style={{ marginLeft: 8, width: 80 }}
            />
          </label>
          <div style={{ alignSelf: 'center' }}>Scaling ×{factor.toFixed(2)}</div>
        </div>
      </section>

      {/* Ingredients */}
      <section
        className="card"
        style={{ maxWidth: 1100, margin: '0 auto 1.25rem', padding: 20, borderRadius: 16 }}
      >
        <h3>Ingredients</h3>
        {ingredients.map((ing) => (
          <div key={ing.id} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <input
              type="number"
              placeholder="Qty"
              value={
                typeof ing.baseAmount === 'number' ? +(ing.baseAmount * factor).toFixed(2) : ''
              }
              onChange={(e) =>
                updateIngredient(
                  ing.id,
                  'baseAmount',
                  parseFloat(e.target.value || '0') / factor
                )
              }
              style={{ width: 70 }}
            />
            <input
              type="text"
              placeholder="Unit"
              value={ing.unit}
              onChange={(e) => updateIngredient(ing.id, 'unit', e.target.value)}
              style={{ width: 80 }}
            />
            <input
              type="text"
              placeholder="Ingredient"
              value={ing.item}
              onChange={(e) => updateIngredient(ing.id, 'item', e.target.value)}
              style={{ flex: 1 }}
            />
            <button onClick={() => removeIngredient(ing.id)}>✕</button>
          </div>
        ))}
        <button onClick={addIngredient}>+ Add Ingredient</button>
      </section>

      {/* Steps */}
      <section
        className="card"
        style={{ maxWidth: 1100, margin: '0 auto 1.25rem', padding: 20, borderRadius: 16 }}
      >
        <h3>Method</h3>
        {steps.map((s) => (
          <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <textarea
              value={s.text}
              onChange={(e) => updateStep(s.id, e.target.value)}
              style={{ flex: 1, height: 60 }}
            />
            <button onClick={() => removeStep(s.id)}>✕</button>
          </div>
        ))}
        <button onClick={addStep}>+ Add Step</button>
      </section>

      {/* Save Button */}
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <button
          onClick={handleSave}
          style={{
            background: 'linear-gradient(90deg,#c59d5f,#d4af37)',
            color: 'white',
            border: 'none',
            padding: '12px 30px',
            fontSize: '1rem',
            borderRadius: '999px',
            cursor: 'pointer',
          }}
        >
          💾 Save Recipe
        </button>
      </div>
    </main>
  );
}
