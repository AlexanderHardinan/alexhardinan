'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type BlogPost = {
  slug: string;
  src: string;
  title: string;
  excerpt: string;
};

export default function BlogCarousel({ posts }: { posts: BlogPost[] }) {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (offset: number) => {
    carouselRef.current?.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section className="fade-up blog-carousel-section">
      <button className="carousel-btn left" onClick={() => scrollBy(-400)} aria-label="Left">
        ‹
      </button>

      <div className="blog-carousel" ref={carouselRef}>
        {posts.map((post) => (
          <article key={post.slug} className="blog-card fade-up">
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
  );
}
