import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://softree-2.vercel.app"), // change later

  title: {
    default: "Softree | Power Platform, AI, Data & Modern App Development",
    template: "%s | Softree",
  },


  description:
    "Softree delivers Power Platform solutions, AI-driven applications, data engineering, and modern web development using React, Next.js, and cloud technologies.",

  keywords: [
    "Power Platform services",
    "AI development company",
    "Data engineering services",
    "Next.js development company",
    "React development services",
    "enterprise software solutions",
    "modern web applications",
  ],

  authors: [{ name: "Softree" }],
  creator: "Softree",
  publisher: "Softree",

  robots: {
    index: true,
    follow: true,
  },

  verification: {
    google: "CBKqqECDJRj5OGKmASLx9E8oM6XET_LWY_4_mWL5A3k",
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Softree | AI & Modern Application Development",
    description:
      "Build scalable AI-powered and modern web applications with Softree using Power Platform, React, Next.js, and cloud technologies.",
    url: "https://softree-2.vercel.app",
    siteName: "Softree",
    images: [
      {
        url: "/og-image.png", // add this image
        width: 1200,
        height: 630,
        alt: "Softree - AI Development Company",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Softree | AI, Data & Web Development",
    description:
      "Power Platform, AI solutions, and modern web development services.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "https://www.softreetechnology.com/wp-content/uploads/2024/08/cropped-Screenshot-2024-08-02-195851-32x32.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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

      <body className="antialiased bg-[#141414] text-white">
        {/* ✅ GTM NoScript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KDMTPWS8"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* ✅ Structured Data (SEO BOOST 🚀) */}
        <Script
          id="ld-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Softree",
              url: "https://softree-2.vercel.app",
              logo: "https://softree-2.vercel.app/logo.png",
            }),
          }}
        />

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

        {/* ✅ Tidio Chatbot*/}
        <Script
          src="//code.tidio.co/wt0gzqlmxpfwlnsv7aculpsflifbbv7v.js"
          strategy="afterInteractive"
        />

        {/* Visual editor */}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}