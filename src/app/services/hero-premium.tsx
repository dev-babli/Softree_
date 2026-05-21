"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { EASE_T } from "@/lib/motion"

const CUSTOM_EASE = [0.32, 0.72, 0, 1] as [number, number, number, number]
const SERVICES_TICKER = [
  "SharePoint",
  "SPFx",
  "Power Apps",
  "Power BI",
  "Web Apps",
  "Mobile",
  "AI Agents",
]

export default function ServicesHeroPremium() {
  const [mounted, setMounted] = useState(false)
  const [tickerIndex, setTickerIndex] = useState(0)
  const [tickerVisible, setTickerVisible] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Cycling word ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerVisible(false)
      setTimeout(() => {
        setTickerIndex((i) => (i + 1) % SERVICES_TICKER.length)
        setTickerVisible(true)
      }, 320)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#050505] min-h-[100vh] flex flex-col justify-center py-32 md:py-40 lg:py-48 overflow-hidden"
    >
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#f97316]/15 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-[-10%] w-[600px] h-[600px] bg-[#f97316]/10 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#f97316]/5 rounded-full blur-[200px]"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
        backgroundSize: "52px 52px",
      }} />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12 w-full">
        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: CUSTOM_EASE as any }}
        >
          <div className="h-[1px] w-8 bg-[#f97316]/70" />
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#f97316]">
            Our Services
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-[clamp(44px,7vw,96px)] font-black leading-[1.02] tracking-tight text-white mb-2"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: CUSTOM_EASE as any }}
        >
          We build things
        </motion.h1>

        {/* Italic + cycling word line */}
        <motion.div
          className="flex items-baseline gap-4 mb-12 flex-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.4, ease: CUSTOM_EASE as any }}
        >
          <h1 className="text-[clamp(44px,7vw,96px)] font-normal italic leading-[1.02] tracking-tight text-white/40">
            that matter —
          </h1>
          <div className="overflow-hidden h-[clamp(44px,7vw,96px)] flex items-center">
            <motion.span
              key={tickerIndex}
              className="text-[clamp(44px,7vw,96px)] font-black leading-[1.02] tracking-tight text-[#f97316] block"
              initial={{ opacity: 0, y: 10 }}
              animate={tickerVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: CUSTOM_EASE as any }}
            >
              {SERVICES_TICKER[tickerIndex]}
            </motion.span>
          </div>
        </motion.div>

        {/* Sub-copy + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.5, ease: CUSTOM_EASE as any }}
        >
          <p className="text-base leading-relaxed text-white/50 font-light max-w-[540px] mb-8">
            From Microsoft 365 platforms to AI-powered agents — we design,
            build, and ship enterprise software that teams actually use.
          </p>

          <div className="flex gap-4">
            {/* Primary CTA */}
            <motion.button
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#f97316] px-8 py-4 transition-all duration-700 hover:bg-[#fbbf24] hover:shadow-[0_20px_60px_-20px_rgba(249,115,22,0.4)] active:scale-[0.97]"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="text-sm font-semibold text-[#09090f] tracking-[0.04em]">Get in touch</span>
              <div className="relative h-8 w-8 rounded-full bg-[#09090f]/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-110">
                <ArrowUpRight className="h-4 w-4 text-[#09090f]" />
              </div>
            </motion.button>

            {/* Secondary CTA */}
            <motion.button
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white/5 px-8 py-4 ring-1 ring-white/10 transition-all duration-700 hover:bg-white/10 hover:ring-white/20 hover:shadow-[0_20px_60px_-20px_rgba(255,255,255,0.1)] active:scale-[0.97]"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="text-sm font-semibold text-white/70 tracking-[0.04em] group-hover:text-white/90">View our work</span>
              <div className="relative h-8 w-8 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-110">
                <ArrowUpRight className="h-4 w-4 text-white/70 group-hover:text-white" />
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Stat badges with Double-Bezel */}
        <motion.div
          className="flex gap-4 mt-16 flex-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.6, ease: CUSTOM_EASE as any }}
        >
          {[
            { value: "7+", label: "Service areas" },
            { value: "50+", label: "Delivered projects" },
            { value: "M365", label: "Certified stack" },
            { value: "AI-first", label: "Approach" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.7 + i * 0.1, ease: CUSTOM_EASE as any }}
            >
              {/* Outer Shell */}
              <div className="relative bg-white/5 rounded-2xl p-1 ring-1 ring-white/10 transition-all duration-700 hover:bg-white/8 hover:ring-white/15 hover:shadow-[0_0_40px_-20px_rgba(249,115,22,0.15)]">
                {/* Inner Core */}
                <div className="relative rounded-[calc(1rem-0.25rem)] bg-[#0a0a1a]/80 p-5 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-700 hover:bg-[#0a0a1a]/90">
                  <div className="text-2xl font-bold text-white leading-none mb-2">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-medium text-white/40 uppercase tracking-[0.05em]">
                    {stat.label}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-gradient-to-b from-transparent to-[#050505] pointer-events-none" />
    </section>
  )
}
