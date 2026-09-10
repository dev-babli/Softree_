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

const leadMagnetOrigin = "https://web-lead-magnet-seven.vercel.app";

const isAmplify = Boolean(process.env.AWS_APP_ID || process.env.AWS_BRANCH);

const nextConfig: any = {
  // Standalone is for the Docker/ECS image only. Amplify's Next adapter
  // expects a normal `.next` output (baseDirectory: .next).
  ...(process.env.BUILD_STANDALONE === "true" ? { output: "standalone" } : {}),
  productionBrowserSourceMaps: false,
  // Next 16 emits large server maps by default; Amplify's compute bundle
  // cap is 220 MB uncompressed and this app already overshoots with maps.
  serverSourceMaps: false,
  experimental: {
    serverSourceMaps: false,
  },
  outputFileTracingExcludes: {
    "*": [
      "node_modules/@swc/**",
      "node_modules/@esbuild/**",
      "node_modules/esbuild/**",
      "node_modules/webpack/**",
      "node_modules/puppeteer/**",
      "node_modules/@ffmpeg-installer/**",
      "node_modules/fluent-ffmpeg/**",
      "node_modules/@sentry/cli/**",
      "node_modules/@sentry/cli-*/**",
      "node_modules/typescript/**",
      "node_modules/eslint/**",
      "node_modules/vitest/**",
      "node_modules/@testing-library/**",
      "node_modules/@resvg/**",
      "node_modules/pixelmatch/**",
    ],
  },
  async rewrites() {
    return [
      { source: "/geo", destination: `${leadMagnetOrigin}/geo` },
      { source: "/geo/:path*", destination: `${leadMagnetOrigin}/geo/:path*` },
      { source: "/softree_icon.png", destination: `${leadMagnetOrigin}/softree_icon.png` },
      { source: "/favicon.svg", destination: `${leadMagnetOrigin}/favicon.svg` },
      { source: "/logo.png", destination: `${leadMagnetOrigin}/logo.png` },
      { source: "/logo.svg", destination: `${leadMagnetOrigin}/logo.svg` },
      { source: "/assets/:path*", destination: `${leadMagnetOrigin}/assets/:path*` },
      { source: "/api/process", destination: `${leadMagnetOrigin}/api/process` },
      { source: "/api/process/:path*", destination: `${leadMagnetOrigin}/api/process/:path*` },
      {
        source: "/services/aidevelopemnt/service",
        destination: "/services/ai-development-service",
      },
      {
        source: "/industries/logistics-supply-chain-engineering",
        destination: "/industries/offshore-logistics-supply-chain-engineering",
      },
    ];
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
        source: "/book-meeting",
        destination: "/contact",
        permanent: false,
      },
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
        source: "/kore-ai-component",
        destination: "/agentic-ai-platform",
        permanent: true,
      },
      {
        source: "/kore-ai-component/:path*",
        destination: "/agentic-ai-platform/:path*",
        permanent: true,
      },
      {
        source: "/client",
        destination: "/demo-vigorous",
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
        destination: "/services/generative-ai",
        permanent: true,
      },
      {
        source: "/services/offshore-generative-ai-development",
        destination: "/services/generative-ai",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
    unoptimized: process.env.DISABLE_IMAGE_OPTIMIZATION === "true",
    formats: ["image/webp", "image/avif"],
    // Next 16 only allows qualities listed here (default is [75]).
    qualities: [75, 90, 92, 95, 100],
  },
  typescript: {
    // Skip type checking during production builds to avoid OOM / spawn UNKNOWN errors
    ignoreBuildErrors: true,
  },
  webpack: (config: any, { isServer }: any) => {
    if (process.env.NODE_ENV === "production") {
      config.devtool = false;
    }

    config.module.rules.push({
      test: /\.(glb|gltf)$/i,
      type: 'asset/resource',
    })

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        encoding: false,
      };
    }

    return config
  },
};

const analyzedConfig = withBundleAnalyzer(nextConfig);

// Skip Sentry webpack plugin wrapping in local `next dev` — large compile cost.
export default process.env.NODE_ENV === "production"
  ? withSentryConfig(analyzedConfig, {
      // For all available options, see:
      // https://www.npmjs.com/package/@sentry/webpack-plugin#options

      org: "softree-technology",

      project: "javascript-nextjs",

      // Only print logs for uploading source maps in CI
      silent: !process.env.CI,

      // For all available options, see:
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

      // Upload a larger set of source maps for prettier stack traces (increases build time)
      widenClientFileUpload: !isAmplify,
      sourcemaps: {
        disable: isAmplify,
      },

      // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
      // This can increase your server load as well as your hosting bill.
      // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
      // side errors will fail.
      tunnelRoute: "/monitoring",

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
    })
  : analyzedConfig;
