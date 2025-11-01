'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db, storage } from '@/lib/firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

export default function FixCovers() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [log, setLog] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const storageNS = 'myrecipebook'; // your Firestore collection

  // === password check ===
  const checkPassword = () => {
    if (password.trim() === 'CAlex') {
      setAuthorized(true);
      setLog(['🔐 Access granted. Running one-time fix...']);
    } else {
      alert('❌ Incorrect password');
    }
  };

  useEffect(() => {
    if (!authorized) return;

    (async () => {
      try {
        const snap = await getDocs(collection(db, storageNS));
        let fixedCount = 0;
        setLog((l) => [...l, `🚀 Found ${snap.size} recipes`]);

        for (const d of snap.docs) {
          const data = d.data();
          const id = d.id;

          if (!data.cover) {
            setLog((l) => [...l, `⏭️ ${id}: no cover`]);
            continue;
          }
          if (data.cover.startsWith('http')) {
            setLog((l) => [...l, `✅ ${id}: already correct`]);
            continue;
          }

          try {
            if (data.cover.startsWith('data:image/')) {
              const storageRef = ref(storage, `${storageNS}/${id}/cover-fixed-${Date.now()}.jpg`);
              await uploadString(storageRef, data.cover, 'data_url');
              const url = await getDownloadURL(storageRef);
              await updateDoc(doc(db, storageNS, id), { cover: url });
              setLog((l) => [...l, `🧩 ${id}: fixed`]);
              fixedCount++;
            } else {
              setLog((l) => [...l, `❓ ${id}: skipped (unknown format)`]);
            }
          } catch (err) {
            console.error(err);
            setLog((l) => [...l, `❌ ${id}: failed`]);
          }
        }

        setLog((l) => [...l, `✅ Done. Fixed ${fixedCount} recipe(s).`]);
        setDone(true);
      } catch (err) {
        console.error('Critical error:', err);
        setLog((l) => [...l, '❌ Critical error – check console']);
      }
    })();
  }, [authorized]);

  return (
    <main
      style={{
        padding: 40,
        fontFamily: 'monospace',
        background: '#000',
        color: '#0f0',
        minHeight: '100vh',
      }}
    >
      {!authorized ? (
        <div style={{ textAlign: 'center', marginTop: 100 }}>
          <h1>🧰 Secure Cover-Fix Tool</h1>
          <p>Enter admin password to run this one-time repair.</p>
          <input
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: 8,
              border: '1px solid #555',
              fontSize: '1rem',
              marginRight: 10,
            }}
          />
          <button
            onClick={checkPassword}
            style={{
              background: 'linear-gradient(90deg,#c59d5f,#d4af37)',
              border: 'none',
              color: '#fff',
              padding: '10px 18px',
              borderRadius: 999,
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Unlock
          </button>
        </div>
      ) : (
        <>
          <h1>🧰 One-Time Fix: Recipe Covers</h1>
          <p>This uploads any inline or blob cover images to Firebase Storage and updates Firestore.</p>
          <div
            style={{
              marginTop: 20,
              background: '#111',
              color: '#0f0',
              padding: 20,
              borderRadius: 8,
              maxHeight: '70vh',
              overflowY: 'auto',
            }}
          >
            {log.map((l, i) => (
              <div key={i}>{l}</div>
            ))}
          </div>
          {done && (
            <p style={{ marginTop: 20, color: '#ff0' }}>
              ✅ All done. Please now delete this file:
              <br />
              <strong>/app/tools/fix-covers/page.tsx</strong>
            </p>
          )}
        </>
      )}
    </main>
  );
}
