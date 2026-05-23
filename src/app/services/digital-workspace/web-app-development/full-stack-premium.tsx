"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { EASE_T } from "@/lib/motion"

const CUSTOM_EASE = [0.32, 0.72, 0, 1] as [number, number, number, number]

const steps = [
  { label: "Discovery & Research", angle: -90 },
  { label: "UI / UX Design", angle: -45 },
  { label: "Frontend", angle: 5 },
  { label: "Backend Development", angle: 45 },
  { label: "Testing & QA", angle: 90 },
  { label: "Deployment", angle: 135 },
  { label: "Monitoring", angle: 180 },
  { label: "Maintenance & Support", angle: -135 },
]

const benefits = [
  "Strategy-driven approach for scalable solutions",
  "Secure architecture built with industry best practices",
  "High-performance apps optimized for speed & reliability",
]

export default function FullStackPremium() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const center = 300
  const radius = 250

  return (
    <section ref={containerRef} className="relative w-full bg-[#050505] py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#1852FF]/15 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 right-[-10%] w-[600px] h-[600px] bg-[#C86E4B]/10 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
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

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: CUSTOM_EASE as any }}
          >
            {/* Badge */}
            <motion.div
              className="relative inline-block mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: CUSTOM_EASE as any }}
            >
              <div className="absolute inset-0 bg-[#1852FF]/10 rounded-full blur-lg" />
              <span className="relative inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1852FF] px-4 py-2 rounded-full border border-[#1852FF]/20 bg-[#1852FF]/5 backdrop-blur-sm">
                Development Process
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="text-[clamp(28px,4vw,46px)] font-black leading-[1.1] text-white mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.3, ease: CUSTOM_EASE as any }}
            >
              Web development{" "}
              <span className="text-white/40 font-normal">
                process that delivers
              </span>
            </motion.h2>

            <motion.h3
              className="text-[clamp(28px,4vw,46px)] font-black leading-[1.1] text-[#1852FF] mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.35, ease: CUSTOM_EASE as any }}
            >
              results
            </motion.h3>

            {/* Benefits */}
            <ul className="space-y-5">
              {benefits.map((text, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.4 + i * 0.1, ease: CUSTOM_EASE as any }}
                >
                  <div className="relative shrink-0 mt-1">
                    <div className="absolute inset-0 bg-[#1852FF]/10 rounded-full blur-md" />
                    <div className="relative h-5 w-5 rounded-full bg-[#1852FF]/20 flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5L12 2z"
                          fill="#1852FF"
                        />
                      </svg>
                    </div>
                  </div>
                  <span className="text-white/60 leading-relaxed">{text}</span>
                </motion.li>
              ))}
            </ul>

            {/* CTA */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.7, ease: CUSTOM_EASE as any }}
            >
              <motion.button
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#1852FF] px-8 py-4 transition-all duration-700 hover:bg-[#3b82f6] hover:shadow-[0_20px_60px_-20px_rgba(24,82,255,0.4)] active:scale-[0.97]"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="text-sm font-semibold text-white tracking-[0.04em]">Start Your Project</span>
                <div className="relative h-8 w-8 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-110">
                  <ArrowUpRight className="h-4 w-4 text-white" />
                </div>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* RIGHT DIAGRAM */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: CUSTOM_EASE as any }}
          >
            {/* Outer Shell */}
            <div className="relative bg-white/5 rounded-3xl p-1 ring-1 ring-white/10">
              {/* Inner Core */}
              <div className="relative rounded-[calc(1.5rem-0.25rem)] bg-[#0a0a1a]/80 p-8 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <svg
                  viewBox="-40 -40 680 680"
                  className="w-full max-w-xl overflow-visible"
                >
                  {/* DEFINITIONS */}
                  <defs>
                    {/* stroke gradient */}
                    <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#1852FF" />
                      <stop offset="50%" stopColor="#C86E4B" />
                      <stop offset="100%" stopColor="#1852FF" />
                    </linearGradient>

                    {/* fills */}
                    <radialGradient id="ringFillOuter">
                      <stop offset="0%" stopColor="#1852FF" stopOpacity="0.10" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </radialGradient>

                    <radialGradient id="ringFillMiddle">
                      <stop offset="0%" stopColor="#C86E4B" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </radialGradient>

                    <radialGradient id="ringFillInner">
                      <stop offset="0%" stopColor="#1852FF" stopOpacity="0.10" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </radialGradient>

                    {/* center glow */}
                    <radialGradient id="pulse">
                      <stop offset="0%" stopColor="#1852FF" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </radialGradient>

                    {/* shadow */}
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow
                        dx="0"
                        dy="20"
                        stdDeviation="25"
                        floodColor="#000"
                        floodOpacity="0.18"
                      />
                    </filter>
                  </defs>

                  {/* CENTER PULSE */}
                  <circle cx={center} cy={center} r="160" fill="url(#pulse)" />

                  {/* RINGS */}
                  <circle
                    cx={center}
                    cy={center}
                    r="220"
                    stroke="url(#ringGrad)"
                    strokeWidth="3"
                    fill="url(#ringFillOuter)"
                  />

                  <circle
                    cx={center}
                    cy={center}
                    r="150"
                    stroke="url(#ringGrad)"
                    strokeWidth="2"
                    fill="url(#ringFillMiddle)"
                  />

                  <circle
                    cx={center}
                    cy={center}
                    r="90"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="2"
                    fill="url(#ringFillInner)"
                  />

                  {/* CENTER CARD */}
                  <rect
                    x="200"
                    y="260"
                    width="200"
                    height="80"
                    rx="22"
                    fill="#0a0a1a"
                    stroke="#1852FF"
                    strokeWidth="2"
                    filter="url(#shadow)"
                  />

                  <text
                    x={center}
                    y={305}
                    textAnchor="middle"
                    fontSize="16"
                    fontWeight="700"
                    fill="#ffffff"
                  >
                    WEB SUCCESS
                  </text>

                  {/* INNER LABELS */}
                  <text
                    x={center}
                    y="225"
                    textAnchor="middle"
                    fill="#1852FF"
                    fontSize="12"
                    fontWeight="600"
                  >
                    Strategy & Planning
                  </text>

                  <text
                    x={center}
                    y="380"
                    textAnchor="middle"
                    fill="#C86E4B"
                    fontSize="12"
                    fontWeight="600"
                  >
                    Continuous Improvement
                  </text>

                  {/* PROCESS PILLS */}
                  {steps.map((step, index) => {
                    const rad = (step.angle * Math.PI) / 180
                    const safeRadius = radius - 15
                    const x = center + safeRadius * Math.cos(rad)
                    const y = center + safeRadius * Math.sin(rad)

                    const colors = ["#1852FF", "#C86E4B", "#1852FF", "#C86E4B", "#1852FF", "#C86E4B"]
                    const color = colors[index % colors.length]

                    return (
                      <g key={index} transform={`translate(${x}, ${y})`}>
                        <rect
                          x="-60"
                          y="-18"
                          width="120"
                          height="36"
                          rx="18"
                          fill="#0a0a1a"
                          opacity="0.9"
                        />

                        <rect
                          x="-60"
                          y="-18"
                          width="120"
                          height="36"
                          rx="18"
                          fill="none"
                          stroke={color}
                          strokeWidth="1.5"
                        />

                        <text
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="11"
                          fontWeight="600"
                          fill="#ffffff"
                        >
                          {step.label}
                        </text>
                      </g>
                    )
                  })}
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
