import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable React Strict Mode in production to prevent hydration issues
  reactStrictMode: process.env.NODE_ENV === 'development',

  // Enable experimental features for better SEO and performance
  experimental: {
    optimizePackageImports: ['lucide-react'],

    // Inline CSS into <style> tags in the HTML (App Router native; replaces
    // critters/optimizeCss, which is a no-op with the App Router). Removes the
    // render-blocking stylesheet request from the critical path.
    inlineCss: true,
  },

  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Source map configuration (bundler-agnostic, works under both Turbopack and webpack)
  productionBrowserSourceMaps: process.env.NODE_ENV !== 'production' || process.env.ENABLE_SOURCE_MAPS === 'true',

  // Compress images for better performance
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Enable compression
  compress: true,

  // Generate static pages where possible
  output: 'standalone',

  // SEO-friendly trailing slashes
  trailingSlash: false,

  // Security headers
  async headers() {
    // No external scripts, styles, images, or fonts — everything the site
    // loads is same-origin (self-hosted fonts via next/font, local images,
    // same-origin Vercel Analytics/Speed Insights script paths). 'unsafe-inline'
    // covers the two same-origin inline tags Next.js itself renders: the
    // <script> in layout.tsx and the <style> from experimental.inlineCss.
    // A nonce-based policy would be stricter but requires dynamic rendering
    // on every page (no static generation), which isn't a trade worth making
    // here — see https://nextjs.org/docs/app/guides/content-security-policy.
    //
    // Deliberately no `require-trusted-types-for 'script'`: verified locally
    // that React/Next's own runtime assigns innerHTML with a raw string
    // somewhere internally (no official Trusted Types support), which throws
    // and breaks hydration under real enforcement. The only way around that
    // is a passthrough 'default' policy that accepts any string unchanged —
    // satisfies a Lighthouse checkbox without adding real DOM-XSS protection,
    // so it's skipped rather than shipped as security theater.
    // React uses eval() in development for debugging features (e.g.
    // reconstructing server-side error stacks in the browser); it never
    // does in production, so this is dev-only.
    const isDev = process.env.NODE_ENV === 'development';
    const cspHeader = `
      default-src 'self';
      script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''};
      style-src 'self' 'unsafe-inline';
      img-src 'self' data:;
      font-src 'self';
      connect-src 'self';
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      upgrade-insecure-requests;
    `.replace(/\s{2,}/g, ' ').trim();

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },

};

export default nextConfig;
