"use client"

import { useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import Link from "next/link"

// ── ULTRA-THIN SVG ICONS ──
const Icons = {
  ArrowUp: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  ),
  Mail: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  Location: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Clock: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Send: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9" />
    </svg>
  ),
}

const LOCATIONS = [
  { city: "Kolkata", country: "India", role: "Global HQ", timezone: "IST +5:30" },
  { city: "London", country: "UK", role: "Europe", timezone: "GMT +0" },
  { city: "New York", country: "USA", role: "Americas", timezone: "EST -5" },
  { city: "Dubai", country: "UAE", role: "Middle East", timezone: "GST +4" },
]

// ── JAKUB KREHEL ENTER ANIMATION RECIPE ──
const enterAnimation = {
  initial: { opacity: 0, y: 8, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { type: "spring", duration: 0.45, bounce: 0 }
}

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } }
}

export default function ContactHeroPro() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-[#050505]">
      {/* ── RADIAL MESH GRADIENT ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,217,255,0.06)_0%,transparent_60%)] blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.04)_0%,transparent_60%)] blur-3xl" />
      </div>

      {/* ── SUBTLE GRID ── */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col px-6 pt-32 md:px-12 lg:flex-row lg:items-center lg:gap-16 lg:px-16 lg:pt-0">

        {/* ── LEFT: CONTENT ── */}
        <motion.div
          className="flex flex-1 flex-col justify-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* EYEBROW */}
          <motion.span
            variants={enterAnimation}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/60">
              Get in Touch
            </span>
          </motion.span>

          {/* MASSIVE HEADLINE */}
          <motion.h1
            variants={enterAnimation}
            className="mb-6 text-[clamp(42px,6vw,80px)] font-light leading-[0.95] tracking-[-0.03em] text-white"
          >
            Let&apos;s build
            <br />
            <span className="font-medium text-cyan-400">
              something
            </span>
            <br />
            extraordinary
          </motion.h1>

          <motion.p
            variants={enterAnimation}
            className="mb-12 max-w-md text-lg font-light leading-relaxed text-white/40"
          >
            Ready to transform your enterprise? Our global team is here to
            help you navigate the complexities of modern technology.
          </motion.p>

          {/* ── QUICK CONTACT CARDS - Double-bezel ── */}
          <motion.div variants={enterAnimation} className="grid gap-3 sm:grid-cols-2">
            <Link href="mailto:sales@softree.com" className="group relative">
              <div className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-1.5 backdrop-blur-sm transition-all duration-200 group-hover:border-cyan-400/20">
                <div className="flex flex-1 items-center gap-4 rounded-[calc(1rem-0.375rem)] px-4 py-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-400">
                    <Icons.Mail />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.15em] text-white/40">Sales</div>
                    <div className="text-sm font-medium text-white transition-colors group-hover:text-cyan-400">sales@softreetechnology.com</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="mailto:support@softree.com" className="group relative">
              <div className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-1.5 backdrop-blur-sm transition-all duration-200 group-hover:border-purple-400/20">
                <div className="flex flex-1 items-center gap-4 rounded-[calc(1rem-0.375rem)] px-4 py-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-400/10 text-purple-400">
                    <Icons.Mail />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.15em] text-white/40">Support</div>
                    <div className="text-sm font-medium text-white transition-colors group-hover:text-purple-400">sales@softreetechnology.com</div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* ── GLOBAL LOCATIONS ── */}
          <motion.div
            variants={enterAnimation}
            className="mt-10"
          >
            <div className="mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/30">
              <Icons.Location />
              <span>Global Offices</span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {LOCATIONS.map((loc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", duration: 0.4, bounce: 0, delay: 0.3 + i * 0.05 }}
                  className="rounded-xl border border-white/[0.04] bg-white/[0.02] px-3 py-2 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    <span className="text-sm font-medium text-white">{loc.city}</span>
                  </div>
                  <div className="mt-0.5 text-[9px] uppercase tracking-wider text-white/30">{loc.timezone}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: FORM ── */}
        <motion.div
          initial={{ opacity: 0, x: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ type: "spring", duration: 0.6, bounce: 0, delay: 0.2 }}
          className="flex flex-1 items-center"
        >
          {/* ── DOUBLE-BEZEL FORM CONTAINER ── */}
          <div className="relative w-full">
            <div className="rounded-[2rem] border border-white/[0.06] bg-white/[0.02] p-2 backdrop-blur-xl">
              <div className="rounded-[calc(2rem-0.5rem)] border border-white/[0.04] bg-[#0a0a0a]/80 p-8">
                <h2 className="mb-6 text-xl font-light tracking-tight text-white">
                  Send a message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    {/* Name Input */}
                    <div className="relative">
                      <label className="mb-2 block text-[11px] uppercase tracking-[0.15em] text-white/40">Name</label>
                      <motion.div
                        className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-1 transition-all duration-200"
                        animate={{ borderColor: focusedField === 'name' ? 'rgba(0,217,255,0.3)' : 'rgba(255,255,255,0.06)' }}
                      >
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full rounded-[calc(0.75rem-0.25rem)] bg-transparent px-4 py-3 text-sm text-white placeholder-white/20 outline-none"
                          placeholder="John Doe"
                        />
                      </motion.div>
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                      <label className="mb-2 block text-[11px] uppercase tracking-[0.15em] text-white/40">Email</label>
                      <motion.div
                        className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-1 transition-all duration-200"
                        animate={{ borderColor: focusedField === 'email' ? 'rgba(0,217,255,0.3)' : 'rgba(255,255,255,0.06)' }}
                      >
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full rounded-[calc(0.75rem-0.25rem)] bg-transparent px-4 py-3 text-sm text-white placeholder-white/20 outline-none"
                          placeholder="john@company.com"
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="mb-2 block text-[11px] uppercase tracking-[0.15em] text-white/40">Company</label>
                    <motion.div
                      className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-1 transition-all duration-200"
                      animate={{ borderColor: focusedField === 'company' ? 'rgba(0,217,255,0.3)' : 'rgba(255,255,255,0.06)' }}
                    >
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        onFocus={() => setFocusedField('company')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full rounded-[calc(0.75rem-0.25rem)] bg-transparent px-4 py-3 text-sm text-white placeholder-white/20 outline-none"
                        placeholder="Acme Inc."
                      />
                    </motion.div>
                  </div>

                  {/* Service Select */}
                  <div>
                    <label className="mb-2 block text-[11px] uppercase tracking-[0.15em] text-white/40">Service Interest</label>
                    <motion.div
                      className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-1 transition-all duration-200"
                      animate={{ borderColor: focusedField === 'service' ? 'rgba(0,217,255,0.3)' : 'rgba(255,255,255,0.06)' }}
                    >
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        onFocus={() => setFocusedField('service')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full rounded-[calc(0.75rem-0.25rem)] bg-transparent px-4 py-3 text-sm text-white outline-none"
                      >
                        <option value="" className="bg-zinc-900">Select a service</option>
                        <option value="sharepoint" className="bg-zinc-900">SharePoint Development</option>
                        <option value="power" className="bg-zinc-900">Power Platform</option>
                        <option value="ai" className="bg-zinc-900">AI Solutions</option>
                        <option value="web" className="bg-zinc-900">Web Development</option>
                        <option value="mobile" className="bg-zinc-900">Mobile Apps</option>
                      </select>
                    </motion.div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="mb-2 block text-[11px] uppercase tracking-[0.15em] text-white/40">Message</label>
                    <motion.div
                      className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-1 transition-all duration-200"
                      animate={{ borderColor: focusedField === 'message' ? 'rgba(0,217,255,0.3)' : 'rgba(255,255,255,0.06)' }}
                    >
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        rows={4}
                        className="w-full resize-none rounded-[calc(0.75rem-0.25rem)] bg-transparent px-4 py-3 text-sm text-white placeholder-white/20 outline-none"
                        placeholder="Tell us about your project..."
                      />
                    </motion.div>
                  </div>

                  {/* Submit Button - Button-in-button with magnetic physics */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex w-full items-center justify-center gap-3 rounded-xl bg-white py-4 text-sm font-medium text-black transition-all duration-200 hover:bg-cyan-400"
                  >
                    Send Message
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:scale-105">
                      <Icons.Send />
                    </span>
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── BOTTOM FADE ── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent" />
    </section>
  )
}
