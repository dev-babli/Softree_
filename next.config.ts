import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const siteOrigin = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_SOFTREE_SITE_URL ||
  "https://www.softreetechnology.com"
).replace(/\/$/, "");

const nextConfig: any = {
  async rewrites() {
    return [];
  },
  async redirects() {
    const studioBase =
      process.env.NEXT_PUBLIC_SANITY_STUDIO_URL?.replace(/\/$/, "") ||
      `${siteOrigin}/studio`;

    const redirects: Array<{
      source: string;
      destination: string;
      permanent: boolean;
    }> = [];

    // Production: send /studio to external Studio host when it is not this site.
    if (
      process.env.NODE_ENV === "production" &&
      studioBase &&
      !studioBase.startsWith(siteOrigin)
    ) {
      redirects.push(
        { source: "/studio", destination: studioBase, permanent: false },
        {
          source: "/studio/:path*",
          destination: `${studioBase}/:path*`,
          permanent: false,
        },
      );
    }

    return [
      {
        source: '/studio',
        destination: '/studio/structure/dashboard',
        permanent: false,
      },
      ...redirects,
      {
        source: "/customers/:slug",
        destination: "/case-studies/:slug",
        permanent: true,
      },
      {
        source: "/case-studies/power-apps",
        destination: "/case-studies/power-platform",
        permanent: true,
      },
      {
        source: "/case-studies/power-apps/:path*",
        destination: "/case-studies/power-platform/:path*",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/services/ai-intelligence",
        destination: "/ai",
        permanent: true,
      },
      {
        source: "/services/ai-intelligence/agentic-ai",
        destination: "/services/offshore-ai-development",
        permanent: true,
      },
      {
        source: "/services/ai-intelligence/generative-ai",
        destination: "/services/offshore-generative-ai-development",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
    unoptimized: process.env.VERCEL ? false : true,
    formats: ["image/webp", "image/avif"],
  },
  typescript: {
    // Skip type checking during production builds to avoid OOM / spawn UNKNOWN errors
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/i,
      type: 'asset/resource',
    })
    return config
  },
};

export default withSentryConfig(withBundleAnalyzer(nextConfig), {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "softree-technology",

  project: "javascript-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // Avoid local-dev tunnel proxy noise/timeouts to Sentry ingest.
  tunnelRoute: process.env.NODE_ENV === "production" ? "/monitoring" : undefined,

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
});
