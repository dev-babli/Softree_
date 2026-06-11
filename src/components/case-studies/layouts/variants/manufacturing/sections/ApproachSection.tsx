"use client"

import type { CaseStudyLayoutData } from "../../../types"
import {
  PageContainer,
  Reveal,
  RevealItem,
  RevealStagger,
  SectionHeaderReveal,
  SectionLabel,
  SectionTitle,
} from "../shared"
import { NarrativeProse } from "./NarrativeProse"

export function ApproachSection({ data }: { data: CaseStudyLayoutData }) {
  const hasNarrative = Boolean(data.approachBody?.length)
  const steps = data.approachSteps || []

  if (!hasNarrative && steps.length === 0) return null

  return (
    <section id="approach" className="scroll-mt-24 bg-white py-16 md:py-24">
      <PageContainer>
        <SectionHeaderReveal
          className="max-w-3xl"
          label={<SectionLabel>Our approach</SectionLabel>}
          title={
            <SectionTitle>{data.approachSummary || "How we made it happen"}</SectionTitle>
          }
        />

        {hasNarrative ? (
          <Reveal variant="blur" delay={0.1} className="mt-8 max-w-3xl">
            <NarrativeProse value={data.approachBody} />
          </Reveal>
        ) : null}

        {steps.length > 0 ? (
          <RevealStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, i) => (
              <RevealItem key={step.title} variant="scale">
                <div className="flex h-full flex-col rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[var(--softree-bg-light,#fafaf9)] p-6 transition-transform duration-300 hover:-translate-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--softree-accent,#FF7A2F)]">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-base font-bold tracking-tight text-[var(--cs-text-primary,#0f172a)]">
                    {step.title}
                  </h3>
                  {step.description ? (
                    <p className="mt-2 text-sm leading-relaxed text-[var(--cs-text-muted,#64748b)]">
                      {step.description}
                    </p>
                  ) : null}
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        ) : null}
      </PageContainer>
    </section>
  )
}
