import { Inter } from 'next/font/google';

// The only font the site uses. It used to be swappable via a font picker;
// that picker had no remaining UI, so this is now applied statically in
// layout.tsx instead.
export const defaultFont = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

// Note: the .font-jetbrains class (header/footer bookend tags) intentionally
// has no loaded webfont. It resolves to the system monospace stack via its
// CSS fallback — a ~40 KB woff2 on the render path was not worth two 20px
// logo elements. See src/app/globals.css.
