"use client";

import { motion } from "framer-motion";
import { ClarityGlassCardGrid } from "@/components/sections/ClarityControlSection";
import { EASE_T } from "@/lib/motion";
import { HOME_INTRO } from "./copy";

export function PracticesCards({ inView }: { inView: boolean }) {
  return (
    <div className="mt-4 md:mt-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE_T.silk }}
        className="mb-10 flex items-end justify-between gap-6 border-t border-[#0a0a1a]/10 pt-10"
      >
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0a0a1a]/45">
            {HOME_INTRO.practicesLabel}
          </span>
          <p className="mt-2 max-w-[36ch] text-[15px] leading-[1.55] text-[#0a0a1a]/60">
            Software, automation, and cloud — each with a dedicated delivery lane.
          </p>
        </div>
        <span aria-hidden className="hidden text-[64px] font-bold leading-none tracking-[-0.06em] text-[#0a0a1a]/[0.04] sm:block">
          01—03
        </span>
      </motion.div>
      <ClarityGlassCardGrid inView={inView} />
    </div>
  );
}
