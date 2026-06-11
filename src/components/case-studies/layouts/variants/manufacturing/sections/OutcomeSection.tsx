"use client"

import type { CaseStudyLayoutData } from "../../../types"
import {
  PageContainer,
  Reveal,
  SectionHeaderReveal,
  SectionLabel,
  SectionTitle,
} from "../shared"
import { NarrativeProse } from "./NarrativeProse"

export function OutcomeSection({ data }: { data: CaseStudyLayoutData }) {
  const hasOutcome = Boolean(data.outcomeBody?.length)
  const hasExtra = Boolean(data.extraBody?.length)

  if (!hasOutcome && !hasExtra) return null

  return (
    <section id="outcome" className="scroll-mt-24 bg-[var(--softree-bg-light,#fafaf9)] py-16 md:py-24">
      <PageContainer>
        <SectionHeaderReveal
          className="max-w-3xl"
          label={<SectionLabel>The outcome</SectionLabel>}
          title={<SectionTitle>What changed for the client</SectionTitle>}
        />

        {hasOutcome ? (
          <Reveal variant="up" delay={0.1} className="mt-8 max-w-3xl">
            <NarrativeProse value={data.outcomeBody} />
          </Reveal>
        ) : null}

        {hasExtra ? (
          <Reveal variant="blur" delay={0.14} className="mt-10 max-w-3xl border-t border-[rgba(15,23,42,0.08)] pt-10">
            <NarrativeProse value={data.extraBody} />
          </Reveal>
        ) : null}
      </PageContainer>
    </section>
  )
}
