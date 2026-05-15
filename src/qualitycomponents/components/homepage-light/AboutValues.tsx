"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Target, Users, Lightbulb, Shield, Zap, Heart } from "lucide-react"

const VALUES = [
  {
    icon: Target,
    title: "Client First",
    description: "Every decision starts with the client's success. We measure our wins by their outcomes.",
  },
  {
    icon: Lightbulb,
    title: "Innovation Driven",
    description: "We stay ahead of the curve — adopting agentic AI, modern stacks, and emerging tech.",
  },
  {
    icon: Shield,
    title: "Quality Obsessed",
    description: "ISO certified processes. Rigorous testing. Zero shortcuts on delivery standards.",
  },
  {
    icon: Zap,
    title: "Speed & Precision",
    description: "47-day median ship time. Fixed scope. Transparent milestones. No surprises.",
  },
  {
    icon: Users,
    title: "People Matter",
    description: "Our team is our strength. We invest in growth, wellbeing, and building together.",
  },
  {
    icon: Heart,
    title: "Long-term Partnerships",
    description: "98% client retention. We don't do one-off projects — we build lasting relationships.",
  },
]

export default function AboutValues() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-[#F3F0EE] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#FF5812]" />
            <span className="text-xs font-medium tracking-wider text-[#141413]/70 uppercase">
              Our Culture
            </span>
          </div>
          <h2 className="mb-4 text-[clamp(32px,4.5vw,56px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[#141413]">
            Mission & Values
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#141413]/60">
            The principles that guide every decision we make and every product we ship.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          className="mb-16 rounded-2xl border border-[#141413]/10 bg-white p-8 text-center md:p-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <blockquote className="mx-auto max-w-3xl">
            <p className="text-xl font-medium italic text-[#141413] md:text-2xl">
              &ldquo;To empower enterprises with technology that transforms — 
              delivered with speed, quality, and partnership at the core.&rdquo;
            </p>
          </blockquote>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.title}
                className="group rounded-2xl border border-[#141413]/10 bg-white p-6 transition-all duration-300 hover:border-[#FF5812]/30 hover:shadow-[0_8px_30px_-12px_rgba(255,88,18,0.12)] md:p-8"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + index * 0.08,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                {/* Icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF5812]/10 text-[#FF5812] transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="mb-2 text-lg font-semibold text-[#141413]">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#141413]/60">
                  {value.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
