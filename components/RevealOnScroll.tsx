'use client';

import { useEffect, useRef } from 'react';

export default function RevealOnScroll({
  children,
  selector = '.fade-up, .fade-left, .fade-right, .panel-in, .panel-left, .panel-right',
  threshold = 0.12,
  repeat = true,
}: {
  children: React.ReactNode;
  selector?: string;
  threshold?: number;
  repeat?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const els = Array.from(root.querySelectorAll(selector));
    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const el = e.target as HTMLElement;

          if (e.isIntersecting) {
            el.classList.add('show');
          } else if (repeat) {
            el.classList.remove('show');
          }
        });
      },
      { threshold }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [selector, threshold, repeat]);

  return <div ref={rootRef}>{children}</div>;
}
