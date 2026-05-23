'use client';

import { useEffect, useMemo, useState } from 'react';

type Ingredient = { id: string; amount: number | ''; unit: string; item: string };
type Step = { id: string; text: string };

type Recipe = {
  id: string;
  title: string;
  baseYield: number;
  targetYield: number;
  cover: string;
  ingredients: Ingredient[];
  steps: Step[];
  updatedAt: number;
};

type RecipeGroup = {
  id: string;
  name: string;
  icon: string;
  shelfKey: string;
};

type RecipeCategory = {
  id: string;
  name: string;
  icon: string;
  groups: RecipeGroup[];
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
    ingredients: [{ id: uid(), amount: 30, unit: 'g', item: 'Ingredient' }],
    steps: [{ id: uid(), text: 'Write your first step…' }],
    updatedAt: Date.now(),
  };
}

function makeShelfKey(base: string, categoryId: string, groupId: string) {
  return `${base}:${categoryId}:${groupId}`;
}

function defaultStructure(baseShelfKey: string): RecipeCategory[] {
  const categoryId = 'the-globe';

  return [
    {
      id: categoryId,
      name: 'The Globe',
      icon: '',
      groups: [
        {
          id: 'pastry-bakery',
          name: 'Pastry & Bakery',
          icon: '',
          shelfKey: makeShelfKey(baseShelfKey, categoryId, 'pastry-bakery'),
        },
        {
          id: 'sauces',
          name: 'Sauces',
          icon: '',
          shelfKey: makeShelfKey(baseShelfKey, categoryId, 'sauces'),
        },
        {
          id: 'gastronomy-molecular',
          name: 'Gastronomy & Molecular',
          icon: '',
          shelfKey: makeShelfKey(baseShelfKey, categoryId, 'gastronomy-molecular'),
        },
        {
          id: 'all-about',
          name: 'All About',
          icon: '',
          shelfKey: makeShelfKey(baseShelfKey, categoryId, 'all-about'),
        },
      ],
    },
  ];
}

