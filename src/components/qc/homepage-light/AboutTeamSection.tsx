"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const TEAM = [
  {
    name: "Leadership",
    role: "Strategy & Vision",
    image: "/images/team.avif",
    description: "Seasoned technology leaders with decades of combined experience in enterprise software, guiding our mission to deliver transformative solutions.",
  },
  {
    name: "Engineering",
    role: "Architecture & Development",
    image: "/images/digital.jpg",
    description: "Microsoft-certified engineers and cloud architects who design, build, and scale robust systems for complex enterprise environments.",
  },
  {
    name: "Delivery",
    role: "Project Excellence",
    image: "/images/project.png",
    description: "Agile practitioners and client partners ensuring every project meets deadlines, budgets, and exceeds quality expectations.",
  },
]

export default function AboutTeamSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-white py-10 md:py-14"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-5 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5812]" />
            <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-zinc-400/90 uppercase">
              Our Team
            </span>
          </div>
          <h2 className="text-[#0a0a1a] tracking-tight mb-4 flex flex-col items-center">
            <span className="font-black text-3xl md:text-5xl leading-[1.1] max-w-none block w-full">
              <span className="text-[#0a0a1a]">The Team Behind</span>{" "}
              <span className="text-[#FF5812] drop-shadow-[0_2px_12px_rgba(255,88,18,0.15)]">Every Solution</span>
            </span>
          </h2>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TEAM.map((member, index) => (
            <motion.div
              key={member.name}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_-12px_rgba(20,20,19,0.12)]"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--legacy-141413)]/60 via-transparent to-transparent" />
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="mb-1 text-xl font-semibold text-[var(--legacy-141413)]">
                  {member.name}
                </h3>
                <p className="mb-2 text-sm font-medium text-[#FF5812]">
                  {member.role}
                </p>
                <p className="text-sm text-[var(--legacy-141413)]/60">
                  {member.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
