"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import {
  Braces,
  FileCode2,
  Atom,
  Layers,
  Database,
  Server,
  Cloud,
  ShieldCheck,
  Bug,
} from "lucide-react"
import { EASE_T } from "@/lib/motion"

const CUSTOM_EASE = [0.32, 0.72, 0, 1] as [number, number, number, number]

type Tech = {
  name: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const TABS = [
  "FRONTEND DEVELOPMENT",
  "BACKEND DEVELOPMENT",
  "DATABASES",
  "DEVOPS & CLOUD",
  "TESTING & QA",
] as const

const techData: Record<(typeof TABS)[number], Tech[]> = {
  "FRONTEND DEVELOPMENT": [
    { name: "JavaScript", icon: Braces },
    { name: "TypeScript", icon: FileCode2 },
    { name: "React", icon: Atom },
    { name: "Next.js", icon: Layers },
    { name: "Vue.js", icon: Layers },
  ],
  "BACKEND DEVELOPMENT": [
    { name: "Node.js", icon: Server },
    { name: "Express.js", icon: Server },
    { name: "Python", icon: FileCode2 },
    { name: "Java (Spring Boot)", icon: Cloud },
  ],
  DATABASES: [
    { name: "MongoDB", icon: Database },
    { name: "MySQL", icon: Database },
    { name: "PostgreSQL", icon: Database },
    { name: "Firebase", icon: Cloud },
  ],
  "DEVOPS & CLOUD": [
    { name: "Docker", icon: Cloud },
    { name: "Kubernetes", icon: Layers },
    { name: "AWS", icon: Cloud },
    { name: "CI/CD Pipelines", icon: Server },
  ],
  "TESTING & QA": [
    { name: "Jest", icon: Bug },
    { name: "Cypress", icon: Bug },
    { name: "Selenium", icon: ShieldCheck },
    { name: "Postman", icon: Server },
  ],
}

export default function TechnologiesTabsPremium() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>(
    "FRONTEND DEVELOPMENT",
  )

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
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: CUSTOM_EASE as any }}
        >
          {/* Badge */}
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-[#1852FF]/10 rounded-full blur-lg" />
            <span className="relative inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1852FF] px-4 py-2 rounded-full border border-[#1852FF]/20 bg-[#1852FF]/5 backdrop-blur-sm">
              Web Development Stack
            </span>
          </div>

          <h2 className="text-[clamp(28px,4vw,46px)] font-black leading-[1.1] text-white mb-4">
            Technologies powering modern{" "}
            <span className="text-[#1852FF]">
              Web Applications
            </span>
          </h2>

          <p className="text-sm text-white/50 max-w-2xl mx-auto leading-relaxed">
            Our stack is built for performance, scalability, and long-term
            maintainability — from frontend experiences to backend systems and
            cloud infrastructure.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: CUSTOM_EASE as any }}
        >
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 border-b border-white/10">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-4 text-sm font-medium transition-colors duration-300 ${
                  activeTab === tab
                    ? "text-[#1852FF]"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {tab}

                {/* underline indicator */}
                {activeTab === tab && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute left-0 bottom-0 h-[2px] w-full rounded-full bg-[#1852FF]"
                    transition={{ duration: 0.3, ease: CUSTOM_EASE as any }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tech Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: CUSTOM_EASE as any }}
        >
          {/* Outer Shell */}
          <div className="relative bg-white/5 rounded-3xl p-1 ring-1 ring-white/10">
            {/* Inner Core */}
            <div className="relative rounded-[calc(1.5rem-0.25rem)] bg-[#0a0a1a]/80 p-8 md:p-14 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              <div
                key={activeTab}
                className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]"
              >
                {techData[activeTab].map((tech, i) => {
                  const Icon = tech.icon

                  return (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.05, ease: CUSTOM_EASE as any }}
                      className="group relative rounded-2xl bg-white/5 border border-white/10 p-7 flex flex-col items-center justify-center transition-all duration-700 hover:bg-white/10 hover:ring-1 hover:ring-white/20 hover:shadow-[0_0_30px_-20px_rgba(24,82,255,0.15)]"
                    >
                      {/* Icon */}
                      <div className="relative mb-4 h-12 w-12 flex items-center justify-center rounded-xl bg-[#1852FF]/10 group-hover:bg-[#1852FF]/20 transition-all duration-300">
                        <div className="absolute inset-0 bg-[#1852FF]/10 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Icon className="h-6 w-6 text-[#1852FF] group-hover:text-[#3b82f6] transition-colors duration-300" />
                      </div>

                      {/* Name */}
                      <span className="text-sm font-medium text-white/70 text-center group-hover:text-white transition-colors duration-300">
                        {tech.name}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
