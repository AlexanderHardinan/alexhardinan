'use client';

import { useEffect } from 'react';

export default function BuyMeCoffeeWidget() {
  useEffect(() => {
    // 1) Ensure widget is not hidden behind stacking contexts
    const STYLE_ID = 'bmc-widget-force-z';
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement('style');
      style.id = STYLE_ID;
      style.textContent = `
        /* Buy Me a Coffee widget visibility hardening */
        .bmc-btn-container,
        #bmc-wbtn {
          z-index: 2147483647 !important;
          position: fixed !important;
        }
      `;
      document.head.appendChild(style);
    }

    const SCRIPT_SELECTOR = 'script[data-name="BMC-Widget"]';

    const hasWidgetDom = () => {
      // Common DOM IDs/classes used by BMC widget
      return Boolean(document.getElementById('bmc-wbtn') || document.querySelector('.bmc-btn-container'));
    };

    const injectScript = () => {
      // Remove any previous failed script (rare, but avoids "exists but broken")
      const existing = document.querySelector(SCRIPT_SELECTOR) as HTMLScriptElement | null;
      if (existing) existing.remove();

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

      s.onload = () => {
        // 2) Some widgets initialize on DOMContentLoaded
        try {
          const evt = document.createEvent('Event');
          evt.initEvent('DOMContentLoaded', true, true);
          window.dispatchEvent(evt);
        } catch {
          // ignore
        }

        // 3) Retry once if the widget DOM still didn’t appear
        window.setTimeout(() => {
          if (!hasWidgetDom()) {
            // Re-inject script once more
            injectScriptOnce();
          }
        }, 1200);
      };

      document.body.appendChild(s);
    };

    let didRetry = false;
    const injectScriptOnce = () => {
      if (didRetry) return;
      didRetry = true;
      injectScript();
    };

    // If already rendered, do nothing
    if (hasWidgetDom()) return;

    // If script exists but widget missing, re-inject
    const existing = document.querySelector(SCRIPT_SELECTOR);
    if (existing && !hasWidgetDom()) {
      injectScript();
      return;
    }

    // Normal first load
    injectScript();

    return () => {
      // no cleanup: keep widget across navigations
    };
  }, []);

  return null;
}
