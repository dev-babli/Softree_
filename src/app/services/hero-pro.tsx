"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import Link from "next/link"

// ── ULTRA-THIN SVG ICONS (1px stroke) ──
const Icons = {
  Share: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"/>
      <circle cx="6" cy="12" r="3"/>
      <circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  ),
  Database: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M3 5V19A9 3 0 0 0 21 19V5"/>
      <path d="M3 12A9 3 0 0 0 21 12"/>
    </svg>
  ),
  Brain: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-5 0v-15A2.5 2.5 0 0 1 9.5 2Z"/>
      <path d="M14.5 2A2.5 2.5 0 0 1 17 4.5v15a2.5 2.5 0 0 1-5 0v-15A2.5 2.5 0 0 1 14.5 2Z"/>
    </svg>
  ),
  Code: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  Phone: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
      <line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  ),
  Chart: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 20V10"/>
      <path d="M12 20V4"/>
      <path d="M6 20v-6"/>
    </svg>
  ),
  ArrowUp: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7V17"/>
    </svg>
  ),
}

const CYCLE_WORDS = ["SharePoint", "Power Apps", "AI Solutions", "Web Apps", "Mobile"]
const CYCLE_MS = 2500

const SERVICES = [
  {
    id: "sharepoint",
    icon: Icons.Share,
    title: "SharePoint",
    subtitle: "Enterprise intranets & SPFx",
    description: "Custom intranets, document management, and SPFx web parts for Microsoft 365.",
    href: "/services/sharepoint",
    size: "large",
    color: "cyan",
  },
  {
    id: "power",
    icon: Icons.Database,
    title: "Power Platform",
    subtitle: "Apps, BI & Automation",
    description: "Power Apps, Power BI dashboards, and Power Automate workflows.",
    href: "/services/power-platform",
    size: "medium",
    color: "amber",
  },
  {
    id: "ai",
    icon: Icons.Brain,
    title: "AI Solutions",
    subtitle: "GPT-4o & Claude",
    description: "AI agents, RAG pipelines, and document intelligence.",
    href: "/services/ai",
    size: "medium",
    color: "purple",
  },
  {
    id: "web",
    icon: Icons.Code,
    title: "Web Development",
    subtitle: "React & Next.js",
    description: "Modern web applications with React, Next.js, and Node.js.",
    href: "/services/web",
    size: "large",
    color: "emerald",
  },
  {
    id: "mobile",
    icon: Icons.Phone,
    title: "Mobile Apps",
    subtitle: "iOS & Android",
    description: "Native and cross-platform mobile applications.",
    href: "/services/mobile",
    size: "medium",
    color: "rose",
  },
  {
    id: "analytics",
    icon: Icons.Chart,
    title: "Analytics",
    subtitle: "Power BI & Data Viz",
    description: "Interactive dashboards and business intelligence solutions.",
    href: "/services/analytics",
    size: "medium",
    color: "blue",
  },
]

const FILTERS = [
  { id: "all", label: "All" },
  { id: "microsoft", label: "Microsoft" },
  { id: "ai", label: "AI" },
  { id: "web", label: "Web & Mobile" },
]

const colorMap: Record<string, string> = {
  cyan: "bg-cyan-400",
  amber: "bg-amber-400",
  purple: "bg-purple-400",
  emerald: "bg-emerald-400",
  rose: "bg-rose-400",
  blue: "bg-blue-400",
}

// ── JAKUB KREHEL ENTER ANIMATION RECIPE ──
const enterAnimation = {
  initial: { opacity: 0, y: 8, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { type: "spring", duration: 0.45, bounce: 0 }
}

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.06 } }
}

