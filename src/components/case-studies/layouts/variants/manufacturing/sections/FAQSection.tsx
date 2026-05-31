"use client"

import { useState } from "react"
import { HelpCircle, Minus, Plus } from "lucide-react"
import type { CaseStudyFAQ } from "../../../types"
import { PageContainer, Reveal, SectionTitle } from "../shared"

export function FAQSection({ faqs }: { faqs: CaseStudyFAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  if (!faqs.length) return null

  return (
    <section id="faq" className="scroll-mt-24 bg-[var(--cs-bg-warm)] py-20 md:py-28">
      <PageContainer>
        <Reveal className="mb-12 max-w-2xl md:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--cs-accent)]/20 bg-[var(--cs-accent)]/8 px-4 py-2">
            <HelpCircle className="h-4 w-4 text-[var(--cs-accent)]" aria-hidden />
            <span className="text-sm font-medium text-[var(--cs-accent)]">FAQ</span>
          </div>
          <SectionTitle>
            Questions about{" "}
            <span className="text-[var(--cs-accent)]">Power Platform</span> rollouts
          </SectionTitle>
        </Reveal>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            }),
          }}
        />

        <div className="divide-y divide-[var(--cs-border)] rounded-2xl border border-[var(--cs-border)] bg-[var(--cs-surface)]">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <Reveal key={faq.question} delay={i * 0.03}>
                <div>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full cursor-pointer items-start justify-between gap-6 px-6 py-6 text-left transition-colors hover:bg-[var(--cs-bg)]/60 md:px-8 md:py-7"
                    aria-expanded={isOpen}
                  >
                    <div className="flex gap-5">
                      <span className="mt-0.5 shrink-0 font-[family-name:var(--cs-display)] text-lg text-[var(--cs-accent)]/50">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base font-semibold leading-snug text-[var(--cs-ink)] md:text-lg">
                        {faq.question}
                      </span>
                    </div>
                    <span className="mt-1 shrink-0 text-[var(--cs-ink-muted)]">
                      {isOpen ? (
                        <Minus className="h-5 w-5" aria-hidden />
                      ) : (
                        <Plus className="h-5 w-5" aria-hidden />
                      )}
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-[var(--cs-ease-out)] ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 pl-[4.25rem] text-base leading-[1.75] text-[var(--cs-ink-soft)] md:px-8 md:pb-7 md:pl-[4.75rem]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </PageContainer>
    </section>
  )
}
