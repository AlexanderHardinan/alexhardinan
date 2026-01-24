// app/shop/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState } from 'react';

type Product = {
  id: string;
  name: string;
  tag: string;
  title: string;
  copy: string;
  priceUsdYearly: number;
  href: string;
  imagePng: string; // must be PNG path
  featured?: boolean;
};

type CartItem = {
  productId: string;
  qty: number;
};

const PRODUCTS: Product[] = [
  {
    id: 'track-me',
    name: 'Track Me Solutions',
    tag: 'Hospitality SaaS Platform',
    title: 'Cost • Recipes • Inventory',
    copy: 'A hospitality SaaS platform answered to the cost, recipe, inventory challenges of every chefs, operators, of hotel, restaurant and bar.',
    priceUsdYearly: 540,
    href: 'https://trackme.solutions/',
    imagePng: '/track-me.png',
    featured: true,
  },

  // Future products (placeholder) — replace imagePng with real PNGs later
  {
    id: 'placeholder-1',
    name: 'Coming Soon',
    tag: 'New Product',
    title: 'Next Tool • Next Platform',
    copy: 'Placeholder product card. Replace with real product details and a PNG image when ready.',
    priceUsdYearly: 0,
    href: 'https://trackme.solutions/',
    imagePng: '/track-me.png',
  },
  {
    id: 'placeholder-2',
    name: 'Coming Soon',
    tag: 'New Product',
    title: 'Operations • Data • Control',
    copy: 'Placeholder product card. Replace with real product details and a PNG image when ready.',
    priceUsdYearly: 0,
    href: 'https://trackme.solutions/',
    imagePng: '/track-me.png',
  },
];

function usd(n: number) {
  if (!n) return '$0';
  return `$${n.toLocaleString('en-US')}`;
}

