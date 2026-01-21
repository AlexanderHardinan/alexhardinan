'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Bubbles from '../components/Bubbles';
import ImageCard from '../components/ImageCard';
import PerformanceWidget from '@/components/PerformanceWidget';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Page() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('show');
        });
      },
      { threshold: 0.1 }
    );

    document
      .querySelectorAll('.fade-up, .fade-left, .fade-right')
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="dash">
      <section className="dash-shell">
        <div className="dash-grid">
          {/* =========================
              LEFT: MAIN CANVAS
             ========================= */}
          <div className="dash-main">
            {/* ===== HERO PANEL (dashboard/editorial) ===== */}
            <section className="panel panel-hero fade-up" aria-label="Hero Panel">
              <div className="panel-hero__bg" aria-hidden="true">
                <Bubbles />
                <Image src="/hero.png" alt="" fill priority />
                <div className="panel-hero__shade" />
              </div>

              <div className="panel-hero__content">
                <div className="panel-hero__text">
                  <p className="panel-kicker">Executive Chef • Operations Leader • Full-Stack Developer</p>
                  <h1 className="panel-title">Alexander Hardinan</h1>
                  <p className="panel-subtitle">
                    Fine Dining & Luxury Hospitality • Founder of Gastronomist International •
                    Independent Full-Stack Developer
                  </p>

                  <div className="panel-actions">
                    <a className="btn btn--primary" href="#about">
                      About
                    </a>
                    <a className="btn btn--ghost" href="#gallery">
                      Gallery
                    </a>
                    <a className="btn btn--ghost" href="/blog">
                      Culinary Journal →
                    </a>
                  </div>
                </div>

                <div className="panel-hero__portrait">
                  <div className="portrait-frame">
                    <Image
                      src="/about-chef.png"
                      alt="Chef Alex Portrait"
                      width={520}
                      height={520}
                      className="portrait-img"
                      priority
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* ===== ABOUT (as editorial panel) ===== */}
            <section className="panel fade-up" id="about" aria-label="About Panel">
              <div className="panel-head">
                <h2 className="panel-h2">About Chef Alex</h2>
                <p className="panel-lead">
                  Executive Chef | Operations Leader | Fine Dining & Luxury Hospitality | Founder of
                  Gastronomist International | Independent Full-Stack Developer
                </p>
              </div>

              <div className="panel-body">
                <div className="panel-split">
                  <div className="panel-copy fade-right">
                    <h3 className="panel-h3">As a Chef</h3>
                    <p>
                      Chef Alex is a visionary culinary leader recognized for precision, creativity, and a deep
                      respect for heritage. His philosophy centers on transforming seasonal, humble ingredients
                      into refined, luxurious creations—each dish telling a story through technique and flavor.
                    </p>
                    <p>
                      With a strong record in culinary management, Chef Alex successfully led three major brands
                      in Tabuk, Saudi Arabia, earning regional acclaim for his distinctive approach to fine dining.
                      He managed a brigade of 39 chefs, overseeing operations from concept to execution with excellence.
                    </p>
                    <p>
                      Chef Alex is also experienced in launching new establishments, collaborating with Michelin-starred
                      chefs and world-renowned sommeliers. His work reflects an international standard of luxury dining.
                    </p>
                    <p>
                      Currently, he leads <strong>The Globe’s Heritage by Chef Alex</strong> in Pattaya, Thailand,
                      elevating the city’s gastronomic reputation to rival Bangkok. Learn more at{' '}
                      <a href="https://www.theglobeasia.com" target="_blank" rel="noreferrer">
                        www.theglobeasia.com
                      </a>
                      .
                    </p>
                    <p>
                      Featured in MSN News among the{' '}
                      <strong>Top 5 Food Experts Who Are Changing the Way We Eat.</strong>{' '}
                      <a
                        href="https://www.msn.com/en-us/health/nutrition/top-5-food-experts-who-are-changing-the-way-we-eat/ar-AA1NDetW"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Read the article here.
                      </a>
                    </p>
                    <p>
                      His aspiration is clear — to earn a Michelin Star as a testament to his team’s dedication and
                      those who believe in his craft.
                    </p>
                  </div>

                  <div className="panel-media fade-left">
                    <Image
                      src="/about-manager.png"
                      alt="Chef Alex Management"
                      width={720}
                      height={720}
                      className="panel-image"
                    />

                    <div className="panel-gap" aria-hidden="true" />

                    <PerformanceWidget />
                  </div>
                </div>
              </div>
            </section>

            {/* ===== CINEMATIC MP4 (as a panel) ===== */}
            <section className="panel fade-up" aria-label="Cinematic Feature Panel">
              <div className="panel-head">
                <h2 className="panel-h2">Cinematic Feature</h2>
                <p className="panel-lead">A short visual moodboard of craft, discipline, and precision.</p>
              </div>

              <div className="panel-body">
                <div className="cinema-frame glass">
                  <video
                    className="cinema-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster="/cinema-poster.png"
                  >
                    <source src="/cinema.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  <div className="cinema-overlay" aria-hidden="true" />
                  <div className="cinema-vignette" aria-hidden="true" />
                </div>
              </div>
            </section>

            {/* ===== ROLE PANELS (dashboard style) ===== */}
            <section className="panel fade-up" aria-label="Roles Panel">
              <div className="panel-head">
                <h2 className="panel-h2">Roles & Focus</h2>
                <p className="panel-lead">Operational leadership, creative execution, and modern digital craft.</p>
              </div>

              <div className="panel-body">
                <div className="role-grid">
                  <article className="role-card fade-right">
                    <h3 className="panel-h3">As a General Manager</h3>
                    <p>
                      Beyond the kitchen, Chef Alex excels as a strategic business leader. He has managed multi-brand
                      operations with over 150 employees, establishing systems that drive efficiency and growth.
                    </p>
                    <p>
                      His leadership balances creativity and structure, enabling smooth coordination across departments—
                      from innovation to expansion.
                    </p>
                    <p>
                      For Chef Alex, excellence in management comes from the same discipline as cooking:{' '}
                      <strong>precision, structure, and vision.</strong>
                    </p>
                  </article>

                  <article className="role-card fade-left">
                    <h3 className="panel-h3">As a Mixologist</h3>
                    <p>
                      Chef Alex’s passion for the culinary arts extends to mixology. His cocktails reflect his cuisine—
                      infusions of technique, story, and balance. Each drink captures a narrative within the glass.
                    </p>
                    <Image
                      src="/about-mixology.png"
                      alt="Mixology by Chef Alex"
                      width={900}
                      height={600}
                      className="role-image"
                    />
                  </article>

                  <article className="role-card fade-right">
                    <h3 className="panel-h3">Beyond the Kitchen</h3>
                    <p>
                      Outside of his culinary and managerial pursuits, Chef Alex is also a website designer and data
                      analyst, driven by curiosity and creativity in digital design and analytics.
                    </p>
                    <p>
                      He is the Founder and President of <strong>Gastronomist International</strong>, a global
                      organization that supports and celebrates chefs worldwide, fostering collaboration and passion
                      for modern gastronomy.
                    </p>
                    <p>
                      Visit{' '}
                      <a href="https://www.gastronomistinternational.com" target="_blank" rel="noreferrer">
                        www.gastronomistinternational.com
                      </a>{' '}
                      to learn more.
                    </p>
                  </article>

                  <article className="role-card fade-left">
                    <h3 className="panel-h3">Portrait</h3>
                    <Image
                      src="/about-digital.png"
                      alt="Chef Alex Digital Work"
                      width={900}
                      height={900}
                      className="role-image"
                    />
                  </article>
                </div>
              </div>
            </section>

            {/* ===== GALLERY (panel) ===== */}
            <section className="panel fade-up" id="gallery" aria-label="Gallery Panel">
              <div className="panel-head">
                <h2 className="panel-h2">Gallery</h2>
                <p className="panel-lead">A curated visual selection across cuisine, craft, and detail.</p>
              </div>

              <div className="panel-body">
                <Swiper
                  modules={[Autoplay, Pagination]}
                  spaceBetween={20}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 2500, disableOnInteraction: false }}
                  breakpoints={{
                    320: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 6 },
                  }}
                  style={{ paddingBottom: '2rem' }}
                >
                  {['/g1.png', '/g2.png', '/g3.png', '/g4.png', '/g5.png', '/g6.png'].map((src, i) => (
                    <SwiperSlide key={i}>
                      <ImageCard src={src} alt={`Gallery image ${i + 1}`} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </section>
          </div>

          {/* =========================
              RIGHT: RAIL WIDGETS
             ========================= */}
          <aside className="dash-rail" aria-label="Right Rail">
            {/* Services widget */}
            <section className="panel panel-widget fade-up" aria-label="Services Widget">
              <div className="panel-head">
                <h2 className="panel-h2">What I Can Do</h2>
                <p className="panel-lead">Chef-driven execution + modern systems thinking.</p>
              </div>

              <div className="panel-body">
                <ul className="widget-list">
                  <li className="widget-item">
                    <span className="widget-title">Culinary Leadership</span>
                    <span className="widget-meta">Operations • Training • Standards</span>
                  </li>
                  <li className="widget-item">
                    <span className="widget-title">Concept & Menu Development</span>
                    <span className="widget-meta">Modern gastronomy • Luxury dining</span>
                  </li>
                  <li className="widget-item">
                    <span className="widget-title">Hospitality Systems</span>
                    <span className="widget-meta">Process • Control • Performance</span>
                  </li>
                  <li className="widget-item">
                    <span className="widget-title">Digital Design & Analytics</span>
                    <span className="widget-meta">UI • Data • Full-stack builds</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Mini portfolio preview */}
            <section className="panel panel-widget fade-up" aria-label="Portfolio Preview Widget">
              <div className="panel-head">
                <h2 className="panel-h2">Quick Preview</h2>
                <p className="panel-lead">A compact snapshot from the gallery.</p>
              </div>

              <div className="panel-body">
                <div className="rail-gallery">
                  {['/g1.png', '/g2.png', '/g3.png', '/g4.png'].map((src, i) => (
                    <div key={i} className="rail-thumb">
                      <Image src={src} alt={`Preview ${i + 1}`} fill />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Testimonial widget */}
            <section className="panel panel-widget fade-up" aria-label="Testimonial Widget">
              <div className="panel-head">
                <h2 className="panel-h2">Testimonial</h2>
                <p className="panel-lead">A short signal of trust and consistency.</p>
              </div>

              <div className="panel-body">
                <blockquote className="quote">
                  “Precision, calm leadership, and a modern standard of execution. Every service runs like a system —
                  without losing soul.”
                </blockquote>
                <div className="quote-by">— Hospitality Partner</div>
              </div>
            </section>

            {/* CTA widget */}
            <section className="panel panel-widget fade-up" aria-label="CTA Widget">
              <div className="panel-head">
                <h2 className="panel-h2">Connect</h2>
                <p className="panel-lead">Select the destination.</p>
              </div>

              <div className="panel-body">
                <div className="rail-ctas">
                  <a className="btn btn--primary" href="/blog">
                    Culinary Journal →
                  </a>
                  <a className="btn btn--ghost" href="https://www.theglobeasia.com" target="_blank" rel="noreferrer">
                    The Globe Asia →
                  </a>
                  <a
                    className="btn btn--ghost"
                    href="https://www.gastronomistinternational.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Gastronomist International →
                  </a>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
