'use client';

import { useEffect } from 'react';

export default function BuyMeCoffeeWidget() {
  useEffect(() => {
    const STYLE_ID = 'bmc-widget-force-style';

    // Ensure visibility + spacing + animation (do NOT affect ContactWidget)
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement('style');
      style.id = STYLE_ID;
      style.textContent = `
        /* Buy Me a Coffee widget hardening + animation */
        #bmc-wbtn,
        .bmc-btn-container {
          z-index: 2147483647 !important;
          right: 18px !important;
          bottom: 110px !important; /* stays above ContactWidget */
        }

        /* Pop-in once + shake burst every ~12s */
        #bmc-wbtn,
        .bmc-btn-container {
          transform-origin: 80% 80%;
          animation:
            bmcPop 420ms ease-out 1,
            bmcShakeCycle 12s ease-in-out infinite;
          will-change: transform;
        }

        /* Optional: subtle hover feedback (non-invasive) */
        #bmc-wbtn:hover,
        .bmc-btn-container:hover {
          transform: scale(1.03) !important;
        }

        @keyframes bmcPop {
          0%   { transform: scale(0.92); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        /*
          12s cycle:
          - 0%–10%: calm
          - ~10%–15%: micro-shake burst
          - rest: calm
        */
        @keyframes bmcShakeCycle {
          0%, 10% { transform: translateX(0) translateY(0) rotate(0deg); }
          10.8% { transform: translateX(-2px) rotate(-1.4deg); }
          11.6% { transform: translateX(2px) rotate(1.4deg); }
          12.4% { transform: translateX(-2px) rotate(-1.2deg); }
          13.2% { transform: translateX(2px) rotate(1.2deg); }
          14.0% { transform: translateX(-1px) rotate(-0.8deg); }
          15.0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          #bmc-wbtn,
          .bmc-btn-container {
            animation: none !important;
            transition: none !important;
          }
        }
      `;
      document.head.appendChild(style);
    }

    const SCRIPT_SELECTOR = 'script[data-name="BMC-Widget"]';

    const hasWidgetDom = () =>
      Boolean(document.getElementById('bmc-wbtn') || document.querySelector('.bmc-btn-container'));

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

      // Locked: yellow
      s.setAttribute('data-color', '#FFD400');

      // Locked: right + lifted above contact widget
      s.setAttribute('data-position', 'Right');
      s.setAttribute('data-x_margin', '18');
      s.setAttribute('data-y_margin', '110');

      s.async = true;

      s.onload = () => {
        // Some widget builds init on DOMContentLoaded
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
