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

interface LightFAQExactProps {
  faqs?: FAQItem[]
}

const defaultFaqs: FAQItem[] = [
  {
    id: 1,
    serial: "question 01",
    question: "What are healthcare AI solutions?",
    answer:
      "Healthcare AI solutions use artificial intelligence, machine learning, Generative AI, and automation to improve healthcare-related clinical, administrative, and operational workflows. These solutions can support areas such as patient engagement, document processing, prior authorization, healthcare analytics, knowledge management, and workflow automation.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "What does an offshore AI healthcare engineering team do?",
    answer:
      "An offshore AI healthcare engineering team provides specialized AI, software, data, cloud, and automation expertise from an external engineering organization. The team works alongside your internal stakeholders to design, develop, integrate, deploy, and maintain AI solutions based on your business requirements.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "What healthcare AI development services does Softree provide?",
    answer:
      "Softree provides Generative AI and RAG development, AI agent development, machine learning, intelligent document processing, healthcare automation, data engineering, healthcare analytics, custom AI application development, and AI integration and modernization services.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Can Softree integrate AI with our existing healthcare systems?",
    answer:
      "Yes. Our engineering teams can design AI solutions around your existing technology ecosystem, including enterprise applications, APIs, databases, cloud environments, data platforms, workflow systems, and legacy applications.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "Can we use Softree as an extension of our existing AI team?",
    answer:
      "Yes. Softree's offshore AI engineering model can complement your existing technology organization. You can add specialized AI engineers, data engineers, software developers, cloud engineers, or automation specialists based on your project and roadmap requirements.",
  },
  {
    id: 6,
    serial: "question 06",
    question: "Can Softree build custom AI solutions for specific healthcare workflows?",
    answer:
      "Yes. We develop custom AI solutions around specific business processes rather than taking a one-size-fits-all approach. Our team can work with your workflows, data sources, users, existing applications, and technical requirements to develop tailored AI applications.",
  },
  {
    id: 7,
    serial: "question 07",
    question: "What technologies does Softree use for healthcare AI development?",
    answer:
      "Our AI engineering capabilities span Generative AI, LLMs, RAG, AI agents, machine learning, NLP, intelligent document processing, data engineering, cloud platforms, APIs, microservices, and workflow automation.",
  },
  {
    id: 8,
    serial: "question 08",
    question: "How does Softree approach security for healthcare AI solutions?",
    answer:
      "Healthcare AI solutions require security and governance throughout the development lifecycle. Our engineering approach considers access controls, secure integrations, data protection, auditability, model monitoring, and appropriate governance requirements based on the solution and operating environment.",
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

export default function LightFAQExact({ faqs: customFaqs }: LightFAQExactProps) {
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
        className={`group/card relative overflow-hidden rounded-2xl border transition-all duration-500 ease-[var(--legacy-ease-0_4_0_0_2_1)] w-full ${
          isActive
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
                  className={`absolute inset-0 h-6 w-6 transition-all duration-500 ${
                    isActive
                      ? "scale-0 opacity-0 rotate-90"
                      : "scale-100 opacity-100 rotate-0"
                  }`}
                  style={{ color: theme.accent }}
                />
                {/* Minus Icon */}
                <Minus
                  className={`absolute inset-0 h-6 w-6 transition-all duration-500 ${
                    isActive
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
                  className={`font-semibold leading-snug transition-colors duration-500 ${
                    isActive ? "text-base md:text-lg" : "text-sm lg:text-[13px]"
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
      <div className="mx-auto w-full max-w-[1800px] px-4 sm:px-6 lg:px-[2cm]">
        {/* Section Title */}
        <div ref={titleRef} className="mb-10 md:mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-100 px-3 py-1">
            <span className="text-[11px] font-bold text-[#FF6B2C] tracking-widest uppercase">HEALTHCARE AI FAQ</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold font-['Plus_Jakarta_Sans',sans-serif] tracking-tight text-[#0a0a1a] max-w-4xl mb-4">
            Frequently Asked Questions About {" "}
            <span className="bg-gradient-to-r from-[#1852FF] to-[#FF5812] bg-clip-text text-transparent">
              Healthcare AI Engineering.
            </span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Find answers to common questions about implementing AI, automation, and offshore AI engineering services for healthcare organizations.
          </p>
        </div>

        {/* FAQ Accordion
         *  • Mobile / tablet (<lg)  : vertical stack — each card full width,
         *    `auto` height when active, `64px` when collapsed.
         *  • Desktop (≥lg)         : original horizontal slot accordion. */}
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