"use client"

import { useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import { EASE_T } from "@/lib/motion"

const CUSTOM_EASE = [0.32, 0.72, 0, 1] as [number, number, number, number]

interface Service {
  id: string
  title: string
  desc: string
  tags: string[]
  url: string
  icon: React.ReactNode
}

const SERVICES: Service[] = [
  {
    id: "01",
    title: "Product & Software Engineering",
    desc: "We design and engineer scalable software products, enterprise platforms, and digital experiences that help businesses innovate faster, improve operational efficiency, and confidently scale for long-term growth.",
    tags: [
      "Web Platforms",
      "Mobile Products",
      "Cloud-Native Apps",
      "DevOps & CI/CD",
      "Low-Code",
    ],
    url: "/product-software-engineering",
    icon: <CpuIcon />,
  },
  {
    id: "02",
    title: "Data & Intelligence Platforms",
    desc: "Transform raw and fragmented business data into meaningful insights with modern analytics platforms, real-time dashboards, reporting systems, and scalable intelligence solutions that support smarter decision-making.",
    tags: [
      "Data Engineering",
      "Analytics Pipelines",
      "Business Intelligence",
      "Reporting",
    ],
    url: "/data-intelligence-platforms",
    icon: <ChartIcon />,
  },
  {
    id: "03",
    title: "Applied AI & Machine Learning",
    desc: "Build intelligent AI-powered systems that automate workflows, improve customer experiences, generate insights, and unlock innovative capabilities using practical and business-focused machine learning solutions.",
    tags: [
      "Generative AI",
      "Predictive Models",
      "Computer Vision",
      "Conversational AI",
    ],
    url: "/applied-ai-ml",
    icon: <BrainIcon />,
  },
  {
    id: "04",
    title: "Security & Risk Engineering",
    desc: "Strengthen digital products and infrastructure with proactive security engineering, risk assessments, compliance strategies, and secure development practices built into every stage of delivery.",
    tags: [
      "Secure DevOps",
      "Application Security",
      "Infrastructure Security",
      "Cloud Risk",
    ],
    url: "/security-risk-engineering",
    icon: <ShieldIcon />,
  },
  {
    id: "05",
    title: "Experience & Interface Design",
    desc: "Create intuitive and visually engaging user experiences through strategic UX research, modern interface systems, usability optimization, and customer-centered digital design practices.",
    tags: [
      "User Research",
      "UX Strategy",
      "UI Design Systems",
      "Conversion Optimization",
    ],
    url: "/experience-interface-design",
    icon: <LayoutIcon />,
  },
  {
    id: "06",
    title: "Quality Engineering & Testing",
    desc: "Deliver reliable and high-performing digital solutions through automated testing, quality assurance frameworks, performance validation, and continuous monitoring across platforms and environments.",
    tags: [
      "Functional Testing",
      "Test Automation",
      "Security Validation",
      "Performance Testing",
    ],
    url: "/quality-engineering-testing",
    icon: <ChecklistIcon />,
  },
]

export default function ServicesSectionPremium() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  useEffect(() => {
    const styleId = "sf-premium-keyframes"
    if (document.getElementById(styleId)) return
    const style = document.createElement("style")
    style.id = styleId
    style.textContent = `
      @keyframes cardFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
      }
      .card-scene { perspective: 1200px; cursor: pointer; }
      .card-inner {
        position: relative; width: 100%; height: 100%;
        transform-style: preserve-3d;
        transition: transform 0.7s cubic-bezier(0.32, 0.72, 0, 1);
      }
      .card-scene:hover .card-inner { transform: rotateY(180deg); }
      .card-face {
        position: absolute; inset: 0; border-radius: 1.5rem;
        backface-visibility: hidden; -webkit-backface-visibility: hidden;
        overflow: hidden;
      }
    `
    document.head.appendChild(style)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#050505] py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-[-160px] left-[-80px] w-[500px] h-[500px] bg-[#f97316]/10 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-[-100px] right-[-60px] w-[420px] h-[420px] bg-[#f97316]/8 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
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
        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: CUSTOM_EASE as any }}
        >
          <div className="h-[1px] w-8 bg-[#f97316]/70" />
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#f97316]">
            empower · deliver · excel
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-[clamp(28px,4vw,46px)] font-black leading-[1.1] text-white mb-3"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: CUSTOM_EASE as any }}
        >
          What we{" "}
          <em className="font-normal text-white/40">
            build
          </em>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="text-sm font-light leading-relaxed text-white/50 max-w-[480px] mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.4, ease: CUSTOM_EASE as any }}
        >
          End-to-end capabilities designed to help startups and growing
          businesses move faster and scale with confidence.
        </motion.p>

        {/* 3-column flip card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, idx) => (
            <FlipCard
              key={service.id}
              service={service}
              delay={0.1 + idx * 0.07}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Flip card ─────────────────────────────────────────────────────────────────

function FlipCard({
  service,
  delay,
  isInView,
}: {
  service: Service
  delay: number
  isInView: boolean
}) {
  return (
    <motion.div
      className="card-scene"
      style={{ height: "320px" }}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: CUSTOM_EASE as any }}
    >
      <div className="card-inner">
        {/* ── Front face ── */}
        <div
          className="card-face"
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.022)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
            padding: "32px 24px",
            textAlign: "center",
          }}
        >
          {/* Outer Shell - Icon */}
          <div className="relative">
            <div className="absolute inset-0 bg-[#f97316]/10 rounded-full blur-lg" />
            <div
              className="relative w-16 h-16 rounded-full border border-[#f97316]/30 bg-[#f97316]/10 flex items-center justify-center text-[#f97316] flex-shrink-0"
            >
              {service.icon}
            </div>
          </div>

          <div>
            <div className="text-lg font-bold text-white/90 leading-[1.25] mb-3">
              {service.title}
            </div>
            <div className="text-[11px] text-white/30 uppercase tracking-[0.06em]">
              Hover to explore
            </div>
          </div>
        </div>

        {/* ── Back face ── */}
        <div
          className="card-face"
          style={{
            transform: "rotateY(180deg)",
            background: "#111118",
            border: "1px solid rgba(249,115,22,0.25)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: "28px 26px",
          }}
        >
          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Back header: icon + id + title */}
            <div className="flex items-start gap-4 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-[#f97316]/10 rounded-full blur-md" />
                <div className="relative w-10 h-10 rounded-full border border-[#f97316]/25 bg-[#f97316]/10 flex items-center justify-center text-[#f97316] flex-shrink-0">
                  {service.icon}
                </div>
              </div>
              <div>
                <div className="text-[11px] font-bold text-[#f97316] tracking-[0.06em] uppercase">
                  {service.id}
                </div>
                <div className="text-base font-bold text-white leading-[1.25] mt-1">
                  {service.title}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs font-light text-white/60 leading-relaxed mb-4">
              {service.desc}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10.5px] text-white/50 px-3 py-1.5 rounded-full border border-white/9 bg-white/3"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#f97316]/10 px-4 py-2 border border-[#f97316]/20 hover:bg-[#f97316]/20 transition-all duration-500">
              <span className="text-xs font-semibold text-[#f97316]">Learn more</span>
              <div className="relative h-6 w-6 rounded-full bg-[#f97316]/20 flex items-center justify-center">
                <ArrowUpRight className="h-3 w-3 text-[#f97316]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function CpuIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <circle cx="7" cy="14" r="1" fill="currentColor" />
      <circle cx="11" cy="9" r="1" fill="currentColor" />
      <circle cx="15" cy="11" r="1" fill="currentColor" />
      <circle cx="19" cy="6" r="1" fill="currentColor" />
      <path d="M7 14 11 9l4 2 4-5" />
    </svg>
  )
}

function BrainIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.14Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.14Z" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function LayoutIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  )
}

function ChecklistIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="m9 12 2 2 4-4M9 17h4" />
    </svg>
  )
}
