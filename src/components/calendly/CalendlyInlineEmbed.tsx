"use client";

import { useEffect, useId } from "react";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, string>;
        pageSettings?: {
          backgroundColor?: string;
          textColor?: string;
          primaryColor?: string;
        };
      }) => void;
    };
  }
}

const DEFAULT_CALENDLY_URL =
  "https://calendly.com/shradhabhagat/new-meeting?hide_gdpr_banner=1&hide_landing_page_details=1";

type CalendlyInlineEmbedProps = {
  url?: string;
  height?: number;
  className?: string;
};

export default function CalendlyInlineEmbed({
  url = DEFAULT_CALENDLY_URL,
  height = 560,
  className = "",
}: CalendlyInlineEmbedProps) {
  const reactId = useId().replace(/:/g, "");
  const containerId = `calendly-embed-${reactId}`;

  useEffect(() => {
    const initWidget = () => {
      const container = document.getElementById(containerId);
      if (!container || !window.Calendly?.initInlineWidget) return false;

      container.innerHTML = "";
      window.Calendly.initInlineWidget({
        url,
        parentElement: container,
        pageSettings: {
          backgroundColor: "09090d",
          textColor: "ffffff",
          primaryColor: "ff5812",
        },
      });
      return true;
    };

    const ensureScript = () => {
      const existingScript = document.getElementById("calendly-script");
      if (existingScript) {
        if (initWidget()) return;
        const interval = window.setInterval(() => {
          if (initWidget()) window.clearInterval(interval);
        }, 100);
        return () => window.clearInterval(interval);
      }

      const script = document.createElement("script");
      script.id = "calendly-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => initWidget();
      document.body.appendChild(script);

      if (!document.getElementById("calendly-stylesheet")) {
        const link = document.createElement("link");
        link.id = "calendly-stylesheet";
        link.rel = "stylesheet";
        link.href = "https://assets.calendly.com/assets/external/widget.css";
        document.head.appendChild(link);
      }
    };

    const cleanupTimer = window.setTimeout(ensureScript, 50);
    const reinitTimer = window.setTimeout(initWidget, 200);

    return () => {
      window.clearTimeout(cleanupTimer);
      window.clearTimeout(reinitTimer);
    };
  }, [containerId, url]);

  return (
    <div
      className={`overflow-hidden rounded-[6px] border border-white/10 bg-white ${className}`}
    >
      <div
        id={containerId}
        style={{ minWidth: 280, height, width: "100%" }}
      />
    </div>
  );
}
