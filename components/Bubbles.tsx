'use client';

export default function Bubbles() {
  const bubbles = Array.from({ length: 18 });
  return (
    <div className="bubbles">
      {bubbles.map((_, i) => (
        <div
          key={i}
          className="bubble"
          style={{
            '--size': `${8 + Math.random() * 22}px`,
            '--time': `${10 + Math.random() * 10}s`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
