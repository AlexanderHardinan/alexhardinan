'use client';

import { useEffect, useRef } from 'react';

export default function RevealOnScroll({
  children,
  selector = '.fade-up, .fade-left, .fade-right',
  threshold = 0.1,
}: {
  children: React.ReactNode;
  selector?: string;
  threshold?: number;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const els = Array.from(root.querySelectorAll(selector));
    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('show')),
      { threshold }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [selector, threshold]);

  return <div ref={rootRef}>{children}</div>;
}
