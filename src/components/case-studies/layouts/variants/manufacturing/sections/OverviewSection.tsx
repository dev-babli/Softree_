"use client"

import type { CaseStudyLayoutData } from "../../../types"
import { PageContainer, Reveal, SectionLabel, SectionTitle } from "../shared"

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
    <div className="flex flex-col gap-1.5">
      <div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[var(--cs-text-muted,#64748b)]">
        {label}
      </div>
      <div className="text-[1rem] font-medium leading-snug text-[var(--cs-text-primary,#0f172a)]">
        {value || "—"}
      </div>
    </div>
  )
}

export function OverviewSection({ data }: { data: CaseStudyLayoutData }) {
  const entries = Object.entries(data.snapshot)

  return (
    <section id="overview" className="scroll-mt-24 bg-white py-16 md:py-24">
      <PageContainer>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
          <Reveal>
            <SectionLabel>Project overview</SectionLabel>
            <SectionTitle>{data.client}</SectionTitle>
            <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.65] text-[var(--cs-text-secondary,#334155)]">
              {data.excerpt}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="grid grid-cols-2 gap-x-6 gap-y-7 rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[var(--softree-bg-light,#fafaf9)] p-6 md:p-8 lg:col-span-1 lg:row-span-1">
              {entries.map(([key, value]) => (
                <SummaryItem key={key} label={SNAPSHOT_LABELS[key] || key} value={value} />
              ))}
            </div>
          </Reveal>
        </div>
      </PageContainer>
    </section>
  )
}
