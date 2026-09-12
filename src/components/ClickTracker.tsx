'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { sendGAEvent } from '@next/third-parties/google';

// Any link, button, or button-like control a visitor can click to do
// something. Delegated on document so it covers elements added anywhere,
// including ones with no bespoke tracking of their own.
const INTERACTIVE_SELECTOR = 'a[href], button, [role="button"], input[type="submit"], input[type="button"]';

function describeElement(el: Element) {
  const label =
    el.getAttribute('data-ga-label') ||
    el.getAttribute('aria-label') ||
    el.textContent?.trim().replace(/\s+/g, ' ').slice(0, 100) ||
    el.getAttribute('title') ||
    '';

  // aria-* attributes often carry the per-instance detail plain text can't
  // (e.g. aria-label disambiguating identical-looking buttons, aria-expanded
  // for toggle state), so pass all of them through as their own params.
  const ariaParams: Record<string, string> = {};
  for (const attr of el.attributes) {
    if (attr.name.startsWith('aria-')) {
      ariaParams[attr.name.replace(/-/g, '_')] = attr.value;
    }
  }

  return {
    element_type: el.tagName.toLowerCase(),
    label,
    ...(el instanceof HTMLAnchorElement ? { href: el.getAttribute('href') ?? undefined } : {}),
    ...ariaParams,
  };
}

export default function ClickTracker() {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  useEffect(() => {
    // The Edge Config dashboard is an internal admin tool, not visitor
    // activity worth tracking.
    if (isDashboard) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const el = target.closest(INTERACTIVE_SELECTOR);
      // data-ga-skip opts out elements that already send a more specific
      // event (e.g. an A/B-tested conversion) to avoid double counting.
      if (!el || el.hasAttribute('data-ga-skip')) return;

      sendGAEvent('event', 'element_click', describeElement(el));
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isDashboard]);

  return null;
}
