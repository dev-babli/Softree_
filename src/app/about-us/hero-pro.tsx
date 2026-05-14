"use client"

import { useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"

// ── ULTRA-THIN SVG ICONS (Phosphor-style 1px stroke) ──
const Icons = {
  Globe: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  Location: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  ArrowUp: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7V17"/>
    </svg>
  ),
}

const GLOBAL_HUBS = [
  { city: "Kolkata", country: "India", role: "Global HQ", timezone: "IST +5:30", angle: 90, distance: 0 },
  { city: "London", country: "UK", role: "Europe Hub", timezone: "GMT +0", angle: 0, distance: 140 },
  { city: "New York", country: "USA", role: "Americas Hub", timezone: "EST -5", angle: 270, distance: 140 },
  { city: "Dubai", country: "UAE", role: "Middle East", timezone: "GST +4", angle: 45, distance: 120 },
]

const STATS = [
  { value: "12+", label: "Years" },
  { value: "200+", label: "Projects" },
  { value: "50+", label: "Clients" },
  { value: "24/7", label: "Coverage" },
]

// ── JAKUB KREHEL ENTER ANIMATION RECIPE ──
const enterAnimation = {
  initial: { opacity: 0, y: 8, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { type: "spring", duration: 0.45, bounce: 0 }
}

// ── EMIL KOWALSKI STAGGER CONFIG ──
const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } }
}

export default function AboutHeroPro() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // Respect reduced motion preference
  const motionProps = prefersReducedMotion 
    ? { initial: false, animate: false }
    : enterAnimation

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] w-full overflow-hidden bg-[#050505]"
    >
      {/* ── RADIAL MESH GRADIENT (Ethereal Glass vibe) ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,217,255,0.08)_0%,transparent_60%)] blur-3xl" />
        <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.05)_0%,transparent_50%)] blur-3xl" />
      </div>

      {/* ── SUBTLE GRID OVERLAY ── */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "120px 120px",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col px-6 pt-32 md:px-12 lg:flex-row lg:items-center lg:gap-20 lg:px-16 lg:pt-0">
        {/* ── LEFT COLUMN: CONTENT ── */}
        <motion.div 
          className="flex flex-1 flex-col justify-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* EYEBROW TAG - Microscopic pill badge */}
          <motion.div
            variants={enterAnimation}
            className="mb-10"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/60">
                Global Offshore Partner
              </span>
            </span>
          </motion.div>

          {/* MASSIVE HEADLINE - Tight tracking */}
          <motion.h1
            variants={enterAnimation}
            className="mb-8 text-[clamp(48px,8vw,96px)] font-light leading-[0.92] tracking-[-0.03em] text-white"
          >
            Bridging
            <br />
            <span className="font-medium text-cyan-400">
              global talent
            </span>
            <br />
            with enterprise outcomes
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            variants={enterAnimation}
            className="mb-12 max-w-md text-lg font-light leading-relaxed text-white/40"
          >
            From India to the UK, US, and Middle East — one unified team delivering 
            enterprise-grade solutions without the offshore chaos.
          </motion.p>

          {/* ── BUTTON-IN-BUTTON CTA ── */}
          <motion.div
            variants={enterAnimation}
            className="flex flex-wrap items-center gap-4"
          >
            {/* Primary CTA - Double-bezel button with magnetic physics */}
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition-all duration-200 active:scale-[0.98] hover:bg-white/90"
            >
              Start Your Project
              {/* Nested circular icon container - magnetic hover */}
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <span className="text-black transition-transform duration-200 group-hover:rotate-45">
                  <Icons.ArrowUp />
                </span>
              </span>
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/services"
              className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-6 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/[0.04]"
            >
              Explore Services
              <span className="text-white/40 transition-all duration-200 group-hover:text-white">
                <Icons.ArrowUp />
              </span>
            </Link>
          </motion.div>

          {/* ── STATS ROW - Double-bezel cards ── */}
          <motion.div
            variants={enterAnimation}
            className="mt-16 flex gap-3"
          >
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="group relative"
              >
                {/* Outer shell */}
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-1.5 backdrop-blur-sm transition-all duration-200 group-hover:border-white/[0.12]">
                  {/* Inner core */}
                  <div className="rounded-[calc(1rem-0.375rem)] px-5 py-4">
                    <div className="text-2xl font-light tracking-tight text-white">{stat.value}</div>
                    <div className="mt-0.5 text-[10px] uppercase tracking-[0.15em] text-white/30">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN: GLOBE VISUALIZATION ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 0.8, bounce: 0, delay: 0.2 }}
          className="relative hidden lg:flex lg:h-[600px] lg:w-[600px] lg:items-center lg:justify-center"
        >
          {/* ── Double-bezel outer ring ── */}
          <div className="absolute h-[480px] w-[480px] rounded-full border border-white/[0.03] p-4">
            <div className="h-full w-full rounded-full border border-white/[0.05]" />
          </div>

          {/* ── Inner orbit ring ── */}
          <div className="absolute h-[340px] w-[340px] rounded-full border border-dashed border-white/[0.08]" />

          {/* ── Center Hub - INDIA HQ ── */}
          <div className="absolute left-1/2 top-1/2 z-20 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.03] backdrop-blur-md">
            <Icons.Location />
            <span className="mt-1 text-[9px] font-medium uppercase tracking-wider text-cyan-400">INDIA</span>
          </div>

          {/* ── Connection lines with dash animation ── */}
          <svg className="absolute inset-0 h-full w-full" style={{ transform: "rotate(-90deg)" }}>
            {GLOBAL_HUBS.filter(h => h.distance > 0).map((hub, i) => {
              const angle = (hub.angle * Math.PI) / 180
              const x = 50 + (hub.distance / 300) * 50 * Math.cos(angle)
              const y = 50 + (hub.distance / 300) * 50 * Math.sin(angle)
              return (
                <line
                  key={i}
                  x1="50%"
                  y1="50%"
                  x2={`${x}%`}
                  y2={`${y}%`}
                  stroke="rgba(0,217,255,0.15)"
                  strokeWidth="1"
                  strokeDasharray="6 6"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="12"
                    to="0"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </line>
              )
            })}
          </svg>

          {/* ── Satellite Hubs - Double-bezel cards with spring entrance ── */}
          {GLOBAL_HUBS.filter(h => h.distance > 0).map((hub, i) => {
            const angle = (hub.angle * Math.PI) / 180
            const x = 50 + (hub.distance / 300) * 50 * Math.cos(angle)
            const y = 50 + (hub.distance / 300) * 50 * Math.sin(angle)
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0, delay: 0.5 + i * 0.1 }}
                className="group absolute"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* Outer shell */}
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-1 backdrop-blur-sm transition-all duration-200 group-hover:border-cyan-400/20 group-hover:bg-white/[0.04]">
                  {/* Inner core */}
                  <div className="flex items-center gap-2 rounded-[calc(0.75rem-0.25rem)] px-3 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    <div>
                      <div className="text-xs font-medium text-white">{hub.city}</div>
                      <div className="text-[9px] uppercase tracking-wider text-white/30">{hub.timezone}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}

          {/* ── Ambient glow pulses ── */}
          <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        </motion.div>
      </div>

      {/* ── Bottom fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent" />
    </section>
  )
}