export default function ServicesHeroPro() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [cycleIdx, setCycleIdx] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  // Text cycling effect - respect reduced motion
  useEffect(() => {
    if (prefersReducedMotion) return
    const t = setInterval(() => {
      setCycleIdx((p) => (p + 1) % CYCLE_WORDS.length)
    }, CYCLE_MS)
    return () => clearInterval(t)
  }, [prefersReducedMotion])

  const filteredServices = activeFilter === "all"
    ? SERVICES
    : activeFilter === "microsoft"
    ? SERVICES.filter(s => ["sharepoint", "power", "analytics"].includes(s.id))
    : activeFilter === "ai"
    ? SERVICES.filter(s => s.id === "ai")
    : SERVICES.filter(s => ["web", "mobile"].includes(s.id))

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-[#fafafa]">
      {/* ── SUBTLE NOISE OVERLAY (Fixed, not scrolling) ── */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-32 md:px-12">
        {/* ── HEADER ── */}
        <motion.div 
          className="mb-8 text-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* EYEBROW */}
          <motion.span 
            variants={enterAnimation}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 shadow-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
              Our Expertise
            </span>
          </motion.span>

          {/* MASSIVE HEADLINE WITH TEXT CYCLE */}
          <motion.h1 
            variants={enterAnimation}
            className="mb-6 text-[clamp(48px,7vw,96px)] font-light leading-[0.95] tracking-[-0.03em] text-zinc-900"
          >
            Engineering
            <br />
            <span className="font-medium">
              <AnimatePresence mode="wait">
                <motion.span
                  key={cycleIdx}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
                  className="inline-block text-cyan-600"
                >
                  {CYCLE_WORDS[cycleIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.p 
            variants={enterAnimation}
            className="mx-auto max-w-xl text-lg font-light leading-relaxed text-zinc-500"
          >
            From Microsoft enterprise solutions to cutting-edge AI integration — 
            technology that drives business outcomes.
          </motion.p>
        </motion.div>

        {/* ── FILTER TABS - Double-bezel with spring physics ── */}
        <motion.div 
          variants={enterAnimation}
          initial="initial"
          animate="animate"
          className="mb-12 flex flex-wrap items-center justify-center gap-2"
        >
          {FILTERS.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                activeFilter === tab.id
                  ? "bg-zinc-900 text-white"
                  : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200"
              }`}
            >
              {tab.label}
              {activeFilter === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full bg-zinc-900 -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* ── BENTO GRID - Asymmetrical with Double-bezel ── */}
        <motion.div 
          className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => {
              const Icon = service.icon
              const isLarge = service.size === "large"
              const colorClass = colorMap[service.color]

              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                  className={`group ${isLarge ? "md:col-span-2 md:row-span-2" : ""}`}
                >
                  <Link href={service.href} className="block h-full">
                    {/* Outer shell - Double-bezel */}
                    <div className="h-full rounded-[2rem] border border-zinc-200 bg-white p-1.5 shadow-sm transition-all duration-200 group-hover:border-zinc-300 group-hover:shadow-md">
                      {/* Inner core */}
                      <div className={`relative h-full overflow-hidden rounded-[calc(2rem-0.375rem)] border border-zinc-100 bg-zinc-50/50 p-6 transition-all duration-200 ${isLarge ? "p-8" : "p-6"}`}>
                        {/* Accent line */}
                        <div className={`absolute inset-x-0 top-0 h-0.5 ${colorClass} opacity-0 transition-opacity duration-200 group-hover:opacity-100`} />

                        {/* Icon */}
                        <div className={`mb-4 flex items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-400 shadow-sm transition-all duration-200 group-hover:text-zinc-600 ${isLarge ? "h-14 w-14" : "h-12 w-12"}`}>
                          <Icon />
                        </div>

                        {/* Content */}
                        <h3 className={`mb-1 font-medium text-zinc-900 ${isLarge ? "text-2xl" : "text-lg"}`}>
                          {service.title}
                        </h3>
                        <p className={`mb-3 text-sm font-medium ${colorClass.replace("bg-", "text-")}`}>
                          {service.subtitle}
                        </p>
                        <p className={`leading-relaxed text-zinc-500 ${isLarge ? "text-base" : "text-sm"}`}>
                          {service.description}
                        </p>

                        {/* Arrow - appears on hover */}
                        <div className="mt-4 flex items-center gap-2 text-zinc-400 transition-all duration-200 group-hover:text-zinc-900">
                          <span className="text-sm font-medium">Explore</span>
                          <span className="transition-transform duration-200 group-hover:translate-x-1">
                            <Icons.ArrowUp />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="mb-6 text-zinc-500">
            Need something custom? We tailor solutions to your exact requirements.
          </p>
          
          {/* Button-in-button CTA with magnetic physics */}
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-3 rounded-full bg-zinc-900 px-7 py-4 text-sm font-medium text-white transition-all duration-200 active:scale-[0.98] hover:bg-zinc-800"
          >
            Discuss Your Project
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:scale-105">
              <span className="text-white transition-transform duration-200 group-hover:rotate-45">
                <Icons.ArrowUp />
              </span>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
