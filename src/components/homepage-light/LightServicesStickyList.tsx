"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import Image from "next/image"
import SectionHeader from "@/components/homepage-light/SectionHeader"
import { EASE_T, DUR } from "@/lib/motion"

const SURFACE = "#F3F0EE"
const ACCENT_ORANGE = "#FF5812"

/* ====================================================================
 *  SERVICES Ã¢â‚¬â€ sticky list with hover image reveal
 *    Ã¢â‚¬Â¢ Sticky "Services" title on the left
 *    Ã¢â‚¬Â¢ 4 service rows stacked on the right
 *    Ã¢â‚¬Â¢ Hover a row ? image reveals with a red overlay wipe from bottom
 * ==================================================================== */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

type Service = {
  n: string
  title: string
  href: string
  desc: string
  tags: string[]
  img: string
  whiteLabel?: {
    title: string
    subtitle: string
    features: string[]
  }
}

const SERVICES: Service[] = [

  {
    n: "01",
    title: "AI Web Analyser",
    href: "/webanalyser",
    desc: "Scan your website instantly with AI. Get a performance audit, conversion optimization report, and custom digital strategy insights designed for growth.",
    tags: ["AI Growth Intelligence", "Website Audit", "Conversion Optimization"],
    img: "/images/webanalyser-fixed.png",
    whiteLabel: {
      title: "FREE AI CONVERSION AUDIT",
      subtitle: "Instant Report - Actionable Insights - No Obligation",
      features: ["Performance Scoring", "UX Flow Analysis", "CRO Recommendations"]
    }
  },

  {
    n: "02",
    title: "AI Development Services",
    href: "/services/ai-development-services",
    desc: "Build intelligent AI agents that reason, plan, and act autonomously to automate complex business processes and deliver measurable outcomes.",
    tags: ["AI Agents", "Multi-Agent Systems", "LLM", "Automation"],
    img: "/images/dataBIRobort.png",
    whiteLabel: {
      title: "WHITE-LABEL AGENTIC AI PARTNER",
      subtitle: "Offshore Delivery - Your Brand - Our Expertise",
      features: ["Dedicated AI Team", "Enterprise-Ready", "AI Specialists"]
    }
  },

  {
    n: "03",
    title: "Generative AI",
    href: "/services/generative-ai",
    desc: "Build production-ready generative AI solutions using advanced language and multimodal models to create content, insights, and intelligent experiences.",
    tags: ["Generative AI", "LLMs", "AI Applications", "RAG"],
    img: "/images/GenAI.png",
    whiteLabel: {
      title: "WHITE-LABEL GENERATIVE AI PARTNER",
      subtitle: "Offshore Delivery - Your Brand - Our Expertise",
      features: ["AI Engineering Team", "Custom AI Solutions", "LLM Specialists"]
    }
  },

  {
    n: "04",
    title: "Build Power Platform Automations",
    href: "/services/offshore-power-platform-development",
    desc: "Power Apps, Power Automate, and Power BI built by Microsoft Gold Partners. Enterprise governance, security review, ALM pipelines included.",
    tags: ["Power Apps", "Power Automate", "Power BI", "Microsoft"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    whiteLabel: {
      title: "WHITE-LABEL POWER PLATFORM PARTNER",
      subtitle: "Offshore Delivery - Your Brand - Our Expertise",
      features: ["NDA Protected", "Dedicated Team", "Microsoft Specialists"]
    }
  },
  {
    n: "05",
    title: "Modernize SharePoint",
    href: "/services/legacy-application-modernization",
    desc: "SharePoint intranets and SPFx web parts that don’t feel like SharePoint. Migration, custom branding, and Microsoft 365 integrations.",
    tags: ["SharePoint", "SPFx", "M365", "Migration"],
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80",
    whiteLabel: {
      title: "WHITE-LABEL SHAREPOINT PARTNER",
      subtitle: "Offshore Delivery - Your Brand - Our Expertise",
      features: ["NDA Protected", "Dedicated Team", "SharePoint & SPFx Specialists"]
    }
  },
  {
    n: "06",
    title: "Stand up Data + BI",
    href: "/services/offshore-data-analytics",
    desc: "Microsoft Fabric, Power BI dashboards, and data engineering pipelines that surface revenue signals — not 60-page decks.",
    tags: ["Microsoft Fabric", "Power BI", "Data Engineering", "Analytics"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    whiteLabel: {
      title: "WHITE-LABEL DATA & BI PARTNER",
      subtitle: "Offshore Delivery - Your Brand - Our Expertise",
      features: ["NDA Protected", "Dedicated Team", "Power BI & Fabric Specialists"]
    }
  },
  {
    n: "07",
    title: "Modernize Legacy Applications",
    href: "/services/legacy-application-modernization",
    desc: "Transform outdated systems, desktop applications, or legacy databases into secure, cloud-native platforms. Modern codebase architectures, seamless integrations.",
    tags: ["Legacy Migration", "Cloud Native", "React", "Next.js"],
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
    whiteLabel: {
      title: "WHITE-LABEL MODERNIZATION PARTNER",
      subtitle: "Offshore Delivery - Your Brand - Our Expertise",
      features: ["NDA Protected", "Dedicated Team", "Legacy Migration Specialists"]
    }
  },
  {
    n: "08",
    title: "Ship a Web App",
    href: "/services/offshore-web-app-development",
    desc: "Production-grade web apps in Next.js, React, and TypeScript. Senior engineers, fixed scope, weekly demos. From discovery to launch in 12 weeks.",
    tags: ["Next.js", "React", "TypeScript", "Production"],
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80",
    whiteLabel: {
      title: "WHITE-LABEL WEB APP PARTNER",
      subtitle: "Offshore Delivery - Your Brand - Our Expertise",
      features: ["NDA Protected", "Dedicated Team", "Next.js & React Specialists"]
    }
  },
]

/* ====================================================================
 *  ServiceCard Ã¢â‚¬â€ one full-bleed sticky card in the stack
 *    Ã¢â‚¬Â¢ Pins to top while the next card scrolls up over it (overlap effect)
 *    Ã¢â‚¬Â¢ Subtle scale + fade as it gets covered (stack feel)
 *    Ã¢â‚¬Â¢ Image overlay wipes down on enter, mimicking the .image-overlay.red
 * ==================================================================== */
function ServiceCard({
  s,
  index,
  total,
}: {
  s: Service
  index: number
  total: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 40px", "end 40px"],
  })

  const isLast = index === total - 1

  const scale = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    prefersReduced ? [1, 1, 1] : [1, isLast ? 1 : 0.85, isLast ? 1 : 0.85],
  )
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    prefersReduced ? [1, 1, 1] : [1, isLast ? 1 : 0, isLast ? 1 : 0],
  )
  const y = useTransform(
    scrollYProgress, 
    [0, 0.7, 1], 
    [0, isLast ? 0 : (prefersReduced ? 0 : -50), isLast ? 0 : (prefersReduced ? 0 : -50)]
  )

  // Progressive sticky top — each card sits a hair lower than the previous,
  // so the stack is physically visible (not all pinned at the same y).
  const stickyOffset = `calc(40px)`

  const getTheme = (n: string) => {
    switch (n) {
      case "01": return { accent: "text-[#FF5812]", bg: "bg-[#FF5812]", bgGlow: "from-blue-600/20 to-[#FF5812]/10", borderGlow: "ring-[#FF5812]/30", highlight: "Analyser", tagHover: "hover:border-[#FF5812]/50 hover:text-[#FF5812]", iconBg: "bg-[#FF5812]/10", borderAccent: "border-[#FF5812]/20" };
      case "02": return { accent: "text-[#FF5812]", bg: "bg-[#FF5812]", bgGlow: "from-emerald-600/20 to-[#FF5812]/10", borderGlow: "ring-[#FF5812]/30", highlight: "Services", tagHover: "hover:border-[#FF5812]/50 hover:text-[#FF5812]", iconBg: "bg-[#FF5812]/10", borderAccent: "border-[#FF5812]/20" };
      case "03": return { accent: "text-[#FF5812]", bg: "bg-[#FF5812]", bgGlow: "from-fuchsia-600/20 to-[#FF5812]/10", borderGlow: "ring-[#FF5812]/30", highlight: "AI", tagHover: "hover:border-[#FF5812]/50 hover:text-[#FF5812]", iconBg: "bg-[#FF5812]/10", borderAccent: "border-[#FF5812]/20" };
      case "04": return { accent: "text-[#FF5812]", bg: "bg-[#FF5812]", bgGlow: "from-cyan-600/20 to-[#FF5812]/10", borderGlow: "ring-[#FF5812]/30", highlight: "Automations", tagHover: "hover:border-[#FF5812]/50 hover:text-[#FF5812]", iconBg: "bg-[#FF5812]/10", borderAccent: "border-[#FF5812]/20" };
      case "05": return { accent: "text-[#FF5812]", bg: "bg-[#FF5812]", bgGlow: "from-[#FF5812]/20 to-purple-500/10", borderGlow: "ring-[#FF5812]/30", highlight: "SharePoint", tagHover: "hover:border-[#FF5812]/50 hover:text-[#FF5812]", iconBg: "bg-[#FF5812]/10", borderAccent: "border-[#FF5812]/20" };
      case "06": return { accent: "text-[#FF5812]", bg: "bg-[#FF5812]", bgGlow: "from-emerald-600/20 to-[#FF5812]/10", borderGlow: "ring-[#FF5812]/30", highlight: "Data \\+ BI", tagHover: "hover:border-[#FF5812]/50 hover:text-[#FF5812]", iconBg: "bg-[#FF5812]/10", borderAccent: "border-[#FF5812]/20" };
      case "07": return { accent: "text-[#FF5812]", bg: "bg-[#FF5812]", bgGlow: "from-[#FF5812]/20 to-orange-600/5", borderGlow: "ring-[#FF5812]/30", highlight: "Applications", tagHover: "hover:border-[#FF5812]/50 hover:text-[#FF5812]", iconBg: "bg-[#FF5812]/10", borderAccent: "border-[#FF5812]/20" };
      case "08": return { accent: "text-[#FF5812]", bg: "bg-[#FF5812]", bgGlow: "from-purple-600/20 to-[#FF5812]/10", borderGlow: "ring-[#FF5812]/30", highlight: "Web App", tagHover: "hover:border-[#FF5812]/50 hover:text-[#FF5812]", iconBg: "bg-[#FF5812]/10", borderAccent: "border-[#FF5812]/20" };
      default: return { accent: "text-[#FF5812]", bg: "bg-[#FF5812]", bgGlow: "from-[#FF5812]/20 to-orange-600/5", borderGlow: "ring-[#FF5812]/30", highlight: "", tagHover: "hover:border-[#FF5812]/50 hover:text-[#FF5812]", iconBg: "bg-[#FF5812]/10", borderAccent: "border-[#FF5812]/20" };
    }
  }

  const getCtaText = (title: string) => {
    if (title.includes("Web Analyser")) return "Explore AI Web Analyser";
    if (title.includes("AI Development")) return "Explore AI Development Services";
    if (title.includes("Generative AI")) return "Explore Generative AI Services";
    if (title.includes("Power Platform")) return "Explore Power Platform Services";
    if (title.includes("SharePoint")) return "Explore SharePoint Modernization";
    if (title.includes("Data + BI")) return "Explore Data & BI Services";
    if (title.includes("Legacy Applications")) return "Explore Legacy Modernization";
    if (title.includes("Ship a Web App")) return "Start Shipping Your Web App";
    return `Explore ${title}`;
  }

  const theme = getTheme(s.n);
  const titleParts = theme.highlight ? s.title.split(new RegExp(`(${theme.highlight})`, 'gi')) : [s.title];

  return (
    <div
      ref={ref}
      className={`sticky w-full px-4 sm:px-6 pt-4 ${isLast ? 'pb-0' : 'pb-6 md:pb-32 lg:pb-40'}`}
      style={{ top: stickyOffset }}
    >
      <motion.article
        style={{
          scale,
          opacity,
          y,
          transformOrigin: 'top center',
        }}
        className="relative mx-auto w-full max-w-[1200px] h-auto min-h-[450px] md:min-h-[500px] rounded-[32px] bg-black border border-white/5 flex flex-col"
      >
        {/* Soft outer glow / inner radial gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.bgGlow} opacity-30 pointer-events-none rounded-[32px]`} />

        <div className="relative z-10 grid h-full grid-cols-1 lg:grid-cols-[45fr_55fr] gap-6 lg:gap-8 xl:gap-10 p-5 sm:p-6 md:p-8 lg:p-8 xl:p-10 flex-grow items-center">

          {/* LEFT COLUMN CONTAINER */}
          <div className="flex flex-col justify-center h-full w-full max-w-[600px] mx-auto lg:mx-0">

            {/* 1. Label */}
            <div className="mb-3 md:mb-4 lg:mb-5 flex items-center gap-3 md:gap-4 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
              <span className="h-px w-6 md:w-8 bg-[#FF5812]" />
              SERVICES WE DELIVER
            </div>

            {/* 2. Title & Number */}
            <div className="relative mb-3 md:mb-4 lg:mb-5">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-[800] text-white leading-[1.05] tracking-tight text-wrap md:text-balance" style={{ fontSize: "clamp(26px, 3vw, 44px)" }}>
                  {titleParts.map((part, i) =>
                    part.toLowerCase() === theme.highlight.replace(/\\/g, '').toLowerCase() ? (
                      <span key={i} className={theme.accent}>{part}</span>
                    ) : (
                      <span key={i}>{part}</span>
                    )
                  )}
                </h3>
                <span className={`text-[20px] md:text-[24px] lg:text-[28px] font-bold ${theme.accent} shrink-0 mt-2`}>
                  {`{${s.n}}`}
                </span>
              </div>
            </div>

            {/* 3. Description */}
            <p className="text-[12px] sm:text-[13px] md:text-[14px] leading-[1.5] text-white/70 mb-3 md:mb-4 max-w-[460px]">
              {s.desc}
            </p>

            {/* 4. Image (Mobile only, hidden on lg) */}
            <div className="relative w-full h-auto min-h-[120px] sm:min-h-[180px] flex items-center justify-center lg:hidden mb-6">
              <a href={s.href} className={`relative block w-[92%] sm:w-[85%] h-[120px] sm:h-[180px] p-1.5 sm:p-2 rounded-[24px] border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-transform duration-700 hover:scale-[1.02] z-10 ring-1 ${theme.borderGlow}`}>
                <div className="relative w-full h-full rounded-[16px] overflow-hidden bg-[#0B0F19]/50">
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={index < 2}
                  />
                </div>
              </a>
            </div>

            {/* 5. White-Label Box */}
            {s.whiteLabel && (
              <div className="mb-3 lg:mb-4 flex flex-col gap-2 lg:gap-3 rounded-[16px] border border-white/10 bg-white/[0.03] p-3 md:p-4 backdrop-blur-md shadow-lg relative overflow-hidden group">
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${theme.bgGlow} opacity-50`} />

                <div className="flex items-center gap-4 relative z-10">
                  <div className={`flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl ${theme.iconBg} border ${theme.borderAccent}`}>
                    {/* Abstract Logo Icon */}
                    <svg className={`h-5 w-5 md:h-6 md:w-6 ${theme.accent}`} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                      {s.whiteLabel.title}
                    </span>
                    <span className="text-[10px] md:text-[11px] text-white/60 mt-0.5 md:mt-1">
                      {s.whiteLabel.subtitle}
                    </span>
                  </div>
                </div>

                <div className="h-px w-full bg-white/10 relative z-10" />

                <div className="flex flex-wrap gap-x-4 md:gap-x-5 gap-y-2 md:gap-y-3 relative z-10">
                  {s.whiteLabel.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className={`h-1.5 w-1.5 rounded-full ${theme.bg}`} />
                      <span className="text-[10px] md:text-[11px] font-medium text-white/80">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Tags */}
            <div className="flex flex-wrap gap-2 md:gap-2.5 mb-4">
              {s.tags.map((t) => (
                <span
                  key={t}
                  className={`flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 md:px-2.5 md:py-1 text-[9px] md:text-[10px] font-medium text-white/70 backdrop-blur-md transition-colors hover:bg-white/10 ${theme.tagHover}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${theme.bg}`} />
                  {t}
                </span>
              ))}
            </div>

            {/* 7. CTA */}
            <div className="mt-auto pointer-events-auto flex">
              <a
                href={s.href}
                className={`inline-flex items-center justify-center gap-2 md:gap-2.5 rounded-full bg-gradient-to-r from-[#FF5812] to-[#FF7B00] px-4 py-2 md:px-5 md:py-2.5 text-[12px] md:text-[13px] font-bold text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,88,18,0.4)]`}
              >
                {getCtaText(s.title)}
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN (Desktop only) */}
          <div className="hidden lg:flex relative w-full h-full min-h-[200px] max-h-[300px] items-center justify-center">
            {/* Glow behind image */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-gradient-to-br ${theme.bgGlow} blur-[60px] md:blur-[80px] rounded-full pointer-events-none opacity-60`} />

            <a href={s.href} className={`relative block w-[90%] xl:w-[85%] h-[200px] md:h-[260px] p-2 md:p-3 rounded-[32px] border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-transform duration-700 hover:scale-[1.02] z-10 ring-1 ${theme.borderGlow}`}>
              <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-[#0B0F19]/50">
                <Image
                  src={s.img}
                  alt={s.title}
                  fill
                  className="object-cover"
                  sizes="50vw"
                  priority={index < 2}
                />
              </div>
            </a>
          </div>

        </div>
      </motion.article>
    </div>
  )
}


export default function LightServicesStickyList() {
  return (
    <section
      data-section="services-sticky"
      data-theme-section="light"
      className="relative w-full border-t border-[#0a0a1a]/[0.06]"
      style={{ backgroundColor: SURFACE }}
      aria-labelledby="services-sticky-heading"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 pb-8 pt-20 md:px-10 md:pb-10 md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: DUR.section, ease: EASE_T.silk }}
        >
          <SectionHeader
            badge="Services"
            accent={ACCENT_ORANGE}
            headline={
              <span
                id="services-sticky-heading"
                className="text-balance"
                style={{
                  fontSize: "clamp(40px, 7vw, 88px)",
                  lineHeight: 0.94,
                  letterSpacing: "-0.04em",
                }}
              >
                What we build for you
              </span>
            }
            body="Scroll the stack — each card is a delivery lane with scope, timeline, and a path to the right practice page."
          />
        </motion.div>
      </div>

      {/* Sticky stack track */}
      <div className="relative pb-4 md:pb-6">
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.n} s={s} index={i} total={SERVICES.length} />
        ))}
      </div>

      <div className="mx-auto w-full max-w-[1280px] px-6 pb-6 md:px-10 md:pb-8">
        <div className="h-px w-full bg-[#0a0a1a]/[0.08]" />
      </div>
    </section>
  )
}
