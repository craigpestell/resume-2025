import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  // Disable React Strict Mode in production to prevent hydration issues
  reactStrictMode: process.env.NODE_ENV === 'development',

  // Enable experimental features for better SEO and performance
  experimental: {
    optimizePackageImports: ['lucide-react'],
    esmExternals: true, // Optimizes the handling of modern npm packages

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
    return [
      {
        source: '/(.*)',
        headers: [
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

// Bundle analyzer only kicks in for `ANALYZE=true next build --webpack` — it
// warns and no-ops under Turbopack, so the analyze script forces webpack.
export default withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })(nextConfig);
