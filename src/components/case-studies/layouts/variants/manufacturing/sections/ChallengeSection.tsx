"use client"

import Image from "next/image"
import { AlertCircle, Clock, Layers } from "lucide-react"
import type { CaseStudyLayoutData } from "../../../types"
import { PageContainer, Reveal, SectionLabel, SectionTitle } from "../shared"
import { csLightClasses } from "../../../design-system/caseStudyLightTokens"

const ICONS = [Layers, AlertCircle, Clock]

export function ChallengeSection({ data }: { data: CaseStudyLayoutData }) {
  const imageSrc = data.sectionImages?.challenge || "/Gallery/Prestige Bangalore-2.webp"

  return (
    <section id="challenge" className="scroll-mt-24 bg-[var(--softree-bg-light,#fafaf9)] py-16 md:py-24">
      <PageContainer>
        <Reveal className="max-w-3xl">
          <SectionLabel>{data.challengeHeading}</SectionLabel>
          <SectionTitle>{data.challengeSubheading}</SectionTitle>
        </Reveal>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <Reveal delay={0.05}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#efeae0]">
              <Image
                src={imageSrc}
                alt="Operations and manufacturing workspace"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 48vw, 100vw"
              />
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-1">
            {data.challengeCards.map((card, i) => {
              const Icon = ICONS[i % ICONS.length]
              return (
                <Reveal key={card.title} delay={0.08 + i * 0.05}>
                  <article className={`${csLightClasses.card} p-6 md:p-7`}>
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--softree-accent-soft,rgba(255,122,47,0.12))] text-[var(--softree-accent,#FF7A2F)]">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="text-lg font-bold tracking-tight text-[var(--cs-text-primary,#0f172a)]">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--cs-text-muted,#64748b)]">
                      {card.description}
                    </p>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
