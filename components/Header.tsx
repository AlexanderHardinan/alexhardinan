'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ===== TOP HEADER ===== */}
      <header
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 0',
          position: 'relative',
          zIndex: 50,
        }}
      >
        {/* ===== BRAND ===== */}
        <Link
          href="/"
          className="link"
          style={{
            fontWeight: 700,
            fontSize: '20px',
            backgroundImage: 'linear-gradient(90deg,var(--gold-start,#CBA135),var(--gold-end,#E6C15A))',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            letterSpacing: '0.02em',
          }}
        >
          Alex Hardinan
        </Link>

        {/* ===== NAV (Desktop) ===== */}
        <nav
          className="nav hidden md:flex"
          style={{
            gap: '2rem',
            alignItems: 'center',
            fontWeight: 500,
          }}
        >
          <Link href="/">Home</Link>
          <Link href="/stories-on-a-plate">Stories on a Plate</Link>
          <Link href="/in-the-glass">In the Glass</Link>
          <Link href="/press-release">Press Release</Link>
          <Link href="/food-ethos">Food Ethos</Link>
          <Link href="/off-duty">Off Duty</Link>
          <Link href="/blog">Blog</Link>
        </nav>

        {/* ===== MENU BUTTON (Mobile) ===== */}
        <button
          className="md:hidden btn"
          onClick={() => setOpen(true)}
          style={{
            background: 'none',
            border: 'none',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Menu
        </button>
      </header>

      {/* ===== SIDEBAR MENU (Mobile) ===== */}
      <aside
        className={`sidebar ${open ? 'open' : ''}`}
        role="dialog"
        aria-label="Menu"
        onClick={() => setOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          color: '#fff',
          display: open ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: '#111',
            borderRadius: '16px',
            padding: '2rem 3rem',
            width: '85%',
            maxWidth: '400px',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--gold)',
              marginBottom: '1.5rem',
            }}
          >
            Menu
          </h2>
          <nav
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link href="/stories-on-a-plate" onClick={() => setOpen(false)}>
              Stories on a Plate
            </Link>
            <Link href="/in-the-glass" onClick={() => setOpen(false)}>
              In the Glass
            </Link>
            <Link href="/press-release" onClick={() => setOpen(false)}>
              Press Release
            </Link>
            <Link href="/food-ethos" onClick={() => setOpen(false)}>
              Food Ethos
            </Link>
            <Link href="/off-duty" onClick={() => setOpen(false)}>
              Off Duty
            </Link>
            <Link href="/blog" onClick={() => setOpen(false)}>
              Blog
            </Link>
          </nav>

          <button
            className="btn"
            onClick={() => setOpen(false)}
            style={{
              background: 'var(--gold)',
              color: '#111',
              fontWeight: 600,
              padding: '0.6rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>
      </aside>
    </>
  );
}
