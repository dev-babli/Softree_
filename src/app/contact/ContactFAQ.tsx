"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTACT_FAQS } from "@/data/contact-page";

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CONTACT_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="border-t border-neutral-200/80 bg-white py-16 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mx-auto max-w-[900px] px-6">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff5812]">
          Before you write
        </p>
        <h2 className="mt-3 text-center text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-[-0.03em] text-neutral-950">
          Common questions
        </h2>

        <ul className="mt-10 divide-y divide-neutral-200/90 border-y border-neutral-200/90">
          {CONTACT_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <li key={faq.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-start justify-between gap-4 py-5 text-left transition-colors hover:text-[#ff5812]"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15px] font-medium leading-snug text-neutral-900">
                    {faq.question}
                  </span>
                  <span
                    className={`mt-0.5 shrink-0 text-lg leading-none text-neutral-400 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pr-8 text-[14px] leading-relaxed text-neutral-600">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
