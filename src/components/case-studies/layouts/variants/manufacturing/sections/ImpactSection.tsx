"use client"

import NumberFlow from "@number-flow/react"
import type { CaseStudyLayoutData } from "../../../types"
import { PageContainer, Reveal, SectionLabel, SectionTitle } from "../shared"

function parseMetricValue(value: string): { num: number; prefix: string; suffix: string } {
  const match = value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/)
  if (!match) return { num: 0, prefix: "", suffix: value }
  return { num: parseFloat(match[2]), prefix: match[1], suffix: match[3] }
}

export function ImpactSection({ data }: { data: CaseStudyLayoutData }) {
  return (
    <section id="impact" className="scroll-mt-24 bg-white py-16 md:py-24">
      <PageContainer>
        <Reveal className="max-w-2xl">
          <SectionLabel>Results</SectionLabel>
          <SectionTitle>{data.impactHeading}</SectionTitle>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {data.impactMetrics.map((metric, i) => {
            const { num, prefix, suffix } = parseMetricValue(metric.value)
            const hasNumber = num > 0

            return (
              <Reveal key={metric.label} delay={i * 0.04}>
                <div className="flex h-full flex-col rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[var(--softree-bg-light,#fafaf9)] p-7 md:p-8">
                  <p className="text-[clamp(2rem,4vw,2.75rem)] font-bold leading-none tracking-[-0.03em] text-[var(--softree-accent,#FF7A2F)]">
                    {hasNumber ? (
                      <>
                        {prefix}
                        <NumberFlow value={num} />
                        {suffix}
                      </>
                    ) : (
                      metric.value
                    )}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--cs-text-muted,#64748b)]">
                    {metric.label}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>

        {data.beforeAfter.length > 0 && (
          <Reveal delay={0.1} className="mt-14 overflow-hidden rounded-2xl border border-[rgba(15,23,42,0.08)]">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[rgba(15,23,42,0.08)] bg-[var(--softree-bg-light,#fafaf9)]">
                  <th className="px-6 py-4 font-semibold text-[var(--cs-text-secondary,#334155)]" scope="col">
                    Metric
                  </th>
                  <th className="px-6 py-4 font-semibold text-[var(--cs-text-muted,#64748b)]" scope="col">
                    Before
                  </th>
                  <th className="px-6 py-4 font-semibold text-[var(--softree-accent,#FF7A2F)]" scope="col">
                    After
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.beforeAfter.map((row) => (
                  <tr key={row.metric} className="border-b border-[rgba(15,23,42,0.06)] last:border-0">
                    <td className="px-6 py-4 font-medium text-[var(--cs-text-primary,#0f172a)]">
                      {row.metric}
                    </td>
                    <td className="px-6 py-4 text-[var(--cs-text-muted,#64748b)]">{row.before}</td>
                    <td className="px-6 py-4 font-semibold text-[var(--cs-text-primary,#0f172a)]">
                      {row.after}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        )}
      </PageContainer>
    </section>
  )
}
