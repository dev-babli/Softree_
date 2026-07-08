"use client";

/**
 * Reveal — once-only section-header reveal for home-2026.
 * Per story-spec: reveals are for headers + key visuals ONLY (body copy renders instantly).
 * y 24 → 0 + opacity, EASE.out, DUR.section-ish 0.6s, triggered once in view.
 */
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { EASE_T, REVEAL, VIEWPORT } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  /** Extra classes applied to the wrapping element. */
  className?: string;
  /** Delay in seconds (use sparingly; stagger envelope ≤ 0.6s). */
  delay?: number;
  /** Render as a different element (defaults to div). */
  as?: "div" | "h2" | "h3" | "p" | "span";
};

export default function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  if (reduced) {
    // Reduced motion: opacity-only, ≤ 300ms (LEARNINGS L-2).
    return (
      <Tag
        className={className}
        initial={REVEAL.fade.initial}
        whileInView={REVEAL.fade.animate}
        viewport={VIEWPORT.default}
        transition={{ duration: 0.25, delay: 0 }}
      >
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      initial={REVEAL.up.initial}
      whileInView={REVEAL.up.animate}
      viewport={VIEWPORT.default}
      transition={{ duration: 0.6, ease: EASE_T.out, delay }}
    >
      {children}
    </Tag>
  );
}
