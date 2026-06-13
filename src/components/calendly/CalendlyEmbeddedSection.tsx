"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion } from "framer-motion";
import type { ContactMeetingType } from "@/data/contact-page";
import { buildCalendlyUrl } from "./calendly-loader";

const CalendlyInlineEmbed = dynamic(() => import("./CalendlyInlineEmbed"), {
  ssr: false,
  loading: () => (
    <div
      className="flex items-center justify-center bg-[#fafaf8] text-sm text-neutral-400"
      style={{ height: 700 }}
    >
      Loading calendar…
    </div>
  ),
});

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type CalendlyEmbeddedSectionProps = {
  meetingTypes: readonly ContactMeetingType[];
  className?: string;
};

export default function CalendlyEmbeddedSection({
  meetingTypes,
  className = "",
}: CalendlyEmbeddedSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = meetingTypes[activeIndex];
  const embedUrl = buildCalendlyUrl(active.url);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7, ease: EASE }}
      className={className}
    >
      {/* Gradient frame */}
      <div className="rounded-[22px] bg-gradient-to-br from-[#ff5812]/35 via-[#f5b947]/20 to-neutral-200/40 p-px shadow-[0_28px_70px_-36px_rgba(0,0,0,0.28)]">
        <div className="overflow-hidden rounded-[21px] bg-[#fafaf8]">
          <div className="h-1 bg-gradient-to-r from-[#ff5812] via-[#f5b947] to-[#ff5812]" />

          {/* Our header only — Calendly event banner hidden via URL params */}
          <div className="border-b border-neutral-200/80 px-5 py-5 sm:px-7 sm:py-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-md">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff5812]">
                  Live availability
                </p>
                <h3 className="mt-2 text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold tracking-[-0.03em] text-neutral-950">
                  Pick a time with our team
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-neutral-500">
                  {active.description ??
                    "Choose a slot — you'll get an instant calendar invite."}
                </p>
              </div>

              <div
                role="tablist"
                aria-label="Meeting type"
                className="flex flex-wrap gap-1 rounded-xl border border-neutral-200/90 bg-white p-1"
              >
                {meetingTypes.map((type, index) => {
                  const selected = index === activeIndex;
                  return (
                    <button
                      key={type.label}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActiveIndex(index)}
                      className={`rounded-lg px-3 py-2 text-left transition duration-200 ${
                        selected
                          ? "bg-neutral-950 text-white shadow-sm"
                          : "text-neutral-600 hover:bg-neutral-50"
                      }`}
                    >
                      <span className="block text-[12px] font-medium leading-none">
                        {type.label}
                      </span>
                      <span
                        className={`mt-1 block text-[10px] ${
                          selected ? "text-white/55" : "text-neutral-400"
                        }`}
                      >
                        {type.duration}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <CalendlyInlineEmbed
            key={embedUrl}
            url={active.url}
            height={700}
            theme="cream"
            bare
          />
        </div>
      </div>
    </motion.div>
  );
}
