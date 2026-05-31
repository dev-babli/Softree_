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
        {data.highlights.length > 0 && (
          <Reveal>
            <div className="grid gap-px overflow-hidden rounded-[14px] border border-[rgba(15,23,42,0.08)] bg-[rgba(15,23,42,0.04)] sm:grid-cols-2 lg:grid-cols-4">
              {data.highlights.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-2 bg-white px-6 py-8 md:px-8"
                >
                  <span className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-none tracking-[-0.02em] text-[var(--softree-accent,#FF7A2F)]">
                    {item.value}
                  </span>
                  <span className="text-sm leading-snug text-[var(--cs-text-secondary,#334155)]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        <div className="mt-14 grid gap-12 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
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
