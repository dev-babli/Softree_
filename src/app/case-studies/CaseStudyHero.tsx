"use client"

import { motion } from "framer-motion"

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
  @media (prefers-reduced-motion: reduce) {
    .cs-blob-1, .cs-blob-2, .cs-blob-3, .cs-scroll-hint, .cs-pulse-dot {
      animation: none !important;
    }
  }
`

function CornerTick({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className={`pointer-events-none ${className}`}
    >
      <path d="M0 0 H14 M0 0 V14" stroke="#1852FF" strokeWidth="1" />
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
}

export default function CaseStudyHero({
  title,
  titleItalic,
  eyebrow,
  description,
  accentColor = "#1852FF",
  heroStat,
  heroStatLabel,
  projectCount,
}: CaseStudyHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#F8F9FC] pb-12 pt-24 sm:pb-20 sm:pt-32">
      <style>{heroStyles}</style>

      {/* ── Gradient mesh background ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="cs-blob-1 absolute -right-[15%] -top-[20%] h-[700px] w-[700px] rounded-full blur-[120px]"
          style={{
            background: `radial-gradient(circle, ${accentColor}33, ${accentColor}14 50%, transparent 70%)`,
          }}
        />
        <div
          className="cs-blob-2 absolute -left-[10%] top-[20%] h-[600px] w-[600px] rounded-full blur-[140px]"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.3), rgba(99,102,241,0.08) 50%, transparent 70%)",
          }}
        />
        <div
          className="cs-blob-3 absolute -bottom-[20%] left-[30%] h-[500px] w-[500px] rounded-full blur-[110px]"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.25), rgba(139,92,246,0.06) 50%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Grain texture ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Dot grid ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:32px_32px]"
      />

      {/* ── Top fade ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-[#F8F9FC] to-transparent"
      />

      {/* ── Content ── */}
      <div className="relative mx-auto max-w-[1400px] px-6">
        <CornerTick className="absolute left-6 top-0" />
        <CornerTick className="absolute right-6 top-0 rotate-90" />

        {/* ── TRUST BAR — above the fold, immediately credible ── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.21, 1.02, 0.73, 1] }}
          className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-3"
        >
          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map(s => (
                <svg key={s} className="h-3.5 w-3.5 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              ))}
            </div>
            <span className="text-[11px] font-semibold text-neutral-700">4.9</span>
            <span className="text-[11px] text-neutral-400">client rating</span>
          </div>

          <div className="hidden h-3.5 w-px bg-neutral-300 sm:block" />

          {/* Clients */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-neutral-800">200+</span>
            <span className="text-[11px] text-neutral-400">clients delivered</span>
          </div>

          <div className="hidden h-3.5 w-px bg-neutral-300 sm:block" />

          {/* Projects in this category */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-neutral-800">{projectCount ?? "50"}+</span>
            <span className="text-[11px] text-neutral-400">projects in this category</span>
          </div>

          <div className="hidden h-3.5 w-px bg-neutral-300 sm:block" />

          {/* Since */}
          <div className="flex items-center gap-1.5">
            <span className="cs-pulse-dot relative inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] text-neutral-400">delivering since 2013</span>
          </div>
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.21, 1.02, 0.73, 1] }}
          className="flex items-center gap-2.5"
        >
          <span
            className="cs-pulse-dot relative inline-block h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
          <span className="text-[10.5px] font-medium uppercase tracking-[0.24em] text-neutral-500">
            {eyebrow}
          </span>
        </motion.div>

        {/* ── Display headline ── */}
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0.21, 1.02, 0.73, 1],
          }}
          className="relative mt-12 text-[clamp(4rem,14vw,13rem)] font-semibold leading-[0.86] tracking-[-0.06em] text-neutral-950 sm:mt-16"
          style={{ fontFeatureSettings: '"ss01"' }}
        >
          <span className="block">{title}</span>
          <span className="-mt-2 block font-serif italic font-normal text-[#1a1a1a]/85 sm:-mt-4">
            {titleItalic}<span style={{ color: accentColor }}>.</span>
          </span>
        </motion.h1>

        {/* ── Subline + hero stat + scroll cue ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.55,
            ease: [0.21, 1.02, 0.73, 1],
          }}
          className="mt-12 flex flex-col items-start justify-between gap-8 border-t border-neutral-900/[0.1] pt-6 sm:mt-16 sm:flex-row sm:items-end"
        >
          <div className="flex flex-col gap-5">
            <p className="max-w-[520px] text-[15px] leading-[1.65] text-neutral-600 sm:text-base">
              {description}
            </p>

            {/* Outcome stat pill */}
            {heroStat && (
              <div className="inline-flex items-center gap-3 self-start rounded-full border border-neutral-200 bg-white px-4 py-2 shadow-sm">
                <span
                  className="text-[22px] font-black leading-none tracking-tight"
                  style={{ color: accentColor }}
                >
                  {heroStat}
                </span>
                <span className="text-[11px] leading-tight text-neutral-500">
                  {heroStatLabel ?? "avg. result across projects"}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-[10.5px] font-medium uppercase tracking-[0.24em] text-neutral-400">
            <span className="cs-scroll-hint inline-block">&darr;</span>
            <span>Scroll to explore</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
