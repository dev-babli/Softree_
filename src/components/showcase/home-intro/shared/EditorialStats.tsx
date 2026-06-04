"use client";

import { motion } from "framer-motion";
import { EASE_T } from "@/lib/motion";
import { STATS } from "./copy";

function CornerTick({ className = "" }: { className?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden className={className}>
      <path d="M0 0 H10 M0 0 V10" stroke="rgba(10,10,26,0.12)" strokeWidth="1.2" />
    </svg>
  );
}

export function EditorialStats({
  inView,
  layout = "band",
}: {
  inView: boolean;
  layout?: "band" | "rail";
}) {
  if (layout === "rail") {
    return (
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, ease: EASE_T.silk }}
        className="flex flex-col gap-0 border-l border-[#0a0a1a]/10 pl-8"
      >
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`py-6 ${i < STATS.length - 1 ? "border-b border-[#0a0a1a]/8" : ""}`}
          >
            <span className="block text-[clamp(32px,4vw,44px)] font-semibold tabular-nums tracking-[-0.04em] text-[#0a0a1a]">
              {s.value}
            </span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0a0a1a]/45">
              {s.label}
            </span>
            <span className="mt-1 block text-[12px] leading-snug text-[#0a0a1a]/55">{s.desc}</span>
          </div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE_T.silk }}
      className="relative mx-auto max-w-4xl"
    >
      <CornerTick className="absolute -left-1 -top-1" />
      <CornerTick className="absolute -right-1 -top-1 rotate-90" />
      <CornerTick className="absolute -bottom-1 -left-1 -rotate-90" />
      <CornerTick className="absolute -bottom-1 -right-1 rotate-180" />
      <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-[#0a0a1a]/8 bg-white/50 backdrop-blur-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0 divide-y divide-[#0a0a1a]/8">
        {STATS.map((s) => (
          <div key={s.label} className="group px-6 py-8 text-center transition-colors duration-500 hover:bg-white/80 md:py-10">
            <span className="text-[clamp(2.5rem,5vw,3.25rem)] font-semibold tabular-nums tracking-[-0.04em] text-[#FF5812] transition-transform duration-500 group-hover:scale-[1.02]">
              {s.value}
            </span>
            <span className="mt-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0a0a1a]/45">
              {s.label}
            </span>
            <span className="mt-2 block text-[12px] leading-relaxed text-[#0a0a1a]/55 opacity-0 max-h-0 overflow-hidden transition-all duration-500 group-hover:max-h-12 group-hover:opacity-100">
              {s.desc}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
