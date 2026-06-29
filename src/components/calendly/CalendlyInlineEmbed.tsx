"use client";

import { useEffect, useId } from "react";
import {
  buildCalendlyUrl,
  CALENDLY_PAGE_SETTINGS,
  DEFAULT_CALENDLY_URL,
  loadCalendlyAssets,
  type CalendlyPageTheme,
} from "./calendly-loader";

type CalendlyInlineEmbedProps = {
  url?: string;
  height?: number;
  className?: string;
  theme?: CalendlyPageTheme;
  /** When true, no outer border — parent frame handles chrome */
  bare?: boolean;
};

export default function CalendlyInlineEmbed({
  url = DEFAULT_CALENDLY_URL,
  height = 700,
  className = "",
  theme = "cream",
  bare = false,
}: CalendlyInlineEmbedProps) {
  const reactId = useId().replace(/:/g, "");
  const containerId = `calendly-embed-${reactId}`;
  const embedUrl = buildCalendlyUrl(url);

  useEffect(() => {
    let pollId: number | undefined;

    const initWidget = () => {
      const container = document.getElementById(containerId);
      if (!container || !window.Calendly?.initInlineWidget) return false;

      container.innerHTML = "";
      window.Calendly.initInlineWidget({
        url: embedUrl,
        parentElement: container,
        pageSettings: CALENDLY_PAGE_SETTINGS[theme],
      });
      return true;
    };

    const boot = () => {
      loadCalendlyAssets().then(() => {
        if (!initWidget()) {
          pollId = window.setInterval(() => {
            if (initWidget()) window.clearInterval(pollId);
          }, 100);
        }
      });
    };

    const timer = window.setTimeout(boot, 40);

    return () => {
      window.clearTimeout(timer);
      if (pollId) window.clearInterval(pollId);
    };
  }, [containerId, embedUrl, theme]);

  const bgClass =
    theme === "cream"
      ? "bg-[#fafaf8]"
      : theme === "light"
        ? "bg-white"
        : "bg-[#09090d]";

  return (
    <div
      className={`softree-calendly-embed ${bare ? "" : `overflow-hidden ${bgClass}`} ${className}`}
    >
      <div
        id={containerId}
        className="softree-calendly-embed__mount"
        style={{ minWidth: 280, height, width: "100%" }}
      />
    </div>
  );
}
