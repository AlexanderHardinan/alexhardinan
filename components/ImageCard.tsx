'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function ImageCard({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'transform 0.4s ease, box-shadow 0.4s ease',
      }}
      className="image-card"
    >
      <Image
        src={src}
        alt={alt}
        width={600}
        height={400}
        quality={70}
        placeholder="blur"
        blurDataURL="/placeholder.png"
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{
          width: '100%',
          height: 'auto',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
      />
      <style jsx>{`
        .image-card:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
}
