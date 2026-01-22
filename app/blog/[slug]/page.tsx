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

const SITE = 'https://www.alexhardinan.com';
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

  'track-me-solutions-phase-3-supplier-product-inventory': {
    title: 'Track Me Solutions — Phase 3: Supplier & Product Inventory System',
    src: '/phase-3-og.jpg',
    content: [
      'The Most Advanced Supplier and Product Inventory System for Restaurants in 2026',
      'In 2026, restaurant inventory management is no longer just about counting stock. It is about supplier intelligence, product-level control, real-time alerts, and accurate stock valuation — all working together in one cloud-based SaaS platform.',
      'Phase 3 of Track Me Solutions introduces a powerful supplier and product management system designed to give restaurants, bars, and hospitality operators full control over where products come from, how they move, and when action is required.',
      'This is where inventory becomes intelligent.',
    ],
  },

  // ✅ NEW — Phase 4
  'track-me-solutions-phase-4-recipe-sales-waste-management': {
    title: 'Phase 4: Recipe, Sales, and Waste Management System for Restaurants',
    src: '/phase-4.png',
    content: [
      'Phase 4 is the operational core of Track Me Solutions, delivering a fully integrated recipe management, sales tracking, and waste control system designed for restaurants, hotels, and commercial kitchens.',
      'This phase connects recipes, inventory, sales, and waste into one real-time workflow, eliminating spreadsheets, manual tracking, and data inconsistencies.',

      'Recipe Management with Cost & Yield Control',
      'Recipes are created with full operational structure: par stock quantity requirements, yield and batch quantity, expiration dates, allergen tracking, cooking methods, and flexible selling price markup.',
      'Ingredients are added with real-time cost, unit cost, calorie data, and batch yield calculations. Each recipe is automatically generated with a SKU, ensuring traceability and consistency.',
      'PDF export is available for documentation, audits, and cost reporting.',

      'Sales Tracking with Automatic Inventory Deduction',
      'When a recipe is sold: inventory deducts automatically, stock levels update in real time, and low-stock alerts trigger based on par stock.',
      'This guarantees accurate restaurant inventory control and reliable food cost tracking.',

      'Waste Management with Real-Time Cost Calculation',
      'Waste entries include: category and product selection, quantity-based waste input, automatic waste cost calculation, and reason tracking for analysis.',
      'All waste records are editable, traceable, and exportable in PDF format for compliance, justification, and reporting.',

      'Live Dashboard & Operational Intelligence',
      'All activity syncs instantly to the dashboard: recipe trackers, sales records, waste movements, and real-time raw stock value.',
      'Phase 4 transforms kitchen data into actionable operational intelligence, enabling precise cost control and profitability optimization.',

      'SEO FAQ (Ranking Booster)',
      'What is a recipe management system? A recipe management system tracks ingredients, cost, yield, calories, and pricing while integrating directly with inventory and sales data.',
      'How does inventory deduction work? Inventory deducts automatically when a recipe is sold or waste is recorded, keeping stock levels accurate in real time.',
      'Can I track food waste cost? Yes. The system calculates waste cost automatically based on quantity and unit cost.',
      'Does the system support PDF reports? Yes. Recipes, sales, and waste records can be exported in PDF format for documentation and audits.',
      'Is this suitable for restaurants and hotels? Yes. Phase 4 is designed for restaurants, hotels, and commercial kitchens of all sizes.',

      'Primary SEO Keywords',
      'recipe management system; restaurant inventory management; food cost control software; restaurant waste management system; kitchen stock tracking; recipe costing software; real-time inventory tracking; restaurant dashboard analytics',

      'Secondary / Long-Tail Keywords',
      'recipe and inventory management software; restaurant sales and waste tracking; food waste cost calculation system; kitchen inventory deduction automation; recipe SKU management; restaurant par stock tracking; live food inventory dashboard; commercial kitchen management system',
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

  const description =
    article.content?.[1] ||
    article.content?.[0] ||
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
    article.content?.[1] ||
    article.content?.[0] ||
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
  const isPhase4Post = slug === 'track-me-solutions-phase-4-recipe-sales-waste-management';

  return (
    <main className="container" style={{ padding: 0 }}>
      {/* JSON-LD: BlogPosting */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingLd) }} />

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
                  In hospitality, cost leakage often goes unnoticed — not because teams don’t care, but because
                  systems fail to provide clarity where it matters most.
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
                  Track Me Solutions was built by a chef who understands how kitchens and bars actually operate.
                  Instead of forcing teams to adapt to software, the platform adapts to the kitchen.
                </p>

                <p>The platform delivers:</p>
                <ul>
                  <li>Automated alerts for low and overstock situations</li>
                  <li>Expiry notifications 3 days before deadlines, with a dismiss function once resolved</li>
                  <li>
                    An integrated AI Chef Alex, explaining the platform and providing calorie data for products
                  </li>
                  <li>Simple, intuitive workflows that require minimal training</li>
                  <li>A modern dashboard designed for decision-making, not guesswork</li>
                </ul>

                <h2>Cost That Makes Sense</h2>
                <p>
                  At $1.30 per day, Track Me Solutions costs less than the daily waste and leakage most businesses
                  already accept.
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
                {/* existing Phase 1 content kept */}
                <h2>Track Me Solutions — Phase 1: Startup Guide</h2>
                <p>
                  <strong>The Best Inventory SaaS Platform for Restaurants in 2026</strong>
                </p>
                <p>
                  In 2026, restaurant and bar operations demand more than spreadsheets, manual stock counts, or
                  disconnected tools. The industry now requires real-time inventory management, cloud-based access,
                  and chef-driven software that delivers immediate control without complexity.
                </p>
                <p>
                  Track Me Solutions stands out as one of the best inventory SaaS platforms for hospitality in 2026 —
                  designed specifically for restaurants, bars, and culinary operations that need accuracy, speed, and
                  visibility from day one.
                </p>
                <h2>Getting Started Is Intentionally Simple</h2>
                <p>
                  As a cloud-based inventory SaaS platform, there is no software to install, no hardware dependency,
                  and no technical setup required. As long as you have an internet connection, you can access the
                  system from any device — desktop, tablet, or mobile.
                </p>
                <p>
                  During onboarding, users create an account, register their business, and receive a unique Business
                  ID with email verification for security and accountability. Once verified, logging in automatically
                  unlocks the full operational dashboard, inventory controls, and system features.
                </p>
                <p>
                  This fast onboarding process is designed for modern hospitality businesses that cannot afford
                  downtime, complexity, or long implementation cycles.
                </p>
                <p>The result is:</p>
                <ul>
                  <li>Immediate access to a professional inventory management system</li>
                  <li>Zero learning friction for teams</li>
                  <li>Full operational visibility from day one</li>
                </ul>
                <p>
                  In a market crowded with generic tools, Track Me Solutions sets the benchmark for inventory SaaS
                  platforms in 2026 — built by a chef, powered by modern technology, and designed for real-world
                  hospitality operations.
                </p>
              </>
            ) : isPhase2Post ? (
              <>
                {/* existing Phase 2 content kept */}
                <h2>Track Me Solutions – Phase 2: Chef Alex AI Model</h2>
                <p>
                  <strong>The Most Advanced AI Inventory &amp; Calorie Intelligence for Restaurants in 2026</strong>
                </p>
                <p>
                  In 2026, restaurant and hospitality operations are no longer driven by intuition alone. Rising food
                  costs, stricter regulations, and growing consumer demand for transparency require intelligent,
                  AI-powered restaurant management software that understands how kitchens actually work.
                </p>
                <p>This is where Track Me Solutions separates itself from traditional inventory systems.</p>
                <p>
                  Phase 2 introduces Chef Alex AI, a chef-built artificial intelligence model designed specifically
                  for restaurant inventory management, recipe development, calorie calculation, and operational
                  guidance.
                </p>
                <p>Unlike generic AI tools, Chef Alex is purpose-built for hospitality professionals.</p>
                {/* rest unchanged in your baseline */}
              </>
            ) : isPhase3Post ? (
              <>
                {/* existing Phase 3 content kept */}
                <h2>The Most Advanced Supplier and Product Inventory System for Restaurants in 2026</h2>
                <p>
                  In 2026, restaurant inventory management is no longer just about counting stock. It is about
                  supplier intelligence, product-level control, real-time alerts, and accurate stock valuation — all
                  working together in one cloud-based SaaS platform.
                </p>
                <p>
                  Phase 3 of Track Me Solutions introduces a powerful supplier and product management system designed
                  to give restaurants, bars, and hospitality operators full control over where products come from, how
                  they move, and when action is required.
                </p>
                <p>This is where inventory becomes intelligent.</p>
                {/* rest unchanged in your baseline */}
              </>
            ) : isPhase4Post ? (
              <>
                {/* ✅ Phase 4 rendered cleanly as structured article */}
                <h2>Phase 4: Recipe, Sales, and Waste Management System for Restaurants</h2>

                <p>
                  Phase 4 is the operational core of Track Me Solutions, delivering a fully integrated recipe
                  management, sales tracking, and waste control system designed for restaurants, hotels, and
                  commercial kitchens.
                </p>

                <p>
                  This phase connects recipes, inventory, sales, and waste into one real-time workflow, eliminating
                  spreadsheets, manual tracking, and data inconsistencies.
                </p>

                <h2>Recipe Management with Cost &amp; Yield Control</h2>
                <p>Recipes are created with full operational structure:</p>
                <ul>
                  <li>Par stock quantity requirements</li>
                  <li>Yield and batch quantity</li>
                  <li>Expiration dates</li>
                  <li>Allergen tracking</li>
                  <li>Cooking methods</li>
                  <li>Flexible selling price markup</li>
                </ul>

                <p>
                  Ingredients are added with real-time cost, unit cost, calorie data, and batch yield calculations.
                  Each recipe is automatically generated with a SKU, ensuring traceability and consistency.
                </p>

                <p>PDF export is available for documentation, audits, and cost reporting.</p>

                <h2>Sales Tracking with Automatic Inventory Deduction</h2>
                <p>When a recipe is sold:</p>
                <ul>
                  <li>Inventory deducts automatically</li>
                  <li>Stock levels update in real time</li>
                  <li>Low-stock alerts trigger based on par stock</li>
                </ul>

                <p>This guarantees accurate restaurant inventory control and reliable food cost tracking.</p>

                <h2>Waste Management with Real-Time Cost Calculation</h2>
                <p>Waste entries include:</p>
                <ul>
                  <li>Category and product selection</li>
                  <li>Quantity-based waste input</li>
                  <li>Automatic waste cost calculation</li>
                  <li>Reason tracking for analysis</li>
                </ul>

                <p>
                  All waste records are editable, traceable, and exportable in PDF format for compliance,
                  justification, and reporting.
                </p>

                <h2>Live Dashboard &amp; Operational Intelligence</h2>
                <p>All activity syncs instantly to the dashboard:</p>
                <ul>
                  <li>Recipe trackers</li>
                  <li>Sales records</li>
                  <li>Waste movements</li>
                  <li>Real-time raw stock value</li>
                </ul>

                <p>
                  Phase 4 transforms kitchen data into actionable operational intelligence, enabling precise cost
                  control and profitability optimization.
                </p>

                <h2>SEO FAQ</h2>
                <h3>What is a recipe management system?</h3>
                <p>
                  A recipe management system tracks ingredients, cost, yield, calories, and pricing while integrating
                  directly with inventory and sales data.
                </p>

                <h3>How does inventory deduction work?</h3>
                <p>
                  Inventory deducts automatically when a recipe is sold or waste is recorded, keeping stock levels
                  accurate in real time.
                </p>

                <h3>Can I track food waste cost?</h3>
                <p>Yes. The system calculates waste cost automatically based on quantity and unit cost.</p>

                <h3>Does the system support PDF reports?</h3>
                <p>Yes. Recipes, sales, and waste records can be exported in PDF format for documentation and audits.</p>

                <h3>Is this suitable for restaurants and hotels?</h3>
                <p>Yes. Phase 4 is designed for restaurants, hotels, and commercial kitchens of all sizes.</p>

                <h2>Primary SEO Keywords</h2>
                <p>
                  recipe management system • restaurant inventory management • food cost control software • restaurant
                  waste management system • kitchen stock tracking • recipe costing software • real-time inventory
                  tracking • restaurant dashboard analytics
                </p>

                <h2>Secondary / Long-Tail Keywords</h2>
                <p>
                  recipe and inventory management software • restaurant sales and waste tracking • food waste cost
                  calculation system • kitchen inventory deduction automation • recipe SKU management • restaurant par
                  stock tracking • live food inventory dashboard • commercial kitchen management system
                </p>

                {/* optional: your “Facebook SEO Post” placeholder can be added later */}
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
