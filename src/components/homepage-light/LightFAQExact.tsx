"use client"

import { useState, useRef } from "react"
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
    question: "What does Softree actually build?",
    answer:
      "Softree builds production-grade software for enterprise teams: AI agents, web apps, Microsoft Power Platform automations, SharePoint intranets, and Power BI dashboards. We are Microsoft Gold Partners. Median project ship time is 47 days.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How long does a typical Softree project take?",
    answer:
      "Most Softree projects ship in 6 to 12 weeks. Power Apps MVPs take 6 weeks. Web app MVPs take 12 weeks. SharePoint migrations take 4 to 8 weeks. We provide a fixed scope and fixed timeline during discovery, before any contract is signed.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "What if the project takes longer than estimated?",
    answer:
      "Softree contracts are fixed-scope and fixed-price. If we miss the timeline, we absorb the cost — not the client. We mitigate risk through weekly demos, fortnightly milestone reviews, and direct Slack access to the engineering squad working on your project.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "How do you handle code ownership and IP?",
    answer:
      "You own the code, designs, and IP from day one. Softree commits directly to your GitHub or Azure DevOps repository. Source code, infrastructure, and credentials transfer to your team at project handoff. No vendor lock-in.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "What is Softree's security and compliance posture?",
    answer:
      "Softree follows Microsoft Gold Partner security standards: SOC 2 controls, GDPR compliance, NDAs, data isolation per client, and signed BAAs for healthcare. Engineers work from secured devices. We can provide a security questionnaire response within 5 business days.",
  },
]

const grainientColors = [
  { from: "#fffaf5", via: "#fff3e6", to: "#ffe4cc", accent: "#f97316" },
  { from: "#fffbf7", via: "#fff4ea", to: "#ffe8d6", accent: "#ea580c" },
  { from: "#fffcf9", via: "#fff6ed", to: "#ffecd6", accent: "#ff822d" },
  { from: "#fff9f2", via: "#fff0e0", to: "#ffe0c2", accent: "#e05300" },
  { from: "#fffbf5", via: "#fff2e6", to: "#ffebd6", accent: "#ff7300" },
]

const activeGrainientPalette = [
  { c1: "#fff7ed", c2: "#ff822d", c3: "#fdbb74" },
  { c1: "#ffedd5", c2: "#f97316", c3: "#fed7aa" },
  { c1: "#ffe8d6", c2: "#ea580c", c3: "#fdba74" },
  { c1: "#fff2e6", c2: "#ff781f", c3: "#ffc294" },
  { c1: "#ffebd6", c2: "#e05300", c3: "#ffe4cc" },
]

