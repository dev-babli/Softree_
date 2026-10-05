"use client";

import { useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { prefersReducedMotion } from "@/lib/motion";
import { faqs as defaultFaqs } from "../data/faqs";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface FAQItem {
  id: number;
  serial: string;
  question: string;
  answer: string;
}

interface LangChainFAQProps {
  faqs?: FAQItem[];
}

const FAQ_INK = "#0a0a1a";
const FAQ_INK_MUTED = "#2a3348";

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

export default function LangChainFAQ({ faqs: customFaqs }: LangChainFAQProps) {
  const faqs = customFaqs || defaultFaqs;
  const [activeLeft, setActiveLeft] = useState<number>(faqs.length > 0 ? 0 : -1);
  const [activeRight, setActiveRight] = useState<number>(
    faqs.length > 1 ? 1 : -1
  );
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
    const isActive =
      index % 2 === 0 ? index === activeLeft : index === activeRight;
    const theme = FAQ_CARD_THEMES[index % FAQ_CARD_THEMES.length];

    return (
      <div
        key={faq.id}
        className={`group/card relative w-full overflow-hidden rounded-2xl border transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
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

        <div className="relative flex h-full flex-col justify-between p-5 md:p-6">
          <button
            type="button"
            aria-expanded={isActive}
            aria-controls={isActive ? `faq-answer-${faq.id}` : undefined}
            onClick={() => handleClick(index)}
            className="flex w-full flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1852FF]/50 focus-visible:ring-offset-2"
          >
            <div className="flex w-full flex-shrink-0 items-center justify-between">
              <span
                className="text-xs font-semibold uppercase tracking-wider transition-colors duration-500"
                style={{
                  color: isActive ? `${FAQ_INK_MUTED}cc` : FAQ_INK_MUTED,
                }}
              >
                {faq.serial}
              </span>
              <div className="relative h-6 w-6 flex-shrink-0">
                <Plus
                  className={`absolute inset-0 h-6 w-6 transition-all duration-500 ${
                    isActive
                      ? "scale-0 opacity-0 rotate-90"
                      : "scale-100 opacity-100 rotate-0"
                  }`}
                  style={{ color: theme.accent }}
                />
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

            <div className="mt-auto flex flex-col transition-all duration-500">
              <div className="mb-2">
                <h3
                  className={`font-semibold leading-snug transition-colors duration-500 ${
                    isActive ? "text-base md:text-lg" : "text-sm lg:text-[13px]"
                  }`}
                  style={{ color: FAQ_INK }}
                >
                  {faq.question}
                </h3>
              </div>
            </div>
          </button>

          {isActive && (
            <div id={`faq-answer-${faq.id}`} className="mt-2">
              <div className="pt-2 md:pt-3">
                <h4
                  className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider"
                  style={{ color: `${FAQ_INK_MUTED}99` }}
                >
                  Question Answer:
                </h4>
                <div
                  className="mb-3 h-px w-14"
                  style={{ backgroundColor: `${theme.accent}35` }}
                />
                <p
                  className="mb-4 text-sm leading-relaxed"
                  style={{ color: `${FAQ_INK}d9` }}
                >
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
    <section
      ref={sectionRef}
      className="bg-white pt-8 md:pt-12 pb-8 md:pb-12 text-slate-900 scroll-mt-24 relative overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            dateModified: "2026-08-01",
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
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 flex flex-col">
        <div ref={titleRef} className="flex flex-col mb-8 sm:mb-12">
          <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block self-start">
            <span className="typo-caption text-[#FF5812] uppercase">
              FAQ
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-6 items-start">
            <h2 className="typo-heading-2 text-slate-900 lg:pr-12 xl:pr-24">
              Frequently Asked <span className="bg-gradient-to-r from-[#1852FF] to-[#FF5812] bg-clip-text text-transparent">Questions</span>
            </h2>

            <p className="typo-description text-slate-500 w-full pt-1.5 lg:max-w-xl">
              Common questions about Softree LangChain development—chains, RAG, agents, tool calling, observability, and delivery.
            </p>
          </div>
        </div>

        <div
          ref={faqsRef}
          className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:items-start lg:gap-3"
        >
          <div className="contents lg:flex lg:flex-col lg:gap-3">
            {faqs.map((faq, index) =>
              index % 2 === 0 ? renderFAQCard(faq, index) : null
            )}
          </div>
          <div className="contents lg:flex lg:flex-col lg:gap-3">
            {faqs.map((faq, index) =>
              index % 2 !== 0 ? renderFAQCard(faq, index) : null
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
