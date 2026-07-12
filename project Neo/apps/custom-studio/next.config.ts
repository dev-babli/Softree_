import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    dynamicIO: true,
    cacheLife: {
      default: {
        stale: 60,
        revalidate: 60 * 60,
        expire: 60 * 60 * 24,
      },
    },
  },
};

export default nextConfig;
