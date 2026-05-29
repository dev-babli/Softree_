"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useSpring, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import Grainient from "./Grainient"
import { EASE_T } from "@/lib/motion"
import { COUNTRIES_SERVED, COUNTRIES_SERVED_NUMBER } from "@/lib/constants"

const CUSTOM_EASE = [0.32, 0.72, 0, 1] as [number, number, number, number]

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
          ease: CUSTOM_EASE as any,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

function WordReveal({
  text,
  delay = 0,
  className = "",
}: {
  text: string
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const words = text.split(" ")

  return (
    <div ref={ref} className={`flex flex-wrap gap-x-[0.3em] ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.05,
              ease: CUSTOM_EASE as any,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  )
}

export default function LightAboutMergedPremium() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [hoveredImage, setHoveredImage] = useState<number | null>(null)

  const stats = [
    { value: 50, prefix: "+", suffix: "", label: "Enterprise clients across 15+ industries" },
    { value: 98, suffix: "%", label: "Client retention rate year over year" },
    { value: 50, prefix: "+", suffix: "", label: "Microsoft-certified engineers on staff" },
    { value: COUNTRIES_SERVED_NUMBER, prefix: "+", label: "Countries with active client deployments" },
  ]

  return (
    <section ref={containerRef} id="about-us" className="relative w-full bg-[var(--legacy-050505)] py-32 md:py-40 lg:py-48 overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1852FF]/20 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--legacy-c86e4b)]/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.5, 0.65, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1852FF]/5 rounded-full blur-[200px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        {/* Top Section - Award Count & Content */}
        <div className="mb-24 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left - Award Count with Double-Bezel */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: CUSTOM_EASE as any }}
          >
            {/* Outer Shell */}
            <div className="relative bg-white/5 rounded-[2rem] p-2 ring-1 ring-white/10 transition-all duration-700 hover:bg-white/8 hover:ring-white/15 hover:shadow-[0_0_60px_-20px_rgba(24,82,255,0.15)]">
              {/* Inner Core */}
              <div className="relative bg-[#0a0a1a]/80 rounded-[calc(2rem-0.5rem)] p-8 md:p-12 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-700">

                {/* Badge */}
                <motion.div
                  className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#1852FF]/30 bg-[#1852FF]/10 px-4 py-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3, ease: CUSTOM_EASE as any }}
                >
                  <div className="h-2 w-2 rounded-full bg-[#1852FF]" />
                  <span className="text-xs font-medium text-[#1852FF] uppercase tracking-[0.2em]">About Us</span>
                </motion.div>

                {/* Award Count */}
                <div className="relative">
                  <motion.span
                    className="text-[140px] font-bold leading-none tracking-tighter tabular-nums text-white md:text-[180px] lg:text-[200px]"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1, delay: 0.4, ease: CUSTOM_EASE as any }}
                  >
                    <AnimatedNumber value={COUNTRIES_SERVED_NUMBER} delay={0.6} />
                    <motion.span
                      className="text-[#1852FF]"
                      animate={{
                        textShadow: [
                          "0 0 20px rgba(24,82,255,0.3)",
                          "0 0 40px rgba(24,82,255,0.6)",
                          "0 0 20px rgba(24,82,255,0.3)"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >+</motion.span>
                  </motion.span>

                  {/* Premium Globe Component */}
                  <motion.div
                    className="absolute -bottom-12 left-1/2 -translate-x-1/2 md:-bottom-16"
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                    transition={{ duration: 1, delay: 1, ease: CUSTOM_EASE as any }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="relative h-20 w-20 md:h-24 md:w-24">
                      {/* Outer Glow Ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-[#1852FF]/20 blur-xl"
                        animate={{
                          scale: [1, 1.4, 1],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Globe Circle */}
                      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#1852FF]/30 to-[#1852FF]/10 border border-[#1852FF]/40 backdrop-blur-md" />

                      {/* World Map */}
                      <svg
                        className="absolute inset-3 h-[calc(100%-24px)] w-[calc(100%-24px)] text-[#1852FF]"
                        viewBox="0 0 100 100"
                        fill="none"
                      >
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="45"
                          stroke="currentColor"
                          strokeWidth="1"
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={isInView ? { pathLength: 1 } : {}}
                          transition={{ duration: 1, delay: 0.2, ease: CUSTOM_EASE as any }}
                        />

                        {/* Continents */}
                        <motion.g
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 1 } : {}}
                          transition={{ duration: 1, delay: 0.9, ease: CUSTOM_EASE as any }}
                        >
                          <path d="M25,30 Q30,25 35,30 Q40,35 35,40 Q30,45 25,40 Q20,35 25,30" fill="currentColor" opacity="0.5" />
                          <path d="M48,28 Q52,25 55,28 Q58,32 55,35 Q52,38 48,35 Q45,32 48,28" fill="currentColor" opacity="0.5" />
                          <path d="M58,30 Q65,25 72,30 Q78,35 72,42 Q65,48 58,42 Q52,35 58,30" fill="currentColor" opacity="0.5" />
                          <path d="M45,45 Q50,42 55,45 Q58,50 55,58 Q50,65 45,58 Q42,50 45,45" fill="currentColor" opacity="0.5" />
                          <path d="M30,50 Q35,45 38,50 Q40,60 35,70 Q30,75 28,65 Q25,55 30,50" fill="currentColor" opacity="0.5" />
                          <path d="M70,55 Q75,52 78,55 Q80,60 78,65 Q75,68 70,65 Q67,60 70,55" fill="currentColor" opacity="0.5" />
                        </motion.g>

                        {/* Connection Lines */}
                        <motion.g
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 0.6 } : {}}
                          transition={{ duration: 0.8, delay: 0.5, ease: CUSTOM_EASE as any }}
                        >
                          <line x1="32" y1="35" x2="52" y2="32" stroke="currentColor" strokeWidth="0.5" />
                          <line x1="52" y1="32" x2="65" y2="36" stroke="currentColor" strokeWidth="0.5" />
                          <line x1="65" y1="36" x2="73" y2="60" stroke="currentColor" strokeWidth="0.5" />
                          <line x1="33" y1="60" x2="50" y2="52" stroke="currentColor" strokeWidth="0.5" />
                        </motion.g>

                        {/* Animated Nodes */}
                        <motion.g
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 1 } : {}}
                          transition={{ duration: 0.8, delay: 1.8, ease: CUSTOM_EASE }}
                        >
                          {[32, 52, 65, 73, 33, 50].map((x, i) => {
                            const y = [35, 32, 36, 60, 60, 52][i]
                            return (
                              <motion.circle
                                key={i}
                                cx={x}
                                cy={y}
                                r="2.5"
                                fill="#1852FF"
                                animate={{
                                  scale: [1, 1.4, 1],
                                  opacity: [0.7, 1, 0.7],
                                }}
                                transition={{
                                  duration: 2.5,
                                  repeat: Infinity,
                                  delay: i * 0.15,
                                  ease: "easeInOut",
                                }}
                              />
                            )
                          })}
                        </motion.g>
                      </svg>
                    </div>
                  </motion.div>

                  {/* Decorative Arrows */}
                  <motion.div
                    className="absolute -right-6 top-6 md:-right-10 md:top-10"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.9, ease: CUSTOM_EASE as any }}
                  >
                    <div className="relative">
                      <div className="absolute -left-20 -top-10 flex items-center gap-2">
                        <span className="text-xs font-medium text-white/50 uppercase tracking-[0.15em]">Global Reach</span>
                        <Image
                          src="https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/691f33702cc97b2f28589225_Award-Arrow-One.png"
                          alt=""
                          width={60}
                          height={30}
                          className="h-8 w-auto object-contain opacity-60"
                        />
                      </div>
                      <div className="absolute -bottom-10 -right-10 flex items-center gap-2">
                        <Image
                          src="https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/691f33700369e38aee50c1d5_Award-Arrow-Two.png"
                          alt=""
                          width={60}
                          height={30}
                          className="h-8 w-auto object-contain opacity-60"
                        />
                        <span className="text-xs font-medium text-white/50 uppercase tracking-[0.15em]">Recognition</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            className="flex flex-col justify-center lg:border-l lg:border-white/10 lg:pl-20"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: CUSTOM_EASE }}
          >
            <TextReveal delay={0.4}>
              <h3 className="mb-8 text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
                Enterprise software that delivers measurable outcomes.
              </h3>
            </TextReveal>
            <WordReveal
              text="We are a team of Microsoft-certified engineers, solution architects, and delivery specialists focused on one goal — turning complex business operations into scalable software systems."
              delay={0.5}
              className="mb-8 text-2xl font-semibold leading-tight text-[#1852FF] md:text-3xl"
            />
            <TextReveal delay={0.7}>
              <p className="mb-10 text-lg leading-relaxed text-white/60">
                Founded in 2020, Softree has grown from a small engineering team to a trusted technology partner for enterprises worldwide. We specialize in Microsoft platforms, AI integration, and cloud-native solutions that drive real business transformation.
              </p>
            </TextReveal>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9, ease: CUSTOM_EASE }}
            >
              <Link
                href="/case-studies"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white/10 px-8 py-4 ring-1 ring-white/20 transition-all duration-700 hover:bg-white/20 hover:shadow-[0_20px_60px_-20px_rgba(24,82,255,0.3)] active:scale-[0.97]"
              >
                <span className="text-sm font-medium text-white">View our client success stories</span>
                <div className="relative h-8 w-8 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-110">
                  <ArrowUpRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:rotate-45" />
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Mission / Vision Cards with Double-Bezel */}
        <motion.div
          className="mb-20 flex h-[350px] gap-6 lg:h-[450px]"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: CUSTOM_EASE }}
        >
          {/* Mission Card */}
          <motion.div
            className="group/card relative flex-1 overflow-hidden rounded-[2rem]"
            initial={false}
            animate={{
              flex: hoveredImage === 0 ? 1.6 : hoveredImage === 1 ? 0.7 : 1,
            }}
            transition={{ duration: 0.7, ease: CUSTOM_EASE }}
            onMouseEnter={() => setHoveredImage(0)}
            onMouseLeave={() => setHoveredImage(null)}
          >
            {/* Outer Shell */}
            <div className="relative h-full w-full bg-white/5 rounded-[2rem] p-1 ring-1 ring-white/10">
              {/* Inner Core */}
              <div className="relative h-full w-full rounded-[calc(2rem-0.25rem)] overflow-hidden backdrop-blur-xl">
                <Grainient
                  color1="#C8E0FF"
                  color2="#5C9DFF"
                  color3="#E8F2FF"
                  timeSpeed={0.2}
                  colorBalance={-0.12}
                  warpStrength={1.2}
                  warpFrequency={4.2}
                  warpSpeed={1.35}
                  warpAmplitude={44}
                  blendAngle={-18}
                  blendSoftness={0.08}
                  rotationAmount={420}
                  noiseScale={2.4}
                  grainAmount={0.12}
                  grainScale={2.2}
                  grainAnimated
                  contrast={1.38}
                  saturation={1.12}
                  zoom={0.86}
                  className="absolute inset-0 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.18),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.58))]" />
                <div className="absolute inset-0 flex flex-col justify-between p-8 text-white md:p-10 lg:p-12">
                  <div className="inline-flex w-max items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    Mission
                  </div>
                  <div className="max-w-[560px]">
                    <h4 className="text-3xl font-bold leading-[0.95] tracking-[-0.05em] md:text-5xl">
                      Engineer solutions that scale with your ambition.
                    </h4>
                    <p className="mt-5 max-w-[450px] text-sm font-medium leading-relaxed text-white/78 md:text-base">
                      We architect enterprise systems that integrate seamlessly with Microsoft ecosystems, automate complex workflows, and scale securely across global operations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            className="group/card relative flex-1 overflow-hidden rounded-[2rem]"
            initial={false}
            animate={{
              flex: hoveredImage === 1 ? 1.6 : hoveredImage === 0 ? 0.7 : 1,
            }}
            transition={{ duration: 0.7, ease: CUSTOM_EASE }}
            onMouseEnter={() => setHoveredImage(1)}
            onMouseLeave={() => setHoveredImage(null)}
          >
            {/* Outer Shell */}
            <div className="relative h-full w-full bg-white/5 rounded-[2rem] p-1 ring-1 ring-white/10">
              {/* Inner Core */}
              <div className="relative h-full w-full rounded-[calc(2rem-0.25rem)] overflow-hidden backdrop-blur-xl">
                <Grainient
                  color1="#C2DDFF"
                  color2="#66B2FF"
                  color3="#E0EFFF"
                  timeSpeed={0.18}
                  colorBalance={-0.05}
                  warpStrength={1.0}
                  warpFrequency={5.6}
                  warpSpeed={1.15}
                  warpAmplitude={52}
                  blendAngle={22}
                  blendSoftness={0.06}
                  rotationAmount={520}
                  noiseScale={2.0}
                  grainAmount={0.1}
                  grainScale={2.4}
                  grainAnimated
                  contrast={1.45}
                  saturation={1.08}
                  centerX={0.08}
                  centerY={-0.04}
                  zoom={0.9}
                  className="absolute inset-0 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.18),transparent_30%),linear-gradient(180deg,rgba(0,0,0,0.14),rgba(0,0,0,0.62))]" />
                <div className="absolute inset-0 flex flex-col justify-between p-8 text-white md:p-10 lg:p-12">
                  <div className="inline-flex w-max items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] backdrop-blur-md group-hover/card:bg-white/15 group-hover/card:border-white/30 transition-all duration-500">
                    <motion.span
                      className="h-1.5 w-1.5 rounded-full bg-white"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    />
                    Vision
                  </div>
                  <div className="max-w-[600px]">
                    <h4 className="text-3xl font-bold leading-[0.95] tracking-[-0.05em] md:text-5xl">
                      Lead the future of enterprise AI and cloud.
                    </h4>
                    <p className="mt-5 max-w-[480px] text-sm font-medium leading-relaxed text-white/78 md:text-base">
                      Our vision is to be the definitive technology partner for enterprises embracing AI, modernizing legacy systems, and building cloud-native competitive advantages.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="border-t border-white/10 pt-16"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: CUSTOM_EASE }}
        >
          <div className="grid grid-cols-2 gap-12 lg:grid-cols-4 lg:gap-0">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className={`relative ${index < stats.length - 1 ? "lg:border-r lg:border-white/10" : ""}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: CUSTOM_EASE as any }}
              >
                <div className="p-6 first:pl-0 lg:px-12 lg:p-0">
                  <div className="mb-3 text-5xl font-bold tabular-nums text-white lg:text-6xl">
                    <AnimatedNumber
                      value={stat.value}
                      prefix={stat.prefix || ""}
                      suffix={stat.suffix || ""}
                      delay={0.4 + index * 0.25}
                    />
                  </div>
                  <motion.p
                    className="text-sm text-white/50"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 1 + index * 0.15, ease: CUSTOM_EASE as any }}
                  >
                    {stat.label}
                  </motion.p>
                  <motion.div
                    className="mt-4 h-0.5 origin-left bg-[#1852FF]"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 1.2 + index * 0.15, ease: CUSTOM_EASE as any }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Stats Grid */}
        <motion.div
          className="mt-24 grid grid-cols-1 gap-10 lg:grid-cols-3 lg:items-center"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.3, ease: CUSTOM_EASE }}
        >
          {/* Our Approach Card */}
          <motion.div
            className="relative aspect-4/3 overflow-hidden rounded-[2rem] lg:col-span-1"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, delay: 0.4, ease: CUSTOM_EASE }}
          >
            {/* Outer Shell */}
            <div className="relative h-full w-full bg-white/5 rounded-[2rem] p-1 ring-1 ring-white/10">
              {/* Inner Core */}
              <div className="relative h-full w-full rounded-[calc(2rem-0.25rem)] overflow-hidden backdrop-blur-xl">
                <Grainient
                  color1="#C8E0FF"
                  color2="#5CA8FF"
                  color3="#EFF6FF"
                  timeSpeed={0.22}
                  colorBalance={-0.08}
                  warpStrength={1.4}
                  warpFrequency={4.8}
                  warpSpeed={1.6}
                  warpAmplitude={40}
                  blendAngle={12}
                  blendSoftness={0.1}
                  rotationAmount={380}
                  noiseScale={2.6}
                  grainAmount={0.14}
                  grainScale={1.8}
                  grainAnimated
                  contrast={1.42}
                  saturation={1.15}
                  centerY={0.06}
                  zoom={0.88}
                  className="absolute inset-0"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.18),transparent_32%),linear-gradient(180deg,rgba(0,0,0,0.16),rgba(0,0,0,0.54))]" />
                <div className="absolute inset-0 flex flex-col justify-between p-8 text-white md:p-10">
                  <div className="inline-flex w-max items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    Our Approach
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold leading-[0.95] tracking-[-0.04em] md:text-4xl">
                      Senior teams, proven delivery.
                    </h4>
                    <p className="mt-4 max-w-[360px] text-sm font-medium leading-relaxed text-white/78">
                      Microsoft-certified engineers, structured sprints, and transparent reporting. We embed with your teams and deliver on schedule.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-6 lg:col-span-2">
            {/* 95% Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, ease: CUSTOM_EASE }}
            >
              {/* Outer Shell */}
              <div className="relative bg-white/5 rounded-[2rem] p-1 ring-1 ring-white/10 transition-all duration-700 ease-[var(--legacy-ease-0_32_0_72_0_1)] hover:bg-white/10 hover:shadow-[0_30px_70px_-20px_rgba(24,82,255,0.2)]">
                {/* Inner Core */}
                <div className="relative rounded-[calc(2rem-0.25rem)] bg-[#0a0a1a]/80 p-8 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                  <div className="mb-3 flex items-baseline tabular-nums">
                    <span className="text-6xl font-bold text-[#1852FF] md:text-7xl">
                      <AnimatedNumber value={95} delay={0.7} />
                    </span>
                    <span className="text-6xl font-bold text-[#1852FF] md:text-7xl">%</span>
                  </div>
                  <p className="text-sm text-white/60">Client Retention Rate</p>
                </div>
              </div>
            </motion.div>

            {/* 125+ Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6, ease: CUSTOM_EASE }}
            >
              {/* Outer Shell */}
              <div className="relative bg-white/5 rounded-[2rem] p-1 ring-1 ring-white/10 transition-all duration-700 ease-[var(--legacy-ease-0_32_0_72_0_1)] hover:bg-white/10 hover:shadow-[0_30px_70px_-20px_rgba(24,82,255,0.2)]">
                {/* Inner Core */}
                <div className="relative rounded-[calc(2rem-0.25rem)] bg-[#0a0a1a]/80 p-8 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                  <div className="mb-3 flex items-baseline tabular-nums">
                    <span className="text-6xl font-bold text-white md:text-7xl">
                      <AnimatedNumber value={125} delay={0.8} />
                    </span>
                    <span className="text-6xl font-bold text-[#1852FF] md:text-7xl">+</span>
                  </div>
                  <p className="text-sm text-white/60">Successful Enterprise Deliveries</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
