'use client';
import Image from 'next/image';

export default function PastryBakery() {
  const recipes = [
    {
      title: 'Honey Caviar',
      image: '/recipes/honey-caviar.png',
      description:
        'A modernist French-inspired caviar made from honey using molecular gastronomy techniques with agar and xanthan gum.',
    },
    // Add more recipes here later
  ];

  return (
    <main className="container" style={{ paddingTop: '112px', paddingBottom: '48px' }}>
      <h1 className="title" style={{ textAlign: 'center', marginBottom: '1rem' }}>
        Pastry & Bakery
      </h1>
      <p className="subtitle" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Where artistry meets precision — signature desserts and pastry innovations.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          padding: '0 1rem',
        }}
      >
        {recipes.map((r, i) => (
          <div
            key={i}
            style={{
              background: 'rgba(255,255,255,0.85)',
              borderRadius: 16,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              transition: 'transform 0.3s ease',
            }}
          >
            <Image src={r.image} alt={r.title} width={600} height={400} style={{ width: '100%', objectFit: 'cover' }} />
            <div style={{ padding: '1rem' }}>
              <h3 style={{ marginBottom: 8 }}>{r.title}</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{r.description}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
