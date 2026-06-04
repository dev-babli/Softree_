"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const GA_MEASUREMENT_ID = "G-LDCSMTS939";

function GATracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

useEffect(() => {
  const handlePageView = () => {
    const url = pathname + (searchParams.toString() ? `?${searchParams}` : "");

    console.log("Route changed:", pathname);
    console.log("Sending pageview:", url);

    if (typeof window.gtag !== "undefined") {
      console.log("GA4 loaded");

      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: url,
        page_title: document.title,
      });

      window.gtag("event", "page_view", {
        page_path: url,
        page_title: document.title,
        page_location: window.location.href,
      });
    } else {
      console.log("GA4 NOT loaded");
    }
  };

  const timer = setTimeout(handlePageView, 150);
  return () => clearTimeout(timer);
}, [pathname, searchParams]);

  return null;
}

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Suspense fallback={null}>
        <GATracker />
      </Suspense>
    </>
  )
}