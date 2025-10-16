'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Transparent, absolute, full-width header. No seam with hero. */}
      <header className="site-header">
        <div className="site-header__inner">
          <Link
            href="/"
            className="brand"
            aria-label="Chef Alex Hardinan Home"
          >
            Chef Alex Hardinan
          </Link>

          {/* Desktop nav */}
          <nav className="nav-desktop">
            <Link href="/">Home</Link>
            <Link href="/stories-on-a-plate">Stories on a Plate</Link>
            <Link href="/in-the-glass">In the Glass</Link>
            <Link href="/press-release">Press Release</Link>
            <Link href="/food-ethos">Food Ethos</Link>
            <Link href="/off-duty">Off Duty</Link>
            <a href="#contact">Get in touch</a>
          </nav>

          {/* Mobile toggle */}
          <button className="btn nav-toggle" onClick={()=>setOpen(true)}>Menu</button>
        </div>
      </header>

      {/* Mobile sidebar */}
      <aside className={`sidebar ${open ? 'open' : ''}`} role="dialog" aria-label="Menu" onClick={()=>setOpen(false)}>
        <div onClick={(e)=>e.stopPropagation()}>
          <header>Menu</header>
          <nav>
            <Link href="/" onClick={()=>setOpen(false)}>Home</Link>
            <Link href="/stories-on-a-plate" onClick={()=>setOpen(false)}>Stories on a Plate</Link>
            <Link href="/in-the-glass" onClick={()=>setOpen(false)}>In the Glass</Link>
            <Link href="/press-release" onClick={()=>setOpen(false)}>Press Release</Link>
            <Link href="/food-ethos" onClick={()=>setOpen(false)}>Food Ethos</Link>
            <Link href="/off-duty" onClick={()=>setOpen(false)}>Off Duty</Link>
            <a href="#contact" onClick={()=>setOpen(false)}>Get in touch</a>
          </nav>
          <div style={{padding:16}}>
            <button className="btn" onClick={()=>setOpen(false)}>Close</button>
          </div>
        </div>
      </aside>
    </>
  );
}
