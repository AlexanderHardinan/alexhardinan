// app/myrecipebook/page.tsx
'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

type Group = {
  id: string;
  title: string;
  image: string;
  link: string;
  desc: string;
};

type Category = {
  id: string;
  title: string;
  image: string;
  desc: string;
  groups: Group[];
  password?: string;
};

const STORAGE_KEY = 'myrecipebook:categories:v1';

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

const DEFAULT_CATEGORIES: Category[] = [
  {
    id: 'the-globe',
    title: 'The Globe',
    image: '/allabout.png',
    desc: 'A complete recipe collection for The Globe — organized by pastry, sauces, gastronomy, and chef knowledge.',
    groups: [
      {
        id: 'pastry',
        title: 'Pastry & Bakery',
        image: '/pastry.png',
        link: '/myrecipebook/pastry',
        desc: 'Where artistry meets precision — signature desserts and pastry innovations.',
      },
      {
        id: 'sauces',
        title: 'Sauces',
        image: '/sauces.png',
        link: '/myrecipebook/sauces',
        desc: 'Emulsions, reductions, and pure culinary craft.',
      },
      {
        id: 'molecular',
        title: 'Gastronomy & Molecular',
        image: '/molecular.png',
        link: '/myrecipebook/molecular',
        desc: 'Science meets art — modernist techniques, textures, and transformation.',
      },
      {
        id: 'allabout',
        title: 'All About',
        image: '/allabout.png',
        link: '/myrecipebook/allabout',
        desc: 'Notes, foundations, preparations, and chef utilities.',
      },
    ],
  },
];

