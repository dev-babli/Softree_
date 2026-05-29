"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { LogoLoop } from "@/components/features/LogoLoop";
import { DUR, EASE_T, STAGGER, VIEWPORT } from "@/lib/motion";
import { SectionHeader } from "@/components/homepage-light/SectionHeader";
import { SpotlightCard } from "@/components/qc/shared/SpotlightCard";

/* ════════════════════════════════════════════════════════════════════════
 *  FeaturesShowcase — restyled for About stat/content split parity
 *
 *  Restyle scope (Task 4.3):
 *    • Outer surface: `#F8F9FC` (Design_Tokens canvas, Req 1.1)
 *    • Section header: `<SectionHeader>` with `#1852FF` accent (Req 1.3, 1.7)
 *    • Cards: `rounded-[20px]/[28px]`, hairline `border-[#0a0a1a]/10`, soft
 *      `shadow-[0_8px_28px_-12px_rgba(10,10,26,0.12)]` (Req 1.5, 11.1)
 *    • SpotlightCard from `qc/shared` for cursor-following radial glow
 *      (Req 4.2 — no inline pointer/gradient logic re-implementation)
 *    • Motion: `EASE_T.silk` / `DUR.section` / `DUR.card` / `STAGGER.default`
 *      from `@/lib/motion` (Req 1.6, 4.1) — no inline cubic-bezier literals
 *
 *  Content preservation (Req 3.2): every visible text string, image asset,
 *  and the implicit semantic intent of the original `ProductArcSlider` and
 *  `InfoSection` blocks are kept. There are no link `href`s or CTA
 *  destinations on this section to preserve. Layout structure changes are
 *  permitted by Req 3.6/3.7 because the original dark arc-carousel + dark
 *  industries-marquee composition cannot satisfy the Design_Tokens canvas
 *  list and the badge → headline → body section header order.
 * ════════════════════════════════════════════════════════════════════════ */

type Feature = {
  tag: string;
  title: string;
  body: string;
  image: string;
};

/**
 * The 6 capabilities — titles + descriptions are sourced verbatim from the
 * pre-redesign `InfoSection` FEATURES array (which mirrored `ProductArcSlider`'s
 * BASE_CARDS). Image URLs are kept identical to the original BASE_CARDS images.
 */
const FEATURES: Feature[] = [
  {
    tag: "CAPABILITY",
    title: "Security & Governance",
    body: "Enterprise-grade controls, compliance practices, access management, and delivery governance integrated into every engagement.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
  },
  {
    tag: "CAPABILITY",
    title: "Documentation Discipline",
    body: "Structured documentation, knowledge transfer, and maintainable engineering practices designed for long-term continuity.",
    image:
      "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=800",
  },
  {
    tag: "CAPABILITY",
    title: "Scalable Architecture",
    body: "Modern architectures engineered for performance, extensibility, and future business growth.",
    image:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800",
  },
  {
    tag: "CAPABILITY",
    title: "Cross-Team Collaboration",
    body: "Transparent communication and coordinated execution across stakeholders, engineering teams, and business units.",
    image:
      "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80&w=800",
  },
  {
    tag: "CAPABILITY",
    title: "AI-Enhanced Productivity",
    body: "AI-assisted workflows that accelerate development, automation, testing, and operational efficiency.",
    image:
      "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=800",
  },
  {
    tag: "CAPABILITY",
    title: "Transparent Delivery",
    body: "Clear sprint visibility, milestone tracking, reporting, and accountability throughout the delivery lifecycle.",
    image:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800",
  },
];

/**
 * Industries marquee items — preserved from the pre-redesign `InfoSection`
 * MARQUEE_ITEMS list. Colors/weights are recolored from `text-white/70`
 * (dark surface) to `text-[#0a0a1a]/60` (light surface) to maintain the
 * Design_Tokens canvas contrast ratios (Req 7.5, 1.5).
 */
