"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { WEB_DEV_VISUALS } from "./web-dev-visuals";
import { DUR, EASE_T } from "@/lib/motion";

const CARD_OFFSETS = ["translate-y-0", "translate-y-8 md:translate-y-14", "translate-y-4 md:translate-y-24"];

export default function WebDevCinematicHero() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      data-section="web-dev-hero"
      className="relative overflow-hidden bg-[#F3F0EE] pb-0 pt-[100px]"
      aria-labelledby="web-dev-hero-title"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,88,18,0.12), transparent 70%)",
          filter: "blur(48px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-40 h-[480px] w-[480px] rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(closest-side, rgba(24,82,255,0.1), transparent 72%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.section, ease: EASE_T.silk }}
            className="max-w-4xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0a0a1a]/10 bg-white/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0a0a1a]/55 backdrop-blur-sm">
              <Star className="h-3.5 w-3.5 fill-[#FF5812] text-[#FF5812]" aria-hidden />
              4.9 · Enterprise web delivery
            </div>

            <h1
              id="web-dev-hero-title"
              className="text-balance font-semibold tracking-[-0.045em] text-[#0a0a1a]"
              style={{ fontSize: "clamp(2.75rem, 7.5vw, 6.5rem)", lineHeight: 0.92 }}
            >
              We build web products
              <span className="block text-[#FF5812]">that actually ship.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#0a0a1a]/62 md:text-lg">
              Next.js, React, and cloud-native backends — editorial-grade UI,
              secure architecture, and weekly demos from discovery through production.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#0a0a0a]/90"
              >
                Start a project
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
              <Link
                href="/case-studies/web"
                className="inline-flex items-center gap-2 rounded-full border border-[#0a0a1a]/12 bg-white/80 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0a0a1a] backdrop-blur-sm transition hover:border-[#FF5812]/35"
              >
                View case studies
              </Link>
            </div>
          </motion.div>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: DUR.section }}
            className="max-w-xs text-sm leading-relaxed text-[#0a0a1a]/50 lg:text-right"
          >
            Scroll the gallery — abstract craft, concrete delivery. Inspired by
            premium agency templates, tuned for Softree&apos;s enterprise standard.
          </motion.p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-3 md:gap-6">
          {WEB_DEV_VISUALS.hero.map((visual, i) => (
            <motion.a
              key={visual.src}
              href="/case-studies/web"
              className={`group relative block overflow-hidden rounded-[20px] border border-[#0a0a1a]/[0.08] bg-white shadow-[0_24px_70px_-32px_rgba(10,10,26,0.22)] ${CARD_OFFSETS[i]}`}
              initial={prefersReduced ? false : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: DUR.cinematic,
                ease: EASE_T.silk,
                delay: 0.08 + i * 0.1,
              }}
              whileHover={prefersReduced ? undefined : { y: -6 }}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={visual.src}
                  alt={visual.alt}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/55 via-transparent to-transparent opacity-80 transition group-hover:opacity-90" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
                    View build
                  </span>
                  <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                    0{i + 1}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-14 grid gap-8 border-t border-[#0a0a1a]/[0.08] py-10 md:grid-cols-[1.2fr_1fr] md:items-end">
          <p className="max-w-2xl text-[15px] leading-relaxed text-[#0a0a1a]/58 md:text-base">
            We shape digital products with thoughtful engineering, clean aesthetics,
            and purposeful strategy — crafted to feel natural, impactful, and human.
          </p>
          <ul className="flex flex-wrap gap-8 text-sm text-[#0a0a1a]/55">
            <li>
              <span className="block text-2xl font-semibold tabular-nums text-[#0a0a1a]">
                8–12
              </span>
              Weeks to MVP
            </li>
            <li>
              <span className="block text-2xl font-semibold tabular-nums text-[#0a0a1a]">
                150+
              </span>
              Web launches
            </li>
            <li>
              <span className="block text-2xl font-semibold tabular-nums text-[#0a0a1a]">
                OWASP
              </span>
              Security baseline
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
