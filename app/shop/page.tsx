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
  imagePng: string;
  featured?: boolean;
};

type CartItem = {
  productId: string;
  qty: number;
};

const OFFICIAL_PRODUCT: Product = {
  id: 'track-me',
  name: 'Track Me Solutions',
  tag: 'Hospitality SaaS Platform',
  title: 'Cost • Recipes • Inventory',
  copy:
    'A hospitality SaaS platform answered to the cost, recipe, inventory challenges of every chefs, operators, of hotel, restaurant and bar.',
  priceUsdYearly: 540,
  href: 'https://trackme.solutions/',
  imagePng: '/track-me.png',
  featured: true,
};

const YOUTUBE_URL = 'https://www.youtube.com/embed/f6BOYilUJaY';

function usd(n: number) {
  return `$${n.toLocaleString('en-US')}`;
}

export default function ShopPage() {
  const product = useMemo(() => OFFICIAL_PRODUCT, []);
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  const cartCount = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.qty * product.priceUsdYearly, 0);

  function addToCart() {
    setItems([{ productId: product.id, qty: 1 }]);
    setCartOpen(true);
  }

  return (
    <main className="shop">
      {/* Cart FAB */}
      <button className="shop__cartFab" onClick={() => setCartOpen(true)}>
        🛒 Cart <span>{cartCount}</span>
      </button>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="shop__drawer">
          <div className="shop__drawerTop">
            <h3>Shopping Cart</h3>
            <button onClick={() => setCartOpen(false)}>✕</button>
          </div>

          <div className="shop__drawerBody">
            <p className="shop__cartName">{product.name}</p>
            <p className="shop__cartMeta">{usd(product.priceUsdYearly)} / year</p>
          </div>

          <div className="shop__drawerBottom">
            <div className="shop__subtotal">
              <span>Subtotal</span>
              <strong>{usd(subtotal)}</strong>
            </div>
            <a
              className="shop__primaryBtn shop__primaryBtn--full"
              href={product.href}
              target="_blank"
              rel="noreferrer"
            >
              Continue to Platform
            </a>
          </div>
        </div>
      )}

      {/* Top */}
      <section className="shop__top">
        <div className="shop__topInner">
          <div>
            <p className="shop__kicker">Official Product</p>
            <h1 className="shop__title">Solutions & Products</h1>
            <p className="shop__sub">
              Verified platform officially recommended for professional hospitality operations.
            </p>
          </div>

          <div className="shop__topActions">
            <Link href="/" className="shop__ghostBtn">
              Back to Home
            </Link>
            <a className="shop__primaryBtn" href={product.href} target="_blank">
              Visit Platform
            </a>
          </div>
        </div>
      </section>

      {/* Product */}
      <section className="shop__gridWrap">
        <div className="shop__featureCard">
          <div className="shop__media">
            <Image
              src={product.imagePng}
              alt="Track Me Solutions"
              width={900}
              height={420}
              priority
            />
          </div>

          <div className="shop__body">
            <h2>{product.name}</h2>
            <p className="shop__tag">{product.tag}</p>

            <h3>{product.title}</h3>
            <p>{product.copy}</p>

            <div className="shop__price">
              <strong>{usd(product.priceUsdYearly)}</strong> <span>/ yearly</span>
            </div>

            <div className="shop__actions">
              <button className="shop__primaryBtn" onClick={addToCart}>
                Add to Cart
              </button>
              <a className="shop__outlineBtn" href={product.href} target="_blank">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Verification */}
      <section className="shop__video">
        <div className="shop__videoInner">
          <p className="shop__kicker">Product Verification</p>
          <h2>Watch Track Me Solutions in Action</h2>

          <div className="shop__videoFrame">
            <iframe
              src={YOUTUBE_URL}
              title="Track Me Solutions Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <style jsx>{`
        .shop {
          background: #fff;
          padding-bottom: 80px;
        }

        .shop__cartFab {
          position: fixed;
          bottom: 18px;
          right: 18px;
          padding: 12px 16px;
          border-radius: 999px;
          background: #ffd400;
          font-weight: 800;
          border: none;
          cursor: pointer;
        }

        .shop__drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: 360px;
          height: 100vh;
          background: #fff;
          border-left: 1px solid #ddd;
          padding: 16px;
          z-index: 100;
        }

        .shop__topInner,
        .shop__videoInner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px 18px;
        }

        .shop__featureCard {
          max-width: 1200px;
          margin: 0 auto;
          border-radius: 22px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }

        .shop__media {
          background: #f9f9f9;
          padding: 24px;
        }

        .shop__body {
          padding: 24px;
        }

        .shop__videoFrame {
          margin-top: 16px;
          position: relative;
          padding-top: 56.25%;
        }

        .shop__videoFrame iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border-radius: 18px;
        }
      `}</style>
    </main>
  );
}
