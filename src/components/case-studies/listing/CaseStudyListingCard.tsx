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

  // Parse and split comma-separated industries and use cases, showing at most 2 total tags to keep the card compact.
  const rawIndustries = study.industry ? study.industry.split(',').map(s => s.trim()) : []
  const rawUseCases = study.useCase ? study.useCase.split(',').map(s => s.trim()) : []
  const cleanTags = [...rawIndustries, ...rawUseCases].filter(Boolean).slice(0, 2)

  return (
    <Link 
      href={study.href} 
      className="group block h-full"
      style={{ 
        '--hover-accent': accentColor,
        '--hover-shadow': `${accentColor}24`
      } as React.CSSProperties}
    >
      <SpotlightCard
        color={`${accentColor}73`}
        intensity={0.45}
        radius={280}
        className="flex h-full flex-col overflow-hidden rounded-[24px] border border-[#0a0a1a]/5 bg-white shadow-[0_8px_30px_rgba(10,10,26,0.04)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1.5 hover:border-[var(--hover-accent)] hover:shadow-[0_24px_50px_-14px_var(--hover-shadow)]"
      >
        {/* Sweep-Shine Hover Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[24px] z-20">
          <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] transition-transform duration-1000 ease-out group-hover:translate-x-[100%]" />
        </div>

        {/* Partial border corners on hover */}
        <span className="absolute top-[-1px] left-[-1px] w-8 h-8 border-t-2 border-l-2 border-[var(--hover-accent)] rounded-tl-[24px] opacity-0 scale-95 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 z-30 pointer-events-none" />
        <span className="absolute top-[-1px] right-[-1px] w-8 h-8 border-t-2 border-r-2 border-[var(--hover-accent)] rounded-tr-[24px] opacity-0 scale-95 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 z-30 pointer-events-none" />
        <span className="absolute bottom-[-1px] left-[-1px] w-8 h-8 border-b-2 border-l-2 border-[var(--hover-accent)] rounded-bl-[24px] opacity-0 scale-95 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 z-30 pointer-events-none" />
        <span className="absolute bottom-[-1px] right-[-1px] w-8 h-8 border-b-2 border-r-2 border-[var(--hover-accent)] rounded-br-[24px] opacity-0 scale-95 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 z-30 pointer-events-none" />

        {/* Image Container */}
        <div
          className={`relative aspect-[16/10] w-full overflow-hidden border-b border-[#edf0f7] ${
            isPlaceholder ? 'bg-[#efeae0]' : 'bg-white'
          }`}
        >
          {study.image && !isPlaceholder ? (
            <Image
              src={study.image}
              alt={study.imageAlt}
              fill
              unoptimized
              sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
              className="relative z-10 transition-transform duration-700 ease-out group-hover:scale-105 object-cover"
            />
          ) : study.image ? (
            <div className="absolute inset-0 flex items-center justify-center bg-[#f8f9fc]">
              <Image
                src={study.image}
                alt={study.imageAlt}
                width={120}
                height={120}
                unoptimized
                sizes="120px"
                className="h-[72px] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm font-semibold text-[#50576b] bg-[#f8f9fc]">
              {study.title}
            </div>
          )}

          {/* Vignette Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-75" />

          {/* Category Tag Overlay */}
          <div className="absolute left-4 top-4">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md shadow-sm transition-transform duration-300 group-hover:scale-[1.02]">
              {study.category}
            </span>
          </div>

          {/* Action Badge Overlay */}
          <div className="absolute bottom-4 right-4">
            <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-white/90 backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:text-[#181818] group-hover:border-white">
              <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              Case study
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex flex-1 flex-col p-5 md:p-6">
          {cleanTags.length > 0 && (
            <div className="mb-3 flex flex-wrap items-center gap-1.5">
              {cleanTags.map((tag) => (
                <span key={tag} className="rounded-full bg-slate-50 border border-slate-200/50 px-2.5 py-0.5 text-[10px] font-semibold text-slate-500">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h3 className="mb-2 text-xl font-bold leading-snug tracking-tight text-[#171717] line-clamp-2 transition-colors duration-300 group-hover:text-[var(--hover-accent)]">
            {study.title}
          </h3>

          <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-[#4c5366]">
            {study.description}
          </p>

          {/* Metrics */}
          {metrics.length > 0 && (
            <div className="mb-5 flex flex-wrap gap-2">
              {metrics.map((metric) => (
                <div
                  key={`${metric.label}-${metric.value}`}
                  className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 border"
                  style={{
                    backgroundColor: `${accentColor}0a`,
                    borderColor: `${accentColor}18`,
                  }}
                >
                  <TrendingUp className="h-3.5 w-3.5" style={{ color: accentColor }} aria-hidden />
                  <span className="text-[11px] font-black" style={{ color: accentColor }}>
                    {metric.value}
                  </span>
                  <span className="text-[10px] font-medium text-[#4c5366]">{metric.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between border-t border-[#0a0a1a]/5 pt-4">
            <span className="text-xs font-medium text-[#8c94a5]">Softree Technology</span>
            <span
              className="inline-flex items-center gap-1 text-xs font-bold transition-colors duration-300"
              style={{ color: accentColor }}
            >
              <span>View story</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </span>
          </div>
        </div>
      </SpotlightCard>
    </Link>
  )
}
