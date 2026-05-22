import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { Suspense } from "react";
import { PostHogProvider } from "@/components/PostHogProvider";
import { PostHogPageView } from "@/components/PostHogPageView";
import GoogleAnalytics from "@/components/sections/google-analytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.softreetechnology.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
              })(window,document,'script','dataLayer','GTM-TQ7JWSNQ');
            `,
          }}
        />

        {/* ✅ Structured Data */}
        <Script
          id="ld-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Softree",
              url: "https://www.softreetechnology.com",
              logo: "https://www.softreetechnology.com/logo/Softree-Technology-Final-Logo.png",
            }),
          }}
        />
      </head>

      <body className="antialiased bg-[#141414] text-white">
        <GoogleAnalytics />
        {/* ✅ GTM NoScript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TQ7JWSNQ"
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
            strategy="afterInteractive"
            data-orchids-project-id="f9231059-3647-4f7a-ab8a-965fcb6abfb0"
          />

          {/* Global error reporter */}
          <ErrorReporter />

          {/* Route messenger */}
          <Script
            id="route-messenger"
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/route-messenger.js"
            strategy="afterInteractive"
            data-target-origin="*"
            data-message-type="ROUTE_CHANGE"
            data-include-search-params="true"
            data-only-in-iframe="true"
            data-debug="true"
            data-custom-data='{"appName":"Softree","version":"1.0.0"}'
          />

          {children}

          {/* Visual editor */}
          <VisualEditsMessenger />
        </PostHogProvider>
      </body>
    </html>
  );
}