export default function RecipeBook({
  shelfKey,
  heading,
  subtitle,
}: {
  shelfKey: string;
  heading: string;
  subtitle?: string;
}) {
  const structureKey = `${shelfKey}:recipe-book-structure`;

  const [categories, setCategories] = useState<RecipeCategory[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(structureKey);

    if (raw) {
      try {
        const parsed: RecipeCategory[] = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCategories(parsed);
          setActiveCategoryId(parsed[0].id);
          setActiveGroupId(null);
          return;
        }
      } catch {
        // fallback below
      }
    }

    const next = defaultStructure(shelfKey);
    setCategories(next);
    setActiveCategoryId(next[0].id);
    setActiveGroupId(null);
    localStorage.setItem(structureKey, JSON.stringify(next));
  }, [shelfKey, structureKey]);

  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem(structureKey, JSON.stringify(categories));
    }
  }, [categories, structureKey]);

  const activeCategory = useMemo(
    () => categories.find((c) => c.id === activeCategoryId) || null,
    [categories, activeCategoryId],
  );

  const activeGroup = useMemo(
    () => activeCategory?.groups.find((g) => g.id === activeGroupId) || null,
    [activeCategory, activeGroupId],
  );

  useEffect(() => {
    if (!activeGroup) {
      setRecipes([]);
      setActiveId(null);
      return;
    }

    const raw = localStorage.getItem(activeGroup.shelfKey);

    if (raw) {
      try {
        const arr: Recipe[] = JSON.parse(raw);
        setRecipes(Array.isArray(arr) ? arr : []);
        setActiveId(arr?.[0]?.id ?? null);
        return;
      } catch {
        setRecipes([]);
        setActiveId(null);
        return;
      }
    }

    const legacyRaw = localStorage.getItem(shelfKey);
    if (activeGroup.id === 'pastry-bakery' && legacyRaw) {
      try {
        const legacyArr: Recipe[] = JSON.parse(legacyRaw);
        if (Array.isArray(legacyArr)) {
          setRecipes(legacyArr);
          setActiveId(legacyArr?.[0]?.id ?? null);
          localStorage.setItem(activeGroup.shelfKey, JSON.stringify(legacyArr));
          return;
        }
      } catch {
        // fallback below
      }
    }

    const first = defaultRecipe();
    setRecipes([first]);
    setActiveId(first.id);
    localStorage.setItem(activeGroup.shelfKey, JSON.stringify([first]));
  }, [activeGroup, shelfKey]);

  useEffect(() => {
    if (activeGroup) {
      localStorage.setItem(activeGroup.shelfKey, JSON.stringify(recipes));
    }
  }, [recipes, activeGroup]);

  const active = recipes.find((r) => r.id === activeId) || null;

  const factor = useMemo(() => {
    if (!active?.baseYield || !active?.targetYield) return 1;
    return active.targetYield / active.baseYield;
  }, [active?.baseYield, active?.targetYield]);

  function readPng(file: File, cb: (dataUrl: string) => void) {
    if (file.type !== 'image/png') {
      alert('Please upload a PNG image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => cb(String(reader.result));
    reader.readAsDataURL(file);
  }

  function addCategory() {
    const name = prompt('Category name');
    if (!name?.trim()) return;

    const id = uid();
    const next: RecipeCategory = {
      id,
      name: name.trim(),
      icon: '',
      groups: [],
    };

    setCategories((prev) => [next, ...prev]);
    setActiveCategoryId(id);
    setActiveGroupId(null);
  }

  function renameCategory(categoryId: string) {
    const current = categories.find((c) => c.id === categoryId);
    if (!current) return;

    const name = prompt('Rename category', current.name);
    if (!name?.trim()) return;

    setCategories((prev) =>
      prev.map((c) => (c.id === categoryId ? { ...c, name: name.trim() } : c)),
    );
  }

  function deleteCategory(categoryId: string) {
    const current = categories.find((c) => c.id === categoryId);
    if (!current) return;

    if (!confirm(`Delete category "${current.name}"? This will remove its groups from this view.`)) return;

    setCategories((prev) => prev.filter((c) => c.id !== categoryId));
    setActiveCategoryId(null);
    setActiveGroupId(null);
  }

  function updateCategoryIcon(categoryId: string, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    readPng(file, (icon) => {
      setCategories((prev) =>
        prev.map((c) => (c.id === categoryId ? { ...c, icon } : c)),
      );
    });
  }

  function addGroup(categoryId: string) {
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return;

    const name = prompt('Group name');
    if (!name?.trim()) return;

    const id = uid();
    const group: RecipeGroup = {
      id,
      name: name.trim(),
      icon: '',
      shelfKey: makeShelfKey(shelfKey, categoryId, id),
    };

    setCategories((prev) =>
      prev.map((c) => (c.id === categoryId ? { ...c, groups: [group, ...c.groups] } : c)),
    );
    setActiveGroupId(group.id);
  }

  function renameGroup(categoryId: string, groupId: string) {
    const group = categories
      .find((c) => c.id === categoryId)
      ?.groups.find((g) => g.id === groupId);

    if (!group) return;

    const name = prompt('Rename group', group.name);
    if (!name?.trim()) return;

    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId
          ? {
              ...c,
              groups: c.groups.map((g) =>
                g.id === groupId ? { ...g, name: name.trim() } : g,
              ),
            }
          : c,
      ),
    );
  }

  function deleteGroup(categoryId: string, groupId: string) {
    const group = categories
      .find((c) => c.id === categoryId)
      ?.groups.find((g) => g.id === groupId);

    if (!group) return;

    if (!confirm(`Delete group "${group.name}"? Recipes saved under its storage key will remain in localStorage.`)) return;

    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId
          ? { ...c, groups: c.groups.filter((g) => g.id !== groupId) }
          : c,
      ),
    );

    if (activeGroupId === groupId) setActiveGroupId(null);
  }

  function updateGroupIcon(categoryId: string, groupId: string, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    readPng(file, (icon) => {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === categoryId
            ? {
                ...c,
                groups: c.groups.map((g) => (g.id === groupId ? { ...g, icon } : g)),
              }
            : c,
        ),
      );
    });
  }

  function createRecipe() {
    const r = defaultRecipe();
    setRecipes((prev) => [r, ...prev]);
    setActiveId(r.id);
  }

  function duplicateRecipe(id: string) {
    const src = recipes.find((r) => r.id === id);
    if (!src) return;

    const copy: Recipe = {
      ...src,
      id: uid(),
      title: `${src.title} (Copy)`,
      updatedAt: Date.now(),
      ingredients: src.ingredients.map((i) => ({ ...i, id: uid() })),
      steps: src.steps.map((s) => ({ ...s, id: uid() })),
    };

    setRecipes((prev) => [copy, ...prev]);
    setActiveId(copy.id);
  }

  function deleteRecipe(id: string) {
    setRecipes((prev) => {
      const next = prev.filter((r) => r.id !== id);
      if (activeId === id) setActiveId(next[0]?.id ?? null);
      return next;
    });
  }

  function updateActive(patch: Partial<Recipe>) {
    if (!active) return;
    setRecipes((prev) =>
      prev.map((r) => (r.id === active.id ? { ...r, ...patch, updatedAt: Date.now() } : r)),
    );
  }

  function addIngredient() {
    if (!active) return;
    updateActive({
      ingredients: [...active.ingredients, { id: uid(), amount: '', unit: '', item: '' }],
    });
  }

  function delIngredient(rowId: string) {
    if (!active) return;
    updateActive({
      ingredients: active.ingredients.filter((i) => i.id !== rowId),
    });
  }

  function addStep() {
    if (!active) return;
    updateActive({ steps: [...active.steps, { id: uid(), text: '' }] });
  }

  function delStep(rowId: string) {
    if (!active) return;
    updateActive({ steps: active.steps.filter((s) => s.id !== rowId) });
  }

  function onCover(e: React.ChangeEvent<HTMLInputElement>) {
    if (!active) return;
    const f = e.target.files?.[0];
    if (!f) return;
    readPng(f, (cover) => updateActive({ cover }));
  }

  return (
    <main className="container" style={{ paddingTop: '112px', paddingBottom: '48px' }}>
      <section style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h1 className="title" style={{ marginBottom: 8 }}>
          {heading}
        </h1>
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </section>

      {!activeCategory ? (
        <section style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
            <h2 style={{ margin: 0 }}>Recipe Categories</h2>
            <button className="btn" onClick={addCategory}>
              Add Category
            </button>
          </div>

          <div className="categoryGrid">
            {categories.map((cat) => (
              <article key={cat.id} className="marketCard">
                <button
                  className="marketOpen"
                  type="button"
                  onClick={() => {
                    setActiveCategoryId(cat.id);
                    setActiveGroupId(null);
                  }}
                >
                  <div className="marketIcon">
                    {cat.icon ? <img src={cat.icon} alt="" /> : <span>📁</span>}
                  </div>
                  <h3>{cat.name}</h3>
                  <p>{cat.groups.length} Groups</p>
                </button>

                <div className="marketActions">
                  <label className="btn-ghost">
                    PNG Icon
                    <input
                      type="file"
                      accept="image/png"
                      onChange={(e) => updateCategoryIcon(cat.id, e)}
                      style={{ display: 'none' }}
                    />
                  </label>
                  <button className="btn-ghost" onClick={() => renameCategory(cat.id)}>
                    Rename
                  </button>
                  <button className="btn-ghost" onClick={() => deleteCategory(cat.id)}>
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : !activeGroup ? (
        <section style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
            <div>
              <button className="btn-ghost" onClick={() => setActiveCategoryId(null)}>
                ← Categories
              </button>
              <h2 style={{ margin: '10px 0 0' }}>{activeCategory.name}</h2>
            </div>
            <button className="btn" onClick={() => addGroup(activeCategory.id)}>
              Add Group
            </button>
          </div>

          <div className="categoryGrid">
            {activeCategory.groups.map((group) => (
              <article key={group.id} className="marketCard">
                <button className="marketOpen" type="button" onClick={() => setActiveGroupId(group.id)}>
                  <div className="marketIcon">
                    {group.icon ? <img src={group.icon} alt="" /> : <span>📚</span>}
                  </div>
                  <h3>{group.name}</h3>
                  <p>Open recipes</p>
                </button>

                <div className="marketActions">
                  <label className="btn-ghost">
                    PNG Icon
                    <input
                      type="file"
                      accept="image/png"
                      onChange={(e) => updateGroupIcon(activeCategory.id, group.id, e)}
                      style={{ display: 'none' }}
                    />
                  </label>
                  <button className="btn-ghost" onClick={() => renameGroup(activeCategory.id, group.id)}>
                    Rename
                  </button>
                  <button className="btn-ghost" onClick={() => deleteGroup(activeCategory.id, group.id)}>
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <>
          <section style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', marginBottom: 16 }}>
            <div>
              <button className="btn-ghost" onClick={() => setActiveGroupId(null)}>
                ← Groups
              </button>
              <h2 style={{ margin: '10px 0 0' }}>
                {activeCategory.name} / {activeGroup.name}
              </h2>
            </div>
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 16 }}>
            <aside className="card" style={{ padding: 14, borderRadius: 14, height: 'fit-content' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <h3 style={{ margin: 0 }}>Recipes</h3>
                <button className="btn" onClick={createRecipe}>
                  New
                </button>
              </div>

              <div style={{ display: 'grid', gap: 8 }}>
                {recipes.map((r) => (
                  <div
                    key={r.id}
                    className="card"
                    style={{
                      padding: 10,
                      borderRadius: 10,
                      cursor: 'pointer',
                      border: activeId === r.id ? '2px solid var(--gold, #CBA135)' : '1px solid rgba(0,0,0,.08)',
                      background: activeId === r.id ? 'rgba(203,161,53,0.06)' : 'transparent',
                    }}
                    onClick={() => setActiveId(r.id)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 8, overflow: 'hidden', background: '#eee' }}>
                        {r.cover ? <img src={r.cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : null}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{r.title || 'Untitled'}</div>
                        <div style={{ fontSize: 12, opacity: 0.75 }}>
                          {new Date(r.updatedAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                      <button className="btn-ghost" onClick={(e) => { e.stopPropagation(); duplicateRecipe(r.id); }}>
                        Duplicate
                      </button>
                      <button className="btn-ghost" onClick={(e) => { e.stopPropagation(); deleteRecipe(r.id); }}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {recipes.length === 0 && <div style={{ fontSize: 14, opacity: 0.7 }}>No recipes yet.</div>}
              </div>
            </aside>

            <section style={{ display: 'grid', gap: 14 }}>
              {!active ? (
                <div className="card" style={{ padding: 20, borderRadius: 16 }}>
                  <p>No recipe selected.</p>
                </div>
              ) : (
                <>
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

                      <div style={{ fontSize: 14, opacity: 0.8 }}>
                        Scaling factor: <strong>{Number.isFinite(factor) ? factor.toFixed(2) : '—'}</strong>
                      </div>
                    </div>
                  </div>

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

                  <div className="card" style={{ padding: 20, borderRadius: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h2 style={{ margin: 0 }}>Ingredients</h2>
                      <button className="btn" onClick={addIngredient}>
                        Add Ingredient
                      </button>
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
                              <tr key={ing.id}>
                                <td style={{ padding: 8, minWidth: 130 }}>
                                  <input
                                    type="number"
                                    step="any"
                                    value={ing.amount}
                                    onChange={(e) => {
                                      const val = e.target.value === '' ? '' : Number(e.target.value);
                                      updateActive({
                                        ingredients: active.ingredients.map((r) =>
                                          r.id === ing.id ? { ...r, amount: val } : r,
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
                                        ingredients: active.ingredients.map((r) =>
                                          r.id === ing.id ? { ...r, unit: e.target.value } : r,
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
                                        ingredients: active.ingredients.map((r) =>
                                          r.id === ing.id ? { ...r, item: e.target.value } : r,
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
                                  <button className="btn-ghost" onClick={() => delIngredient(ing.id)}>
                                    Remove
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="card" style={{ padding: 20, borderRadius: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h2 style={{ margin: 0 }}>Method</h2>
                      <button className="btn" onClick={addStep}>
                        Add Step
                      </button>
                    </div>

                    <ol style={{ marginTop: 12 }}>
                      {active.steps.map((s, i) => (
                        <li key={s.id} style={{ margin: '10px 0' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, alignItems: 'start' }}>
                            <textarea
                              value={s.text}
                              onChange={(e) =>
                                updateActive({
                                  steps: active.steps.map((r) =>
                                    r.id === s.id ? { ...r, text: e.target.value } : r,
                                  ),
                                })
                              }
                              placeholder={`Step ${i + 1}…`}
                              rows={3}
                              style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid rgba(0,0,0,.15)', resize: 'vertical' }}
                            />
                            <button className="btn-ghost" onClick={() => delStep(s.id)}>
                              Remove
                            </button>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </>
              )}
            </section>
          </section>
        </>
      )}

      <style jsx>{`
        .categoryGrid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }

        .marketCard {
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 18px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.72);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
        }

        .marketOpen {
          width: 100%;
          border: 0;
          background: transparent;
          padding: 18px;
          cursor: pointer;
          text-align: left;
        }

        .marketIcon {
          width: 100%;
          aspect-ratio: 1.15;
          border-radius: 16px;
          background: radial-gradient(circle at 30% 20%, rgba(203, 161, 53, 0.32), rgba(0, 0, 0, 0.04));
          display: grid;
          place-items: center;
          overflow: hidden;
          margin-bottom: 14px;
        }

        .marketIcon img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 18px;
        }

        .marketIcon span {
          font-size: 56px;
        }

        .marketOpen h3 {
          margin: 0 0 6px;
          font-size: 18px;
          font-weight: 900;
        }

        .marketOpen p {
          margin: 0;
          opacity: 0.7;
          font-size: 13px;
        }

        .marketActions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 0 14px 14px;
        }

        @media (max-width: 1080px) {
          .categoryGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 960px) {
          section[style*='grid-template-columns: 280px 1fr'] {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 620px) {
          .categoryGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}