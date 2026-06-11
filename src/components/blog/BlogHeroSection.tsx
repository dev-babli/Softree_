"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock3 } from "lucide-react"
import { stockHeroUrl } from "@/lib/case-study-stock-images"
import type { CaseStudyLayoutData } from "@/components/case-studies/layouts/types"
import {
  HeroReveal,
  PageContainer,
  ParallaxLayer,
  PrimaryButton,
  RevealItem,
  RevealStagger,
} from "@/components/case-studies/layouts/variants/manufacturing/shared"

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

export function BlogHeroSection({
  data,
  authorName,
  publishedLabel,
  readTime,
}: {
  data: CaseStudyLayoutData
  authorName: string
  publishedLabel: string
  readTime: string
}) {
  const heroSrc = data.sectionImages?.hero || data.heroImageUrl || stockHeroUrl(data.slug)
  const heroAlt = data.sectionImages?.heroAlt || data.heroImageAlt || data.title

  return (
    <header className="relative overflow-hidden bg-[#F7F6F3] text-[#181818]">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[20%] top-0 h-[70%] w-[55%] rounded-full bg-[radial-gradient(circle,rgba(255,88,18,0.08)_0%,transparent_68%)]"
      />

      <PageContainer className="relative pb-16 pt-28 md:pb-20 md:pt-32 lg:pt-36">
        <HeroReveal delay={0}>
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--cs-text-muted,#64748b)] transition-colors hover:text-[#181818]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to Blog
          </Link>
        </HeroReveal>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-center lg:gap-14">
          <div>
            <HeroReveal delay={0.05}>
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--cs-text-muted,#64748b)]">
                {data.heroEyebrow || "Blog"}
              </span>
            </HeroReveal>

            <HeroReveal delay={0.12} variant="scale" distance={28}>
              <h1 className="mt-4 max-w-[18ch] text-[clamp(2.25rem,5.5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[#181818]">
                {data.title}
              </h1>
            </HeroReveal>

            <HeroReveal delay={0.18} variant="up" distance={24}>
              <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.65] text-[var(--cs-text-secondary,#334155)] md:text-lg">
                {data.excerpt}
              </p>
            </HeroReveal>

            <HeroReveal delay={0.22}>
              <div className="mt-7 flex flex-wrap items-center gap-5 text-sm text-[var(--cs-text-muted,#64748b)]">
                <span className="font-semibold text-[#181818]">{authorName}</span>
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" aria-hidden />
                  {publishedLabel}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="h-4 w-4" aria-hidden />
                  {readTime}
                </span>
              </div>
            </HeroReveal>

            <HeroReveal delay={0.28}>
              <div className="mt-9 flex flex-wrap gap-3">
                <PrimaryButton href="#content">Read article</PrimaryButton>
                <a
                  href={data.cta.buttonHref}
                  className="inline-flex items-center justify-center rounded-full border border-[#181818]/15 bg-white px-8 py-3.5 text-sm font-semibold text-[#181818] transition-transform duration-200 hover:bg-[#181818] hover:text-white active:scale-[0.97]"
                >
                  {data.cta.buttonText}
                  <ArrowUpRight className="ml-2 inline h-4 w-4" aria-hidden />
                </a>
              </div>
            </HeroReveal>

            {data.highlights.length > 0 ? (
              <RevealStagger className="mt-12 flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-start">
                {data.highlights.slice(0, 3).map((item) => (
                  <RevealItem key={item.label} variant="scale">
                    <MetricCell value={item.value} label={item.label} />
                  </RevealItem>
                ))}
              </RevealStagger>
            ) : null}
          </div>

          <HeroReveal delay={0.14} variant="scale" distance={40}>
            <ParallaxLayer strength={28}>
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
            </ParallaxLayer>
          </HeroReveal>
        </div>
      </PageContainer>
    </header>
  )
}
