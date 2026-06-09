"use client"

import { useState, useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import Link from "next/link"
import { ArrowUpRight, Plus, Minus, HelpCircle } from "lucide-react"
import Grainient from "./Grainient"

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface FAQItem {
  id: number
  serial: string
  question: string
  answer: string
}

interface LightFAQExactProps {
  faqs?: FAQItem[]
}

const defaultFaqs: FAQItem[] = [
  {
    id: 1,
    serial: "question 01",
    question: "What kind of technology solutions does Softree Technology specialize in?",
    answer:
      "Softree Technology specializes in enterprise Microsoft solutions, AI-powered automation, modern application engineering, and offshore development services. Our core expertise includes SharePoint + PowerApps, Power Automate, Power BI, Dynamics 365, Microsoft Fabric, Azure AI, AI agents, custom web and mobile applications, and enterprise workflow automation solutions designed to help businesses modernize operations and scale efficiently.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "Can Softree help businesses replace manual processes and spreadsheet-based operations?",
    answer:
      "Yes. Many organizations still manage approvals, reporting, employee requests, and operational workflows through spreadsheets, emails, and disconnected systems. Softree helps businesses modernize these processes using SharePoint + PowerApps, Power Automate, Dynamics 365, and AI-powered workflow automation solutions that improve operational visibility, reduce manual effort, minimize process delays, and increase efficiency across departments.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "Does Softree work with companies that already use Microsoft 365?",
    answer:
      "Absolutely. Softree primarily works with businesses already operating within the Microsoft ecosystem. We help organizations extend and optimize Microsoft 365 environments using SharePoint, Teams, Power Platform, Dynamics 365, Power BI, Azure AI, and Microsoft Copilot integrations without disrupting existing operations or requiring large-scale infrastructure changes.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "How does Softree support enterprise digital transformation initiatives?",
    answer:
      "Softree supports enterprise digital transformation by modernizing legacy systems, automating workflows, improving collaboration, implementing AI-driven business solutions, and building scalable enterprise applications. Our delivery model combines Microsoft technologies, cloud architecture, AI automation, and agile engineering practices to help organizations improve operational agility, accelerate delivery timelines, and reduce dependency on fragmented manual processes.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "Can Softree build custom AI solutions for enterprise operations?",
    answer:
      "Yes. Softree develops AI-powered enterprise solutions including AI agents, Copilot integrations, intelligent automation systems, document AI, AI-assisted workflows, and Retrieval-Augmented Generation (RAG) solutions. These systems are designed to improve productivity, automate repetitive business operations, streamline knowledge access, and support faster operational decision-making across enterprise environments.",
  },
]

/** Brand palette: cream `#F3F0EE`, blue `#1852FF`, orange `#FF5812`, ink `#0a0a1a` */
const FAQ_INK = "#0a0a1a"
const FAQ_INK_MUTED = "#2a3348"
const FAQ_DESKTOP_HEIGHT = 420
const FAQ_MOBILE_ACTIVE_MIN = 228
const FAQ_MOBILE_COLLAPSED_MIN = 52

/** Same palette, alternating blue / orange at different shades */
const FAQ_CARD_THEMES = [
  {
    from: "#F3F0EE",
    via: "#e8eeff",
    to: "#cdd9ff",
    accent: "#1852FF",
    grainient: { c1: "#F3F0EE", c2: "#1852FF", c3: "#8eb4ff" },
    scrim: "from-white/55 via-white/30 to-[#1852FF]/10",
  },
  {
    from: "#F3F0EE",
    via: "#fdeee4",
    to: "#ffd9c8",
    accent: "#FF5812",
    grainient: { c1: "#fffbf7", c2: "#FF5812", c3: "#ffb899" },
    scrim: "from-white/55 via-white/30 to-[#FF5812]/10",
  },
  {
    from: "#F3F0EE",
    via: "#dce6ff",
    to: "#b8c9ff",
    accent: "#1852FF",
    grainient: { c1: "#eef3ff", c2: "#3d5fd4", c3: "#a8c4ff" },
    scrim: "from-white/55 via-white/30 to-[#1852FF]/10",
  },
  {
    from: "#F3F0EE",
    via: "#ffe8dc",
    to: "#ffc9ad",
    accent: "#FF5812",
    grainient: { c1: "#fff5ef", c2: "#ff6b2c", c3: "#ffc9a8" },
    scrim: "from-white/55 via-white/30 to-[#FF5812]/10",
  },
  {
    from: "#F3F0EE",
    via: "#d0dcff",
    to: "#a8baff",
    accent: "#1852FF",
    grainient: { c1: "#f0f4ff", c2: "#1852FF", c3: "#c5d8ff" },
    scrim: "from-white/55 via-white/30 to-[#1852FF]/10",
  },
] as const

export default function LightFAQExact({ faqs: customFaqs }: LightFAQExactProps) {
  const faqs = customFaqs || defaultFaqs
  const [activeIndex, setActiveIndex] = useState(faqs.length > 0 ? Math.min(4, faqs.length - 1) : -1)
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const faqsRef = useRef<HTMLDivElement>(null)

  /* `isDesktop` is hydration-safe — starts false on SSR + first render, then
   * resolves to the real value once mounted. Drives the layout switch
   * between vertical stack (mobile/tablet) and horizontal accordion (≥lg). */
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1280px)")
    const update = () => setIsDesktop(mql.matches)
    update()
    mql.addEventListener?.("change", update)
    return () => mql.removeEventListener?.("change", update)
  }, [])

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 30%",
        toggleActions: "play none none none",
      },
    })

    tl.from(titleRef.current, {
      y: 60,
      opacity: 0,
      filter: "blur(10px)",
      duration: 0.8,
      ease: "power3.out",
    })

    tl.from(faqsRef.current, {
      y: 80,
      opacity: 0,
      filter: "blur(8px)",
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.4")
  }, { scope: sectionRef })

  const handleClick = (index: number) => {
    setActiveIndex(activeIndex === index ? -1 : index)
  }

  return (
    <section ref={sectionRef} className="relative w-full bg-[#F3F0EE] py-14 md:py-20">
      {/* FAQPage JSON-LD — enables AI Overview, ChatGPT/Claude/Gemini citation,
         and Google rich results. Each answer is 30-50 words for optimal
         AEO extraction (the LLM sweet spot). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            dateModified: "2026-05-09",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: f.answer,
              },
            })),
          }),
        }}
      />
      {/* SVG Grain Filter Definition */}
      <svg className="pointer-events-none fixed h-0 w-0" aria-hidden="true">
        <defs>
          <filter id="faq-grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="saturate"
              values="0"
              in="noise"
              result="mono"
            />
            <feBlend in="SourceGraphic" in2="mono" mode="multiply" />
          </filter>
          <filter id="faq-grain-dark" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="4"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="saturate"
              values="0"
              in="noise"
              result="mono"
            />
            <feBlend in="SourceGraphic" in2="mono" mode="soft-light" />
          </filter>
        </defs>
      </svg>
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        {/* Section Title */}
        <div ref={titleRef} className="mb-8 md:mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1852FF]/20 bg-[#1852FF]/8 px-4 py-2">
            <HelpCircle className="h-4 w-4 text-[#1852FF]" />
            <span className="text-sm font-medium text-[#1852FF]">FAQ</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-[#0a0a1a] md:text-5xl lg:text-6xl">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-[#1852FF] to-[#FF5812] bg-clip-text text-transparent">
              Questions.
            </span>
          </h2>
        </div>

        {/* FAQ Accordion
         *  • Mobile / tablet (<lg)  : vertical stack — each card full width,
         *    `auto` height when active, `64px` when collapsed.
         *  • Desktop (≥lg)         : original horizontal slot accordion. */}
        <div
          ref={faqsRef}
          className="flex flex-col xl:flex-row gap-2 xl:h-[420px]"
        >
          {faqs.map((faq, index) => {
            const isActive = index === activeIndex
            const theme = FAQ_CARD_THEMES[index % FAQ_CARD_THEMES.length]

            return (
              <div
                key={faq.id}
                onClick={() => handleClick(index)}
                className={`group/card relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-700 ease-[var(--legacy-ease-0_4_0_0_2_1)] w-full ${isActive
                  ? "bg-white shadow-lg"
                  : "bg-white/80"
                  }`}
                style={{
                  borderColor: isActive ? `${theme.accent}40` : `${theme.accent}22`,
                  boxShadow: isActive ? `0 12px 40px ${theme.accent}22` : undefined,
                  ...(isDesktop
                    ? {
                        width: isActive ? "37%" : "15%",
                        height: `${FAQ_DESKTOP_HEIGHT}px`,
                      }
                    : {}),
                }}
              >
                {/* Grainient Background for Inactive Cards */}
                {!isActive && (
                  <>
                    {/* Base Gradient */}
                    <div
                      className="absolute inset-0 transition-all duration-500 group-hover/card:opacity-90"
                      style={{
                        background: `linear-gradient(135deg, ${theme.from} 0%, ${theme.via} 50%, ${theme.to} 100%)`,
                      }}
                    />
                    {/* Accent Glow */}
                    <div
                      className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-20 blur-3xl transition-all duration-500 group-hover/card:opacity-40 group-hover/card:scale-125"
                      style={{ backgroundColor: theme.accent }}
                    />
                    <div
                      className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full opacity-10 blur-2xl transition-all duration-500 group-hover/card:opacity-30"
                      style={{ backgroundColor: theme.accent }}
                    />
                    {/* Grain Overlay */}
                    <div
                      className="absolute inset-0 opacity-[0.35] mix-blend-overlay"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "repeat",
                      }}
                    />
                    {/* Subtle Border Glow */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
                      style={{
                        boxShadow: `inset 0 0 0 1px ${theme.accent}28, 0 0 30px ${theme.accent}14`,
                      }}
                    />
                  </>
                )}

                {/* Grainient Background for Active Card */}
                {isActive && (
                  <div className="absolute inset-0">
                    <Grainient
                      color1={theme.grainient.c1}
                      color2={theme.grainient.c2}
                      color3={theme.grainient.c3}
                      timeSpeed={0.15}
                      grainAmount={0.08}
                      grainScale={2.5}
                      grainAnimated={false}
                      warpStrength={0.45}
                      warpFrequency={4.0}
                      warpSpeed={1.5}
                      warpAmplitude={50.0}
                      rotationAmount={350.0}
                      noiseScale={1.8}
                      contrast={1.15}
                      saturation={1.05}
                      blendSoftness={0.12}
                      zoom={0.9}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-b ${theme.scrim}`} />
                    <div className="absolute inset-0 bg-white/20" />
                  </div>
                )}

                {/* Content */}
                <div className={`relative flex flex-col p-4 md:p-5 ${isDesktop ? "h-full" : "h-auto"}`}>
                  {/* Top - Serial & Icon */}
                  <div className="mb-auto flex items-start justify-between">
                    <span
                      className="text-xs font-medium uppercase tracking-wider transition-colors duration-500"
                      style={{ color: isActive ? `${FAQ_INK_MUTED}cc` : FAQ_INK_MUTED }}
                    >
                      {faq.serial}
                    </span>
                    <div className="relative h-6 w-6">
                      {/* Plus Icon */}
                      <Plus
                        className={`absolute inset-0 h-6 w-6 transition-all duration-500 ${isActive
                          ? "scale-0 opacity-0 rotate-90"
                          : "scale-100 opacity-100 rotate-0"
                          }`}
                        style={{ color: theme.accent }}
                      />
                      {/* Minus Icon */}
                      <Minus
                        className={`absolute inset-0 h-6 w-6 transition-all duration-500 ${isActive
                          ? "scale-100 opacity-100 rotate-0"
                          : "scale-0 opacity-0 -rotate-90"
                          }`}
                        style={{ color: theme.accent }}
                      />
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="mt-auto">
                    {/* Question */}
                    <div className="mb-2 md:mb-3">
                      <h3
                        className="text-base font-semibold leading-snug transition-colors duration-500 md:text-lg"
                        style={{ color: FAQ_INK }}
                      >
                        {faq.question}
                      </h3>
                    </div>

                    {/* Answer - Only visible when active */}
                    <div
                      className="overflow-hidden transition-all duration-500 ease-in-out"
                      style={
                        isDesktop
                          ? {
                              width: isActive ? "100%" : "0%",
                              opacity: isActive ? 1 : 0,
                            }
                          : {
                              display: "grid",
                              gridTemplateRows: isActive ? "1fr" : "0fr",
                              opacity: isActive ? 1 : 0,
                            }
                      }
                    >
                      <div className="overflow-hidden w-full">
                        <div className="pt-2 md:pt-3">
                          <h4
                            className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider"
                            style={{ color: `${FAQ_INK_MUTED}99` }}
                          >
                            Question Answer:
                          </h4>
                          <div className="mb-3 h-px w-14" style={{ backgroundColor: `${theme.accent}35` }} />
                          <p
                            className="mb-4 text-sm leading-relaxed"
                            style={{ color: `${FAQ_INK}d9` }}
                          >
                            {faq.answer}
                          </p>
                          <Link
                            href="/about-us"
                            className="group inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-medium text-white transition-all hover:brightness-110"
                            style={{ backgroundColor: theme.accent }}
                          >
                            <span>More About Us</span>
                            <span
                              className="flex h-5 w-5 items-center justify-center rounded-full bg-white transition-all group-hover:text-white"
                              style={{ color: theme.accent }}
                            >
                              <ArrowUpRight className="h-3 w-3" />
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
