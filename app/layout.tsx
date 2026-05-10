// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import Header from '../components/Header';
import ContactWidget from '../components/ContactWidget';
import BuyMeCoffeeWidget from '../components/BuyMeCoffeeWidget';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://alexhardinan.com'),
  title: 'Alexander Hardinan',
  description: 'Culinary innovator. Modern gastronomy.',

  icons: {
    icon: [{ url: '/site-logo.png', type: 'image/png' }],
    apple: [{ url: '/site-logo.png' }],
  },

  openGraph: {
    title: 'Alexander Hardinan',
    description: 'Culinary innovator. Modern gastronomy.',
    url: 'https://alexhardinan.com',
    siteName: 'Alexander Hardinan',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Alexander Hardinan',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Alexander Hardinan',
    description: 'Culinary innovator. Modern gastronomy.',
    images: ['/og-image.png'],
  },
};

const SITE_NAME = 'Alexander Hardinan';
const SITE_URL = 'https://alexhardinan.com';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://vitals.vercel-insights.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />

        <meta httpEquiv="Cache-Control" content="public, max-age=604800, immutable" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#ffffff" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  name: SITE_NAME,
                  url: SITE_URL,
                },
                {
                  '@type': 'Person',
                  name: SITE_NAME,
                  url: SITE_URL,
                  jobTitle: 'Executive Chef',
                  sameAs: [
                    'https://www.instagram.com/bw_bychefalex?igsh=dTlhdnp4MjZjaTg5&utm_source=qr',
                    'https://www.facebook.com/share/1DQne9DYkt/?mibextid=wwXIfr',
                  ],
                },
              ],
            }),
          }}
        />

        <meta name="bmc-proof" content="enabled" />
      </head>

      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <ContactWidget />
        <BuyMeCoffeeWidget />

        {/* GSupport Popup Widget */}
        <button
          type="button"
          id="gsupport-open"
          aria-label="Open GSupport"
          style={{
            position: 'fixed',
            right: '18px',
            bottom: '180px',
            zIndex: 999999,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 14px',
            borderRadius: '999px',
            border: 0,
            cursor: 'pointer',
            color: 'rgba(0,0,0,0.92)',
            background: 'linear-gradient(90deg, #fbbf24, #f97316)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.28)',
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
            fontWeight: 800,
            fontSize: '14px',
            letterSpacing: '-0.01em',
          }}
        >
          <img
            src="https://gsupport.space/g-logo.png"
            alt="GSupport"
            width="22"
            height="22"
            style={{ display: 'block', borderRadius: '8px' }}
          />
          <span>Support</span>
        </button>

        <div
          id="gsupport-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="GSupport Widget"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000000,
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '18px',
            background: 'rgba(0,0,0,0.72)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div
            style={{
              width: 'min(980px, 100%)',
              height: 'min(720px, 100%)',
              borderRadius: '22px',
              border: '1px solid rgba(255,255,255,0.14)',
              background: 'rgba(255,255,255,0.06)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.55)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <button
              type="button"
              id="gsupport-close"
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                zIndex: 2,
                width: '40px',
                height: '40px',
                borderRadius: '14px',
                border: '1px solid rgba(255,255,255,0.14)',
                background: 'rgba(0,0,0,0.35)',
                color: 'rgba(255,255,255,0.9)',
                cursor: 'pointer',
                fontSize: '18px',
                lineHeight: '40px',
              }}
            >
              ✕
            </button>

            <iframe
              src="https://gsupport.space/@alex"
              title="GSupport"
              style={{
                width: '100%',
                height: '100%',
                border: 0,
                background: 'transparent',
              }}
              allow="clipboard-write; payment"
            />
          </div>
        </div>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var openBtn = document.getElementById('gsupport-open');
                var overlay = document.getElementById('gsupport-overlay');
                var closeBtn = document.getElementById('gsupport-close');

                function open() {
                  if (!overlay) return;
                  overlay.style.display = 'flex';
                  document.documentElement.style.overflow = 'hidden';
                  document.body.style.overflow = 'hidden';
                }

                function close() {
                  if (!overlay) return;
                  overlay.style.display = 'none';
                  document.documentElement.style.overflow = '';
                  document.body.style.overflow = '';
                }

                if (openBtn) openBtn.addEventListener('click', open);
                if (closeBtn) closeBtn.addEventListener('click', close);
                if (overlay) overlay.addEventListener('click', function (e) {
                  if (e.target === overlay) close();
                });

                window.addEventListener('keydown', function (e) {
                  if (e.key === 'Escape') close();
                });
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <a
        href="https://www.instagram.com/bw_bychefalex?igsh=dTlhdnp4MjZjaTg5&utm_source=qr"
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram"
      >
        <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z" />
        </svg>
      </a>

      <a
        href="https://www.facebook.com/share/1DQne9DYkt/?mibextid=wwXIfr"
        target="_blank"
        rel="noreferrer"
        aria-label="Facebook"
      >
        <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 22v-8h3l1-4h-4V7.5A1.5 1.5 0 0 1 14.5 6H17V2h-3.5A5.5 5.5 0 0 0 8 7.5V10H5v4h3v8h5z" />
        </svg>
      </a>
    </footer>
  );
}