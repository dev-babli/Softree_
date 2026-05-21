"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowUpRight, CheckCircle2, Clock, Users, Headset } from "lucide-react"
import { EASE_T } from "@/lib/motion"

const CUSTOM_EASE = [0.32, 0.72, 0, 1] as [number, number, number, number]

const engagementModels = [
  {
    icon: <Clock className="h-5 w-5" />,
    title: "Flexible Engagement",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Senior Experts",
  },
  {
    icon: <Headset className="h-5 w-5" />,
    title: "Dedicated Support",
  },
]

const pricingPlans = [
  {
    title: "Hourly Engagement",
    features: [
      "Pay only for actual development hours",
      "Ideal for audits, fixes, and feature enhancements",
      "Full transparency with real-time reporting",
    ],
  },
  {
    title: "Monthly Dedicated Developer",
    highlight: true,
    features: [
      "Dedicated engineer working exclusively on your project",
      "Fixed monthly cost with predictable delivery",
      "Best choice for startups & growing products",
    ],
  },
  {
    title: "Fixed-Scope Project",
    features: [
      "Clearly defined scope, timeline, and deliverables",
      "Zero budget surprises with upfront pricing",
      "Perfect for MVPs and enterprise launches",
    ],
  },
]

export default function ProcessPremium() {
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
        {/* Heading */}
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
              Engagement Models
            </span>
          </div>

          <h2 className="text-[clamp(28px,4vw,46px)] font-black leading-[1.1] text-white mb-4">
            Hire{" "}
            <span className="text-white/40 font-normal">
              Web Developers
            </span>
          </h2>

          <p className="text-sm text-white/50 max-w-2xl mx-auto">
            Flexible engagement models tailored to your project needs and business goals
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Highlights */}
          <div className="flex flex-col gap-4">
            {engagementModels.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: CUSTOM_EASE as any }}
              >
                {/* Outer Shell */}
                <div className="relative bg-white/5 rounded-2xl p-1 ring-1 ring-white/10 transition-all duration-700 hover:bg-white/8 hover:ring-white/15 hover:shadow-[0_0_40px_-20px_rgba(24,82,255,0.15)]">
                  {/* Inner Core */}
                  <div className="relative rounded-[calc(1rem-0.25rem)] bg-[#0a0a1a]/80 p-5 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-700 hover:bg-[#0a0a1a]/90 flex items-center gap-4">
                    {/* Icon */}
                    <div className="relative shrink-0">
                      <div className="absolute inset-0 bg-[#1852FF]/10 rounded-lg blur-md" />
                      <div className="relative h-11 w-11 rounded-lg border border-[#1852FF]/20 bg-[#1852FF]/10 flex items-center justify-center text-[#1852FF]">
                        {item.icon}
                      </div>
                    </div>

                    {/* Text */}
                    <h3 className="text-white font-semibold">{item.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pricing Cards */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: CUSTOM_EASE as any }}
                className={plan.highlight ? "md:-translate-y-4" : ""}
              >
                {/* Outer Shell */}
                <div className={`relative rounded-3xl p-1 ring-1 transition-all duration-700 ${
                  plan.highlight 
                    ? "bg-[#1852FF]/20 ring-[#1852FF]/30 hover:ring-[#1852FF]/50 hover:shadow-[0_0_60px_-20px_rgba(24,82,255,0.3)]"
                    : "bg-white/5 ring-white/10 hover:bg-white/8 hover:ring-white/15"
                }`}>
                  {/* Inner Core */}
                  <div className={`relative rounded-[calc(1.5rem-0.25rem)] p-8 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-700 ${
                    plan.highlight ? "bg-[#0a0a1a]/90" : "bg-[#0a0a1a]/80 hover:bg-[#0a0a1a]/90"
                  }`}>
                    {/* Recommended Badge */}
                    {plan.highlight && (
                      <motion.div
                        className="absolute -top-3 left-1/2 -translate-x-1/2"
                        initial={{ opacity: 0, y: -10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.5 + i * 0.1, ease: CUSTOM_EASE as any }}
                      >
                        <div className="relative">
                          <div className="absolute inset-0 bg-[#1852FF]/20 rounded-full blur-lg" />
                          <span className="relative inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1852FF] px-4 py-1.5 rounded-full border border-[#1852FF]/30 bg-[#1852FF]/10 backdrop-blur-sm">
                            Recommended
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {/* Title */}
                    <h3 className={`text-xl font-bold mb-6 ${plan.highlight ? "text-white" : "text-white/90"}`}>
                      {plan.title}
                    </h3>

                    {/* Features */}
                    <ul className="space-y-4">
                      {plan.features.map((f, idx) => (
                        <li
                          key={idx}
                          className={`flex gap-3 leading-relaxed ${plan.highlight ? "text-white/80" : "text-white/60"}`}
                        >
                          <div className="relative shrink-0 mt-0.5">
                            <div className="absolute inset-0 bg-[#1852FF]/10 rounded-full blur-md" />
                            <div className={`relative h-5 w-5 rounded-full flex items-center justify-center ${
                              plan.highlight ? "bg-[#1852FF]/20" : "bg-[#1852FF]/10"
                            }`}>
                              <CheckCircle2 className={`h-3 w-3 ${plan.highlight ? "text-[#1852FF]" : "text-[#1852FF]/70"}`} />
                            </div>
                          </div>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6, ease: CUSTOM_EASE as any }}
        >
          <motion.button
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#1852FF] px-8 py-4 transition-all duration-700 hover:bg-[#3b82f6] hover:shadow-[0_20px_60px_-20px_rgba(24,82,255,0.4)] active:scale-[0.97]"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="text-sm font-semibold text-white tracking-[0.04em]">Get a Free Consultation</span>
            <div className="relative h-8 w-8 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-110">
              <ArrowUpRight className="h-4 w-4 text-white" />
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
