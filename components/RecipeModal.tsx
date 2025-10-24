'use client';

import { useEffect, useMemo, useState } from 'react';

type Ingredient = { id: string; amount: number | ''; unit: string; item: string };
type Step = { id: string; text: string };
type RecipeData = {
  id: string;
  title: string;
  baseYield: number;
  targetYield: number;
  ingredients: Ingredient[];
  steps: Step[];
  cover?: string;
  createdAt: number;
  updatedAt: number;
};

export default function RecipeModal({
  ns,
  id,
  onClose,
  onEdit,
}: {
  ns: string;
  id: string;
  onClose: () => void;
  onEdit: () => void;
}) {
  const key = `${ns}:item:${id}`;
  const [data, setData] = useState<RecipeData | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(key);
    if (raw) {
      try { setData(JSON.parse(raw)); } catch {}
    }
  }, [key]);

  // close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const factor = useMemo(() => {
    if (!data?.baseYield || !data?.targetYield) return 1;
    return data.targetYield / data.baseYield;
  }, [data]);

  if (!data) return null;

  return (
    <div
      aria-modal
      role="dialog"
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,.5)', backdropFilter: 'blur(2px)',
        display: 'grid', placeItems: 'end center',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(980px, 100%)',
          maxHeight: '88vh',
          overflow: 'auto',
          background: 'var(--bg,#fff)',
          color: 'var(--fg,#0f172a)',
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          boxShadow: '0 -18px 48px rgba(0,0,0,.25)',
          transform: 'translateY(0)',
          animation: 'sheetIn .28s ease both',
        }}
      >
        {/* drag handle */}
        <div style={{display:'grid', placeItems:'center', paddingTop:10}}>
          <div style={{width:48,height:5,borderRadius:999,background:'rgba(0,0,0,.15)'}} />
        </div>

        {/* header */}
        <div style={{padding:'14px 18px 8px', display:'flex', gap:10, alignItems:'center', justifyContent:'space-between'}}>
          <div>
            <h2 style={{margin:'0 0 4px', fontSize:'clamp(18px,2.2vw,22px)'}}>{data.title || 'Recipe'}</h2>
            <div style={{opacity:.75, fontSize:13}}>
              Yield: {data.targetYield ?? data.baseYield ?? 1}
              {data.baseYield ? `  (base ${data.baseYield})` : null}
            </div>
          </div>
          <div style={{display:'flex', gap:8}}>
            <button className="btn-ghost" onClick={onClose}>Close</button>
            <button className="btn" onClick={onEdit}>Edit</button>
          </div>
        </div>

        {/* cover */}
        {data.cover ? (
          <div style={{padding:'0 18px 12px'}}>
            <div style={{position:'relative', width:'100%', paddingTop:'48%', borderRadius:14, overflow:'hidden', background:'#eee'}}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.cover}
                alt={data.title}
                style={{position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover'}}
              />
            </div>
          </div>
        ) : null}

        {/* content grid */}
        <div style={{display:'grid', gap:16, gridTemplateColumns:'1fr 1fr', padding:'0 18px 22px'}}>
          {/* ingredients */}
          <section className="card" style={{borderRadius:12, padding:14}}>
            <h3 style={{margin:'0 0 10px'}}>Ingredients</h3>
            <ul style={{margin:0, paddingLeft:18, lineHeight:1.6}}>
              {data.ingredients?.length
                ? data.ingredients.map((ing) => {
                    const amt = typeof ing.amount === 'number' ? +(ing.amount * factor).toFixed(2) : '';
                    return (
                      <li key={ing.id} style={{margin:'6px 0'}}>
                        <span style={{fontWeight:600}}>{amt}</span>{' '}
                        {ing.unit ? <>{ing.unit} </> : null}
                        {ing.item}
                      </li>
                    );
                  })
                : <li style={{opacity:.7}}>No ingredients yet.</li>}
            </ul>
          </section>

          {/* method */}
          <section className="card" style={{borderRadius:12, padding:14}}>
            <h3 style={{margin:'0 0 10px'}}>Method</h3>
            <ol style={{margin:0, paddingLeft:18, lineHeight:1.7}}>
              {data.steps?.length
                ? data.steps.filter(s => s.text?.trim()).map((s, idx) => (
                    <li key={s.id || idx} style={{margin:'8px 0'}}>{s.text}</li>
                  ))
                : <li style={{opacity:.7}}>No steps yet.</li>}
            </ol>
          </section>
        </div>
      </div>

      <style>{`
        @keyframes sheetIn {
          from { transform: translateY(18px); opacity: .98; }
          to   { transform: translateY(0);     opacity: 1; }
        }
        @media (max-width: 900px){
          div[role="dialog"] > div { border-top-left-radius: 16px; border-top-right-radius: 16px; }
          div[role="dialog"] > div > div + div + div { padding: 0 14px 10px; }
          div[role="dialog"] section.card { grid-column: span 2; }
        }
      `}</style>
    </div>
  );
}
