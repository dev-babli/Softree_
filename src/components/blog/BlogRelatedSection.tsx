"use client"

import Image from "next/image"
import Link from "next/link"
import { stockHeroUrl } from "@/lib/case-study-stock-images"
import type { RelatedStudy } from "@/components/case-studies/layouts/types"
import {
  PageContainer,
  Reveal,
  RevealItem,
  RevealStagger,
  SectionTitle,
} from "@/components/case-studies/layouts/variants/manufacturing/shared"

function RelatedPostCard({ post }: { post: RelatedStudy }) {
  const img =
    post.mainImage?.asset?.url ||
    post.mainImageUrl ||
    stockHeroUrl(post.slug.current)
  const eyebrow = post.category || post.industry || "Blog"
  const blurb = post.excerpt || ""

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group flex h-full flex-col gap-5 rounded-[18px] bg-white p-5 transition-transform duration-300 ease-out hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[14px] bg-white border border-[#d7dce9]">
        {img ? (
          <Image
            src={img}
            alt={post.mainImage?.alt || post.title}
            fill
            className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center px-4 text-center text-[#6b7694]">
            {post.title}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 px-1 pb-1">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--softree-accent,#FF7A2F)]">
          {eyebrow}
        </div>
        <h3 className="text-[1.35rem] font-bold leading-[1.15] tracking-[-0.01em] text-[#171717]">
          {post.title}
        </h3>
        {blurb ? (
          <p className="line-clamp-3 text-[15px] leading-[1.55] text-[#4c5366]">{blurb}</p>
        ) : null}
        <div className="mt-auto pt-3">
          <span className="inline-flex items-center rounded-full border border-[#191919] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#191919] transition-colors duration-200 group-hover:bg-[#191919] group-hover:text-white">
            Read article
          </span>
        </div>
      </div>
    </Link>
  )
}

export function BlogRelatedSection({ related }: { related: RelatedStudy[] }) {
  if (!related.length) return null

  return (
    <section id="related" className="scroll-mt-24 bg-[#f8f4ea] py-16 md:py-24">
      <PageContainer>
        <Reveal variant="scale" className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionTitle>More from the blog</SectionTitle>
          <Link
            href="/blog"
            className="hidden items-center rounded-full border border-[#191919] px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#191919] transition-colors duration-200 hover:bg-[#191919] hover:text-white md:inline-flex"
          >
            View all
          </Link>
        </Reveal>

        <RevealStagger className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
          {related.map((post) => (
            <RevealItem key={post._id} variant="scale">
              <RelatedPostCard post={post} />
            </RevealItem>
          ))}
        </RevealStagger>
      </PageContainer>
    </section>
  )
}
