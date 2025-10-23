'use client';

import { useEffect, useMemo, useState } from 'react';

type Ingredient = { id: string; amount: number | ''; unit: string; item: string };
type Step = { id: string; text: string };
type Recipe = {
  id: string;
  title: string;
  baseYield: number;
  targetYield: number;
  cover: string;        // data URL (PNG)
  ingredients: Ingredient[];
  steps: Step[];
  updatedAt: number;
};

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function defaultRecipe(): Recipe {
  return {
    id: uid(),
    title: 'New Recipe',
    baseYield: 10,
    targetYield: 10,
    cover: '',
    ingredients: [
      { id: uid(), amount: 30, unit: 'g', item: 'Ingredient' },
    ],
    steps: [{ id: uid(), text: 'Write your first step…' }],
    updatedAt: Date.now(),
  };
}

export default function RecipeBook({
  shelfKey,         // e.g. 'recipes:pastry'
  heading,          // page title
  subtitle,         // optional subtitle
}: {
  shelfKey: string;
  heading: string;
  subtitle?: string;
}) {
  // ---- Load shelf (array of recipes) ----
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(shelfKey);
    if (raw) {
      try {
        const arr: Recipe[] = JSON.parse(raw);
        setRecipes(Array.isArray(arr) ? arr : []);
        setActiveId(arr?.[0]?.id ?? null);
      } catch {
        setRecipes([]);
      }
    } else {
      const first = defaultRecipe();
      setRecipes([first]);
      setActiveId(first.id);
    }
  }, [shelfKey]);

  // Persist shelf
  useEffect(() => {
    localStorage.setItem(shelfKey, JSON.stringify(recipes));
  }, [recipes, shelfKey]);

  const active = recipes.find(r => r.id === activeId) || null;

  // ---- Shelf actions ----
  function createRecipe() {
    const r = defaultRecipe();
    setRecipes(prev => [r, ...prev]);
    setActiveId(r.id);
  }

  function duplicateRecipe(id: string) {
    const src = recipes.find(r => r.id === id);
    if (!src) return;
    const copy: Recipe = {
      ...src,
      id: uid(),
      title: src.title + ' (Copy)',
      updatedAt: Date.now(),
      ingredients: src.ingredients.map(i => ({ ...i, id: uid() })),
      steps: src.steps.map(s => ({ ...s, id: uid() })),
    };
    setRecipes(prev => [copy, ...prev]);
    setActiveId(copy.id);
  }

  function deleteRecipe(id: string) {
    setRecipes(prev => {
      const next = prev.filter(r => r.id !== id);
      if (activeId === id) setActiveId(next[0]?.id ?? null);
      return next;
    });
  }

  function updateActive(patch: Partial<Recipe>) {
    if (!active) return;
    setRecipes(prev =>
      prev.map(r => (r.id === active.id ? { ...r, ...patch, updatedAt: Date.now() } : r))
    );
  }

  // ---- Editor derived ----
  const factor = useMemo(() => {
    if (!active?.baseYield || !active?.targetYield) return 1;
    return active.targetYield / active.baseYield;
  }, [active?.baseYield, active?.targetYield]);

  // ---- Editor handlers ----
  function addIngredient() {
    if (!active) return;
    updateActive({
      ingredients: [
        ...active.ingredients,
        { id: uid(), amount: '', unit: '', item: '' },
      ],
    });
  }
  function delIngredient(rowId: string) {
    if (!active) return;
    updateActive({
      ingredients: active.ingredients.filter(i => i.id !== rowId),
    });
  }
  function addStep() {
    if (!active) return;
    updateActive({ steps: [...active.steps, { id: uid(), text: '' }] });
  }
  function delStep(rowId: string) {
    if (!active) return;
    updateActive({ steps: active.steps.filter(s => s.id !== rowId) });
  }
  function onCover(e: React.ChangeEvent<HTMLInputElement>) {
    if (!active) return;
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.type !== 'image/png') {
      alert('Please upload a PNG image.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => updateActive({ cover: String(reader.result) });
    reader.readAsDataURL(f);
  }

  return (
    <main className="container" style={{ paddingTop: '112px', paddingBottom: '48px' }}>
      {/* Header */}
      <section style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h1 className="title" style={{ marginBottom: 8 }}>{heading}</h1>
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </section>

      {/* Shelf + Editor layout */}
      <section style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 16 }}>
        {/* Shelf */}
        <aside className="card" style={{ padding: 14, borderRadius: 14, height: 'fit-content' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <h3 style={{ margin: 0 }}>Recipes</h3>
            <button className="btn" onClick={createRecipe}>New</button>
          </div>

          <div style={{ display: 'grid', gap: 8 }}>
            {recipes.map(r => (
              <div
                key={r.id}
                className="card"
                style={{
                  padding: 10,
                  borderRadius: 10,
                  cursor: 'pointer',
                  border: activeId === r.id ? '2px solid var(--gold, #CBA135)' : '1px solid rgba(0,0,0,.08)',
                  background: activeId === r.id ? 'rgba(203,161,53,0.06)' : 'transparent'
                }}
                onClick={() => setActiveId(r.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 8, overflow: 'hidden', background:'#eee' }}>
                    {r.cover ? (
                      <img src={r.cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : null}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{r.title || 'Untitled'}</div>
                    <div style={{ fontSize: 12, opacity: .75 }}>
                      {new Date(r.updatedAt).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                  <button className="btn-ghost" onClick={(e) => { e.stopPropagation(); duplicateRecipe(r.id); }}>Duplicate</button>
                  <button className="btn-ghost" onClick={(e) => { e.stopPropagation(); deleteRecipe(r.id); }}>Delete</button>
                </div>
              </div>
            ))}
            {recipes.length === 0 && (
              <div style={{ fontSize: 14, opacity: .7 }}>No recipes yet.</div>
            )}
          </div>
        </aside>

        {/* Editor */}
        <section style={{ display: 'grid', gap: 14 }}>
          {!active ? (
            <div className="card" style={{ padding: 20, borderRadius: 16 }}>
              <p>No recipe selected.</p>
            </div>
          ) : (
            <>
              {/* Meta */}
              <div className="card" style={{ padding: 20, borderRadius: 16 }}>
                <div style={{ display: 'grid', gap: 12 }}>
                  <label style={{ fontWeight: 600 }}>
                    Recipe Title
                    <input
                      value={active.title}
                      onChange={(e) => updateActive({ title: e.target.value })}
                      placeholder="e.g., Honey Caviar"
                      style={{ width: '100%', padding: 12, marginTop: 6, borderRadius: 10, border: '1px solid rgba(0,0,0,.15)' }}
                    />
                  </label>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
                    <label style={{ fontWeight: 600 }}>
                      Written For (Base Yield)
                      <input
                        type="number"
                        min={1}
                        value={active.baseYield}
                        onChange={(e) => updateActive({ baseYield: Number(e.target.value) || 1 })}
                        style={{ width: '100%', padding: 12, marginTop: 6, borderRadius: 10, border: '1px solid rgba(0,0,0,.15)' }}
                      />
                    </label>

                    <label style={{ fontWeight: 600 }}>
                      Cook For (Target Portions)
                      <input
                        type="number"
                        min={1}
                        value={active.targetYield}
                        onChange={(e) => updateActive({ targetYield: Number(e.target.value) || 1 })}
                        style={{ width: '100%', padding: 12, marginTop: 6, borderRadius: 10, border: '1px solid rgba(0,0,0,.15)' }}
                      />
                    </label>
                  </div>

                  <div style={{ fontSize: 14, opacity: .8 }}>
                    Scaling factor: <strong>{Number.isFinite(factor) ? factor.toFixed(2) : '—'}</strong>
                  </div>
                </div>
              </div>

              {/* Cover */}
              <div className="card" style={{ padding: 20, borderRadius: 16 }}>
                <div style={{ display: 'grid', gap: 12 }}>
                  <label style={{ fontWeight: 600 }}>
                    Cover Image (PNG)
                    <input type="file" accept="image/png" onChange={onCover} style={{ display: 'block', marginTop: 8 }} />
                  </label>
                  {active.cover && (
                    <img
                      src={active.cover}
                      alt="Cover"
                      style={{ width: '100%', maxHeight: 420, objectFit: 'cover', borderRadius: 12, border: '1px solid rgba(0,0,0,.08)' }}
                    />
                  )}
                </div>
              </div>

              {/* Ingredients */}
              <div className="card" style={{ padding: 20, borderRadius: 16 }}>
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
                      {active.ingredients.map((ing) => {
                        const scaled =
                          typeof ing.amount === 'number' && Number.isFinite(factor)
                            ? ing.amount * factor
                            : '';
                        return (
                          <tr key={ing.id} style={{ borderTop: '1px solid rgba(0,0,0,.06)' }}>
                            <td style={{ padding: 8, minWidth: 130 }}>
                              <input
                                type="number"
                                step="any"
                                value={ing.amount}
                                onChange={(e) => {
                                  const val = e.target.value === '' ? '' : Number(e.target.value);
                                  updateActive({
                                    ingredients: active.ingredients.map(r =>
                                      r.id === ing.id ? { ...r, amount: val } : r
                                    ),
                                  });
                                }}
                                style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid rgba(0,0,0,.15)' }}
                              />
                            </td>
                            <td style={{ padding: 8, minWidth: 90 }}>
                              <input
                                value={ing.unit}
                                onChange={(e) =>
                                  updateActive({
                                    ingredients: active.ingredients.map(r =>
                                      r.id === ing.id ? { ...r, unit: e.target.value } : r
                                    ),
                                  })
                                }
                                placeholder="g / ml / tsp"
                                style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid rgba(0,0,0,.15)' }}
                              />
                            </td>
                            <td style={{ padding: 8 }}>
                              <input
                                value={ing.item}
                                onChange={(e) =>
                                  updateActive({
                                    ingredients: active.ingredients.map(r =>
                                      r.id === ing.id ? { ...r, item: e.target.value } : r
                                    ),
                                  })
                                }
                                placeholder="Ingredient name"
                                style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid rgba(0,0,0,.15)' }}
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
              </div>

              {/* Method */}
              <div className="card" style={{ padding: 20, borderRadius: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 style={{ margin: 0 }}>Method</h2>
                  <button className="btn" onClick={addStep}>Add Step</button>
                </div>

                <ol style={{ marginTop: 12 }}>
                  {active.steps.map((s, i) => (
                    <li key={s.id} style={{ margin: '10px 0' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, alignItems: 'start' }}>
                        <textarea
                          value={s.text}
                          onChange={(e) =>
                            updateActive({
                              steps: active.steps.map(r => (r.id === s.id ? { ...r, text: e.target.value } : r)),
                            })
                          }
                          placeholder={`Step ${i + 1}…`}
                          rows={3}
                          style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid rgba(0,0,0,.15)', resize: 'vertical' }}
                        />
                        <button className="btn-ghost" onClick={() => delStep(s.id)}>Remove</button>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </>
          )}
        </section>
      </section>

      {/* Responsive: shelf above editor on small screens */}
      <style jsx>{`
        @media (max-width: 960px) {
          section[style*="grid-template-columns: 280px 1fr"] {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
