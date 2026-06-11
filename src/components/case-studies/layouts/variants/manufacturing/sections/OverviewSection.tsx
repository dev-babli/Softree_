"use client"

import type { CaseStudyLayoutData } from "../../../types"
import {
  PageContainer,
  RevealItem,
  RevealStagger,
  SectionHeaderReveal,
  SectionLabel,
  SectionTitle,
} from "../shared"

const SNAPSHOT_LABELS: Record<string, string> = {
  projectType: "Project type",
  industry: "Industry",
  region: "Region",
  duration: "Duration",
  teamSize: "Team size",
  users: "End users",
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[var(--cs-text-muted,#64748b)]">
        {label}
      </div>
      <div className="break-words text-[1rem] font-medium leading-snug text-[var(--cs-text-primary,#0f172a)]">
        {value}
      </div>
    </div>
  )
}

export function OverviewSection({ data }: { data: CaseStudyLayoutData }) {
  const entries = Object.entries(data.snapshot).filter(([, value]) => Boolean(value?.trim()))

  return (
    <section id="overview" className="scroll-mt-24 bg-white py-16 md:py-24">
      <PageContainer>
        <SectionHeaderReveal
          className="max-w-3xl"
          label={<SectionLabel>Project overview</SectionLabel>}
          title={<SectionTitle>{data.client}</SectionTitle>}
          description={
            <p className="text-[1.0625rem] leading-[1.65] text-[var(--cs-text-secondary,#334155)]">
              {data.excerpt}
            </p>
          }
        />

        {entries.length > 0 ? (
          <RevealStagger className="mt-12 grid gap-x-8 gap-y-8 rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[var(--softree-bg-light,#fafaf9)] p-7 [grid-template-columns:repeat(auto-fit,minmax(150px,1fr))] md:p-9">
            {entries.map(([key, value]) => (
              <RevealItem key={key}>
                <SummaryItem label={SNAPSHOT_LABELS[key] || key} value={value} />
              </RevealItem>
            ))}
          </RevealStagger>
        ) : null}
      </PageContainer>
    </section>
  )
}
