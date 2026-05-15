"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const AWARDS = [
  {
    id: 1,
    name: "ISO 9001:2015",
    info: "Quality Management",
    logo: "/images/iso.png",
    description: "Certified quality management systems for consistent service delivery.",
  },
  {
    id: 2,
    name: "ISO 27001",
    info: "Information Security",
    logo: "/images/iso1.png",
    description: "International standard for information security management.",
  },
  {
    id: 3,
    name: "Microsoft Gold Partner",
    info: "Cloud Productivity",
    logo: "/images/power-plat.png",
    description: "Highest level of Microsoft partnership certification.",
  },
  {
    id: 4,
    name: "Top App Developer",
    info: "Clutch 2024",
    logo: "/images/mobile.png",
    description: "Recognized among top app development companies.",
  },
]

export default function AboutAwardsSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-[#F3F0EE] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
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
              Recognition
            </span>
          </div>
          <h2 className="text-[clamp(32px,4.5vw,56px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[#141413]">
            Awards & Certifications
          </h2>
        </motion.div>

        {/* Awards Grid - Framer Motion only, no GSAP */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {AWARDS.map((award, index) => (
            <motion.div
              key={award.id}
              data-award-card
              className="group relative overflow-hidden rounded-2xl border border-[#141413]/10 bg-white p-6 transition-all duration-500 hover:border-[#FF5812]/30 hover:shadow-[0_20px_50px_-15px_rgba(255,88,18,0.15)] md:p-8"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.23, 1, 0.32, 1],
              }}
              whileHover={{ y: -5 }}
            >
              {/* Background glow on hover */}
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#FF5812]/5 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              {/* Content */}
              <div className="relative flex h-full flex-col justify-between">
                {/* Top - Award Info */}
                <div>
                  <h3 className="mb-1 text-xl font-bold tracking-tight text-[#141413] md:text-2xl">
                    {award.name}
                  </h3>
                  <p className="mb-3 text-sm font-medium text-[#FF5812]">
                    {award.info}
                  </p>
                  <p className="text-sm text-[#141413]/60">
                    {award.description}
                  </p>
                </div>

                {/* Bottom - Logo */}
                <div className="mt-6 flex justify-end">
                  <div className="relative h-16 w-16 transition-transform duration-500 group-hover:scale-110 md:h-20 md:w-20">
                    <Image
                      src={award.logo}
                      alt={award.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="mx-auto max-w-2xl text-lg italic text-[#141413]/60">
            &ldquo;Excellence is not an act, but a habit.&rdquo; — Our commitment to quality
          </p>
        </motion.div>
      </div>
    </section>
  )
}
