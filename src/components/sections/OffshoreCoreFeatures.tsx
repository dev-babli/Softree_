"use client";

/**
 * Offshore delivery pillars — static editorial grid (replaces carousel + globe).
 * About Us surface #F3F0EE, SectionHeader, no third-party clone UI.
 */

import Link from "next/link";
import { ArrowRight, Clock, Globe2, ShieldCheck } from "lucide-react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeader from "@/components/homepage-light/SectionHeader";
import { DUR, EASE_T, REVEAL, STAGGER, VIEWPORT } from "@/lib/motion";

const SURFACE = "#F3F0EE";
const ACCENT_BLUE = "#1852FF";
const ACCENT_ORANGE = "#FF5812";

const PILLARS = [
  {
    icon: Globe2,
    index: "01",
    title: "Talent without borders",
    copy:
      "Senior engineers embedded in your rituals — hired for judgment and delivery, not geography alone.",
    accent: ACCENT_BLUE,
  },
  {
    icon: Clock,
    index: "02",
    title: "A team that follows the sun",
    copy:
      "Overlapping timezones and async-first handoffs so progress lands before your morning standup.",
    accent: ACCENT_ORANGE,
  },
  {
    icon: ShieldCheck,
    index: "03",
    title: "Production-grade by default",
    copy:
      "Signed releases, documented SLAs, and security practices you can show auditors — not demo-grade code.",
    accent: "#7C5CFF",
  },
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function OffshoreCoreFeatures() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { ...VIEWPORT.once, amount: 0.15 });

  return (
    <section
      ref={ref}
      data-section="offshore-pillars"
      data-theme-section="light"
      aria-labelledby="offshore-pillars-heading"
      className="relative overflow-hidden py-20 md:py-28"
      style={{ backgroundColor: SURFACE }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(50% 42% at 12% 0%, rgba(24,82,255,0.06), transparent 60%), radial-gradient(40% 38% at 92% 80%, rgba(255,88,18,0.05), transparent 55%)`,
        }}
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-6 lg:px-12">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={REVEAL.up.initial}
          animate={inView ? REVEAL.up.animate : REVEAL.up.initial}
          transition={{ duration: DUR.section, ease: EASE_T.silk }}
        >
          <SectionHeader
            badge="Offshore engineering"
            accent={ACCENT_BLUE}
            headline={
              <span id="offshore-pillars-heading" className="text-balance">
                Your offshore tech partner
              </span>
            }
            body="A senior bench that ships under your brand — accountable across continents and timezones."
            className="!items-center [&_p]:mx-auto"
          />
        </motion.div>

        <motion.ul
          className="mt-12 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-3 md:gap-6"
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: STAGGER.default } },
          }}
        >
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.li
                key={pillar.index}
                variants={fadeUp}
                transition={{ duration: DUR.card, ease: EASE_T.silk }}
                className="group relative flex flex-col rounded-[18px] border border-[#0a0a1a]/[0.08] bg-white p-6 shadow-[0_1px_2px_rgba(10,10,26,0.04),0_12px_36px_-24px_rgba(10,10,26,0.1)] md:p-7"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0a0a1a]/10 to-transparent"
                />

                <div className="flex items-start justify-between gap-4">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#0a0a1a]/[0.06]"
                    style={{ backgroundColor: `${pillar.accent}12` }}
                  >
                    <Icon
                      className="h-5 w-5"
                      style={{ color: pillar.accent }}
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </div>
                  <span
                    className="font-mono text-[11px] font-medium tracking-[0.16em] text-[#0a0a1a]/35"
                  >
                    {pillar.index}
                  </span>
                </div>

                <h3 className="mt-5 text-[1.25rem] font-semibold leading-[1.15] tracking-[-0.02em] text-[#0a0a1a]">
                  {pillar.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-[#0a0a1a]/62">
                  {pillar.copy}
                </p>

                <span
                  aria-hidden
                  className="mt-6 block h-px w-10 transition-[width] duration-300 group-hover:w-16"
                  style={{ backgroundColor: pillar.accent }}
                />
              </motion.li>
            );
          })}
        </motion.ul>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
          initial={REVEAL.fade.initial}
          animate={inView ? REVEAL.fade.animate : REVEAL.fade.initial}
          transition={{ duration: DUR.card, ease: EASE_T.silk, delay: 0.2 }}
        >
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#FF5812] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#FF5812]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5812]"
          >
            Explore delivery models
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
          <Link
            href="/contact"
            className="text-[13px] font-medium text-[#0a0a1a]/55 underline-offset-4 transition-colors hover:text-[#1852FF] hover:underline"
          >
            Book a discovery call
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
