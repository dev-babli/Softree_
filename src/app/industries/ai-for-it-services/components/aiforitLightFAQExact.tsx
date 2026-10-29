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
    question: "What is AI for IT, and how does it transform enterprise technology operations?",
    answer:
      "AI for IT refers to the strategic application of artificial intelligence, machine learning (ML), large language models (LLMs), and autonomous AI agents to modernize and optimize IT operations, service management (ITSM), and engineering workflows. Unlike traditional rule-based IT automation, AI for IT continuously ingests telemetry, logs, metric streams, and historical ticketing data to proactively detect system anomalies, automate Tier-1/Tier-2 service desk inquiries, accelerate root cause analysis (RCA), and optimize hybrid multi-cloud infrastructure. By transforming IT from a reactive cost center into an intelligent, self-healing operational engine, organizations dramatically reduce mean time to resolution (MTTR) while freeing senior engineers to focus on high-value business innovation.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How is AI used in IT operations to improve performance and minimize downtime?",
    answer:
      "In modern IT operations (ITOps), artificial intelligence acts as an automated operational intelligence layer that monitors full-stack environments 24/7. Key applications include: (1) Anomaly Detection & Predictive Maintenance: Analyzing telemetry across microservices and cloud servers to identify degrading hardware or software bottlenecks before outages strike; (2) Intelligent Incident Classification & Routing: Automatically triaging incoming alerts, deduplicating repetitive incident storms, and routing critical issues to relevant subject matter experts; (3) Automated Troubleshooting & Log Analytics: Leveraging generative AI and semantic vector search to parse millions of unstructured logs, correlating distributed traces to pinpoint exact fault domains; and (4) Autonomous Remediation: Triggering pre-approved, audited runbooks for routine tasks such as container restarts, credential rotations, and dynamic cloud auto-scaling.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "What is the difference between AI for IT and AIOps?",
    answer:
      "While the terms are closely related, AIOps (Artificial Intelligence for IT Operations) is a specialized subset of the broader AI for IT paradigm. AIOps specifically targets operational telemetry—ingesting, correlating, and analyzing big data from IT monitoring, observability platforms (Datadog, Dynatrace, New Relic), network events, and system logs to identify infrastructure failures and alert fatigue. In contrast, AI for IT encompasses the comprehensive digital ecosystem across the enterprise: intelligent IT Service Management (ITSM platforms like ServiceNow and Jira Service Management), GenAI-powered service desk copilots, contextual IT knowledge management using RAG (Retrieval-Augmented Generation), automated DevOps code reviews, governance compliance auditing, and autonomous AI agents capable of executing complex cross-platform workflows.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Can AI agents automate complex IT service desk workflows and tasks?",
    answer:
      "Yes. Enterprise AI agents go far beyond traditional scripted chatbots by orchestrating multi-step, deterministic, and autonomous IT workflows connected to enterprise systems via secure APIs and MCP (Model Context Protocol) toolsets. In modern IT environments, autonomous AI agents can safely handle automated employee onboarding/offboarding, active directory provisioning, role-based access management (RBAC), software license distribution, VPN configuration diagnostics, password resets, and hardware procurement approvals. Equipped with real-time enterprise guardrails, human-in-the-loop (HITL) checkpoints, and detailed audit trails, AI agents resolve up to 60-70% of routine service requests autonomously without human engineer intervention.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "How does Softree integrate AI with existing ITSM platforms and legacy IT systems?",
    answer:
      "Softree engineers seamless, non-disruptive AI integrations tailored to your existing IT ecosystem—including ServiceNow, Jira Service Management, Zendesk, BMC Helix, Freshservice, and Microsoft System Center. Utilizing secure REST/GraphQL APIs, webhook event buses, enterprise middleware, and custom connectors, we deploy private Retrieval-Augmented Generation (RAG) pipelines and conversational AI assistants directly on top of your proprietary Confluence, SharePoint, and internal runbook repositories. This architecture enables enterprise IT teams to supercharge their existing tech investments with contextual AI assistance while maintaining zero vendor lock-in and avoiding costly rip-and-replace migrations.",
  },
  {
    id: 6,
    serial: "question 06",
    question: "How does enterprise AI for IT ensure data privacy, security, and compliance?",
    answer:
      "Enterprise security and strict data governance are foundational to every AI solution Softree builds. We implement robust, air-gapped or private cloud deployments (AWS, Microsoft Azure, Google Cloud) with zero-data-retention guarantees, ensuring that proprietary corporate data, customer credentials, and sensitive IT telemetry are never utilized to train public foundation models. Our implementations incorporate strict role-based access control (RBAC), field-level PII/PHI redaction, end-to-end TLS 1.3/AES-256 encryption, detailed SOC 2, ISO 27001, and HIPAA compliance audit logging, as well as strict guardrails to prevent hallucination, prompt injection, and unauthorized API execution.",
  },
  {
    id: 7,
    serial: "question 07",
    question: "What measurable ROI and business outcomes can organizations expect from AI for IT?",
    answer:
      "Deploying enterprise AI for IT consistently yields tangible operational dividends within 60 to 90 days of implementation. Typical measurable outcomes include: a 40% to 75% reduction in Tier-1 ticket volume via autonomous conversational deflection; up to 60% acceleration in Mean Time to Resolution (MTTR) through automated incident triage and contextual root-cause recommendations; over 80% reduction in alert fatigue by consolidating noise into actionable incidents; and substantial cloud cost savings through automated resource rightsizing. More importantly, it eliminates engineer burnout, improves SLA compliance, and drives employee satisfaction scores (CSAT) past 90%.",
  },
  {
    id: 8,
    serial: "question 08",
    question: "What engagement and delivery models does Softree offer for AI for IT implementation?",
    answer:
      "Softree provides flexible, end-to-end engagement models customized to your organization's technical maturity, timeline, and budget. Our models include: (1) Rapid AI Proof-of-Concept (PoC) & Feasibility Audits to validate high-impact ITSM and ITOps use cases within 2-4 weeks; (2) End-to-End Turnkey Delivery spanning custom AI agent development, RAG infrastructure, and system integration; (3) Dedicated Offshore AI Engineering Teams to augment your internal DevOps, SRE, and platform engineering departments; and (4) White-Label AI Engineering for MSPs, system integrators, and IT consultancies delivering next-generation AI services to their end clients under their own brand.",
  },
];

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

export default function AiforitLightFAQExact({ faqs: customFaqs }: LightFAQExactProps) {
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
            <span className="typo-caption text-[#FF6B2C] tracking-widest uppercase">AI FOR IT SERVICES FAQ</span>
          </div>
          <h2 className="typo-heading-2 text-[#0a0a1a] max-w-4xl mb-4">
            Frequently Asked Questions About {" "}
            <span className="bg-gradient-to-r from-[#1852FF] to-[#FF5812] bg-clip-text text-transparent">
              AI for IT Services & Solutions.
            </span>
          </h2>
          <p className="typo-description text-slate-600 max-w-3xl">
            Explore detailed insights on implementing enterprise AI, AIOps, autonomous IT agents, ITSM automation, and offshore engineering models for IT service providers and enterprises.
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
