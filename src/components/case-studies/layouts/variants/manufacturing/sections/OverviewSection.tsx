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
    <div className="relative flex min-w-0 flex-col gap-2 pl-0 sm:pl-6 sm:first:pl-0">
      <div
        aria-hidden
        className="mb-1 hidden h-0.5 w-6 rounded-full bg-[var(--softree-accent,#FF7A2F)] sm:block"
      />
      <div className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[var(--cs-text-muted,#64748b)]">
        {label}
      </div>
      <div className="break-words text-[1.05rem] font-semibold leading-snug text-[var(--cs-text-primary,#0f172a)]">
        {value}
      </div>
    </div>
  )
}

export function OverviewSection({
  data,
  surfaceClass = "bg-white",
}: {
  data: CaseStudyLayoutData
  surfaceClass?: string
}) {
  const entries = Object.entries(data.snapshot).filter(([, value]) => Boolean(value?.trim()))

  return (
    <section id="overview" className={`scroll-mt-24 py-16 md:py-24 ${surfaceClass}`}>
      <PageContainer>
        <SectionHeaderReveal
          className="max-w-3xl"
          label={<SectionLabel>Project overview</SectionLabel>}
          title={<SectionTitle>{data.client}</SectionTitle>}
          description={
            <p className="text-[1.0625rem] leading-[1.68] text-[var(--cs-text-secondary,#334155)]">
              {data.excerpt}
            </p>
          }
        />

        {entries.length > 0 ? (
          <RevealStagger className="mt-12 divide-y divide-[rgba(15,23,42,0.08)] rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white/70 p-7 backdrop-blur-sm sm:grid sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-3 lg:divide-x lg:divide-y-0 xl:grid-cols-6">
            {entries.map(([key, value], index) => (
              <RevealItem key={key}>
                <div className={index > 0 ? "pt-6 sm:pt-0" : ""}>
                  <SummaryItem label={SNAPSHOT_LABELS[key] || key} value={value} />
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        ) : null}
      </PageContainer>
    </section>
  )
}
