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
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // === Real-time Firestore sync ===
  useEffect(() => {
    const refDoc = doc(db, storageNS, recipeId);
    const unsub = onSnapshot(refDoc, (snap) => {
      if (snap.exists()) {
        const d = snap.data() as any;
        setTitle(d.title || 'New Recipe');
        setBaseYield(d.baseYield || 1);
        setTargetYield(d.targetYield || 1);
        setIngredients(d.ingredients || []);
        setSteps(d.steps || [{ id: uid(), text: '' }]);
        setCover(d.cover || '');
        localStorage.setItem(key, JSON.stringify(d));
      } else {
        const raw = localStorage.getItem(key);
        if (raw) {
          const r = JSON.parse(raw);
          setTitle(r.title);
          setBaseYield(r.baseYield);
          setTargetYield(r.targetYield);
          setIngredients(r.ingredients);
          setSteps(r.steps);
          setCover(r.cover ?? '');
        }
      }
      setLoading(false);
    });
    return () => unsub();
  }, [storageNS, recipeId]);

  const factor = useMemo(() => {
    const b = Math.max(1, Number(baseYield) || 1);
    const t = Number(targetYield) || 1;
    return t / b;
  }, [baseYield, targetYield]);

  // === Save / Publish ===
  async function publishToFirebase(customCover?: string) {
    if (!title.trim()) {
      alert('Please add a title before saving.');
      return;
    }

    setSaving(true);
    const payload: RecipeData = {
      id: recipeId,
      title: title.trim(),
      baseYield,
      targetYield,
      ingredients,
      steps,
      cover: customCover ?? cover,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      status: 'published',
    };

    try {
      await setDoc(doc(db, storageNS, recipeId), {
        ...payload,
        updatedAt: serverTimestamp(),
      });
      localStorage.setItem(key, JSON.stringify(payload));
      onMetaUpdate({ title: payload.title, cover: payload.cover, updatedAt: payload.updatedAt });
      setToast('💾 Saved & Synced');
    } catch (err) {
      console.error('Save error:', err);
      alert('⚠️ Firebase connection failed.');
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 2000);
    }
  }

  // === Image Upload (fixed) ===
  async function onCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }

    // 1️⃣ Instant preview (temporary)
    const previewUrl = URL.createObjectURL(file);
    setCover(previewUrl);

    try {
      // 2️⃣ Upload to Firebase Storage
      const storageRef = ref(storage, `${storageNS}/${recipeId}/cover-${Date.now()}.png`);
      await uploadBytes(storageRef, file);

      // 3️⃣ Get permanent download URL
      const downloadURL = await getDownloadURL(storageRef);

      // 4️⃣ Replace local preview with permanent URL
      setCover(downloadURL);
      persistDraft(downloadURL);

      // 5️⃣ Save to Firestore immediately (so other devices get it)
      await setDoc(
        doc(db, storageNS, recipeId),
        {
          cover: downloadURL,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      setToast('✅ Image uploaded & synced');
    } catch (err) {
      console.error(err);
      alert('❌ Upload failed. Check Firebase Storage rules.');
    } finally {
      URL.revokeObjectURL(previewUrl);
      setTimeout(() => setToast(null), 2000);
    }
  }

  function persistDraft(customCover?: string) {
    const draft: RecipeData & { status: 'draft' } = {
      id: recipeId,
      title,
      baseYield,
      targetYield,
      ingredients,
      steps,
      cover: customCover ?? cover,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      status: 'draft',
    };
    localStorage.setItem(key, JSON.stringify(draft));
  }

  const handleSave = async () => {
    await publishToFirebase();
    onBack();
  };

  useEffect(() => {
    persistDraft();
  }, [title, baseYield, targetYield, ingredients, steps, cover]);

  return loading ? (
    <p style={{ textAlign: 'center', marginTop: 100 }}>Loading recipe...</p>
  ) : (
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
          </div>
        )}
      </section>

      {/* Ingredients & Method (unchanged) */}
      {/* ... keep your ingredient and step sections exactly as before ... */}

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
