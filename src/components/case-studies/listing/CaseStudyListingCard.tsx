'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, TrendingUp } from 'lucide-react'
import { SpotlightCard } from '@/components/qc/shared/SpotlightCard'
import type { CaseStudyListingItem } from '@/app/case-studies/types'

type Props = {
  study: CaseStudyListingItem
  accentColor?: string
}

export default function CaseStudyListingCard({ study, accentColor = '#FF5812' }: Props) {
  const isPlaceholder = !study.image || study.image.endsWith('_chat.svg')
  const metrics = (study.keyResults || []).slice(0, 2)

  return (
    <Link href={study.href} className="group block h-full">
      <SpotlightCard
        color={`${accentColor}73`}
        intensity={0.45}
        radius={280}
        className="flex h-full flex-col overflow-hidden rounded-[18px] border border-[#0a0a1a]/5 bg-white shadow-[0_8px_28px_-12px_rgba(10,10,26,0.12)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-[0_24px_50px_-14px_rgba(255,88,18,0.18)]"
      >
        <div
          className={`relative aspect-[16/9] w-full overflow-hidden ${
            isPlaceholder ? 'bg-[#efeae0]' : 'bg-[#fcfbf9]'
          }`}
        >
          {study.image && !isPlaceholder ? (
            <Image
              src={study.image}
              alt={study.imageAlt}
              fill
              unoptimized
              sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
              className={`transition-transform duration-700 group-hover:scale-[1.03] ${
                study.imageFit === 'contain' ? 'object-contain' : 'object-cover'
              }`}
            />
          ) : study.image ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={study.image}
                alt={study.imageAlt}
                width={120}
                height={120}
                unoptimized
                sizes="120px"
                className="h-[72px] w-auto object-contain"
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm font-medium text-[#6b7694]">
              {study.title}
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />

          <div className="absolute left-4 top-4">
            <span className="inline-flex items-center rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md">
              {study.category}
            </span>
          </div>

          <div className="absolute bottom-4 right-4">
            <span className="flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-medium text-white/85 backdrop-blur-md">
              <ArrowUpRight className="h-3 w-3" aria-hidden />
              Case study
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5 md:p-6">
          {(study.industry || study.useCase) && (
            <div className="mb-3 flex flex-wrap items-center gap-1.5">
              {study.industry ? (
                <span className="rounded-md bg-[#f4f6fb] px-2 py-0.5 text-[10px] font-medium text-[#0a0a1a]/50">
                  {study.industry}
                </span>
              ) : null}
              {study.useCase ? (
                <span className="rounded-md bg-[#f4f6fb] px-2 py-0.5 text-[10px] font-medium text-[#0a0a1a]/50">
                  {study.useCase}
                </span>
              ) : null}
            </div>
          )}

          <h3 className="mb-2 text-[1.25rem] font-bold leading-snug tracking-[-0.01em] text-[#171717] transition-colors duration-300 group-hover:text-[var(--softree-accent,#FF5812)]">
            {study.title}
          </h3>

          <p className="mb-4 line-clamp-3 flex-1 text-[14px] leading-relaxed text-[#4c5366]">
            {study.description}
          </p>

          {metrics.length > 0 ? (
            <div className="mb-4 flex flex-wrap gap-2">
              {metrics.map((metric) => (
                <div
                  key={`${metric.label}-${metric.value}`}
                  className="flex items-center gap-1.5 rounded-lg bg-[#fff4ee] px-2.5 py-1.5"
                >
                  <TrendingUp className="h-3 w-3" style={{ color: accentColor }} aria-hidden />
                  <span className="text-[11px] font-black" style={{ color: accentColor }}>
                    {metric.value}
                  </span>
                  <span className="text-[10px] text-[#0a0a1a]/45">{metric.label}</span>
                </div>
              ))}
            </div>
          ) : null}

          <div className="mt-auto flex items-center justify-between border-t border-[#0a0a1a]/5 pt-4">
            <span className="text-xs text-[#0a0a1a]/45">Softree Technology</span>
            <span
              className="inline-flex items-center gap-1 text-xs font-semibold transition-transform duration-300 group-hover:translate-x-0.5"
              style={{ color: accentColor }}
            >
              View story
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </span>
          </div>
        </div>
      </SpotlightCard>
    </Link>
  )
}
