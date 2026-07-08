"use client"

import Link from "next/link"
import { useReducedMotion, useScroll, useTransform, motion } from "framer-motion"

export function CaseStudyScrollProgress() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  if (reduce) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-[var(--softree-accent,#FF7A2F)]"
      style={{ scaleX }}
    />
  )
}

export function CaseStudyBreadcrumb({
  categoryLabel,
  categoryHref,
  client,
}: {
  categoryLabel?: string
  categoryHref?: string
  client: string
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--cs-text-muted,#64748b)]">
      <Link href="/case-studies" className="transition-colors hover:text-[var(--softree-accent,#FF7A2F)]">
        Case studies
      </Link>
      <span aria-hidden className="text-[var(--cs-text-muted,#94a3b8)]">
        /
      </span>
      {categoryLabel && categoryHref ? (
        <>
          <Link href={categoryHref} className="transition-colors hover:text-[var(--softree-accent,#FF7A2F)]">
            {categoryLabel}
          </Link>
          <span aria-hidden className="text-[var(--cs-text-muted,#94a3b8)]">
            /
          </span>
        </>
      ) : null}
      <span className="text-[var(--cs-text-secondary,#334155)]">{client}</span>
    </nav>
  )
}
