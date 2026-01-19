// app/blog/[slug]/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '../../../components/Breadcrumbs';

type Article = {
  title: string;
  src: string;
  content: string[];
};

const SITE = 'https://alexhardinan.com';
const SITE_NAME = 'Alexander Hardinan';

const articles: Record<string, Article> = {
  'built-by-a-chef-restaurant-cost-control': {
    title: 'Built by a Chef: A Smarter Way to Control Restaurant Costs',
    src: '/platform.png',
    content: [
      'In hospitality, cost leakage often goes unnoticed — not because teams don’t care, but because systems fail to provide clarity where it matters most.',
      'Many restaurants struggle with stock levels that are either too low or too high, products expiring before they’re noticed, manual calorie and recipe calculations, and overcomplicated systems that teams avoid using.',
      'A Platform Designed From Real Kitchen Experience',
      'Track Me Solutions was built by a chef who understands how kitchens and bars actually operate. Instead of forcing teams to adapt to software, the platform adapts to the kitchen.',
      'The platform delivers automated alerts for low and overstock situations, expiry notifications 3 days before deadlines with a dismiss function, an integrated AI Chef Alex that explains the platform and provides calorie data for products, simple workflows requiring minimal training, and a modern dashboard designed for decision-making — not guesswork.',
      'Cost That Makes Sense',
      'At $1.30 per day, Track Me Solutions costs less than the daily waste and leakage most businesses already accept. It’s not an added expense — it’s a smarter way to protect margins.',
      'Learn more at trackme.solutions.',
    ],
  },

  'track-me-solutions-phase-1-startup-guide': {
    title: 'Track Me Solutions — Phase 1: Startup Guide',
    src: '/phase-1.png',
    content: [
      'The Best Inventory SaaS Platform for Restaurants in 2026',
      'In 2026, restaurant and bar operations demand more than spreadsheets, manual stock counts, or disconnected tools. The industry now requires real-time inventory management, cloud-based access, and chef-driven software that delivers immediate control without complexity.',
      'Track Me Solutions stands out as one of the best inventory SaaS platforms for hospitality in 2026 — designed specifically for restaurants, bars, and culinary operations that need accuracy, speed, and visibility from day one.',
      'Getting started with Track Me Solutions is intentionally simple.',
      'As a cloud-based inventory SaaS platform, there is no software to install, no hardware dependency, and no technical setup required. As long as you have an internet connection, you can access the system from any device — desktop, tablet, or mobile.',
      'During onboarding, users create an account, register their business, and receive a unique Business ID with email verification for security and accountability. Once verified, logging in automatically unlocks the full operational dashboard, inventory controls, and system features.',
      'This fast onboarding process is designed for modern hospitality businesses that cannot afford downtime, complexity, or long implementation cycles.',
      'The result is immediate access to a professional inventory management system, zero learning friction for teams, and full operational visibility from day one.',
      'In a market crowded with generic tools, Track Me Solutions sets the benchmark for inventory SaaS platforms in 2026 — built by a chef, powered by modern technology, and designed for real-world hospitality operations.',
    ],
  },

  'track-me-solutions-phase-2-chef-alex-ai-model': {
    title: 'Track Me Solutions – Phase 2: Chef Alex AI Model',
    src: '/phase-2.png',
    content: [
      'The Most Advanced AI Inventory & Calorie Intelligence for Restaurants in 2026',
      'In 2026, restaurant and hospitality operations are no longer driven by intuition alone. Rising food costs, stricter regulations, and growing consumer demand for transparency require intelligent, AI-powered restaurant management software that understands how kitchens actually work.',
      'This is where Track Me Solutions separates itself from traditional inventory systems.',
      'Phase 2 introduces Chef Alex AI, a chef-built artificial intelligence model designed specifically for restaurant inventory management, recipe development, calorie calculation, and operational guidance.',
      'Unlike generic AI tools, Chef Alex is purpose-built for hospitality professionals.',
    ],
  },

  // ✅ NEW: PHASE 3
  'track-me-solutions-phase-3-supplier-product-inventory': {
    title: 'Track Me Solutions — Phase 3: Supplier & Product Inventory System',
    src: '/phase-3.png',
    content: [
      'The Most Advanced Supplier and Product Inventory System for Restaurants in 2026',
      'In 2026, restaurant inventory management is no longer just about counting stock. It is about supplier intelligence, product-level control, real-time alerts, and accurate stock valuation — all working together in one cloud-based SaaS platform.',
      'Phase 3 of Track Me Solutions introduces a powerful supplier and product management system designed to give restaurants, bars, and hospitality operators full control over where products come from, how they move, and when action is required.',
      'This is where inventory becomes intelligent.',
      'Why Supplier Management Matters in Modern Hospitality',
      'One of the biggest weaknesses in traditional restaurant inventory systems is poor supplier tracking. Many operations rely on informal records, spreadsheets, or disconnected tools that fail to show the full picture.',
      'Track Me Solutions solves this by allowing operators to create unlimited suppliers, store supplier address and contact information, edit and manage suppliers dynamically, and link products directly to their source.',
      'This creates accountability, traceability, and cleaner procurement workflows — essential for multi-supplier kitchens and bars.',
      'Flexible Supplier Creation Built for Real Operations',
      'Phase 3 allows you to create suppliers such as supermarkets, meat suppliers, vegetable suppliers, seafood suppliers, bakery suppliers, and special ingredient suppliers.',
      'Each supplier is stored as a reusable data source, making the system flexible, editable, and scalable as operations grow.',
      'This positions Track Me Solutions as one of the best supplier management SaaS platforms for restaurants in 2026.',
      'Product Creation With AI-Powered Intelligence',
      'Adding products in Track Me Solutions is not manual guesswork. With Chef Alex AI, users can look up products in the Calories Pad, instantly retrieve calorie information, and apply that data directly during product creation.',
      'This ensures that products are created with nutritional accuracy, supporting recipe development, compliance, and reporting from the start.',
      'SKU Generation, Cost Control, and Par Stock Logic',
      'Each product includes automatic SKU generation, quantity tracking by unit, cost entry for accurate valuation, supplier linking, and par stock configuration.',
      'Par stock levels allow operators to define what “healthy stock” looks like. When quantities fall below par, the system knows — and reacts.',
      'This makes Track Me Solutions one of the most intelligent product tracking and par stock systems for restaurants in 2026.',
      'Expiry Date Intelligence and Real-Time Alerts',
      'Food waste and expired products are among the largest hidden losses in hospitality. Phase 3 introduces expiry intelligence, allowing users to assign expiration dates per product, receive alerts when products are nearing expiry, and override or restore alerts when action is taken.',
      'This proactive alerting system helps reduce waste, improve food safety, and protect profitability.',
      'Real-Time Product Tracker Dashboard',
      'Once products are created, everything connects to the dashboard. The Product Tracker provides real-time stock visibility, low-stock alerts, accurate raw stock value calculations, product-level filtering using Product ID, and live updates as stock changes.',
      'This eliminates blind spots and manual checks, giving operators immediate insight into inventory health.',
      'CSV and PDF Export for Reporting and Compliance',
      'Track Me Solutions supports CSV export for data analysis and PDF export for reporting and audits. This makes it suitable for internal reviews, supplier reconciliation, and compliance documentation.',
      'Why Track Me Solutions Leads in 2026',
      'Phase 3 brings together supplier intelligence, product-level accuracy, AI-powered calorie integration, expiry and par stock alerts, and real-time dashboard control. Few platforms combine all of these in one system.',
      'That is why Track Me Solutions stands out as one of the best restaurant inventory SaaS platforms in 2026.',
      'From Phase 3 to Full Inventory Control',
      'With suppliers structured, products intelligently created, and alerts working in real time, restaurants gain better purchasing decisions, reduced waste and shrinkage, cleaner supplier accountability, accurate stock valuation, and operational confidence.',
      'Phase 3 transforms inventory from static data into a living control system.',
      'Conclusion',
      'Supplier chaos and product blind spots are no longer acceptable in modern hospitality. Phase 3 of Track Me Solutions delivers the intelligence, structure, and real-time control required to operate efficiently in 2026 and beyond.',
      'Built by a chef. Powered by modern SaaS technology. Designed for complete inventory control.',
      'Get started at https://trackme.solutions',
    ],
  },

  'carrot-confidential': {
    title: '🥕 Carrot Confidential',
    src: '/blog/blog1.png',
    content: [
      'A single ingredient. Infinite expressions.',
      'This dish embodies my belief that luxury begins with intention, not expense. A humble carrot — transformed through precision, patience, and passion — becomes a study in texture, color, and purity of flavor.',
      'Carrot cappellini · Carrot sphere · Carrot caviar · Carrot crème · Carrot roll · Carrot oil crumble · Carrot jelly · Carrot glaze · Carrot tuile',
      'Each element reveals a distinct personality, yet together they compose a modern symphony of simplicity — a reminder that true gastronomy elevates the everyday.',
      'Where the humble carrot meets the vision of a modern Gastronomist — Chef Alex.',
    ],
  },
  'sourcing-excellence': {
    title: 'Sourcing Excellence: The Farmer’s Role',
    src: '/blog/blog2.png',
    content: [
      'From soil to plate — every connection matters.',
      'The bond between chef and farmer is creative collaboration. By understanding the rhythm of the land, I honor nature’s cycle and ensure ingredients arrive at their peak — ethically sourced, vibrant, alive.',
    ],
  },
  'balancing-technique': {
    title: 'Balancing Technique and Emotion',
    src: '/blog/blog3.png',
    content: [
      'Cooking is both science and soul.',
      'Technique refines the craft, but emotion gives it meaning. I cook with discipline and instinct — measuring with precision, yet plating with heart.',
    ],
  },
  'the-global-palate': {
    title: 'The Global Palate',
    src: '/blog/blog4.png',
    content: [
      'Travel defines perspective.',
      'From Asia’s spice markets to Europe’s cellars, each journey expands my sensory library.',
      'Global inspiration is not imitation — it’s dialogue. My goal is to translate those influences into dishes that feel local yet speak universal.',
    ],
  },
};

