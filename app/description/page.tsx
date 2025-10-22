'use client';

import { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';

export default function JobDescription() {
  const [pwd, setPwd] = useState('');
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState('');

  const correct = 'AH123';

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
            Job Description
          </h1>
          <p className="subtitle" style={{ margin: '0 0 20px' }}>
            Enter password to access this page.
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
              Job Description
            </h1>
            <button className="btn" onClick={logout} aria-label="Logout">
              <Unlock style={{ width: 16, height: 16 }} />
              <span style={{ marginLeft: 6 }}>Logout</span>
            </button>
          </div>

          <div style={{ display: 'grid', gap: 36 }}>
            {/* === Executive Chef & Managing Partner === */}
            <article className="card" style={{ padding: 20, lineHeight: 1.6 }}>
              <h2 style={{ margin: '0 0 8px', fontSize: '1.3rem', fontWeight: 800 }}>
                Executive Chef & Managing Partner
              </h2>
              <p style={{ margin: '0 0 6px' }}>
                <strong>The Globe&apos;s Heritage by Chef Alex</strong>, Pattaya, Thailand
              </p>

              <h3 style={{ margin: '16px 0 8px', fontWeight: 700 }}>Overview:</h3>
              <p>
                I am the Executive Chef and Managing Partner of The Globe&apos;s Heritage by Chef Alex,
                blending culinary leadership with skills in web development, data analysis, and photography.
                I developed the company’s website and an internal management system, created a luxury fine dining
                menu with a curated 50-label wine list, and produced all food photography. My work drives operational
                efficiency and supports our goal to become Chonburi’s first Michelin-starred destination.
              </p>

              <h3 style={{ margin: '16px 0 8px', fontWeight: 700 }}>Key Responsibilities:</h3>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>
                  Develop and execute innovative, globally inspired fine dining menus reflecting seasonal
                  ingredients, culinary trends, and local heritage.
                </li>
                <li>Manage all kitchen operations, ensuring the highest standards of food quality and hygiene.</li>
                <li>
                  Drive strategic business decisions, financial planning, and budget management to ensure sustained growth.
                </li>
                <li>
                  Cultivate relationships with suppliers, partners, and industry professionals to source premium ingredients.
                </li>
                <li>
                  Coordinate pre-opening strategies, operational set-up, and ongoing refinement of service standards.
                </li>
                <li>
                  Engage actively in marketing, PR, and community outreach to enhance the establishment’s visibility.
                </li>
                <li>Ensure compliance with health, safety, and environmental sustainability standards.</li>
              </ul>

              <h3 style={{ margin: '20px 0 8px', fontWeight: 700 }}>🏆 Achievements:</h3>
              <p style={{ fontWeight: 600 }}>
                Key Accomplishments at The Globe Hotel, Bar and Restaurant<br />
                Chonburi’s Premier Luxury Dining Destination, Aiming for Its First Michelin Star 🌟
              </p>

              <h4 style={{ margin: '12px 0 6px' }}>💻 Website Development & System Integration</h4>
              <p>
                Designed and developed the official company website:{' '}
                <a href="https://www.theglobeasia.com" target="_blank" rel="noreferrer">
                  www.theglobeasia.com
                </a>
                , eliminating external service needs. Built an internal management suite including:
              </p>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>Asset Management System</li>
                <li>Financial System</li>
                <li>Inventory Management</li>
                <li>HR Database</li>
                <li>Marketing Database</li>
              </ul>
              <p>
                <strong>Result:</strong> Saved significant operational costs while improving data accessibility and workflow efficiency.
              </p>

              <h4 style={{ margin: '12px 0 6px' }}>📸 Food Photography & Digital Content Creation</h4>
              <p>
                Produced all menu, web, and social content through in-house photography and design.
                <strong> Result:</strong> Elevated brand presentation and engagement while reducing costs.
              </p>

              <h4 style={{ margin: '12px 0 6px' }}>🍽️ Luxury Menu Development - The Menu</h4>
              <p>
                Conceptualized a fine dining experience featuring 9-course Chef’s Table menus, à la carte, brunch,
                rooftop selections, and a curated 50-label wine list.
                <strong> Result:</strong> Positioned The Globe as a Michelin-caliber destination.
              </p>
            </article>

            {/* === Executive Chef & General Manager === */}
            <article className="card" style={{ padding: 20, lineHeight: 1.6 }}>
              <h2 style={{ margin: '0 0 8px', fontSize: '1.3rem', fontWeight: 800 }}>
                Executive Chef & General Manager
              </h2>
              <p style={{ margin: '0 0 6px' }}>
                <strong>Western Road Restaurants</strong>, Tabuk, Saudi Arabia 47312
              </p>

              <h3 style={{ margin: '16px 0 8px', fontWeight: 700 }}>Overview:</h3>
              <p>
                As the Executive Chef and General Manager, I led both culinary innovation and operational management,
                overseeing 190 employees, including 35 chefs. I ensured exceptional dining experiences, streamlined operations,
                and sustainable business growth through strategic leadership and creativity.
              </p>

              <h3 style={{ margin: '16px 0 8px', fontWeight: 700 }}>Key Responsibilities:</h3>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>Recruit and develop staff to maintain professional standards.</li>
                <li>Design innovative menus showcasing contemporary trends and quality ingredients.</li>
                <li>Oversee all kitchen and restaurant operations with consistent quality and safety.</li>
                <li>Direct financial planning, budgeting, and cost management initiatives.</li>
                <li>Build partnerships with suppliers and maintain strong brand presence.</li>
                <li>Launch marketing and promotional strategies to grow visibility.</li>
                <li>Ensure compliance with local regulations and sustainable practices.</li>
              </ul>

              <h3 style={{ margin: '20px 0 8px', fontWeight: 700 }}>🏆 Achievements:</h3>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>Pre-opened the first fine dining establishment in Tabuk.</li>
                <li>Introduced an excellence department to streamline workflow.</li>
                <li>Developed manuals and guidelines for standardized operations.</li>
                <li>Enhanced profitability through smart budget management.</li>
                <li>Introduced globally inspired cocktails and signature dishes.</li>
              </ul>
            </article>
          </div>
        </section>
      )}
    </main>
  );
}
