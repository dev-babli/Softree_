"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import SectionHeader from "@/components/homepage-light/SectionHeader";
import { DUR, EASE_T } from "@/lib/motion";

const ACCENT = "#FF5812";

export default function WebServiceHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? [0, 0] : [0, 80],
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? [1, 1] : [1, 1.06],
  );
  const copyY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? [0, 0] : [0, 40],
  );
  const copyOpacity = useTransform(
    scrollYProgress,
    [0, 0.75],
    prefersReduced ? [1, 1] : [1, 0.35],
  );

  return (
    <section
      ref={sectionRef}
      role="banner"
      data-section="web-dev-hero"
      className="relative overflow-hidden bg-[#0a0a0a] pb-16 pt-[100px] md:pb-20"
      aria-labelledby="web-dev-hero-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(255,88,18,0.14), transparent 65%)",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_minmax(280px,420px)] lg:items-center lg:gap-16 lg:px-12">
        <motion.div
          style={{ y: copyY, opacity: copyOpacity }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.section, ease: EASE_T.silk }}
        >
          <SectionHeader
            badge="Web development"
            accent={ACCENT}
            as="h1"
            headline={
              <span id="web-dev-hero-heading">
                Enterprise web apps built to ship and scale.
              </span>
            }
            body="Next.js, React, and cloud-native backends — responsive UI, secure architecture, and weekly demos from discovery through production."
            className="[&_h1]:text-[#fafaf9] [&_p]:text-white/55 [&_span]:border-white/10"
          />

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#FF5812] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#FF6B00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5812]"
            >
              Talk to our team
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
            <Link
              href="/case-studies/web"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80 backdrop-blur-md transition hover:border-white/35 hover:text-white"
            >
              Web case studies
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap gap-6 text-sm text-white/50">
            <li>
              <span className="block text-lg font-semibold tabular-nums text-[#fafaf9]">
                8–12 wk
              </span>
              Typical MVP
            </li>
            <li>
              <span className="block text-lg font-semibold tabular-nums text-[#fafaf9]">
                Next.js
              </span>
              Primary stack
            </li>
            <li>
              <span className="block text-lg font-semibold tabular-nums text-[#fafaf9]">
                OWASP
              </span>
              Security baseline
            </li>
          </ul>
        </motion.div>

        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] will-change-transform"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: DUR.cinematic, ease: EASE_T.silk, delay: 0.1 }}
        >
          <Image
            src="/service_image/web.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 420px"
            priority
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/50 via-transparent to-transparent"
          />
          <div
            aria-hidden
            className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md"
          >
            Scroll to explore
          </div>
        </motion.div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-[#F3F0EE]"
      />
    </section>
  );
}
