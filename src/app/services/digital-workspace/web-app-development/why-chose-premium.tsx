"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

const CUSTOM_EASE = [0.32, 0.72, 0, 1] as [number, number, number, number]

const whyChooseData = [
  {
    icon: <RocketIcon />,
    title: "Agile Engineering",
    desc: "Rapid iterations and modern delivery practices with continuous integration and deployment.",
  },
  {
    icon: <UsersIcon />,
    title: "Leadership Access",
    desc: "Direct communication with decision-makers and transparent project management.",
  },
  {
    icon: <ShieldIcon />,
    title: "Trusted Since 2013",
    desc: "A decade of proven enterprise delivery with 200+ satisfied clients globally.",
  },
  {
    icon: <SlidersIcon />,
    title: "Flexible Engagement",
    desc: "Scalable teams and adaptable delivery models aligned to your business goals.",
  },
]

const reviews = [
  {
    name: "Natasha Adams",
    company: "Wicked Point LLC",
    rating: 5,
    comment:
      "We had a very positive experience working with Softree Technology. The developers were responsive and delivery was on time. We appreciate the attention they gave our project and their great communication.",
    location: "Virginia",
  },
  {
    name: "Arkady Fedorovtsjev",
    company: "ECG Group",
    rating: 5,
    comment:
      "Overall, we are satisfied with our collaboration in the past and your last action and response to our reported issue, really makes a difference.",
    location: "Netherlands",
  },
  {
    name: "Darrell Trimble",
    company: "SP Marketplace",
    rating: 5,
    comment:
      "SOFTREE staff worked with us to learn our installation automation technology and built exactly what we needed.",
    location: "California",
  },
]

function RocketIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A10.6 10.6 0 0 1 22 4c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function SlidersIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="4" y1="21" y2="14" />
      <line x1="4" x2="4" y1="10" y2="3" />
      <line x1="12" x2="12" y1="21" y2="12" />
      <line x1="12" x2="12" y1="8" y2="3" />
      <line x1="20" x2="20" y1="21" y2="16" />
      <line x1="20" x2="20" y1="12" y2="3" />
      <line x1="1" x2="7" y1="14" y2="14" />
      <line x1="9" x2="15" y1="8" y2="8" />
      <line x1="17" x2="23" y1="16" y2="16" />
    </svg>
  )
}

function StarIcon({ filled, className }: { filled?: boolean; className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

export default function WhyChoosePremium() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const interval = setInterval(() => {
      setIndex((prev) => (prev >= reviews.length - 1 ? 0 : prev + 1))
    }, 4000)
    return () => clearInterval(interval)
  }, [paused])

  const nextReview = () => setIndex((prev) => (prev >= reviews.length - 1 ? 0 : prev + 1))
  const prevReview = () => setIndex((prev) => (prev <= 0 ? reviews.length - 1 : prev - 1))

  return (
    <section ref={containerRef} className="relative w-full bg-[#050505] py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#1852FF]/15 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-[-10%] w-[600px] h-[600px] bg-[#C86E4B]/10 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
        backgroundSize: "52px 52px",
      }} />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* LEFT: WHY CHOOSE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: CUSTOM_EASE }}
          >
            {/* Badge */}
            <motion.div
              className="relative inline-block mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: CUSTOM_EASE }}
            >
              <div className="absolute inset-0 bg-[#1852FF]/10 rounded-full blur-lg" />
              <span className="relative inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1852FF] px-4 py-2 rounded-full border border-[#1852FF]/20 bg-[#1852FF]/5 backdrop-blur-sm">
                Why Choose Softree
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="text-[clamp(28px,4vw,46px)] font-black leading-[1.1] text-white mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.3, ease: CUSTOM_EASE }}
            >
              Building{" "}
              <span className="text-white/40 font-normal">
                exceptional digital experiences
              </span>
            </motion.h2>

            {/* Why Choose Items */}
            <div className="space-y-6">
              {whyChooseData.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.4 + i * 0.1, ease: CUSTOM_EASE }}
                >
                  {/* Outer Shell */}
                  <div className="relative bg-white/5 rounded-2xl p-1 ring-1 ring-white/10 transition-all duration-700 hover:bg-white/8 hover:ring-white/15 hover:shadow-[0_0_40px_-20px_rgba(24,82,255,0.15)]">
                    {/* Inner Core */}
                    <div className="relative rounded-[calc(1rem-0.25rem)] bg-[#0a0a1a]/80 p-6 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-700 hover:bg-[#0a0a1a]/90 flex items-start gap-4">
                      {/* Icon */}
                      <div className="relative shrink-0">
                        <div className="absolute inset-0 bg-[#1852FF]/10 rounded-lg blur-md" />
                        <div className="relative h-12 w-12 rounded-lg border border-[#1852FF]/20 bg-[#1852FF]/10 flex items-center justify-center text-[#1852FF]">
                          {item.icon}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: TESTIMONIALS */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: CUSTOM_EASE }}
          >
            {/* Outer Shell */}
            <div className="relative bg-white/5 rounded-3xl p-1 ring-1 ring-white/10">
              {/* Inner Core */}
              <div className="relative rounded-[calc(1.5rem-0.25rem)] bg-[#0a0a1a]/80 p-8 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                {/* Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-[#C86E4B]/10 rounded-full blur-lg" />
                    <span className="relative inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C86E4B] px-4 py-2 rounded-full border border-[#C86E4B]/20 bg-[#C86E4B]/5 backdrop-blur-sm">
                      Client Reviews
                    </span>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPaused(!paused)}
                      className="relative h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
                    >
                      {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={prevReview}
                      className="relative h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={nextReview}
                      className="relative h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="relative">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: CUSTOM_EASE }}
                  >
                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} filled={i < reviews[index].rating} className="text-[#C86E4B]" />
                      ))}
                    </div>

                    {/* Comment */}
                    <p className="text-base leading-relaxed text-white/70 mb-6 italic">
                      &ldquo;{reviews[index].comment}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#1852FF] to-[#C86E4B] flex items-center justify-center text-white font-bold">
                        {reviews[index].name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <div className="text-white font-semibold">{reviews[index].name}</div>
                        <div className="text-sm text-white/50">{reviews[index].company}</div>
                        <div className="text-xs text-white/30">{reviews[index].location}</div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Progress Indicators */}
                <div className="flex gap-2 mt-8 justify-center">
                  {reviews.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      className={`h-1 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-[#1852FF]" : "w-2 bg-white/20"
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
