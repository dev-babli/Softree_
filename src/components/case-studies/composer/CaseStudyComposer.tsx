"use client"

import NumberFlow from "@number-flow/react"
import Image from "next/image"
import { AlertCircle, Check, Clock, Layers } from "lucide-react"
import LightContactSection from "@/components/homepage-light/LightContactSection"
import LightFAQExact from "@/components/homepage-light/LightFAQExact"
import { stockPackForSlug } from "@/lib/case-study-stock-images"
import type { CaseStudyLayoutData, GalleryItem } from "../layouts/types"
import { OverviewSection } from "../layouts/variants/manufacturing/sections/OverviewSection"
import { GallerySection } from "../layouts/variants/manufacturing/sections/GallerySection"
import { ImpactSection } from "../layouts/variants/manufacturing/sections/ImpactSection"
import { RelatedSection } from "../layouts/variants/manufacturing/sections/RelatedSection"
import { TechStackSection } from "../layouts/variants/manufacturing/sections/TechStackSection"
import { TestimonialSection } from "../layouts/variants/manufacturing/sections/TestimonialSection"
import { NarrativeProse } from "../layouts/variants/manufacturing/sections/NarrativeProse"
import {
  PageContainer,
  ParallaxLayer,
  Reveal,
  RevealItem,
  RevealStagger,
  SectionHeaderReveal,
  SectionLabel,
  SectionTitle,
} from "../layouts/variants/manufacturing/shared"
import { csLightClasses } from "../layouts/design-system/caseStudyLightTokens"
import type {
  CaseStudyComposerSection,
  ComposerImage,
  CsBeforeAfterSection,
  CsCardGridSection,
  CsEvidencePanel,
  CsFaqSection,
  CsGallerySection,
  CsHeroMetricsStrip,
  CsMetricsSection,
  CsNarrativeSection,
  CsSolutionSection,
  CsTechStackSection,
  CsTestimonialSection,
} from "./types"
import { BlogRelatedSection } from "@/components/blog/BlogRelatedSection"
import { ReactBitsPreview } from "@/components/react-bits/ReactBitsPreview"
import type { CsReactBitsSection } from "./types"
import { caseStudySectionSurface } from "@/components/case-studies/detail/caseStudyDetailSurfaces"

const REACT_BITS_HEIGHT: Record<string, string> = {
  sm: "min-h-[320px]",
  md: "min-h-[480px]",
  lg: "min-h-[640px]",
}

const METRICS_GRID_COLS: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
}

const CARD_ICONS = [Layers, AlertCircle, Clock]

function imageUrl(image?: ComposerImage | null): string | undefined {
  return image?.asset?.url
}

function mapGalleryImages(images?: ComposerImage[]): GalleryItem[] {
  return (images || [])
    .map((item) => {
      const url = imageUrl(item)
      if (!url) return null
      return { url, alt: item.alt, caption: item.caption }
    })
    .filter(Boolean) as GalleryItem[]
}

