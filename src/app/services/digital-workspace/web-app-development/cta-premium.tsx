"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { EASE_T } from "@/lib/motion"

const CUSTOM_EASE = [0.32, 0.72, 0, 1] as [number, number, number, number]

export default function CTAPremium() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [status, setStatus] = useState("")

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)

    try {
      const res = await fetch("https://formspree.io/f/myklkyya", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      })

      if (res.ok) {
        setStatus("SUCCESS")
        form.reset()
        setTimeout(() => setStatus(""), 3000)
      } else {
        setStatus("ERROR")
      }
    } catch {
      setStatus("ERROR")
    }
  }

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
          <div className="relative rounded-[calc(1.5rem-0.25rem)] bg-gradient-to-br from-[#0a0a1a]/90 to-[#0f0f1f]/90 p-8 md:p-12 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* LEFT CONTENT */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.2, ease: CUSTOM_EASE as any }}
              >
                {/* Badge */}
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-[#1852FF]/10 rounded-full blur-lg" />
                  <span className="relative inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1852FF] px-4 py-2 rounded-full border border-[#1852FF]/20 bg-[#1852FF]/5 backdrop-blur-sm">
                    👨‍💻 Hire Web Developers
                  </span>
                </div>

                {/* Heading */}
                <h2 className="text-[clamp(28px,4vw,42px)] font-black leading-[1.1] text-white mb-4">
                  Hire expert developers for{" "}
                  <span className="text-[#1852FF]">
                    Modern Web Applications
                  </span>
                </h2>

                {/* Description */}
                <p className="text-sm text-white/50 leading-relaxed mb-6 max-w-lg">
                  Strengthen your digital presence by hiring skilled web developers
                  who build fast, secure, and scalable web applications tailored to
                  your business needs.
                </p>

                {/* Benefits */}
                <ul className="space-y-2.5 mb-8">
                  {[
                    "Frontend & Backend Web Developers",
                    "React, Next.js, Angular & Vue Expertise",
                    "API, Cloud & Database Integration",
                    "Flexible Engagement & Hiring Models",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center gap-3 text-sm text-white/60"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: CUSTOM_EASE as any }}
                    >
                      <div className="relative h-4 w-4">
                        <div className="absolute inset-0 bg-[#1852FF]/10 rounded-full blur-md" />
                        <div className="relative h-4 w-4 rounded-full bg-[#1852FF]/20 flex items-center justify-center">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1852FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      </div>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Stats */}
                <div className="flex flex-wrap gap-8">
                  {[
                    { value: "70+", label: "Web Developers Available" },
                    { value: "96%", label: "Client Retention" },
                    { value: "48 Hrs", label: "Team Onboarding" },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: CUSTOM_EASE as any }}
                    >
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-[0.05em]">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* RIGHT FORM */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.3, ease: CUSTOM_EASE as any }}
              >
                {/* Outer Shell */}
                <div className="relative bg-white/5 rounded-2xl p-1 ring-1 ring-white/10">
                  {/* Inner Core */}
                  <div className="relative rounded-[calc(1rem-0.25rem)] bg-[#0a0a1a]/80 p-6 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                    <h3 className="text-lg font-bold text-white mb-2">
                      Get Free Web App Estimate
                    </h3>

                    <p className="text-xs text-white/50 mb-6">
                      Tell us your requirements — we'll reply within 24 hours
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          placeholder="Full Name"
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-[#1852FF]/50 focus:bg-white/10 transition-all duration-300 placeholder:text-white/30"
                          required
                        />
                      </div>

                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          placeholder="Work Email"
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-[#1852FF]/50 focus:bg-white/10 transition-all duration-300 placeholder:text-white/30"
                          required
                        />
                      </div>

                      <div className="relative">
                        <textarea
                          name="project_details"
                          placeholder="Brief about your project..."
                          rows={3}
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-[#1852FF]/50 focus:bg-white/10 transition-all duration-300 placeholder:text-white/30 resize-none"
                        />
                      </div>

                      <motion.button
                        type="submit"
                        className="group relative w-full overflow-hidden rounded-lg bg-[#1852FF] py-3 transition-all duration-700 hover:bg-[#3b82f6] hover:shadow-[0_20px_60px_-20px_rgba(24,82,255,0.4)] active:scale-[0.97]"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <span className="relative flex items-center justify-center gap-2 text-sm font-semibold text-white tracking-[0.04em]">
                          Get Free Estimate
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-[1px]" />
                        </span>
                      </motion.button>
                    </form>

                    {/* Success/Error Messages */}
                    {status === "SUCCESS" && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 text-green-400 text-xs text-center"
                      >
                        ✅ Message sent successfully!
                      </motion.p>
                    )}

                    {status === "ERROR" && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 text-red-400 text-xs text-center"
                      >
                        ❌ Something went wrong. Try again.
                      </motion.p>
                    )}

                    <p className="mt-4 text-[10px] text-center text-white/30">
                      🔒 Secure • NDA Protected • No Spam
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
