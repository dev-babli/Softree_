"use client";

/**
 * ModelCard — client leaf for EngagementModels. Story-spec §8.
 * Reveal-once (stagger handled by index-based delay), corner-bracket hover
 * (CSS .bracket system, transform-only), mono tag char-shuffle.
 */
import Link from "next/link";
import { motion } from "framer-motion";

import { useCharShuffle } from "./lib/useCharShuffle";
import { EASE_T, REVEAL, VIEWPORT } from "@/lib/motion";

export type EngagementModel = {
  tag: string;
  title: string;
  copy: string;
  href: string;
  span: string; // tailwind col-span class for the asymmetric grid
};

export default function ModelCard({ model, index }: { model: EngagementModel; index: number }) {
  const { display, shuffle, reset } = useCharShuffle(model.tag);

  return (
    <motion.div
      className={`bracket-host hairline relative flex flex-col gap-4 bg-[#111111] p-6 sm:p-8 ${model.span}`}
      initial={REVEAL.up.initial}
      whileInView={REVEAL.up.animate}
      viewport={VIEWPORT.default}
      transition={{ duration: 0.6, ease: EASE_T.out, delay: index * 0.12 }}
      onMouseEnter={shuffle}
      onMouseLeave={reset}
    >
      <span aria-hidden className="bracket bracket-tl" />
      <span aria-hidden className="bracket bracket-tr" />
      <span aria-hidden className="bracket bracket-bl" />
      <span aria-hidden className="bracket bracket-br" />

      <span className="font-mono-meta text-[#ff7a2f]">{display}</span>
      <h3 className="text-xl font-medium text-white sm:text-2xl">{model.title}</h3>
      <p className="text-[1.0625rem] leading-[1.65] text-white/55">{model.copy}</p>
      <Link
        href={model.href}
        className="font-mono-meta mt-auto inline-flex min-h-11 items-center gap-2 pt-4 text-white/55 transition-colors duration-200 hover:text-[#ff7a2f] focus-visible:text-[#ff7a2f] focus-visible:outline-none"
      >
        <span aria-hidden>→</span> DETAILS
      </Link>
    </motion.div>
  );
}
