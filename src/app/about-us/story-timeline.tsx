"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Rocket, Building2, Globe2, Brain, Award } from "lucide-react"

const MILESTONES = [
  {
    year: "2012",
    icon: Rocket,
    title: "Founded in Kolkata",
    description: "Started with a vision to bridge the gap between enterprise needs and innovative technology solutions. Small team, big ambitions.",
    highlight: "3 founders",
    color: "from-cyan-400 to-blue-500",
  },
  {
    year: "2016",
    icon: Building2,
    title: "Microsoft Partnership",
    description: "Became a certified Microsoft partner, specializing in SharePoint and Office 365 implementations for enterprise clients.",
    highlight: "Gold Partner",
    color: "from-blue-400 to-indigo-500",
  },
  {
    year: "2019",
    icon: Globe2,
    title: "Global Expansion",
    description: "Expanded operations to UK, US, and Middle East. Unified delivery model with teams across 3 continents.",
    highlight: "4 countries",
    color: "from-purple-400 to-pink-500",
  },
  {
    year: "2023",
    icon: Brain,
    title: "AI Innovation Lab",
    description: "Launched dedicated AI practice, helping clients leverage GPT, Claude, and Azure OpenAI in production workflows.",
    highlight: "50+ AI projects",
    color: "from-amber-400 to-orange-500",
  },
  {
    year: "2026",
    icon: Award,
    title: "Enterprise Leader",
    description: "Recognized as a leading Microsoft solutions provider with 200+ successful enterprise deployments across 50+ global clients.",
    highlight: "200+ projects",
    color: "from-emerald-400 to-teal-500",
  },
]

export default function StoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section ref={containerRef} className="relative w-full bg-[#0a0a0a] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Header */}
        <div className="mb-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/40"
          >
            <span className="h-px w-8 bg-white/20" />
            Our Journey
            <span className="h-px w-8 bg-white/20" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-3xl text-3xl font-light leading-tight text-white md:text-5xl"
          >
            From a small team to a{" "}
            <span className="font-semibold text-cyan-400">global force</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-white/50"
          >
            Every milestone represents our commitment to excellence and our clients&apos; trust.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent lg:left-1/2 lg:-translate-x-1/2" />

          {/* Milestones */}
          <div className="space-y-16">
            {MILESTONES.map((milestone, index) => {
              const Icon = milestone.icon
              const isLeft = index % 2 === 0

              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`relative flex flex-col gap-8 lg:flex-row lg:items-center ${
                    isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content Card */}
                  <div className={`flex-1 pl-20 lg:pl-0 ${isLeft ? "lg:pr-16 lg:text-right" : "lg:pl-16"}`}>
                    <div className={`group rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.04] ${isLeft ? "lg:ml-auto" : ""} max-w-lg`}>
                      {/* Year Badge */}
                      <div className={`mb-4 flex items-center gap-3 ${isLeft ? "lg:justify-end" : ""}`}>
                        <span className="text-3xl font-bold text-white">{milestone.year}</span>
                        <span className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${milestone.color} px-3 py-1 text-xs font-semibold text-white`}>
                          <Icon className="h-3 w-3" />
                          {milestone.highlight}
                        </span>
                      </div>

                      <h3 className="mb-2 text-xl font-semibold text-white">
                        {milestone.title}
                      </h3>
                      <p className="text-white/50 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="absolute left-8 lg:left-1/2 lg:-translate-x-1/2">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#0a0a0a] bg-gradient-to-br ${milestone.color} shadow-lg shadow-cyan-500/20`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden flex-1 lg:block" />
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Team Images Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 grid gap-4 md:grid-cols-3"
        >
          <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/about/team-1.jpg"
              alt="Team collaboration"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="text-sm font-medium text-white">Engineering Excellence</p>
              <p className="text-xs text-white/60">Kolkata HQ</p>
            </div>
          </div>
          <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl md:translate-y-8">
            <Image
              src="/about/office.jpg"
              alt="Modern office"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="text-sm font-medium text-white">State-of-the-art Infrastructure</p>
              <p className="text-xs text-white/60">Global Delivery Centers</p>
            </div>
          </div>
          <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/about/team-2.jpg"
              alt="Team celebration"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="text-sm font-medium text-white">Client Success Stories</p>
              <p className="text-xs text-white/60">Across 4 Continents</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
