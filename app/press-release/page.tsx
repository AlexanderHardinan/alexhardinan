'use client';
import { useEffect } from 'react';

export default function PressRelease() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('show');
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="container" style={{ padding: '3rem 1rem' }}>
      <section className="fade-up" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 className="title">Press Release</h1>
        <p className="subtitle">
          Chef Alex: A Global Culinary Visionary Recognized Across Prestigious Platforms
        </p>
      </section>

      <section className="fade-up press-content">
        <p>
          Chef Alex continues to gain international acclaim for his innovative approach to modern
          gastronomy and leadership in the culinary world. His dedication to elevating humble
          ingredients into refined creations has earned him recognition from leading global media
          and organizations.
        </p>

        <hr className="divider" />

        <h2>Featured in MSN News</h2>
        <p>
          Chef Alex was named among the{' '}
          <strong>Top 5 Food Experts Changing the Way We Eat</strong> by MSN News, highlighting his
          impact on global dining trends and culinary innovation.
        </p>
        <p>
          Read the full article here:{' '}
          <a
            href="https://www.msn.com/en-us/health/nutrition/top-5-food-experts-who-are-changing-the-way-we-eat/ar-AA1NDetW?ocid=BingNewsSerp"
            target="_blank"
            rel="noreferrer"
          >
            MSN News
          </a>
        </p>

        <hr className="divider" />

        <h2>Recognized by The Culinary World Gazette</h2>
        <p>
          Chef Alex was featured as a <strong>Top Chef among Michelin-starred chefs</strong> in{' '}
          <em>The Culinary World Gazette</em>, celebrating his creative approach and his role in
          shaping contemporary gastronomy.
        </p>
        <p>
          See the article here:{' '}
          <a href="https://tcwgazette.com/top-chefs" target="_blank" rel="noreferrer">
            The Culinary World Gazette
          </a>
        </p>

        <hr className="divider" />

        <h2>Club Vivanova Gourmet Event</h2>
        <p>
          Chef Alex hosted an exclusive <strong>Gourmet Fusion Dinner & Wine Masterclass</strong> in
          partnership with Club Vivanova Pattaya, held at <strong>The Globe’s Heritage by Chef Alex</strong>.
          The event showcased his signature fusion of international flavors with refined wine pairings.
        </p>
        <p>
          Read more:{' '}
          <a
            href="https://www.clubvivanova.com/events/24aug2025"
            target="_blank"
            rel="noreferrer"
          >
            Club Vivanova Event
          </a>
        </p>

        <hr className="divider" />

        <h2>Featured on NDTVi Thailand</h2>
        <p>
          Chef Alex was featured on NDTVi Thailand’s YouTube channel, offering insights into his
          culinary philosophy and innovative dining experiences.
        </p>
        <p>
          Watch the feature:{' '}
          <a
            href="https://youtu.be/ZLaFL3aDfFQ?si=I9j3bb6wMVL3LrEN"
            target="_blank"
            rel="noreferrer"
          >
            YouTube – NDTVi Thailand
          </a>
        </p>
      </section>
    </main>
  );
}
