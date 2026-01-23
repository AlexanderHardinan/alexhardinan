// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import Script from 'next/script';
import Header from '../components/Header';
import ContactWidget from '../components/ContactWidget';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://alexhardinan.com'),
  title: 'Alexander Hardinan',
  description: 'Culinary innovator. Modern gastronomy.',
  icons: '/favicon.ico',
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
        {/* Performance */}
        <link rel="preconnect" href="https://vitals.vercel-insights.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />

        {/* Caching + viewport */}
        <meta httpEquiv="Cache-Control" content="public, max-age=604800, immutable" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#ffffff" />

        {/* Phase 13 — Global JSON-LD (WebSite + Person) */}
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

        {/* Proof marker so you can confirm this file is deployed */}
        <meta name="bmc-proof" content="enabled" />
      </head>

      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <ContactWidget />

        {/* Buy Me a Coffee floating widget */}
        <Script
          src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
          strategy="afterInteractive"
          data-name="BMC-Widget"
          data-cfasync="false"
          data-id="chefalex"
          data-description="Support me on Buy me a coffee!"
          data-message=""
          data-color="#5F7FFF"
          data-position="Right"
          data-x_margin="18"
          data-y_margin="18"
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
