import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";
import path from "path";

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
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Standalone is for the Docker/ECS image only. Amplify's Next adapter
  // expects a normal `.next` output (baseDirectory: .next).
  ...(process.env.BUILD_STANDALONE === "true" ? { output: "standalone" } : {}),
  productionBrowserSourceMaps: false,
  experimental: {
    cpus: 2,
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
      {
        source: "/api/process/:path*", destination: `${leadMagnetOrigin}/api/process/:path*`
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
        source: "/wp-content/uploads/:path*",
        destination: "/case-studies",
        permanent: true,
      },
      {
        source: "/wp-content/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/services/ai-development-service",
        destination: "/services/ai-development-services",
        permanent: true,
      },
      {
        source: "/services/aidevelopment/service",
        destination: "/services/ai-development-services",
        permanent: true,
      },
      {
        source: "/services/aidevelopemnt/service",
        destination: "/services/ai-development-services",
        permanent: true,
      },
      {
        source: "/ai-development-services",
        destination: "/services/ai-development-services",
        permanent: true,
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
        source: "/about",
        destination: "/about-us",
        permanent: true,
      },
      {
        source: "/portfolio",
        destination: "/case-studies",
        permanent: true,
      },
      {
        source: "/portfolio/:path*",
        destination: "/case-studies",
        permanent: true,
      },
      {
        source: "/case-study",
        destination: "/case-studies",
        permanent: true,
      },
      {
        source: "/case-study/:slug",
        destination: "/case-studies/:slug",
        permanent: true,
      },
      {
        source: "/service",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/solution",
        destination: "/solutions",
        permanent: true,
      },
      {
        source: "/blogs",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blogs/:path*",
        destination: "/blog",
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
        source: "/ai",
        destination: "/services/enterprise-ai-solution",
        permanent: true,
      },
      {
        source: "/services/ai-intelligence",
        destination: "/services/enterprise-ai-solution",
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
        source: "/services/offshore-data-analytics",
        destination: "/services/power-bi-development-services",
        permanent: true,
      },
      {
        source: "/services/microsoft-fabric-engineering-services",
        destination: "/services/microsoft-fabric-development-services",
        permanent: true,
      },
      {
        source: "/services/data-analytics/microsoft-fabric",
        destination: "/services/microsoft-fabric-development-services",
        permanent: true,
      },
      {
        source: "/services/digital-workspace/web-app-development",
        destination: "/services/offshore-web-app-development",
        permanent: true,
      },
      {
        source: "/services/digital-workspace/mobile-app-development",
        destination: "/services/offshore-mobile-app-development",
        permanent: true,
      },
      {
        source: "/services/digital-workspace/sharepoint",
        destination: "/services/offshore-sharepoint-development",
        permanent: true,
      },
      {
        source: "/services/digital-workspace/spfx-developments",
        destination: "/services/offshore-spfx-development",
        permanent: true,
      },
      {
        source: "/services/business-applications/power-apps",
        destination: "/services/offshore-power-platform-development",
        permanent: true,
      },
      {
        source: "/services/business-applications/power-platform",
        destination: "/services/offshore-power-platform-development",
        permanent: true,
      },
      {
        source: "/services/business-applications/mvp",
        destination: "/services/mvp",
        permanent: true,
      },
      {
        source: "/services/business-applications/softree-for-startups",
        destination: "/services/mvp",
        permanent: true,
      },
      {
        source: "/services/data-analytics/power-bi",
        destination: "/services/power-bi-development-services",
        permanent: true,
      },
      {
        source: "/services/security-testing",
        destination: "/services/security-testing-services",
        permanent: true,
      },
      {
        source: "/industries",
        destination: "/industries/healthcare-ai-solutions",
        permanent: true,
      },
      {
        source: "/ai-agent-platform",
        destination: "/agentic-ai-platform",
        permanent: true,
      },
      {
        source: "/request-a-demo",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/talk-to-an-expert",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/terms-of-service",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/acceptable-use-policy",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/cookie-policy",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/analyst-recognition",
        destination: "/case-studies",
        permanent: true,
      },
      {
        source: "/ai-for-service/ai-for-healthcare",
        destination: "/solutions/ai-for-healthcare",
        permanent: true,
      },
      {
        source: "/ai-for-service/ai-for-banking",
        destination: "/solutions/ai-for-financial-services",
        permanent: true,
      },
      {
        source: "/ai-for-service/ai-for-retail",
        destination: "/services/microsoft-fabric-development-services",
        permanent: true,
      },
      {
        source: "/ai-for-work/ai-for-recruiting",
        destination: "/agentic-ai-platform",
        permanent: true,
      },
      {
        source: "/ai-for-work/ai-for-hr",
        destination: "/services/offshore-web-app-development",
        permanent: true,
      },
      {
        source: "/ai-for-work/ai-for-it",
        destination: "/industries/ai-for-it-services-solutions",
        permanent: true,
      },
      {
        source: "/together",
        destination: "/who-do-we-serve",
        permanent: true,
      },
      {
        source: "/testimonials",
        destination: "/case-studies",
        permanent: true,
      },
      {
        source: "/industries/contact-us",
        destination: "/contact",
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
