"use client";

/**
 * FinalCTA — the invitation. Story-spec §9.
 * Email verified: sales@softreetechnology.com (LightContactSection.tsx).
 * Magnetic CTA via shared MagneticLink (pointer:fine only, reduced-motion no-op).
 */
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import MagneticLink from "./lib/MagneticLink";
import { EASE_T, REVEAL, VIEWPORT } from "@/lib/motion";

export default function FinalCTA() {
  const reduced = useReducedMotion();

  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      className="ember-grain relative flex min-h-screen flex-col justify-center overflow-hidden bg-[#050505] px-6 py-28 sm:px-10 lg:px-24"
    >
      <div aria-hidden className="ember-glow" style={{ ["--ember-x" as string]: "50%", ["--ember-y" as string]: "100%" }} />

      <motion.h2
        id="cta-heading"
        className="max-w-[12ch] font-semibold text-white"
        style={{ fontSize: "clamp(3rem, 10vw, 9.5rem)", lineHeight: 0.95, letterSpacing: "-0.03em" }}
        initial={reduced ? REVEAL.fade.initial : REVEAL.upLarge.initial}
        whileInView={reduced ? REVEAL.fade.animate : REVEAL.upLarge.animate}
        viewport={VIEWPORT.default}
        transition={{ duration: reduced ? 0.25 : 0.9, ease: EASE_T.silk }}
      >
        Let&rsquo;s build your team.
      </motion.h2>

      <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-center">
        <MagneticLink>
          <Link
            href="/contact"
            className="font-mono-meta inline-flex min-h-14 w-full items-center justify-center bg-[#ff7a2f] px-10 text-[#0a0a0a] transition-colors duration-200 hover:bg-[#e85a1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-auto"
          >
            BOOK A CALL
          </Link>
        </MagneticLink>
        <Link
          href="/case-studies"
          className="font-mono-meta inline-flex min-h-11 items-center gap-2 text-white/55 transition-colors duration-200 hover:text-[#ff7a2f] focus-visible:text-[#ff7a2f] focus-visible:outline-none"
        >
          <span aria-hidden>→</span> SEE ALL CASE STUDIES
        </Link>
      </div>

      <div className="font-mono-meta mt-16 flex flex-wrap gap-x-6 gap-y-2 text-white/35">
        <a
          href="mailto:sales@softreetechnology.com"
          className="min-h-11 leading-[44px] transition-colors duration-200 hover:text-white/75 focus-visible:text-white/75 focus-visible:outline-none"
        >
          SALES@SOFTREETECHNOLOGY.COM
        </a>
        <span aria-hidden>/</span>
        <span className="leading-[44px]">RESPONSE &lt; 24H</span>
        <span aria-hidden>/</span>
        <span className="leading-[44px]">NDA ON REQUEST</span>
      </div>
    </section>
  );
}
