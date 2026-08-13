"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Play } from "lucide-react"

const STATS = [
  { value: "12+", label: "Years of Excellence" },
  { value: "200+", label: "Projects Delivered" },
  { value: "50+", label: "Global Clients" },
  { value: "98%", label: "Client Satisfaction" },
]

export default function AboutHeroPremium() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background Video/Image with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#0a0a0a] z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent z-10" />
        <Image
          src="/about/hero-bg.jpg"
          alt="Team collaboration"
          fill
          className="object-cover"
          priority
        />
        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 flex min-h-screen flex-col justify-end px-6 pb-24 pt-32 md:px-12 lg:px-20"
      >
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium tracking-wider text-white/80 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            ABOUT SOFTREE
          </span>
        </motion.div>

        {/* Main Headline */}
        <div className="max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 text-4xl font-light leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl"
          >
            Building the future of
            <br />
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              enterprise technology
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-10 max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl"
          >
            We are a global team of engineers, designers, and strategists dedicated to 
            transforming how businesses operate through innovative Microsoft solutions and 
            AI-powered automation.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:gap-3 hover:bg-white/90"
            >
              Start a Project
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
            <button className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                <Play className="h-3 w-3 fill-white" />
              </span>
              Watch Our Story
            </button>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 grid grid-cols-2 gap-px border-t border-white/10 bg-white/5 backdrop-blur-sm md:grid-cols-4 lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:mt-0"
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-start border-b border-white/10 p-6 md:border-b-0 md:border-r md:border-white/10 md:last:border-r-0 lg:p-8"
            >
              <span className="text-3xl font-bold text-white md:text-4xl">{stat.value}</span>
              <span className="mt-1 text-xs uppercase tracking-wider text-white/50">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-8 top-1/3 z-20 hidden lg:block"
      >
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-white/60">Innovation Hub</p>
              <p className="text-sm font-medium text-white">Microsoft Gold Partner</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
