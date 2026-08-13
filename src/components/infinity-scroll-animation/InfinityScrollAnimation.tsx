"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Globe } from "@/registry/magicui/globe";
import { AboutUsGlassPillars } from "@/components/sections/about-us/AboutUsGlassPillars";
import SectionHeader from "@/components/homepage-light/SectionHeader";
import { SpotlightCard } from "@/components/qc/shared/SpotlightCard";
import { COUNTRIES_SERVED, COUNTRIES_SERVED_NUMBER } from "@/lib/constants";
import { EASE_T, VIEWPORT } from "@/lib/motion";
import ParallaxGalleryCard from "./ParallaxGalleryCard";

const EASE_OUT = EASE_T.silk;
const SURFACE = "#F8F9FC";
const ACCENT = "#FF5812";

const PRIMARY_STATS = [
  {
    value: 200,
    prefix: "+",
    suffix: "",
    label: "Enterprise clients",
    sub: "Across 15+ industries",
  },
  {
    value: 98,
    prefix: "",
    suffix: "%",
    label: "Client retention",
    sub: "Year over year",
  },
  {
    value: 50,
    prefix: "+",
    suffix: "",
    label: "Microsoft-certified",
    sub: "Engineers on staff",
  },
  {
    value: COUNTRIES_SERVED_NUMBER,
    prefix: "+",
    suffix: "",
    label: "Countries served",
    sub: "Active deployments",
  },
] as const;

const SPOTLIGHT_STATS = [
  {
    value: 95,
    suffix: "%",
    prefix: "",
    numberColor: "#1852FF",
    suffixColor: "#1852FF",
    accentGlow: "rgba(24, 82, 255, 0.5)",
    label: "Client retention rate",
    headline: "Partnerships that last",
    body: "Multi-year co-engineering with enterprise teams—measured renewal, not one-off project handoffs.",
  },
  {
    value: 125,
    suffix: "+",
    prefix: "",
    numberColor: "#0a0a1a",
    suffixColor: "#FF5812",
    accentGlow: "rgba(255, 88, 18, 0.45)",
    label: "Enterprise deliveries",
    headline: "Shipped at scale",
    body: "Power Platform, AI, data, and modern app programs delivered with senior offshore pods.",
  },
] as const;

const GALLERY_MIN_H =
  "min-h-[280px] sm:min-h-[340px] md:min-h-[400px] lg:min-h-[440px] xl:min-h-[480px]";

const STAT_TILE_H = "h-[112px] w-full shrink-0 sm:h-[118px]";

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  delay = 0,
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [hasAnimated, setHasAnimated] = useState(false);
  const spring = useSpring(Math.round(value * 0.6), {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  });
  const display = useTransform(spring, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const unsub = display.on("change", (v) => setDisplayValue(v));
    return unsub;
  }, [display]);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const t = setTimeout(() => {
        spring.set(value);
        setHasAnimated(true);
      }, delay * 1000);
      return () => clearTimeout(t);
    }
  }, [isInView, hasAnimated, spring, value, delay]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

function BentoCell({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl border border-[#0a0a1a]/[0.07] bg-white shadow-[0_8px_32px_-20px_rgba(10,10,26,0.14)] ${className}`}
    >
      {children}
    </div>
  );
}

function LandscapeStatTile({
  stat,
  index,
  accent = "#1852FF",
}: {
  stat: (typeof PRIMARY_STATS)[number];
  index: number;
  accent?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: EASE_OUT }}
      className="w-full"
    >
      <BentoCell
        className={`flex ${STAT_TILE_H} flex-col justify-between overflow-hidden p-4 md:p-5`}
      >
        <p
          className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold leading-none tracking-tight"
          style={{ color: accent }}
        >
          <AnimatedNumber
            value={stat.value}
            prefix={stat.prefix}
            suffix={stat.suffix}
            delay={0.2 + index * 0.1}
          />
        </p>
        <div>
          <p className="text-[13px] font-semibold text-[#0a0a1a]">{stat.label}</p>
          <p className="mt-0.5 text-[11px] text-[#0a0a1a]/50">{stat.sub}</p>
          <motion.div
            className="mt-2 h-px origin-left bg-[#1852FF]/70"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.08 }}
          />
        </div>
      </BentoCell>
    </motion.div>
  );
}

