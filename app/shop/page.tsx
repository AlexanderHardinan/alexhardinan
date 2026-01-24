// app/shop/page.tsx
'use client';

import Link from 'next/link';

export default function ShopPage() {
  return (
    <main className="shop">
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
            <a
              className="shop__primaryBtn"
              href="https://trackme.solutions/"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Track Me Solutions"
            >
              Visit Track Me Solutions
            </a>
          </div>
        </div>
      </section>

      {/* Main grid */}
      <section className="shop__gridWrap">
        <div className="shop__grid">
          {/* Left: Feature card */}
          <article className="shop__featureCard" aria-label="Track Me Solutions Feature">
            <div className="shop__featureHeader">
              <div className="shop__badge">Featured</div>
              <div className="shop__brandRow">
                <div className="shop__brandDot" aria-hidden="true" />
                <div className="shop__brandText">
                  <h2 className="shop__brandName">Track Me Solutions</h2>
                  <p className="shop__brandTag">Hospitality SaaS Platform</p>
                </div>
              </div>
            </div>

            <div className="shop__featureBody">
              <h3 className="shop__featureTitle">Cost • Recipes • Inventory</h3>
              <p className="shop__featureCopy">
                A hospitality SaaS platform answered to the cost, recipe, inventory challenges of every chefs, operators,
                of hotel, restaurant and bar.
              </p>

              <div className="shop__priceRow" aria-label="Pricing">
                <span className="shop__price">$540</span>
                <span className="shop__priceMeta">USD / yearly</span>
              </div>

              <div className="shop__featureActions">
                <a
                  className="shop__primaryBtn"
                  href="https://trackme.solutions/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open Track Me Solutions"
                >
                  Open Platform
                </a>
                <a
                  className="shop__outlineBtn"
                  href="https://trackme.solutions/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Learn more about Track Me Solutions"
                >
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
                  <p className="shop__metaValue">$540 USD / year</p>
                </div>
                <div className="shop__metaItem">
                  <p className="shop__metaLabel">Link</p>
                  <p className="shop__metaValue">trackme.solutions</p>
                </div>
              </div>
            </div>
          </article>

          {/* Right: Dashboard cards */}
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
                Visit the platform and review the pricing: <strong>$540 USD yearly</strong>.
              </p>
              <a
                className="shop__primaryBtn shop__primaryBtn--full"
                href="https://trackme.solutions/"
                target="_blank"
                rel="noreferrer"
                aria-label="Go to Track Me Solutions"
              >
                Go to Track Me Solutions
              </a>
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
          font-weight: 700;
        }

        .shop__primaryBtn--full {
          width: 100%;
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

        .shop__featureCard {
          border-radius: 22px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          position: relative;
        }

        .shop__featureCard::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: radial-gradient(900px 260px at 20% 0%, rgba(255, 212, 0, 0.28), transparent 60%),
            radial-gradient(700px 260px at 90% 10%, rgba(0, 0, 0, 0.06), transparent 60%);
          pointer-events: none;
        }

        .shop__featureHeader {
          position: relative;
          padding: 18px 18px 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
        }

        .shop__badge {
          display: inline-flex;
          align-items: center;
          height: 28px;
          padding: 0 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: rgba(255, 255, 255, 0.7);
        }

        .shop__brandRow {
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: flex-end;
          text-align: right;
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

        .shop__featureBody {
          position: relative;
          padding: 8px 18px 18px;
        }

        .shop__featureTitle {
          margin: 8px 0 8px;
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
          font-weight: 700;
          opacity: 0.9;
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
          font-weight: 700;
          padding: 8px 10px;
          border-radius: 999px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background: rgba(255, 255, 255, 0.72);
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
        }
      `}</style>
    </main>
  );
}
