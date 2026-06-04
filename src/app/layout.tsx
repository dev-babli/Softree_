import type { Metadata } from "next";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { PostHogProvider } from "@/components/PostHogProvider";
import { PostHogPageView } from "@/components/PostHogPageView";
import GoogleAnalytics from "@/components/sections/google-analytics";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.softreetechnology.com"),
  title: {
    default: "Softree Technology | AI, Power Platform & Web Development",
    template: "%s | Softree Technology",
  },
  description:
    "Softree Technology delivers enterprise AI, Power Platform, SharePoint, and modern web development solutions. Trusted by companies across the US, UK, and India.",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Softree Technology",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Softree Technology" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@softreetech",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KDMTPWS8');
            `,
          }}
        />

        {/* ✅ Structured Data — Organization + WebSite */}
        <Script
          id="ld-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.softreetechnology.com/#organization",
                  name: "Softree Technology",
                  url: "https://www.softreetechnology.com",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://www.softreetechnology.com/logo/Softree-Technology-Final-Logo.png",
                  },
                  description:
                    "Softree Technology is an enterprise software development company specializing in AI, Power Platform, SharePoint, and modern web development.",
                  foundingDate: "2018",
                  sameAs: [
                    "https://www.linkedin.com/company/softree-technology",
                    "https://twitter.com/softreetech",
                  ],
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "customer service",
                    email: "hello@softreetechnology.com",
                    availableLanguage: "English",
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.softreetechnology.com/#website",
                  url: "https://www.softreetechnology.com",
                  name: "Softree Technology",
                  publisher: { "@id": "https://www.softreetechnology.com/#organization" },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: "https://www.softreetechnology.com/blog?q={search_term_string}",
                    },
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
            }),
          }}
        />
      </head>

      <body className="antialiased bg-[#141414] text-white">
        <GoogleAnalytics />
        {/* ✅ GTM NoScript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KDMTPWS8"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <PostHogProvider>
          <PostHogPageView />

          {/* Browser log script */}
          <Script
            id="orchids-browser-logs"
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
            strategy="lazyOnload"
            data-orchids-project-id="f9231059-3647-4f7a-ab8a-965fcb6abfb0"
          />

          {/* Global error reporter */}
          <ErrorReporter />

          {/* Route messenger */}
          <Script
            id="route-messenger"
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/route-messenger.js"
            strategy="lazyOnload"
            data-target-origin="*"
            data-message-type="ROUTE_CHANGE"
            data-include-search-params="true"
            data-only-in-iframe="true"
            data-debug="true"
            data-custom-data='{"appName":"Softree","version":"1.0.0"}'
          />

          {children}

          {/* Vercel Speed Insights – Core Web Vitals RUM */}
          <SpeedInsights />

          {/* Sanity Visual Editing bridge (required for Presentation tool) */}
          {isDraftMode ? <VisualEditing /> : null}
        </PostHogProvider>
      </body>
    </html>
  );
}
