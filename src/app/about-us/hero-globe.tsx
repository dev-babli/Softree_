"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight, Globe2, MapPin, Zap } from "lucide-react"

const GLOBAL_HUBS = [
  { city: "Kolkata", country: "India", role: "Global HQ", timezone: "IST", angle: 90, distance: 0 },
  { city: "London", country: "UK", role: "Europe Hub", timezone: "GMT", angle: 0, distance: 140 },
  { city: "New York", country: "USA", role: "Americas Hub", timezone: "EST", angle: 270, distance: 140 },
  { city: "Dubai", country: "UAE", role: "Middle East", timezone: "GST", angle: 45, distance: 120 },
]

const STATS = [
  { value: "12+", label: "Years", sub: "Excellence" },
  { value: "200+", label: "Projects", sub: "Delivered" },
  { value: "50+", label: "Global", sub: "Clients" },
  { value: "24/7", label: "Support", sub: "Coverage" },
]

export default function AboutHeroGlobe() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Ambient Glow */}
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 px-6 py-32 lg:grid-cols-2 lg:py-0">
        {/* LEFT - Content */}
        <div className="flex flex-col justify-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium tracking-wider text-white/80 backdrop-blur-sm">
              <Globe2 className="h-3.5 w-3.5 text-cyan-400" />
              GLOBAL OFFSHORE PARTNER
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 text-4xl font-light leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            Bridging global talent
            <br />
            <span className="font-semibold">
              with enterprise outcomes
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8 max-w-lg text-lg leading-relaxed text-white/60"
          >
            From our headquarters in India to delivery hubs across the UK, US, 
            and Middle East — we unite world-class engineering with enterprise 
            discipline. One team. One process. Zero handoffs.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:gap-3"
            >
              Start Your Project
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/5"
            >
              <Zap className="h-4 w-4 text-cyan-400" />
              Explore Services
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 grid grid-cols-4 gap-6"
          >
            {STATS.map((stat, i) => (
              <div key={i} className="text-left">
                <div className="text-2xl font-bold text-white md:text-3xl">{stat.value}</div>
                <div className="text-xs text-white/40">{stat.label}</div>
                <div className="text-[10px] uppercase tracking-wider text-cyan-400">{stat.sub}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT - Globe Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative hidden lg:flex lg:h-[500px] lg:w-[500px] lg:items-center lg:justify-center"
        >
          {/* Outer Orbit Ring */}
          <div className="absolute h-[400px] w-[400px] rounded-full border border-white/10" />
          
          {/* Inner Orbit Ring */}
          <div className="absolute h-[280px] w-[280px] rounded-full border border-white/5" />

          {/* Center Hub - India */}
          <div className="absolute left-1/2 top-1/2 z-20 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-2xl shadow-cyan-500/25">
            <MapPin className="h-6 w-6 text-white" />
            <span className="mt-1 text-[10px] font-bold text-white">INDIA HQ</span>
          </div>

          {/* Connection Lines */}
          <svg className="absolute inset-0 h-full w-full" style={{ transform: "rotate(-90deg)" }}>
            {GLOBAL_HUBS.filter(h => h.distance > 0).map((hub, i) => {
              const angle = (hub.angle * Math.PI) / 180
              const x = 50 + (hub.distance / 250) * 50 * Math.cos(angle)
              const y = 50 + (hub.distance / 250) * 50 * Math.sin(angle)
              return (
                <line
                  key={i}
                  x1="50%"
                  y1="50%"
                  x2={`${x}%`}
                  y2={`${y}%`}
                  stroke="rgba(0,217,255,0.2)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="8"
                    to="0"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </line>
              )
            })}
          </svg>

          {/* Satellite Hubs */}
          {GLOBAL_HUBS.filter(h => h.distance > 0).map((hub, i) => {
            const angle = (hub.angle * Math.PI) / 180
            const x = 50 + (hub.distance / 250) * 50 * Math.cos(angle)
            const y = 50 + (hub.distance / 250) * 50 * Math.sin(angle)
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.15 }}
                className="absolute flex flex-col items-center"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
                  <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                </div>
                <div className="mt-2 whitespace-nowrap text-center">
                  <div className="text-xs font-medium text-white">{hub.city}</div>
                  <div className="text-[10px] text-white/50">{hub.role}</div>
                </div>
              </motion.div>
            )
          })}

          {/* Rotating Animation Indicator */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute h-[350px] w-[350px] rounded-full border border-dashed border-white/5"
          />
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  )
}
