"use client"

import Image from "next/image"
import type { CaseStudyLayoutData } from "../../../types"
import { PageContainer, Reveal, SectionLabel, SectionTitle } from "../shared"
import { csLightClasses } from "../../../design-system/caseStudyLightTokens"

export function SolutionSection({ data }: { data: CaseStudyLayoutData }) {
  const dashboardSrc =
    data.sectionImages?.solutionDashboard || "/Gallery/Prestige Bangalore-3.webp"

  return (
    <section id="solution" className="scroll-mt-24 bg-white py-16 md:py-24">
      <PageContainer>
        <Reveal className="max-w-3xl">
          <SectionLabel>Solution overview</SectionLabel>
          <SectionTitle>{data.solutionHeading}</SectionTitle>
          <p className="mt-5 text-[1.0625rem] leading-[1.65] text-[var(--cs-text-secondary,#334155)]">
            A governed Microsoft Power Platform stack connects plant teams, automated workflows, and
            executive analytics — without replacing existing ERP and MES investments.
          </p>
        </Reveal>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal delay={0.06}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f1f0ec] shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
              <Image
                src={dashboardSrc}
                alt="Power Platform operations dashboard"
                fill
                className="object-cover object-top"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {data.solutionNodes.slice(0, 4).map((node, i) => (
              <Reveal key={node.title} delay={0.1 + i * 0.04}>
                <div className={`${csLightClasses.card} border-l-4 border-l-[var(--softree-accent,#FF7A2F)] p-5`}>
                  <h3 className="text-base font-bold text-[var(--cs-text-primary,#0f172a)]">
                    {node.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--cs-text-muted,#64748b)]">
                    {node.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
