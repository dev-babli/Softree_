"use client"

import { useState, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { Plus, Minus, HelpCircle } from "lucide-react"
import { prefersReducedMotion } from "@/lib/motion"

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface FAQItem {
  id: number
  serial: string
  question: string
  answer: string
}

interface CopilotFAQProps {
  faqs?: FAQItem[]
}

const defaultFaqs: FAQItem[] = [
  {
    id: 1,
    serial: "question 01",
    question: "What is AI Copilot development?",
    answer:
      "AI Copilot development is the process of building intelligent AI assistants that help employees and customers complete tasks faster using natural language. AI Copilots can retrieve enterprise knowledge, automate workflows, generate content, answer questions, and integrate with Microsoft 365, SharePoint, Dynamics 365, CRM, ERP, Dataverse, and enterprise systems. Softree Technology develops secure, scalable, and enterprise-ready AI Copilot solutions tailored to your business.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "What are the benefits of implementing an AI Copilot?",
    answer:
      "AI Copilots improve employee productivity, automate repetitive work, reduce operational costs, provide instant knowledge access, enhance customer experiences, accelerate decision-making, and streamline business workflows. Organizations benefit from faster responses, intelligent automation, and increased efficiency while maintaining enterprise security.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "Can you build custom AI Copilots for our business?",
    answer:
      "Yes. We develop custom AI Copilots designed specifically for your business processes, departments, and industry requirements. Whether you need Copilots for HR, Sales, Customer Service, Finance, IT Helpdesk, Operations, or Executive Reporting, we create solutions tailored to your organization.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Which Microsoft technologies do you use for AI Copilot development?",
    answer:
      "Our AI Copilot solutions leverage Microsoft Copilot Studio, Azure AI, Azure OpenAI Service, Microsoft 365, Power Automate, Power Apps, Dataverse, SharePoint, Microsoft Graph, Dynamics 365, and Azure services. We also integrate third-party APIs and enterprise applications where required.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "Can AI Copilots integrate with our existing business applications?",
    answer:
      "Absolutely. Our AI Copilots integrate with Microsoft 365, Teams, SharePoint, Dynamics 365, ERP systems, CRM platforms, SQL databases, REST APIs, document repositories, and enterprise knowledge bases, allowing employees to access business information and automate workflows without changing existing systems.",
  },
  {
    id: 6,
    serial: "question 06",
    question: "Are AI Copilot solutions secure for enterprise organizations?",
    answer:
      "Yes. Every AI Copilot solution we build follows enterprise security best practices, including Microsoft Entra ID authentication, role-based access control, data encryption, governance policies, audit logging, and Responsible AI principles to ensure your business data remains protected and compliant.",
  },
  {
    id: 7,
    serial: "question 07",
    question: "How long does it take to develop an AI Copilot?",
    answer:
      "Project timelines vary depending on business complexity, integrations, and custom requirements. A basic AI Copilot can be delivered within a few weeks, while enterprise AI Copilot platforms with multiple integrations, automation workflows, and advanced AI capabilities typically require a phased implementation approach.",
  },
  {
    id: 8,
    serial: "question 08",
    question: "Why choose Softree Technology for AI Copilot development services?",
    answer:
      "Softree Technology specializes in enterprise AI Copilot development using Microsoft AI technologies and the Power Platform. We build secure, scalable, and customized AI Copilot solutions that integrate seamlessly with existing business systems, automate workflows, improve employee productivity, and deliver measurable business value through end-to-end implementation and ongoing optimization.",
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
    scrim: "from-white/55 via-white/30 to-[#1852FF]/10",
  },
  {
    from: "#F3F0EE",
    via: "#fdeee4",
    to: "#ffd9c8",
    accent: "#FF5812",
    scrim: "from-white/55 via-white/30 to-[#FF5812]/10",
  },
  {
    from: "#F3F0EE",
    via: "#dce6ff",
    to: "#b8c9ff",
    accent: "#1852FF",
    scrim: "from-white/55 via-white/30 to-[#1852FF]/10",
  },
  {
    from: "#F3F0EE",
    via: "#ffe8dc",
    to: "#ffc9ad",
    accent: "#FF5812",
    scrim: "from-white/55 via-white/30 to-[#FF5812]/10",
  },
  {
    from: "#F3F0EE",
    via: "#d0dcff",
    to: "#a8baff",
    accent: "#1852FF",
    scrim: "from-white/55 via-white/30 to-[#1852FF]/10",
  },
] as const

export function CopilotFAQ({ faqs: customFaqs }: CopilotFAQProps) {
  const faqs = customFaqs || defaultFaqs
  const [activeLeft, setActiveLeft] = useState<number>(faqs.length > 0 ? 0 : -1)
  const [activeRight, setActiveRight] = useState<number>(faqs.length > 1 ? 1 : -1)
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const faqsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (prefersReducedMotion()) return

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
      duration: 0.8,
      ease: "power3.out",
    })

    tl.from(faqsRef.current, {
      y: 80,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.4")
  }, { scope: sectionRef })

  const handleClick = (index: number) => {
    const isLeft = index % 2 === 0
    if (isLeft) {
      setActiveLeft(activeLeft === index ? -1 : index)
    } else {
      setActiveRight(activeRight === index ? -1 : index)
    }
  }

  const renderFAQCard = (faq: FAQItem, index: number) => {
    const isActive = index % 2 === 0 ? index === activeLeft : index === activeRight
    const theme = FAQ_CARD_THEMES[index % FAQ_CARD_THEMES.length]

    return (
      <div
        key={faq.id}
        className={`group/card relative overflow-hidden rounded-2xl border transition-all duration-500 ease-[var(--legacy-ease-0_4_0_0_2_1)] w-full ${isActive
            ? "bg-white shadow-xl"
            : "bg-white/90 shadow-sm hover:shadow-md"
          }`}
        style={{
          borderColor: isActive ? `${theme.accent}40` : `${theme.accent}22`,
          boxShadow: isActive ? `0 12px 40px ${theme.accent}22` : undefined,
          order: index,
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
              className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-10 transition-opacity duration-500 group-hover/card:opacity-20"
              style={{ backgroundColor: theme.accent }}
            />
            <div
              className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full opacity-5 transition-opacity duration-500 group-hover/card:opacity-15"
              style={{ backgroundColor: theme.accent }}
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

        {/* Static Background for Active Card */}
        {isActive && (
          <div className="absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${theme.from} 0%, ${theme.via} 58%, ${theme.to} 100%)`,
              }}
            />
            <div className={`absolute inset-0 bg-gradient-to-b ${theme.scrim}`} />
            <div className="absolute inset-0 bg-white/20" />
          </div>
        )}

        {/* Content */}
        <div className="relative flex h-full flex-col p-5 md:p-6 justify-between">
          <button
            type="button"
            aria-expanded={isActive}
            aria-controls={isActive ? `faq-answer-${faq.id}` : undefined}
            onClick={() => handleClick(index)}
            className="flex w-full flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1852FF]/50 focus-visible:ring-offset-2"
          >
            {/* Top Row: always visible */}
            <div className="flex items-center justify-between w-full flex-shrink-0">
              <span
                className="text-xs font-semibold uppercase tracking-wider transition-colors duration-500"
                style={{ color: isActive ? `${FAQ_INK_MUTED}cc` : FAQ_INK_MUTED }}
              >
                {faq.serial}
              </span>
              <div className="relative h-6 w-6 flex-shrink-0">
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

            {/* Bottom Content / Middle content */}
            <div className="mt-auto flex flex-col transition-all duration-500">
              {/* Question */}
              <div className="mb-2">
                <h3
                  className={`font-semibold leading-snug transition-colors duration-500 ${isActive ? "text-base md:text-lg" : "text-sm lg:text-[13px]"
                    }`}
                  style={{
                    color: FAQ_INK,
                  }}
                >
                  {faq.question}
                </h3>
              </div>
            </div>
          </button>

          {isActive && (
            <div id={`faq-answer-${faq.id}`} className="mt-2">
              <div className="pt-2 md:pt-3">
                <h4 className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider" style={{ color: `${FAQ_INK_MUTED}99` }}>
                  Question Answer:
                </h4>
                <div className="mb-3 h-px w-14" style={{ backgroundColor: `${theme.accent}35` }} />
                <p className="mb-4 text-sm leading-relaxed" style={{ color: `${FAQ_INK}d9` }}>
                  {faq.answer}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <section ref={sectionRef} className="relative w-full bg-gradient-to-b from-zinc-50 via-white to-zinc-50 py-10 md:py-16">
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            dateModified: new Date().toISOString().split('T')[0],
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

        {/* FAQ Accordion */}
        <div
          ref={faqsRef}
          className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-3 lg:items-start"
        >
          {/* Left Column (even indices) */}
          <div className="contents lg:flex lg:flex-col lg:gap-3">
            {faqs.map((faq, index) => (index % 2 === 0 ? renderFAQCard(faq, index) : null))}
          </div>
          {/* Right Column (odd indices) */}
          <div className="contents lg:flex lg:flex-col lg:gap-3">
            {faqs.map((faq, index) => (index % 2 !== 0 ? renderFAQCard(faq, index) : null))}
          </div>
        </div>
      </div>
    </section>
  )
}
