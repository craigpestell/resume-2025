import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable React Strict Mode in production to prevent hydration issues
  reactStrictMode: process.env.NODE_ENV === 'development',
  
  // Enable experimental features for better SEO and performance
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // Configure for modern browsers to reduce polyfills
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Webpack configuration for better code splitting
  webpack: (config, { dev, isServer }) => {
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
    }    // Optimize chunks for better loading
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          // Split react-pdf and all its exclusive dependencies into separate chunk since they're only used on demand
          reactPdf: {
            test: /[\\/]node_modules[\\/](@react-pdf|yoga-layout|crypto-js|fontkit|brotli|base64-js|clone|dfa|bidi-js|jay-peg|abs-svg-path|linebreak|unicode-properties|unicode-trie|pako|tiny-inflate|restructure)[\\/]/,
            name: 'react-pdf',
            chunks: 'async', // Only load when needed
            priority: 30,
          },
          // Split framer-motion into separate chunk 
          framerMotion: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer-motion',
            chunks: 'async', // Load separately
            priority: 20,
          },
          lucideReact: {
            test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            name: 'lucide-react',
            chunks: 'all',
            priority: 15,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      };
    }
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
        ],
      },
    ];
  },
};

export default nextConfig;
