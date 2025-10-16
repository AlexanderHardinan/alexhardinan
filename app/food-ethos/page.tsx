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
          using locally sourced, minimally processed ingredients that respect both the planet and the
          people behind them. This approach supports local economies, protects ecosystems, and ensures
          every plate embodies freshness, nutrition, and integrity.
        </p>
        <p>
          Mindful eating is central to my philosophy — knowing where food comes from, how it is
          cultivated, and the effect of our choices on the world around us. I prioritize seasonal and
          organic produce, reduce waste through intentional planning, and embrace creativity in
          reusing ingredients. Every decision in my kitchen is guided by respect — for nature, for
          producers, and for future generations.
        </p>

        <hr className="divider" />

        <h2>Core Principles</h2>

        <div className="ethos-grid">
          <div className="ethos-card fade-up">
            <h3>Quality and Freshness</h3>
            <p>
              Commitment to fresh, seasonal, and locally sourced ingredients ensures both superior taste
              and support for regional farmers and producers.
            </p>
          </div>

          <div className="ethos-card fade-up">
            <h3>Sustainability</h3>
            <p>
              Integrating environmental care, economic balance, and social equity into every aspect of
              food sourcing and service — aiming for a food system that benefits both people and the planet.
            </p>
          </div>

          <div className="ethos-card fade-up">
            <h3>Nutrition and Health</h3>
            <p>
              Designing menus that prioritize balanced, nutrient-dense meals and mindful eating, while
              avoiding excessive processing or artificial additives.
            </p>
          </div>

          <div className="ethos-card fade-up">
            <h3>Ethical Consideration</h3>
            <p>
              Choosing suppliers and partners who practice fair trade, uphold animal welfare, and ensure
              fair wages and working conditions for food industry workers.
            </p>
          </div>

          <div className="ethos-card fade-up">
            <h3>Waste Reduction</h3>
            <p>
              Minimizing waste through responsible meal planning, composting, and creative reuse of
              ingredients — turning efficiency into an act of sustainability.
            </p>
          </div>

          <div className="ethos-card fade-up">
            <h3>Global Awareness</h3>
            <p>
              Recognizing the global impact of food systems, supporting fair trade, food sovereignty, and
              sustainable practices that promote global equity and environmental stewardship.
            </p>
          </div>
        </div>

        <hr className="divider" />

        <h2>My Message</h2>
        <p>
          As a chef, my responsibility extends far beyond the kitchen. Every ingredient, every supplier,
          and every dish represents a decision that impacts our health, our communities, and our
          environment.
        </p>
        <p>
          Sustainability lies at the core of my culinary practice — from sourcing local ingredients and
          reducing waste to adopting eco-friendly operations that lower our footprint.
        </p>
        <p>
          Ethical integrity defines my supply chain. I partner only with producers who share values of
          transparency, fairness, and humane practices, ensuring that what we serve honors the people and
          processes behind it.
        </p>
        <p>
          Cultural respect shapes my creativity. I balance tradition with innovation, drawing inspiration
          from global cuisines while preserving the authenticity of their roots.
        </p>
        <p>
          Health and wellness remain foundational. Every dish aims to nourish — not only through flavor but
          through thoughtful composition and nutrition.
        </p>
        <p>
          Community engagement completes the circle. Through education, collaboration, and advocacy, I work
          to empower others to adopt sustainable and ethical culinary habits that strengthen local and global
          food networks.
        </p>

        <hr className="divider" />

        <p className="fade-up" style={{ fontWeight: 600, textAlign: 'center', fontSize: '1.15rem' }}>
          In essence, my food ethos is a commitment to craft cuisine that nourishes the body, respects the
          earth, and uplifts the people who make it possible — one mindful dish at a time.
        </p>
      </section>
    </main>
  );
}
