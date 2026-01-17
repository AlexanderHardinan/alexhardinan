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
    src: '/blog/featured.png',
    title: 'A New Era of Culinary Expression',
    excerpt:
      'Chef Alex redefines modern dining — merging artistry, sustainability, and emotion into an unforgettable global culinary experience.',
    slug: 'carrot-confidential',
  };

  const posts: BlogPost[] = [
    {
      slug: 'built-by-a-chef-restaurant-cost-control',
      src: '/platform.png',
      title: 'Built by a Chef: A Smarter Way to Control Restaurant Costs',
      excerpt:
        'Cost leakage often goes unnoticed — not because teams don’t care, but because systems don’t provide clarity. Track Me Solutions brings real kitchen logic to inventory, expiry, and decision-making.',
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

        {/* ===== FEATURED ARTICLE ===== */}
        <section className="fade-up featured-article">
          <div className="featured-image">
            <Image src={featured.src} alt={featured.title} fill priority />
          </div>
          <div className="featured-overlay">
            <div className="featured-content">
              <h2>{featured.title}</h2>
              <p className="blog-excerpt">{featured.excerpt}</p>
              <Link href={`/blog/${featured.slug}`} className="read-btn">
                Read Feature →
              </Link>
            </div>
          </div>
        </section>

        {/* ===== BLOG CAROUSEL (client island) ===== */}
        <BlogCarousel posts={posts} />
      </main>
    </RevealOnScroll>
  );
}
