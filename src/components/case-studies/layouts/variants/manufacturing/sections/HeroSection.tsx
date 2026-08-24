"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ChevronDown, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react"
import { stockHeroUrl } from "@/lib/case-study-stock-images"
import {
  CASE_STUDY_CATEGORY_CONFIG,
  isCaseStudyCategory,
  type CaseStudyCategoryKey,
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

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.45; transform: scale(0.85); }
  }
  .cs-pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }

  @keyframes glass-shine {
    0% { transform: translateX(-100%) rotate(25deg); }
    100% { transform: translateX(200%) rotate(25deg); }
  }
  .cs-glass-shine { animation: glass-shine 6s ease-in-out infinite; }

  @media (prefers-reduced-motion: reduce) {
    .cs-detail-scroll-hint, .cs-pulse-dot, .cs-glass-shine { animation: none !important; }
  }
`

function MetricCell({ value, label, accent = "#FF5812" }: { value: string; label: string; accent?: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-black/[0.08] bg-white/90 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.03)] backdrop-blur-md transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-0.5">
      <div className="flex items-baseline gap-1">
        <span
          className="text-[clamp(1.75rem,3vw,2.4rem)] font-extrabold leading-none tracking-[-0.04em]"
          style={{ color: accent }}
        >
          {value}
        </span>
      </div>
      <span className="mt-2 block text-[12px] font-medium leading-tight text-neutral-600">
        {label}
      </span>
    </div>
  )
}

export function HeroSection({ data }: { data: CaseStudyLayoutData }) {
  const heroSrc =
    data.sectionImages?.hero || data.heroImageUrl || stockHeroUrl(data.slug)
  const heroAlt = data.sectionImages?.heroAlt || data.heroImageAlt || data.client

  const rawCategory = data.category || ""
  const categoryKey: CaseStudyCategoryKey | null = isCaseStudyCategory(rawCategory) ? rawCategory : null
  const categoryConfig = categoryKey ? CASE_STUDY_CATEGORY_CONFIG[categoryKey] : null
  const categoryHref = categoryKey ? getCaseStudyCategoryHref(categoryKey) : undefined
  const accent = categoryConfig?.accentColor || data.accentColor || "#FF5812"

  const eyebrow =
    data.heroEyebrow ||
    [categoryConfig?.title, data.industry].filter(Boolean).join(" · ") ||
    "Customer Story"

  const isComposer = data.layout === "page-composer"
  const displayTitle = isComposer ? data.title : (data.headerTitle || data.title)
  const hasItalicLine = isComposer ? false : Boolean(data.title && data.headerTitle && data.title !== data.headerTitle)

  return (
    <header className="relative overflow-hidden bg-[#F8F9FC] text-[#0a0a1a] pb-12 pt-20 sm:pt-28 lg:pt-32">
      <style>{heroStyles}</style>

      {/* Ambient background glow mesh */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -right-[10%] -top-[20%] h-[700px] w-[700px] rounded-full blur-[130px] opacity-70"
          style={{
            background: `radial-gradient(circle, ${accent}33, ${accent}0D 55%, transparent 75%)`,
          }}
        />
        <div
          className="absolute -left-[10%] top-[25%] h-[600px] w-[600px] rounded-full blur-[140px] opacity-50"
          style={{
            background: "radial-gradient(circle, rgba(24,82,255,0.15), rgba(24,82,255,0.03) 50%, transparent 70%)",
          }}
        />
      </div>

      {/* Noise grain texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle Dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:radial-gradient(#0a0a1a_1px,transparent_1px)] [background-size:32px_32px]"
      />

      <PageContainer className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        {/* Breadcrumb Navigation */}
        <HeroReveal delay={0}>
          <div className="mb-6">
            <CaseStudyBreadcrumb
              categoryLabel={categoryConfig?.title}
              categoryHref={categoryHref}
              client={isComposer ? data.title : data.client}
            />
          </div>
        </HeroReveal>

        {/* 2-COLUMN SPLIT GRID — 50/50 Equal Width & Matched Height */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12">
          {/* Left Column: Headline, Badge, Subtext, CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center items-start">
            <HeroReveal delay={0.04}>
              <div className="flex flex-wrap items-center gap-3">
                {data.clientLogoUrl ? (
                  <div className="relative h-8 w-[110px] shrink-0">
                    <Image
                      src={data.clientLogoUrl}
                      alt={data.client ? `${data.client} logo` : "logo"}
                      fill
                      className="object-contain object-left"
                      sizes="110px"
                    />
                  </div>
                ) : null}

                {/* Refined Glass Eyebrow Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/90 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] shadow-sm backdrop-blur-md">
                  <span
                    className="cs-pulse-dot h-2 w-2 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                  <span className="text-neutral-800">
                    {categoryConfig?.title || data.industry || eyebrow}
                  </span>
                  {!isComposer && data.client && (
                    <>
                      <span className="text-neutral-300">•</span>
                      <span className="text-neutral-500 font-medium normal-case tracking-normal">
                        {data.client}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </HeroReveal>

            {/* Display Headline */}
            <HeroReveal delay={0.1} variant="blur" distance={20}>
              <h1 className="mt-6 text-[clamp(2.3rem,4.8vw,4.2rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-[#0a0a1a]">
                {hasItalicLine ? (
                  <>
                    <span>{data.title} </span>
                    <span
                      className="mt-2 block font-serif italic font-normal text-[0.92em] leading-[1.08]"
                      style={{ color: accent }}
                    >
                      {displayTitle}.
                    </span>
                  </>
                ) : (
                  <span>
                    {displayTitle}
                    <span style={{ color: accent }}>.</span>
                  </span>
                )}
              </h1>
            </HeroReveal>

            {/* Subtitle / Excerpt */}
            <HeroReveal delay={0.16} variant="up" distance={18}>
              <p className="mt-6 max-w-[600px] text-base sm:text-lg leading-relaxed text-neutral-600 font-normal">
                {data.excerpt}
              </p>
            </HeroReveal>

            {/* CTAs */}
            <HeroReveal delay={0.22}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href={data.cta.buttonHref || "/contact"}
                  className="inline-flex h-12 items-center gap-2 rounded-full px-7 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg"
                  style={{
                    backgroundColor: accent,
                    boxShadow: `0 10px 25px -5px ${accent}66`,
                  }}
                >
                  <span>{data.cta.buttonText || "Schedule a Consultation"}</span>
                  <ArrowUpRight className="h-4 w-4 stroke-[2.5]" aria-hidden />
                </Link>

                <a
                  href="#overview"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-neutral-300 bg-white/90 px-6 text-sm font-semibold text-neutral-800 transition-all hover:bg-white hover:border-neutral-400 active:scale-95 shadow-sm"
                >
                  Read Full Story
                </a>
              </div>
            </HeroReveal>

            {/* Highlighted Outcome Stat Cells */}
            {data.highlights.length > 0 && (
              <RevealStagger className="mt-10 grid w-full gap-3 sm:grid-cols-3">
                {data.highlights.slice(0, 3).map((item) => (
                  <RevealItem key={item.label} variant="scale">
                    <MetricCell value={item.value} label={item.label} accent={accent} />
                  </RevealItem>
                ))}
              </RevealStagger>
            )}
          </div>

          {/* Right Column: Matched Height Glass Browser Mockup Visual */}
          <HeroReveal delay={0.15} variant="scale" distance={30} className="lg:col-span-6 w-full flex flex-col justify-center">
            <div className="relative w-full flex flex-col justify-center items-center">
              {/* Glowing halo behind mockup */}
              <div
                aria-hidden
                className="absolute -inset-4 rounded-3xl opacity-50 blur-2xl pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${accent}45 0%, transparent 70%)`,
                }}
              />

              {/* Mac Glass Browser Window — Matched Large Height */}
              <div className="relative w-full min-h-[460px] sm:min-h-[500px] lg:min-h-[560px] flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white/90 shadow-[0_25px_60px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_35px_70px_rgba(0,0,0,0.16)]">
                {/* Window Bar Header */}
                <div className="flex h-11 shrink-0 w-full items-center justify-between border-b border-black/[0.08] bg-neutral-100/90 px-4">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f56] shadow-inner" />
                    <span className="h-3 w-3 rounded-full bg-[#ffbd2e] shadow-inner" />
                    <span className="h-3 w-3 rounded-full bg-[#27c93f] shadow-inner" />
                  </div>

                  <div className="flex items-center gap-1.5 rounded-md border border-black/[0.06] bg-white/90 px-3 py-0.5 text-[11px] font-medium text-neutral-500 shadow-inner max-w-[230px] truncate">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">softreetechnology.com/case-studies</span>
                  </div>

                  <div className="w-8" />
                </div>

                {/* Image Display Frame - Aspect Ratio Matched (Zero Cropping) */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0d0f18] p-1">
                  <Image
                    src={heroSrc}
                    alt={heroAlt}
                    fill
                    priority
                    className="object-contain object-center transition-transform duration-700 hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 650px"
                  />

                  {/* Glass Shine Diagonal Overlay */}
                  <div className="cs-glass-shine absolute inset-0 pointer-events-none w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                  {/* Overlay Floating Metric Chip */}
                  {data.highlights.length > 0 && (
                    <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2.5 rounded-xl border border-white/30 bg-black/70 px-3.5 py-2 backdrop-blur-md shadow-xl">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-white/70">
                          Impact Verified
                        </span>
                        <span className="text-[12px] font-bold text-white leading-none">
                          {data.highlights[0].value} {data.highlights[0].label}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </HeroReveal>
        </div>

        {/* Scroll Hint */}
        <div className="mt-12 flex justify-center lg:mt-16">
          <a
            href="#overview"
            className="cs-detail-scroll-hint inline-flex flex-col items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-neutral-400 transition-colors hover:text-neutral-800"
          >
            <span>Scroll to explore</span>
            <ChevronDown className="h-4 w-4 text-neutral-500" aria-hidden />
          </a>
        </div>
      </PageContainer>
    </header>
  )
}
