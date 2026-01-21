'use client';

import { useMemo } from 'react';

type Metric = { label: string; value: number; note?: string };

function clamp(n: number) {
  return Math.max(0, Math.min(100, n));
}

export default function PerformanceWidget() {
  // ===== Data (edit freely) =====
  const languages: Metric[] = [
    { label: 'Tagalog', value: 100, note: 'Native' },
    { label: 'English', value: 95, note: 'Fluent' },
    { label: 'Thai', value: 70, note: 'Intermediate' },
    { label: 'Arabic', value: 35, note: 'Beginner' },
  ];

  // Default “Expertise” set (edit labels/values anytime)
  const expertise: Metric[] = [
    { label: 'Fine Dining Execution', value: 96 },
    { label: 'Culinary Leadership', value: 94 },
    { label: 'Operations / GM', value: 92 },
    { label: 'Menu Development', value: 93 },
    { label: 'Mixology', value: 88 },
    { label: 'Full-Stack Development', value: 86 },
  ];

  const linePoints = useMemo(() => {
    // Build a smooth-ish polyline from language values
    const w = 260;
    const h = 92;
    const padX = 10;
    const padY = 10;

    const vals = languages.map((m) => clamp(m.value));
    const max = 100;

    const step = vals.length > 1 ? (w - padX * 2) / (vals.length - 1) : 0;

    const pts = vals
      .map((v, i) => {
        const x = padX + i * step;
        const y = padY + (1 - v / max) * (h - padY * 2);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');

    return { pts, w, h };
  }, [languages]);

  return (
    <section className="perf-widget glass" aria-label="Performance Dashboard">
      <header className="perf-head">
        <div>
          <div className="perf-kicker">Performance</div>
          <h3 className="perf-title">Skills Snapshot</h3>
        </div>

        <div className="perf-pill" aria-hidden="true">
          Live
        </div>
      </header>

      {/* ===== Languages (line chart + bars) ===== */}
      <div className="perf-block">
        <div className="perf-row">
          <h4 className="perf-h4">Languages</h4>
          <span className="perf-meta">Proficiency</span>
        </div>

        <div className="perf-line">
          <svg
            className="perf-svg"
            viewBox={`0 0 ${linePoints.w} ${linePoints.h}`}
            role="img"
            aria-label="Languages trend line"
          >
            <defs>
              <linearGradient id="goldStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(212,175,55,.95)" />
                <stop offset="100%" stopColor="rgba(247,226,126,.95)" />
              </linearGradient>

              <linearGradient id="fillFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(212,175,55,.20)" />
                <stop offset="100%" stopColor="rgba(212,175,55,0)" />
              </linearGradient>
            </defs>

            {/* grid */}
            <g opacity="0.18">
              {[12, 34, 56, 78].map((y) => (
                <line
                  key={y}
                  x1="8"
                  x2={linePoints.w - 8}
                  y1={y}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="1"
                />
              ))}
            </g>

            {/* area fill */}
            <polygon
              className="perf-area"
              fill="url(#fillFade)"
              points={`${linePoints.pts} ${linePoints.w - 10},${linePoints.h - 10} 10,${
                linePoints.h - 10
              }`}
            />

            {/* animated line */}
            <polyline
              className="perf-stroke"
              fill="none"
              stroke="url(#goldStroke)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={linePoints.pts}
            />

            {/* dots */}
            {languages.map((m, i) => {
              const vals = languages.map((x) => clamp(x.value));
              const step =
                vals.length > 1 ? (linePoints.w - 20) / (vals.length - 1) : 0;
              const x = 10 + i * step;
              const y = 10 + (1 - clamp(m.value) / 100) * (linePoints.h - 20);
              return (
                <circle
                  key={m.label}
                  className="perf-dot"
                  cx={x}
                  cy={y}
                  r="4.2"
                  fill="rgba(255,255,255,.95)"
                  stroke="rgba(212,175,55,.85)"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
        </div>

        <div className="perf-bars">
          {languages.map((m) => (
            <div key={m.label} className="perf-bar">
              <div className="perf-bar-top">
                <span className="perf-label">{m.label}</span>
                <span className="perf-note">{m.note}</span>
              </div>
              <div className="perf-track" aria-hidden="true">
                <div className="perf-fill" style={{ ['--p' as any]: `${clamp(m.value)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Expertise (rank bars) ===== */}
      <div className="perf-block">
        <div className="perf-row">
          <h4 className="perf-h4">Expertise</h4>
          <span className="perf-meta">Strength map</span>
        </div>

        <div className="perf-bars">
          {expertise.map((m) => (
            <div key={m.label} className="perf-bar">
              <div className="perf-bar-top">
                <span className="perf-label">{m.label}</span>
                <span className="perf-note">{clamp(m.value)}%</span>
              </div>
              <div className="perf-track" aria-hidden="true">
                <div className="perf-fill" style={{ ['--p' as any]: `${clamp(m.value)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
