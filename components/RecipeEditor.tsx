'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { doc, setDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'next/navigation';
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
  cover?: string; // ALWAYS http(s) or data: URL (never blob:)
  createdAt: number;
  updatedAt: number;
  status?: 'draft' | 'published';
};

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function formatTime(ts: number) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(ts));
  } catch {
    const d = new Date(ts);
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  }
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
  const [cover, setCover] = useState<string>(''); // http(s) or data:
  const [toast, setToast] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Phase 8.4 UX
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'draft'>('idle');
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);

  // Avoid autosave loops / excessive writes
  const hydratedRef = useRef(false);
  const autosaveTimerRef = useRef<number | null>(null);

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

          // Local mirror
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

          setSaveState('saved');
          setLastSavedAt(Date.now());
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
            setSaveState(r.status === 'draft' ? 'draft' : 'idle');
          } else {
            setSaveState('idle');
          }
        }

        hydratedRef.current = true;
        setLoading(false);
      },
      (err) => {
        console.error('Sync error:', err);
        hydratedRef.current = true;
        setSaveState('draft');
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
    setSaveState((prev) => (prev === 'saving' ? prev : 'draft'));
  }

  // === SAVE TO FIRESTORE (cloud) ===
  async function publishToFirebase(customCover?: string) {
    if (!title.trim()) {
      alert('Please add a title before saving.');
      return;
    }

    setSaving(true);
    setSaveState('saving');

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

      setSaveState('saved');
      setLastSavedAt(Date.now());
      setToast('💾 Saved & synced to cloud');
    } catch (err) {
      console.error(err);
      setSaveState('draft');
      alert('⚠️ Save failed. Stored as local draft. Check Firebase connection.');
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 2000);
    }
  }

  // Compress to data URL (fast)
  function fileToCompressedDataURL(file: File, maxWidth: number, quality: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result !== 'string') return reject('bad image');
        img.src = reader.result;
      };
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('no canvas');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // === FAST IMAGE UPLOAD WITH AUTOMATIC FALLBACK (NO BLOB IN FIRESTORE) ===
  async function onCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image.');
      return;
    }

    // Instant preview ONLY in state (not saved anywhere)
    const previewUrl = URL.createObjectURL(file);
    setCover(previewUrl);

    try {
      setSaveState('saving');

      const storageRef = ref(storage, `${storageNS}/${recipeId}/cover-${Date.now()}.png`);
      await uploadBytes(storageRef, file, { contentType: file.type });
      const downloadURL = await getDownloadURL(storageRef);

      setCover(downloadURL);
      persistDraft(downloadURL);

      await setDoc(
        doc(db, storageNS, recipeId),
        { cover: downloadURL, updatedAt: serverTimestamp() },
        { merge: true }
      );

      setSaveState('saved');
      setLastSavedAt(Date.now());
      setToast('✅ Image uploaded & synced');
    } catch (err) {
      console.warn('Storage unavailable, using inline data URL fallback.', err);

      const dataUrl = await fileToCompressedDataURL(file, 1280, 0.9);
      setCover(dataUrl);
      persistDraft(dataUrl);

      await setDoc(
        doc(db, storageNS, recipeId),
        { cover: dataUrl, updatedAt: serverTimestamp() },
        { merge: true }
      );

      setSaveState('saved');
      setLastSavedAt(Date.now());
      setToast('✅ Image saved (inline) & synced');
    } finally {
      URL.revokeObjectURL(previewUrl);
      setTimeout(() => setToast(null), 2000);
    }
  }

  const removeCover = () => {
    setCover('');
    persistDraft('');
    setToast('🗑️ Image removed (draft)');
    setTimeout(() => setToast(null), 1600);
  };

  // === INGREDIENT / STEP HANDLERS ===
  const addIngredient = () =>
    setIngredients((prev) => [...prev, { id: uid(), baseAmount: '', unit: '', item: '' }]);

  const updateIngredient = (id: string, field: keyof Ingredient, value: any) =>
    setIngredients((prev) => prev.map((ing) => (ing.id === id ? { ...ing, [field]: value } : ing)));

  const removeIngredient = (id: string) =>
    setIngredients((prev) => prev.filter((ing) => ing.id !== id));

  const addStep = () => setSteps((prev) => [...prev, { id: uid(), text: '' }]);

  const updateStep = (id: string, text: string) =>
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, text } : s)));

  const removeStep = (id: string) => setSteps((prev) => prev.filter((s) => s.id !== id));

  // === AUTOSAVE (debounced) ===
  useEffect(() => {
    persistDraft();

    if (!hydratedRef.current) return;
    if (!title.trim()) return;

    if (autosaveTimerRef.current) window.clearTimeout(autosaveTimerRef.current);

    autosaveTimerRef.current = window.setTimeout(async () => {
      // Avoid autosaving while the explicit save is running
      if (saving) return;
      try {
        await publishToFirebase();
      } catch {
        // publishToFirebase already handles UI + fallback
      }
    }, 900);

    return () => {
      if (autosaveTimerRef.current) window.clearTimeout(autosaveTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, baseYield, targetYield, ingredients, steps, cover]);

  const handleSaveNow = async () => {
    await publishToFirebase();
  };

  const saveLabel =
    saveState === 'saving'
      ? 'Saving…'
      : saveState === 'saved' && lastSavedAt
      ? `Saved ${formatTime(lastSavedAt)}`
      : saveState === 'draft'
      ? 'Offline draft'
      : 'Ready';

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

      {/* Top actions */}
      <div
        className="recipe-editor-topbar"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
          flexWrap: 'wrap',
          maxWidth: 1100,
          margin: '0 auto 1rem',
        }}
      >
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button type="button" className="btn btn--ghost" onClick={onBack}>
            ← Back to Shelf
          </button>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <span className="save-pill">{saveLabel}</span>
          <button type="button" className="btn btn--primary" onClick={handleSaveNow} disabled={saving}>
            💾 Save Now
          </button>
        </div>
      </div>

      {/* Heading */}
      <section
        className="card"
        style={{
          maxWidth: 1100,
          margin: '0 auto 1rem',
          padding: 20,
          borderRadius: 16,
        }}
      >
        <h2 style={{ margin: 0 }}>{heading}</h2>
        {subtitle && <p style={{ marginTop: 6, opacity: 0.7 }}>{subtitle}</p>}
      </section>

      {/* Title */}
      <section
        className="card"
        style={{ maxWidth: 1100, margin: '0 auto 1rem', padding: 20, borderRadius: 16 }}
      >
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
      <section
        className="card"
        style={{ maxWidth: 1100, margin: '0 auto 1.25rem', padding: 20, borderRadius: 16 }}
      >
        <h3 style={{ marginTop: 0 }}>Cover Image</h3>

        {!cover ? (
          <div style={{ textAlign: 'center' }}>
            <input
              type="file"
              accept="image/*"
              id="upload"
              onChange={onCoverChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="upload" className="btn btn--primary" style={{ borderRadius: 12 }}>
              📷 Upload Image
            </label>
          </div>
        ) : (
          <div style={{ position: 'relative', marginTop: 10 }}>
            <img
              src={cover}
              alt="cover"
              style={{
                width: '100%',
                borderRadius: 12,
                border: '1px solid rgba(0,0,0,.15)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                background: 'rgba(0,0,0,0.55)',
                padding: '6px 10px',
                borderRadius: 8,
                display: 'flex',
                gap: 10,
                alignItems: 'center',
              }}
            >
              <input
                type="file"
                accept="image/*"
                id="replace"
                onChange={onCoverChange}
                style={{ display: 'none' }}
              />
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
            </div>
          </div>
        )}
      </section>

      {/* Yield */}
      <section
        className="card"
        style={{ maxWidth: 1100, margin: '0 auto 1rem', padding: 20, borderRadius: 16 }}
      >
        <h3 style={{ marginTop: 0 }}>Yield</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <label>
            Base Yield:
            <input
              type="number"
              min={1}
              value={baseYield}
              onChange={(e) => {
                const n = Number(e.target.value || '1');
                setBaseYield(Math.max(1, n));
              }}
              style={{ marginLeft: 8, width: 90 }}
            />
          </label>

          <label>
            Target Yield:
            <input
              type="number"
              min={1}
              value={targetYield}
              onChange={(e) => {
                const n = Number(e.target.value || '1');
                setTargetYield(Math.max(1, n));
              }}
              style={{ marginLeft: 8, width: 90 }}
            />
          </label>

          <div style={{ opacity: 0.8 }}>Scaling ×{factor.toFixed(2)}</div>
        </div>
      </section>

      {/* Ingredients */}
      <section
        className="card"
        style={{ maxWidth: 1100, margin: '0 auto 1rem', padding: 20, borderRadius: 16 }}
      >
        <h3 style={{ marginTop: 0 }}>Ingredients</h3>

        {ingredients.map((ing) => (
          <div key={ing.id} style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
            <input
              type="number"
              placeholder="Qty"
              value={typeof ing.baseAmount === 'number' ? +(ing.baseAmount * factor).toFixed(2) : ''}
              onChange={(e) => {
                const scaled = parseFloat(e.target.value || '0');
                updateIngredient(ing.id, 'baseAmount', scaled / factor);
              }}
              style={{ width: 90 }}
            />
            <input
              type="text"
              placeholder="Unit"
              value={ing.unit}
              onChange={(e) => updateIngredient(ing.id, 'unit', e.target.value)}
              style={{ width: 120 }}
            />
            <input
              type="text"
              placeholder="Ingredient"
              value={ing.item}
              onChange={(e) => updateIngredient(ing.id, 'item', e.target.value)}
              style={{ flex: 1, minWidth: 220 }}
            />

            <button type="button" className="btn btn--danger btn--sm" onClick={() => removeIngredient(ing.id)}>
              ✕
            </button>
          </div>
        ))}

        <button type="button" className="btn btn--ghost btn--sm" onClick={addIngredient}>
          + Add Ingredient
        </button>
      </section>

      {/* Steps */}
      <section
        className="card"
        style={{ maxWidth: 1100, margin: '0 auto 1rem', padding: 20, borderRadius: 16 }}
      >
        <h3 style={{ marginTop: 0 }}>Method</h3>

        {steps.map((s) => (
          <div key={s.id} style={{ display: 'flex', gap: 8, marginBottom: 10, alignItems: 'flex-start' }}>
            <textarea
              value={s.text}
              onChange={(e) => updateStep(s.id, e.target.value)}
              style={{ flex: 1, height: 92, padding: 10, borderRadius: 10, border: '1px solid rgba(0,0,0,.15)' }}
            />
            <button type="button" className="btn btn--danger btn--sm" onClick={() => removeStep(s.id)}>
              ✕
            </button>
          </div>
        ))}

        <button type="button" className="btn btn--ghost btn--sm" onClick={addStep}>
          + Add Step
        </button>
      </section>

      {/* Bottom save */}
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <button type="button" className="btn btn--primary" onClick={handleSaveNow} disabled={saving}>
          {saving ? 'Saving…' : '💾 Save Now'}
        </button>
      </div>
    </main>
  );
}
