// app/myrecipebook/page.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Section = {
  title: string;
  image: string;
  link: string;
  desc: string;
};

type Category = {
  title: string;
  image: string;
  desc: string;
};

export default function MyRecipeBook() {
  const [password, setPassword] = useState('');
  const [accessGranted, setAccessGranted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const router = useRouter();

  const correctPassword = 'TH9999';

  function handleAccess() {
    if (password === correctPassword) {
      setAccessGranted(true);
    } else {
      alert('Incorrect password. Please try again.');
    }
  }

  const categories: Category[] = [
    {
      title: 'The Globe',
      image: '/allabout.png',
      desc: 'A complete recipe collection for The Globe — organized by pastry, sauces, gastronomy, and chef knowledge.',
    },
  ];

  const sections: Section[] = [
    {
      title: 'Pastry & Bakery',
      image: '/pastry.png',
      link: '/myrecipebook/pastry',
      desc: 'Where artistry meets precision — signature desserts and pastry innovations.',
    },
    {
      title: 'Sauces',
      image: '/sauces.png',
      link: '/myrecipebook/sauces',
      desc: 'Emulsions, reductions, and pure culinary craft.',
    },
    {
      title: 'Gastronomy & Molecular',
      image: '/molecular.png',
      link: '/myrecipebook/molecular',
      desc: 'Science meets art — modernist techniques, textures, and transformation.',
    },
    {
      title: 'All About',
      image: '/allabout.png',
      link: '/myrecipebook/allabout',
      desc: 'Notes, foundations, preparations, and chef utilities.',
    },
  ];

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
        <h1 className="title">
          {activeCategory ? activeCategory : 'My Recipe Book'}
        </h1>
        <p className="subtitle">
          {activeCategory
            ? 'Select a recipe group under this category.'
            : 'A personal collection of crafted recipes, inspirations, and fine-dining knowledge.'}
        </p>

        {activeCategory && (
          <button
            type="button"
            className="btn"
            onClick={() => setActiveCategory(null)}
            style={{ marginTop: 14 }}
          >
            Back to Categories
          </button>
        )}
      </section>

      {!activeCategory ? (
        <div className="myrecipebook-grid">
          {categories.map((category) => (
            <button
              key={category.title}
              type="button"
              className="myrecipebook-card"
              onClick={() => setActiveCategory(category.title)}
              aria-label={`Open ${category.title}`}
            >
              <Image
                src={category.image}
                alt={category.title}
                width={600}
                height={400}
                className="myrecipebook-card__image"
              />
              <div className="myrecipebook-card__body">
                <h3 className="myrecipebook-card__title">{category.title}</h3>
                <p className="myrecipebook-card__desc">{category.desc}</p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="myrecipebook-grid">
          {sections.map((s) => (
            <button
              key={s.title}
              type="button"
              className="myrecipebook-card"
              onClick={() => router.push(s.link)}
              aria-label={`Open ${s.title}`}
            >
              <Image
                src={s.image}
                alt={s.title}
                width={600}
                height={400}
                className="myrecipebook-card__image"
              />
              <div className="myrecipebook-card__body">
                <h3 className="myrecipebook-card__title">{s.title}</h3>
                <p className="myrecipebook-card__desc">{s.desc}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </main>
  );
}