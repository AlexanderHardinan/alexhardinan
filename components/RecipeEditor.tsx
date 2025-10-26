'use client';

import { useEffect, useMemo, useState } from 'react';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';

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
  const key = `${storageNS}:item:${recipeId}`;

  const [title, setTitle] = useState('New Recipe');
  const [baseYield, setBaseYield] = useState<number>(1);
  const [targetYield, setTargetYield] = useState<number>(1);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [steps, setSteps] = useState<Step[]>([{ id: uid(), text: '' }]);
  const [cover, setCover] = useState<string>('');
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  // ===== LOAD FROM FIREBASE FIRST =====
  useEffect(() => {
    async function loadRecipe() {
      try {
        const docRef = doc(db, storageNS, recipeId);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const r = snap.data() as RecipeData;
          setTitle(r.title ?? 'New Recipe');
          setBaseYield(Math.max(1, r.baseYield ?? 1));
          setTargetYield(r.targetYield ?? 1);
          setIngredients(r.ingredients ?? []);
          setSteps(r.steps?.length ? r.steps : [{ id: uid(), text: '' }]);
          setCover(r.cover ?? '');
          localStorage.setItem(key, JSON.stringify(r));
        } else {
          const raw = localStorage.getItem(key);
          if (raw) {
            const r: RecipeData = JSON.parse(raw);
            setTitle(r.title);
            setBaseYield(r.baseYield);
            setTargetYield(r.targetYield);
            setIngredients(r.ingredients);
            setSteps(r.steps);
            setCover(r.cover ?? '');
          }
        }
      } catch (err) {
        console.error('Load failed:', err);
      } finally {
        setLoading(false);
      }
    }
    loadRecipe();
  }, [key, recipeId, storageNS]);

  // ===== SCALING FACTOR =====
  const factor = useMemo(() => {
    const b = Math.max(1, Number(baseYield) || 1);
    const t = Number(targetYield) || 1;
    return t / b;
  }, [baseYield, targetYield]);

  // ===== SAVE TO FIRESTORE =====
  async function saveToFirebase(customCover?: string) {
    setSaving(true);
    try {
      const payload: RecipeData = {
        id: recipeId,
        title: title || 'Untitled Recipe',
        baseYield: Math.max(1, Number(baseYield) || 1),
        targetYield: Number(targetYield) || 1,
        ingredients,
        steps,
        cover: customCover ?? cover,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      await setDoc(doc(db, storageNS, recipeId), {
        ...payload,
        updatedAt: serverTimestamp(),
      });
      localStorage.setItem(key, JSON.stringify(payload));
      onMetaUpdate({ title, cover: payload.cover, updatedAt: payload.updatedAt });
      setToast('💾 Saved to Firebase');
    } catch (err) {
      console.error(err);
      alert('⚠️ Firebase save failed. Check config or network.');
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 2000);
    }
  }

  // ===== IMAGE UPLOAD FIXED =====
  async function onCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.includes('png')) {
      alert('Please upload a PNG image.');
      return;
    }

    try {
      // 1. Preview immediately
      const reader = new FileReader();
      reader.onload = async () => {
        if (!reader.result || typeof reader.result !== 'string') return;
        setCover(reader.result);
        localStorage.setItem(key, reader.result);

        // 2. Upload to Firebase Storage
        const path = `${storageNS}/${recipeId}/cover.png`;
        const storageRef = ref(storage, path);
        await uploadString(storageRef, reader.result, 'data_url');
        const url = await getDownloadURL(storageRef);

        // 3. Update cover URL + save
        setCover(url);
        await saveToFirebase(url);

        setToast('✅ Image uploaded');
        setTimeout(() => setToast(null), 1800);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      alert('❌ Image upload failed. Check Firebase Storage permissions.');
    }
  }

  const removeCover = async () => {
    setCover('');
    await saveToFirebase('');
    setToast('🗑️ Image removed');
    setTimeout(() => setToast(null), 1800);
  };

  // ===== INGREDIENTS =====
  const addIngredient = () => setIngredients([...ingredients, { id: uid(), baseAmount: '', unit: '', item: '' }]);
  const updateIngredient = (id: string, field: keyof Ingredient, value: any) =>
    setIngredients((prev) => prev.map((ing) => (ing.id === id ? { ...ing, [field]: value } : ing)));
  const removeIngredient = (id: string) => setIngredients((prev) => prev.filter((ing) => ing.id !== id));

  // ===== STEPS =====
  const addStep = () => setSteps([...steps, { id: uid(), text: '' }]);
  const updateStep = (id: string, text: string) =>
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, text } : s)));
  const removeStep = (id: string) => setSteps((prev) => prev.filter((s) => s.id !== id));

  const handleSave = async () => {
    await saveToFirebase();
    onBack();
  };

  if (loading) return <p style={{ textAlign: 'center', marginTop: 100 }}>Loading recipe...</p>;

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

      {/* Back button */}
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <button
          onClick={onBack}
          style={{
            background: 'linear-gradient(90deg,#c59d5f,#d4af37)',
            color: 'white',
            border: 'none',
            padding: '10px 22px',
            borderRadius: '999px',
            cursor: 'pointer',
          }}
        >
          ← Back to My Recipe Book
        </button>
      </div>

      {/* Editable title */}
      <section className="card" style={{ maxWidth: 1100, margin: '0 auto 1rem', padding: 20, borderRadius: 16 }}>
        <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>Recipe Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 12px',
            borderRadius: 10,
            border: '1px solid rgba(0,0,0,.15)',
          }}
        />
      </section>

      {/* Cover Image */}
      <section className="card" style={{ maxWidth: 1100, margin: '0 auto 1.25rem', padding: 20, borderRadius: 16 }}>
        <h3>Cover Image (PNG)</h3>
        {!cover && (
          <div style={{ textAlign: 'center' }}>
            <input type="file" accept="image/png" id="upload" onChange={onCoverChange} style={{ display: 'none' }} />
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
          <div style={{ position: 'relative', marginTop: 10 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cover} alt="cover" style={{ width: '100%', borderRadius: 12, border: '1px solid #ccc' }} />
            <div
              style={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                background: 'rgba(0,0,0,0.55)',
                padding: '6px 10px',
                borderRadius: 8,
                display: 'flex',
                gap: 8,
              }}
            >
              <input type="file" accept="image/png" id="replace" onChange={onCoverChange} style={{ display: 'none' }} />
              <label htmlFor="replace" style={{ color: 'white', cursor: 'pointer', fontSize: 13, textDecoration: 'underline' }}>
                Replace
              </label>
              <span onClick={removeCover} style={{ color: '#ffbaba', cursor: 'pointer', fontSize: 13, textDecoration: 'underline' }}>
                Delete
              </span>
            </div>
          </div>
        )}
      </section>

      {/* YIELD */}
      <section className="card" style={{ maxWidth: 1100, margin: '0 auto 1rem', padding: 20, borderRadius: 16 }}>
        <h3>Yield</h3>
        <div style={{ display: 'flex', gap: 12 }}>
          <label>
            Base Yield:
            <input
              type="number"
              min={1}
              value={baseYield}
              onChange={(e) => setBaseYield(Math.max(1, Number(e.target.value) || 1))}
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

      {/* INGREDIENTS */}
      <section className="card" style={{ maxWidth: 1100, margin: '0 auto 1rem', padding: 20, borderRadius: 16 }}>
        <h3>Ingredients</h3>
        {ingredients.map((ing) => (
          <div key={ing.id} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <input
              type="number"
              placeholder="Qty"
              value={typeof ing.baseAmount === 'number' ? +(ing.baseAmount * factor).toFixed(2) : ''}
              onChange={(e) => updateIngredient(ing.id, 'baseAmount', parseFloat(e.target.value || '0') / factor)}
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

      {/* STEPS */}
      <section className="card" style={{ maxWidth: 1100, margin: '0 auto 1rem', padding: 20, borderRadius: 16 }}>
        <h3>Method</h3>
        {steps.map((s) => (
          <div key={s.id} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <textarea
              value={s.text}
              onChange={(e) => updateStep(s.id, e.target.value)}
              style={{ flex: 1, height: 80 }}
            />
            <button onClick={() => removeStep(s.id)}>✕</button>
          </div>
        ))}
        <button onClick={addStep}>+ Add Step</button>
      </section>

      {/* SAVE */}
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            background: 'linear-gradient(90deg,#c59d5f,#d4af37)',
            color: 'white',
            border: 'none',
            padding: '12px 30px',
            fontSize: '1rem',
            borderRadius: '999px',
            cursor: 'pointer',
            opacity: saving ? 0.7 : 1,
          }}
        >
          {saving ? 'Saving...' : '💾 Save Recipe'}
        </button>
      </div>
    </main>
  );
}
