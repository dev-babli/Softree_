"use client"

import Image from "next/image"
import { stockPackForSlug } from "@/lib/case-study-stock-images"
import type { CaseStudyLayoutData } from "../../../types"
import {
  PageContainer,
  ParallaxLayer,
  Reveal,
  RevealItem,
  RevealStagger,
  SectionHeaderReveal,
  SectionLabel,
  SectionTitle,
} from "../shared"
import { csLightClasses } from "../../../design-system/caseStudyLightTokens"

export function SolutionSection({ data }: { data: CaseStudyLayoutData }) {
  if (data.solutionNodes.length === 0 && !data.solutionSummary && !data.approachSummary) {
    return null
  }

  const dashboardSrc =
    data.sectionImages?.solutionDashboard || stockPackForSlug(data.slug).solution

  return (
    <section id="solution" className="scroll-mt-24 bg-white py-16 md:py-24">
      <PageContainer>
        <SectionHeaderReveal
          className="max-w-3xl"
          label={<SectionLabel>Solution overview</SectionLabel>}
          title={<SectionTitle>{data.solutionTitle || data.solutionHeading}</SectionTitle>}
          description={
            data.solutionSummary || data.approachSummary ? (
              <p className="text-[1.0625rem] leading-[1.65] text-[var(--cs-text-secondary,#334155)]">
                {data.solutionSummary || data.approachSummary}
              </p>
            ) : undefined
          }
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <ParallaxLayer strength={22}>
            <Reveal variant="right" delay={0.06}>
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
          </ParallaxLayer>

          <RevealStagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {data.solutionNodes.slice(0, 4).map((node) => (
              <RevealItem key={node.title} variant="scale">
                <div
                  className={`${csLightClasses.card} border-l-4 border-l-[var(--softree-accent,#FF7A2F)] p-5 transition-transform duration-300 hover:-translate-y-0.5`}
                >
                  <h3 className="text-base font-bold text-[var(--cs-text-primary,#0f172a)]">
                    {node.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--cs-text-muted,#64748b)]">
                    {node.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </PageContainer>
    </section>
  )
}
