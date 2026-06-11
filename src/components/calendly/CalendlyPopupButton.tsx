"use client";

import { useCallback, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

const DEFAULT_CALENDLY_URL =
  "https://calendly.com/shradhabhagat/new-meeting?hide_gdpr_banner=1&hide_landing_page_details=1";

function loadCalendlyAssets() {
  if (typeof window === "undefined") return Promise.resolve();

  return new Promise<void>((resolve) => {
    if (window.Calendly?.initPopupWidget) {
      resolve();
      return;
    }

    if (!document.getElementById("calendly-stylesheet")) {
      const link = document.createElement("link");
      link.id = "calendly-stylesheet";
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }

    const existingScript = document.getElementById("calendly-script");
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = "calendly-script";
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
}

type CalendlyPopupButtonProps = {
  url?: string;
  label?: string;
  className?: string;
};

export default function CalendlyPopupButton({
  url = DEFAULT_CALENDLY_URL,
  label = "Book a Call",
  className = "group inline-flex h-11 sm:h-12 w-full sm:w-fit sm:px-8 gap-3 items-center justify-center rounded-full border border-white/20 hover:border-[#ff5812] px-6 text-[13px] font-semibold uppercase tracking-[0.16em] text-white transition duration-300 hover:bg-[#ff5812] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5812]/60",
}: CalendlyPopupButtonProps) {
  useEffect(() => {
    loadCalendlyAssets();
  }, []);

  const openScheduler = useCallback(() => {
    loadCalendlyAssets().then(() => {
      window.Calendly?.initPopupWidget({ url });
    });
  }, [url]);

  return (
    <button type="button" onClick={openScheduler} className={className}>
      <span>{label}</span>
      <ArrowUpRight
        className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45"
        strokeWidth={2}
      />
    </button>
  );
}