function ComposerNarrativeBlock({
  block,
  client,
  slug,
  surfaceClass,
}: {
  block: CsNarrativeSection
  client: string
  slug: string
  surfaceClass: string
}) {
  const id = block.anchorId || undefined
  const sideImage = block.layout === "split" ? imageUrl(block.image) : undefined

  return (
    <section id={id} className={`scroll-mt-24 py-16 md:py-24 ${surfaceClass}`}>
      <PageContainer>
        <SectionHeaderReveal
          className="max-w-3xl"
          label={block.label ? <SectionLabel>{block.label}</SectionLabel> : undefined}
          title={block.heading ? <SectionTitle>{block.heading}</SectionTitle> : undefined}
        />

        {sideImage ? (
          <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <Reveal variant="up" delay={0.08} className="max-w-3xl">
              <NarrativeProse value={block.content as never} />
            </Reveal>
            <ParallaxLayer strength={24}>
              <Reveal variant="scale" delay={0.1}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#efeae0]">
                  <Image
                    src={sideImage}
                    alt={block.image?.alt || `${client} — project context`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 48vw, 100vw"
                  />
                </div>
              </Reveal>
            </ParallaxLayer>
          </div>
        ) : (
          <Reveal variant="blur" delay={0.08} className="mt-8 max-w-3xl">
            <NarrativeProse value={block.content as never} />
          </Reveal>
        )}
      </PageContainer>
    </section>
  )
}

function ComposerCardGridBlock({
  block,
  client,
  slug,
  surfaceClass,
}: {
  block: CsCardGridSection
  client: string
  slug: string
  surfaceClass: string
}) {
  const cards = block.cards || []
  if (!cards.length) return null
  const cmsImage = imageUrl(block.image)
  const imageSrc =
    block.showImage !== false ? cmsImage || stockPackForSlug(slug).challenge : null

  return (
    <section className={`scroll-mt-24 py-16 md:py-24 ${surfaceClass}`}>
      <PageContainer>
        <SectionHeaderReveal
          className="max-w-3xl"
          label={block.label ? <SectionLabel>{block.label}</SectionLabel> : undefined}
          title={block.heading ? <SectionTitle>{block.heading}</SectionTitle> : undefined}
        />

        <div className={`mt-12 grid items-start gap-10 ${imageSrc ? "lg:grid-cols-[1fr_1.1fr]" : ""}`}>
          {imageSrc ? (
            <ParallaxLayer strength={22}>
              <Reveal variant="right" delay={0.06}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#efeae0]">
                  <Image
                    src={imageSrc}
                    alt={block.image?.alt || (client ? `${client} — project context` : "Project context")}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 48vw, 100vw"
                  />
                </div>
              </Reveal>
            </ParallaxLayer>
          ) : null}

          <RevealStagger className="grid gap-5">
            {cards.map((card, i) => {
              const Icon = CARD_ICONS[i % CARD_ICONS.length]
              return (
                <RevealItem key={card._key || card.title} variant="scale">
                  <article className={`${csLightClasses.card} p-6 md:p-7 transition-transform duration-300 hover:-translate-y-1`}>
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
      </PageContainer>
    </section>
  )
}

function ComposerSolutionBlock({
  block,
  surfaceClass,
}: {
  block: CsSolutionSection
  surfaceClass: string
}) {
  const features = block.features || []
  if (!block.heading && !block.summary && !features.length) return null

  return (
    <section id="solution" className={`scroll-mt-24 py-16 md:py-24 ${surfaceClass}`}>
      <PageContainer>
        <SectionHeaderReveal
          className="max-w-3xl"
          label={block.label ? <SectionLabel>{block.label}</SectionLabel> : undefined}
          title={block.heading ? <SectionTitle>{block.heading}</SectionTitle> : undefined}
          description={
            block.summary ? (
              <p className="text-[1.0625rem] leading-[1.65] text-[var(--cs-text-secondary,#334155)]">
                {block.summary}
              </p>
            ) : undefined
          }
        />

        {features.length > 0 ? (
          <RevealStagger className="mt-10 grid max-w-3xl gap-3">
            {features.map((feature, i) => (
              <RevealItem key={`${feature}-${i}`}>
                <li className="flex list-none gap-3 rounded-xl border border-[rgba(15,23,42,0.08)] bg-[var(--softree-bg-light,#fafaf9)] px-4 py-3 text-[0.9375rem] text-[var(--cs-text-secondary,#334155)]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--softree-accent,#FF7A2F)]" aria-hidden />
                  {feature}
                </li>
              </RevealItem>
            ))}
          </RevealStagger>
        ) : null}
      </PageContainer>
    </section>
  )
}

function ComposerBeforeAfterBlock({
  block,
  surfaceClass,
}: {
  block: CsBeforeAfterSection
  surfaceClass: string
}) {
  const rows = block.rows || []
  if (!rows.length) return null

  return (
    <section className={`scroll-mt-24 py-16 md:py-24 ${surfaceClass}`}>
      <PageContainer>
        <SectionHeaderReveal
          className="max-w-2xl"
          label={<SectionLabel>Comparison</SectionLabel>}
          title={<SectionTitle>{block.heading || "Before & after"}</SectionTitle>}
        />
        <Reveal variant="up" delay={0.08} className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse overflow-hidden rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white text-left text-sm">
            <thead>
              <tr className="border-b border-[rgba(15,23,42,0.08)] bg-[#f7f6f3]">
                <th className="px-5 py-4 font-semibold text-[var(--cs-text-muted,#64748b)]">Metric</th>
                <th className="px-5 py-4 font-semibold text-[var(--cs-text-muted,#64748b)]">Before</th>
                <th className="px-5 py-4 font-semibold text-[var(--softree-accent,#FF7A2F)]">After</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row._key || row.metric} className="border-b border-[rgba(15,23,42,0.06)] last:border-0">
                  <td className="px-5 py-4 font-medium text-[var(--cs-text-primary,#0f172a)]">{row.metric}</td>
                  <td className="px-5 py-4 text-[var(--cs-text-secondary,#334155)]">{row.before}</td>
                  <td className="px-5 py-4 font-semibold text-[var(--cs-text-primary,#0f172a)]">{row.after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </PageContainer>
    </section>
  )
}

function parseMetricValue(value: string): { num: number; prefix: string; suffix: string } {
  const match = value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/)
  if (!match) return { num: 0, prefix: "", suffix: value }
  return { num: parseFloat(match[2]), prefix: match[1], suffix: match[3] }
}

function ComposerHeroMetricsStripBlock({ block }: { block: CsHeroMetricsStrip }) {
  const metrics = block.metrics || []
  if (!metrics.length) return null

  const isBand = block.variant !== "strip"

  return (
    <section
      className={
        isBand
          ? "scroll-mt-24 bg-[var(--softree-accent,#FF7A2F)] py-10 text-white md:py-12"
          : "scroll-mt-24 border-y border-[rgba(15,23,42,0.08)] bg-[var(--softree-bg-light,#fafaf9)] py-8 md:py-10"
      }
    >
      <PageContainer>
        {(block.label || block.heading) && (
          <SectionHeaderReveal
            className="max-w-2xl"
            label={
              block.label ? (
                <SectionLabel className={isBand ? "text-white/70" : undefined}>{block.label}</SectionLabel>
              ) : null
            }
            title={
              block.heading ? (
                <SectionTitle className={isBand ? "text-white" : undefined}>{block.heading}</SectionTitle>
              ) : null
            }
          />
        )}
        <RevealStagger
          className={`grid gap-4 sm:grid-cols-2 ${METRICS_GRID_COLS[Math.min(metrics.length, 4)] || METRICS_GRID_COLS[4]} ${block.heading || block.label ? "mt-8" : ""}`}
        >
          {metrics.map((metric) => {
            const { num, prefix, suffix } = parseMetricValue(metric.value)
            const hasNumber = num > 0
            return (
              <RevealItem key={metric._key || metric.label} variant="scale">
                <div
                  className={
                    isBand
                      ? "rounded-2xl border border-white/15 bg-white/10 px-5 py-6 backdrop-blur-sm"
                      : "rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white px-5 py-6"
                  }
                >
                  <p
                    className={`text-[clamp(1.75rem,3vw,2.35rem)] font-bold leading-none tracking-[-0.03em] ${
                      isBand ? "text-white" : "text-[var(--softree-accent,#FF7A2F)]"
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
                  <p className={`mt-2 text-sm ${isBand ? "text-white/80" : "text-[var(--cs-text-muted,#64748b)]"}`}>
                    {metric.label}
                  </p>
                </div>
              </RevealItem>
            )
          })}
        </RevealStagger>
      </PageContainer>
    </section>
  )
}

function ComposerEvidencePanelBlock({
  block,
  surfaceClass,
}: {
  block: CsEvidencePanel
  surfaceClass: string
}) {
  const items = block.items || []
  if (!block.summary && !items.length) return null

  return (
    <section className={`scroll-mt-24 py-16 md:py-24 ${surfaceClass}`}>
      <PageContainer>
        <SectionHeaderReveal
          className="max-w-3xl"
          label={block.label ? <SectionLabel>{block.label}</SectionLabel> : null}
          title={<SectionTitle>{block.heading || "What the data shows"}</SectionTitle>}
        />
        {block.summary ? (
          <Reveal variant="up" delay={0.06}>
            <p
              className="mt-6 max-w-3xl text-[1.0625rem] leading-[1.7] text-[var(--cs-text-secondary,#334155)]"
              data-aeo-summary="true"
            >
              {block.summary}
            </p>
          </Reveal>
        ) : null}
        {items.length > 0 ? (
          <RevealStagger className="mt-10 grid gap-4 md:grid-cols-2">
            {items.map((item) => (
              <RevealItem key={item._key || item.claim}>
                <article className="h-full rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[var(--softree-bg-light,#fafaf9)] p-5">
                  <p className="text-[0.9375rem] leading-relaxed text-[var(--cs-text-primary,#0f172a)]">
                    {item.claim}
                  </p>
                  <p className="mt-3 text-xs font-medium uppercase tracking-[0.12em] text-[var(--cs-text-muted,#64748b)]">
                    Source{" "}
                    {item.sourceUrl ? (
                      <a
                        href={item.sourceUrl}
                        className="normal-case tracking-normal text-[var(--softree-accent,#FF7A2F)] underline underline-offset-4"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {item.source}
                      </a>
                    ) : (
                      <span className="normal-case tracking-normal text-[var(--cs-text-secondary,#334155)]">
                        {item.source}
                      </span>
                    )}
                  </p>
                </article>
              </RevealItem>
            ))}
          </RevealStagger>
        ) : null}
      </PageContainer>
    </section>
  )
}

function ComposerBlock({
  section,
  data,
  contentMode = "case-study",
  sectionIndex,
}: {
  section: CaseStudyComposerSection
  data: CaseStudyLayoutData
  contentMode?: "case-study" | "blog"
  sectionIndex: number
}) {
  const surfaceClass = caseStudySectionSurface(sectionIndex)

  switch (section._type) {
    case "csOverviewSection":
      if (contentMode === "blog") return null
      return <OverviewSection data={data} surfaceClass={surfaceClass} />

    case "csNarrativeSection":
      return (
        <ComposerNarrativeBlock
          block={section}
          client={data.client}
          slug={data.slug}
          surfaceClass={surfaceClass}
        />
      )

    case "csCardGridSection":
      return (
        <ComposerCardGridBlock
          block={section}
          client={data.client}
          slug={data.slug}
          surfaceClass={surfaceClass}
        />
      )

    case "csMetricsSection": {
      const metricsBlock = section as CsMetricsSection
      const patched: CaseStudyLayoutData = {
        ...data,
        impactHeading: metricsBlock.heading || "Results & business impact",
        impactMetrics: (metricsBlock.metrics || []).map((m) => ({
          value: m.value,
          label: m.label,
          description: m.description,
        })),
        beforeAfter: [],
      }
      return <ImpactSection data={patched} surfaceClass={surfaceClass} />
    }

    case "csSolutionSection":
      return <ComposerSolutionBlock block={section} surfaceClass={surfaceClass} />

    case "csGallerySection": {
      const galleryBlock = section as CsGallerySection
      return (
        <GallerySection
          items={mapGalleryImages(galleryBlock.images)}
          heading={galleryBlock.heading}
          subheading={galleryBlock.subheading}
        />
      )
    }

    case "csTestimonialSection": {
      const t = section as CsTestimonialSection
      const patched: CaseStudyLayoutData = {
        ...data,
        testimonial: {
          quote: t.quote,
          name: t.name,
          role: t.role,
          avatarUrl: imageUrl(t.avatar),
        },
      }
      return <TestimonialSection data={patched} surfaceClass={surfaceClass} />
    }

    case "csTechStackSection": {
      const tech = section as CsTechStackSection
      const stackItems = (tech.technologies || [])
        .map((entry) => {
          if (typeof entry === "string") {
            return entry ? { name: entry } : null
          }
          if (!entry?.name) return null
          return {
            name: entry.name,
            subtitle: entry.subtitle,
            logoUrl: imageUrl(entry.logo),
            logoAlt: entry.logo?.alt,
          }
        })
        .filter(Boolean) as Array<{
        name: string
        subtitle?: string
        logoUrl?: string
        logoAlt?: string
      }>
      if (!stackItems.length) return null
      return (
        <TechStackSection
          data={data}
          heading={tech.heading}
          description={tech.description}
          items={stackItems}
        />
      )
    }

    case "csBeforeAfterSection":
      return <ComposerBeforeAfterBlock block={section} surfaceClass={surfaceClass} />

    case "csHeroMetricsStrip":
      return <ComposerHeroMetricsStripBlock block={section as CsHeroMetricsStrip} />

    case "csEvidencePanel":
      return <ComposerEvidencePanelBlock block={section as CsEvidencePanel} surfaceClass={surfaceClass} />

    case "csFaqSection": {
      const faqBlock = section as CsFaqSection
      const faqItems = (faqBlock.faqs || []).map((f, i) => ({
        id: i + 1,
        serial: `question ${String(i + 1).padStart(2, "0")}`,
        question: f.question,
        answer: f.answer,
      }))
      if (!faqItems.length) return null
      return (
        <Reveal variant="up">
          <LightFAQExact faqs={faqItems} />
        </Reveal>
      )
    }

    case "csRelatedSection":
      if (contentMode === "blog") {
        return <BlogRelatedSection related={data.related} />
      }
      return <RelatedSection related={data.related} />

    case "csContactSection":
      return (
        <Reveal variant="scale">
          <LightContactSection />
        </Reveal>
      )

    case "csReactBitsSection": {
      const fx = section as CsReactBitsSection
      if (!fx.componentId) return null
      const heightClass = REACT_BITS_HEIGHT[fx.minHeight || "md"] || REACT_BITS_HEIGHT.md
      return (
        <section className={`relative overflow-hidden ${heightClass}`}>
          <ReactBitsPreview componentId={fx.componentId} className="absolute inset-0 h-full w-full" />
          {fx.heading ? (
            <div className="relative z-10 flex h-full items-center justify-center px-6">
              <h2 className="max-w-3xl text-center text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {fx.heading}
              </h2>
            </div>
          ) : null}
        </section>
      )
    }

    default:
      return null
  }
}

export function CaseStudyComposer({
  sections,
  data,
  contentMode = "case-study",
}: {
  sections?: CaseStudyComposerSection[] | null
  data: CaseStudyLayoutData
  contentMode?: "case-study" | "blog"
}) {
  if (!sections?.length) {
    return (
      <section className="py-24 text-center text-[var(--cs-text-muted,#64748b)]">
        <PageContainer>
          <Reveal variant="blur">
            <p>Add sections in the Page composer tab in Sanity Studio.</p>
          </Reveal>
        </PageContainer>
      </section>
    )
  }

  return (
    <>
      {sections.map((section, index) => (
        <ComposerBlock
          key={section._key || `${section._type}-${index}`}
          section={section}
          data={data}
          contentMode={contentMode}
          sectionIndex={index}
        />
      ))}
    </>
  )
}
