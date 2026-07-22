"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const heroStyles = `
  @keyframes blob-1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(8%, -6%) scale(1.1); }
    66% { transform: translate(-6%, 4%) scale(0.95); }
  }
  @keyframes blob-2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(-7%, 5%) scale(1.05); }
    66% { transform: translate(5%, -4%) scale(1.1); }
  }
  @keyframes blob-3 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-4%, -5%) scale(1.08); }
  }
  .cs-blob-1 { animation: blob-1 22s ease-in-out infinite; }
  .cs-blob-2 { animation: blob-2 28s ease-in-out infinite; }
  .cs-blob-3 { animation: blob-3 18s ease-in-out infinite; }
  
  @keyframes scroll-hint {
    0%, 20% { transform: translateY(0); opacity: 0.4; }
    50% { transform: translateY(8px); opacity: 1; }
    80%, 100% { transform: translateY(0); opacity: 0.4; }
  }
  .cs-scroll-hint { animation: scroll-hint 2.4s ease-in-out infinite; }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.85); }
  }
  .cs-pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }

  @keyframes glass-shine {
    0% { transform: translateX(-100%) rotate(25deg); }
    100% { transform: translateX(200%) rotate(25deg); }
  }
  .cs-glass-shine {
    animation: glass-shine 6s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .cs-blob-1, .cs-blob-2, .cs-blob-3, .cs-scroll-hint, .cs-pulse-dot, .cs-glass-shine {
      animation: none !important;
    }
  }