export default function ShopPage() {
  const featured = useMemo(() => PRODUCTS.find((p) => p.featured) ?? PRODUCTS[0], []);
  const others = useMemo(() => PRODUCTS.filter((p) => p.id !== featured.id), [featured.id]);

  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  const cartCount = useMemo(() => items.reduce((sum, it) => sum + it.qty, 0), [items]);

  const cartLines = useMemo(() => {
    return items
      .map((it) => {
        const p = PRODUCTS.find((x) => x.id === it.productId);
        if (!p) return null;
        return { product: p, qty: it.qty, lineTotal: p.priceUsdYearly * it.qty };
      })
      .filter(Boolean) as { product: Product; qty: number; lineTotal: number }[];
  }, [items]);

  const subtotal = useMemo(() => cartLines.reduce((sum, l) => sum + l.lineTotal, 0), [cartLines]);

  function addToCart(productId: string) {
    setItems((prev) => {
      const idx = prev.findIndex((x) => x.productId === productId);
      if (idx === -1) return [...prev, { productId, qty: 1 }];
      const next = [...prev];
      next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
      return next;
    });
    setCartOpen(true);
  }

  function inc(productId: string) {
    setItems((prev) =>
      prev.map((x) => (x.productId === productId ? { ...x, qty: x.qty + 1 } : x)),
    );
  }

  function dec(productId: string) {
    setItems((prev) =>
      prev
        .map((x) => (x.productId === productId ? { ...x, qty: x.qty - 1 } : x))
        .filter((x) => x.qty > 0),
    );
  }

  function remove(productId: string) {
    setItems((prev) => prev.filter((x) => x.productId !== productId));
  }

  return (
    <main className="shop">
      {/* Floating cart */}
      <button
        type="button"
        className={`shop__cartFab ${cartCount > 0 ? 'is-hot' : ''}`}
        onClick={() => setCartOpen(true)}
        aria-label="Open cart"
      >
        <span className="shop__cartIcon" aria-hidden="true">
          🛒
        </span>
        <span className="shop__cartText">Cart</span>
        <span className="shop__cartCount" aria-label={`Cart items: ${cartCount}`}>
          {cartCount}
        </span>
      </button>

      {/* Cart drawer */}
      <div className={`shop__drawerOverlay ${cartOpen ? 'is-open' : ''}`} onClick={() => setCartOpen(false)} />
      <aside className={`shop__drawer ${cartOpen ? 'is-open' : ''}`} aria-label="Shopping cart">
        <div className="shop__drawerTop">
          <div className="shop__drawerTitleWrap">
            <p className="shop__drawerKicker">Shopping Cart</p>
            <p className="shop__drawerTitle">
              Items <span className="shop__drawerPill">{cartCount}</span>
            </p>
          </div>

          <button type="button" className="shop__drawerClose" onClick={() => setCartOpen(false)} aria-label="Close cart">
            ✕
          </button>
        </div>

        <div className="shop__drawerBody">
          {cartLines.length === 0 ? (
            <div className="shop__empty">
              <p className="shop__emptyTitle">Your cart is empty</p>
              <p className="shop__emptyHint">Add a product to see it here.</p>
            </div>
          ) : (
            <div className="shop__cartList">
              {cartLines.map((l) => (
                <div className="shop__cartRow" key={l.product.id}>
                  <div className="shop__cartThumb">
                    <Image
                      src={l.product.imagePng}
                      alt={`${l.product.name} image`}
                      width={56}
                      height={56}
                      className="shop__cartThumbImg"
                      priority={l.product.featured === true}
                    />
                  </div>

                  <div className="shop__cartInfo">
                    <p className="shop__cartName">{l.product.name}</p>
                    <p className="shop__cartMeta">
                      {l.product.priceUsdYearly > 0 ? `${usd(l.product.priceUsdYearly)} / year` : 'TBA'}
                    </p>

                    <div className="shop__qty">
                      <button type="button" className="shop__qtyBtn" onClick={() => dec(l.product.id)} aria-label="Decrease quantity">
                        −
                      </button>
                      <span className="shop__qtyVal" aria-label={`Quantity ${l.qty}`}>
                        {l.qty}
                      </span>
                      <button type="button" className="shop__qtyBtn" onClick={() => inc(l.product.id)} aria-label="Increase quantity">
                        +
                      </button>

                      <button
                        type="button"
                        className="shop__remove"
                        onClick={() => remove(l.product.id)}
                        aria-label="Remove item"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="shop__cartTotal" aria-label="Line total">
                    {l.product.priceUsdYearly > 0 ? usd(l.lineTotal) : '—'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="shop__drawerBottom">
          <div className="shop__subtotalRow">
            <span className="shop__subtotalLabel">Subtotal</span>
            <span className="shop__subtotalVal">{usd(subtotal)}</span>
          </div>

          <a
            className={`shop__primaryBtn shop__primaryBtn--full ${cartLines.length === 0 ? 'is-disabled' : ''}`}
            href={featured.href}
            target="_blank"
            rel="noreferrer"
            aria-label="Continue to platform"
            onClick={(e) => {
              if (cartLines.length === 0) e.preventDefault();
            }}
          >
            Continue
          </a>

          <p className="shop__drawerNote">
            This cart is a UI experience (no payment processing on this page).
          </p>
        </div>
      </aside>

      {/* Top */}
      <section className="shop__top">
        <div className="shop__topInner">
          <div className="shop__titleWrap">
            <p className="shop__kicker">Shop Dashboard</p>
            <h1 className="shop__title">Solutions & Products</h1>
            <p className="shop__sub">
              Handpicked tools and platforms I recommend for chefs, operators, hotels, restaurants, and bars.
            </p>
          </div>

          <div className="shop__topActions">
            <Link href="/" className="shop__ghostBtn" aria-label="Back to Home">
              Back to Home
            </Link>
            <a className="shop__primaryBtn" href={featured.href} target="_blank" rel="noreferrer" aria-label="Visit Track Me Solutions">
              Visit Track Me Solutions
            </a>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="shop__gridWrap">
        <div className="shop__grid">
          {/* Left: Catalog */}
          <div className="shop__catalog" aria-label="Product catalog">
            {/* Featured */}
            <article className="shop__featureCard" aria-label="Featured product">
              <div className="shop__featureMedia">
                <Image
                  src={featured.imagePng}
                  alt={`${featured.name} logo`}
                  width={920}
                  height={520}
                  className="shop__featureImg"
                  priority
                />
                <div className="shop__featureGlow" aria-hidden="true" />
                <div className="shop__featureBadge">Featured</div>
              </div>

              <div className="shop__featureBody">
                <div className="shop__brandRow">
                  <div className="shop__brandDot" aria-hidden="true" />
                  <div className="shop__brandText">
                    <h2 className="shop__brandName">{featured.name}</h2>
                    <p className="shop__brandTag">{featured.tag}</p>
                  </div>
                </div>

                <h3 className="shop__featureTitle">{featured.title}</h3>
                <p className="shop__featureCopy">{featured.copy}</p>

                <div className="shop__priceRow" aria-label="Pricing">
                  <span className="shop__price">{usd(featured.priceUsdYearly)}</span>
                  <span className="shop__priceMeta">USD / yearly</span>
                </div>

                <div className="shop__featureActions">
                  <button
                    type="button"
                    className="shop__primaryBtn"
                    onClick={() => addToCart(featured.id)}
                    aria-label="Add featured product to cart"
                  >
                    Add to Cart
                  </button>

                  <a className="shop__outlineBtn" href={featured.href} target="_blank" rel="noreferrer" aria-label="Learn more">
                    Learn More
                  </a>
                </div>

                <div className="shop__metaGrid" aria-label="Highlights">
                  <div className="shop__metaItem">
                    <p className="shop__metaLabel">Designed for</p>
                    <p className="shop__metaValue">Hotels • Restaurants • Bars</p>
                  </div>
                  <div className="shop__metaItem">
                    <p className="shop__metaLabel">Best for</p>
                    <p className="shop__metaValue">Chef Ops • Cost Control • Stock</p>
                  </div>
                  <div className="shop__metaItem">
                    <p className="shop__metaLabel">Billing</p>
                    <p className="shop__metaValue">{usd(featured.priceUsdYearly)} USD / year</p>
                  </div>
                  <div className="shop__metaItem">
                    <p className="shop__metaLabel">Link</p>
                    <p className="shop__metaValue">trackme.solutions</p>
                  </div>
                </div>
              </div>
            </article>

            {/* Product grid (future-proof) */}
            <div className="shop__cards" aria-label="More products">
              {others.map((p) => (
                <article className="shop__card" key={p.id} aria-label={p.name}>
                  <div className="shop__cardMedia">
                    <Image
                      src={p.imagePng}
                      alt={`${p.name} image`}
                      width={520}
                      height={320}
                      className="shop__cardImg"
                    />
                    <div className="shop__cardSheen" aria-hidden="true" />
                  </div>

                  <div className="shop__cardBody">
                    <div className="shop__cardTop">
                      <div>
                        <p className="shop__cardName">{p.name}</p>
                        <p className="shop__cardTag">{p.tag}</p>
                      </div>

                      <div className="shop__cardPrice" aria-label="Price">
                        {p.priceUsdYearly > 0 ? (
                          <>
                            <span className="shop__cardPriceMain">{usd(p.priceUsdYearly)}</span>
                            <span className="shop__cardPriceMeta">/ yr</span>
                          </>
                        ) : (
                          <span className="shop__cardPriceMain">TBA</span>
                        )}
                      </div>
                    </div>

                    <p className="shop__cardTitle">{p.title}</p>
                    <p className="shop__cardCopy">{p.copy}</p>

                    <div className="shop__cardActions">
                      <button
                        type="button"
                        className="shop__primaryBtn shop__primaryBtn--small"
                        onClick={() => addToCart(p.id)}
                        aria-label={`Add ${p.name} to cart`}
                      >
                        Add
                      </button>
                      <a className="shop__ghostBtn shop__ghostBtn--small" href={p.href} target="_blank" rel="noreferrer" aria-label="Open link">
                        Open
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Right: Panels (kept, but aligned with new shopping UX) */}
          <aside className="shop__side" aria-label="Shop Dashboard Panels">
            <div className="shop__panel">
              <div className="shop__panelTop">
                <p className="shop__panelTitle">What you get</p>
                <p className="shop__panelHint">A clear path to tighter control and cleaner operations.</p>
              </div>
              <ul className="shop__list">
                <li>Recipe costing and margin visibility</li>
                <li>Inventory tracking and movement discipline</li>
                <li>Operational clarity for teams and owners</li>
                <li>Scales from single venue to multi-site</li>
              </ul>
            </div>

            <div className="shop__panel">
              <div className="shop__panelTop">
                <p className="shop__panelTitle">Recommended for</p>
                <p className="shop__panelHint">Roles that need fast, accurate numbers.</p>
              </div>
              <div className="shop__chips">
                <span className="shop__chip">Executive Chefs</span>
                <span className="shop__chip">Sous Chefs</span>
                <span className="shop__chip">Restaurant Owners</span>
                <span className="shop__chip">Bar Managers</span>
                <span className="shop__chip">Hotel Operators</span>
                <span className="shop__chip">Cost Controllers</span>
              </div>
            </div>

            <div className="shop__panel shop__panel--cta">
              <p className="shop__panelTitle">Ready to explore?</p>
              <p className="shop__panelHint">
                Add items to your cart, then continue to the platform: <strong>{usd(featured.priceUsdYearly)} USD yearly</strong>.
              </p>
              <button
                type="button"
                className="shop__primaryBtn shop__primaryBtn--full"
                onClick={() => setCartOpen(true)}
                aria-label="Open cart"
              >
                Review Cart
              </button>
            </div>
          </aside>
        </div>
      </section>

      {/* Inline styles (scoped to this page only) */}
      <style jsx>{`
        .shop {
          min-height: 100vh;
          padding-bottom: 80px;
          background: #fff;
          color: #0b0b0b;
          position: relative;
        }

        .shop__top {
          padding: 46px 18px 26px;
        }

        .shop__topInner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 18px;
        }

        .shop__kicker {
          margin: 0 0 8px;
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          opacity: 0.65;
        }

        .shop__title {
          margin: 0;
          font-size: clamp(32px, 3.6vw, 48px);
          line-height: 1.06;
        }

        .shop__sub {
          margin: 10px 0 0;
          max-width: 560px;
          font-size: 15px;
          line-height: 1.6;
          opacity: 0.78;
        }

        .shop__topActions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .shop__ghostBtn,
        .shop__outlineBtn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 42px;
          padding: 0 14px;
          border-radius: 999px;
          border: 1px solid rgba(0, 0, 0, 0.14);
          text-decoration: none;
          font-size: 14px;
          color: #0b0b0b;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(10px);
          transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
        }

        .shop__ghostBtn--small {
          height: 38px;
          padding: 0 12px;
          font-size: 13px;
        }

        .shop__primaryBtn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 42px;
          padding: 0 16px;
          border-radius: 999px;
          border: 1px solid rgba(0, 0, 0, 0.06);
          text-decoration: none;
          font-size: 14px;
          color: #0b0b0b;
          background: linear-gradient(135deg, #ffd400, #ffb800);
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.12);
          transition: transform 160ms ease, box-shadow 160ms ease;
          font-weight: 900;
          cursor: pointer;
        }

        .shop__primaryBtn--small {
          height: 38px;
          padding: 0 14px;
          font-size: 13px;
        }

        .shop__primaryBtn--full {
          width: 100%;
        }

        .shop__primaryBtn.is-disabled {
          opacity: 0.55;
          pointer-events: none;
          filter: grayscale(0.2);
        }

        .shop__ghostBtn:hover,
        .shop__outlineBtn:hover,
        .shop__primaryBtn:hover {
          transform: translateY(-1px);
          box-shadow: 0 18px 44px rgba(0, 0, 0, 0.16);
        }

        .shop__gridWrap {
          padding: 14px 18px 0;
        }

        .shop__grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.4fr 0.9fr;
          gap: 18px;
          align-items: start;
        }

        .shop__catalog {
          display: grid;
          gap: 14px;
        }

        .shop__featureCard {
          border-radius: 22px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          position: relative;
          transform: translateZ(0);
        }

        .shop__featureMedia {
          position: relative;
          height: 240px;
          overflow: hidden;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          background: radial-gradient(800px 260px at 30% 0%, rgba(255, 212, 0, 0.22), rgba(255, 255, 255, 0.82));
        }

        .shop__featureImg {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transform: scale(1.02);
          transition: transform 260ms ease;
          padding: 18px;
        }

        .shop__featureCard:hover .shop__featureImg {
          transform: scale(1.06);
        }

        .shop__featureGlow {
          position: absolute;
          inset: -2px;
          background: radial-gradient(700px 240px at 20% 0%, rgba(255, 212, 0, 0.26), transparent 60%),
            radial-gradient(700px 240px at 90% 10%, rgba(0, 0, 0, 0.06), transparent 60%);
          pointer-events: none;
        }

        .shop__featureBadge {
          position: absolute;
          top: 14px;
          left: 14px;
          display: inline-flex;
          align-items: center;
          height: 28px;
          padding: 0 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 900;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: rgba(255, 255, 255, 0.78);
        }

        .shop__featureBody {
          position: relative;
          padding: 14px 18px 18px;
        }

        .shop__brandRow {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .shop__brandDot {
          width: 12px;
          height: 12px;
          border-radius: 999px;
          background: linear-gradient(135deg, #ffd400, #ffb800);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
        }

        .shop__brandName {
          margin: 0;
          font-size: 18px;
          line-height: 1.1;
        }

        .shop__brandTag {
          margin: 4px 0 0;
          font-size: 12px;
          opacity: 0.7;
        }

        .shop__featureTitle {
          margin: 12px 0 8px;
          font-size: 22px;
          line-height: 1.2;
        }

        .shop__featureCopy {
          margin: 0;
          font-size: 14px;
          line-height: 1.7;
          opacity: 0.8;
          max-width: 70ch;
        }

        .shop__priceRow {
          margin-top: 16px;
          display: flex;
          align-items: baseline;
          gap: 10px;
        }

        .shop__price {
          font-size: 34px;
          font-weight: 900;
          letter-spacing: -0.02em;
        }

        .shop__priceMeta {
          font-size: 13px;
          opacity: 0.75;
        }

        .shop__featureActions {
          margin-top: 14px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .shop__metaGrid {
          margin-top: 16px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .shop__metaItem {
          border-radius: 16px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: rgba(255, 255, 255, 0.72);
          padding: 12px;
        }

        .shop__metaLabel {
          margin: 0;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0.65;
        }

        .shop__metaValue {
          margin: 6px 0 0;
          font-size: 13px;
          font-weight: 900;
          opacity: 0.9;
        }

        .shop__cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .shop__card {
          border-radius: 22px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          transform: translateZ(0);
          transition: transform 180ms ease, box-shadow 180ms ease;
        }

        .shop__card:hover {
          transform: translateY(-2px);
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.12);
        }

        .shop__cardMedia {
          position: relative;
          height: 150px;
          overflow: hidden;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          background: radial-gradient(700px 220px at 30% 0%, rgba(255, 212, 0, 0.18), rgba(255, 255, 255, 0.85));
        }

        .shop__cardImg {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 14px;
          transform: scale(1.02);
          transition: transform 260ms ease;
        }

        .shop__card:hover .shop__cardImg {
          transform: scale(1.07);
        }

        .shop__cardSheen {
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.42) 35%, transparent 70%);
          transform: translateX(-70%);
          transition: transform 520ms ease;
          pointer-events: none;
          opacity: 0.7;
        }

        .shop__card:hover .shop__cardSheen {
          transform: translateX(70%);
        }

        .shop__cardBody {
          padding: 14px;
        }

        .shop__cardTop {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
        }

        .shop__cardName {
          margin: 0;
          font-size: 14px;
          font-weight: 900;
        }

        .shop__cardTag {
          margin: 4px 0 0;
          font-size: 12px;
          opacity: 0.7;
        }

        .shop__cardPrice {
          text-align: right;
          display: grid;
          gap: 2px;
        }

        .shop__cardPriceMain {
          font-size: 14px;
          font-weight: 900;
        }

        .shop__cardPriceMeta {
          font-size: 11px;
          opacity: 0.7;
        }

        .shop__cardTitle {
          margin: 10px 0 6px;
          font-size: 15px;
          font-weight: 900;
          letter-spacing: -0.01em;
        }

        .shop__cardCopy {
          margin: 0;
          font-size: 13px;
          line-height: 1.55;
          opacity: 0.8;
        }

        .shop__cardActions {
          margin-top: 12px;
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .shop__side {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .shop__panel {
          border-radius: 22px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.08);
          padding: 16px;
        }

        .shop__panel--cta {
          background: radial-gradient(700px 260px at 30% 0%, rgba(255, 212, 0, 0.28), rgba(255, 255, 255, 0.78));
        }

        .shop__panelTop {
          margin-bottom: 10px;
        }

        .shop__panelTitle {
          margin: 0;
          font-size: 14px;
          font-weight: 900;
          letter-spacing: -0.01em;
        }

        .shop__panelHint {
          margin: 6px 0 0;
          font-size: 13px;
          opacity: 0.75;
          line-height: 1.5;
        }

        .shop__list {
          margin: 10px 0 0;
          padding-left: 18px;
          display: grid;
          gap: 8px;
          font-size: 13px;
          line-height: 1.55;
          opacity: 0.88;
        }

        .shop__chips {
          margin-top: 10px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .shop__chip {
          font-size: 12px;
          font-weight: 900;
          padding: 8px 10px;
          border-radius: 999px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background: rgba(255, 255, 255, 0.72);
        }

        /* Cart FAB */
        .shop__cartFab {
          position: fixed;
          right: 18px;
          bottom: 18px;
          z-index: 80;
          border-radius: 999px;
          height: 46px;
          padding: 0 12px 0 14px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(10px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.16);
          cursor: pointer;
          transition: transform 160ms ease, box-shadow 160ms ease;
        }

        .shop__cartFab:hover {
          transform: translateY(-1px);
          box-shadow: 0 26px 60px rgba(0, 0, 0, 0.18);
        }

        .shop__cartFab.is-hot {
          border-color: rgba(255, 184, 0, 0.55);
        }

        .shop__cartIcon {
          font-size: 16px;
        }

        .shop__cartText {
          font-size: 13px;
          font-weight: 900;
        }

        .shop__cartCount {
          height: 22px;
          min-width: 22px;
          padding: 0 7px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 900;
          background: linear-gradient(135deg, #ffd400, #ffb800);
          border: 1px solid rgba(0, 0, 0, 0.08);
        }

        /* Drawer */
        .shop__drawerOverlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.28);
          opacity: 0;
          pointer-events: none;
          transition: opacity 200ms ease;
          z-index: 90;
        }

        .shop__drawerOverlay.is-open {
          opacity: 1;
          pointer-events: auto;
        }

        .shop__drawer {
          position: fixed;
          top: 0;
          right: 0;
          height: 100vh;
          width: min(420px, 92vw);
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(14px);
          border-left: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: -30px 0 80px rgba(0, 0, 0, 0.18);
          transform: translateX(110%);
          transition: transform 220ms ease;
          z-index: 100;
          display: grid;
          grid-template-rows: auto 1fr auto;
        }

        .shop__drawer.is-open {
          transform: translateX(0);
        }

        .shop__drawerTop {
          padding: 16px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }

        .shop__drawerKicker {
          margin: 0;
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          opacity: 0.65;
        }

        .shop__drawerTitle {
          margin: 6px 0 0;
          font-size: 16px;
          font-weight: 900;
          letter-spacing: -0.01em;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .shop__drawerPill {
          height: 22px;
          min-width: 22px;
          padding: 0 8px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 900;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .shop__drawerClose {
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: rgba(255, 255, 255, 0.7);
          height: 38px;
          width: 38px;
          border-radius: 12px;
          cursor: pointer;
          transition: transform 160ms ease, box-shadow 160ms ease;
        }

        .shop__drawerClose:hover {
          transform: translateY(-1px);
          box-shadow: 0 16px 34px rgba(0, 0, 0, 0.14);
        }

        .shop__drawerBody {
          padding: 14px 16px;
          overflow: auto;
        }

        .shop__emptyTitle {
          margin: 0;
          font-size: 14px;
          font-weight: 900;
        }

        .shop__emptyHint {
          margin: 6px 0 0;
          font-size: 13px;
          opacity: 0.75;
          line-height: 1.5;
        }

        .shop__cartList {
          display: grid;
          gap: 12px;
        }

        .shop__cartRow {
          display: grid;
          grid-template-columns: 56px 1fr auto;
          gap: 12px;
          align-items: start;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: rgba(255, 255, 255, 0.7);
          border-radius: 18px;
          padding: 10px;
        }

        .shop__cartThumb {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: rgba(255, 255, 255, 0.82);
          overflow: hidden;
          display: grid;
          place-items: center;
        }

        .shop__cartThumbImg {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 8px;
        }

        .shop__cartName {
          margin: 0;
          font-size: 13px;
          font-weight: 900;
        }

        .shop__cartMeta {
          margin: 4px 0 0;
          font-size: 12px;
          opacity: 0.7;
        }

        .shop__qty {
          margin-top: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .shop__qtyBtn {
          height: 30px;
          width: 34px;
          border-radius: 12px;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: rgba(255, 255, 255, 0.78);
          cursor: pointer;
          font-weight: 900;
        }

        .shop__qtyVal {
          min-width: 22px;
          text-align: center;
          font-size: 13px;
          font-weight: 900;
        }

        .shop__remove {
          margin-left: auto;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: rgba(255, 255, 255, 0.7);
          height: 30px;
          padding: 0 10px;
          border-radius: 12px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 900;
        }

        .shop__cartTotal {
          font-size: 13px;
          font-weight: 900;
          opacity: 0.9;
          padding-top: 2px;
          white-space: nowrap;
        }

        .shop__drawerBottom {
          padding: 14px 16px 16px;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          display: grid;
          gap: 10px;
        }

        .shop__subtotalRow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .shop__subtotalLabel {
          font-size: 13px;
          opacity: 0.75;
          font-weight: 900;
        }

        .shop__subtotalVal {
          font-size: 16px;
          font-weight: 900;
        }

        .shop__drawerNote {
          margin: 0;
          font-size: 12px;
          line-height: 1.5;
          opacity: 0.65;
        }

        @media (max-width: 980px) {
          .shop__topInner {
            flex-direction: column;
            align-items: flex-start;
          }
          .shop__topActions {
            justify-content: flex-start;
          }
          .shop__grid {
            grid-template-columns: 1fr;
          }
          .shop__cards {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
