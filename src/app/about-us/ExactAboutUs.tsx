"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useSpring, useTransform } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight, Calendar, Users, Globe as GlobeIcon, Cpu, Code, LayoutGrid, Navigation, Award } from "lucide-react"
import { Globe } from "@/registry/magicui/globe"
import { EASE_T } from "@/lib/motion"

const EASE_OUT = EASE_T.silk

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

export default function ExactAboutUs() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section ref={containerRef} id="exact-about-us" className="w-full overflow-hidden bg-white pt-10 pb-20 lg:pt-12 lg:pb-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Top Section - Award Count & Content */}
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-start lg:grid-cols-2">
          {/* Left - Award Count */}
          <motion.div
            className="relative flex flex-col justify-center lg:pr-10"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE_OUT }}
          >
            {/* Badge */}
            <motion.div
              className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-[#1852FF]/20 bg-[#F0F4FF] px-3 py-1"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="h-1.5 w-1.5 rounded-full bg-[#1852FF]" />
              <span className="text-xs font-medium text-[#1852FF]">About Us</span>
            </motion.div>
 
            {/* Award Count with Globe Background */}
            <div className="relative isolate pt-1">
              {/* Orbital Lines and Globe */}
              <div className="pointer-events-none absolute -inset-10 -z-10 flex items-center justify-center opacity-60">
                {/* Thin circular/orbital lines */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-[280px] w-[280px] rounded-full border border-[#1852FF]/10" />
                  <div className="absolute h-[380px] w-[380px] rounded-full border border-[#1852FF]/10" />
                  <div className="absolute h-[480px] w-[480px] rounded-full border border-[#1852FF]/5" />
                </div>
 
                {/* We apply a mask/fade to make globe blend in better */}
                <div className="absolute inset-0 flex items-center justify-center scale-[0.95] opacity-80">
                  <Globe />
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
                  <span className="text-[90px] font-bold text-[#1852FF] md:text-[100px] lg:text-[120px]">+</span>
                </div>
                <div className="mt-1 flex flex-col text-[#0a0a1a]">
                  <span className="text-xl font-bold md:text-2xl lg:text-3xl">YEARS OF</span>
                  <span className="text-xl font-bold text-[#1852FF] md:text-2xl lg:text-3xl">ENGINEERING<br />EXCELLENCE</span>
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
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EEF2FF] shadow-inner">
                      <Navigation className="h-3 w-3 text-[#1852FF]" />
                    </div>
                    <span className="whitespace-pre-line text-[10px] font-semibold leading-tight text-[#0a0a1a]">
                      Global<br />Reach
                    </span>
                  </div>

                  {/* Trusted by Partners */}
                  <div className="translate-x-4 flex items-center gap-2 rounded-full border border-white/40 bg-white/60 p-1.5 pr-4 shadow-sm backdrop-blur-sm">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EEF2FF] shadow-inner">
                      <Award className="h-3 w-3 text-[#1852FF]" />
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
            className="flex flex-col justify-center pt-6 lg:border-l lg:border-[#0a0a1a]/10 lg:pl-10 lg:pt-0"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}
          >
            <TextReveal delay={0.3}>
              <h3 className="mb-4 text-2xl font-bold leading-tight tracking-tight text-[#0a0a1a] lg:text-3xl">
                Your global offshore development partner<span className="text-[#1852FF]">.</span>
              </h3>
            </TextReveal>

            {/* Three Statistics */}
            <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-2 border-b border-[#0a0a1a]/10 pb-4 divide-y sm:divide-y-0 sm:divide-x divide-[#0a0a1a]/10">
              {/* Stat 1 */}
              <motion.div
                className="flex flex-col pb-2 sm:pb-0 sm:pr-2"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Calendar className="mb-1.5 h-4 w-4 text-[#1852FF]" strokeWidth={1.5} />
                <span className="mb-0.5 text-lg font-bold tabular-nums text-[#1852FF]">2013</span>
                <span className="text-[10px] font-medium leading-tight text-[#0a0a1a]/70">Founded</span>
              </motion.div>

              {/* Stat 2 */}
              <motion.div
                className="flex flex-col pt-3 sm:pt-0 sm:px-2"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Users className="mb-1.5 h-4 w-4 text-[#1852FF]" strokeWidth={1.5} />
                <span className="mb-0.5 text-lg font-bold tabular-nums text-[#0a0a1a]">13+</span>
                <span className="text-[10px] font-medium leading-tight text-[#0a0a1a]/70">Years of Engineering Experience</span>
              </motion.div>

              {/* Stat 3 */}
              <motion.div
                className="flex flex-col pt-3 sm:pt-0 sm:pl-2"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <GlobeIcon className="mb-1.5 h-4 w-4 text-[#1852FF]" strokeWidth={1.5} />
                <span className="mb-0.5 text-lg font-bold text-[#1852FF]">Global</span>
                <span className="text-[10px] font-medium leading-tight text-[#0a0a1a]/70">Delivery Across Multiple Countries</span>
              </motion.div>
            </div>

            <TextReveal delay={0.6}>
              <p className="mb-5 text-xs leading-relaxed text-[#0a0a1a]/80">
                Softree is an offshore engineering partner helping businesses, technology companies, and partners extend their engineering capabilities. Our expertise spans across cutting-edge technologies and platforms to build, scale, and deliver digital solutions that drive real business impact.
              </p>
            </TextReveal>

            {/* Capability Rows */}
            <div className="mb-6 flex flex-col gap-2">
              {/* Row 1 */}
              <motion.div
                className="flex items-center gap-2.5 rounded-xl bg-[#F0EEFF] p-1.5 pr-4"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                  <Cpu className="h-4 w-4 text-[#6B4BFF]" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-wide text-[#6B4BFF]">AI CAPABILITIES</span>
                  <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-medium text-[#0a0a1a]/70">
                    <span>Agentic AI</span>
                    <span className="h-1 w-1 rounded-full bg-[#6B4BFF]/40"></span>
                    <span>Generative AI</span>
                    <span className="h-1 w-1 rounded-full bg-[#6B4BFF]/40"></span>
                    <span>AI Automation</span>
                    <span className="h-1 w-1 rounded-full bg-[#6B4BFF]/40"></span>
                    <span>RAG</span>
                  </div>
                </div>
              </motion.div>

              {/* Row 2 */}
              <motion.div
                className="flex items-center gap-2.5 rounded-xl bg-[#E6F8F5] p-1.5 pr-4"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                  <Code className="h-4 w-4 text-[#00A99D]" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-wide text-[#00A99D]">MODERN ENGINEERING</span>
                  <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-medium text-[#0a0a1a]/70">
                    <span>Web</span>
                    <span className="h-1 w-1 rounded-full bg-[#00A99D]/40"></span>
                    <span>Cloud</span>
                    <span className="h-1 w-1 rounded-full bg-[#00A99D]/40"></span>
                    <span>APIs</span>
                    <span className="h-1 w-1 rounded-full bg-[#00A99D]/40"></span>
                    <span>Applications</span>
                  </div>
                </div>
              </motion.div>

              {/* Row 3 */}
              <motion.div
                className="flex items-center gap-2.5 rounded-xl bg-[#FFF3E5] p-1.5 pr-4"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                  <LayoutGrid className="h-4 w-4 text-[#FF7A00]" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-wide text-[#FF7A00]">MICROSOFT & DATA</span>
                  <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-medium text-[#0a0a1a]/70">
                    <span>Power Platform</span>
                    <span className="h-1 w-1 rounded-full bg-[#FF7A00]/40"></span>
                    <span>SharePoint</span>
                    <span className="h-1 w-1 rounded-full bg-[#FF7A00]/40"></span>
                    <span>Azure</span>
                    <span className="h-1 w-1 rounded-full bg-[#FF7A00]/40"></span>
                    <span>Data & Analytics</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <Link
                href="/contact"
                className="group relative inline-flex w-fit items-center gap-2 overflow-hidden rounded-lg bg-[#0a0a1a] px-4 py-2 shadow-md transition-all duration-300 hover:-translate-y-px hover:shadow-lg active:scale-[0.97]"
              >
                <span className="text-xs font-semibold text-white">Explore offshore engagement models</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
