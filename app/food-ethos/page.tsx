'use client';

import { useEffect } from 'react';

export default function FoodEthos() {
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
        <h1 className="title">Food Ethos</h1>
        <p className="subtitle">By Chef Alex</p>
      </section>

      <section className="fade-up ethos-content">
        <h2>My Philosophy</h2>
        <p>
          Food is more than nourishment — it is a connection to culture, environment, and community.
          My food ethos is built on sustainability, health, and ethical responsibility. I believe in
          using locally sourced, minimally processed ingredients that respect both the planet and
          the people behind them.
        </p>

        <hr className="divider" />

        <h2>Core Principles</h2>

        <div className="ethos-grid">
          <div className="ethos-card">
            <h3>Quality and Freshness</h3>
            <p className="ethos-excerpt">
              Commitment to fresh, seasonal, and locally sourced ingredients ensures both superior
              taste and support for regional farmers and producers.
            </p>
          </div>

          <div className="ethos-card">
            <h3>Sustainability</h3>
            <p className="ethos-excerpt">
              Integrating environmental care, economic balance, and social equity into every aspect
              of food sourcing and service — aiming for a food system that benefits both people and
              the planet.
            </p>
          </div>

          <div className="ethos-card">
            <h3>Nutrition and Health</h3>
            <p className="ethos-excerpt">
              Designing menus that prioritize balanced, nutrient-dense meals and mindful eating,
              while avoiding excessive processing or artificial additives.
            </p>
          </div>

          <div className="ethos-card">
            <h3>Ethical Consideration</h3>
            <p className="ethos-excerpt">
              Choosing suppliers and partners who practice fair trade, uphold animal welfare, and
              ensure fair wages and working conditions for food industry workers.
            </p>
          </div>

          <div className="ethos-card">
            <h3>Waste Reduction</h3>
            <p className="ethos-excerpt">
              Minimizing waste through responsible meal planning, composting, and creative reuse of
              ingredients — turning efficiency into an act of sustainability.
            </p>
          </div>

          <div className="ethos-card">
            <h3>Global Awareness</h3>
            <p className="ethos-excerpt">
              Recognizing the global impact of food systems, supporting fair trade, food sovereignty,
              and sustainable practices that promote global equity and environmental stewardship.
            </p>
          </div>
        </div>

        <hr className="divider" />

        <p
          className="fade-up"
          style={{ fontWeight: 600, textAlign: 'center', fontSize: '1.15rem' }}
        >
          In essence, my food ethos is a commitment to craft cuisine that nourishes the body,
          respects the earth, and uplifts the people who make it possible — one mindful dish at a
          time.
        </p>
      </section>
    </main>
  );
}
