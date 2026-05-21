"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react"
import { EASE_T } from "@/lib/motion"

const CUSTOM_EASE = [0.32, 0.72, 0, 1] as [number, number, number, number]

const testimonials = [
  {
    text: "Softree Technology helped us transform our digital presence with a seamless and scalable solution. Their team understood our vision and expectations.",
    name: "Rahul Sharma",
    role: "Founder & CEO, FinEdge Solutions",
  },
  {
    text: "Amazing experience working with Softree. Their technical expertise and commitment helped us scale faster than expected.",
    name: "Ankit Verma",
    role: "CTO, NexaTech",
  },
  {
    text: "From idea to execution, Softree delivered everything perfectly. The team is highly professional and responsive.",
    name: "Priya Mehta",
    role: "Product Head, ScaleUp Labs",
  },
]

export default function StartProjectPremium() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [index, setIndex] = useState(0)

  const prevSlide = () => setIndex(index === 0 ? testimonials.length - 1 : index - 1)
  const nextSlide = () => setIndex(index === testimonials.length - 1 ? 0 : index + 1)

  const t = testimonials[index]

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
        {/* Outer Shell */}
        <motion.div
          className="relative bg-white/5 rounded-3xl p-1 ring-1 ring-white/10"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: CUSTOM_EASE as any }}
        >
          {/* Inner Core */}
          <div className="relative rounded-[calc(1.5rem-0.25rem)] bg-[#0a0a1a]/80 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
            <div className="grid md:grid-cols-[1.3fr_1fr]">
              {/* LEFT */}
              <motion.div
                className="p-8 md:p-10"
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.2, ease: CUSTOM_EASE as any }}
              >
                <h2 className="text-[clamp(24px,3vw,36px)] font-black leading-[1.1] text-white mb-4">
                  Wait — Let's Build{" "}
                  <span className="text-[#1852FF]">
                    Something Great Together
                  </span>
                </h2>

                <p className="text-sm text-white/50 leading-relaxed mb-8">
                  Discover why growing businesses trust Softree Technology for
                  reliable, scalable, and impactful digital solutions.
                </p>

                {/* Awards */}
                <div className="flex flex-wrap gap-3 mb-10">
                  <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white/70">
                    🏆 Top Software Company 2025
                  </div>
                  <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white/70">
                    ⭐ 4.9 Client Rating
                  </div>
                  <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white/70">
                    🚀 3000+ Projects Delivered
                  </div>
                </div>

                {/* Testimonial Slider */}
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: CUSTOM_EASE as any }}
                  >
                    <p className="text-white/70 leading-relaxed mb-4 italic">
                      &ldquo;{t.text}&rdquo;
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-semibold text-sm">{t.name}</p>
                        <p className="text-white/40 text-xs">{t.role}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={prevSlide}
                          className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          onClick={nextSlide}
                          className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* RIGHT - FORM */}
              <motion.div
                className="p-8 md:p-10 border-l border-white/10"
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.3, ease: CUSTOM_EASE as any }}
              >
                <p className="text-sm text-white/50 leading-relaxed mb-8">
                  Share your requirements so our experts can understand your goals
                  and craft a tailored solution.
                </p>

                <form className="space-y-4">
                  {/* Row 1 */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-white/40 mb-1 block">First Name</label>
                      <input
                        type="text"
                        placeholder="John"
                        className="w-full border border-white/10 bg-white/5 focus:bg-white/10 focus:border-[#1852FF]/50 rounded-lg px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/30"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-white/40 mb-1 block">Company Email</label>
                      <input
                        type="email"
                        placeholder="john@company.com"
                        className="w-full border border-white/10 bg-white/5 focus:bg-white/10 focus:border-[#1852FF]/50 rounded-lg px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/30"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-white/40 mb-1 block">Contact Number</label>
                      <div className="flex items-center border border-white/10 bg-white/5 focus-within:bg-white/10 focus-within:border-[#1852FF]/50 rounded-lg px-4 py-3 transition-all duration-300">
                        <span className="text-sm text-white/40 mr-2">+91</span>
                        <input
                          type="text"
                          placeholder="9876543210"
                          className="w-full text-sm text-white outline-none bg-transparent placeholder:text-white/30"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-white/40 mb-1 block">Work Email (Optional)</label>
                      <input
                        type="email"
                        placeholder="john@work.com"
                        className="w-full border border-white/10 bg-white/5 focus:bg-white/10 focus:border-[#1852FF]/50 rounded-lg px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/30"
                      />
                    </div>
                  </div>

                  {/* Textarea */}
                  <div>
                    <label className="text-xs text-white/40 mb-1 block">Project Details</label>
                    <textarea
                      rows={3}
                      placeholder="Describe your project"
                      className="w-full border border-white/10 bg-white/5 focus:bg-white/10 focus:border-[#1852FF]/50 rounded-lg px-4 py-3 text-sm text-white outline-none resize-none transition-all duration-300 placeholder:text-white/30"
                    />
                  </div>

                  {/* Info Box */}
                  <div className="flex items-start gap-3 bg-[#1852FF]/5 border border-[#1852FF]/20 rounded-lg px-4 py-3">
                    <span>🛡️</span>
                    <p className="text-sm text-white/70">
                      Fast 2-minute response. NDA-protected.
                    </p>
                  </div>

                  {/* Captcha */}
                  <div className="flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3">
                    <span className="text-sm text-white/70 font-medium">
                      2 + 1 = ?
                    </span>
                    <input
                      type="text"
                      placeholder="3"
                      className="w-20 bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm text-white outline-none focus:border-[#1852FF]/50 transition-all duration-300 placeholder:text-white/30"
                    />
                  </div>

                  {/* Button */}
                  <motion.button
                    type="submit"
                    className="group relative w-full overflow-hidden rounded-full bg-[#1852FF] py-3 transition-all duration-700 hover:bg-[#3b82f6] hover:shadow-[0_20px_60px_-20px_rgba(24,82,255,0.4)] active:scale-[0.97]"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="relative flex items-center justify-center gap-2 text-sm font-semibold text-white tracking-[0.04em]">
                      Submit Request
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-[1px]" />
                    </span>
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
