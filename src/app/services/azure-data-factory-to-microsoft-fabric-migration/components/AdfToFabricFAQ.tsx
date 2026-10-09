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

interface AdfToFabricFAQProps {
  faqs?: FAQItem[]
}

const defaultFaqs: FAQItem[] = [
  {
    id: 1,
    serial: "question 01",
    question: "Why should we migrate from Azure Data Factory to Microsoft Fabric?",
    answer:
      "Microsoft Fabric unifies scattered analytics services into a single SaaS platform. Migrating from ADF allows you to eliminate data silos, leverage OneLake to stop data duplication, and dramatically improve Power BI performance through DirectLake mode without import refreshes.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "Can we automatically convert ADF pipelines to Fabric pipelines?",
    answer:
      "Yes, most ADF pipelines and data flows can be mapped and converted into Fabric Data Pipelines or Dataflows Gen2. Our migration tools and processes programmatically translate JSON pipeline definitions into native Fabric workloads to accelerate the migration.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "What happens to our Synapse Dedicated SQL Pools?",
    answer:
      "Synapse SQL Pools can be migrated into Fabric Data Warehouses. Because Fabric separates compute from storage, the underlying data is converted to Delta Parquet format on OneLake. This makes the data instantly accessible to Spark and Power BI without movement.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "How does this migration impact our Power BI reports?",
    answer:
      "The migration significantly improves Power BI performance. By converting your storage to OneLake and upgrading datasets to use DirectLake mode, Power BI can query massive datasets in sub-seconds directly from the lakehouse without needing scheduled data refreshes.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "How does Softree ensure a safe migration with zero downtime?",
    answer:
      "We use a parallel-run migration strategy. The new Fabric environment runs alongside your legacy Azure environment, allowing us to perform rigorous data parity and performance testing. We only initiate the final cutover when 100% accuracy is validated.",
  },
];

const FAQ_INK = "#0a0a1a"
const FAQ_INK_MUTED = "#2a3348"

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

export default function AdfToFabricFAQ({ faqs: customFaqs }: AdfToFabricFAQProps) {
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
        {!isActive && (
          <>
            <div
              className="absolute inset-0 transition-all duration-500 group-hover/card:opacity-90"
              style={{
                background: `linear-gradient(135deg, ${theme.from} 0%, ${theme.via} 50%, ${theme.to} 100%)`,
              }}
            />
            <div
              className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-10 transition-opacity duration-500 group-hover/card:opacity-20"
              style={{ backgroundColor: theme.accent }}
            />
            <div
              className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full opacity-5 transition-opacity duration-500 group-hover/card:opacity-15"
              style={{ backgroundColor: theme.accent }}
            />
            <div
              className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
              style={{
                boxShadow: `inset 0 0 0 1px ${theme.accent}28, 0 0 30px ${theme.accent}14`,
              }}
            />
          </>
        )}

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

        <div className="relative flex h-full flex-col p-5 md:p-6 justify-between">
          <button
            type="button"
            aria-expanded={isActive}
            aria-controls={isActive ? `faq-answer-${faq.id}` : undefined}
            onClick={() => handleClick(index)}
            className="flex w-full flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1852FF]/50 focus-visible:ring-offset-2"
          >
            <div className="flex items-center justify-between w-full flex-shrink-0">
              <span
                className="typo-caption uppercase transition-colors duration-500"
                style={{ color: isActive ? `${FAQ_INK_MUTED}cc` : FAQ_INK_MUTED }}
              >
                {faq.serial}
              </span>
              <div className="relative h-6 w-6 flex-shrink-0">
                <Plus
                  className={`absolute inset-0 h-6 w-6 transition-all duration-500 ${isActive
                    ? "scale-0 opacity-0 rotate-90"
                    : "scale-100 opacity-100 rotate-0"
                    }`}
                  style={{ color: theme.accent }}
                />
                <Minus
                  className={`absolute inset-0 h-6 w-6 transition-all duration-500 ${isActive
                    ? "scale-100 opacity-100 rotate-0"
                    : "scale-0 opacity-0 -rotate-90"
                    }`}
                  style={{ color: theme.accent }}
                />
              </div>
            </div>

            <div className="mt-auto flex flex-col transition-all duration-500">
              <div className="mb-2 mt-4">
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
                <h4 className="typo-caption uppercase mb-1.5" style={{ color: `${FAQ_INK_MUTED}99` }}>
                  Question Answer:
                </h4>
                <div className="mb-3 h-px w-14" style={{ backgroundColor: `${theme.accent}35` }} />
                <p className="typo-body mb-4" style={{ color: `${FAQ_INK}d9` }}>
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
        <div ref={titleRef} className="mb-10 md:mb-14">
          <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block">
            <span className="typo-caption text-[#FF6B2C] uppercase">FAQ</span>
          </div>
          <h2 className="typo-heading-2 text-[#0a0a1a] max-w-4xl mb-4">
            Frequently Asked Questions About
            <span className="bg-gradient-to-r from-[#1852FF] to-[#FF5812] bg-clip-text text-transparent block mt-2 md:mt-3 leading-[1.15]">
              ADF to Microsoft Fabric Migration.
            </span>
          </h2>
          <p className="typo-description text-slate-600 max-w-3xl">
            Find answers to common questions about migrating Azure Data Factory pipelines, Synapse SQL pools, and Power BI models to Microsoft Fabric.
          </p>
        </div>

        <div
          ref={faqsRef}
          className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-3 lg:items-start"
        >
          <div className="contents lg:flex lg:flex-col lg:gap-3">
            {faqs.map((faq, index) => (index % 2 === 0 ? renderFAQCard(faq, index) : null))}
          </div>
          <div className="contents lg:flex lg:flex-col lg:gap-3">
            {faqs.map((faq, index) => (index % 2 !== 0 ? renderFAQCard(faq, index) : null))}
          </div>
        </div>
      </div>
    </section>
  )
}
