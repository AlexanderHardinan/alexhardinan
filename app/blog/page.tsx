'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type BlogPost = {
  slug: string;
  src: string;
  title: string;
  excerpt: string;
};

export default function Blog() {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('show')),
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-up').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const featured = {
    src: '/blog/featured.png',
    title: 'A New Era of Culinary Expression',
    excerpt:
      'Chef Alex redefines modern dining — merging artistry, sustainability, and emotion into an unforgettable global culinary experience.',
    slug: 'carrot-confidential',
  };

  const posts: BlogPost[] = [
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

  const scrollBy = (offset: number) =>
    carouselRef.current?.scrollBy({ left: offset, behavior: 'smooth' });

  return (
    <main className="container" style={{ padding: '3rem 1rem' }}>
      <section className="fade-up" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="title">Culinary Journal</h1>
        <p className="subtitle">Insights • Inspiration • Innovation</p>
      </section>

      <section className="fade-up featured-article">
        <div className="featured-image">
          <Image src={featured.src} alt={featured.title} fill priority />
        </div>
        <div className="featured-overlay">
          <div className="featured-content">
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <Link href={`/blog/${featured.slug}`} className="read-btn">
              Read Feature →
            </Link>
          </div>
        </div>
      </section>

      <section className="fade-up blog-carousel-section">
        <button className="carousel-btn left" onClick={() => scrollBy(-400)} aria-label="Left">
          ‹
        </button>

        <div className="blog-carousel" ref={carouselRef}>
          {posts.map((post) => (
            <article key={post.slug} className="blog-card">
              <div className="blog-img">
                <Image src={post.src} alt={post.title} width={500} height={300} />
              </div>
              <div className="blog-text">
                <h2>{post.title}</h2>
                <p className="blog-excerpt">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="read-btn">
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <button className="carousel-btn right" onClick={() => scrollBy(400)} aria-label="Right">
          ›
        </button>
      </section>
    </main>
  );
}
