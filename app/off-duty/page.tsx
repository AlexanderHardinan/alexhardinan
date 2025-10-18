'use client';
import { useEffect } from 'react';
import ImageCard from '../../components/ImageCard';

type Feature = {
  src: string;
  title: string;
  caption: string;
};

export default function OffDuty() {
  // ===== Scroll animation =====
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

  // ===== Editable content section =====
  const features: Feature[] = [
    {
      src: '/offduty/photo1.png',
      title: 'The Eye Behind the Lens',
      caption:
        'Exploring the world through photography — capturing light, emotion, and fleeting stories one frame at a time.',
    },
    {
      src: '/offduty/photo2.png',
      title: 'The Global Traveler',
      caption:
        'Journeys across cities and cultures inspire not only my cuisine but my worldview — discovery beyond the kitchen.',
    },
    {
      src: '/offduty/photo3.png',
      title: 'The Sporting Spirit',
      caption:
        'Precision and discipline are not confined to the kitchen. Running, diving, and adventure sports fuel my balance and clarity.',
    },
    {
      src: '/offduty/photo4.png',
      title: 'Style & Expression',
      caption:
        'Fashion and form share rhythm with flavor. Off duty, I find creativity through design, tailoring, and timeless aesthetics.',
    },
  ];

  return (
    <main className="container" style={{ padding: '2.5rem 1rem' }}>
      {/* PAGE HEADER */}
      <section className="page-header fade-up">
        <h1>
          <span style={{ color: '#CBA135' }}>Chef Alex Hardinan</span>
          <br />
          Off Duty
        </h1>
        <p>The world beyond the kitchen — where passion meets lifestyle.</p>
      </section>

      {/* GRID SECTION */}
      <section className="offduty-grid fade-up">
        {features.map((item, i) => (
          <div
            key={i}
            className={`offduty-card fade-up ${i % 2 === 1 ? 'reverse' : ''}`}
          >
            <div className="offduty-image">
              <ImageCard src={item.src} alt={item.title} />
            </div>
            <div className="offduty-text">
              <h2>{item.title}</h2>
              <p>{item.caption}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