const blogOrder = Object.keys(articles);

export function generateStaticParams() {
  return blogOrder.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = articles[params.slug];
  if (!article) {
    return {
      title: `Article Not Found | ${SITE_NAME}`,
      robots: { index: false, follow: false },
    };
  }

  // Stronger SEO description selection
  const description =
    article.content?.[0] ||
    article.content?.[1] ||
    'Chef Alex shares insights on modern gastronomy, sourcing, technique, and culinary storytelling.';

  const url = `${SITE}/blog/${params.slug}`;

  return {
    title: `${article.title} | ${SITE_NAME}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${article.title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: article.src, width: 1200, height: 630, alt: article.title }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${article.title} | ${SITE_NAME}`,
      description,
      images: [article.src],
    },
  };
}

export default function SinglePost({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const article = articles[slug];

  if (!article) {
    return (
      <main className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2>Article Not Found</h2>
        <Link href="/blog" className="read-btn">
          ← Back to Blog
        </Link>
      </main>
    );
  }

  const description =
    article.content?.[0] ||
    article.content?.[1] ||
    'Chef Alex shares insights on modern gastronomy, sourcing, technique, and culinary storytelling.';

  const url = `${SITE}/blog/${slug}`;
  const imageAbs = new URL(article.src, SITE).toString();

  const blogPostingLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description,
    image: [imageAbs],
    author: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
    isPartOf: {
      '@type': 'Blog',
      name: 'Culinary Journal',
      url: `${SITE}/blog`,
    },
  };

  const idx = blogOrder.indexOf(slug);
  const prevSlug = idx > 0 ? blogOrder[idx - 1] : null;
  const nextSlug = idx < blogOrder.length - 1 ? blogOrder[idx + 1] : null;

  const isNewPlatformPost = slug === 'built-by-a-chef-restaurant-cost-control';
  const isPhase1Post = slug === 'track-me-solutions-phase-1-startup-guide';
  const isPhase2Post = slug === 'track-me-solutions-phase-2-chef-alex-ai-model';
  const isPhase3Post = slug === 'track-me-solutions-phase-3-supplier-product-inventory';

  return (
    <main className="container" style={{ padding: 0 }}>
      {/* JSON-LD: BlogPosting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingLd) }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: article.title },
        ]}
      />

      {/* ===== HERO BANNER ===== */}
      <section className="blog-hero">
        <Image src={article.src} alt={article.title} fill priority />
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>{article.title}</h1>
          </div>
        </div>
      </section>

      {/* ===== ARTICLE BODY ===== */}
      <section className="blog-article">
        <div className="article-wrapper">
          <Link href="/blog" className="read-btn back-btn">
            ← Back to Blog
          </Link>

          <article className="post-content">
            {isNewPlatformPost ? (
              <>
                <p>
                  In hospitality, cost leakage often goes unnoticed — not because teams don’t care,
                  but because systems fail to provide clarity where it matters most.
                </p>

                <p>Many restaurants struggle with:</p>
                <ul>
                  <li>Stock levels that are either too low or too high</li>
                  <li>Products expiring before they’re noticed</li>
                  <li>Manual calorie and recipe calculations</li>
                  <li>Overcomplicated systems that teams avoid using</li>
                </ul>

                <h2>A Platform Designed From Real Kitchen Experience</h2>
                <p>
                  Track Me Solutions was built by a chef who understands how kitchens and bars
                  actually operate. Instead of forcing teams to adapt to software, the platform
                  adapts to the kitchen.
                </p>

                <p>The platform delivers:</p>
                <ul>
                  <li>Automated alerts for low and overstock situations</li>
                  <li>Expiry notifications 3 days before deadlines, with a dismiss function</li>
                  <li>Integrated AI Chef Alex for guidance and calorie data</li>
                  <li>Simple workflows requiring minimal training</li>
                  <li>A dashboard designed for decision-making — not guesswork</li>
                </ul>

                <h2>Cost That Makes Sense</h2>
                <p>
                  At $1.30 per day, Track Me Solutions costs less than the daily waste and leakage
                  most businesses already accept.
                </p>
                <p>It’s not an added expense. It’s a smarter way to protect margins.</p>

                <p>
                  <strong>Learn more at </strong>
                  <a href="https://trackme.solutions" target="_blank" rel="noreferrer">
                    https://trackme.solutions
                  </a>
                </p>
              </>
            ) : isPhase1Post ? (
              <>
                <h2>Track Me Solutions — Phase 1: Startup Guide</h2>
                <p>
                  <strong>The Best Inventory SaaS Platform for Restaurants in 2026</strong>
                </p>

                <p>
                  In 2026, restaurant and bar operations demand more than spreadsheets, manual stock
                  counts, or disconnected tools. The industry now requires real-time inventory
                  management, cloud-based access, and chef-driven software that delivers immediate
                  control without complexity.
                </p>

                <p>
                  Track Me Solutions stands out as one of the best inventory SaaS platforms for
                  hospitality in 2026 — designed specifically for restaurants, bars, and culinary
                  operations that need accuracy, speed, and visibility from day one.
                </p>

                <h2>Getting Started Is Intentionally Simple</h2>
                <p>
                  As a cloud-based inventory SaaS platform, there is no software to install, no
                  hardware dependency, and no technical setup required. As long as you have an
                  internet connection, you can access the system from any device — desktop, tablet,
                  or mobile.
                </p>

                <p>
                  During onboarding, users create an account, register their business, and receive a
                  unique Business ID with email verification for security and accountability. Once
                  verified, logging in automatically unlocks the full operational dashboard,
                  inventory controls, and system features.
                </p>

                <p>The result is:</p>
                <ul>
                  <li>Immediate access to a professional inventory management system</li>
                  <li>Zero learning friction for teams</li>
                  <li>Full operational visibility from day one</li>
                </ul>

                <p>
                  In a market crowded with generic tools, Track Me Solutions sets the benchmark for
                  inventory SaaS platforms in 2026 — built by a chef, powered by modern technology,
                  and designed for real-world hospitality operations.
                </p>
              </>
            ) : isPhase2Post ? (
              <>
                <h2>Track Me Solutions – Phase 2: Chef Alex AI Model</h2>
                <p>
                  <strong>
                    The Most Advanced AI Inventory &amp; Calorie Intelligence for Restaurants in
                    2026
                  </strong>
                </p>

                <p>
                  In 2026, restaurant and hospitality operations are no longer driven by intuition
                  alone. Rising food costs, stricter regulations, and growing consumer demand for
                  transparency require intelligent, AI-powered restaurant management software that
                  understands how kitchens actually work.
                </p>

                <p>
                  Phase 2 introduces Chef Alex AI, a chef-built AI model designed for inventory,
                  recipe development, calorie calculation, and operational guidance — built for
                  hospitality professionals.
                </p>

                <p>
                  <strong>Learn more and get started at </strong>
                  <a href="https://trackme.solutions" target="_blank" rel="noreferrer">
                    https://trackme.solutions
                  </a>
                </p>
              </>
            ) : isPhase3Post ? (
              <>
                <h2>Track Me Solutions — Phase 3: Supplier &amp; Product Inventory System</h2>
                <p>
                  <strong>
                    The Most Advanced Supplier and Product Inventory System for Restaurants in 2026
                  </strong>
                </p>

                <p>
                  In 2026, restaurant inventory management is no longer just about counting stock.
                  It is about supplier intelligence, product-level control, real-time alerts, and
                  accurate stock valuation — all working together in one cloud-based SaaS platform.
                </p>

                <p>
                  Phase 3 of Track Me Solutions introduces a supplier and product management system
                  designed to give restaurants, bars, and hospitality operators full control over
                  where products come from, how they move, and when action is required.
                </p>

                <p>This is where inventory becomes intelligent.</p>

                <h2>Why Supplier Management Matters in Modern Hospitality</h2>
                <p>
                  Traditional restaurant inventory systems often fail at supplier tracking. Many
                  operations rely on spreadsheets or disconnected tools that never show the full
                  picture.
                </p>

                <p>Track Me Solutions solves this by letting operators:</p>
                <ul>
                  <li>Create unlimited suppliers</li>
                  <li>Store supplier address and contact information</li>
                  <li>Edit and manage suppliers dynamically</li>
                  <li>Link products directly to their source</li>
                </ul>

                <p>
                  This creates accountability, traceability, and cleaner procurement workflows —
                  essential for multi-supplier kitchens and bars.
                </p>

                <h2>Flexible Supplier Creation Built for Real Operations</h2>
                <p>Phase 3 supports supplier types such as:</p>
                <ul>
                  <li>Supermarkets</li>
                  <li>Meat suppliers</li>
                  <li>Vegetable suppliers</li>
                  <li>Seafood suppliers</li>
                  <li>Bakery suppliers</li>
                  <li>Special ingredient suppliers</li>
                </ul>

                <p>
                  Each supplier becomes a reusable data source — flexible, editable, and scalable as
                  operations grow.
                </p>

                <h2>Product Creation With AI-Powered Intelligence</h2>
                <p>
                  Adding products is not manual guesswork. With Chef Alex AI, users can retrieve
                  calorie information via the Calories Pad and apply it directly during product
                  creation.
                </p>

                <p>
                  This ensures products are created with nutritional accuracy, supporting recipe
                  development, compliance, and reporting from day one.
                </p>

                <h2>SKU Generation, Cost Control, and Par Stock Logic</h2>
                <p>Each product includes:</p>
                <ul>
                  <li>Automatic SKU generation</li>
                  <li>Quantity tracking by unit</li>
                  <li>Cost entry for accurate valuation</li>
                  <li>Supplier linking</li>
                  <li>Par stock configuration</li>
                </ul>

                <p>
                  When quantities fall below par levels, the system detects it and triggers
                  low-stock awareness.
                </p>

                <h2>Expiry Date Intelligence and Real-Time Alerts</h2>
                <p>
                  Phase 3 introduces expiry intelligence so operators can assign expiration dates,
                  receive near-expiry alerts, and dismiss or restore alerts after action is taken.
                </p>

                <p>This reduces waste, improves food safety, and protects profitability.</p>

                <h2>Real-Time Product Tracker Dashboard</h2>
                <p>The Product Tracker provides:</p>
                <ul>
                  <li>Real-time stock visibility</li>
                  <li>Low-stock alerts</li>
                  <li>Accurate raw stock value calculations</li>
                  <li>Filtering using Product ID</li>
                  <li>Live updates as stock changes</li>
                </ul>

                <p>
                  This eliminates blind spots and manual checks, giving operators immediate insight
                  into inventory health.
                </p>

                <h2>CSV and PDF Export for Reporting and Compliance</h2>
                <p>
                  Track Me Solutions supports CSV export for analysis and PDF export for reporting
                  and audits — suitable for supplier reconciliation and compliance documentation.
                </p>

                <h2>Why Track Me Solutions Leads in 2026</h2>
                <p>Phase 3 brings together:</p>
                <ul>
                  <li>Supplier intelligence</li>
                  <li>Product-level accuracy</li>
                  <li>AI-powered calorie integration</li>
                  <li>Expiry and par stock alerts</li>
                  <li>Real-time dashboard control</li>
                </ul>

                <p>
                  Few platforms combine all of these capabilities in one system — that is why Track
                  Me Solutions stands out in 2026.
                </p>

                <h2>Conclusion</h2>
                <p>
                  Supplier chaos and product blind spots are no longer acceptable in modern
                  hospitality. Phase 3 delivers the structure, intelligence, and real-time control
                  required to operate efficiently in 2026 and beyond.
                </p>

                <p>
                  Built by a chef. Powered by modern SaaS technology. Designed for complete inventory
                  control.
                </p>

                <p>
                  <strong>Get started at </strong>
                  <a href="https://trackme.solutions" target="_blank" rel="noreferrer">
                    https://trackme.solutions
                  </a>
                </p>
              </>
            ) : (
              <>
                {article.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </>
            )}
          </article>

          {/* Explore Next (internal linking) */}
          <div className="post-next">
            <h3 className="post-next__title">Explore Next</h3>

            <div className="post-next__links">
              {prevSlug && (
                <Link className="btn btn--ghost btn--sm" href={`/blog/${prevSlug}`}>
                  ← Previous
                </Link>
              )}

              {nextSlug && (
                <Link className="btn btn--ghost btn--sm" href={`/blog/${nextSlug}`}>
                  Next →
                </Link>
              )}

              <Link className="btn btn--primary btn--sm" href="/stories-on-a-plate">
                Stories on a Plate →
              </Link>

              <Link className="btn btn--ghost btn--sm" href="/in-the-glass">
                In the Glass →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
