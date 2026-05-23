"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { EASE_T } from "@/lib/motion"

const CUSTOM_EASE = [0.32, 0.72, 0, 1] as [number, number, number, number]

const qualitySteps = [
  {
    step: "01",
    title: "Experience-Driven Design",
    points: [
      "User-first UX strategy backed by research",
      "Consistent brand identity across interfaces",
      "Mobile-first, fully responsive layouts",
      "Modern UI crafted for engagement & conversion",
    ],
  },
  {
    step: "02",
    title: "Engineering Excellence",
    points: [
      "Clean, modular & scalable code architecture",
      "Industry-proven development standards",
      "Git-driven workflows with version control",
      "Automated testing for reliability & quality",
    ],
  },
  {
    step: "03",
    title: "Enterprise-Grade Security",
    points: [
      "Security-first development lifecycle",
      "Continuous vulnerability monitoring",
      "Secure cloud & infrastructure hardening",
      "Data encryption and access control policies",
    ],
  },
]

export default function QualityPremium() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

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
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: CUSTOM_EASE as any }}
        >
          {/* Badge */}
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-[#1852FF]/10 rounded-full blur-lg" />
            <span className="relative inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1852FF] px-4 py-2 rounded-full border border-[#1852FF]/20 bg-[#1852FF]/5 backdrop-blur-sm">
              Quality Framework
            </span>
          </div>

          <h2 className="text-[clamp(28px,4vw,46px)] font-black leading-[1.1] text-white mb-4">
            Our Standard for Building{" "}
            <span className="text-[#1852FF]">
              Reliable, Scalable
            </span>
          </h2>

          <p className="text-sm text-white/50 max-w-3xl mx-auto leading-relaxed">
            We follow a disciplined framework that ensures performance,
            security, and scalability at every stage — from thoughtful design to
            production-ready engineering.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Line */}
          <div className="hidden md:block absolute top-10 left-0 right-0 h-px bg-white/10" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {qualitySteps.map((item, index) => {
              const isFeatured = index === 1

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.2 + index * 0.1, ease: CUSTOM_EASE as any }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step Number */}
                  <motion.div
                    className="relative z-10 mb-10"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-[#1852FF]/10 rounded-full blur-lg" />
                    <div className="relative h-14 w-14 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center">
                      <span className="text-sm font-semibold text-white">
                        {item.step}
                      </span>
                    </div>
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ y: -8 }}
                    className={`relative w-full min-h-[340px] rounded-3xl p-1 ring-1 transition-all duration-700 ${
                      isFeatured
                        ? "bg-[#1852FF]/20 ring-[#1852FF]/30 hover:ring-[#1852FF]/50 hover:shadow-[0_0_60px_-20px_rgba(24,82,255,0.3)] md:-translate-y-4"
                        : "bg-white/5 ring-white/10 hover:bg-white/8 hover:ring-white/15 hover:shadow-[0_0_40px_-20px_rgba(24,82,255,0.15)]"
                    }`}
                  >
                    {/* Inner Core */}
                    <div className={`relative h-full rounded-[calc(1.5rem-0.25rem)] p-8 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-700 ${
                      isFeatured ? "bg-[#0a0a1a]/90" : "bg-[#0a0a1a]/80 hover:bg-[#0a0a1a]/90"
                    }`}>
                      {/* Title */}
                      <h3 className={`mb-6 text-lg font-bold ${isFeatured ? "text-white" : "text-white/90"}`}>
                        {item.title}
                      </h3>

                      {/* Points */}
                      <ul className={`space-y-4 text-sm text-left ${isFeatured ? "text-white/80" : "text-white/60"}`}>
                        {item.points.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            {/* Icon */}
                            <div className="relative shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5">
                              <div className="absolute inset-0 bg-[#1852FF]/10 rounded-full blur-md" />
                              <div className={`relative h-5 w-5 rounded-full flex items-center justify-center ${
                                isFeatured ? "bg-[#1852FF]/20" : "bg-[#1852FF]/10"
                              }`}>
                                <CheckCircle2 className={`w-3 h-3 ${isFeatured ? "text-[#1852FF]" : "text-[#1852FF]/70"}`} />
                              </div>
                            </div>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
