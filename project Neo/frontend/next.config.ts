import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable Cache Components
  experimental: {
    cacheComponents: true,
  },
  // Configure cache life for Sanity Live Content API
  cacheLife: {
    // Use Sanity's live configuration for real-time updates
    default: {
      maxAge: 0,
      staleWhileRevalidate: 0,
    },
  },
  // Image optimization for Sanity CDN
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // Styled-components configuration
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
