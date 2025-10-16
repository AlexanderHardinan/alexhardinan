import './globals.css';
import type { Metadata } from 'next';
import Header from '../components/Header';
import ContactWidget from '../components/ContactWidget';

export const metadata: Metadata = {
  title: 'Alexander Hardinan',
  description: 'Culinary innovator. Modern gastronomy.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
        <ContactWidget />
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <a href="https://www.instagram.com/bw_bychefalex?igsh=dTlhdnp4MjZjaTg5&utm_source=qr" target="_blank" rel="noreferrer" aria-label="Instagram">
        <svg className="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z"/></svg>
      </a>
      <a href="https://www.facebook.com/share/1DQne9DYkt/?mibextid=wwXIfr" target="_blank" rel="noreferrer" aria-label="Facebook">
        <svg className="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-8h3l1-4h-4V7.5A1.5 1.5 0 0 1 14.5 6H17V2h-3.5A5.5 5.5 0 0 0 8 7.5V10H5v4h3v8h5z"/></svg>
      </a>
    </footer>
  );
}
