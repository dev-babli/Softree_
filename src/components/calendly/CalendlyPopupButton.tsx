"use client";

import { useCallback, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  DEFAULT_CALENDLY_URL,
  loadCalendlyAssets,
  openCalendlyPopup,
} from "./calendly-loader";

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
    void openCalendlyPopup(url);
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
