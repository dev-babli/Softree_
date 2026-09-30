"use client"

import { useState, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { Plus, Minus } from "lucide-react"
import { prefersReducedMotion } from "@/lib/motion"

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface FAQItem {
  id: number
  serial: string
  question: string
  answer: string
}

interface AutomationTestingFAQProps {
  faqs?: FAQItem[]
}

const defaultFaqs: FAQItem[] = [
  {
    id: 1,
    serial: "question 01",
    question: "What is automation testing?",
    answer:
      "Automation testing uses software tools and automated test scripts to validate application functionality, workflows, APIs, and other quality requirements with minimal manual intervention. It helps improve test coverage, reduce repetitive testing, and provide faster feedback throughout the software development lifecycle.",
  },

  {
    id: 2,
    serial: "question 02",
    question: "What types of applications can Softree automate?",
    answer:
      "Softree provides automation testing for web applications, mobile applications, APIs, enterprise applications, portals, dashboards, and integrated software workflows. Automation can be applied to functional, regression, end-to-end, and continuous testing scenarios.",
  },

  {
    id: 3,
    serial: "question 03",
    question: "What automation testing services does Softree provide?",
    answer:
      "Softree provides functional test automation, web and UI automation, mobile test automation, API test automation, regression testing, end-to-end testing, performance test automation, and CI/CD-based continuous testing.",
  },

  {
    id: 4,
    serial: "question 04",
    question: "Which test automation frameworks and tools do you support?",
    answer:
      "Softree works with automation technologies and frameworks based on your application, technology stack, and testing requirements. The appropriate tools and frameworks are selected based on application type, test coverage, maintainability, scalability, and CI/CD integration needs.",
  },

  {
    id: 5,
    serial: "question 05",
    question: "Can you automate regression testing?",
    answer:
      "Yes. Softree can automate regression test suites to validate critical application functionality after code changes, new releases, integrations, and feature updates. Automated regression testing helps reduce repetitive manual effort and provides faster feedback on application quality.",
  },

  {
    id: 6,
    serial: "question 06",
    question: "Can automation testing be integrated into CI/CD pipelines?",
    answer:
      "Yes. Automated tests can be integrated into CI/CD pipelines to execute quality checks throughout the software delivery lifecycle. This enables faster feedback, continuous validation, earlier defect detection, and greater confidence before releases.",
  },

  {
    id: 7,
    serial: "question 07",
    question: "Can you provide API and mobile automation testing?",
    answer:
      "Yes. Softree provides API automation for backend services, REST and SOAP APIs, integrations, data validation, and business workflows, along with mobile automation for Android and iOS applications and their critical user journeys.",
  },

  {
    id: 8,
    serial: "question 08",
    question: "How do you maintain automated test scripts when applications change?",
    answer:
      "Softree maintains automation suites by updating test scripts, improving reusable components, addressing application changes, reducing test flakiness, and continuously reviewing automation coverage. This helps keep automated tests reliable and maintainable as applications evolve.",
  },

  {
    id: 9,
    serial: "question 09",
    question: "Can Softree provide an offshore automation testing team?",
    answer:
      "Yes. Softree provides offshore QA automation teams that can work alongside your developers, QA engineers, DevOps teams, and technical stakeholders. Engagements can be scaled according to project requirements, release schedules, application complexity, and ongoing automation needs.",
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

export default function AutomationTestingFAQ({ faqs: customFaqs }: AutomationTestingFAQProps) {
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
                className="typo-caption uppercase tracking-wider transition-colors duration-500"
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
                  className="typo-heading-4 leading-snug transition-colors duration-500"
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
                <h4 className="mb-1.5 typo-caption uppercase tracking-wider" style={{ color: `${FAQ_INK_MUTED}99` }}>
                  Question Answer:
                </h4>
                <div className="mb-3 h-px w-14" style={{ backgroundColor: `${theme.accent}35` }} />
                <p className="mb-4 typo-body-sm" style={{ color: `${FAQ_INK}d9` }}>
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
            <span className="typo-caption text-[#FF6B2C] tracking-widest uppercase">FAQ</span>
          </div>
          <h2 className="typo-heading-2 text-[#0a0a1a] max-w-4xl mb-4">
            Frequently Asked Questions About {" "}
            <span className="bg-gradient-to-r from-[#1852FF] to-[#FF5812] bg-clip-text text-transparent">
              Automation Testing Services
            </span>
          </h2>
          <p className="typo-description text-slate-600 max-w-3xl">
            Find answers to common questions about automation testing, test automation frameworks, automated regression testing, API testing, CI/CD integration, testing tools, and offshore QA automation services.
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
