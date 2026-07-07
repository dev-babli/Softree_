"use client"

import Image from "next/image"
import { ArrowUpRight, ChevronDown } from "lucide-react"
import { stockHeroUrl } from "@/lib/case-study-stock-images"
import {
  CASE_STUDY_CATEGORY_CONFIG,
  isCaseStudyCategory,
} from "@/app/case-studies/categoryConfig"
import { getCaseStudyCategoryHref } from "@/lib/case-study-category"
import type { CaseStudyLayoutData } from "../../../types"
import {
  HeroReveal,
  PageContainer,
  ParallaxLayer,
  PrimaryButton,
  OutlineButton,
  RevealItem,
  RevealStagger,
} from "../shared"
import { CaseStudyBreadcrumb } from "@/components/case-studies/detail/CaseStudyDetailChrome"

const heroStyles = `
  @keyframes cs-detail-scroll-hint {
    0%, 20% { transform: translateY(0); opacity: 0.45; }
    50% { transform: translateY(6px); opacity: 1; }
    80%, 100% { transform: translateY(0); opacity: 0.45; }
  }
  .cs-detail-scroll-hint { animation: cs-detail-scroll-hint 2.4s ease-in-out infinite; }
  @media (prefers-reduced-motion: reduce) {
    .cs-detail-scroll-hint { animation: none !important; }
  }
`

function MetricCell({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white/80 px-5 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] backdrop-blur-sm">
      <span className="text-[clamp(1.5rem,2.8vw,2rem)] font-bold leading-none tracking-[-0.03em] text-[var(--softree-accent,#FF7A2F)]">
        {value}
      </span>
      <span className="mt-2 block max-w-[14ch] text-sm leading-snug text-[var(--cs-text-muted,#64748b)]">
        {label}
      </span>
    </div>
  )
}

export function HeroSection({ data }: { data: CaseStudyLayoutData }) {
  const heroSrc =
    data.sectionImages?.hero || data.heroImageUrl || stockHeroUrl(data.slug)
  const heroAlt = data.sectionImages?.heroAlt || data.heroImageAlt || data.client

  const categoryKey = isCaseStudyCategory(data.category || "") ? data.category : null
  const categoryConfig = categoryKey ? CASE_STUDY_CATEGORY_CONFIG[categoryKey] : null
  const categoryHref = categoryKey ? getCaseStudyCategoryHref(categoryKey) : undefined
  const accent = categoryConfig?.accentColor || data.accentColor || "#FF7A2F"

  const eyebrow =
    data.heroEyebrow ||
    [categoryConfig?.title, data.industry].filter(Boolean).join(" · ") ||
    "Customer story"

  const displayTitle = data.headerTitle || data.title
  const hasItalicLine = data.title && data.headerTitle && data.title !== data.headerTitle

  return (
    <header className="relative overflow-hidden bg-[#f8f4ec] text-[#141414]">
      <style>{heroStyles}</style>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[15%] -top-[25%] h-[min(70vw,520px)] w-[min(70vw,520px)] rounded-full blur-[100px]"
        style={{
          background: `radial-gradient(circle, color-mix(in srgb, ${accent} 22%, transparent) 0%, transparent 68%)`,
        }}
      />

      <PageContainer className="relative pb-14 pt-24 md:pb-20 md:pt-28 lg:pt-32">
        <HeroReveal delay={0}>
          <CaseStudyBreadcrumb
            categoryLabel={categoryConfig?.title}
            categoryHref={categoryHref}
            client={data.client}
          />
        </HeroReveal>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16">
          <div>
            <HeroReveal delay={0.04}>
              <div className="flex flex-wrap items-center gap-3">
                {data.clientLogoUrl ? (
                  <div className="relative h-9 w-[120px] shrink-0">
                    <Image
                      src={data.clientLogoUrl}
                      alt={`${data.client} logo`}
                      fill
                      className="object-contain object-left"
                      sizes="120px"
                    />
                  </div>
                ) : null}
                {categoryConfig ? (
                  <span
                    className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white"
                    style={{ backgroundColor: accent }}
                  >
                    {categoryConfig.title}
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--cs-text-muted,#64748b)]">
                    {eyebrow}
                  </span>
                )}
              </div>
            </HeroReveal>

            <HeroReveal delay={0.08} variant="blur" distance={18}>
              <p className="mt-5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#141414]/55">
                {data.client}
              </p>
            </HeroReveal>

            <HeroReveal delay={0.12} variant="scale" distance={24}>
              <h1 className="mt-4 max-w-[18ch] text-[clamp(2.35rem,5.2vw,3.85rem)] font-bold leading-[1.04] tracking-[-0.04em] text-[#141414]">
                {hasItalicLine ? (
                  <>
                    {data.title}
                    <span className="mt-1 block font-serif text-[0.92em] font-normal italic leading-[1.08] tracking-[-0.02em] text-[#141414]/88">
                      {displayTitle}
                    </span>
                  </>
                ) : (
                  displayTitle
                )}
              </h1>
            </HeroReveal>

            <HeroReveal delay={0.18} variant="up" distance={20}>
              <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.68] text-[var(--cs-text-secondary,#334155)] md:text-lg">
                {data.excerpt}
              </p>
            </HeroReveal>

            <HeroReveal delay={0.24}>
              <div className="mt-9 flex flex-wrap gap-3">
                <PrimaryButton href="#overview">Read the story</PrimaryButton>
                <OutlineButton href={data.cta.buttonHref}>
                  {data.cta.buttonText}
                  <ArrowUpRight className="ml-2 inline h-4 w-4" aria-hidden />
                </OutlineButton>
              </div>
            </HeroReveal>

            {data.highlights.length > 0 ? (
              <RevealStagger className="mt-10 grid gap-4 sm:grid-cols-3">
                {data.highlights.slice(0, 3).map((item) => (
                  <RevealItem key={item.label} variant="scale">
                    <MetricCell value={item.value} label={item.label} />
                  </RevealItem>
                ))}
              </RevealStagger>
            ) : null}
          </div>

          <HeroReveal delay={0.14} variant="scale" distance={36}>
            <ParallaxLayer strength={22}>
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-3 rounded-[2rem] opacity-40 blur-2xl"
                  style={{
                    background: `linear-gradient(135deg, color-mix(in srgb, ${accent} 35%, transparent), transparent)`,
                  }}
                />
                <div className="relative rounded-[1.75rem] bg-white/60 p-2 shadow-[0_28px_70px_rgba(15,23,42,0.08)] ring-1 ring-[#141414]/[0.06] backdrop-blur-sm">
                  <div className="overflow-hidden rounded-[calc(1.75rem-0.5rem)] bg-[#ebe8e0]">
                    <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
                      <Image
                        src={heroSrc}
                        alt={heroAlt}
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 540px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </ParallaxLayer>
          </HeroReveal>
        </div>

        <div className="mt-14 flex justify-center lg:mt-16">
          <a
            href="#overview"
            className="cs-detail-scroll-hint inline-flex flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--cs-text-muted,#64748b)] transition-colors hover:text-[var(--softree-accent,#FF7A2F)]"
          >
            <span>Scroll</span>
            <ChevronDown className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </PageContainer>
    </header>
  )
}
