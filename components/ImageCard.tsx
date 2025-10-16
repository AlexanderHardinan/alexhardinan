'use client';

import { useState } from 'react';

export default function ImageCard({ src, alt='' }: { src: string; alt?: string }) {
  const [open,setOpen]=useState(false);
  return (
    <>
      <article className="card" onClick={()=>setOpen(true)} aria-label="Open image">
        <img src={src} alt={alt} />
      </article>
      <div className={`modal ${open?'open':''}`} onClick={()=>setOpen(false)}>
        <div className="modal-content" onClick={(e)=>e.stopPropagation()}>
          <img src={src} alt={alt} />
        </div>
      </div>
    </>
  );
}
