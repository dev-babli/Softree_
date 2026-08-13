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
    tags: ["AI Growth Intelligence", "Website Audit", "Conversion Optimization", "UX Insights"],
    img: "/images/webanalyser-fixed.png",
    whiteLabel: {
      title: "FREE AI CONVERSION AUDIT",
      subtitle: "Instant Report - Actionable Insights - No Obligation",
      features: ["Performance Scoring", "UX Flow Analysis", "CRO Recommendations"]
    }
  },

  {
    n: "02",
    title: "Agentic AI",
    href: "/services/offshore-ai-development",
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
    title: "AI Workflow Orchestration",
    href: "/services/ai-workflow-orchestration",
    desc: "Connect AI agents, business systems, and automated workflows to streamline operations, orchestrate intelligent processes, and scale productivity.",
    tags: ["AI Workflows", "Orchestration", "Automation", "Integrations"],
    img: "/images/aiworkflowservices.png",
    whiteLabel: {
      title: "WHITE-LABEL AI AUTOMATION PARTNER",
      subtitle: "Offshore Delivery - Your Brand - Our Expertise",
      features: ["Workflow Automation", "System Integration", "AI Specialists"]
    }
  }, {
    n: "05",
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
    n: "06",
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
    n: "07",
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
    n: "08",
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
    n: "09",
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
    offset: ["start start", "end start"],
  })

  const isLast = index === total - 1
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    prefersReduced ? [1, 1, 1] : [1, 0.97, isLast ? 1 : 0.85],
  )
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    prefersReduced ? [1, 1, 1] : [1, 0.92, isLast ? 1 : 0.55],
  )
  const y = useTransform(scrollYProgress, [0, 1], [0, isLast ? 0 : (prefersReduced ? 0 : -50)])

  const overlayRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: enterProgress } = useScroll({
    target: overlayRef,
    offset: ["start 0.98", "start 0.35"],
  })
  const overlayHeight = useTransform(enterProgress, [0, 1], prefersReduced ? ["0%", "0%"] : ["100%", "0%"])

  // Progressive sticky top Ã¢â‚¬â€ each card sits a hair lower than the previous,
  // so the stack is physically visible (not all pinned at the same y).
  const stickyOffset = `calc(40px)`

  return (
    <div
      ref={ref}
      className="sticky w-full px-4 sm:px-6 pt-4 pb-20 md:pb-32 lg:pb-40"
      style={{ top: stickyOffset }}
    >
      <motion.article
        ref={overlayRef}
        style={{
          scale,
          opacity,
          y,
          transformOrigin: 'top center',
        }}
        className={
          s.n === "01" || s.n === "02" || s.n === "03" || s.n === "04" || s.n === "05" || s.n === "06" || s.n === "07" || s.n === "08" || s.n === "09"
            ? `relative mx-auto w-full max-w-7xl h-auto min-h-[60svh] lg:min-h-[75svh] py-4 lg:py-6 overflow-hidden text-white shadow-2xl ring-1 ring-white/10 ${s.n === "01" ? "rounded-[24px] bg-[#03030a]" : s.n === "02" ? "rounded-[24px] bg-[#050212]" : s.n === "03" ? "rounded-[24px] bg-[#120308]" : s.n === "04" ? "rounded-[24px] bg-[#020b12]" : s.n === "05" ? "rounded-[24px] bg-[#020617]" : s.n === "06" ? "rounded-[24px] bg-[#08080c]" : s.n === "07" ? "rounded-[24px] bg-[#031817]" : s.n === "08" ? "rounded-[24px] bg-[#05050A]" : "rounded-[24px] bg-[#020817]"
            }`
            : "relative mx-auto w-full max-w-7xl overflow-hidden rounded-[18px] border border-[#0a0a1a]/[0.08] bg-white shadow-[0_1px_2px_rgba(10,10,26,0.04),0_20px_50px_-28px_rgba(10,10,26,0.14)] ring-1 ring-[#FF5812]/10"
        }
      >
        {s.n === "01" ? (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-80"
              style={{
                background: `
                  radial-gradient(ellipse at 75% 40%, rgba(30, 60, 255, 0.25), transparent 60%),
                  radial-gradient(ellipse at 90% 70%, rgba(255, 88, 18, 0.15), transparent 50%),
                  radial-gradient(ellipse at 15% 20%, rgba(120, 30, 255, 0.15), transparent 40%)
                `,
              }}
            />
            {/* Energy trails / particles simulated around the right image */}
            <div className="pointer-events-none absolute top-[-20%] right-[-10%] w-[70%] h-[90%] rounded-full bg-blue-600/20 blur-[120px]" />
            <div className="pointer-events-none absolute bottom-[-10%] right-[10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[100px]" />
            <div className="pointer-events-none absolute bottom-[10%] right-[30%] w-[30%] h-[30%] rounded-full bg-orange-500/10 blur-[80px]" />

            <div className="relative z-10 grid min-h-full h-auto grid-cols-1 items-center gap-6 p-6 md:gap-10 md:p-12 lg:grid-cols-[45fr_55fr] lg:gap-10 lg:p-10 xl:p-12">

              {/* LEFT */}
              <div className="flex flex-col h-auto justify-center">
                <span className="mb-4 md:mb-6 inline-flex items-center gap-3 md:gap-4 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">
                  <span className="h-[2px] w-8 md:w-10 bg-indigo-500 rounded-full" />
                  SERVICES WE DELIVER
                  <span className="flex items-center">
                    <span className="h-[2px] w-4 md:w-6 bg-orange-500 rounded-l-full" />
                    <span className="h-[2px] w-6 md:w-8 bg-[#1a103c] rounded-r-full" />
                  </span>
                </span>

                <a href={s.href} className="block relative mb-4 md:mb-5 pr-28 md:pr-32 lg:pr-12 cursor-pointer hover:opacity-80 transition-opacity">
                  {/* Number */}
                  <span className="absolute top-[-10px] right-0 lg:right-[-10px] text-[16px] md:text-[16px] lg:text-[22px] font-bold text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                    {`{${s.n}}`}
                  </span>

                  <h3
                    className="font-[800] text-white leading-[1.1] md:leading-[1.05] tracking-tight text-wrap md:text-balance"
                    style={{
                      fontSize: "clamp(20px, 5vw, 48px)",
                    }}
                  >
                    AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Web</span> Analyser
                  </h3>
                </a>

                <p className="max-w-[500px] text-[13px] leading-[1.6] text-white/80 md:text-[14px] lg:text-[15px] mb-5 md:mb-6">
                  {s.desc}
                </p>

                {/* White Label panel as premium dark glass */}
                {s.whiteLabel && (
                  <div className="mb-5 md:mb-6 flex flex-col gap-4 md:gap-5 rounded-2xl border border-blue-400/20 bg-[#0a0f1f]/60 p-5 md:p-7 backdrop-blur-xl max-w-[520px] shadow-[0_10px_40px_rgba(0,0,0,0.5),inset_0_0_30px_rgba(100,150,255,0.05)] relative overflow-hidden group/audit">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover/audit:opacity-100 transition-opacity duration-500" />

                    <div className="flex items-center gap-4 md:gap-5 relative z-10">
                      <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                        <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-[#FF5812]">
                          {s.whiteLabel.title}
                        </span>
                        <span className="text-[11px] md:text-[12px] font-medium text-white mt-0.5 md:mt-1">
                          {s.whiteLabel.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="h-px w-full bg-blue-400/10 relative z-10" />

                    <div className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-2 md:gap-y-3 relative z-10">
                      {s.whiteLabel.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 md:gap-2.5">
                          <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-[#FF5812] shadow-[0_0_8px_#FF5812]" />
                          <span className="text-[11px] md:text-[12px] font-medium text-white/80">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-5">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 md:px-5 md:py-2 text-[11px] md:text-[12px] font-medium tracking-wide text-white/90 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.1)] transition-colors hover:bg-purple-500/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {/* CTA (Top Right) */}
                <div className="mt-6 md:mt-8 z-[100] pointer-events-auto flex justify-start">



                  {/* CTA */}
                  <a
                    href={s.href}
                    className="inline-flex w-fit items-center justify-center gap-2 md:gap-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 md:px-5 md:py-2.5 text-[12px] md:text-[14px] font-bold text-white transition-all shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_50px_rgba(124,58,237,0.6)] hover:scale-[1.02] relative overflow-hidden group/cta"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-orange-500/0 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10">Explore AI Web Analyser</span>
                    <svg className="w-4 h-4 md:w-5 md:h-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>

                </div>
              </div>

              {/* RIGHT */}
              <div className="relative w-[90%] lg:w-[85%] mx-auto h-auto flex items-center justify-center lg:justify-end min-h-[200px] md:min-h-[350px] lg:min-h-[500px] mt-6 lg:mt-0 pb-8 lg:pb-0">
                {/* Strong glow behind laptop */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] max-w-[600px] max-h-[600px] bg-gradient-to-br from-blue-600/40 via-purple-600/30 to-orange-500/10 blur-[100px] rounded-full pointer-events-none" />

                {/* The Laptop Image Asset Container */}
                <div className="relative z-10 w-full max-w-[550px] lg:max-w-[620px] xl:max-w-[680px] lg:-translate-y-6 xl:-translate-y-10">


                  {/* Subtle bloom directly behind laptop */}
                  <div className="absolute inset-0 bg-blue-500/20 blur-[50px] pointer-events-none transform scale-95" />

                  <a href={s.href} className="relative block w-full rounded-[24px] p-2 md:p-4 overflow-hidden bg-white/5 backdrop-blur-md drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-transform duration-700 hover:scale-[1.02] z-10 border border-white/10 ring-1 ring-cyan-500/20">
                    <Image
                      src={s.img}
                      alt={s.title}
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-xl object-contain"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority={index < 2}
                    />
                  </a>
                </div>
              </div>
            </div>
          </>
        ) : s.n === "02" ? (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-90"
              style={{
                background: `
                  radial-gradient(ellipse at 80% 50%, rgba(16, 185, 129, 0.15), transparent 60%),
                  radial-gradient(ellipse at 80% 80%, rgba(234, 179, 8, 0.1), transparent 50%),
                  radial-gradient(ellipse at 20% 20%, rgba(16, 185, 129, 0.05), transparent 40%)
                `,
              }}
            />

            {/* Neural network grid / rings background */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-30" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="grid-pattern-02" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(16, 185, 129, 0.1)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#grid-pattern-02)" />

              {/* Concentric rings for AI command center vibe */}
              <g stroke="rgba(16, 185, 129, 0.2)" fill="none" strokeWidth="1" opacity="0.6">
                <circle cx="800" cy="500" r="200" strokeDasharray="4 8" />
                <circle cx="800" cy="500" r="300" strokeDasharray="10 15" opacity="0.5" />
                <circle cx="800" cy="500" r="450" strokeDasharray="2 6" opacity="0.3" />
              </g>

              {/* Connecting lines */}
              <path d="M800,300 L650,200 L500,250" stroke="rgba(234, 179, 8, 0.3)" strokeWidth="1.5" fill="none" className="animate-[pulse_4s_ease-in-out_infinite]" />
              <path d="M800,700 L600,850 L400,800" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="1.5" fill="none" className="animate-[pulse_5s_ease-in-out_infinite]" />

              <circle cx="650" cy="200" r="4" fill="#eab308" opacity="0.8" className="animate-ping" />
              <circle cx="600" cy="850" r="4" fill="#10b981" opacity="0.8" className="animate-ping" />
            </svg>

            {/* Subtle light trails */}
            <div className="pointer-events-none absolute top-[-10%] right-[0%] w-[60%] h-[80%] rounded-full bg-emerald-500/10 blur-[120px]" />
            <div className="pointer-events-none absolute bottom-[10%] right-[20%] w-[40%] h-[40%] rounded-full bg-yellow-500/10 blur-[100px]" />

            <div className="relative z-10 grid min-h-full h-auto grid-cols-1 items-center gap-6 p-6 md:gap-10 md:p-12 lg:grid-cols-[45fr_55fr] lg:gap-10 lg:p-10 xl:p-12">

              {/* LEFT */}
              <div className="flex flex-col h-auto justify-center">
                {/* Top Label */}
                <span className="mb-4 md:mb-6 inline-flex items-center gap-3 md:gap-4 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">
                  <span className="h-[2px] w-6 md:w-8 bg-emerald-500 rounded-full" />
                  SERVICES WE DELIVER
                  <span className="h-[2px] w-4 md:w-6 bg-yellow-500 rounded-full" />
                </span>

                <a href={s.href} className="block relative mb-4 md:mb-5 pr-28 md:pr-32 lg:pr-12 cursor-pointer hover:opacity-80 transition-opacity">
                  {/* Number */}
                  <span className="absolute top-0 right-0 lg:right-[-10px] text-[16px] md:text-[16px] lg:text-[22px] font-bold text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                    {`{${s.n}}`}
                  </span>
                  {/* Headline */}
                  <h3
                    className="font-[800] text-white leading-[1.1] md:leading-[1.05] tracking-tight text-wrap md:text-balance"
                    style={{ fontSize: "clamp(20px, 5vw, 48px)" }}
                  >
                    Agentic{" "}
                    <span className="bg-gradient-to-r from-emerald-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                      AI
                    </span>
                  </h3>
                </a>

                <p className="max-w-[480px] text-[13px] leading-[1.6] text-white/70 md:text-[14px] lg:text-[15px] mb-5 md:mb-6">
                  {s.desc}
                </p>

                {/* White Label Panel */}
                {s.whiteLabel && (
                  <div className="mb-5 md:mb-6 flex flex-col gap-3 md:gap-4 rounded-2xl border border-emerald-500/20 bg-[#0a1010]/60 p-5 md:p-7 backdrop-blur-xl max-w-[520px] shadow-[0_10px_40px_rgba(0,0,0,0.5),inset_0_0_30px_rgba(16,185,129,0.05)] relative overflow-hidden group/audit">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover/audit:opacity-100 transition-opacity duration-500" />

                    <div className="flex items-center gap-4 md:gap-5 relative z-10">
                      <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                        <svg className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-400">
                          {s.whiteLabel.title}
                        </span>
                        <span className="text-[11px] md:text-[12px] font-medium text-white/90 mt-0.5 md:mt-1">
                          {s.whiteLabel.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="h-px w-full bg-emerald-500/10 relative z-10" />

                    <div className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-2 md:gap-y-3 relative z-10">
                      {s.whiteLabel.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 md:gap-2.5">
                          <svg className="h-3.5 w-3.5 md:h-4 md:w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-[11px] md:text-[12px] font-medium text-white/80">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 md:gap-2.5 mb-4 md:mb-5">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-emerald-500/30 bg-emerald-950/20 px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-[11px] font-medium tracking-wide text-white/90 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-colors hover:bg-emerald-900/30"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {/* CTA (Top Right) */}
                <div className="mt-6 md:mt-8 z-[100] pointer-events-auto flex justify-start">



                  {/* CTA */}
                  <a
                    href={s.href}
                    className="inline-flex w-fit items-center justify-center gap-2 md:gap-3 rounded-full bg-gradient-to-r from-emerald-500 to-yellow-500 px-4 py-2 md:px-5 md:py-2.5 text-[12px] md:text-[14px] font-bold text-black transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(234,179,8,0.5)] hover:scale-[1.02]"
                  >
                    Explore Agentic AI Services
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>

                </div>
              </div>

              {/* RIGHT */}
              <a href={s.href} className="group/right block cursor-pointer hover:opacity-95 transition-opacity relative w-[90%] lg:w-[85%] mx-auto h-auto flex flex-col items-center justify-center lg:justify-end min-h-[250px] md:min-h-[400px] lg:min-h-[600px] mt-6 lg:mt-0 pb-8 lg:pb-0">

                {/* 
                  The Hero Robot Visual
                */}
                <div className="relative z-10 w-full max-w-[450px] lg:max-w-[550px] xl:max-w-[650px] mb-auto translate-y-8 lg:translate-y-16">

                  {/* Robot Image */}
                  <div className="relative w-full rounded-2xl overflow-visible drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-10 transition-transform duration-700 hover:scale-[1.02]">
                    <Image
                      src={s.img}
                      alt={s.title}
                      width={800}
                      height={800}
                      className="w-full h-auto object-contain"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority={index < 2}
                    />
                  </div>


                </div>


              </a>
            </div>
          </>
        ) : s.n === "03" ? (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-90"
              style={{
                background: `
                  radial-gradient(ellipse at 80% 50%, rgba(168, 85, 247, 0.2), transparent 60%),
                  radial-gradient(ellipse at 80% 80%, rgba(59, 130, 246, 0.15), transparent 50%),
                  radial-gradient(ellipse at 20% 20%, rgba(217, 70, 239, 0.1), transparent 40%)
                `,
              }}
            />

            {/* Neural network / futuristic lines background */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-30" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="grid-pattern-03" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(168, 85, 247, 0.1)" strokeWidth="1" />
                </pattern>

                <linearGradient id="glow-line-03" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(217, 70, 239, 0.4)" />
                  <stop offset="50%" stopColor="rgba(168, 85, 247, 0.6)" />
                  <stop offset="100%" stopColor="rgba(59, 130, 246, 0.4)" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#grid-pattern-03)" />

              {/* Sweeping abstract neural lines */}
              <path d="M-100,500 C200,800 600,200 1100,600" fill="none" stroke="url(#glow-line-03)" strokeWidth="1.5" opacity="0.6" className="animate-[pulse_5s_ease-in-out_infinite]" />
              <path d="M-50,700 C300,900 700,400 1200,800" fill="none" stroke="url(#glow-line-03)" strokeWidth="0.75" opacity="0.4" />
              <path d="M-200,300 C400,100 800,600 1300,400" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" opacity="0.5" />
            </svg>

            {/* Subtle light trails */}
            <div className="pointer-events-none absolute top-[-10%] right-[-10%] w-[60%] h-[80%] rounded-full bg-purple-600/10 blur-[120px]" />
            <div className="pointer-events-none absolute bottom-[10%] right-[20%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[100px]" />
            <div className="pointer-events-none absolute top-[40%] right-[40%] w-[30%] h-[30%] rounded-full bg-fuchsia-600/10 blur-[80px]" />

            <div className="relative z-10 grid min-h-full h-auto grid-cols-1 items-center gap-6 p-6 md:gap-10 md:p-12 lg:grid-cols-[45fr_55fr] lg:gap-10 lg:p-10 xl:p-12">

              {/* LEFT */}
              <div className="flex flex-col h-auto justify-center">
                {/* Top Label */}
                <span className="mb-4 md:mb-6 inline-flex items-center gap-3 md:gap-4 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">
                  <span className="h-[2px] w-6 md:w-8 bg-blue-500 rounded-full" />
                  SERVICES WE DELIVER
                  <span className="h-[2px] w-4 md:w-6 bg-pink-500 rounded-full" />
                </span>

                <a href={s.href} className="block relative mb-4 md:mb-5 pr-28 md:pr-32 lg:pr-12 cursor-pointer hover:opacity-80 transition-opacity">
                  {/* Number */}
                  <span className="absolute top-0 right-0 lg:right-[20px] text-[16px] md:text-[16px] lg:text-[22px] font-bold text-fuchsia-400 drop-shadow-[0_0_10px_rgba(217,70,239,0.5)]">
                    {`{${s.n}}`}
                  </span>
                  {/* Headline */}
                  <h3
                    className="font-[800] text-white leading-[1.1] md:leading-[1.05] tracking-tight text-wrap md:text-balance"
                    style={{ fontSize: "clamp(20px, 5vw, 48px)" }}
                  >
                    Generative{" "}
                    <span className="bg-gradient-to-r from-purple-500 via-fuchsia-500 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                      AI
                    </span>
                  </h3>
                </a>

                <p className="max-w-[480px] text-[13px] leading-[1.6] text-white/70 md:text-[14px] lg:text-[15px] mb-5 md:mb-6">
                  {s.desc}
                </p>

                {/* White Label Panel */}
                {s.whiteLabel && (
                  <div className="mb-5 md:mb-6 flex flex-col gap-3 md:gap-4 rounded-2xl border border-purple-500/30 bg-[#0a0815]/70 p-5 md:p-7 backdrop-blur-xl max-w-[520px] shadow-[0_10px_40px_rgba(0,0,0,0.5),inset_0_0_30px_rgba(168,85,247,0.05)] relative overflow-hidden group/audit">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover/audit:opacity-100 transition-opacity duration-500" />

                    <div className="flex items-center gap-4 md:gap-5 relative z-10">
                      <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                        <svg className="h-6 w-6 md:h-7 md:w-7 text-fuchsia-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-fuchsia-400 drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]">
                          {s.whiteLabel.title}
                        </span>
                        <span className="text-[11px] md:text-[12px] font-medium text-white/90 mt-0.5 md:mt-1">
                          {s.whiteLabel.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="h-px w-full bg-purple-500/20 relative z-10" />

                    <div className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-2 md:gap-y-3 relative z-10">
                      {s.whiteLabel.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 md:gap-2.5">
                          <svg className="h-3.5 w-3.5 md:h-4 md:w-4 text-fuchsia-400 drop-shadow-[0_0_5px_rgba(217,70,239,0.8)]" viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" clipRule="evenodd" />
                          </svg>
                          <span className="text-[11px] md:text-[12px] font-medium text-white/80">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 md:gap-2.5 mb-4 md:mb-5">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-950/30 px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-[11px] font-medium tracking-wide text-white/90 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-colors hover:bg-purple-900/40"
                    >
                      <span className="text-purple-400/80">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      </span>
                      {t}
                    </span>
                  ))}
                </div>
                {/* CTA (Top Right) */}
                <div className="mt-6 md:mt-8 z-[100] pointer-events-auto flex justify-start">



                  {/* CTA */}
                  <a
                    href={s.href}
                    className="inline-flex w-fit items-center justify-center gap-2 md:gap-3 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-blue-500 px-4 py-2 md:px-5 md:py-2.5 text-[12px] md:text-[14px] font-bold text-white transition-all shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(217,70,239,0.6)] hover:scale-[1.02]"
                  >
                    Explore Generative AI Services
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>

                </div>
              </div>

              {/* RIGHT */}
              <a href={s.href} className="group/right block cursor-pointer hover:opacity-95 transition-opacity relative w-[90%] lg:w-[85%] mx-auto h-auto flex flex-col items-center justify-center lg:justify-end min-h-[250px] md:min-h-[400px] lg:min-h-[600px] mt-6 lg:mt-0 pb-8 lg:pb-0">

                {/* 
                  The Hero AI Visual
                */}
                <div className="relative z-10 w-full max-w-[500px] lg:max-w-[650px] xl:max-w-[750px] mb-auto translate-y-8 lg:translate-y-16">

                  {/* Glowing platform base for the brain (simulated behind image if needed, or if image has it, just accentuate it) */}
                  <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[70%] h-[20px] bg-fuchsia-500/20 blur-[30px] rounded-full z-0" />

                  {/* Main GenAI Image */}
                  <div className="relative w-full overflow-visible drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10 transition-transform duration-700 hover:scale-[1.02]">
                    <Image
                      src={s.img}
                      alt={s.title}
                      width={900}
                      height={900}
                      className="w-full h-auto object-contain mix-blend-screen md:mix-blend-normal"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority={index < 2}
                    />
                  </div>
                </div>


              </a>
            </div>
          </>
        ) : s.n === "04" ? (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-80"
              style={{
                background: `
                  radial-gradient(ellipse at 75% 40%, rgba(22, 199, 255, 0.15), transparent 60%),
                  radial-gradient(ellipse at 15% 20%, rgba(59, 130, 246, 0.1), transparent 40%),
                  radial-gradient(ellipse at 90% 70%, rgba(255, 210, 26, 0.05), transparent 50%)
                `,
              }}
            />
            {/* Grid overlay for a tech feel */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(22, 199, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(22, 199, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="relative z-10 grid min-h-full h-auto grid-cols-1 items-center gap-6 p-6 md:gap-10 md:p-12 lg:grid-cols-[42fr_58fr] lg:gap-10 lg:p-10 xl:p-12">

              {/* LEFT */}
              <div className="flex flex-col h-auto justify-center">
                <span className="mb-4 md:mb-6 inline-flex items-center gap-3 md:gap-4 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">
                  <span className="h-[2px] w-8 md:w-10 bg-[#168CFF] rounded-full" />
                  SERVICES WE DELIVER
                  <span className="h-[2px] w-8 md:w-10 bg-[#FFD21A] rounded-full" />
                </span>

                <a href={s.href} className="block relative mb-4 md:mb-5 pr-28 md:pr-32 lg:pr-12 cursor-pointer hover:opacity-80 transition-opacity">
                  {/* Number */}
                  <span className="absolute top-0 right-0 lg:right-[-10px] text-[16px] md:text-[16px] lg:text-[22px] font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                    {`{${s.n}}`}
                  </span>
                  {/* Headline */}
                  <h3
                    className="font-[800] text-white leading-[1.1] md:leading-[1.05] tracking-tight text-wrap md:text-balance"
                    style={{ fontSize: "clamp(20px, 5vw, 48px)" }}
                  >
                    AI Workflow{" "}
                    <span className="bg-gradient-to-r from-[#168CFF] to-[#16C7FF] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(22,199,255,0.2)]">
                      Orchestration
                    </span>
                  </h3>
                </a>

                <p className="max-w-[500px] text-[13px] leading-[1.6] text-white/70 md:text-[14px] lg:text-[15px] mb-5 md:mb-6">
                  {s.desc}
                </p>

                {/* White Label Panel */}
                {s.whiteLabel && (
                  <div className="mb-5 md:mb-6 flex flex-col gap-4 md:gap-5 rounded-2xl border border-[#16C7FF]/30 bg-[#03101A]/80 p-5 md:p-7 backdrop-blur-xl max-w-[520px] shadow-[0_10px_40px_rgba(0,0,0,0.5),inset_0_0_30px_rgba(22,199,255,0.05)]">
                    <div className="flex items-center gap-4 md:gap-5">
                      <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl bg-[#168CFF]/20 text-[#16C7FF] border border-[#16C7FF]/40 shadow-[0_0_20px_rgba(22,199,255,0.3)]">
                        <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 8h4M10 18h4M8 10v4M18 10v4" />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-[#16C7FF]">
                          {s.whiteLabel.title}
                        </span>
                        <span className="text-[11px] md:text-[12px] font-medium text-white/90 mt-0.5 md:mt-1">
                          {s.whiteLabel.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="h-px w-full bg-[#16C7FF]/10" />

                    <div className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-2 md:gap-y-3">
                      {s.whiteLabel.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="flex h-4 w-4 items-center justify-center rounded bg-[#16C7FF]/20 text-[#16C7FF]">
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-[11px] md:text-[12px] font-medium text-white/80">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-5">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="flex items-center gap-2 rounded-full border border-[#168CFF]/40 bg-[#168CFF]/10 px-4 py-1.5 md:px-5 md:py-2 text-[11px] md:text-[12px] font-medium tracking-wide text-white/90 backdrop-blur-md shadow-[0_0_15px_rgba(22,199,255,0.1)] transition-colors hover:bg-[#168CFF]/20"
                    >
                      <svg className="w-3 h-3 text-[#16C7FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      {t}
                    </span>
                  ))}
                </div>
                {/* CTA (Top Right) */}
                <div className="mt-6 md:mt-8 z-[100] pointer-events-auto flex justify-start">



                  {/* CTA */}
                  <a
                    href={s.href}
                    className="inline-flex w-fit items-center justify-center gap-2 md:gap-3 rounded-full bg-gradient-to-r from-[#168CFF] via-[#16C7FF] to-[#10B981] px-4 py-2 md:px-5 md:py-2.5 text-[12px] md:text-[14px] font-bold text-white transition-all shadow-[0_0_30px_rgba(22,199,255,0.4)] hover:shadow-[0_0_50px_rgba(22,199,255,0.6)] hover:scale-[1.02]"
                  >
                    Explore AI Workflow Orchestration Services
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>

                </div>
              </div>

              {/* RIGHT */}
              <a href={s.href} className="group/right block cursor-pointer hover:opacity-95 transition-opacity relative w-[90%] lg:w-[85%] mx-auto h-auto flex items-center justify-center lg:justify-end mt-6 lg:mt-0 pb-8 lg:pb-0 z-10">
                {/* Glow behind the image */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] max-w-[800px] bg-gradient-to-br from-[#16C7FF]/20 via-[#168CFF]/20 to-[#FFD21A]/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 w-full max-w-[95%] lg:max-w-none transform transition-transform duration-700 hover:scale-[1.01]">
                  <Image
                    src={s.img}
                    alt={s.title}
                    width={1000}
                    height={800}
                    className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority={index < 2}
                  />
                </div>
              </a>
            </div>
          </>
        ) : s.n === "05" ? (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-80"
              style={{
                background: `
                  radial-gradient(ellipse at 80% 40%, rgba(6, 182, 212, 0.15), transparent 50%),
                  radial-gradient(ellipse at 90% 70%, rgba(16, 185, 129, 0.1), transparent 40%),
                  radial-gradient(ellipse at 20% 20%, rgba(14, 165, 233, 0.1), transparent 40%)
                `,
              }}
            />
            {/* Glows */}
            <div className="pointer-events-none absolute top-[10%] right-[-5%] w-[60%] h-[80%] rounded-full bg-cyan-600/10 blur-[120px]" />
            <div className="pointer-events-none absolute bottom-[-10%] right-[10%] w-[50%] h-[50%] rounded-full bg-teal-500/10 blur-[100px]" />
            <div className="pointer-events-none absolute bottom-[20%] right-[40%] w-[30%] h-[30%] rounded-full bg-blue-600/10 blur-[80px]" />

            {/* Curved light trails using simple SVG */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-30" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
              <path d="M600,1000 C600,600 1000,500 1000,200" stroke="url(#trail-1)" strokeWidth="2" fill="none" className="animate-[pulse_4s_ease-in-out_infinite]" />
              <path d="M400,1000 C500,800 900,600 1000,400" stroke="url(#trail-2)" strokeWidth="1" fill="none" opacity="0.6" />
              <path d="M700,0 C700,300 1000,500 1000,700" stroke="url(#trail-3)" strokeWidth="3" fill="none" className="animate-[pulse_5s_ease-in-out_infinite]" style={{ animationDelay: '1s' }} />
              <defs>
                <linearGradient id="trail-1" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stopColor="#0ea5e9" stopOpacity="0" /><stop offset="50%" stopColor="#0ea5e9" /><stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" /></linearGradient>
                <linearGradient id="trail-2" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stopColor="#10b981" stopOpacity="0" /><stop offset="50%" stopColor="#10b981" /><stop offset="100%" stopColor="#10b981" stopOpacity="0" /></linearGradient>
                <linearGradient id="trail-3" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#06b6d4" stopOpacity="0" /><stop offset="50%" stopColor="#06b6d4" /><stop offset="100%" stopColor="#06b6d4" stopOpacity="0" /></linearGradient>
              </defs>
            </svg>

            <div className="relative z-10 grid min-h-full h-auto grid-cols-1 items-center gap-6 p-6 md:gap-10 md:p-12 lg:grid-cols-[42fr_58fr] lg:gap-10 lg:p-10 xl:p-12">

              {/* LEFT */}
              <div className="flex flex-col h-auto justify-center">
                {/* Label */}
                <span className="mb-4 md:mb-6 inline-flex items-center gap-3 md:gap-4 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">
                  <span className="h-[2px] w-6 md:w-8 bg-cyan-500 rounded-full" />
                  SERVICES WE DELIVER
                  <span className="h-[2px] w-4 md:w-6 bg-emerald-500 rounded-full" />
                </span>

                <a href={s.href} className="block relative mb-4 md:mb-5 pr-28 md:pr-32 lg:pr-12 cursor-pointer hover:opacity-80 transition-opacity">
                  {/* Number */}
                  <span className="absolute top-0 right-0 lg:right-[-20px] text-[16px] md:text-[16px] lg:text-[22px] font-bold text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                    {`{${s.n}}`}
                  </span>
                  {/* Headline */}
                  <h3
                    className="font-[800] text-white leading-[1.1] md:leading-[1.05] tracking-tight text-wrap md:text-balance"
                    style={{ fontSize: "clamp(18px, 4.5vw, 40px)" }}
                  >
                    Build <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.2)]">Power</span>
                    Platform
                    Automations
                  </h3>
                </a>

                {/* Description */}
                <p className="max-w-[480px] text-[13px] leading-[1.6] text-white/70 md:text-[14px] lg:text-[15px] mb-5 md:mb-6">
                  {s.desc}
                </p>

                {/* White Label Panel */}
                {s.whiteLabel && (
                  <div className="mb-5 md:mb-6 flex flex-col gap-3 md:gap-4 rounded-2xl border border-cyan-500/20 bg-[#020617]/60 p-5 md:p-7 backdrop-blur-xl max-w-[520px] shadow-[0_10px_40px_rgba(0,0,0,0.5),inset_0_0_30px_rgba(6,182,212,0.05)] relative overflow-hidden group/audit">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover/audit:opacity-100 transition-opacity duration-500" />

                    <div className="flex items-center gap-4 md:gap-5 relative z-10">
                      <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                        <svg className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <rect x="3" y="3" width="7" height="7" rx="1.5" />
                          <rect x="14" y="3" width="7" height="7" rx="1.5" />
                          <rect x="14" y="14" width="7" height="7" rx="1.5" />
                          <path d="M6.5 17.5v-3m0 0v-3m0 3h3m-3 0h-3" />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-400">
                          {s.whiteLabel.title}
                        </span>
                        <span className="text-[11px] md:text-[12px] font-medium text-white/90 mt-0.5 md:mt-1">
                          {s.whiteLabel.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="h-px w-full bg-cyan-500/10 relative z-10" />

                    <div className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-2 md:gap-y-3 relative z-10">
                      {s.whiteLabel.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 md:gap-2.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                          <span className="text-[11px] md:text-[12px] font-medium text-white/80">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 md:gap-3 mb-5 md:mb-6">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 md:px-5 md:py-2 text-[11px] md:text-[12px] font-medium tracking-wide text-white/90 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-colors hover:bg-cyan-900/40 hover:border-cyan-400/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {/* CTA (Top Right) */}
                <div className="mt-6 md:mt-8 z-[100] pointer-events-auto flex justify-start">



                  {/* CTA */}
                  <a
                    href={s.href}
                    className="inline-flex w-fit items-center justify-center gap-2 md:gap-3 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 px-4 py-2 md:px-5 md:py-2.5 text-[12px] md:text-[14px] font-bold text-white transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] hover:scale-[1.02] relative overflow-hidden group/cta"
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10">Explore Power Platform Services</span>
                    <svg className="w-4 h-4 md:w-5 md:h-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>

                </div>
              </div>

              {/* RIGHT */}
              <div className="relative w-[90%] lg:w-[85%] mx-auto h-auto flex items-center justify-center lg:justify-end min-h-[200px] md:min-h-[350px] lg:min-h-[500px] mt-6 lg:mt-0 lg:pl-10 pb-8 lg:pb-0">

                {/* Background bloom strictly around image */}
                <div className="absolute top-[40%] right-[10%] -translate-y-1/2 w-[140%] h-[140%] max-w-[800px] max-h-[800px] bg-gradient-to-br from-cyan-600/40 via-blue-600/30 to-emerald-500/20 blur-[120px] rounded-full pointer-events-none" />

                {/* Dashboard Image Container */}
                <div className="relative z-10 w-full max-w-[550px] lg:max-w-[620px] xl:max-w-[680px] lg:-translate-y-2 xl:-translate-y-4">


                  {/* Subtle bloom directly behind laptop */}
                  <div className="absolute inset-0 bg-cyan-500/20 blur-[50px] pointer-events-none transform scale-95" />

                  <a href={s.href} className="relative block w-full rounded-[24px] p-2 md:p-4 overflow-hidden bg-white/5 backdrop-blur-md drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-transform duration-700 hover:scale-[1.02] z-10 border border-white/10 ring-1 ring-cyan-500/20">
                    <Image
                      src={s.img}
                      alt={s.title}
                      width={900}
                      height={600}
                      className="w-full h-auto rounded-xl object-contain"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority={index < 2}
                    />
                  </a>
                </div>
              </div>
            </div>
          </>
        ) : s.n === "06" ? (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-80"
              style={{
                background: `
                  radial-gradient(ellipse at 80% 40%, rgba(249, 115, 22, 0.1), transparent 50%),
                  radial-gradient(ellipse at 90% 80%, rgba(168, 85, 247, 0.08), transparent 40%),
                  radial-gradient(ellipse at 20% 20%, rgba(249, 115, 22, 0.05), transparent 40%)
                `,
              }}
            />
            {/* Glows */}
            <div className="pointer-events-none absolute top-[20%] right-[-10%] w-[70%] h-[90%] rounded-full bg-orange-600/5 blur-[120px]" />
            <div className="pointer-events-none absolute bottom-[0%] right-[20%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[100px]" />

            {/* Technology background grid/lines */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-20" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill="#f97316" opacity="0.3" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="40%" height="100%" fill="url(#grid-pattern)" />
              <path d="M700,0 A500,500 0 0 1 700,1000" stroke="#f97316" strokeWidth="1" fill="none" opacity="0.2" className="animate-[pulse_6s_ease-in-out_infinite]" />
              <path d="M750,-100 A600,600 0 0 1 750,1100" stroke="#a855f7" strokeWidth="0.5" fill="none" opacity="0.3" />
              <circle cx="700" cy="500" r="4" fill="#f97316" opacity="0.5" className="animate-ping" />
            </svg>

            <div className="relative z-10 grid min-h-full h-auto grid-cols-1 items-center gap-6 p-6 md:gap-10 md:p-12 lg:grid-cols-[45fr_55fr] lg:gap-10 lg:p-10 xl:p-12">

              {/* LEFT */}
              <div className="flex flex-col h-auto justify-center">
                {/* Label */}
                <span className="mb-4 md:mb-6 inline-flex items-center gap-3 md:gap-4 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">
                  <span className="h-[2px] w-6 md:w-8 bg-orange-500 rounded-full" />
                  SERVICES WE DELIVER
                  <span className="h-[2px] w-4 md:w-6 bg-purple-500 rounded-full" />
                </span>

                <a href={s.href} className="block relative mb-4 md:mb-5 pr-28 md:pr-32 lg:pr-12 cursor-pointer hover:opacity-80 transition-opacity">
                  {/* Number */}
                  <span className="absolute top-0 right-0 lg:right-[-10px] text-[16px] md:text-[16px] lg:text-[22px] font-bold text-orange-400 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">
                    {`{${s.n}}`}
                  </span>
                  {/* Headline */}
                  <h3
                    className="font-[800] text-white leading-[1.1] md:leading-[1.05] tracking-tight text-wrap md:text-balance"
                    style={{ fontSize: "clamp(18px, 4.5vw, 40px)" }}
                  >
                    Modernize
                    <span className="bg-gradient-to-r from-orange-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(249,115,22,0.2)]">
                      SharePoint
                    </span>
                  </h3>
                </a>

                {/* Description */}
                <p className="max-w-[480px] text-[13px] leading-[1.6] text-white/70 md:text-[14px] lg:text-[15px] mb-5 md:mb-6">
                  {s.desc}
                </p>

                {/* White Label Panel */}
                {s.whiteLabel && (
                  <div className="mb-5 md:mb-6 flex flex-col gap-3 md:gap-4 rounded-2xl border border-orange-500/20 bg-[#120f18]/60 p-5 md:p-7 backdrop-blur-xl max-w-[520px] shadow-[0_10px_40px_rgba(0,0,0,0.5),inset_0_0_30px_rgba(249,115,22,0.05)] relative overflow-hidden group/audit">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover/audit:opacity-100 transition-opacity duration-500" />

                    <div className="flex items-center gap-4 md:gap-5 relative z-10">
                      <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/30 shadow-[0_0_20px_rgba(20,184,166,0.2)]">
                        <svg className="h-5 w-5 md:h-6 md:w-6 text-teal-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z" />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-orange-400">
                          {s.whiteLabel.title}
                        </span>
                        <span className="text-[11px] md:text-[12px] font-medium text-white/90 mt-0.5 md:mt-1">
                          {s.whiteLabel.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="h-px w-full bg-orange-500/10 relative z-10" />

                    <div className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-2 md:gap-y-3 relative z-10">
                      {s.whiteLabel.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 md:gap-2.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_8px_#fb923c]" />
                          <span className="text-[11px] md:text-[12px] font-medium text-white/80">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 md:gap-3 mb-5 md:mb-6">
                  {s.tags.map((t, i) => {
                    let iconColor = "bg-orange-500";
                    if (t === "SPFx") iconColor = "bg-purple-500";
                    if (t === "M365") iconColor = "bg-blue-500";
                    if (t === "Migration") iconColor = "bg-cyan-500";
                    return (
                      <span
                        key={t}
                        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 md:px-4 md:py-2 text-[11px] md:text-[12px] font-medium tracking-wide text-white/90 backdrop-blur-md shadow-[0_0_15px_rgba(249,115,22,0.05)] transition-colors hover:bg-white/10 hover:border-orange-500/30"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${iconColor}`} />
                        {t}
                      </span>
                    )
                  })}
                </div>
                {/* CTA (Top Right) */}
                <div className="mt-6 md:mt-8 z-[100] pointer-events-auto flex justify-start">



                  {/* CTA */}
                  <a
                    href={s.href}
                    className="inline-flex w-fit items-center justify-center gap-2 md:gap-3 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 px-4 py-2 md:px-5 md:py-2.5 text-[12px] md:text-[14px] font-bold text-white transition-all shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_50px_rgba(168,85,247,0.5)] hover:scale-[1.02] relative overflow-hidden group/cta"
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10">Explore SharePoint Modernization</span>
                    <svg className="w-4 h-4 md:w-5 md:h-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>

                </div>
              </div>

              {/* RIGHT */}
              <div className="relative w-[90%] lg:w-[85%] mx-auto h-auto flex items-center justify-center lg:justify-end min-h-[200px] md:min-h-[350px] lg:min-h-[500px] mt-6 lg:mt-0 lg:pl-10 pb-8 lg:pb-0">

                {/* Background bloom strictly around image */}
                <div className="absolute top-[40%] right-[10%] -translate-y-1/2 w-[120%] h-[120%] max-w-[700px] max-h-[700px] bg-gradient-to-br from-orange-600/20 via-purple-600/20 to-transparent blur-[120px] rounded-full pointer-events-none" />

                {/* Main Image Container */}
                <div className="relative z-10 w-full max-w-[650px] lg:max-w-[750px] xl:max-w-[850px] lg:-translate-y-10 xl:-translate-y-16">


                  <a href={s.href} className="block relative rounded-2xl overflow-hidden drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-10 border border-white/10 ring-1 ring-orange-500/20 lg:perspective-[1000px] cursor-pointer">
                    <Image
                      src={s.img}
                      alt={s.title}
                      width={900}
                      height={600}
                      className="w-full h-auto object-cover opacity-90 transition-transform duration-700 hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority={index < 2}
                    />
                  </a>


                </div>
              </div>
            </div>
          </>
        ) : s.n === "07" ? (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-80"
              style={{
                background: `
                  radial-gradient(ellipse at 80% 40%, rgba(16, 185, 129, 0.1), transparent 50%),
                  radial-gradient(ellipse at 90% 80%, rgba(132, 204, 22, 0.08), transparent 40%),
                  radial-gradient(ellipse at 20% 20%, rgba(16, 185, 129, 0.05), transparent 40%)
                `,
              }}
            />
            {/* Glows */}
            <div className="pointer-events-none absolute top-[20%] right-[-10%] w-[70%] h-[90%] rounded-full bg-emerald-600/5 blur-[120px]" />
            <div className="pointer-events-none absolute bottom-[0%] right-[20%] w-[50%] h-[50%] rounded-full bg-lime-500/5 blur-[100px]" />

            {/* Technology background grid/lines */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-20" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="grid-pattern-04" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill="#10b981" opacity="0.3" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="40%" height="100%" fill="url(#grid-pattern-04)" />
              <path d="M700,0 A500,500 0 0 1 700,1000" stroke="#10b981" strokeWidth="1" fill="none" opacity="0.2" className="animate-[pulse_6s_ease-in-out_infinite]" />
              <path d="M750,-100 A600,600 0 0 1 750,1100" stroke="#84cc16" strokeWidth="0.5" fill="none" opacity="0.3" />
              <circle cx="700" cy="500" r="4" fill="#10b981" opacity="0.5" className="animate-ping" />
            </svg>

            <div className="relative z-10 grid min-h-full h-auto grid-cols-1 items-center gap-6 p-6 md:gap-10 md:p-12 lg:grid-cols-[45fr_55fr] lg:gap-10 lg:p-10 xl:p-12">

              {/* LEFT */}
              <div className="flex flex-col h-auto justify-center">
                {/* Label */}
                <span className="mb-4 md:mb-6 inline-flex items-center gap-3 md:gap-4 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">
                  <span className="h-[2px] w-6 md:w-8 bg-emerald-500 rounded-full" />
                  SERVICES WE DELIVER
                  <span className="h-[2px] w-4 md:w-6 bg-yellow-500 rounded-full" />
                </span>

                <a href={s.href} className="block relative mb-4 md:mb-5 pr-28 md:pr-32 lg:pr-12 cursor-pointer hover:opacity-80 transition-opacity">
                  {/* Number */}
                  <span className="absolute top-0 right-0 lg:right-[-10px] text-[16px] md:text-[16px] lg:text-[22px] font-bold text-lime-400 drop-shadow-[0_0_10px_rgba(132,204,22,0.5)]">
                    {`{${s.n}}`}
                  </span>
                  {/* Headline */}
                  <h3
                    className="font-[800] text-white leading-[1.1] md:leading-[1.05] tracking-tight text-wrap md:text-balance"
                    style={{ fontSize: "clamp(18px, 4.5vw, 40px)" }}
                  >
                    Stand up
                    <span className="bg-gradient-to-r from-emerald-400 via-lime-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                      Data + BI
                    </span>
                  </h3>
                </a>

                {/* Description */}
                <p className="max-w-[480px] text-[13px] leading-[1.6] text-white/70 md:text-[14px] lg:text-[15px] mb-5 md:mb-6">
                  {s.desc}
                </p>

                {/* White Label Panel */}
                {s.whiteLabel && (
                  <div className="mb-5 md:mb-6 flex flex-col gap-3 md:gap-4 rounded-2xl border border-emerald-500/20 bg-[#062522]/60 p-5 md:p-7 backdrop-blur-xl max-w-[520px] shadow-[0_10px_40px_rgba(0,0,0,0.5),inset_0_0_30px_rgba(16,185,129,0.05)] relative overflow-hidden group/audit">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover/audit:opacity-100 transition-opacity duration-500" />

                    <div className="flex items-center gap-4 md:gap-5 relative z-10">
                      <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl bg-lime-500/10 text-lime-400 border border-lime-500/30 shadow-[0_0_20px_rgba(132,204,22,0.2)]">
                        <svg className="h-5 w-5 md:h-6 md:w-6 text-lime-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z" />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-400">
                          {s.whiteLabel.title}
                        </span>
                        <span className="text-[11px] md:text-[12px] font-medium text-white/90 mt-0.5 md:mt-1">
                          {s.whiteLabel.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="h-px w-full bg-emerald-500/10 relative z-10" />

                    <div className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-2 md:gap-y-3 relative z-10">
                      {s.whiteLabel.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 md:gap-2.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                          <span className="text-[11px] md:text-[12px] font-medium text-white/80">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 md:gap-3 mb-5 md:mb-6">
                  {s.tags.map((t, i) => {
                    let iconColor = "bg-emerald-500";
                    if (t === "Power BI") iconColor = "bg-yellow-500";
                    if (t === "Data Engineering") iconColor = "bg-lime-500";
                    if (t === "Analytics") iconColor = "bg-teal-500";
                    return (
                      <span
                        key={t}
                        className="flex items-center gap-2 rounded-full border border-white/10 bg-[#092a27]/80 px-3 py-1.5 md:px-4 md:py-2 text-[11px] md:text-[12px] font-medium tracking-wide text-white/90 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.05)] transition-colors hover:bg-[#071e1d]/80 hover:border-emerald-500/30"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${iconColor}`} />
                        {t}
                      </span>
                    )
                  })}
                </div>
                {/* CTA (Top Right) */}
                <div className="mt-6 md:mt-8 z-[100] pointer-events-auto flex justify-start">



                  {/* CTA */}
                  <a
                    href={s.href}
                    className="inline-flex w-fit items-center justify-center gap-2 md:gap-3 rounded-full bg-gradient-to-r from-emerald-500 via-lime-500 to-yellow-500 px-4 py-2 md:px-5 md:py-2.5 text-[12px] md:text-[14px] font-bold text-gray-900 transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(132,204,22,0.5)] hover:scale-[1.02] relative overflow-hidden group/cta"
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10">Explore Data & BI Services</span>
                    <svg className="w-4 h-4 md:w-5 md:h-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>

                </div>
              </div>

              {/* RIGHT */}
              <div className="relative w-[90%] lg:w-[85%] mx-auto h-auto flex items-center justify-center lg:justify-end min-h-[200px] md:min-h-[350px] lg:min-h-[500px] mt-6 lg:mt-0 lg:pl-10 pb-8 lg:pb-0">

                {/* Background bloom strictly around image */}
                <div className="absolute top-[40%] right-[10%] -translate-y-1/2 w-[120%] h-[120%] max-w-[700px] max-h-[700px] bg-gradient-to-br from-emerald-600/20 via-lime-600/10 to-transparent blur-[120px] rounded-full pointer-events-none" />

                {/* Main Image Container */}
                <div className="relative z-10 w-full max-w-[650px] lg:max-w-[750px] xl:max-w-[850px] lg:-translate-y-10 xl:-translate-y-16">


                  <a href={s.href} className="block relative rounded-2xl overflow-hidden drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-10 border border-white/10 ring-1 ring-emerald-500/20 lg:perspective-[1000px] cursor-pointer">
                    <Image
                      src={s.img}
                      alt={s.title}
                      width={900}
                      height={600}
                      className="w-full h-auto object-cover opacity-90 transition-transform duration-700 hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority={index < 2}
                    />
                  </a>


                </div>
              </div>
            </div>
          </>
        ) : s.n === "08" ? (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-80"
              style={{
                background: `
                  radial-gradient(ellipse at 80% 40%, rgba(249, 115, 22, 0.08), transparent 50%),
                  radial-gradient(ellipse at 90% 80%, rgba(236, 72, 153, 0.06), transparent 40%),
                  radial-gradient(ellipse at 20% 20%, rgba(249, 115, 22, 0.04), transparent 40%)
                `,
              }}
            />
            {/* Glows */}
            <div className="pointer-events-none absolute top-[20%] right-[-10%] w-[70%] h-[90%] rounded-full bg-orange-600/5 blur-[120px]" />
            <div className="pointer-events-none absolute bottom-[0%] right-[20%] w-[50%] h-[50%] rounded-full bg-pink-500/5 blur-[100px]" />

            {/* Technology background grid/lines */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-20" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="grid-pattern-05" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill="#f97316" opacity="0.3" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="40%" height="100%" fill="url(#grid-pattern-05)" />
              <path d="M700,0 A500,500 0 0 1 700,1000" stroke="#f97316" strokeWidth="1" fill="none" opacity="0.2" className="animate-[pulse_6s_ease-in-out_infinite]" />
              <path d="M750,-100 A600,600 0 0 1 750,1100" stroke="#ec4899" strokeWidth="0.5" fill="none" opacity="0.3" />
              <circle cx="700" cy="500" r="4" fill="#f97316" opacity="0.5" className="animate-ping" />
            </svg>

            <div className="relative z-10 grid min-h-full h-auto grid-cols-1 items-center gap-6 p-6 md:gap-10 md:p-12 lg:grid-cols-[45fr_55fr] lg:gap-10 lg:p-10 xl:p-12">

              {/* LEFT */}
              <div className="flex flex-col h-auto justify-center">
                {/* Label */}
                <span className="mb-4 md:mb-6 inline-flex items-center gap-3 md:gap-4 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">
                  <span className="h-[2px] w-6 md:w-8 bg-blue-500 rounded-full" />
                  SERVICES WE DELIVER
                  <span className="h-[2px] w-4 md:w-6 bg-orange-500 rounded-full" />
                </span>

                <a href={s.href} className="block relative mb-4 md:mb-5 pr-28 md:pr-32 lg:pr-12 cursor-pointer hover:opacity-80 transition-opacity">
                  {/* Number */}
                  <span className="absolute top-0 right-0 lg:right-[-10px] text-[16px] md:text-[16px] lg:text-[22px] font-bold text-orange-400 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">
                    {`{${s.n}}`}
                  </span>
                  {/* Headline */}
                  <h3
                    className="font-[800] text-white leading-[1.1] md:leading-[1.05] tracking-tight text-wrap md:text-balance"
                    style={{ fontSize: "clamp(18px, 4.5vw, 40px)" }}
                  >
                    Modernize{" "}
                    <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(249,115,22,0.2)]">
                      Legacy
                    </span>{" "}
                    Applications
                  </h3>
                </a>

                {/* Description */}
                <p className="max-w-[480px] text-[13px] leading-[1.6] text-white/70 md:text-[14px] lg:text-[15px] mb-5 md:mb-6">
                  {s.desc}
                </p>

                {/* White Label Panel */}
                {s.whiteLabel && (
                  <div className="mb-5 md:mb-6 flex flex-col gap-3 md:gap-4 rounded-2xl border border-orange-500/20 bg-[#0a0605]/60 p-5 md:p-7 backdrop-blur-xl max-w-[520px] shadow-[0_10px_40px_rgba(0,0,0,0.5),inset_0_0_30px_rgba(249,115,22,0.05)] relative overflow-hidden group/audit">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover/audit:opacity-100 transition-opacity duration-500" />

                    <div className="flex items-center gap-4 md:gap-5 relative z-10">
                      <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/30 shadow-[0_0_20px_rgba(249,115,22,0.2)]">
                        <svg className="h-5 w-5 md:h-6 md:w-6 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-orange-400">
                          {s.whiteLabel.title}
                        </span>
                        <span className="text-[11px] md:text-[12px] font-medium text-white/90 mt-0.5 md:mt-1">
                          {s.whiteLabel.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="h-px w-full bg-orange-500/10 relative z-10" />

                    <div className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-2 md:gap-y-3 relative z-10">
                      {s.whiteLabel.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 md:gap-2.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_8px_#f97316]" />
                          <span className="text-[11px] md:text-[12px] font-medium text-white/80">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 md:gap-3 mb-5 md:mb-6">
                  {s.tags.map((t, i) => {
                    let iconColor = "bg-orange-500";
                    if (t === "Cloud Native") iconColor = "bg-blue-500";
                    if (t === "React") iconColor = "bg-cyan-500";
                    if (t === "Next.js") iconColor = "bg-yellow-500";
                    return (
                      <span
                        key={t}
                        className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0a0605]/80 px-3 py-1.5 md:px-4 md:py-2 text-[11px] md:text-[12px] font-medium tracking-wide text-white/90 backdrop-blur-md shadow-[0_0_15px_rgba(249,115,22,0.05)] transition-colors hover:bg-white/10 hover:border-orange-500/30"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${iconColor}`} />
                        {t}
                      </span>
                    )
                  })}
                </div>
                {/* CTA (Top Right) */}
                <div className="mt-6 md:mt-8 z-[100] pointer-events-auto flex justify-start">



                  {/* CTA */}
                  <a
                    href={s.href}
                    className="inline-flex w-fit items-center justify-center gap-2 md:gap-3 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 px-4 py-2 md:px-5 md:py-2.5 text-[12px] md:text-[14px] font-bold text-gray-900 transition-all shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_50px_rgba(236,72,153,0.5)] hover:scale-[1.02] relative overflow-hidden group/cta"
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10">Explore Legacy Modernization</span>
                    <svg className="w-4 h-4 md:w-5 md:h-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>

                </div>
              </div>

              {/* RIGHT */}
              <div className="relative w-[90%] lg:w-[85%] mx-auto h-auto flex items-center justify-center lg:justify-end min-h-[200px] md:min-h-[350px] lg:min-h-[500px] mt-6 lg:mt-0 lg:pl-10 pb-8 lg:pb-0">

                {/* Background bloom strictly around image */}
                <div className="absolute top-[40%] right-[10%] -translate-y-1/2 w-[120%] h-[120%] max-w-[700px] max-h-[700px] bg-gradient-to-br from-orange-600/20 via-pink-600/10 to-transparent blur-[120px] rounded-full pointer-events-none" />

                {/* Main Image Container */}
                <div className="relative z-10 w-full max-w-[650px] lg:max-w-[750px] xl:max-w-[850px] lg:-translate-y-10 xl:-translate-y-16">


                  <a href={s.href} className="block relative rounded-2xl overflow-hidden drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-10 border border-white/10 ring-1 ring-orange-500/20 lg:perspective-[1000px] cursor-pointer">
                    <Image
                      src={s.img}
                      alt={s.title}
                      width={900}
                      height={600}
                      className="w-full h-auto object-cover opacity-90 transition-transform duration-700 hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority={index < 2}
                    />
                  </a>



                </div>
              </div>
            </div>
          </>
        ) : s.n === "09" ? (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-80"
              style={{
                background: `
                  radial-gradient(ellipse at 80% 40%, rgba(34, 211, 238, 0.08), transparent 50%),
                  radial-gradient(ellipse at 90% 80%, rgba(139, 92, 246, 0.06), transparent 40%),
                  radial-gradient(ellipse at 20% 20%, rgba(59, 130, 246, 0.04), transparent 40%)
                `,
              }}
            />
            {/* Glows */}
            <div className="pointer-events-none absolute top-[20%] right-[-10%] w-[70%] h-[90%] rounded-full bg-cyan-400/5 blur-[120px]" />
            <div className="pointer-events-none absolute bottom-[0%] right-[20%] w-[50%] h-[50%] rounded-full bg-purple-500/5 blur-[100px]" />

            {/* Technology background grid/lines */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-20" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="grid-pattern-06" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#22d3ee" opacity="0.3" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="40%" height="100%" fill="url(#grid-pattern-06)" />
              <path d="M700,0 A500,500 0 0 1 700,1000" stroke="#22d3ee" strokeWidth="1" fill="none" opacity="0.2" className="animate-[pulse_6s_ease-in-out_infinite]" />
              <path d="M750,-100 A600,600 0 0 1 750,1100" stroke="#8b5cf6" strokeWidth="0.5" fill="none" opacity="0.3" />
              <circle cx="700" cy="500" r="4" fill="#3b82f6" opacity="0.5" className="animate-ping" />
            </svg>

            <div className="relative z-10 grid min-h-full h-auto grid-cols-1 items-center gap-6 p-6 md:gap-10 md:p-12 lg:grid-cols-[45fr_55fr] lg:gap-10 lg:p-10 xl:p-12">

              {/* LEFT */}
              <div className="flex flex-col h-auto justify-center">
                {/* Label */}
                <span className="mb-4 md:mb-6 inline-flex items-center gap-3 md:gap-4 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">
                  <span className="h-[2px] w-6 md:w-8 bg-cyan-400 rounded-full" />
                  SERVICES WE DELIVER
                  <span className="h-[2px] w-4 md:w-6 bg-purple-500 rounded-full" />
                </span>

                <a href={s.href} className="block relative mb-4 md:mb-5 pr-28 md:pr-32 lg:pr-12 cursor-pointer hover:opacity-80 transition-opacity">
                  {/* Number */}
                  <span className="absolute top-0 right-0 lg:right-[-10px] text-[16px] md:text-[16px] lg:text-[22px] font-bold text-purple-400 drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]">
                    {`{${s.n}}`}
                  </span>
                  {/* Headline */}
                  <h3
                    className="font-[800] text-white leading-[1.1] md:leading-[1.05] tracking-tight text-wrap md:text-balance"
                    style={{ fontSize: "clamp(18px, 4.5vw, 40px)" }}
                  >
                    Ship a{" "}
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                      Web App
                    </span>
                  </h3>
                </a>

                {/* Description */}
                <p className="max-w-[480px] text-[13px] leading-[1.6] text-white/70 md:text-[14px] lg:text-[15px] mb-5 md:mb-6">
                  {s.desc}
                </p>

                {/* White Label Panel */}
                {s.whiteLabel && (
                  <div className="mb-5 md:mb-6 flex flex-col gap-3 md:gap-4 rounded-2xl border border-cyan-500/20 bg-[#060814]/60 p-5 md:p-7 backdrop-blur-xl max-w-[520px] shadow-[0_10px_40px_rgba(0,0,0,0.5),inset_0_0_30px_rgba(34,211,238,0.05)] relative overflow-hidden group/audit">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover/audit:opacity-100 transition-opacity duration-500" />

                    <div className="flex items-center gap-4 md:gap-5 relative z-10">
                      <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-cyan-400 border border-purple-500/30 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                        <svg className="h-5 w-5 md:h-6 md:w-6 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-purple-400">
                          {s.whiteLabel.title}
                        </span>
                        <span className="text-[11px] md:text-[12px] font-medium text-white/90 mt-0.5 md:mt-1">
                          {s.whiteLabel.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="h-px w-full bg-cyan-500/10 relative z-10" />

                    <div className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-2 md:gap-y-3 relative z-10">
                      {s.whiteLabel.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 md:gap-2.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_#8b5cf6]" />
                          <span className="text-[11px] md:text-[12px] font-medium text-white/80">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 md:gap-3 mb-5 md:mb-6">
                  {s.tags.map((t, i) => {
                    let iconColor = "bg-cyan-500";
                    if (t === "Next.js") iconColor = "bg-purple-500";
                    if (t === "React") iconColor = "bg-blue-500";
                    if (t === "TypeScript") iconColor = "bg-violet-500";
                    return (
                      <span
                        key={t}
                        className="flex items-center gap-2 rounded-full border border-blue-500/30 bg-[#060814]/80 px-3 py-1.5 md:px-4 md:py-2 text-[11px] md:text-[12px] font-medium tracking-wide text-white/90 backdrop-blur-md shadow-[0_0_15px_rgba(139,92,246,0.1)] transition-colors hover:bg-white/10 hover:border-cyan-500/50"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${iconColor}`} />
                        {t}
                      </span>
                    )
                  })}
                </div>
                {/* CTA (Top Right) */}
                <div className="mt-6 md:mt-8 z-[100] pointer-events-auto flex justify-start">



                  {/* CTA */}
                  <a
                    href={s.href}
                    className="inline-flex w-fit items-center justify-center gap-2 md:gap-3 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 px-4 py-2 md:px-5 md:py-2.5 text-[12px] md:text-[14px] font-bold text-white transition-all shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_50px_rgba(139,92,246,0.6)] hover:scale-[1.02] relative overflow-hidden group/cta"
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10">Start Shipping Your Web App</span>
                    <svg className="w-4 h-4 md:w-5 md:h-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>

                </div>
              </div>

              {/* RIGHT */}
              <div className="relative w-[90%] lg:w-[85%] mx-auto h-auto flex items-center justify-center lg:justify-end min-h-[200px] md:min-h-[350px] lg:min-h-[500px] mt-6 lg:mt-0 lg:pl-10 pb-8 lg:pb-0">

                {/* Background bloom strictly around image */}
                <div className="absolute top-[40%] right-[10%] -translate-y-1/2 w-[120%] h-[120%] max-w-[700px] max-h-[700px] bg-gradient-to-br from-cyan-500/10 via-purple-600/10 to-transparent blur-[120px] rounded-full pointer-events-none" />

                {/* Main Image Container */}
                <div className="relative z-10 w-full max-w-[650px] lg:max-w-[750px] xl:max-w-[850px] lg:-translate-y-10 xl:-translate-y-16">


                  <a href={s.href} className="block relative rounded-2xl overflow-hidden drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-10 border border-white/10 ring-1 ring-cyan-500/30 lg:perspective-[1000px] cursor-pointer">
                    <Image
                      src={s.img}
                      alt={s.title}
                      width={900}
                      height={600}
                      className="w-full h-auto object-cover opacity-90 transition-transform duration-700 hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority={index < 2}
                    />
                  </a>



                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.35]"
              style={{
                background: `radial-gradient(70% 55% at 18% 0%, rgba(24,82,255,0.06), transparent 65%), radial-gradient(50% 40% at 88% 100%, rgba(255,88,18,0.05), transparent 60%)`,
              }}
            />

            <div className="relative z-10 mx-auto w-full px-6 md:px-10">
              <div className="h-px w-full bg-[#0a0a1a]/[0.06]" />

              <div
                ref={overlayRef}
                className="grid min-h-[85svh] grid-cols-1 items-center gap-10 py-10 md:py-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16"
              >
                {/* LEFT Ã¢â‚¬â€ copy block */}
                <div className="flex flex-col">
                  <a
                    href={s.href}
                    className="group/title inline-flex items-baseline gap-3"
                  >
                    <h3
                      className="font-semibold text-[#0a0a1a] transition-colors duration-500 group-hover/title:text-[#0a0a1a]/65"
                      style={{
                        fontSize: "clamp(48px, 7.4vw, 108px)",
                        lineHeight: 0.95,
                        letterSpacing: "-0.04em",
                      }}
                    >
                      {s.title}
                    </h3>
                    <span
                      className="flex items-baseline font-medium text-[#FF5812]/55"
                      style={{
                        fontSize: "clamp(16px, 1.4vw, 22px)",
                        letterSpacing: "-0.01em",
                        transform: "translateY(-0.35em)",
                      }}
                    >
                      <span>{"{"}</span>
                      <span>0</span>
                      <span>{s.n.slice(1)}</span>
                      <span>{"}"}</span>
                    </span>
                  </a>

                  <p className="mt-6 max-w-[480px] text-[14px] leading-[1.55] text-[#0a0a1a]/62 md:text-[16px]">
                    {s.desc}
                  </p>

                  {/* White-Label Partner / Pricing/timeline transparency */}
                  {s.whiteLabel ? (
                    <div className="mt-5 flex flex-col gap-3.5 self-start rounded-2xl border border-[#0a0a1a]/10 bg-[#F3F0EE]/85 px-5 py-4 w-full max-w-[480px]">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF5812]">
                          {s.whiteLabel.title}
                        </span>
                        <span className="text-[13.5px] font-semibold text-[#0a0a1a]/80 leading-snug mt-1">
                          {s.whiteLabel.subtitle}
                        </span>
                      </div>
                      <div className="h-px bg-[#0a0a1a]/10 w-full" />
                      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                        {s.whiteLabel.features.map((feat, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5812]" />
                            <span className="text-[12.5px] font-medium text-[#0a0a1a]/70">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {/* Tags pinned to bottom-left of the column */}
                  <div className="mt-auto flex flex-wrap gap-2.5 pt-16">
                    {s.tags.map((t, i) => (
                      <motion.span
                        key={t}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.06 }}
                        className="rounded-full border border-[#0a0a1a]/10 bg-[#F3F0EE]/60 px-4 py-1.5 text-[12px] font-medium tracking-wide text-[#0a0a1a]/65"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* RIGHT Ã¢â‚¬â€ image with red overlay wipe */}
                <a
                  href={s.href}
                  className="relative block w-full overflow-hidden"
                  style={{
                    aspectRatio: "4 / 3",
                    maxHeight: "min(60svh, 520px)",
                  }}
                >
                  <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 1.08 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1.2, ease: EASE }}
                  >
                    <Image
                      src={s.img}
                      alt={s.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={index < 2}
                    />
                  </motion.div>
                  <motion.div
                    style={{ height: overlayHeight }}
                    className="pointer-events-none absolute inset-x-0 bottom-0 bg-[#FF5812]/85"
                    aria-hidden
                  />
                </a>
              </div>
            </div>
          </>
        )}
      </motion.article>
    </div>
  )
}

/* ====================================================================
 *  LightServicesStickyList
 *    Ã¢â‚¬Â¢ "Services" heading, then 4 sticky-stacked service cards
 * ==================================================================== */
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
      <div className="relative pb-[100vh]">
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.n} s={s} index={i} total={SERVICES.length} />
        ))}
      </div>

      <div className="mx-auto w-full max-w-[1280px] px-6 pb-16 md:px-10 md:pb-20">
        <div className="h-px w-full bg-[#0a0a1a]/[0.08]" />
      </div>
    </section>
  )
}
