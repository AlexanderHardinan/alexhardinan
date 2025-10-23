'use client';

import { useEffect, useMemo, useState } from 'react';

type Ingredient = { id: string; amount: number | ''; unit: string; item: string };
type Step = { id: string; text: string };

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export default function RecipeEditor({
  storageKey,
  heading,
  subtitle,
}: {
  storageKey: string;           // unique per page (e.g., 'recipe:pastry')
  heading: string;              // page title
  subtitle?: string;            // optional sub heading
}) {
  // ---------- STATE ----------
  const [title, setTitle] = useState('New Recipe');
  const [baseYield, setBaseYield] = useState<number>(10);     // recipe written for X portions
  const [targetYield, setTargetYield] = useState<number>(10); // user wants to cook Y portions
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: uid(), amount: 30, unit: 'g', item: 'Honey' },
    { id: uid(), amount: 70, unit: 'ml', item: 'Water' },
  ]);
  const [steps, setSteps] = useState<Step[]>([
    { id: uid(), text: 'Write your first step here…' },
  ]);
  const [cover, setCover] = useState<string>(''); // data URL preview (PNG)

  // ---------- LOAD / SAVE ----------
  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return;
    try {
      const s = JSON.parse(raw);
      setTitle(s.title ?? 'New Recipe');
      setBaseYield(s.baseYield ?? 10);
      setTargetYield(s.targetYield ?? s.baseYield ?? 10);
      setIngredients(s.ingredients?.length ? s.ingredients : []);
      setSteps(s.steps?.length ? s.steps : [{ id: uid(), text: '' }]);
      setCover(s.cover ?? '');
    } catch {}
  }, [storageKey]);

  useEffect(() => {
    const payload = {
      title,
      baseYield,
      targetYield,
      ingredients,
      steps,
      cover,
    };
    localStorage.setItem(storageKey, JSON.stringify(payload));
  }, [title, baseYield, targetYield, ingredients, steps, cover, storageKey]);

  // ---------- DERIVED ----------
  const factor = useMemo(() => {
    if (!baseYield || !targetYield) return 1;
    return targetYield / baseYield;
  }, [baseYield, targetYield]);

  // ---------- HANDLERS ----------
  function addIngredient() {
    setIngredients((v) => [...v, { id: uid(), amount: '', unit: '', item: '' }]);
  }
  function delIngredient(id: string) {
    setIngredients((v) => v.filter((r) => r.id !== id));
  }
  function addStep() {
    setSteps((v) => [...v, { id: uid(), text: '' }]);
  }
  function delStep(id: string) {
    setSteps((v) => v.filter((r) => r.id !== id));
  }
  function onCover(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.type !== 'image/png') {
      alert('Please upload a PNG image.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setCover(String(reader.result));
    reader.readAsDataURL(f);
  }

  // ---------- UI ----------
  return (
    <main className="container" style={{ paddingTop: '112px', paddingBottom: '48px' }}>
      <section style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h1 className="title" style={{ marginBottom: 8 }}>{heading}</h1>
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </section>

      {/* Card: Header / Meta */}
      <section
        className="card"
        style={{ maxWidth: 1100, margin: '0 auto 1.25rem', padding: 20, borderRadius: 16 }}
      >
        <div style={{ display: 'grid', gap: 12 }}>
          <label style={{ fontWeight: 600 }}>
            Recipe Title
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Honey Caviar"
              style={{
                width: '100%', padding: 12, marginTop: 6, borderRadius: 10,
                border: '1px solid rgba(0,0,0,.15)'
              }}
            />
          </label>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: 12,
            }}
          >
            <label style={{ fontWeight: 600 }}>
              Written For (Base Yield)
              <input
                type="number"
                min={1}
                value={baseYield}
                onChange={(e) => setBaseYield(Number(e.target.value) || 1)}
                style={{
                  width: '100%', padding: 12, marginTop: 6, borderRadius: 10,
                  border: '1px solid rgba(0,0,0,.15)'
                }}
              />
            </label>

            <label style={{ fontWeight: 600 }}>
              Cook For (Target Portions)
              <input
                type="number"
                min={1}
                value={targetYield}
                onChange={(e) => setTargetYield(Number(e.target.value) || 1)}
                style={{
                  width: '100%', padding: 12, marginTop: 6, borderRadius: 10,
                  border: '1px solid rgba(0,0,0,.15)'
                }}
              />
            </label>
          </div>

          <div style={{ fontSize: 14, opacity: 0.8 }}>
            Scaling factor: <strong>{Number.isFinite(factor) ? factor.toFixed(2) : '—'}</strong>
          </div>
        </div>
      </section>

      {/* Card: Cover image */}
      <section
        className="card"
        style={{ maxWidth: 1100, margin: '0 auto 1.25rem', padding: 20, borderRadius: 16 }}
      >
        <div style={{ display: 'grid', gap: 12 }}>
          <label style={{ fontWeight: 600 }}>
            Cover Image (PNG)
            <input
              type="file"
              accept="image/png"
              onChange={onCover}
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
                border: '1px solid rgba(0,0,0,.08)',
              }}
            />
          )}
        </div>
      </section>

      {/* Card: Ingredients */}
      <section
        className="card"
        style={{ maxWidth: 1100, margin: '0 auto 1.25rem', padding: 20, borderRadius: 16 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>Ingredients</h2>
          <button className="btn" onClick={addIngredient}>Add Ingredient</button>
        </div>

        <div style={{ marginTop: 12, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr style={{ textAlign: 'left', fontSize: 14, opacity: 0.75 }}>
                <th style={{ padding: '10px 8px' }}>Amount (Base)</th>
                <th style={{ padding: '10px 8px' }}>Unit</th>
                <th style={{ padding: '10px 8px' }}>Ingredient</th>
                <th style={{ padding: '10px 8px' }}>Scaled</th>
                <th style={{ padding: '10px 8px' }} />
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ing) => {
                const scaled =
                  typeof ing.amount === 'number' && Number.isFinite(factor)
                    ? (ing.amount * factor)
                    : '';
                return (
                  <tr key={ing.id} style={{ borderTop: '1px solid rgba(0,0,0,.06)' }}>
                    <td style={{ padding: 8, minWidth: 130 }}>
                      <input
                        type="number"
                        step="any"
                        value={ing.amount}
                        onChange={(e) =>
                          setIngredients((v) =>
                            v.map((r) =>
                              r.id === ing.id
                                ? { ...r, amount: e.target.value === '' ? '' : Number(e.target.value) }
                                : r
                            )
                          )
                        }
                        style={{
                          width: '100%', padding: 10, borderRadius: 8,
                          border: '1px solid rgba(0,0,0,.15)'
                        }}
                      />
                    </td>
                    <td style={{ padding: 8, minWidth: 90 }}>
                      <input
                        value={ing.unit}
                        onChange={(e) =>
                          setIngredients((v) => v.map((r) => (r.id === ing.id ? { ...r, unit: e.target.value } : r)))
                        }
                        placeholder="g / ml / tsp"
                        style={{
                          width: '100%', padding: 10, borderRadius: 8,
                          border: '1px solid rgba(0,0,0,.15)'
                        }}
                      />
                    </td>
                    <td style={{ padding: 8 }}>
                      <input
                        value={ing.item}
                        onChange={(e) =>
                          setIngredients((v) => v.map((r) => (r.id === ing.id ? { ...r, item: e.target.value } : r)))
                        }
                        placeholder="Ingredient name"
                        style={{
                          width: '100%', padding: 10, borderRadius: 8,
                          border: '1px solid rgba(0,0,0,.15)'
                        }}
                      />
                    </td>
                    <td style={{ padding: 8, minWidth: 130, whiteSpace: 'nowrap' }}>
                      <span style={{ fontWeight: 600 }}>
                        {scaled === '' ? '—' : parseFloat(String(scaled)).toFixed(2)} {ing.unit}
                      </span>
                    </td>
                    <td style={{ padding: 8, textAlign: 'right', minWidth: 80 }}>
                      <button className="btn-ghost" onClick={() => delIngredient(ing.id)}>Remove</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Card: Method */}
      <section
        className="card"
        style={{ maxWidth: 1100, margin: '0 auto', padding: 20, borderRadius: 16 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>Method</h2>
          <button className="btn" onClick={addStep}>Add Step</button>
        </div>

        <ol style={{ marginTop: 12 }}>
          {steps.map((s, i) => (
            <li key={s.id} style={{ margin: '10px 0' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, alignItems: 'start' }}>
                <textarea
                  value={s.text}
                  onChange={(e) =>
                    setSteps((v) => v.map((r) => (r.id === s.id ? { ...r, text: e.target.value } : r)))
                  }
                  placeholder={`Step ${i + 1}…`}
                  rows={3}
                  style={{
                    width: '100%', padding: 12, borderRadius: 10,
                    border: '1px solid rgba(0,0,0,.15)', resize: 'vertical'
                  }}
                />
                <button className="btn-ghost" onClick={() => delStep(s.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