export default function InfinityScrollAnimation() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="about-bento"
      className="relative w-full overflow-x-clip py-16 md:py-24 lg:py-28"
      style={{ backgroundColor: SURFACE }}
      aria-labelledby="about-bento-heading"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[420px] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,88,18,0.07), transparent 72%)",
          filter: "blur(32px)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12">
        {/* ── Row 1: Intro + global reach ── */}
        <div className="grid grid-cols-12 items-start gap-3 sm:gap-4">
          <motion.div
            className="col-span-12 lg:col-span-5"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <SectionHeader
              badge="About us"
              accent={ACCENT}
              headline={
                <span id="about-bento-heading">
                  Your global offshore partner—built for scale.
                </span>
              }
              body={
                <span className="block text-[15px] font-medium leading-relaxed text-[#0a0a1a]/68">
                  {COUNTRIES_SERVED} countries served · 200+ projects · one embedded
                  team. Microsoft-certified delivery with senior engineers in your
                  workflows from day one.
                </span>
              }
              className="max-w-xl"
            />
            <Link
              href="/about-us"
              className="group mt-6 inline-flex w-max items-center gap-2 rounded-lg bg-[#1a1a1a] px-5 py-2.5 text-sm font-medium text-white shadow-[0_8px_24px_-8px_rgba(26,26,26,0.4)] transition hover:-translate-y-px"
            >
              Explore our story
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>

          <motion.div
            className="col-span-12 lg:col-span-7"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE_OUT }}
          >
            <BentoCell className="relative min-h-[180px] sm:min-h-[200px] md:min-h-[220px]">
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40">
                <Globe />
              </div>
              <div className="relative flex min-h-[180px] flex-col justify-between p-5 sm:min-h-[200px] sm:p-6 md:min-h-[220px] md:flex-row md:items-end md:p-8">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0a0a1a]/45">
                    Global reach
                  </p>
                  <p className="mt-2 text-[clamp(3.25rem,14vw,7rem)] font-bold leading-none tracking-tighter text-[#0a0a1a]">
                    <AnimatedNumber value={COUNTRIES_SERVED_NUMBER} delay={0.3} />
                    <span className="text-[#1852FF]">+</span>
                  </p>
                  <p className="mt-2 max-w-xs text-sm text-[#0a0a1a]/55">
                    Countries with active client deployments and dedicated delivery pods.
                  </p>
                </div>
                <div className="mt-4 flex gap-6 md:mt-0 md:flex-col md:items-end md:gap-3">
                  <span className="text-xs font-medium text-[#0a0a1a]/50">
                    Recognition
                  </span>
                  <span className="text-xs font-medium text-[#1852FF]">
                    Microsoft Partner
                  </span>
                </div>
              </div>
            </BentoCell>
          </motion.div>
        </div>

        {/* ── Row 2: Three About Us glass pillars (from platform showcase) ── */}
        <motion.div
          className="mt-10 border-t border-[#0a0a1a]/10 pt-10 md:mt-14 md:pt-14 lg:mt-16 lg:pt-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT.default}
          transition={{ duration: 0.75, ease: EASE_OUT }}
        >
          <div className="mb-8 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF5812]">
                THREE WAYS WE PARTNER
              </p>
              <h3 className="mt-3 text-[clamp(1.5rem,3.5vw,2.5rem)] font-semibold leading-[1.1] tracking-tight text-[#0a0a1a]">
                Offshore Bench <span className="inline-block mx-1.5 h-2 w-2 rounded-full bg-[#1852FF] align-middle" /> White Label <span className="inline-block mx-1.5 h-2 w-2 rounded-full bg-[#1852FF] align-middle" /><br className="hidden sm:block" />
                Agentic AI &amp; Microsoft Ecosystem
              </h3>
              <p className="mt-4 text-[15px] leading-[1.6] text-[#0a0a1a]/65 md:text-[16px]">
                Flexible engagement models. World-class delivery.<br className="hidden sm:block" />
                Built for speed, scale, and lasting impact.
              </p>
            </div>
            <p className="max-w-md text-[14px] leading-[1.65] text-[#0a0a1a]/65 md:text-[15px]">
              From dedicated offshore teams and white-label
              delivery to Agentic AI solutions and the full power
              of the Microsoft ecosystem—everything you need,
              under one trusted partner.
            </p>
          </div>
          <AboutUsGlassPillars />
        </motion.div>

        {/* ── Row 3: Service gallery + proof stats ── */}
        <div className="mt-10 grid grid-cols-12 items-start lg:items-stretch gap-3 sm:mt-14 sm:gap-4 lg:mt-16">
          <div className="col-span-12 mb-1 lg:col-span-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0a0a1a]/45">
              Services in motion
            </p>
            <p className="mt-1 text-sm text-[#0a0a1a]/55">
              Abstract showcases per practice — arrow keys or chevrons to browse.
            </p>
          </div>
          <div className="col-span-12 mb-1 hidden lg:col-span-4 lg:block">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0a0a1a]/45">
              Proof at a glance
            </p>
          </div>

          <motion.div
            className="col-span-12 min-w-0 lg:col-span-8 h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: EASE_OUT }}
          >
            <div className={`h-full w-full ${GALLERY_MIN_H}`}>
              <ParallaxGalleryCard className="h-full min-h-0" />
            </div>
          </motion.div>

          <div className="col-span-12 flex min-w-0 flex-col gap-3 lg:col-span-4 lg:min-h-0 lg:gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0a0a1a]/45 lg:hidden">
              Proof at a glance
            </p>
            <div className="grid flex-1 grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-1 lg:grid-rows-2">
              {SPOTLIGHT_STATS.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  className="min-h-[148px] lg:min-h-0 h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.55,
                    delay: 0.1 + idx * 0.08,
                    ease: EASE_OUT,
                  }}
                >
                  <SpotlightCard
                    color={stat.accentGlow}
                    intensity={0.55}
                    radius={240}
                    className="flex h-full min-h-[148px] flex-col justify-between rounded-2xl border border-[#0a0a1a]/5 bg-white p-5 shadow-[0_8px_28px_-14px_rgba(10,10,26,0.12)] sm:p-6 lg:p-8 xl:p-10 lg:min-h-0"
                  >
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0a0a1a]/40 lg:text-[12px] xl:text-[13px]">
                        {stat.headline}
                      </p>
                      <p className="mt-2 text-[clamp(2.5rem,5vw,3rem)] font-bold leading-none tabular-nums lg:mt-3 lg:text-[clamp(3.5rem,6vw,4.5rem)]">
                        <span style={{ color: stat.numberColor }}>
                          <AnimatedNumber
                            value={stat.value}
                            prefix={stat.prefix}
                            delay={0.35 + idx * 0.1}
                          />
                        </span>
                        <span style={{ color: stat.suffixColor }}>
                          {stat.suffix}
                        </span>
                      </p>
                      <p className="mt-1.5 text-sm font-semibold text-[#0a0a1a] lg:mt-2 lg:text-base xl:text-lg">
                        {stat.label}
                      </p>
                    </div>
                    <p className="mt-4 text-[12px] leading-relaxed text-[#0a0a1a]/58 sm:text-[13px] lg:mt-6 lg:text-[15px] xl:text-[16px]">
                      {stat.body}
                    </p>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Row 4: Metric strip ── */}
          {PRIMARY_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="col-span-6 min-w-0 md:col-span-3"
            >
              <LandscapeStatTile stat={stat} index={i} />
            </div>
          ))}

          {/* ── Row 5: CTA band ── */}
          <motion.div
            className="col-span-12 flex flex-col items-start justify-between gap-6 rounded-2xl border border-[#0a0a1a]/8 bg-white p-6 sm:flex-row sm:items-center sm:p-8"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE_OUT }}
          >
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF5812]">
                Co-engineered
              </p>
              <p className="mt-2 text-lg font-semibold leading-snug text-[#0a0a1a] md:text-xl">
                Technology leaders trust our teams inside their stack.
              </p>
              <p className="mt-2 text-sm text-[#0a0a1a]/55">
                Senior squads, transparent sprints, and Microsoft-grade governance on every
                engagement.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#FF5812] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#e84f0f]"
              >
                Partner with us
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 rounded-full border border-[#0a0a1a]/14 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0a0a1a] transition hover:border-[#FF5812]/25 hover:text-[#FF5812]"
              >
                Case studies
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
