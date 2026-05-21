"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, Pause, Play, MapPin } from "lucide-react"

const CUSTOM_EASE = [0.32, 0.72, 0, 1] as [number, number, number, number]

const testimonials = [
  {
    text: "SOFTREE staff worked with us to learn our installation automation technology and built exactly what we needed.",
    name: "Darrell Trimble",
    role: "CEO",
    location: "California",
    company: "SP Marketplace",
  },
  {
    text: "We had a very positive experience working with Softree Technology. The developers were responsive and delivery was on time. We appreciate the attention they gave our project and their great communication.",
    name: "Natasha Adams",
    role: "Partner",
    location: "Virginia",
    company: "Wicked Point LLC",
  },
  {
    text: "Overall, we are satisfied with our collaboration in the past and your last action and response to our reported issue, really makes a difference.",
    name: "Arkady Fedorovtsjev",
    role: "IT Specialist",
    location: "Netherlands",
    company: "ECG International",
  },
]

function StarIcon({ filled, className }: { filled?: boolean; className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

export default function TestimonialPremium() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const interval = setInterval(() => {
      setIndex((prev) => (prev >= testimonials.length - 1 ? 0 : prev + 1))
    }, 4000)
    return () => clearInterval(interval)
  }, [paused])

  const nextTestimonial = () => setIndex((prev) => (prev >= testimonials.length - 1 ? 0 : prev + 1))
  const prevTestimonial = () => setIndex((prev) => (prev <= 0 ? testimonials.length - 1 : prev - 1))

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
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: CUSTOM_EASE }}
        >
          {/* Badge */}
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-[#1852FF]/10 rounded-full blur-lg" />
            <span className="relative inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1852FF] px-4 py-2 rounded-full border border-[#1852FF]/20 bg-[#1852FF]/5 backdrop-blur-sm">
              Client Testimonials
            </span>
          </div>

          <h2 className="text-[clamp(28px,4vw,46px)] font-black leading-[1.1] text-white mb-4">
            What Our{" "}
            <span className="text-[#1852FF]">
              Clients Say
            </span>
          </h2>

          <p className="text-sm text-white/50 max-w-2xl mx-auto">
            Hear from the businesses we&apos;ve helped transform with our digital solutions
          </p>
        </motion.div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: CUSTOM_EASE }}
            >
              {/* Outer Shell */}
              <div className="relative bg-white/5 rounded-3xl p-1 ring-1 ring-white/10 transition-all duration-700 hover:bg-white/8 hover:ring-white/15 hover:shadow-[0_0_40px_-20px_rgba(24,82,255,0.15)]">
                {/* Inner Core */}
                <div className="relative rounded-[calc(1.5rem-0.25rem)] bg-[#0a0a1a]/80 p-8 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-700 hover:bg-[#0a0a1a]/90">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, idx) => (
                      <StarIcon key={idx} filled={idx < 5} className="text-[#C86E4B]" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-base leading-relaxed text-white/70 mb-6 italic">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-[#1852FF] to-[#C86E4B] flex items-center justify-center text-white font-bold">
                      {initials(testimonial.name)}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="text-white font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-white/50">{testimonial.role} • {testimonial.company}</div>
                      <div className="flex items-center gap-1.5 text-xs text-white/30 mt-1">
                        <MapPin className="h-3 w-3" />
                        <span>{testimonial.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Testimonial (Large) */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.5, ease: CUSTOM_EASE }}
        >
          {/* Outer Shell */}
          <div className="relative bg-white/5 rounded-3xl p-1 ring-1 ring-white/10">
            {/* Inner Core */}
            <div className="relative rounded-[calc(1.5rem-0.25rem)] bg-[#0a0a1a]/80 p-8 md:p-12 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-[#C86E4B]/10 rounded-full blur-lg" />
                  <span className="relative inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C86E4B] px-4 py-2 rounded-full border border-[#C86E4B]/20 bg-[#C86E4B]/5 backdrop-blur-sm">
                    Featured Review
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
                    onClick={prevTestimonial}
                    className="relative h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="relative h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="relative">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: CUSTOM_EASE }}
                >
                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} filled={i < 5} className="text-[#C86E4B]" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-lg md:text-xl leading-relaxed text-white/80 mb-8 italic">
                    &ldquo;{testimonials[index].text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-6">
                    {/* Avatar */}
                    <div className="relative h-16 w-16 rounded-full bg-gradient-to-br from-[#1852FF] to-[#C86E4B] flex items-center justify-center text-white font-bold text-xl">
                      {initials(testimonials[index].name)}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="text-white font-bold text-lg">{testimonials[index].name}</div>
                      <div className="text-white/50">{testimonials[index].role} • {testimonials[index].company}</div>
                      <div className="flex items-center gap-1.5 text-sm text-white/30 mt-1">
                        <MapPin className="h-4 w-4" />
                        <span>{testimonials[index].location}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Progress Indicators */}
              <div className="flex gap-2 mt-8 justify-center">
                {testimonials.map((_, i) => (
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
    </section>
  )
}
