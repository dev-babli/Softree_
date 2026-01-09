import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
  remotePatterns: [
    { protocol: 'https', hostname: '**' }, // allow all https external images (catch-all)
    { protocol: 'http', hostname: '**' },  // allow all http external images
    { protocol: 'https', hostname: 'www.hyperlinkinfosystem.com' }, // specific domain
    { protocol: 'https', hostname: 'slelguoygbfzlpylpxfs.supabase.co' }, // Supabase
  ],
  unoptimized: process.env.VERCEL ? false : true,
  formats: ['image/webp', 'image/avif'],
},

};

export default nextConfig;