export default function MyRecipeBook() {
  const [password, setPassword] = useState('');
  const [accessGranted, setAccessGranted] = useState(false);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const [unlockedCategoryIds, setUnlockedCategoryIds] = useState<string[]>([]);
  const [unlockCategoryId, setUnlockCategoryId] = useState<string | null>(null);
  const [unlockPassword, setUnlockPassword] = useState('');
  const [showUnlockPassword, setShowUnlockPassword] = useState(false);

  const [passwordCategoryId, setPasswordCategoryId] = useState<string | null>(null);
  const [oldCategoryPassword, setOldCategoryPassword] = useState('');
  const [newCategoryPassword, setNewCategoryPassword] = useState('');
  const [showOldCategoryPassword, setShowOldCategoryPassword] = useState(false);
  const [showNewCategoryPassword, setShowNewCategoryPassword] = useState(false);

  const router = useRouter();

  const correctPassword = 'TH9999';

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed: Category[] = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setCategories(parsed);
      }
    } catch {
      setCategories(DEFAULT_CATEGORIES);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);

  const activeCategory = useMemo(
    () => categories.find((category) => category.id === activeCategoryId) || null,
    [categories, activeCategoryId],
  );

  const unlockCategory = useMemo(
    () => categories.find((category) => category.id === unlockCategoryId) || null,
    [categories, unlockCategoryId],
  );

  const passwordCategory = useMemo(
    () => categories.find((category) => category.id === passwordCategoryId) || null,
    [categories, passwordCategoryId],
  );

  function handleAccess() {
    if (password === correctPassword) {
      setAccessGranted(true);
    } else {
      alert('Incorrect password. Please try again.');
    }
  }

  function openCategory(category: Category) {
    if (!category.password || unlockedCategoryIds.includes(category.id)) {
      setActiveCategoryId(category.id);
      return;
    }

    setUnlockCategoryId(category.id);
    setUnlockPassword('');
    setShowUnlockPassword(false);
  }

  function submitUnlockCategory() {
    if (!unlockCategory) return;

    if (unlockPassword === unlockCategory.password) {
      setUnlockedCategoryIds((prev) =>
        prev.includes(unlockCategory.id) ? prev : [...prev, unlockCategory.id],
      );
      setActiveCategoryId(unlockCategory.id);
      setUnlockCategoryId(null);
      setUnlockPassword('');
      setShowUnlockPassword(false);
    } else {
      alert('Incorrect category password.');
      setUnlockPassword('');
    }
  }

  function closeUnlockModal() {
    setUnlockCategoryId(null);
    setUnlockPassword('');
    setShowUnlockPassword(false);
  }

  function openPasswordModal(categoryId: string) {
    setPasswordCategoryId(categoryId);
    setOldCategoryPassword('');
    setNewCategoryPassword('');
    setShowOldCategoryPassword(false);
    setShowNewCategoryPassword(false);
  }

  function closePasswordModal() {
    setPasswordCategoryId(null);
    setOldCategoryPassword('');
    setNewCategoryPassword('');
    setShowOldCategoryPassword(false);
    setShowNewCategoryPassword(false);
  }

  function saveCategoryPassword() {
    if (!passwordCategory) return;

    if (passwordCategory.password && oldCategoryPassword !== passwordCategory.password) {
      alert('Old password is incorrect.');
      setOldCategoryPassword('');
      return;
    }

    if (!newCategoryPassword.trim()) {
      alert('Please enter a new password.');
      return;
    }

    setCategories((prev) =>
      prev.map((category) =>
        category.id === passwordCategory.id
          ? { ...category, password: newCategoryPassword.trim() }
          : category,
      ),
    );

    setUnlockedCategoryIds((prev) =>
      prev.filter((categoryId) => categoryId !== passwordCategory.id),
    );

    closePasswordModal();
  }

  function removeCategoryPassword() {
    if (!passwordCategory?.password) return;

    if (oldCategoryPassword !== passwordCategory.password) {
      alert('Old password is incorrect.');
      setOldCategoryPassword('');
      return;
    }

    if (!confirm(`Remove password from "${passwordCategory.title}"?`)) return;

    setCategories((prev) =>
      prev.map((category) =>
        category.id === passwordCategory.id ? { ...category, password: '' } : category,
      ),
    );

    setUnlockedCategoryIds((prev) =>
      prev.filter((categoryId) => categoryId !== passwordCategory.id),
    );

    closePasswordModal();
  }

  function addCategory() {
    const title = prompt('Category name');
    if (!title?.trim()) return;

    const desc = prompt('Category description') || 'Recipe category.';
    const image = prompt('PNG icon path', '/allabout.png') || '/allabout.png';

    const category: Category = {
      id: uid(),
      title: title.trim(),
      image: image.trim(),
      desc: desc.trim(),
      groups: [],
      password: '',
    };

    setCategories((prev) => [category, ...prev]);
  }

  function renameCategory(categoryId: string) {
    const category = categories.find((item) => item.id === categoryId);
    if (!category) return;

    const title = prompt('Rename category', category.title);
    if (!title?.trim()) return;

    setCategories((prev) =>
      prev.map((item) =>
        item.id === categoryId ? { ...item, title: title.trim() } : item,
      ),
    );
  }

  function deleteCategory(categoryId: string) {
    const category = categories.find((item) => item.id === categoryId);
    if (!category) return;

    if (!confirm(`Delete category "${category.title}"?`)) return;

    setCategories((prev) => prev.filter((item) => item.id !== categoryId));
    setUnlockedCategoryIds((prev) => prev.filter((item) => item !== categoryId));

    if (activeCategoryId === categoryId) {
      setActiveCategoryId(null);
    }
  }

  function editCategoryIcon(categoryId: string) {
    const category = categories.find((item) => item.id === categoryId);
    if (!category) return;

    const image = prompt('PNG icon path', category.image);
    if (!image?.trim()) return;

    setCategories((prev) =>
      prev.map((item) =>
        item.id === categoryId ? { ...item, image: image.trim() } : item,
      ),
    );
  }

  function addGroup(categoryId: string) {
    const title = prompt('Group name');
    if (!title?.trim()) return;

    const desc = prompt('Group description') || 'Recipe group.';
    const image = prompt('PNG icon path', '/allabout.png') || '/allabout.png';
    const link =
      prompt('Group page link', `/myrecipebook/${title.toLowerCase().replaceAll(' ', '-')}`) ||
      `/myrecipebook/${title.toLowerCase().replaceAll(' ', '-')}`;

    const group: Group = {
      id: uid(),
      title: title.trim(),
      image: image.trim(),
      link: link.trim(),
      desc: desc.trim(),
    };

    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? { ...category, groups: [group, ...category.groups] }
          : category,
      ),
    );
  }

  function renameGroup(categoryId: string, groupId: string) {
    const group = categories
      .find((category) => category.id === categoryId)
      ?.groups.find((item) => item.id === groupId);

    if (!group) return;

    const title = prompt('Rename group', group.title);
    if (!title?.trim()) return;

    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              groups: category.groups.map((item) =>
                item.id === groupId ? { ...item, title: title.trim() } : item,
              ),
            }
          : category,
      ),
    );
  }

  function deleteGroup(categoryId: string, groupId: string) {
    const group = categories
      .find((category) => category.id === categoryId)
      ?.groups.find((item) => item.id === groupId);

    if (!group) return;

    if (!confirm(`Delete group "${group.title}"?`)) return;

    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              groups: category.groups.filter((item) => item.id !== groupId),
            }
          : category,
      ),
    );
  }

  function editGroupIcon(categoryId: string, groupId: string) {
    const group = categories
      .find((category) => category.id === categoryId)
      ?.groups.find((item) => item.id === groupId);

    if (!group) return;

    const image = prompt('PNG icon path', group.image);
    if (!image?.trim()) return;

    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              groups: category.groups.map((item) =>
                item.id === groupId ? { ...item, image: image.trim() } : item,
              ),
            }
          : category,
      ),
    );
  }

  if (!accessGranted) {
    return (
      <main className="myrecipebook-auth">
        <h1 className="title myrecipebook-auth__title">My Recipe Book</h1>

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="myrecipebook-auth__input"
        />

        <button onClick={handleAccess} className="btn myrecipebook-auth__btn">
          Access
        </button>
      </main>
    );
  }

  return (
    <main className="myrecipebook-page">
      <section className="myrecipebook-hero">
        <h1 className="title">{activeCategory ? activeCategory.title : 'My Recipe Book'}</h1>
        <p className="subtitle">
          {activeCategory
            ? 'Select a recipe group under this category.'
            : 'A personal collection of crafted recipes, inspirations, and fine-dining knowledge.'}
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
          {activeCategory ? (
            <>
              <button type="button" className="btn" onClick={() => setActiveCategoryId(null)}>
                Back to Categories
              </button>
              <button type="button" className="btn" onClick={() => addGroup(activeCategory.id)}>
                Add Group
              </button>
            </>
          ) : (
            <button type="button" className="btn" onClick={addCategory}>
              Add Category
            </button>
          )}
        </div>
      </section>

      {!activeCategory ? (
        <div className="myrecipebook-grid">
          {categories.map((category) => (
            <div key={category.id} className="myrecipebook-card">
              <button
                type="button"
                onClick={() => openCategory(category)}
                aria-label={`Open ${category.title}`}
                style={{
                  border: 0,
                  background: 'transparent',
                  padding: 0,
                  width: '100%',
                  cursor: 'pointer',
                  textAlign: 'inherit',
                }}
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  width={600}
                  height={400}
                  className="myrecipebook-card__image"
                />
                <div className="myrecipebook-card__body">
                  <h3 className="myrecipebook-card__title">
                    {category.password ? '🔒 ' : ''}
                    {category.title}
                  </h3>
                  <p className="myrecipebook-card__desc">{category.desc}</p>
                </div>
              </button>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: '0 16px 16px' }}>
                <button type="button" className="btn-ghost" onClick={() => editCategoryIcon(category.id)}>
                  PNG Icon
                </button>
                <button type="button" className="btn-ghost" onClick={() => renameCategory(category.id)}>
                  Rename
                </button>
                <button type="button" className="btn-ghost" onClick={() => openPasswordModal(category.id)}>
                  {category.password ? 'Change Password' : 'Set Password'}
                </button>
                <button type="button" className="btn-ghost" onClick={() => deleteCategory(category.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="myrecipebook-grid">
          {activeCategory.groups.map((group) => (
            <div key={group.id} className="myrecipebook-card">
              <button
                type="button"
                onClick={() => router.push(group.link)}
                aria-label={`Open ${group.title}`}
                style={{
                  border: 0,
                  background: 'transparent',
                  padding: 0,
                  width: '100%',
                  cursor: 'pointer',
                  textAlign: 'inherit',
                }}
              >
                <Image
                  src={group.image}
                  alt={group.title}
                  width={600}
                  height={400}
                  className="myrecipebook-card__image"
                />
                <div className="myrecipebook-card__body">
                  <h3 className="myrecipebook-card__title">{group.title}</h3>
                  <p className="myrecipebook-card__desc">{group.desc}</p>
                </div>
              </button>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: '0 16px 16px' }}>
                <button type="button" className="btn-ghost" onClick={() => editGroupIcon(activeCategory.id, group.id)}>
                  PNG Icon
                </button>
                <button type="button" className="btn-ghost" onClick={() => renameGroup(activeCategory.id, group.id)}>
                  Rename
                </button>
                <button type="button" className="btn-ghost" onClick={() => deleteGroup(activeCategory.id, group.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}

          {activeCategory.groups.length === 0 && (
            <div className="myrecipebook-card">
              <div className="myrecipebook-card__body">
                <h3 className="myrecipebook-card__title">No groups yet</h3>
                <p className="myrecipebook-card__desc">Create your first group inside this category.</p>
              </div>
            </div>
          )}
        </div>
      )}

      {unlockCategory && (
        <div className="myrecipebook-modal" role="dialog" aria-modal="true" aria-label="Unlock category">
          <div className="myrecipebook-modal__card">
            <h2 className="myrecipebook-modal__title">Unlock {unlockCategory.title}</h2>
            <p className="myrecipebook-modal__desc">Enter this category password to access its groups.</p>

            <div className="myrecipebook-password-field">
              <input
                type={showUnlockPassword ? 'text' : 'password'}
                value={unlockPassword}
                onChange={(e) => setUnlockPassword(e.target.value)}
                placeholder="Category password"
                className="myrecipebook-password-field__input"
              />
              <button
                type="button"
                className="myrecipebook-password-field__toggle"
                onClick={() => setShowUnlockPassword((prev) => !prev)}
                aria-label={showUnlockPassword ? 'Hide password' : 'Show password'}
              >
                {showUnlockPassword ? '🙈' : '👁️'}
              </button>
            </div>

            <div className="myrecipebook-modal__actions">
              <button type="button" className="btn" onClick={submitUnlockCategory}>
                Unlock
              </button>
              <button type="button" className="btn-ghost" onClick={closeUnlockModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {passwordCategory && (
        <div className="myrecipebook-modal" role="dialog" aria-modal="true" aria-label="Set category password">
          <div className="myrecipebook-modal__card">
            <h2 className="myrecipebook-modal__title">
              {passwordCategory.password ? 'Change Password' : 'Set Password'}
            </h2>
            <p className="myrecipebook-modal__desc">
              {passwordCategory.password
                ? `Enter the old password first to change "${passwordCategory.title}".`
                : `Create a password for "${passwordCategory.title}".`}
            </p>

            {passwordCategory.password && (
              <div className="myrecipebook-password-field">
                <input
                  type={showOldCategoryPassword ? 'text' : 'password'}
                  value={oldCategoryPassword}
                  onChange={(e) => setOldCategoryPassword(e.target.value)}
                  placeholder="Old password"
                  className="myrecipebook-password-field__input"
                />
                <button
                  type="button"
                  className="myrecipebook-password-field__toggle"
                  onClick={() => setShowOldCategoryPassword((prev) => !prev)}
                  aria-label={showOldCategoryPassword ? 'Hide old password' : 'Show old password'}
                >
                  {showOldCategoryPassword ? '🙈' : '👁️'}
                </button>
              </div>
            )}

            <div className="myrecipebook-password-field">
              <input
                type={showNewCategoryPassword ? 'text' : 'password'}
                value={newCategoryPassword}
                onChange={(e) => setNewCategoryPassword(e.target.value)}
                placeholder="New password"
                className="myrecipebook-password-field__input"
              />
              <button
                type="button"
                className="myrecipebook-password-field__toggle"
                onClick={() => setShowNewCategoryPassword((prev) => !prev)}
                aria-label={showNewCategoryPassword ? 'Hide new password' : 'Show new password'}
              >
                {showNewCategoryPassword ? '🙈' : '👁️'}
              </button>
            </div>

            <div className="myrecipebook-modal__actions">
              <button type="button" className="btn" onClick={saveCategoryPassword}>
                Save Password
              </button>
              {passwordCategory.password && (
                <button type="button" className="btn-ghost" onClick={removeCategoryPassword}>
                  Remove Password
                </button>
              )}
              <button type="button" className="btn-ghost" onClick={closePasswordModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .myrecipebook-modal {
          position: fixed;
          inset: 0;
          z-index: 999999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
          background: rgba(0, 0, 0, 0.58);
          backdrop-filter: blur(10px);
        }

        .myrecipebook-modal__card {
          width: min(440px, 100%);
          border-radius: 22px;
          padding: 22px;
          background: rgba(255, 255, 255, 0.96);
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.28);
        }

        .myrecipebook-modal__title {
          margin: 0;
          font-size: 22px;
          font-weight: 900;
        }

        .myrecipebook-modal__desc {
          margin: 8px 0 16px;
          font-size: 14px;
          line-height: 1.5;
          opacity: 0.72;
        }

        .myrecipebook-password-field {
          position: relative;
          margin-top: 10px;
        }

        .myrecipebook-password-field__input {
          width: 100%;
          padding: 12px 48px 12px 12px;
          border-radius: 12px;
          border: 1px solid rgba(0, 0, 0, 0.15);
          font-size: 14px;
        }

        .myrecipebook-password-field__toggle {
          position: absolute;
          top: 50%;
          right: 8px;
          transform: translateY(-50%);
          height: 34px;
          width: 34px;
          border-radius: 10px;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: rgba(255, 255, 255, 0.9);
          cursor: pointer;
        }

        .myrecipebook-modal__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 16px;
        }
      `}</style>
    </main>
  );
}