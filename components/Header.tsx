'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

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

          <nav className="nav-desktop">
            <Link href="/">Home</Link>
            <Link href="/stories-on-a-plate">Stories on a Plate</Link>
            <Link href="/in-the-glass">In the Glass</Link>
            <Link href="/press-release">Press Release</Link>
            <Link href="/myrecipebook">My Recipe Book</Link>
            <Link href="/food-ethos">Food Ethos</Link>
            <Link href="/off-duty">Off Duty</Link>
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
          <nav>
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
            <Link href="/myrecipebook" onClick={() => setOpen(false)}>
              My Recipe Book
            </Link>
            <Link href="/food-ethos" onClick={() => setOpen(false)}>
              Food Ethos
            </Link>
            <Link href="/off-duty" onClick={() => setOpen(false)}>
              Off Duty
            </Link>
          </nav>

          <div style={{ padding: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <ThemeToggle />
            <button className="btn" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
