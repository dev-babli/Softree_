'use client'

import Link from 'next/link'
import type { CaseStudyCategoryKey } from '@/app/case-studies/categoryConfig'

type CategoryLink = {
  key: CaseStudyCategoryKey
  label: string
  href: string
  count: number
  accentColor: string
}

type Props = {
  categoryLinks: CategoryLink[]
  activeKey?: CaseStudyCategoryKey | 'All'
  onSelect?: (key: CaseStudyCategoryKey | 'All') => void
  accentColor?: string
}

export default function CaseStudiesCategoryRail({
  categoryLinks,
  activeKey = 'All',
  onSelect,
  accentColor = '#FF5812',
}: Props) {
  return (
    <section className="border-b border-[#e6e1f2] bg-[#faf8f3]">
      <div className="mx-auto max-w-[1280px] px-5 py-8 md:px-8">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: accentColor }}
            >
              Browse by technology
            </p>
            <h2 className="mt-1 text-[1.35rem] font-bold tracking-[-0.02em] text-[#171717]">
              Find stories in your stack
            </h2>
          </div>
          <p className="max-w-md text-[14px] leading-[1.55] text-[#4c5366]">
            Jump to a category or filter the full library below.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <FilterChip
            label="All technologies"
            count={categoryLinks.reduce((sum, c) => sum + c.count, 0)}
            active={activeKey === 'All'}
            accentColor={accentColor}
            onClick={() => onSelect?.('All')}
          />
          {categoryLinks.map((cat) => (
            <FilterChip
              key={cat.key}
              label={cat.label}
              count={cat.count}
              active={activeKey === cat.key}
              accentColor={cat.accentColor}
              href={onSelect ? undefined : cat.href}
              onClick={onSelect ? () => onSelect(cat.key) : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function FilterChip({
  label,
  count,
  active,
  accentColor,
  href,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  accentColor: string
  href?: string
  onClick?: () => void
}) {
  const className = `inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 py-2.5 text-[13px] font-semibold transition-all ${
    active
      ? 'border-transparent text-white shadow-md'
      : 'border-[#e6e1f2] bg-white text-[#171717] hover:-translate-y-0.5 hover:shadow-md'
  }`

  const style = active ? { backgroundColor: accentColor } : { borderColor: `${accentColor}33` }

  const content = (
    <>
      <span
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: active ? 'white' : accentColor }}
        aria-hidden
      />
      {label}
      <span className={`text-[11px] font-medium ${active ? 'text-white/80' : 'text-[#6b7694]'}`}>
        ({count})
      </span>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={className} style={style}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={className} style={style}>
      {content}
    </button>
  )
}
