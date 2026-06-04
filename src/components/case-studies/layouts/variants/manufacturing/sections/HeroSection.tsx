"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { stockHeroUrl } from "@/lib/case-study-stock-images"
import type { CaseStudyLayoutData } from "../../../types"
import { PageContainer, Reveal, PrimaryButton, OutlineButton } from "../shared"

function MetricCell({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-2 border-t border-[rgba(15,23,42,0.08)] pt-6 first:border-t-0 first:pt-0 sm:border-t-0 sm:pt-0 sm:pl-6 sm:first:pl-0 sm:border-l sm:first:border-l-0">
      <span className="text-[clamp(1.65rem,3vw,2.25rem)] font-bold leading-none tracking-[-0.03em] text-[var(--softree-accent,#FF7A2F)]">
        {value}
      </span>
      <span className="max-w-[16ch] text-sm leading-snug text-[var(--cs-text-muted,#64748b)]">
        {label}
      </span>
    </div>
  )
}

export function HeroSection({ data }: { data: CaseStudyLayoutData }) {
  const heroSrc =
    data.sectionImages?.hero || data.heroImageUrl || stockHeroUrl(data.slug)
  const heroAlt = data.sectionImages?.heroAlt || data.heroImageAlt || data.client
  const eyebrow =
    data.heroEyebrow ||
    [data.industry, data.category].filter(Boolean).join(" · ") ||
    "Customer story"

  return (
    <header className="relative overflow-hidden bg-[#F7F6F3] text-[#181818]">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[20%] top-0 h-[70%] w-[55%] rounded-full bg-[radial-gradient(circle,rgba(255,88,18,0.08)_0%,transparent_68%)]"
      />

      <PageContainer className="relative pb-16 pt-28 md:pb-20 md:pt-32 lg:pt-36">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-center lg:gap-14">
          <div>
            <Reveal>
              <div className="flex flex-wrap items-center gap-4">
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
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--cs-text-muted,#64748b)]">
                  {eyebrow}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.04}>
              <p className="mt-5 text-sm font-semibold tracking-tight text-[#181818]/80">
                {data.client}
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-3 max-w-[16ch] text-[clamp(2.25rem,5.5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[#181818]">
                {data.title}
              </h1>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.65] text-[var(--cs-text-secondary,#334155)] md:text-lg">
                {data.excerpt}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-9 flex flex-wrap gap-3">
                <PrimaryButton href="#overview">Read the story</PrimaryButton>
                <OutlineButton href={data.cta.buttonHref}>
                  {data.cta.buttonText}
                  <ArrowUpRight className="ml-2 inline h-4 w-4" aria-hidden />
                </OutlineButton>
              </div>
            </Reveal>

            {data.highlights.length > 0 ? (
              <Reveal delay={0.12} className="mt-12">
                <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-start">
                  {data.highlights.slice(0, 3).map((item) => (
                    <MetricCell key={item.label} value={item.value} label={item.label} />
                  ))}
                </div>
              </Reveal>
            ) : null}
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-[1.75rem] p-2 shadow-[0_24px_64px_rgba(0,0,0,0.06)] ring-1 ring-[#0a0a1a]/[0.05] [background:#F0F2F6]">
              <div className="overflow-hidden rounded-[calc(1.75rem-0.5rem)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.85)]">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[calc(1.75rem-0.5rem)] bg-[#E8ECF2] md:aspect-[5/4]">
                  <Image
                    src={heroSrc}
                    alt={heroAlt}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 560px"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </PageContainer>
    </header>
  )
}
