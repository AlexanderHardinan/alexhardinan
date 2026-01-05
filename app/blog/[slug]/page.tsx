import Image from 'next/image';
import Link from 'next/link';

type Article = {
  title: string;
  src: string;
  content: string[];
};

export default function SinglePost({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const articles: Record<string, Article> = {
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

  return (
    <main className="container" style={{ padding: 0 }}>
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
            {article.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </article>
        </div>
      </section>
    </main>
  );
}
