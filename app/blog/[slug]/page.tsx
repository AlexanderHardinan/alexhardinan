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

  return (
    <main className="container" style={{ padding: 0 }}>
      {/* JSON-LD: BlogPosting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingLd) }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: article.title }]}
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
                  <li>
                    Expiry notifications 3 days before deadlines, with a dismiss function once
                    resolved
                  </li>
                  <li>
                    An integrated AI Chef Alex, explaining the platform and providing calorie data
                    for products
                  </li>
                  <li>Simple, intuitive workflows that require minimal training</li>
                  <li>A modern dashboard designed for decision-making, not guesswork</li>
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

                <p>
                  This fast onboarding process is designed for modern hospitality businesses that
                  cannot afford downtime, complexity, or long implementation cycles.
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
                    The Most Advanced AI Inventory &amp; Calorie Intelligence for Restaurants in 2026
                  </strong>
                </p>

                <p>
                  In 2026, restaurant and hospitality operations are no longer driven by intuition
                  alone. Rising food costs, stricter regulations, and growing consumer demand for
                  transparency require intelligent, AI-powered restaurant management software that
                  understands how kitchens actually work.
                </p>

                <p>
                  This is where Track Me Solutions separates itself from traditional inventory
                  systems.
                </p>

                <p>
                  Phase 2 introduces Chef Alex AI, a chef-built artificial intelligence model
                  designed specifically for restaurant inventory management, recipe development,
                  calorie calculation, and operational guidance.
                </p>

                <p>Unlike generic AI tools, Chef Alex is purpose-built for hospitality professionals.</p>

                <h2>What Is Chef Alex AI?</h2>
                <p>
                  Chef Alex AI is an integrated artificial intelligence model inside Track Me
                  Solutions, created by a professional chef who is also a full-stack developer. It
                  is designed to assist chefs, restaurant owners, culinary directors, and
                  hospitality operators with real operational tasks, not abstract automation.
                </p>

                <p>Chef Alex AI helps users:</p>
                <ul>
                  <li>Understand platform structure and functionality</li>
                  <li>Navigate inventory workflows with clarity</li>
                  <li>Access calorie and nutritional data instantly</li>
                  <li>Reduce manual calculations and operational friction</li>
                </ul>

                <p>
                  This makes Track Me Solutions one of the most advanced AI-powered inventory SaaS
                  platforms for restaurants in 2026.
                </p>

                <h2>AI That Explains the Platform — Not Just Automates</h2>
                <p>
                  Most restaurant software fails at adoption because it is complex, technical, or
                  poorly explained.
                </p>

                <p>
                  Chef Alex AI solves this problem by acting as an intelligent guide inside the
                  system.
                </p>

                <p>Instead of relying on manuals, onboarding calls, or support tickets, users can understand:</p>
                <ul>
                  <li>How inventory modules work</li>
                  <li>How products, recipes, and stock connect</li>
                  <li>How data flows across the dashboard</li>
                </ul>

                <p>
                  This dramatically reduces training time and increases system adoption — a critical
                  factor for multi-outlet restaurants and fast-growing hospitality groups.
                </p>

                <h2>Calories Pad: Built-In Nutritional Intelligence</h2>
                <p>
                  One of the most powerful features of Phase 2 is the Calories Pad, powered entirely
                  by Chef Alex AI.
                </p>

                <p>With the Calories Pad:</p>
                <ul>
                  <li>Chefs can type any ingredient or product</li>
                  <li>Instantly receive calorie information</li>
                  <li>Use accurate nutritional data during recipe creation</li>
                </ul>

                <p>This removes the need for:</p>
                <ul>
                  <li>External calorie calculators</li>
                  <li>Manual nutrition spreadsheets</li>
                  <li>Third-party compliance tools</li>
                </ul>

                <p>
                  For chefs working in GCC countries, where menu calorie disclosure is mandatory,
                  this feature is essential for compliance and operational speed.
                </p>

                <h2>Why Calorie Compliance Matters in 2026</h2>
                <p>
                  Governments and regulatory bodies across the GCC and global markets continue to
                  enforce stricter nutritional transparency laws.
                </p>

                <p>Restaurants must now:</p>
                <ul>
                  <li>Display accurate calorie counts</li>
                  <li>Ensure consistency across menus</li>
                  <li>Avoid legal and reputational risk</li>
                </ul>

                <p>
                  Track Me Solutions provides built-in calorie intelligence, making it one of the
                  best restaurant compliance SaaS platforms in 2026.
                </p>

                <h2>Chef-Built AI for Real Kitchens</h2>
                <p>
                  Chef Alex AI was not created as a marketing feature. It was built to support real
                  kitchen workflows, real recipe development, and real cost and compliance
                  challenges.
                </p>

                <p>
                  This is AI that supports chefs — not replaces them. By reducing repetitive tasks
                  and improving data accuracy, Chef Alex allows culinary professionals to focus on
                  creativity, consistency, and execution.
                </p>

                <h2>Why Track Me Solutions Leads in 2026</h2>
                <p>Track Me Solutions combines:</p>
                <ul>
                  <li>AI-powered inventory management</li>
                  <li>Chef-driven system design</li>
                  <li>Built-in calorie and compliance tools</li>
                  <li>Cloud-based SaaS accessibility</li>
                  <li>Real-time operational visibility</li>
                </ul>

                <p>
                  This positions Track Me Solutions as one of the best inventory and AI restaurant
                  SaaS platforms in 2026.
                </p>

                <h2>From Phase 2 to Full Operational Control</h2>
                <p>
                  Phase 2 is a critical step in building a fully intelligent hospitality operation.
                  By integrating AI guidance and calorie intelligence early, restaurants gain
                  faster onboarding, better data accuracy, stronger compliance foundations, and
                  smarter decision-making.
                </p>

                <p>Chef Alex AI is not the future — it is the present.</p>

                <h2>Conclusion</h2>
                <p>
                  In an industry where margins are tight and expectations are high, restaurants need
                  systems that think like chefs and operate like technology.
                </p>

                <p>
                  Phase 2 of Track Me Solutions delivers exactly that: AI built by a chef, calorie
                  intelligence built into workflows, and a platform designed for control in 2026 and
                  beyond.
                </p>

                <p>
                  <strong>Learn more and get started at </strong>
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
