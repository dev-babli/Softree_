"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  ClarityGlassCard,
  GlobalMapGlassPanel,
  useClarityCardParallax,
  type ClarityPillar,
} from "@/components/sections/ClarityControlSection";
import { DUR, EASE_T, STAGGER, VIEWPORT } from "@/lib/motion";

const SCENE_OFFSHORE = {
  color1: "#B8CDE8",
  color2: "#3F5C9A",
  color3: "#0F1A36",
  blendAngle: 24,
  centerX: -0.06,
  centerY: -0.04,
  zoom: 0.97,
  warpSpeed: 0.85,
};

const SCENE_WHITELABEL = {
  color1: "#F4D2A6",
  color2: "#FF5812",
  color3: "#1F1108",
  blendAngle: 38,
  centerX: 0.04,
  centerY: 0,
  zoom: 0.95,
  warpSpeed: 0.75,
};

const SCENE_ENTERPRISE = {
  color1: "#C8D8A0",
  color2: "#3F5828",
  color3: "#0E1408",
  blendAngle: -14,
  centerX: 0,
  centerY: -0.05,
  zoom: 0.96,
  warpSpeed: 0.8,
};

const GLASS_DARK =
  "relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/14 bg-gradient-to-br from-black/25 via-black/45 to-black/65 p-4 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_18px_44px_-18px_rgba(0,0,0,0.5)]";

function GlassDots() {
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      <span className="block h-1 w-1 rounded-full bg-white/35" />
      <span className="block h-1 w-1 rounded-full bg-white/35" />
      <span className="block h-[5px] w-[5px] rounded-full bg-white/95 shadow-[0_0_6px_rgba(255,255,255,0.7)]" />
    </div>
  );
}

function WhiteLabelGlassPanel() {
  return (
    <div className={GLASS_DARK}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FF5812]">
          White-label
        </span>
        <GlassDots />
      </div>
      <p className="mt-3 text-[26px] font-semibold leading-none tracking-[-0.04em] text-white">
        Your brand.
        <br />
        <span className="text-white/55">Our bench.</span>
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <div
          className="rounded-xl border border-white/20 p-3"
          style={{
            background:
              "linear-gradient(160deg, rgba(255,255,255,0.22) 0%, rgba(255,88,18,0.12) 100%)",
          }}
        >
          <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/70">
            Client-facing
          </span>
          <div className="mt-2 h-7 rounded-md bg-white/20" />
        </div>
        <div className="rounded-xl border border-white/10 bg-black/25 p-3 opacity-80">
          <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/45">
            Delivery layer
          </span>
          <div className="mt-2 flex h-7 items-center justify-center rounded-md border border-dashed border-white/20 text-[9px] font-medium text-white/40">
            Softree — invisible
          </div>
        </div>
      </div>
    </div>
  );
}

function EnterpriseGlassPanel() {
  return (
    <div className={GLASS_DARK}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#B8DA8F]">
          Enterprise
        </span>
        <GlassDots />
      </div>
      <div className="relative mt-3 flex items-center gap-3 rounded-xl border border-white/12 bg-white/[0.06] px-3 py-2.5">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-md text-[11px] font-bold tracking-tight text-white"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(0,120,212,0.45) 100%)",
          }}
          aria-hidden
        >
          MS
        </span>
        <div>
          <p className="text-[11px] font-semibold text-white">Microsoft partner</p>
          <p className="text-[9px] text-white/55">Power Platform · Azure · AI</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        {[
          { v: "120+", l: "Specialists" },
          { v: "97%", l: "On-time" },
          { v: "24/7", l: "Coverage" },
        ].map((k) => (
          <div
            key={k.l}
            className="rounded-lg border border-white/10 py-2"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <p className="text-[17px] font-bold tabular-nums tracking-[-0.03em] text-white">
              {k.v}
            </p>
            <p className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.1em] text-white/55">
              {k.l}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export const ABOUT_US_GLASS_PILLARS: ClarityPillar[] = [
  {
    n: "1",
    title: "Global offshore tech partner",
    body: "Senior India-based squads, follow-the-sun delivery, and elastic capacity without sacrificing quality.",
    scene: SCENE_OFFSHORE,
    Visual: GlobalMapGlassPanel,
  },
  {
    n: "2",
    title: "White-label partner",
    body: "Your brand on every artifact — NDA-ready teams, your rituals, invisible to your end clients.",
    scene: SCENE_WHITELABEL,
    Visual: WhiteLabelGlassPanel,
  },
  {
    n: "3",
    title: "Microsoft & platform partner",
    body: "Power Platform, Azure, AI, and web — with governance, docs, and QA built into every sprint.",
    scene: SCENE_ENTERPRISE,
    Visual: EnterpriseGlassPanel,
  },
];

const cardGroup = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER.loose, delayChildren: 0.12 } },
};

const cardScaleIn = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

type AboutUsGlassPillarsProps = {
  /** Compact copy + links under each card */
  showCopy?: boolean;
  className?: string;
};

export function AboutUsGlassPillars({
  showCopy = true,
  className = "",
}: AboutUsGlassPillarsProps) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const inView = useInView(scopeRef, VIEWPORT.default);
  useClarityCardParallax(scopeRef);

  return (
    <div ref={scopeRef} className={className}>
      <motion.div
        variants={cardGroup}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 gap-8 overflow-visible sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8"
      >
        {ABOUT_US_GLASS_PILLARS.map((pillar, index) => (
          <motion.div
            key={pillar.n}
            variants={cardScaleIn}
            transition={{ duration: DUR.panel, ease: EASE_T.silk }}
            className="flex min-w-0 flex-col sm:last:col-span-2 sm:last:max-w-[480px] sm:last:justify-self-center lg:last:col-span-1 lg:last:max-w-none"
          >
            <ClarityGlassCard
              pillar={pillar}
              index={index}
              className="mx-0 w-full max-w-none"
            />
            {showCopy ? (
              <div className="mt-6 flex flex-col px-0.5 md:mt-8">
                <span
                  className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#0a0a1a]/10 bg-white/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0a0a1a]/65 tabular-nums"
                  aria-hidden
                >
                  <span className="block h-1 w-1 rounded-full bg-[#FF5812] opacity-80" />
                  {pillar.n.padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-balance text-[16px] font-semibold leading-[1.28] tracking-[-0.02em] text-[#0a0a1a] md:text-[17px]">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.65] text-[#0a0a1a]/68 md:text-[14px]">
                  {pillar.body}
                </p>
                <Link
                  href="/about-us"
                  className="mt-4 inline-flex w-fit items-center gap-1.5 text-[13px] font-semibold text-[#0a0a1a] transition hover:text-[#FF5812]"
                >
                  Learn more
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ) : null}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
