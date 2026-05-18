"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { 
  ArrowUpRight, 
  Share2, 
  Code2, 
  Database, 
  Smartphone, 
  Brain, 
  BarChart3,
  Palette
} from "lucide-react"

const CYCLE_WORDS = ["SharePoint", "Power Apps", "AI Solutions", "Web Apps", "Mobile"]
const CYCLE_MS = 3000

const SERVICES = [
  {
    id: "sharepoint",
    icon: Share2,
    title: "SharePoint Development",
    description: "Enterprise intranets, document management, and custom SPFx solutions.",
    href: "/services/sharepoint",
    size: "large",
    color: "from-cyan-400 to-blue-500",
    image: "/services/sharepoint.jpg",
  },
  {
    id: "power",
    icon: Database,
    title: "Power Platform",
    description: "Power Apps, Power BI, and Power Automate solutions.",
    href: "/services/power-platform",
    size: "medium",
    color: "from-amber-400 to-orange-500",
    image: "/services/power.jpg",
  },
  {
    id: "ai",
    icon: Brain,
    title: "AI Solutions",
    description: "GPT-4o, Claude, Azure OpenAI integration.",
    href: "/services/ai",
    size: "medium",
    color: "from-purple-400 to-pink-500",
    image: "/services/ai.jpg",
  },
  {
    id: "web",
    icon: Code2,
    title: "Web Development",
    description: "React, Next.js, Node.js applications.",
    href: "/services/web",
    size: "large",
    color: "from-emerald-400 to-teal-500",
    image: "/services/web.jpg",
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile Apps",
    description: "iOS, Android, and cross-platform solutions.",
    href: "/services/mobile",
    size: "medium",
    color: "from-rose-400 to-red-500",
    image: "/services/mobile.jpg",
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Data Analytics",
    description: "Power BI dashboards and data visualization.",
    href: "/services/analytics",
    size: "medium",
    color: "from-blue-400 to-indigo-500",
    image: "/services/analytics.jpg",
  },
]

function TextCycle() {
  const [idx, setIdx] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const t = setInterval(() => {
      setLeaving(true)
      setTimeout(() => {
        setIdx((p) => (p + 1) % CYCLE_WORDS.length)
        setLeaving(false)
      }, 300)
    }, CYCLE_MS)
    return () => clearInterval(t)
  }, [])

  return (
    <span className="relative inline-block min-w-[200px] text-cyan-400">
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={leaving ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="inline-block"
        >
          {CYCLE_WORDS[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

import { useEffect } from "react"

export default function ServicesHeroBento() {
  const [activeFilter, setActiveFilter] = useState("all")
  const containerRef = useRef<HTMLDivElement>(null)

  const filteredServices = activeFilter === "all" 
    ? SERVICES 
    : SERVICES.filter(s => s.id === activeFilter || (activeFilter === "microsoft" && ["sharepoint", "power", "analytics"].includes(s.id)))

  return (
    <section ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-[#fafafa]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            <Palette className="h-3.5 w-3.5" />
            Our Expertise
          </span>
          
          <h1 className="mb-4 text-4xl font-light text-zinc-900 md:text-6xl">
            Engineering{" "}
            <span className="font-semibold">
              <TextCycle />
            </span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg text-zinc-600">
            From Microsoft enterprise solutions to cutting-edge AI integration, 
            we deliver technology that drives business outcomes.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 flex flex-wrap items-center justify-center gap-2"
        >
          {[
            { id: "all", label: "All Services" },
            { id: "microsoft", label: "Microsoft Stack" },
            { id: "sharepoint", label: "SharePoint" },
            { id: "ai", label: "AI Solutions" },
            { id: "web", label: "Web & Mobile" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                activeFilter === tab.id
                  ? "bg-zinc-900 text-white"
                  : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"
        >
          {filteredServices.map((service, index) => {
            const Icon = service.icon
            const isLarge = service.size === "large"
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-500 hover:shadow-xl ${
                  isLarge ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                {/* Gradient Accent */}
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${service.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                
                <Link href={service.href} className="flex h-full flex-col">
                  {/* Image Area */}
                  <div className={`relative overflow-hidden bg-zinc-100 ${isLarge ? "h-48 md:h-64" : "h-32"}`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-10`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className={`text-zinc-400 transition-transform duration-500 group-hover:scale-110 ${isLarge ? "h-16 w-16" : "h-10 w-10"}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className={`mb-3 flex items-center gap-3`}>
                      <div className={`flex items-center justify-center rounded-lg bg-gradient-to-br ${service.color} text-white shadow-lg ${isLarge ? "h-10 w-10" : "h-8 w-8"}`}>
                        <Icon className={isLarge ? "h-5 w-5" : "h-4 w-4"} />
                      </div>
                      <h3 className={`font-semibold text-zinc-900 ${isLarge ? "text-xl" : "text-base"}`}>
                        {service.title}
                      </h3>
                    </div>
                    
                    <p className={`flex-1 text-zinc-600 ${isLarge ? "text-base" : "text-sm"}`}>
                      {service.description}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-sm font-medium text-zinc-900">
                      Learn more
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="mb-4 text-zinc-600">
            Need a custom solution? We specialize in tailoring our services to your unique requirements.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-zinc-900 px-8 py-4 text-sm font-semibold text-white transition-all hover:gap-3"
          >
            Discuss Your Project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