`

function CornerTick({ className = "", color = "#FF5812" }: { className?: string; color?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className={`pointer-events-none ${className}`}
    >
      <path d="M0 0 H14 M0 0 V14" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}

interface CaseStudyHeroProps {
  title: string
  titleItalic: string
  eyebrow: string
  description: string
  accentColor?: string
  /** Single big outcome stat shown in hero, e.g. "+210% bookings" */
  heroStat?: string
  /** Label for the heroStat, e.g. "avg. result across projects" */
  heroStatLabel?: string
  /** Total number of projects delivered in this category */
  projectCount?: number
  /** Featured screenshot/mockup image path */
  heroImage?: string
  /** Alt text for hero image */
  heroImageAlt?: string
  /** Client name for showcase detail */
  clientName?: string
  /** Associated technology/solution tags */
  tags?: string[]
}

export default function CaseStudyHero({
  title,
  titleItalic,
  eyebrow,
  description,
  accentColor = "#FF5812",
  heroStat,
  heroStatLabel,
  projectCount,
  heroImage = "/images/research-portal-screenshot-demo.webp",
  heroImageAlt = "Softree Customer Project Showcase",
  clientName,
  tags = ["Enterprise Architecture", "AI Automation", "Cloud Infrastructure"],
}: CaseStudyHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#F8F9FC] pb-16 pt-24 sm:pb-24 sm:pt-32">
      <style>{heroStyles}</style>

      {/* ── Gradient mesh background ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="cs-blob-1 absolute -right-[10%] -top-[15%] h-[750px] w-[750px] rounded-full blur-[130px]"
          style={{
            background: `radial-gradient(circle, ${accentColor}28, ${accentColor}0D 55%, transparent 75%)`,
          }}
        />
        <div
          className="cs-blob-2 absolute -left-[10%] top-[20%] h-[650px] w-[650px] rounded-full blur-[140px]"
          style={{
            background: "radial-gradient(circle, rgba(24,82,255,0.18), rgba(24,82,255,0.04) 50%, transparent 70%)",
          }}
        />
        <div
          className="cs-blob-3 absolute -bottom-[20%] left-[25%] h-[550px] w-[550px] rounded-full blur-[120px]"
          style={{
            background: `radial-gradient(circle, ${accentColor}1F, rgba(255,122,47,0.04) 50%, transparent 70%)`,
          }}
        />
      </div>

      {/* ── Grain texture ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Dot grid ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:radial-gradient(#0a0a1a_1px,transparent_1px)] [background-size:32px_32px]"
      />

      {/* ── Top fade ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-[#F8F9FC] to-transparent"
      />

      {/* ── Main Layout Container ── */}
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <CornerTick className="absolute left-4 sm:left-6 top-0" color={accentColor} />
        <CornerTick className="absolute right-4 sm:right-6 top-0 rotate-90" color={accentColor} />

        {/* ── TRUST BAR ── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.21, 1.02, 0.73, 1] }}
          className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-3"
        >
          <div className="flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 shadow-sm backdrop-blur-sm border border-black/[0.06]">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} className="h-3.5 w-3.5 fill-amber-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[11.5px] font-bold text-neutral-800">4.9/5</span>
            <span className="text-[11px] text-neutral-500">Client Rating</span>
          </div>

          <div className="hidden h-3.5 w-px bg-neutral-300 sm:block" />

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-neutral-800">200+</span>
            <span className="text-[11px] text-neutral-500">Projects Delivered</span>
          </div>

          <div className="hidden h-3.5 w-px bg-neutral-300 sm:block" />

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-neutral-800">{projectCount ?? "50"}+</span>
            <span className="text-[11px] text-neutral-500">Category Case Studies</span>
          </div>

          <div className="hidden h-3.5 w-px bg-neutral-300 sm:block" />

          <div className="flex items-center gap-1.5">
            <span className="cs-pulse-dot relative inline-block h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-medium text-neutral-600">Enterprise Verified</span>
          </div>
        </motion.div>

        {/* ── 2-COLUMN SPLIT GRID ── */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* ── LEFT COLUMN: Text Content ── */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Eyebrow Pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.21, 1.02, 0.73, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/90 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] shadow-sm backdrop-blur-md"
            >
              <span
                className="cs-pulse-dot h-2 w-2 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
              <span className="text-neutral-700">{eyebrow}</span>
              {clientName && (
                <>
                  <span className="text-neutral-300">•</span>
                  <span className="text-neutral-500 font-medium normal-case tracking-normal">{clientName}</span>
                </>
              )}
            </motion.div>

            {/* Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.21, 1.02, 0.73, 1] }}
              className="mt-6 text-[clamp(2.5rem,5.5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-[#0a0a1a]"
            >
              <span>{title} </span>
              <span className="inline-block font-serif italic font-normal text-[#0a0a1a]/85">
                {titleItalic}<span style={{ color: accentColor }}>.</span>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.21, 1.02, 0.73, 1] }}
              className="mt-6 max-w-[620px] text-base sm:text-lg leading-relaxed text-[#0a0a1a]/70"
            >
              {description}
            </motion.p>

            {/* Outcome Stat Pill */}
            {heroStat && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.42 }}
                className="mt-7 inline-flex items-center gap-4 rounded-2xl border border-black/[0.08] bg-white p-3.5 pr-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
              >
                <div
                  className="flex h-12 items-center justify-center rounded-xl px-4 text-2xl font-extrabold tracking-tight text-white shadow-sm"
                  style={{ backgroundColor: accentColor }}
                >
                  {heroStat}
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-neutral-900 leading-tight">
                    Key Performance Outcome
                  </span>
                  <span className="text-[11.5px] text-neutral-500 leading-tight">
                    {heroStatLabel ?? "Measured impact delivered"}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Action CTA Buttons & Tag Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.52 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex h-12 items-center gap-2 rounded-full px-7 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg"
                style={{
                  backgroundColor: accentColor,
                  boxShadow: `0 10px 25px -5px ${accentColor}66`,
                }}
              >
                <span>Partner With Us</span>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              <Link
                href="/case-studies"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-neutral-300 bg-white/80 px-6 text-sm font-semibold text-neutral-800 transition-all hover:bg-white hover:border-neutral-400 active:scale-95"
              >
                Browse All Stories
              </Link>
            </motion.div>

            {/* Tags line */}
            {tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-6 flex flex-wrap items-center gap-2"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                  Capabilities:
                </span>
                {tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="rounded-md bg-neutral-200/60 px-2.5 py-1 text-[11px] font-medium text-neutral-700"
                  >
                    {t}
                  </span>
                ))}
              </motion.div>
            )}
          </div>

          {/* ── RIGHT COLUMN: Advanced Glass Mockup Showcase ── */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.21, 1.02, 0.73, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Ambient Radial Halo behind mockup */}
            <div
              className="absolute -inset-4 rounded-3xl opacity-60 blur-2xl pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${accentColor}40 0%, transparent 70%)`,
              }}
            />

            {/* Browser Frame Mockup */}
            <div className="relative w-full overflow-hidden rounded-2xl border border-black/10 bg-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.16)]">
              {/* Window Header */}
              <div className="flex h-10 w-full items-center justify-between border-b border-black/[0.08] bg-neutral-100/80 px-4">
                {/* Dots */}
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f56] shadow-inner" />
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2e] shadow-inner" />
                  <span className="h-3 w-3 rounded-full bg-[#27c93f] shadow-inner" />
                </div>

                {/* Simulated URL bar */}
                <div className="flex items-center gap-1.5 rounded-md border border-black/[0.06] bg-white/80 px-3 py-0.5 text-[11px] font-medium text-neutral-500 shadow-inner max-w-[220px] truncate">
                  <svg className="h-3 w-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span className="truncate">softreetechnology.com/case-studies</span>
                </div>

                <div className="w-8" />
              </div>

              {/* Image Frame Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
                <Image
                  src={heroImage}
                  alt={heroImageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-top transition-transform duration-700 hover:scale-105"
                  priority
                />

                {/* Subtle shine diagonal overlay */}
                <div className="cs-glass-shine absolute inset-0 pointer-events-none w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* Floating Metric Badge Chip */}
                <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2.5 rounded-xl border border-white/40 bg-black/60 px-3.5 py-2 backdrop-blur-md shadow-lg">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-white/70">
                      Impact Verified
                    </span>
                    <span className="text-[12px] font-bold text-white leading-none">
                      {heroStat ?? "Enterprise Solution"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Scroll cue ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-12 flex items-center justify-between border-t border-neutral-900/[0.08] pt-6"
        >
          <div className="text-[11px] font-medium text-neutral-400">
            Softree Technology Case Study Showcase
          </div>

          <div className="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.24em] text-neutral-500">
            <span className="cs-scroll-hint inline-block">&darr;</span>
            <span>Scroll to explore project</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
