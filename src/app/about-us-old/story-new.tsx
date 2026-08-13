"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

const MILESTONES = [
  {
    year: "2012",
    title: "Founded in Kolkata",
    description: "Started with a vision to bridge the gap between enterprise needs and innovative technology solutions.",
  },
  {
    year: "2016",
    title: "Microsoft Partnership",
    description: "Became a certified Microsoft partner, specializing in SharePoint and Office 365 implementations.",
  },
  {
    year: "2019",
    title: "Global Expansion",
    description: "Expanded operations to UK, US, and Middle East, serving enterprise clients across three continents.",
  },
  {
    year: "2023",
    title: "AI Innovation Lab",
    description: "Launched dedicated AI practice, helping clients leverage GPT, Claude, and Azure OpenAI.",
  },
  {
    year: "2026",
    title: "Enterprise Leader",
    description: "Recognized as a leading Microsoft solutions provider with 200+ successful enterprise deployments.",
  },
]

export default function StorySectionPremium() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section ref={containerRef} className="relative w-full bg-[#fafafa] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Header */}
        <div className="mb-20 grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 block text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Our Journey
            </span>
            <h2 className="text-3xl font-light leading-tight tracking-tight text-zinc-900 md:text-5xl">
              From a small team to a{" "}
              <span className="font-semibold">global force</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-end"
          >
            <p className="text-lg leading-relaxed text-zinc-600">
              What started as a passionate group of technologists has evolved into 
              a global enterprise partner. Every milestone represents our commitment 
              to excellence and our clients&apos; trust.
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-zinc-200 lg:left-1/2 lg:-translate-x-1/2" />

          {MILESTONES.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative mb-12 lg:mb-24 ${
                index % 2 === 0 ? "lg:pr-[50%]" : "lg:pl-[50%]"
              }`}
            >
              {/* Dot */}
              <div
                className={`absolute left-8 h-4 w-4 rounded-full border-4 border-[#fafafa] bg-zinc-900 lg:left-1/2 lg:-translate-x-1/2 ${
                  index === MILESTONES.length - 1 ? "bg-emerald-500" : ""
                }`}
              />

              {/* Content */}
              <div
                className={`pl-20 lg:pl-0 ${
                  index % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16"
                }`}
              >
                <span className="mb-2 block text-sm font-bold text-zinc-400">
                  {milestone.year}
                </span>
                <h3 className="mb-2 text-xl font-semibold text-zinc-900">
                  {milestone.title}
                </h3>
                <p className="text-zinc-600 leading-relaxed">{milestone.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Image Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 grid gap-4 md:grid-cols-3"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-200">
            <Image
              src="/about/team-1.jpg"
              alt="Team collaboration"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-200 md:translate-y-8">
            <Image
              src="/about/office.jpg"
              alt="Modern office"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-200">
            <Image
              src="/about/team-2.jpg"
              alt="Team celebration"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
