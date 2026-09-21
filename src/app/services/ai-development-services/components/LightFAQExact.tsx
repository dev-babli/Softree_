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
    serial: "01",
    question: "What is Agentic AI?",
    answer:
      "Agentic AI refers to AI systems that can interpret goals, reason through tasks, use tools or connected systems, and take defined actions within a workflow. Unlike a simple AI assistant that mainly responds to prompts, an AI agent can autonomously participate in multi-step processes based on the capabilities and controls designed for the use case. By leveraging advanced language models and specialized orchestration frameworks, Agentic AI can evaluate information, make context-aware decisions, and execute sequences of operations without continuous human intervention, fundamentally shifting how businesses automate complex cognitive work.",
  },
  {
    id: 2,
    serial: "02",
    question: "What types of AI agents can Softree build?",
    answer:
      "Softree can build custom AI agents tailored for specific business tasks and operational workflows. This includes specialized knowledge-based agents for data retrieval, workflow agents that automate complex operational sequences, intelligent AI assistants for employee support, and sophisticated multi-agent solutions where distinct models coordinate to solve layered problems. The underlying architecture and framework are carefully selected depending on your specific business problem, the required enterprise integrations, available data structures, and the desired level of autonomy needed to achieve measurable outcomes.",
  },
  {
    id: 3,
    serial: "03",
    question: "Can Softree build RAG-powered AI agents?",
    answer:
      "Yes. Retrieval-Augmented Generation (RAG) is a core capability we utilize to connect AI agents securely to your trusted business documents, knowledge bases, databases, and other supported enterprise data sources. By integrating RAG architectures, we ensure that agents retrieve highly relevant and up-to-date context when completing tasks, reasoning through workflows, or generating responses. This approach grounds the AI's output in your proprietary organizational data, significantly reducing hallucination risks and improving the accuracy of the agent's actions within domain-specific applications.",
  },
  {
    id: 4,
    serial: "04",
    question: "How do AI agents integrate with existing business systems?",
    answer:
      "AI agents can be seamlessly connected to your supported APIs, business applications, relational databases, enterprise data lakes, and existing operational workflows. During the architecture phase, we define exactly which internal systems the agent can access, what specific actions it is permitted to perform, and what security controls or human-in-the-loop approvals are required. This controlled integration allows the AI agent to operate as a functional part of your technology stack, reading context from your systems and securely writing back structured data or triggering automated processes.",
  },
  {
    id: 5,
    serial: "05",
    question: "How does Softree test and evaluate AI agents?",
    answer:
      "We rigorously evaluate AI-agent behavior against the specific requirements and guardrails defined for your use case. Our testing protocols cover task execution accuracy, retrieval quality in RAG setups, correct tool usage, system reliability, secure failure handling, and overall application performance under load. We utilize empirical evaluation methods to measure relevance, grounding, and reasoning capabilities before deployment. This comprehensive testing ensures the solution behaves reliably, respects security boundaries, and handles exceptions gracefully in a live production environment.",
  },
  {
    id: 6,
    serial: "06",
    question: "Does Softree provide offshore Agentic AI development?",
    answer:
      "Yes. Softree provides robust offshore AI engineering support through dedicated teams and flexible development engagements tailored to your organizational needs. Our experienced engineers can support every phase of the project lifecycle, including Agentic AI architecture design, model integration, prompt engineering, RAG pipeline development, rigorous testing, and secure deployment. By leveraging our offshore delivery model, clients gain access to specialized AI talent and scalable engineering capacity, ensuring high-quality solutions are delivered efficiently and maintained through ongoing engineering support.",
  },
  {
    id: 7,
    serial: "07",
    question: "Does Softree offer white-label AI development?",
    answer:
      "Yes. Softree actively works as a trusted white-label AI engineering partner for digital agencies, IT consultancies, technology companies, and system integrators. If you need additional AI development capacity to serve your own clients, we can operate seamlessly behind the scenes while you maintain the primary client-facing relationship. Our white-label partnerships are structured around flexible engagement models, allowing you to confidently offer advanced AI capabilities, multi-agent workflows, and custom integrations without having to build and manage a massive internal AI engineering team.",
  },
  {
    id: 8,
    serial: "08",
    question: "How can a company get started with Agentic AI development?",
    answer:
      "We start by deeply understanding your core business problem, operational workflows, end-users, available data, existing systems, and the specific outcomes you want to achieve. From there, our engineering team assesses the AI opportunity, helps define the most valuable initial use case, and drafts a scalable technical architecture. Once the strategy is aligned, we outline a clear development and implementation path based on your project requirements, moving from initial concept and feasibility testing into the active development of robust, production-ready AI agents.",
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
                className="typo-caption transition-colors duration-500"
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
                  className="typo-heading-4 transition-colors duration-500"
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
                <h4 className="typo-caption mb-1.5" style={{ color: `${FAQ_INK_MUTED}99` }}>
                  Question Answer:
                </h4>
                <div className="mb-3 h-px w-14" style={{ backgroundColor: `${theme.accent}35` }} />
                <p className="typo-body-sm mb-4 leading-relaxed" style={{ color: `${FAQ_INK}d9` }}>
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
      <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
        {/* Section Title */}
        <div ref={titleRef} className="mb-8 md:mb-10">
          <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-4 py-1.5 rounded-full border border-white/60 mb-4 inline-block">
            <span className="typo-caption text-[#FF6B2C]">
              FREQUENTLY ASKED QUESTIONS
            </span>
          </div>
          <h2 className="typo-heading-2 text-slate-900 mb-4">
            Frequently Asked{" "}
            <span className="text-[#FF6B2C]">
              Questions
            </span>
          </h2>
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