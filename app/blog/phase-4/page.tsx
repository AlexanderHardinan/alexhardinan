'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Phase4Post() {
  return (
    <article className="blog-article">
      <div className="article-wrapper">
        <Link href="/blog" className="back-btn">
          ← Back to Blog
        </Link>

        {/* HERO IMAGE */}
        <div className="blog-hero">
          <Image
            src="/phase-4.png"
            alt="Phase 4 – Recipe, Sales, and Waste Management System"
            fill
            priority
          />
          <div className="hero-overlay">
            <div className="hero-content">
              <h1>Phase 4: Recipe, Sales, and Waste Management System for Restaurants</h1>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <section className="post-content">
          <p>
            Phase 4 is the operational core of Track Me Solutions, delivering a fully
            integrated recipe management, sales tracking, and waste control system
            designed for restaurants, hotels, and commercial kitchens.
          </p>

          <p>
            This phase connects recipes, inventory, sales, and waste into one real-time
            workflow, eliminating spreadsheets, manual tracking, and data inconsistencies.
          </p>

          <h2>Recipe Management with Cost &amp; Yield Control</h2>
          <p>Recipes are created with full operational structure:</p>
          <ul>
            <li>Par stock quantity requirements</li>
            <li>Yield and batch quantity control</li>
            <li>Expiration date management</li>
            <li>Allergen tracking</li>
            <li>Cooking methods</li>
            <li>Flexible selling price markup</li>
          </ul>

          <p>
            Ingredients are added with real-time cost, unit cost, calorie data, and batch
            yield calculations. Each recipe is automatically generated with a SKU,
            ensuring traceability and consistency.
          </p>

          <p>
            PDF export is available for documentation, audits, and cost reporting.
          </p>

          <h2>Sales Tracking with Automatic Inventory Deduction</h2>
          <p>When a recipe is sold:</p>
          <ul>
            <li>Inventory deducts automatically</li>
            <li>Stock levels update in real time</li>
            <li>Low-stock alerts trigger based on par stock</li>
          </ul>

          <p>
            This guarantees accurate inventory control and reliable food cost tracking.
          </p>

          <h2>Waste Management with Real-Time Cost Calculation</h2>
          <p>Waste entries include:</p>
          <ul>
            <li>Category and product selection</li>
            <li>Quantity-based waste input</li>
            <li>Automatic waste cost calculation</li>
            <li>Reason tracking for analysis</li>
          </ul>

          <p>
            All waste records are editable, traceable, and exportable in PDF format for
            compliance and reporting.
          </p>

          <h2>Live Dashboard &amp; Operational Intelligence</h2>
          <p>
            All activity syncs instantly to the dashboard:
          </p>
          <ul>
            <li>Recipe trackers</li>
            <li>Sales records</li>
            <li>Waste movements</li>
            <li>Real-time raw stock value</li>
          </ul>

          <p>
            Phase 4 transforms kitchen data into actionable operational intelligence,
            enabling precise cost control and profitability optimization.
          </p>
        </section>
      </div>
    </article>
  );
}
