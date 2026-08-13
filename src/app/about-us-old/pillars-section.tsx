"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Shield, Layers, Brain, Globe2, Zap, Users, ArrowUpRight } from "lucide-react"
import Link from "next/link"

const PILLARS = [
  {
    icon: Shield,
    tag: "01",
    title: "Enterprise-First Engineering",
    description: "Every engagement is architected for scale, security, and longevity — not just the MVP. We build what your enterprise can actually run.",
    color: "cyan",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    icon: Layers,
    tag: "02",
    title: "Microsoft Stack Specialists",
    description: "SharePoint, Power Platform, Azure, Teams, Fabric — deep expertise across the full Microsoft ecosystem, not just surface integrations.",
    color: "blue",
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    icon: Brain,
    tag: "03",
    title: "AI-Native Delivery",
    description: "From GPT-4o to Claude — we design, train, and deploy AI agents, RAG pipelines, and document intelligence into production workflows.",
    color: "amber",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    icon: Globe2,
    tag: "04",
    title: "Global Delivery, Zero Handoffs",
    description: "Unified teams across UK, US, India, Middle East. One PM, one process, one quality bar — no fragmented offshore chaos.",
    color: "emerald",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    icon: Zap,
    tag: "05",
    title: "Agile at Enterprise Scale",
    description: "We bring startup agility to enterprise rigor. Fast iteration without sacrificing governance, documentation, or compliance.",
    color: "purple",
    gradient: "from-purple-400 to-pink-500",
  },
  {
    icon: Users,
    tag: "06",
    title: "Partners, Not Vendors",
    description: "We embed in your teams, understand your business, and own outcomes together. Your success is our success metric.",
    color: "rose",
    gradient: "from-rose-400 to-red-500",
  },
]

const STATS = [
  { value: "99.9%", label: "Uptime SLA", description: "Across 14 cloud regions" },
  { value: "14", label: "Global Regions", description: "Edge-deployed & monitored" },
  { value: "500+", label: "Engineers", description: "Senior tenure, avg 9.1 yr" },
  { value: "90", label: "Days to Prod", description: "From strategy to shipping" },
]

export default function PillarsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section ref={containerRef} className="relative w-full bg-[#fafafa] py-24 md:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2"
          >
            <span className="h-px w-8 bg-zinc-300" />
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Why Softree
            </span>
            <span className="h-px w-8 bg-zinc-300" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-3xl text-3xl font-light leading-tight text-zinc-900 md:text-5xl"
          >
            Built for enterprises.
            <br />
            <span className="font-semibold">Delivered globally.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600"
          >
            Softree is a technology delivery partner trusted by enterprise teams across the UK, 
            Middle East, and Asia — turning strategy into production-grade software.
          </motion.p>
        </div>

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 md:grid-cols-4"
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center bg-white p-6 text-center transition-colors hover:bg-zinc-50"
            >
              <span className="text-3xl font-bold text-zinc-900 md:text-4xl">{stat.value}</span>
              <span className="mt-1 text-sm font-medium text-zinc-900">{stat.label}</span>
              <span className="text-xs text-zinc-500">{stat.description}</span>
            </div>
          ))}
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.tag}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8 transition-all duration-500 hover:shadow-xl"
              >
                {/* Gradient Accent on Hover */}
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${pillar.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                {/* Icon & Tag */}
                <div className="mb-6 flex items-start justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${pillar.gradient} text-white shadow-lg`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-mono tracking-widest text-zinc-400">{pillar.tag}</span>
                </div>

                {/* Content */}
                <h3 className="mb-3 text-lg font-semibold text-zinc-900">
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-600">
                  {pillar.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-zinc-900 px-8 py-4 text-sm font-semibold text-white transition-all hover:gap-3"
          >
            Book a discovery call
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center rounded-full border border-zinc-300 px-8 py-4 text-sm font-medium text-zinc-700 transition-all hover:border-zinc-400 hover:bg-zinc-50"
          >
            View our services
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
