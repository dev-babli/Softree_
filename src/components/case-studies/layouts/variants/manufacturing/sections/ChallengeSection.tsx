"use client"

import Image from "next/image"
import { AlertCircle, Clock, Layers } from "lucide-react"
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
import { NarrativeProse } from "./NarrativeProse"

const ICONS = [Layers, AlertCircle, Clock]

export function ChallengeSection({ data }: { data: CaseStudyLayoutData }) {
  const hasNarrative = Boolean(data.challengeBody?.length)
  const hasCards = data.challengeCards.length > 0

  if (!hasNarrative && !hasCards && !data.challengeSubheading) return null

  const imageSrc =
    data.sectionImages?.challenge || stockPackForSlug(data.slug).challenge

  return (
    <section id="challenge" className="scroll-mt-24 bg-[var(--softree-bg-light,#fafaf9)] py-16 md:py-24">
      <PageContainer>
        <SectionHeaderReveal
          className="max-w-3xl"
          label={<SectionLabel>{data.challengeHeading}</SectionLabel>}
          title={<SectionTitle>{data.challengeSubheading || "The Challenge"}</SectionTitle>}
        />

        {hasNarrative ? (
          <Reveal variant="up" delay={0.1} className="mt-8 max-w-3xl">
            <NarrativeProse value={data.challengeBody} />
          </Reveal>
        ) : null}

        {hasCards ? (
          <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <ParallaxLayer strength={24}>
              <Reveal variant="right" delay={0.08}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#efeae0]">
                  <Image
                    src={imageSrc}
                    alt={data.client ? `${data.client} — project context` : "Project context"}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 48vw, 100vw"
                  />
                </div>
              </Reveal>
            </ParallaxLayer>

            <RevealStagger className="grid gap-5 sm:grid-cols-1">
              {data.challengeCards.map((card, i) => {
                const Icon = ICONS[i % ICONS.length]
                return (
                  <RevealItem key={card.title} variant="scale">
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
                  </RevealItem>
                )
              })}
            </RevealStagger>
          </div>
        ) : null}
      </PageContainer>
    </section>
  )
}
