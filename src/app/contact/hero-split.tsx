"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { 
  ArrowUpRight, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  Building2
} from "lucide-react"

const LOCATIONS = [
  {
    city: "Kolkata",
    country: "India",
    role: "Global HQ",
    timezone: "IST (UTC+5:30)",
    address: "Sector V, Salt Lake",
  },
  {
    city: "London",
    country: "UK",
    role: "Europe Hub",
    timezone: "GMT (UTC+0)",
    address: "Canary Wharf",
  },
  {
    city: "New York",
    country: "USA",
    role: "Americas Hub",
    timezone: "EST (UTC-5)",
    address: "Manhattan",
  },
  {
    city: "Dubai",
    country: "UAE",
    role: "Middle East",
    timezone: "GST (UTC+4)",
    address: "Dubai Internet City",
  },
]

export default function ContactHeroSplit() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a]">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto min-h-screen max-w-7xl px-6 py-32 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium tracking-wider text-white/80">
            <MessageSquare className="h-3.5 w-3.5 text-cyan-400" />
            GET IN TOUCH
          </span>
          <h1 className="mb-4 text-4xl font-light text-white md:text-6xl">
            Let&apos;s build{" "}
            <span className="font-semibold">something great</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-white/50">
            Ready to transform your enterprise? We&apos;re here to help you navigate 
            the complexities of modern technology.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* LEFT - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm">
              <h2 className="mb-6 text-xl font-semibold text-white">
                Send us a message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-white/60">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 transition-all focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-white/60">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 transition-all focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/60">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 transition-all focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    placeholder="Acme Inc."
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/60">Service Interest</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white transition-all focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  >
                    <option value="" className="bg-zinc-900">Select a service</option>
                    <option value="sharepoint" className="bg-zinc-900">SharePoint Development</option>
                    <option value="power-platform" className="bg-zinc-900">Power Platform</option>
                    <option value="ai" className="bg-zinc-900">AI Solutions</option>
                    <option value="web" className="bg-zinc-900">Web Development</option>
                    <option value="mobile" className="bg-zinc-900">Mobile Apps</option>
                    <option value="other" className="bg-zinc-900">Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/60">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 transition-all focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-lg bg-white py-4 text-sm font-semibold text-black transition-all hover:bg-cyan-400"
                >
                  Send Message
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            </div>
          </motion.div>

          {/* RIGHT - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-8"
          >
            {/* Quick Contact Options */}
            <div className="grid gap-4 md:grid-cols-2">
              <Link
                href="mailto:sales@softree.com"
                className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all hover:border-cyan-400/50 hover:bg-white/[0.04]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-white/50">Sales</p>
                  <p className="text-sm font-medium text-white group-hover:text-cyan-400">sales@softree.com</p>
                </div>
              </Link>

              <Link
                href="mailto:support@softree.com"
                className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all hover:border-cyan-400/50 hover:bg-white/[0.04]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-400/10 text-purple-400">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-white/50">Support</p>
                  <p className="text-sm font-medium text-white group-hover:text-purple-400">support@softree.com</p>
                </div>
              </Link>

              <Link
                href="tel:+1234567890"
                className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all hover:border-cyan-400/50 hover:bg-white/[0.04]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-400">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-white/50">Phone</p>
                  <p className="text-sm font-medium text-white group-hover:text-emerald-400">+1 (234) 567-890</p>
                </div>
              </Link>

              <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-400/10 text-amber-400">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-white/50">Response Time</p>
                  <p className="text-sm font-medium text-white">Within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Global Locations */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-white">
                <Building2 className="h-5 w-5 text-cyan-400" />
                Global Offices
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {LOCATIONS.map((location, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-4"
                  >
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                    <div>
                      <p className="font-medium text-white">{location.city}, {location.country}</p>
                      <p className="text-xs text-white/50">{location.role}</p>
                      <p className="mt-1 text-xs text-cyan-400">{location.timezone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badge */}
            <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <svg className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-white">Enterprise-Grade Security</p>
                <p className="text-sm text-white/50">SOC 2 Type II • ISO 27001 • GDPR Compliant</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
