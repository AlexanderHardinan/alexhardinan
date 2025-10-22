'use client';

import { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';

export default function CharacterReferences() {
  const [pwd, setPwd] = useState('');
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState('');

  const correct = 'SAth123456';

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
    <main
      className="container"
      style={{
        paddingTop: '112px',
        paddingBottom: '48px',
      }}
    >
      {!ok ? (
        <section
          style={{
            maxWidth: 520,
            margin: '24px auto 0',
            padding: '24px',
            borderRadius: 16,
            border: '1px solid rgba(0,0,0,0.08)',
            backdropFilter: 'saturate(140%) blur(6px)',
          }}
        >
          <h1 className="title" style={{ margin: '0 0 8px' }}>
            Character References
          </h1>
          <p className="subtitle" style={{ margin: '0 0 20px' }}>
            Enter password to view this page.
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
              Access Page
            </button>
          </form>

          {err && (
            <p style={{ color: '#e11d48', marginTop: 10, fontSize: 14 }}>{err}</p>
          )}
        </section>
      ) : (
        <section
          style={{
            maxWidth: 980,
            margin: '0 auto',
            padding: '0 0 0',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              justifyContent: 'space-between',
              marginBottom: 18,
            }}
          >
            <h1 className="title" style={{ margin: 0 }}>
              Character References
            </h1>
            <button className="btn" onClick={logout} aria-label="Logout">
              <Unlock style={{ width: 16, height: 16 }} />
              <span style={{ marginLeft: 6 }}>Logout</span>
            </button>
          </div>

          <div style={{ display: 'grid', gap: 24 }}>
            {/* Reference 1 */}
            <article className="card" style={{ padding: 20, lineHeight: 1.6 }}>
              <h2
                style={{
                  margin: '0 0 8px',
                  fontSize: 'clamp(18px, 1.2rem, 22px)',
                  fontWeight: 800,
                }}
              >
                Whale&apos;s Belly Modern European Fine Dining Cuisine
              </h2>
              <p style={{ margin: '0 0 6px', opacity: 0.9 }}>
                Located in Sukhumvit 39, Phrom Phong, Bangkok, Thailand
              </p>
              <p style={{ margin: '0 0 6px' }}>
                <strong>Mrs. Anchalee Vijitrat</strong> | Managing Director
              </p>
              <p style={{ margin: '0 0 6px' }}>
                Email: whalesbellyrestaurantandbar@gmail.com
              </p>
              <p style={{ margin: '0 0 6px' }}>Tel: 02 160 0333</p>
              <p style={{ margin: 0, color: '#b45309', fontWeight: 600 }}>
                Status: Permanently closed due to the COVID-19 pandemic.
              </p>
            </article>

            {/* Reference 2 (updated) */}
            <article className="card" style={{ padding: 20, lineHeight: 1.6 }}>
              <h2
                style={{
                  margin: '0 0 8px',
                  fontSize: 'clamp(18px, 1.2rem, 22px)',
                  fontWeight: 800,
                }}
              >
                Western Road Restaurants
              </h2>
              <p style={{ margin: '0 0 6px', opacity: 0.9 }}>
                Located in Tabuk, Saudi Arabia
              </p>
              <p style={{ margin: '0 0 6px' }}>
                <strong>Mr. Abdul Kareem Khan</strong> | Admin Specialist
              </p>
              <p style={{ margin: '0 0 6px' }}>
                Email: kareem@westernroadksa.com
              </p>
              <p style={{ margin: 0 }}>Tel: +966 58 021 6412</p>
            </article>

            <p
              style={{
                textAlign: 'center',
                margin: '8px 0 0',
                opacity: 0.7,
                fontSize: 14,
              }}
            >
              More references will be added in the future.
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
