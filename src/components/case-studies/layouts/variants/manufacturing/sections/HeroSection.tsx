"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import type { CaseStudyLayoutData } from "../../../types"
import { PageContainer, Reveal, PrimaryButton, OutlineButton } from "../shared"

function HeroHighlight({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-none tracking-[-0.02em] text-white">
        {value}
      </div>
      <div className="max-w-[18ch] text-[0.9rem] leading-snug text-white/70">{label}</div>
    </div>
  )
}

export function HeroSection({ data }: { data: CaseStudyLayoutData }) {
  const heroSrc =
    data.sectionImages?.hero || data.heroImageUrl || "/Gallery/Prestige Bangalore-1.webp"
  const heroAlt = data.sectionImages?.heroAlt || data.heroImageAlt || data.client

  return (
    <header className="relative overflow-hidden bg-[#0d0a23] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:54px_54px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-[radial-gradient(ellipse_at_bottom,rgba(255,122,47,0.22)_0%,transparent_65%)]"
      />

      <PageContainer className="relative pb-20 pt-32 md:pb-28 md:pt-36 lg:pt-40">
        <Reveal>
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/85">
            Case Study
            {data.industry ? (
              <span className="ml-3 border-l border-white/20 pl-3 font-normal normal-case tracking-normal text-white/60">
                {data.industry}
              </span>
            ) : null}
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-8 max-w-[18ch] text-[clamp(2.25rem,6.5vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.04em]">
            {data.headerTitle}
          </h1>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">
            {data.excerpt}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-4">
            <PrimaryButton href="#overview">Read the story</PrimaryButton>
            <OutlineButton href={data.cta.buttonHref} dark>
              {data.cta.buttonText}
              <ArrowUpRight className="ml-2 inline h-4 w-4" aria-hidden />
            </OutlineButton>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <Reveal delay={0.12}>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[14px] bg-white/5 ring-1 ring-white/10">
              <Image
                src={heroSrc}
                alt={heroAlt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>
          </Reveal>

          <Reveal delay={0.14} className="flex flex-col justify-center">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white/50">
              At a glance
            </p>
            <div className="mt-6 h-px w-full bg-white/15" />
            {data.highlights.length > 0 ? (
              <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {data.highlights.slice(0, 3).map((item) => (
                  <HeroHighlight key={item.label} value={item.value} label={item.label} />
                ))}
              </div>
            ) : null}
            <p className="mt-8 text-sm text-white/50">
              <span className="font-semibold text-white/80">{data.client}</span>
              {data.category ? ` · ${data.category}` : null}
            </p>
          </Reveal>
        </div>
      </PageContainer>
    </header>
  )
}
