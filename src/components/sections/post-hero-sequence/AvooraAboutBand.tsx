"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_T, VIEWPORT } from "@/lib/motion";

const STATS = [
  { main: "200", suffix: "+", label: "Enterprise deployments shipped globally" },
  { main: "98", suffix: "%", label: "Client retention year over year" },
  { main: "50", suffix: "+", label: "Microsoft & AI certifications" },
  { main: "30", suffix: "+", label: "Countries with active delivery" },
] as const;

/**
 * Avoora Home A rhythm — centered about + stat row ([avoora.webflow.io](https://avoora.webflow.io/))
 */
export function AvooraAboutBand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, VIEWPORT.default);

  return (
    <div
      ref={ref}
      className="border-y border-[#0a0a1a]/8 py-16 text-center md:py-20 lg:py-24"
    >
      <motion.p
        className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0a0a1a]/45"
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE_T.silk }}
      >
        About us
      </motion.p>

      <motion.h2
        id="post-hero-about-heading"
        className="mx-auto mt-6 max-w-[22ch] text-pretty text-[clamp(30px,5.2vw,56px)] font-semibold leading-[1.06] tracking-[-0.04em] text-[#0a0a1a]"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, delay: 0.06, ease: EASE_T.silk }}
      >
        We embed senior engineers inside your delivery model.
      </motion.h2>

      <motion.p
        className="mx-auto mt-5 max-w-[48ch] text-[16px] leading-[1.7] text-[#0a0a1a]/58 md:text-[17px]"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.12, ease: EASE_T.silk }}
      >
        The result — clarity, velocity, and ownership across software, AI, and cloud from day one.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: EASE_T.silk }}
      >
        <Link
          href="/about-us"
          className="group mt-8 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0a0a1a]"
        >
          <span className="relative">
            Read more
            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#FF5812] transition-[width] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:w-full" />
          </span>
          <span className="text-[#FF5812] transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </motion.div>

      <motion.div
        className="mx-auto mt-14 grid max-w-[1100px] grid-cols-2 gap-10 md:mt-16 md:grid-cols-4 md:gap-8"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.22, ease: EASE_T.silk }}
      >
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col items-center">
            <p className="flex items-start justify-center gap-0.5 leading-none">
              <span className="text-[clamp(44px,7vw,72px)] font-semibold tracking-[-0.05em] text-[#0a0a1a] tabular-nums">
                {s.main}
              </span>
              <span className="mt-1 text-[clamp(22px,3.5vw,36px)] font-semibold text-[#FF5812]">
                {s.suffix}
              </span>
            </p>
            <p className="mt-3 max-w-[18ch] text-[11px] font-medium leading-relaxed text-[#0a0a1a]/50">
              {s.label}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
