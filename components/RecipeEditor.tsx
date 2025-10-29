'use client';

import { useEffect, useMemo, useState } from 'react';
import { doc, setDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
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
  status?: 'draft' | 'published';
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
  const [saving, setSaving] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // === LIVE SYNC FROM FIRESTORE ===
  useEffect(() => {
    const docRef = doc(db, storageNS, recipeId);
    const unsub = onSnapshot(
      docRef,
      (snap) => {
        if (snap.exists()) {
          const d = snap.data() as any;
          setTitle(d.title || 'New Recipe');
          setBaseYield(Math.max(1, d.baseYield || 1));
          setTargetYield(d.targetYield || 1);
          setIngredients(d.ingredients || []);
          setSteps(d.steps?.length ? d.steps : [{ id: uid(), text: '' }]);
          setCover(d.cover || '');
          localStorage.setItem(
            key,
            JSON.stringify({
              id: recipeId,
              title: d.title || 'New Recipe',
              baseYield: Math.max(1, d.baseYield || 1),
              targetYield: d.targetYield || 1,
              ingredients: d.ingredients || [],
              steps: d.steps?.length ? d.steps : [{ id: uid(), text: '' }],
              cover: d.cover || '',
              createdAt: Date.now(),
              updatedAt: Date.now(),
              status: 'published',
            })
          );
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
        setLoading(false);
      },
      (err) => {
        console.error('Sync error:', err);
        setLoading(false);
      }
    );
    return () => unsub();
  }, [key, recipeId, storageNS]);

  const factor = useMemo(() => {
    const b = Math.max(1, Number(baseYield) || 1);
    const t = Number(targetYield) || 1;
    return t / b;
  }, [baseYield, targetYield]);

  // === SAVE TO FIRESTORE ===
  async function publishToFirebase(customCover?: string) {
    if (!title.trim()) {
      alert('Please add a title before saving.');
      return;
    }

    setSaving(true);
    try {
      const payload: RecipeData = {
        id: recipeId,
        title: title.trim() || 'Untitled Recipe',
        baseYield: Math.max(1, Number(baseYield) || 1),
        targetYield: Number(targetYield) || 1,
        ingredients,
        steps,
        cover: customCover ?? cover,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        status: 'published',
      };

      await setDoc(doc(db, storageNS, recipeId), {
        ...payload,
        updatedAt: serverTimestamp(),
        createdAt: payload.createdAt,
      });

      localStorage.setItem(key, JSON.stringify(payload));
      onMetaUpdate({ title: payload.title, cover: payload.cover, updatedAt: payload.updatedAt });
      setToast('💾 Saved & synced to cloud');
    } catch (err) {
      console.error(err);
      alert('⚠️ Save failed. Check Firebase connection.');
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 2000);
    }
  }

  // === ULTRA FAST IMAGE UPLOAD ===
  async function onCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image.');
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setCover(previewUrl);

    try {
      const storageRef = ref(storage, `${storageNS}/${recipeId}/cover-${Date.now()}.png`);
      await uploadBytes(storageRef, file, { contentType: file.type });

      const downloadURL = await getDownloadURL(storageRef);
      console.log('🌐 Permanent URL:', downloadURL);

      setCover(downloadURL);
      persistDraft(downloadURL);

      await setDoc(
        doc(db, storageNS, recipeId),
        { cover: downloadURL, updatedAt: serverTimestamp() },
        { merge: true }
      );

      // overwrite local blob immediately with permanent URL
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        parsed.cover = downloadURL;
        localStorage.setItem(key, JSON.stringify(parsed));
      }

      setToast('✅ Image uploaded & synced');
    } catch (err) {
      console.error('❌ Upload error:', err);
      alert('Upload failed: ' + (err as any).message);
    } finally {
      URL.revokeObjectURL(previewUrl);
      setTimeout(() => setToast(null), 2000);
    }
  }

  // === LOCAL DRAFT PERSIST ===
  function persistDraft(customCover?: string) {
    const draft: RecipeData & { status: 'draft' } = {
      id: recipeId,
      title: title || 'New Recipe',
      baseYield: Math.max(1, Number(baseYield) || 1),
      targetYield: Number(targetYield) || 1,
      ingredients,
      steps,
      cover: customCover ?? cover,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      status: 'draft',
    };
    localStorage.setItem(key, JSON.stringify(draft));
  }

  const removeCover = () => {
    setCover('');
    persistDraft('');
    setToast('🗑️ Image removed (draft)');
    setTimeout(() => setToast(null), 1600);
  };

  // === INGREDIENT / STEP HANDLERS ===
  const addIngredient = () =>
    setIngredients([...ingredients, { id: uid(), baseAmount: '', unit: '', item: '' }]);
  const updateIngredient = (id: string, field: keyof Ingredient, value: any) =>
    setIngredients((prev) => prev.map((ing) => (ing.id === id ? { ...ing, [field]: value } : ing)));
  const removeIngredient = (id: string) =>
    setIngredients((prev) => prev.filter((ing) => ing.id !== id));

  const addStep = () => setSteps([...steps, { id: uid(), text: '' }]);
  const updateStep = (id: string, text: string) =>
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, text } : s)));
  const removeStep = (id: string) => setSteps((prev) => prev.filter((s) => s.id !== id));

  const handleSave = async () => {
    await publishToFirebase();
    onBack();
  };

  useEffect(() => {
    persistDraft();
  }, [title, baseYield, targetYield, ingredients, steps, cover]);

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
      {/* Back */}
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

      {/* Title */}
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

      {/* Cover */}
      <section className="card" style={{ maxWidth: 1100, margin: '0 auto 1.25rem', padding: 20, borderRadius: 16 }}>
        <h3>Cover Image</h3>
        {!cover ? (
          <div style={{ textAlign: 'center' }}>
            <input type="file" accept="image/*" id="upload" onChange={onCoverChange} style={{ display: 'none' }} />
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
        ) : (
          <div style={{ position: 'relative', marginTop: 10 }}>
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
              <input type="file" accept="image/*" id="replace" onChange={onCoverChange} style={{ display: 'none' }} />
              <label htmlFor="replace" style={{ color: 'white', cursor: 'pointer', fontSize: 13, textDecoration: 'underline' }}>
                Replace
              </label>
              <span
                onClick={removeCover}
                style={{ color: '#ffbaba', cursor: 'pointer', fontSize: 13, textDecoration: 'underline' }}
              >
                Delete
              </span>
            </div>
          </div>
        )}
      </section>

      {/* Yield */}
      <section className="card" style={{ maxWidth: 1100, margin: '0 auto 1rem', padding: 20, borderRadius: 16 }}>
        <h3>Yield</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
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

      {/* Ingredients */}
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

      {/* Steps */}
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

      {/* Save */}
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
