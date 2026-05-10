'use client';

import dynamic from 'next/dynamic';

const FooterControls = dynamic(() => import('./FooterControls'), {
  ssr: false,
});

export default function LazyFooterControls() {
  return <FooterControls />;
}
