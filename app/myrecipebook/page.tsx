'use client';

import { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function MyRecipeBook() {
  const [pwd, setPwd] = useState('');
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState('');

  const correct = 'TH9999';

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pwd.trim() === correct) {
      setOk(true);
      setErr('');
    } else {
      setErr('Incorrect password. Please try again.');
      setPwd('');
    }
  }

  function logout() {
    setOk(false);
    setPwd('');
    setErr('');
  }

  return (
    <main className="container" style={{ paddingTop: '112px', paddingBottom: '48px' }}>
      {!ok ? (
        <section
          style={{
            maxWidth: 520,
            margin: '24px auto',
            padding: '24px',
            borderRadius: 16,
            border: '1px solid rgba(0,0,0,0.08)',
            backdropFilter: 'saturate(140%) blur(6px)',
          }}
        >
          <h1 className="title" style={{ marginBottom: 8 }}>
            My Recipe Book
          </h1>
          <p className="subtitle" style={{ marginBottom: 20 }}>
            Enter password to access.
          </p>

          <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
            <div style={{ position: 'relative' }}>
              <Lock
                aria-hidden
                style={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 18,
                  height: 18,
                  opacity: 0.8,
                }}
              />
              <input
                type="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                placeholder="Password"
                aria-label="Password"
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 38px',
                  borderRadius: 10,
                  border: '1px solid rgba(0,0,0,0.2)',
                }}
                required
              />
            </div>
            <button className="btn" type="submit">
              Access Book
            </button>
          </form>

          {err && <p style={{ color: '#e11d48', marginTop: 10, fontSize: 14 }}>{err}</p>}
        </section>
      ) : (
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
            }}
          >
            <h1 className="title" style={{ margin: 0 }}>
              My Recipe Book
            </h1>
            <button className="btn" onClick={logout}>
              <Unlock style={{ width: 16, height: 16 }} /> <span style={{ marginLeft: 6 }}>Logout</span>
            </button>
          </div>

          <p className="subtitle" style={{ marginBottom: '2rem' }}>
            A curated collection of Chef Alex’s personal recipes — where passion meets precision.
          </p>

          <div
            className="recipe-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              { title: 'Pastry & Bakery', image: '/recipes/pastry.jpg', link: '/myrecipebook/pastry' },
              { title: 'Sauces', image: '/recipes/sauces.jpg', link: '/myrecipebook/sauces' },
              { title: 'Gastronomy & Molecular', image: '/recipes/molecular.jpg', link: '/myrecipebook/molecular' },
              { title: 'All About', image: '/recipes/allabout.jpg', link: '/myrecipebook/allabout' },
            ].map((item, i) => (
              <Link href={item.link} key={i}>
                <div
                  className="recipe-card"
                  style={{
                    background: 'rgba(255,255,255,0.8)',
                    borderRadius: 16,
                    overflow: 'hidden',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease',
                    cursor: 'pointer',
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={500}
                    height={300}
                    style={{ objectFit: 'cover', width: '100%', height: '200px' }}
                  />
                  <div style={{ padding: '1rem' }}>
                    <h3 style={{ marginBottom: 8, fontSize: '1.2rem' }}>{item.title}</h3>
                    <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                      Discover the creativity and precision behind {item.title.toLowerCase()}.
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
