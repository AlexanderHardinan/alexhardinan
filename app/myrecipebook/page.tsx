'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MyRecipeBook() {
  const [password, setPassword] = useState('');
  const [accessGranted, setAccessGranted] = useState(false);
  const router = useRouter();

  const correctPassword = 'TH9999';

  function handleAccess() {
    if (password === correctPassword) {
      setAccessGranted(true);
    } else {
      alert('Incorrect password. Please try again.');
    }
  }

  if (!accessGranted) {
    return (
      <main
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          background: 'white',
        }}
      >
        <h1 className="title" style={{ marginBottom: '1rem' }}>
          My Recipe Book
        </h1>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginBottom: '1rem',
            textAlign: 'center',
          }}
        />
        <button
          onClick={handleAccess}
          style={{
            background: 'linear-gradient(90deg,#c59d5f,#d4af37)',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '999px',
            cursor: 'pointer',
            fontSize: '0.95rem',
          }}
        >
          Access
        </button>
      </main>
    );
  }

  const sections = [
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

  return (
    <main style={{ paddingTop: '120px', paddingBottom: '60px' }}>
      <section style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 className="title">My Recipe Book</h1>
        <p className="subtitle">
          A personal collection of crafted recipes, inspirations, and fine-dining knowledge.
        </p>
      </section>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
          gap: '1.5rem',
          padding: '0 1rem',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        {sections.map((s) => (
          <div
            key={s.title}
            onClick={() => router.push(s.link)}
            style={{
              cursor: 'pointer',
              background: 'white',
              borderRadius: '18px',
              overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.03)';
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                '0 6px 20px rgba(212,175,55,0.3)';
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                '0 4px 16px rgba(0,0,0,0.1)';
            }}
          >
            <Image
              src={s.image}
              alt={s.title}
              width={600}
              height={400}
              style={{
                width: '100%',
                height: '240px',
                objectFit: 'cover',
              }}
            />
            <div style={{ padding: '1rem 1.2rem' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>{s.title}</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
