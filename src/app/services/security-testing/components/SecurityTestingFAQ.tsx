"use client"

import { useState, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { Plus, Minus } from "lucide-react"
import { prefersReducedMotion } from "@/lib/motion"

import { typography } from "@/lib/typography";
gsap.registerPlugin(useGSAP, ScrollTrigger)

interface FAQItem {
  id: number
  serial: string
  question: string
  answer: string
}

interface SecurityTestingFAQProps {
  faqs?: FAQItem[]
}

const defaultFaqs: FAQItem[] = [
  {
    id: 1,
    serial: "question 01",
    question: "What is security testing?",
    answer:
      "Security testing evaluates applications, APIs, systems, and software workflows to identify vulnerabilities, validate security controls, protect sensitive information, and reduce security risks before applications reach or change in production.",
  },

  {
    id: 2,
    serial: "question 02",
    question: "What types of applications can Softree security test?",
    answer:
      "Softree provides security testing for web applications, mobile applications, APIs, enterprise applications, portals, dashboards, cloud-based applications, and integrated software environments.",
  },

  {
    id: 3,
    serial: "question 03",
    question: "What security testing services does Softree provide?",
    answer:
      "Softree provides application security testing, web security testing, API security testing, mobile security testing, vulnerability assessment, penetration testing, security regression testing, automated security testing, and continuous security testing.",
  },

  {
    id: 4,
    serial: "question 04",
    question: "Which security testing tools and frameworks do you support?",
    answer:
      "Softree can work with application security testing tools, API testing frameworks, vulnerability assessment technologies, SAST and DAST solutions, CI/CD platforms, cloud environments, and other security technologies based on project requirements.",
  },

  {
    id: 5,
    serial: "question 05",
    question: "Can you perform vulnerability assessments?",
    answer:
      "Yes. Security testing can include vulnerability assessment to identify, analyze, and prioritize potential weaknesses across applications, APIs, integrations, dependencies, and software environments.",
  },

  {
    id: 6,
    serial: "question 06",
    question: "Can security testing be integrated into CI/CD pipelines?",
    answer:
      "Yes. Security testing can be integrated into CI/CD workflows to validate application changes continuously, identify security issues earlier, and support secure software delivery through DevSecOps practices.",
  },

  {
    id: 7,
    serial: "question 07",
    question: "Can you provide API and mobile security testing?",
    answer:
      "Yes. Softree provides security testing for APIs and mobile applications, including authentication, authorization, data protection, application workflows, integrations, network communication, and backend services.",
  },

  {
    id: 8,
    serial: "question 08",
    question: "How do you maintain security testing when applications change?",
    answer:
      "Security regression testing and continuous security validation help re-test critical security controls after application changes, while automated testing can improve repeatability and coverage throughout the development lifecycle.",
  },

  {
    id: 9,
    serial: "question 09",
    question: "Can Softree provide an offshore security testing team?",
    answer:
      "Yes. Softree can provide dedicated offshore security testing resources that work alongside development and QA teams to support vulnerability testing, application security testing, regression testing, and continuous security validation.",
  },
];

/** Brand palette: pure white `#ffffff`, blue `#1852FF`, orange `#FF5812`, ink `#0a0a1a` */
const FAQ_INK = "#0a0a1a"
const FAQ_INK_MUTED = "#2a3348"

/** Same palette, alternating blue / orange at different shades */
const FAQ_CARD_THEMES = [
  {
    from: "#ffffff",
    via: "#f4f7ff",
    to: "#e8eeff",
    accent: "#1852FF",
    scrim: "from-white/55 via-white/30 to-[#1852FF]/10",
  },
  {
    from: "#ffffff",
    via: "#fff6f0",
    to: "#ffe8dc",
    accent: "#FF5812",
    scrim: "from-white/55 via-white/30 to-[#FF5812]/10",
  },
  {
    from: "#ffffff",
    via: "#f0f4ff",
    to: "#dce6ff",
    accent: "#1852FF",
    scrim: "from-white/55 via-white/30 to-[#1852FF]/10",
  },
  {
    from: "#ffffff",
    via: "#fff4ed",
    to: "#ffd9c8",
    accent: "#FF5812",
    scrim: "from-white/55 via-white/30 to-[#FF5812]/10",
  },
  {
    from: "#ffffff",
    via: "#edf2ff",
    to: "#d0dcff",
    accent: "#1852FF",
    scrim: "from-white/55 via-white/30 to-[#1852FF]/10",
  },
] as const

export default function SecurityTestingFAQ({ faqs: customFaqs }: SecurityTestingFAQProps) {
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
                className={`${typography.caption.default} uppercase tracking-wider transition-colors duration-500`}
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
                  className={`${typography.heading.h4} leading-snug transition-colors duration-500`}
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
                <h4 className={`mb-1.5 ${typography.caption.default} uppercase tracking-wider`} style={{ color: `${FAQ_INK_MUTED}99` }}>
                  Question Answer:
                </h4>
                <div className="mb-3 h-px w-14" style={{ backgroundColor: `${theme.accent}35` }} />
                <p className={`mb-4 ${typography.body.sm}`} style={{ color: `${FAQ_INK}d9` }}>
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
    <section ref={sectionRef} className="relative w-full bg-white py-14 md:py-20">
      {/* FAQPage JSON-LD — enables AI Overview, ChatGPT/Claude/Gemini citation,
         and Google rich results. Each answer is 30-50 words for optimal
         AEO extraction (the LLM sweet spot). */}
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
      <div className="mx-auto w-full max-w-[1800px] px-4 sm:px-6 lg:px-[2cm]">
        {/* Section Title */}
        <div ref={titleRef} className="mb-10 md:mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-100 px-3 py-1">
            <span className={`${typography.caption.default} text-[#FF6B2C] tracking-widest uppercase`}>FAQ</span>
          </div>
          <h2 className={`${typography.heading.h2} text-[#0a0a1a] max-w-4xl mb-4`}>
            Frequently Asked Questions About {" "}
            <span className="bg-gradient-to-r from-[#1852FF] to-[#FF5812] bg-clip-text text-transparent">
              Security Testing Services
            </span>
          </h2>
          <p className={`${typography.description.default} text-slate-600 max-w-3xl`}>
            Find answers to common questions about security testing, application security testing, vulnerability assessment, penetration testing, API security, DevSecOps, and offshore security testing services.
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
