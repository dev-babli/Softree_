"use client"

import { motion, useInView, useSpring, useMotionValue } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { TrendingUp, Users, Clock, Award, Globe, Zap } from "lucide-react"

const STATS = [
  {
    icon: TrendingUp,
    value: 200,
    suffix: "+",
    label: "Enterprise Projects",
    description: "Delivered across 15+ industries",
    color: "#FF5812",
    size: "large",
  },
  {
    icon: Users,
    value: 98,
    suffix: "%",
    label: "Client Retention",
    description: "Long-term partnerships",
    color: "#1852FF",
    size: "medium",
  },
  {
    icon: Clock,
    value: 47,
    suffix: "",
    label: "Day Median Delivery",
    description: "From kickoff to go-live",
    color: "#00C9A7",
    size: "medium",
  },
  {
    icon: Award,
    value: 50,
    suffix: "+",
    label: "Certifications",
    description: "Microsoft Gold & ISO certified",
    color: "#7928CA",
    size: "medium",
  },
  {
    icon: Globe,
    value: 12,
    suffix: "",
    label: "Countries Served",
    description: "Global delivery capability",
    color: "#FF6B6B",
    size: "small",
  },
  {
    icon: Zap,
    value: 99,
    suffix: "%",
    label: "On-Time Delivery",
    description: "Fixed scope, no surprises",
    color: "#FFD93D",
    size: "small",
  },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  })
  const [displayValue, setDisplayValue] = useState(0)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, motionValue, value])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest))
    })
    return unsubscribe
  }, [springValue])

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}{suffix}
    </span>
  )
}

export default function StatsBentoGrid() {
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
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#FF5812]" />
            <span className="text-xs font-medium tracking-wider text-[#141413]/70 uppercase">
              By The Numbers
            </span>
          </div>
          <h2 className="text-[clamp(32px,4.5vw,56px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[#141413]">
            Impact That Speaks
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[#141413]/60">
            Measurable results from years of enterprise delivery excellence
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Large card - spans 2 columns on lg */}
          <motion.div
            className="lg:col-span-2 lg:row-span-2"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div
              className="group relative h-full overflow-hidden rounded-3xl border border-[#141413]/10 bg-white p-8 transition-all duration-500 hover:border-[#FF5812]/30 hover:shadow-[0_20px_60px_-15px_rgba(255,88,18,0.2)] md:p-12"
            >
              {/* Background gradient on hover */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at 80% 20%, ${STATS[0].color}15 0%, transparent 60%)`,
                }}
              />

              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <div
                    className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${STATS[0].color}15`, color: STATS[0].color }}
                  >
                    <TrendingUp className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <div
                    className="text-[clamp(64px,10vw,120px)] font-bold leading-none tracking-tight"
                    style={{ color: STATS[0].color }}
                  >
                    <AnimatedNumber value={STATS[0].value} suffix={STATS[0].suffix} />
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="mb-2 text-2xl font-semibold text-[#141413]">
                    {STATS[0].label}
                  </h3>
                  <p className="text-[#141413]/60">{STATS[0].description}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Medium cards */}
          {STATS.slice(1, 4).map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <div
                  className="group relative overflow-hidden rounded-3xl border border-[#141413]/10 bg-white p-6 transition-all duration-500 hover:shadow-lg md:p-8"
                  style={{
                    borderColor: `color-mix(in srgb, ${stat.color} 0%, #14141310)`,
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ backgroundColor: stat.color }}
                  />

                  <div className="relative">
                    <div
                      className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <div
                      className="mb-2 text-[clamp(36px,5vw,56px)] font-bold leading-none"
                      style={{ color: stat.color }}
                    >
                      <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                    </div>
                    <h3 className="mb-1 text-lg font-semibold text-[#141413]">
                      {stat.label}
                    </h3>
                    <p className="text-sm text-[#141413]/60">{stat.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}

          {/* Small cards - bottom row */}
          {STATS.slice(4).map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <div className="group flex items-center gap-4 rounded-2xl border border-[#141413]/10 bg-white p-5 transition-all duration-300 hover:border-[#141413]/20">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <div
                      className="text-2xl font-bold leading-none"
                      style={{ color: stat.color }}
                    >
                      <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm font-medium text-[#141413]">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
