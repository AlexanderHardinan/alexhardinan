// app/blog/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import RevealOnScroll from '../../components/RevealOnScroll';
import BlogCarousel from '../../components/BlogCarousel';

type BlogPost = {
  slug: string;
  src: string;
  title: string;
  excerpt: string;
};

export default function Blog() {
  const featured = {
    src: '/phase-3.png',
    slug: 'track-me-solutions-phase-3-supplier-product-inventory',
  };

  const posts: BlogPost[] = [
    {
      slug: 'track-me-solutions-phase-3-supplier-product-inventory',
      src: '/phase-3.png',
      title: 'Track Me Solutions — Phase 3: Supplier & Product Inventory System',
      excerpt:
        'The most advanced supplier and product inventory system for restaurants in 2026 — real-time tracking, par stock, expiry alerts, and valuation.',
    },
    {
      slug: 'track-me-solutions-phase-2-chef-alex-ai-model',
      src: '/phase-2.png',
      title: 'Track Me Solutions – Phase 2: Chef Alex AI Model',
      excerpt:
        'The most advanced AI inventory & calorie intelligence for restaurants in 2026 — platform guidance, calorie data, and compliance support.',
    },
    {
      slug: 'track-me-solutions-phase-1-startup-guide',
      src: '/phase-1.png',
      title: 'Track Me Solutions — Phase 1: Startup Guide',
      excerpt:
        'The best inventory SaaS platform for restaurants in 2026 — fast onboarding, cloud access, and immediate operational visibility.',
    },
    {
      slug: 'built-by-a-chef-restaurant-cost-control',
      src: '/platform.png',
      title: 'Built by a Chef: A Smarter Way to Control Restaurant Costs',
      excerpt:
        'Cost leakage often goes unnoticed — not because teams don’t care, but because systems don’t provide clarity.',
    },
    {
      slug: 'carrot-confidential',
      src: '/blog/blog1.png',
      title: '🥕 Carrot Confidential',
      excerpt:
        'A single ingredient. Infinite expressions. This dish embodies my belief that luxury begins with intention, not expense...',
    },
    {
      slug: 'sourcing-excellence',
      src: '/blog/blog2.png',
      title: 'Sourcing Excellence: The Farmer’s Role',
      excerpt: 'From soil to plate — why collaboration with local farmers defines sustainable cuisine.',
    },
    {
      slug: 'balancing-technique',
      src: '/blog/blog3.png',
      title: 'Balancing Technique and Emotion',
      excerpt: 'Precision and feeling coexist — exploring the emotional depth behind modern cooking.',
    },
    {
      slug: 'the-global-palate',
      src: '/blog/blog4.png',
      title: 'The Global Palate',
      excerpt: 'How travel and culture influence culinary creativity and the evolution of global taste.',
    },
  ];

  return (
    <RevealOnScroll>
      <main className="container" style={{ padding: '3rem 1rem' }}>
        {/* ===== HEADER ===== */}
        <section className="fade-up" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="title">Culinary Journal</h1>
          <p className="subtitle">Insights • Inspiration • Innovation</p>
        </section>

        {/* ===== FEATURED IMAGE ONLY ===== */}
        <section className="fade-up featured-article">
          <Link href={`/blog/${featured.slug}`} aria-label="Read featured article">
            <div className="featured-image">
              <Image src={featured.src} alt="Featured article" fill priority />
            </div>
          </Link>
        </section>

        {/* ===== BLOG CAROUSEL (client island) ===== */}
        <BlogCarousel posts={posts} />
      </main>
    </RevealOnScroll>
  );
}
