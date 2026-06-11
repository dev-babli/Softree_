"use client"

import Image from "next/image"
import type { CaseStudyLayoutData } from "../../../types"
import {
  PageContainer,
  RevealItem,
  RevealStagger,
  SectionHeaderReveal,
  SectionLabel,
  SectionTitle,
} from "../shared"

export function DeliverablesSection({ data }: { data: CaseStudyLayoutData }) {
  if (data.deliverables.length === 0) return null

  return (
    <section id="deliverables" className="scroll-mt-24 bg-[var(--softree-bg-light,#fafaf9)] py-16 md:py-24">
      <PageContainer>
        <SectionHeaderReveal
          className="max-w-2xl"
          label={<SectionLabel>What we built</SectionLabel>}
          title={<SectionTitle>{data.deliverablesHeading}</SectionTitle>}
        />

        <RevealStagger className="mt-12 grid gap-6 sm:grid-cols-2">
          {data.deliverables.map((item, i) => (
            <RevealItem key={item.title} variant="scale">
              <article className="h-full overflow-hidden rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white shadow-[0_4px_12px_rgba(15,23,42,0.04)] transition-transform duration-300 hover:-translate-y-1">
                {item.imageUrl ? (
                  <div className="relative aspect-[16/10] bg-[#efeae0]">
                    <Image
                      src={item.imageUrl}
                      alt={item.imageAlt || item.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 45vw, 100vw"
                    />
                  </div>
                ) : null}
                <div className="p-6">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--softree-accent,#FF7A2F)]">
                    Deliverable {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-xl font-bold tracking-tight text-[var(--cs-text-primary,#0f172a)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--cs-text-muted,#64748b)]">
                    {item.description}
                  </p>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </PageContainer>
    </section>
  )
}
