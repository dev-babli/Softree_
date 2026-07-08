"use client"

import NumberFlow from "@number-flow/react"
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

function parseMetricValue(value: string): { num: number; prefix: string; suffix: string } {
  const match = value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/)
  if (!match) return { num: 0, prefix: "", suffix: value }
  return { num: parseFloat(match[2]), prefix: match[1], suffix: match[3] }
}

function MetricCard({
  metric,
  featured = false,
}: {
  metric: { label: string; value: string; description?: string }
  featured?: boolean
}) {
  const { num, prefix, suffix } = parseMetricValue(metric.value)
  const hasNumber = num > 0

  return (
    <div
      className={`flex h-full flex-col justify-end rounded-2xl border border-[rgba(15,23,42,0.08)] p-7 transition-transform duration-300 hover:-translate-y-0.5 md:p-8 ${
        featured
          ? "bg-[#141414] text-white lg:col-span-2 lg:row-span-2 lg:min-h-[280px]"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <p
        className={`font-bold leading-none tracking-[-0.04em] ${
          featured
            ? "text-[clamp(3rem,8vw,4.5rem)] text-[var(--softree-accent,#FF7A2F)]"
            : "text-[clamp(1.85rem,3.5vw,2.5rem)] text-[var(--softree-accent,#FF7A2F)]"
        }`}
      >
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
      <p
        className={`mt-3 text-sm leading-relaxed ${
          featured ? "text-white/75" : "text-[var(--cs-text-muted,#64748b)]"
        }`}
      >
        {metric.label}
      </p>
      {metric.description ? (
        <p className={`mt-2 text-xs ${featured ? "text-white/55" : "text-[var(--cs-text-muted,#94a3b8)]"}`}>
          {metric.description}
        </p>
      ) : null}
    </div>
  )
}

export function ImpactSection({
  data,
  surfaceClass = "bg-[#f8f4ec]",
}: {
  data: CaseStudyLayoutData
  surfaceClass?: string
}) {
  if (data.impactMetrics.length === 0 && data.beforeAfter.length === 0) return null

  const [featured, ...rest] = data.impactMetrics

  return (
    <section id="impact" className={`scroll-mt-24 py-16 md:py-24 ${surfaceClass}`}>
      <PageContainer>
        <SectionHeaderReveal
          className="max-w-2xl"
          label={<SectionLabel>Results</SectionLabel>}
          title={<SectionTitle>{data.impactHeading}</SectionTitle>}
        />

        {data.impactMetrics.length > 0 ? (
          <RevealStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured ? (
              <RevealItem variant="scale" className="sm:col-span-2 lg:col-span-2 lg:row-span-2">
                <MetricCard metric={featured} featured />
              </RevealItem>
            ) : null}
            {rest.map((metric) => (
              <RevealItem key={metric.label} variant="scale">
                <MetricCard metric={metric} />
              </RevealItem>
            ))}
          </RevealStagger>
        ) : null}

        {data.beforeAfter.length > 0 ? (
          <Reveal variant="up" delay={0.1} className="mt-14 overflow-hidden rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[rgba(15,23,42,0.08)] bg-[#f8f4ec]">
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
        ) : null}
      </PageContainer>
    </section>
  )
}
