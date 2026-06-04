"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Rocket, Zap } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/homepage-light/SectionHeader";
import { HOME_INTRO_SURFACE } from "@/components/sections/ClarityControlSection";
import { DUR, EASE_T, STAGGER, VIEWPORT } from "@/lib/motion";
import { BentoPanel } from "./BentoPanel";
import ProjectMarquee from "./ProjectMarquee";
import { SOFTREE_IMPACT_STATS, WHY_US_BACKGROUNDS } from "./data";

const ORANGE = "#FF5812";
const BLUE = "#1852FF";
const MUTED = "rgba(10, 10, 26, 0.62)";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DUR.panel,
      ease: EASE_T.out,
      delay: i * STAGGER.default,
    },
  }),
};

function Stars() {
  return (
    <div className="flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" style={{ color: ORANGE }}>
          <path
            fill="currentColor"
            d="M10 1.5l2.2 4.5 5 .7-3.6 3.5.9 5.1L10 13.2l-4.5 2.1.9-5.1-3.6-3.5 5-.7L10 1.5z"
          />
        </svg>
      ))}
    </div>
  );
}

export default function WhyUsAdvantageSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="why-us"
      data-theme-section="light"
      aria-labelledby="why-us-heading"
      className="relative overflow-hidden py-20 md:py-28 lg:py-32"
      style={{ backgroundColor: HOME_INTRO_SURFACE }}
    >
      {/* Ambient gradients — section level only (research: depth without card clutter) */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute -left-[18%] top-[5%] h-[480px] w-[480px] rounded-full opacity-70 blur-[90px]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,88,18,0.22) 0%, transparent 68%)",
          }}
        />
        <div
          className="absolute -right-[12%] bottom-[0%] h-[420px] w-[420px] rounded-full opacity-60 blur-[90px]"
          style={{
            background:
              "radial-gradient(circle, rgba(24,82,255,0.16) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT.default}
          transition={{ duration: DUR.panel, ease: EASE_T.out }}
          className="max-w-3xl"
        >
          <SectionHeader
            badge="Why choose us"
            accent={ORANGE}
            headline={
              <span id="why-us-heading">
                Our <span className="text-[#0a0a1a]/40">advantage.</span>
              </span>
            }
            body="Senior engineering squads, Microsoft platforms, and AI-native delivery — structured so buyers scan proof, depth, and support in one pass."
            className="gap-5"
          />
        </motion.div>

        {/* Bento: 12-col, 16px gaps, size = hierarchy (B2B SaaS 2026 pattern) */}
        <div className="mt-12 grid grid-cols-1 gap-4 md:mt-14 lg:grid-cols-12 lg:gap-5">
          {/* Hero cell — largest, 7/12 */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial={reduceMotion ? "show" : "hidden"}
            whileInView="show"
            viewport={VIEWPORT.default}
            className="lg:col-span-7"
          >
            <BentoPanel gradient="warm" className="flex min-h-[440px] flex-col p-7 sm:p-9 lg:min-h-[500px]">
              <p
                className="pointer-events-none absolute -bottom-1 left-5 select-none font-black leading-none tracking-[-0.08em] text-[#0a0a1a]/[0.035] text-[clamp(7rem,20vw,15rem)]"
                aria-hidden
              >
                12
              </p>
              <div className="relative z-10 flex flex-1 flex-col justify-between gap-9">
                <div className="max-w-lg">
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: ORANGE }}
                  >
                    Since 2013
                  </p>
                  <p className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#0a0a1a] sm:text-2xl">
                    12+ years of engineering craft
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed" style={{ color: MUTED }}>
                    150+ production deployments across AI, Power Platform,
                    SharePoint, and cloud-native products — with squads that follow
                    the sun.
                  </p>
                </div>
                <ProjectMarquee />
              </div>
            </BentoPanel>
          </motion.div>

          {/* Proof cell — satisfaction, 5/12 */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial={reduceMotion ? "show" : "hidden"}
            whileInView="show"
            viewport={VIEWPORT.default}
            className="lg:col-span-5"
          >
            <BentoPanel gradient="white" className="relative min-h-[440px] lg:min-h-[500px]">
              <div className="absolute inset-x-0 top-0 h-[42%] overflow-hidden rounded-t-[20px]">
                <Image
                  src={WHY_US_BACKGROUNDS.satisfaction}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(243,240,238,0.92) 88%, #F3F0EE 100%)",
                  }}
                />
              </div>
              <div className="relative flex h-full min-h-[440px] flex-col justify-end p-7 sm:p-9 lg:min-h-[500px]">
                <div
                  className="rounded-2xl border border-[#0a0a1a]/[0.06] p-6 sm:p-7"
                  style={{
                    background:
                      "linear-gradient(145deg, #FFFFFF 0%, #FFF7F2 55%, #FFEDE3 100%)",
                    boxShadow: "0 16px 40px -24px rgba(255,88,18,0.35)",
                  }}
                >
                  <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#0a0a1a]/50">
                    Client satisfaction
                  </p>
                  <p className="mt-2 text-center text-[clamp(3.25rem,10vw,5.5rem)] font-bold leading-none tracking-[-0.06em] text-[#0a0a1a] tabular-nums">
                    98%
                  </p>
                  <p className="mt-2 text-center text-sm" style={{ color: MUTED }}>
                    across 150+ engagements
                  </p>
                  <div className="mt-6 flex items-end justify-between gap-4 border-t border-[#0a0a1a]/[0.06] pt-5">
                    <Stars />
                    <div className="text-right">
                      <p className="text-sm font-semibold text-[#0a0a1a]">4.9/5</p>
                      <p className="mt-0.5 text-xs" style={{ color: MUTED }}>
                        Enterprise teams worldwide
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </BentoPanel>
          </motion.div>

          {/* Stats — 4/12 */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial={reduceMotion ? "show" : "hidden"}
            whileInView="show"
            viewport={VIEWPORT.default}
            className="lg:col-span-4"
          >
            <BentoPanel gradient="cool" className="flex min-h-[300px] flex-col justify-center p-7 sm:min-h-[320px] sm:p-8">
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full opacity-80 blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(24,82,255,0.2), transparent 70%)",
                }}
                aria-hidden
              />
              <p className="relative text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0a0a1a]/45">
                Softree at a glance
              </p>
              <div className="relative mt-8 grid grid-cols-2 gap-x-4 gap-y-9">
                {SOFTREE_IMPACT_STATS.map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-[clamp(2rem,4.5vw,2.85rem)] font-bold leading-none tracking-[-0.05em] text-[#0a0a1a] tabular-nums">
                      {s.value}
                    </p>
                    <p className="mt-2 text-xs leading-snug sm:text-sm" style={{ color: MUTED }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </BentoPanel>
          </motion.div>

          {/* Fast + scalable — 4/12 */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial={reduceMotion ? "show" : "hidden"}
            whileInView="show"
            viewport={VIEWPORT.default}
            className="flex flex-col gap-4 lg:col-span-4"
          >
            <BentoPanel gradient="white" className="flex flex-1 flex-col items-center justify-center px-6 py-9 text-center">
              <span
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${ORANGE}14`, color: ORANGE }}
              >
                <Zap className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <p className="mt-3 text-lg font-semibold tracking-tight text-[#0a0a1a]">
                Fast turnaround
              </p>
              <p className="mt-2 max-w-[22ch] text-sm leading-relaxed" style={{ color: MUTED }}>
                MVPs and platform rollouts in as little as two weeks.
              </p>
            </BentoPanel>
            <BentoPanel gradient="white" className="flex flex-1 flex-col items-center justify-center px-6 py-9 text-center">
              <span
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${BLUE}12`, color: BLUE }}
              >
                <Rocket className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <p className="mt-3 text-lg font-semibold tracking-tight text-[#0a0a1a]">
                Scalable delivery
              </p>
              <p className="mt-2 max-w-[22ch] text-sm leading-relaxed" style={{ color: MUTED }}>
                Dedicated squads and augmentation that grow with your roadmap.
              </p>
            </BentoPanel>
          </motion.div>

          {/* Support — 4/12 */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial={reduceMotion ? "show" : "hidden"}
            whileInView="show"
            viewport={VIEWPORT.default}
            className="lg:col-span-4"
          >
            <BentoPanel gradient="peach" className="flex min-h-[400px] flex-col p-7 sm:p-8">
              <p className="text-lg font-semibold tracking-tight text-[#0a0a1a]">
                Real-time support
              </p>
              <p className="mt-2 text-[15px] leading-relaxed" style={{ color: MUTED }}>
                Senior engineers on Teams or Slack —{" "}
                <span className="font-medium text-[#0a0a1a]">no queues, no hand-offs.</span>
              </p>
              <div className="mt-5 flex flex-1 flex-col justify-end gap-2">
                <div className="max-w-[92%] rounded-2xl border border-[#0a0a1a]/[0.06] bg-white px-4 py-3 text-sm text-[#0a0a1a] shadow-sm">
                  Can we ship Power Platform workflows before go-live?
                </div>
                <div
                  className="ml-auto max-w-[88%] rounded-2xl px-4 py-2.5 text-sm text-white shadow-sm"
                  style={{ background: `linear-gradient(135deg, ${BLUE} 0%, #3B6BFF 100%)` }}
                >
                  Yes — scoped for this sprint.
                </div>
                <div
                  className="ml-auto max-w-[88%] rounded-2xl px-4 py-2.5 text-sm text-white shadow-sm"
                  style={{ background: `linear-gradient(135deg, ${ORANGE} 0%, #FF8A4C 100%)` }}
                >
                  Preview in your tenant tomorrow.
                </div>
                <div className="max-w-[92%] rounded-2xl border border-[#0a0a1a]/[0.06] bg-white px-4 py-3 text-sm text-[#0a0a1a] shadow-sm">
                  Exactly the turnaround we needed.
                </div>
              </div>
              <Link
                href="/contact"
                className="group mt-6 inline-flex w-max items-center gap-2 rounded-full bg-[#0a0a1a] px-5 py-2.5 text-sm font-semibold text-white transition-transform active:scale-[0.98]"
              >
                Talk to an engineer
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-px">
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
              </Link>
            </BentoPanel>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
