'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Bubbles from '../components/Bubbles';
import ImageCard from '../components/ImageCard';

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

    document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach((el) =>
      observer.observe(el)
    );

    // Cleanup observer on unmount
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="hero">
        <Bubbles />
        <Image src="/hero.png" alt="Cover" fill priority />
        <div className="content fade-up">
          <h1 className="title">Chef Alex Hardinan</h1>
          <p className="subtitle">Culinary Innovator. Executive Chef. Visionary Leader.</p>
          <a href="#about">
            <button className="btn">Discover More</button>
          </a>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section className="about-section" id="about">
        <div className="about-wrapper">
          <h2 className="about-heading fade-up">About Chef Alex</h2>
          <p className="about-subtitle fade-up">
            Culinary Innovator | Executive Chef | General Manager | Mixologist | Founder of
            Gastronomist International
          </p>

          <hr className="divider" />

          {/* --- As a Chef --- */}
          <div className="about-split">
            <div className="about-text fade-right">
              <h3 className="about-subhead">As a Chef</h3>
              <p>
                Chef Alex is a visionary culinary leader recognized for precision, creativity, and a
                deep respect for heritage. His philosophy centers on transforming seasonal, humble
                ingredients into refined, luxurious creations—each dish telling a story through
                technique and flavor.
              </p>
              <p>
                With a strong record in culinary management, Chef Alex successfully led three major
                brands in Tabuk, Saudi Arabia, earning regional acclaim for his distinctive approach
                to fine dining. He managed a brigade of 39 chefs, overseeing operations from concept
                to execution with excellence.
              </p>
              <p>
                Chef Alex is also experienced in launching new establishments, collaborating with
                Michelin-starred chefs and world-renowned sommeliers. His work reflects an
                international standard of luxury dining.
              </p>
              <p>
                Currently, he leads <strong>The Globe’s Heritage by Chef Alex</strong> in Pattaya,
                Thailand, elevating the city’s gastronomic reputation to rival Bangkok. Learn more
                at{' '}
                <a
                  href="https://www.theglobeasia.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  www.theglobeasia.com
                </a>
                .
              </p>
              <p>
                Featured in MSN News among the{' '}
                <strong>
                  Top 5 Food Experts Who Are Changing the Way We Eat.
                </strong>{' '}
                <a
                  href="https://www.msn.com/en-us/health/nutrition/top-5-food-experts-who-are-changing-the-way-we-eat/ar-AA1NDetW"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read the article here.
                </a>
              </p>
              <p>
                His aspiration is clear — to earn a Michelin Star as a testament to his team’s
                dedication and those who believe in his craft.
              </p>
            </div>
            <div className="about-image fade-left">
              <Image
                src="/about-chef.png"
                alt="Chef Alex Portrait"
                width={600}
                height={600}
                className="about-photo"
              />
            </div>
          </div>

          <hr className="divider" />

          {/* --- As a General Manager --- */}
          <div className="about-split reverse">
            <div className="about-image fade-right">
              <Image
                src="/about-manager.png"
                alt="Chef Alex Management"
                width={600}
                height={600}
                className="about-photo"
              />
            </div>
            <div className="about-text fade-left">
              <h3 className="about-subhead">As a General Manager</h3>
              <p>
                Beyond the kitchen, Chef Alex excels as a strategic business leader. He has managed
                multi-brand operations with over 150 employees, establishing systems that drive
                efficiency and growth.
              </p>
              <p>
                His leadership balances creativity and structure, enabling smooth coordination
                across departments—from innovation to expansion.
              </p>
              <p>
                For Chef Alex, excellence in management comes from the same discipline as cooking:{' '}
                <strong>precision, structure, and vision.</strong>
              </p>
            </div>
          </div>

          <hr className="divider" />

          {/* --- As a Mixologist --- */}
          <div className="about-split">
            <div className="about-text fade-right">
              <h3 className="about-subhead">As a Mixologist</h3>
              <p>
                Chef Alex’s passion for the culinary arts extends to mixology. His cocktails reflect
                his cuisine—infusions of technique, story, and balance. Each drink captures a
                narrative within the glass.
              </p>
            </div>
            <div className="about-image fade-left">
              <Image
                src="/about-mixology.png"
                alt="Mixology by Chef Alex"
                width={600}
                height={600}
                className="about-photo"
              />
            </div>
          </div>

          <hr className="divider" />

          {/* --- Beyond the Kitchen --- */}
          <div className="about-split reverse">
            <div className="about-image fade-right">
              <Image
                src="/about-digital.png"
                alt="Chef Alex Digital Work"
                width={600}
                height={600}
                className="about-photo"
              />
            </div>
            <div className="about-text fade-left">
              <h3 className="about-subhead">Beyond the Kitchen</h3>
              <p>
                Outside of his culinary and managerial pursuits, Chef Alex is also a website designer
                and data analyst, driven by curiosity and creativity in digital design and analytics.
              </p>
              <p>
                He is the Founder and President of <strong>Gastronomist International</strong>, a
                global organization that supports and celebrates chefs worldwide, fostering
                collaboration and passion for modern gastronomy.
              </p>
              <p>
                Visit{' '}
                <a
                  href="https://www.gastronomistinternational.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  www.gastronomistinternational.com
                </a>{' '}
                to learn more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section id="gallery">
        <div className="grid" style={{ padding: '2rem' }}>
          {['/g1.png', '/g2.png', '/g3.png', '/g4.png', '/g5.png', '/g6.png'].map((src, i) => (
            <ImageCard key={i} src={src} />
          ))}
        </div>
      </section>
    </main>
  );
}
