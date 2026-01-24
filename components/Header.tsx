'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

function IconHome() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3 2.5 11.1l1.3 1.5L5 11.6V21h6v-6h2v6h6v-9.4l1.2 1 1.3-1.5L12 3z" />
    </svg>
  );
}

function IconCraft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 2h10v2H7V2zm-3 6h16l-1.5 14h-13L4 8zm5 3v8h2v-8H9zm4 0v8h2v-8h-2z" />
    </svg>
  );
}

function IconLearn() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3zm-7.2 7L12 6.2 19.2 10 12 13.8 4.8 10zM6 12.6V17c0 2.2 3.1 4 6 4s6-1.8 6-4v-4.4l-6 3.2-6-3.2z" />
    </svg>
  );
}

function IconShop() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 7V6a5 5 0 0 1 10 0v1h3v14H4V7h3zm2 0h6V6a3 3 0 0 0-6 0v1zm-3 2v10h16V9H6z" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isMyRecipeBook = pathname === '/myrecipebook' || pathname.startsWith('/myrecipebook/');

  return (
    <>
      <header className={`site-header ${isMyRecipeBook ? 'site-header--myrecipebook' : ''}`}>
        <div className="site-header__inner">
          <Link href="/" className="brand" aria-label="My Profile Home">
            My Profile
          </Link>

          <nav className="nav-desktop" aria-label="Primary">
            {/* Home (icon) */}
            <Link href="/" className="nav-item">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <IconHome />
                <span>Home</span>
              </span>
            </Link>

            {/* My Craft (icon) + submenu */}
            <details className="nav-group">
              <summary className="nav-item" aria-label="My Craft">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <IconCraft />
                  <span>My Craft</span>
                </span>
              </summary>
              <div className="nav-submenu" role="menu" aria-label="My Craft submenu">
                <Link href="/stories-on-a-plate" role="menuitem">
                  Stories on a Plate
                </Link>
                <Link href="/in-the-glass" role="menuitem">
                  In the Glass
                </Link>
              </div>
            </details>

            {/* Learn More (icon) + submenu */}
            <details className="nav-group">
              <summary className="nav-item" aria-label="Learn More">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <IconLearn />
                  <span>Learn More</span>
                </span>
              </summary>
              <div className="nav-submenu" role="menu" aria-label="Learn More submenu">
                <Link href="/press-release" role="menuitem">
                  Press Release
                </Link>
                <Link href="/food-ethos" role="menuitem">
                  Food Ethos
                </Link>
                <Link href="/off-duty" role="menuitem">
                  Off Duty
                </Link>
                <Link href="/myrecipebook" role="menuitem">
                  My Recipe Book
                </Link>
              </div>
            </details>

            {/* Shop (icon) */}
            <Link href="/shop" className="nav-item">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <IconShop />
                <span>Shop</span>
              </span>
            </Link>
          </nav>

          <div className="header-actions">
            <ThemeToggle />
            <button className="btn nav-toggle" onClick={() => setOpen(true)}>
              Menu
            </button>
          </div>
        </div>
      </header>

      <aside
        className={`sidebar ${open ? 'open' : ''} ${isMyRecipeBook ? 'sidebar--myrecipebook' : ''}`}
        role="dialog"
        aria-label="Menu"
        onClick={() => setOpen(false)}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <header>Menu</header>

          <nav aria-label="Mobile Primary">
            {/* Home */}
            <Link href="/" onClick={() => setOpen(false)}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <IconHome />
                <span>Home</span>
              </span>
            </Link>

            {/* My Craft section */}
            <div style={{ marginTop: 14, opacity: 0.9, fontSize: 12, letterSpacing: 0.6 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <IconCraft />
                <span>MY CRAFT</span>
              </span>
            </div>
            <div style={{ paddingLeft: 10 }}>
              <Link href="/stories-on-a-plate" onClick={() => setOpen(false)}>
                Stories on a Plate
              </Link>
              <Link href="/in-the-glass" onClick={() => setOpen(false)}>
                In the Glass
              </Link>
            </div>

            {/* Learn More section */}
            <div style={{ marginTop: 14, opacity: 0.9, fontSize: 12, letterSpacing: 0.6 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <IconLearn />
                <span>LEARN MORE</span>
              </span>
            </div>
            <div style={{ paddingLeft: 10 }}>
              <Link href="/press-release" onClick={() => setOpen(false)}>
                Press Release
              </Link>
              <Link href="/food-ethos" onClick={() => setOpen(false)}>
                Food Ethos
              </Link>
              <Link href="/off-duty" onClick={() => setOpen(false)}>
                Off Duty
              </Link>
              <Link href="/myrecipebook" onClick={() => setOpen(false)}>
                My Recipe Book
              </Link>
            </div>

            {/* Shop */}
            <div style={{ marginTop: 14 }}>
              <Link href="/shop" onClick={() => setOpen(false)}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                  <IconShop />
                  <span>Shop</span>
                </span>
              </Link>
            </div>
          </nav>

          <div style={{ padding: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <ThemeToggle />
            <button className="btn" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        </div>
      </aside>

      {/* Scoped CSS only for nav groups (kept inside this file per scope rules) */}
      <style jsx>{`
        .nav-group {
          position: relative;
          display: inline-block;
        }
        .nav-group > summary {
          list-style: none;
          cursor: pointer;
        }
        .nav-group > summary::-webkit-details-marker {
          display: none;
        }
        .nav-submenu {
          position: absolute;
          top: calc(100% + 10px);
          left: 0;
          min-width: 220px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 12px 14px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(10px);
          box-shadow: 0 14px 50px rgba(0, 0, 0, 0.18);
          z-index: 9999;
        }
        .nav-submenu a {
          text-decoration: none;
          white-space: nowrap;
        }
        /* Close dropdown when click outside is handled by native <details> behavior; keep it minimal */
      `}</style>
    </>
  );
}