const MARQUEE_ITEMS = [
  {
    node: (
      <span className="text-3xl font-bold tracking-tighter text-[#0a0a1a]/60">
        fintech
      </span>
    ),
    title: "Fintech",
  },
  {
    node: (
      <span className="text-4xl font-serif tracking-tight text-[#0a0a1a]/60">
        startups
      </span>
    ),
    title: "Startups",
  },
  {
    node: (
      <span className="text-3xl font-bold tracking-tight text-[#0a0a1a]/60 flex items-center gap-2">
        <span className="text-xl">✦</span> Enterprises
      </span>
    ),
    title: "Enterprises",
  },
  {
    node: (
      <span className="text-2xl font-bold leading-none tracking-tight text-[#0a0a1a]/60">
        AI PLATFORMS /DEPT.
      </span>
    ),
    title: "AI Platforms",
  },
  {
    node: (
      <span className="text-4xl font-black tracking-tighter text-[#0a0a1a]/60">
        SAAS
      </span>
    ),
    title: "SaaS",
  },
  {
    node: (
      <span className="text-3xl font-medium tracking-tight text-[#0a0a1a]/60 italic">
        healthcare
      </span>
    ),
    title: "Healthcare",
  },
  {
    node: (
      <span className="text-3xl font-bold tracking-tighter text-[#0a0a1a]/60">
        gov&apos;t
      </span>
    ),
    title: "Government",
  },
  {
    node: (
      <span className="text-4xl font-black tracking-tighter text-[#0a0a1a]/60">
        retail
      </span>
    ),
    title: "Retail",
  },
];

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT.default}
      transition={{
        duration: DUR.card,
        ease: EASE_T.silk,
        delay: index * STAGGER.default,
      }}
    >
      <SpotlightCard
        color="rgba(24, 82, 255, 0.55)"
        intensity={0.55}
        radius={300}
        className="
          group flex h-full flex-col overflow-hidden
          rounded-[28px] border border-[#0a0a1a]/10 bg-white
          shadow-[0_8px_28px_-12px_rgba(10,10,26,0.12)]
          transition-all duration-500
          hover:-translate-y-1
          hover:shadow-[0_24px_50px_-14px_rgba(24,82,255,0.22)]
        "
      >
        {/* Image header */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-[28px]">
          <Image
            src={feature.image}
            alt={feature.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          {/* Subtle inner ring on the image to match About-style cards */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-t-[28px] ring-1 ring-inset ring-[#0a0a1a]/5"
          />
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-4 p-7 lg:p-8">
          {/* Tag pill — uses Design_Tokens accent #1852FF */}
          <span
            className="
              inline-flex w-max items-center gap-2 rounded-full
              border border-[#1852FF]/20 bg-[#1852FF]/8
              px-3 py-1 text-[10px] font-semibold uppercase
              tracking-[0.16em] text-[#1852FF]
            "
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[#1852FF]"
            />
            {feature.tag}
          </span>

          <h3
            className="
              text-[20px] font-semibold leading-tight tracking-tight
              text-[#0a0a1a] transition-colors duration-300
              group-hover:text-[#1852FF]
              md:text-[22px]
            "
          >
            {feature.title}
          </h3>

          <p className="text-[15px] leading-relaxed text-[#0a0a1a]/70">
            {feature.body}
          </p>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

export default function FeaturesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const subheadRef = useRef<HTMLDivElement>(null);
  const subheadInView = useInView(subheadRef, {
    once: true,
    margin: "-15%",
  });

  return (
    <section
      ref={sectionRef}
      data-section="features"
      className="relative w-full overflow-hidden bg-[#F8F9FC] py-20 md:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
        {/* ────── Section header (badge → headline → body, Req 1.7) ────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT.default}
          transition={{ duration: DUR.section, ease: EASE_T.silk }}
          className="mb-14 md:mb-20"
        >
          <SectionHeader
            badge="Operational Standards"
            accent="#1852FF"
            headline="Engineered for enterprise delivery at scale."
            body="The operational standards behind every Softree engagement — maturity, operational excellence, enterprise readiness, delivery reliability."
          />
        </motion.div>

        {/* ────── About-style stat/content sub-split ────── *
         * Mirrors `LightAboutMerged`'s split: a left-anchored secondary
         * heading paired with a right-anchored supporting paragraph,
         * separated by a hairline border on `lg:`. Preserves the
         * pre-redesign `ProductArcSlider` headline + subhead text exactly. */}
        <motion.div
          ref={subheadRef}
          className="mb-14 grid grid-cols-1 gap-10 border-t border-[#0a0a1a]/10 pt-12 lg:grid-cols-2 lg:gap-20 md:mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={subheadInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DUR.section, ease: EASE_T.silk }}
        >
          <h3
            className="
              max-w-[680px] text-[clamp(26px,4vw,46px)] font-semibold
              leading-[1.06] tracking-[-0.025em] text-[#0a0a1a]
            "
          >
            Built for global engineering partnerships
          </h3>
          <p
            className="
              max-w-[480px] text-[15px] leading-[1.65] text-[#0a0a1a]/70
              md:text-[17px] lg:justify-self-end lg:border-l lg:border-[#0a0a1a]/10 lg:pl-12
            "
          >
            Access everything with a single partnership — offshore scalability,
            enterprise engineering, and AI-driven delivery.
          </p>
        </motion.div>

        {/* ────── Features grid (SpotlightCard, Req 4.2) ────── */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* ────── Industries marquee (preserved from InfoSection) ────── */}
      <div className="relative mt-20 w-full md:mt-24">
        <motion.div
          className="relative mx-auto w-full max-w-[1400px] px-6 lg:px-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT.default}
          transition={{ duration: DUR.section, ease: EASE_T.silk }}
        >
          {/* Industries marquee card — single white card with hairline
              border + soft shadow, mirrors the About card system. */}
          <div
            className="
              relative overflow-hidden rounded-[28px] border border-[#0a0a1a]/10
              bg-white shadow-[0_8px_28px_-12px_rgba(10,10,26,0.12)]
            "
          >
            {/* Top label, centered above the marquee track */}
            <div className="flex items-center justify-center pt-8 md:pt-10">
              <span
                className="
                  inline-flex items-center gap-2 rounded-md border border-[#0a0a1a]/10
                  bg-[#F8F9FC] px-3 py-1 text-[10px] font-bold uppercase
                  tracking-[0.18em] text-[#0a0a1a]/60
                "
              >
                Trusted by global enterprises
              </span>
            </div>

            <div className="w-full pt-8 pb-10 md:pt-10 md:pb-12">
              <LogoLoop
                logos={MARQUEE_ITEMS}
                speed={90}
                direction="left"
                gap={64}
                logoHeight={40}
                hoverSpeed={0}
                fadeOut
                fadeOutColor="#FFFFFF"
                ariaLabel="Industries and verticals we serve"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
