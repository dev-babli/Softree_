"use client";

import { useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export interface FAQItem {
  id: number;
  serial: string;
  question: string;
  answer: string;
}

export interface GlobalPartnersFaqProps {
  faqs?: FAQItem[];
}

const defaultFaqs: FAQItem[] = [
  {
    id: 1,
    serial: "question 01",
    question: "What types of partnership models does Softree offer?",
    answer:
      "Softree offers flexible partnership models tailored to your business goals, including dedicated offshore engineering teams, white-label software development, project-based delivery, and long-term strategic technology alliances. You can scale engineering capacity up or down based on your roadmap and client commitments.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How does white-label development work with Softree?",
    answer:
      "Under our white-label model, Softree functions entirely behind the scenes under your agency or consultancy brand. We handle architecture, development, QA, and delivery while you maintain 100% ownership of client relationships, contracts, communication, and billing.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "Which technologies and services are covered under the partnership?",
    answer:
      "Our engineering capabilities span Agentic AI & Generative AI, Microsoft Technologies (Azure AI, Microsoft Fabric, Power Platform, SharePoint, Dynamics), Data Engineering & Analytics, Cloud Architecture, and Full-Stack Web & Mobile Development using React, Next.js, Node.js, Python, and modern cloud platforms.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "How do you protect intellectual property and confidentiality?",
    answer:
      "We adhere to strict IP protection and security protocols. Every partnership is backed by comprehensive Non-Disclosure Agreements (NDAs), secure code repositories, isolated environments, and strict access controls. All intellectual property, source code, and project assets remain 100% owned by you or your client.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "Can Softree integrate with our existing workflows and tools?",
    answer:
      "Yes. Our engineers seamlessly integrate into your development processes and toolchains, including Jira, Azure DevOps, GitHub, Slack, Microsoft Teams, and CI/CD pipelines. We follow your sprint cycles, standups, coding standards, and project management methodologies.",
  },
  {
    id: 6,
    serial: "question 06",
    question: "Can we start with a pilot project or small engagement?",
    answer:
      "Absolutely. Many of our successful long-term partnerships began with a focused proof of concept (PoC), pilot project, or scoped development phase. This allows both teams to align on communication, delivery quality, and working cadence before scaling.",
  },
  {
    id: 7,
    serial: "question 07",
    question: "How do you manage communication across different time zones?",
    answer:
      "Our global delivery model is structured with dedicated daily overlap hours for standups, reviews, and real-time collaboration with teams across North America, Europe, Australia, and APAC. Dedicated technical project leads ensure transparent communication and continuous progress.",
  },
  {
    id: 8,
    serial: "question 08",
    question: "Why choose Softree Technology as your global technology partner?",
    answer:
      "Softree brings 13+ years of engineering excellence, 3,000+ delivered projects, deep expertise across AI and Microsoft ecosystems, and a transparent delivery culture. We help partners accelerate delivery, expand technical capabilities, win larger client accounts, and achieve sustainable long-term growth.",
  },
];

/** Brand palette: cream `#F3F0EE`, blue `#1852FF`, orange `#FF5812`, ink `#0a0a1a` */
const FAQ_INK = "#0a0a1a";
const FAQ_INK_MUTED = "#2a3348";

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
] as const;

export function GlobalPartnersFaq({ faqs: customFaqs }: GlobalPartnersFaqProps) {
  const faqs = customFaqs || defaultFaqs;
  const [activeLeft, setActiveLeft] = useState<number>(faqs.length > 0 ? 0 : -1);
  const [activeRight, setActiveRight] = useState<number>(faqs.length > 1 ? 1 : -1);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const faqsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 30%",
          toggleActions: "play none none none",
        },
      });

      tl.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      tl.from(
        faqsRef.current,
        {
          y: 80,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      );
    },
    { scope: sectionRef }
  );

  const handleClick = (index: number) => {
    const isLeft = index % 2 === 0;
    if (isLeft) {
      setActiveLeft(activeLeft === index ? -1 : index);
    } else {
      setActiveRight(activeRight === index ? -1 : index);
    }
  };

  const renderFAQCard = (faq: FAQItem, index: number) => {
    const isActive = index % 2 === 0 ? index === activeLeft : index === activeRight;
    const theme = FAQ_CARD_THEMES[index % FAQ_CARD_THEMES.length];

    return (
      <div
        key={faq.id}
        className={`group/card relative overflow-hidden rounded-2xl border transition-all duration-500 ease-[var(--legacy-ease-0_4_0_0_2_1)] w-full ${
          isActive ? "bg-white shadow-xl" : "bg-white/90 shadow-sm hover:shadow-md"
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
            className="flex w-full flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1852FF]/50 focus-visible:ring-offset-2 cursor-pointer"
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
                <span
                  className="block mb-1.5 text-[11px] font-semibold uppercase tracking-wider"
                  style={{ color: `${FAQ_INK_MUTED}99` }}
                >
                  Question Answer:
                </span>
                <div
                  className="mb-3 h-px w-14"
                  style={{ backgroundColor: `${theme.accent}35` }}
                />
                <p className="mb-4 text-sm leading-relaxed" style={{ color: `${FAQ_INK}d9` }}>
                  {faq.answer}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="relative w-full bg-[#F3F0EE] py-12 md:py-16 lg:py-20">
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            dateModified: new Date().toISOString().split("T")[0],
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
  );
}

export default GlobalPartnersFaq;

