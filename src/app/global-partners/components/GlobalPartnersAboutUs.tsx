"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useSpring, useTransform } from "framer-motion"
import Link from "next/link"
import { FlowButton } from "@/components/ui/flow-button"
import { Calendar, Users, Globe as GlobeIcon, Cpu, Code, LayoutGrid, Navigation, Award } from "lucide-react"
import { Globe } from "@/registry/magicui/globe"
import type { COBEOptions } from "cobe"
import { EASE_T } from "@/lib/motion"

const EASE_OUT = EASE_T.silk

const ORANGE_GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => { },
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [255 / 255, 88 / 255, 18 / 255],
  glowColor: [1, 0.94, 0.9],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.05 },
    { location: [23.8103, 90.4125], size: 0.03 },
    { location: [30.0444, 31.2357], size: 0.04 },
    { location: [39.9042, 116.4074], size: 0.04 },
    { location: [40.7128, -74.006], size: 0.05 },
    { location: [51.5074, -0.1278], size: 0.04 },
    { location: [48.8566, 2.3522], size: 0.03 },
    { location: [-23.5505, -46.6333], size: 0.04 },
    { location: [1.3521, 103.8198], size: 0.03 },
  ],
}

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  delay = 0,
}: {
  value: number
  prefix?: string
  suffix?: string
  delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [hasAnimated, setHasAnimated] = useState(false)

  const spring = useSpring(Math.round(value * 0.6), {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  })

  const display = useTransform(spring, (current) => Math.round(current))
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => setDisplayValue(v))
    return unsubscribe
  }, [display])

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timeout = setTimeout(() => {
        spring.set(value)
        setHasAnimated(true)
      }, delay * 1000)
      return () => clearTimeout(timeout)
    }
  }, [isInView, hasAnimated, spring, value, delay])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {displayValue}
      {suffix}
    </span>
  )
}

function TextReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{
          duration: 0.8,
          delay,
          ease: EASE_OUT,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export function GlobalPartnersAboutUs() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section ref={containerRef} id="exact-about-us" className="w-full overflow-hidden bg-white pt-10 pb-20 lg:pt-12 lg:pb-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Top Section - Award Count & Content */}
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-stretch lg:grid-cols-2">
          {/* Left - Award Count */}
          <motion.div
            className="relative flex flex-col justify-between h-full lg:pr-10"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE_OUT }}
          >
            {/* Badge */}
            <motion.div
              className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-[#FF5812]/20 bg-[#FFF5EE] px-3.5 py-1.5"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="h-1.5 w-1.5 rounded-full bg-[#FF5812]" />
              <span className="typo-caption text-[#FF5812]">BECOME A GLOBAL PARTNER</span>
            </motion.div>

            {/* Award Count with Globe Background */}
            <div className="relative isolate flex-1 flex flex-col justify-center py-4">
              {/* Orbital Lines and Globe */}
              <div className="pointer-events-none absolute -inset-10 -z-10 flex items-center justify-center opacity-60">
                {/* Thin circular/orbital lines */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-[280px] w-[280px] rounded-full border border-[#FF5812]/15" />
                  <div className="absolute h-[380px] w-[380px] rounded-full border border-[#FF5812]/15" />
                  <div className="absolute h-[480px] w-[480px] rounded-full border border-[#FF5812]/10" />
                </div>

                {/* We apply a mask/fade to make globe blend in better */}
                <div className="absolute inset-0 flex items-center justify-center scale-[0.95] opacity-80">
                  <Globe config={ORANGE_GLOBE_CONFIG} />
                </div>
              </div>

              <motion.div
                className="relative z-10 flex flex-col"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT }}
              >
                <div className="flex items-baseline leading-none tracking-tighter">
                  <span className="text-[100px] font-bold text-[#0a0a1a] md:text-[120px] lg:text-[140px]">
                    <AnimatedNumber value={13} delay={0.5} />
                  </span>
                  <span className="text-[90px] font-bold text-[#FF5812] md:text-[100px] lg:text-[120px]">+</span>
                </div>
                <div className="mt-1 flex flex-col text-[#0a0a1a]">
                  <span className="text-xl font-bold md:text-2xl lg:text-3xl">YEARS OF</span>
                  <span className="text-xl font-bold text-[#FF5812] md:text-2xl lg:text-3xl">ENGINEERING<br />EXCELLENCE</span>
                </div>
              </motion.div>

              {/* Floating Indicators */}
              <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2 md:-right-2 lg:-right-6"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="relative flex flex-col gap-3">
                  {/* Global Reach */}
                  <div className="flex items-center gap-2 rounded-full border border-white/40 bg-white/60 p-1.5 pr-4 shadow-sm backdrop-blur-sm">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FFF5EE] shadow-inner">
                      <Navigation className="h-3 w-3 text-[#FF5812]" />
                    </div>
                    <span className="whitespace-pre-line text-[10px] font-semibold leading-tight text-[#0a0a1a]">
                      Global<br />Reach
                    </span>
                  </div>

                  {/* Trusted by Partners */}
                  <div className="translate-x-4 flex items-center gap-2 rounded-full border border-white/40 bg-white/60 p-1.5 pr-4 shadow-sm backdrop-blur-sm">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FFF5EE] shadow-inner">
                      <Award className="h-3 w-3 text-[#FF5812]" />
                    </div>
                    <span className="whitespace-pre-line text-[10px] font-semibold leading-tight text-[#0a0a1a]">
                      Trusted by<br />Partners
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            className="flex flex-col justify-between h-full pt-8 lg:border-l lg:border-[#0a0a1a]/10 lg:pl-10 lg:pt-0"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}
          >
            <div>
              <TextReveal delay={0.3}>
                <h2 className="typo-heading-3 mb-4 font-bold leading-tight tracking-tight text-[#0a0a1a]">
                  Looking for a Technology Partner <span className="text-[#FF5812]">You Can Rely On?</span>
                </h2>
              </TextReveal>

              <TextReveal delay={0.4}>
                <div className="typo-body-lg mb-8 space-y-4 leading-relaxed text-[#0a0a1a]/85">
                  <p>
                    Extend your AI, Microsoft, Data and Software Engineering capabilities with a flexible technology partner built for long-term collaboration.
                  </p>
                  <p>
                    Whether you need additional engineering capacity, white-label delivery or a strategic technology partner, let's explore how we can work together.
                  </p>
                </div>
              </TextReveal>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-2"
            >
              <FlowButton
                href="/contact"
                text="Become a Global Partner"
                variant="orange-filled"
              />
              <p className="mt-4 text-sm font-semibold tracking-wide text-[#0a0a1a]/60 uppercase">
                AI • Microsoft • Data • Engineering • Global Delivery
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
