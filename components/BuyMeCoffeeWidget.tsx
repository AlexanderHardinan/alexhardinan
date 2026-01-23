'use client';

import { useEffect } from 'react';

export default function BuyMeCoffeeWidget() {
  useEffect(() => {
    // prevent duplicates on route changes / fast refresh
    const existing = document.querySelector('script[data-name="BMC-Widget"]');
    if (existing) return;

    const s = document.createElement('script');
    s.setAttribute('data-name', 'BMC-Widget');
    s.setAttribute('data-cfasync', 'false');
    s.src = 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js';

    s.setAttribute('data-id', 'chefalex');
    s.setAttribute('data-description', 'Support me on Buy me a coffee!');
    s.setAttribute('data-message', '');
    s.setAttribute('data-color', '#5F7FFF');
    s.setAttribute('data-position', 'Right');
    s.setAttribute('data-x_margin', '18');
    s.setAttribute('data-y_margin', '18');

    s.async = true;
    document.body.appendChild(s);

    return () => {
      // optional cleanup (comment out if you prefer it to persist)
      // s.remove();
    };
  }, []);

  return null;
}
