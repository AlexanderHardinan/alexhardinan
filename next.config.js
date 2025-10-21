/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true, // enables gzip + brotli
  images: {
    formats: ['image/avif', 'image/webp'], // automatically optimizes PNGs
    minimumCacheTTL: 3600, // cache for 1 hour
    deviceSizes: [360, 768, 1024, 1440, 1920],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

module.exports = nextConfig;
