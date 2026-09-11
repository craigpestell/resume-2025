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

  // Configure for modern browsers to reduce polyfills
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Source map configuration
  productionBrowserSourceMaps: process.env.NODE_ENV !== 'production' || process.env.ENABLE_SOURCE_MAPS === 'true',
  
  // Webpack configuration for better code splitting
  webpack: (config, { dev, isServer }) => {
    // Configure source maps
    if (!isServer) {
      if (dev) {
        // Fast rebuilds in development
        config.devtool = 'eval-source-map';
      } else {
        // Conditional source maps in production
        config.devtool = process.env.ENABLE_SOURCE_MAPS === 'true' ? 'source-map' : false;
      }
    }

    // Add bundle analyzer when requested
    if (process.env.ANALYZE === 'true' && !isServer) {
      const { BundleAnalyzerPlugin } = eval('require')('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: true,
          reportFilename: '../bundle-analyzer-report.html',
        })
      );
    }

    // Configure for modern browsers - reduce polyfills
    if (!isServer) {
      config.target = ['web', 'es2020'];
      
      // Disable Node.js polyfills that aren't needed in modern browsers
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        util: false,
        url: false,
        assert: false,
      };
    }

    // Optimize CSS loading  
    if (!dev && !isServer) {
      // Enable CSS optimization
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
      };

      // Configure CSS extraction to potentially inline small stylesheets
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();
        return entries;
      };
    }
    // Note: no manual splitChunks override here. Next.js's built-in production
    // chunking already separates the framework (react/react-dom) from app code
    // and splits large libs into their own cacheable chunks; a hand-rolled
    // single "vendors" cache group (as this used to have) merges everything
    // — including the framework runtime — into one chunk loaded on every
    // route, which is worse for caching and inflates per-page unused JS.
    // @react-pdf/renderer is only ever imported inside a server Route Handler
    // (src/app/api/resume/route.tsx, runtime: 'nodejs'), so it never reaches
    // the client bundle regardless of chunking config.
    return config;
  },
  
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

export default nextConfig;
