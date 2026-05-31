"use client"

import Image from "next/image"
import Link from "next/link"
import type { RelatedStudy } from "../../../types"
import { PageContainer, Reveal, SectionTitle } from "../shared"

function RelatedCard({ study }: { study: RelatedStudy }) {
  const img = study.mainImage?.asset?.url || study.mainImageUrl || "/Gallery/Prestige Bangalore-4.webp"
  const eyebrow = study.industry || study.category || "Customer Story"
  const blurb = study.excerpt || ""
  const display = study.client || study.title

  return (
    <Link
      href={`/case-studies/${study.slug.current}`}
      className="group flex h-full flex-col gap-5 rounded-[18px] bg-white p-5 transition-transform duration-200 ease-out hover:-translate-y-[3px]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[14px] bg-[#efeae0]">
        {img ? (
          <Image
            src={img}
            alt={study.mainImage?.alt || display}
            fill
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center px-4 text-center text-[#6b7694]">
            {display}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 px-1 pb-1">
        <div className="text-[13px] font-semibold text-[#1852ff]">{eyebrow}</div>
        <h3 className="text-[1.55rem] font-bold leading-[1.15] tracking-[-0.01em] text-[#171717]">
          {display}
        </h3>
        {blurb ? (
          <p className="line-clamp-3 text-[15px] leading-[1.55] text-[#4c5366]">{blurb}</p>
        ) : null}
        <div className="mt-auto pt-3">
          <span className="inline-flex items-center rounded-full border border-[#191919] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#191919] transition-colors duration-200 group-hover:bg-[#191919] group-hover:text-white">
            read case study
          </span>
        </div>
      </div>
    </Link>
  )
}

export function RelatedSection({ related }: { related: RelatedStudy[] }) {
  if (!related.length) return null

  return (
    <section id="related" className="scroll-mt-24 bg-[#f8f4ea] py-16 md:py-24">
      <PageContainer>
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionTitle>More Customer Stories</SectionTitle>
          <Link
            href="/case-studies"
            className="hidden md:inline-flex items-center rounded-full border border-[#191919] px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#191919] transition-colors duration-200 hover:bg-[#191919] hover:text-white"
          >
            View all
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
          {related.map((study, i) => (
            <Reveal key={study._id} delay={i * 0.05}>
              <RelatedCard study={study} />
            </Reveal>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
