'use client';

import { useEffect } from 'react';

export default function BuyMeCoffeeWidget() {
  useEffect(() => {
    const STYLE_ID = 'bmc-widget-force-style';

    // Ensure visibility + spacing (do NOT affect ContactWidget)
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement('style');
      style.id = STYLE_ID;
      style.textContent = `
        /* Buy Me a Coffee widget hardening */
        #bmc-wbtn,
        .bmc-btn-container {
          z-index: 2147483647 !important;
          right: 18px !important;
          bottom: 110px !important; /* lift above ContactWidget */
        }
      `;
      document.head.appendChild(style);
    }

    const SCRIPT_SELECTOR = 'script[data-name="BMC-Widget"]';

    const hasWidgetDom = () =>
      Boolean(
        document.getElementById('bmc-wbtn') ||
        document.querySelector('.bmc-btn-container')
      );

    const injectScript = () => {
      const existing = document.querySelector(SCRIPT_SELECTOR);
      if (existing) existing.remove();

      const s = document.createElement('script');
      s.setAttribute('data-name', 'BMC-Widget');
      s.setAttribute('data-cfasync', 'false');
      s.src = 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js';

      s.setAttribute('data-id', 'chefalex');
      s.setAttribute('data-description', 'Support me on Buy me a coffee!');
      s.setAttribute('data-message', '');

      /* REQUIRED CHANGE: yellow brand color */
      s.setAttribute('data-color', '#FFD400');

      s.setAttribute('data-position', 'Right');
      s.setAttribute('data-x_margin', '18');
      s.setAttribute('data-y_margin', '110'); // keeps it above contact widget

      s.async = true;

      s.onload = () => {
        try {
          const evt = document.createEvent('Event');
          evt.initEvent('DOMContentLoaded', true, true);
          window.dispatchEvent(evt);
        } catch {}
      };

      document.body.appendChild(s);
    };

    if (!hasWidgetDom()) injectScript();

    return () => {
      // intentionally persistent
    };
  }, []);

  return null;
}
