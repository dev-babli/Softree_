"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const MILESTONES = [
  {
    year: "2018",
    title: "Founded",
    description: "Softree started with a vision to bridge enterprise gaps through technology.",
    highlight: true,
  },
  {
    year: "2019",
    title: "First Enterprise Client",
    description: "Delivered our first major SharePoint intranet for a Fortune 500 company.",
    highlight: false,
  },
  {
    year: "2020",
    title: "Power Platform Practice",
    description: "Launched dedicated Power Apps and Power BI development services.",
    highlight: false,
  },
  {
    year: "2021",
    title: "ISO 9001 Certified",
    description: "Achieved international quality management certification.",
    highlight: true,
  },
  {
    year: "2022",
    title: "Microsoft Gold Partner",
    description: "Earned highest tier Microsoft partnership status.",
    highlight: true,
  },
  {
    year: "2023",
    title: "AI & Automation Wing",
    description: "Expanded into agentic AI and intelligent automation solutions.",
    highlight: false,
  },
  {
    year: "2024",
    title: "200+ Projects Delivered",
    description: "Crossed milestone of 200 successful enterprise deliveries.",
    highlight: true,
  },
]

export default function AboutTimeline() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-white py-20 md:py-28"
    >
      {/* Top border */}
      <div className="absolute left-0 right-0 top-0 h-px bg-[#141413]/10" />

      <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
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
              Our Journey
            </span>
          </div>
          <h2 className="text-[clamp(32px,4.5vw,56px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[#141413]">
            Company Timeline
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 h-full w-px bg-[#141413]/10 md:left-1/2 md:-translate-x-px" />

          {/* Milestones */}
          <div className="space-y-12">
            {MILESTONES.map((milestone, index) => {
              const isLeft = index % 2 === 0

              return (
                <motion.div
                  key={milestone.year}
                  className={`relative flex items-start gap-8 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 ${
                      isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                    }`}
                  >
                    <div
                      className={`rounded-2xl border p-6 transition-all duration-300 ${
                        milestone.highlight
                          ? "border-[#FF5812]/30 bg-[#FF5812]/5"
                          : "border-[#141413]/10 bg-white"
                      }`}
                    >
                      <span
                        className={`mb-2 inline-block text-sm font-bold ${
                          milestone.highlight ? "text-[#FF5812]" : "text-[#141413]/40"
                        }`}
                      >
                        {milestone.year}
                      </span>
                      <h3 className="mb-2 text-xl font-semibold text-[#141413]">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-[#141413]/60">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Dot on timeline */}
                  <div className="absolute left-4 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-white shadow-sm md:left-1/2">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        milestone.highlight ? "bg-[#FF5812]" : "bg-[#141413]/20"
                      }`}
                    />
                  </div>

                  {/* Spacer for other side */}
                  <div className="hidden flex-1 md:block" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#141413]/10" />
    </section>
  )
}