export default function LightFAQExact({ faqs: customFaqs }: LightFAQExactProps) {
  const faqs = customFaqs || defaultFaqs
  const [activeIndex, setActiveIndex] = useState(faqs.length > 0 ? Math.min(4, faqs.length - 1) : -1)
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const faqsRef = useRef<HTMLDivElement>(null)

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
    <section ref={sectionRef} className="relative w-full bg-[#fffbf7] py-20 md:py-32">
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
        <div ref={titleRef} className="mb-12 md:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#f97316]/20 bg-[#f97316]/10 px-4 py-2">
            <HelpCircle className="h-4 w-4 text-[#ea580c]" />
            <span className="text-sm font-medium text-[#ea580c]">FAQ</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-[#451a03] md:text-5xl lg:text-6xl">
            Frequently Asked{" "}
            <span className="text-[#ea580c]">Questions.</span>
          </h2>
        </div>

        {/* FAQ Horizontal Accordion */}
        <div ref={faqsRef} className="flex h-[600px] gap-2">
          {faqs.map((faq, index) => {
            const isActive = index === activeIndex
            const isCollapsed = activeIndex !== -1 && !isActive
            const paletteIndex = index % grainientColors.length

            return (
              <div
                key={faq.id}
                onClick={() => handleClick(index)}
                className={`group/card relative cursor-pointer overflow-hidden rounded-2xl border border-[#f97316]/20 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive
                  ? "bg-white shadow-[0_10px_30px_rgba(249,115,22,0.12)] border-[#f97316]/30"
                  : "bg-white/80"
                  }`}
                style={{
                  width: isActive ? "37%" : isCollapsed ? "15%" : "15%",
                  height: "600px",
                }}
              >
                {/* Grainient Background for Inactive Cards */}
                {!isActive && (
                  <>
                    {/* Base Gradient */}
                    <div
                      className="absolute inset-0 transition-all duration-500 group-hover/card:opacity-90"
                      style={{
                        background: `linear-gradient(135deg, ${grainientColors[paletteIndex].from} 0%, ${grainientColors[paletteIndex].via} 50%, ${grainientColors[paletteIndex].to} 100%)`,
                      }}
                    />
                    {/* Accent Glow */}
                    <div
                      className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-20 blur-3xl transition-all duration-500 group-hover/card:opacity-40 group-hover/card:scale-125"
                      style={{ backgroundColor: grainientColors[paletteIndex].accent }}
                    />
                    <div
                      className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full opacity-10 blur-2xl transition-all duration-500 group-hover/card:opacity-30"
                      style={{ backgroundColor: grainientColors[paletteIndex].accent }}
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
                        boxShadow: `inset 0 0 0 1px ${grainientColors[paletteIndex].accent}20, 0 0 30px ${grainientColors[paletteIndex].accent}10`,
                      }}
                    />
                  </>
                )}

                {/* Grainient Background for Active Card */}
                {isActive && (
                  <div className="absolute inset-0">
                    <Grainient
                      color1={activeGrainientPalette[paletteIndex].c1}
                      color2={activeGrainientPalette[paletteIndex].c2}
                      color3={activeGrainientPalette[paletteIndex].c3}
                      timeSpeed={0.15}
                      grainAmount={0.08}
                      grainScale={2.5}
                      grainAnimated={false}
                      warpStrength={0.6}
                      warpFrequency={4.0}
                      warpSpeed={1.5}
                      warpAmplitude={60.0}
                      rotationAmount={350.0}
                      noiseScale={1.8}
                      contrast={1.35}
                      saturation={1.15}
                      blendSoftness={0.08}
                      zoom={0.85}
                    />
                    {/* Subtle vignette overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#f97316]/10 via-transparent to-[#f97316]/5" />
                  </div>
                )}

                {/* Content */}
                <div className="relative flex h-full flex-col p-5 md:p-6">
                  {/* Top - Serial & Icon */}
                  <div className="mb-auto flex items-start justify-between">
                    <span
                      className={`text-xs font-medium uppercase tracking-wider transition-colors duration-500 ${isActive ? "text-[#7c2d12]/80" : "text-[#451a03]/90"
                        }`}
                    >
                      {faq.serial}
                    </span>
                    <div className="relative h-6 w-6">
                      {/* Plus Icon */}
                      <Plus
                        className={`absolute inset-0 h-6 w-6 text-[#ea580c] transition-all duration-500 ${isActive
                          ? "scale-0 opacity-0 rotate-90"
                          : "scale-100 opacity-100 rotate-0"
                          }`}
                      />
                      {/* Minus Icon */}
                      <Minus
                        className={`absolute inset-0 h-6 w-6 text-[#ea580c] transition-all duration-500 ${isActive
                          ? "scale-100 opacity-100 rotate-0"
                          : "scale-0 opacity-0 -rotate-90"
                          }`}
                      />
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="mt-auto">
                    {/* Question */}
                    <div className="mb-4">
                      <h3
                        className={`text-lg font-semibold leading-snug transition-colors duration-500 md:text-xl text-[#451a03]`}
                      >
                        {faq.question}
                      </h3>
                    </div>

                    {/* Answer - Only visible when active */}
                    <div
                      className="overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                      style={{
                        width: isActive ? "100%" : "0%",
                        opacity: isActive ? 1 : 0,
                      }}
                    >
                      <div className="pt-4">
                        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#7c2d12]/60">
                          Question Answer:
                        </h4>
                        <div className="mb-4 h-px w-16 bg-[#ea580c]/20" />
                        <p className="mb-6 text-sm leading-relaxed text-[#451a03]/85 md:text-base">
                          {faq.answer}
                        </p>
                        <Link
                          href="/about-us"
                          className="group inline-flex items-center gap-3 rounded-full bg-[#ea580c] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#7c2d12]"
                        >
                          <span>More About Us</span>
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#ea580c] transition-all group-hover:bg-[#ea580c] group-hover:text-white">
                            <ArrowUpRight className="h-3 w-3" />
                          </span>
                        </Link>
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
