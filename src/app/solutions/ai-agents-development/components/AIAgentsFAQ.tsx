"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { faqs } from "../data/faqs";

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

export default function AIAgentsFAQ() {
  const [activeLeft, setActiveLeft] = useState<number>(
    faqs.length > 0 ? 0 : -1
  );
  const [activeRight, setActiveRight] = useState<number>(
    faqs.length > 1 ? 1 : -1
  );

  const handleClick = (index: number) => {
    const isLeft = index % 2 === 0;
    if (isLeft) {
      setActiveLeft(activeLeft === index ? -1 : index);
    } else {
      setActiveRight(activeRight === index ? -1 : index);
    }
  };

  const renderFAQCard = (faq: (typeof faqs)[0], index: number) => {
    const isActive =
      index % 2 === 0 ? index === activeLeft : index === activeRight;
    const theme = FAQ_CARD_THEMES[index % FAQ_CARD_THEMES.length];

    return (
      <div
        key={faq.id}
        className={`group/card relative flex w-full flex-col overflow-hidden rounded-2xl border transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isActive
            ? "bg-white shadow-xl"
            : "bg-white/90 shadow-sm hover:shadow-md"
        }`}
        style={{
          borderColor: isActive ? `${theme.accent}40` : `${theme.accent}22`,
          boxShadow: isActive ? `0 12px 40px ${theme.accent}22` : undefined,
        }}
      >
        {/* Backgrounds */}
        {!isActive && (
          <>
            <div
              className="absolute inset-0 opacity-100 transition-all duration-500 group-hover/card:opacity-90"
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
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${theme.from} 0%, ${theme.via} 58%, ${theme.to} 100%)`,
              }}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-b ${theme.scrim}`}
            />
            <div className="absolute inset-0 bg-white/20" />
          </div>
        )}

        {/* Content Container */}
        <div className="relative flex h-full flex-col justify-between p-5 md:p-6">
          <button
            type="button"
            aria-expanded={isActive}
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
                      ? "rotate-90 scale-0 opacity-0"
                      : "rotate-0 scale-100 opacity-100"
                  }`}
                  style={{ color: theme.accent }}
                />
                <Minus
                  className={`absolute inset-0 h-6 w-6 transition-all duration-500 ${
                    isActive
                      ? "rotate-0 scale-100 opacity-100"
                      : "-rotate-90 scale-0 opacity-0"
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

          <AnimatePresence initial={false}>
            {isActive && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  return (
    <section className="relative w-full bg-[#F3F0EE] py-14 md:py-20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 md:mb-10"
        >
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
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#0a0a1a]/70">
            Find answers to the most common questions about enterprise AI agent
            development, implementation, integrations, security, and ongoing
            support.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
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
        </motion.div>
      </div>
    </section>
  );
}
