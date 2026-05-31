"use client"

import Image from "next/image"
import Link from "next/link"
import { PortableText } from "@portabletext/react"

import NavigationClient from "@/components/sections/navigation-client"
import Footer from "@/components/sections/footer"
import { sharedPortableTextTypes } from "@/components/portable-text/contentBlockTypes"
import type { SanityCaseStudyDoc } from "@/components/case-studies/layouts/mapCaseStudyData"
import { CATEGORY_LABELS } from "@/lib/case-study-layouts"

type PortableTextLike = {
  _type?: string
  style?: string
  children?: Array<{ text?: string }>
  listItem?: string
}

function categoryLabel(value?: string): string {
  if (!value) return ""
  return CATEGORY_LABELS[value] || value
}

function asPortableTextArray(value: unknown): PortableTextLike[] {
  if (Array.isArray(value)) return value as PortableTextLike[]
  if (typeof value === "string" && value.trim()) {
    return [{ _type: "block", style: "normal", children: [{ text: value }] }]
  }
  return []
}

function buildArticleBody(study: SanityCaseStudyDoc & Record<string, unknown>): PortableTextLike[] {
  const articleBody: PortableTextLike[] = []
  const pushHeading = (text: string) =>
    articleBody.push({ _type: "block", style: "h2", children: [{ text }] })

  const challenge = asPortableTextArray(study.challengeContent ?? study.challenge)
  const approach = asPortableTextArray(study.approachContent ?? study.approach)
  const outcome = asPortableTextArray(study.outcomeContent ?? study.outcome)
  const extra = asPortableTextArray(study.body)

  if (challenge.length || study.challengeSummary) {
    pushHeading("The Challenge")
    articleBody.push(...challenge)
  }
  if (approach.length || study.approachSummary) {
    pushHeading("The Solution")
    articleBody.push(...approach)
  }
  if (outcome.length || study.outcomeSummary) {
    pushHeading("The Results")
    articleBody.push(...outcome)
  }
  articleBody.push(...extra)
  return articleBody
}

type Props = {
  study: SanityCaseStudyDoc
}

export function CaseStudyClassicPreview({ study }: Props) {
  const clientName = study.client || study.title
  const headerTitle = study.headerTitle || ""
  const heroImageUrl = study.mainImage?.asset?.url || study.mainImageUrl
  const highlights = study.highlights?.slice(0, 3) || []
  const articleBody = buildArticleBody(study)

  return (
    <div className="min-h-screen bg-white text-[#0d0a23]">
      <NavigationClient />

      <section className="relative overflow-hidden bg-[#0d0a23] text-white">
        <div className="relative mx-auto w-full max-w-[1240px] px-5 pb-20 pt-32 md:px-8 md:pb-28 md:pt-36">
          <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[0.95] tracking-[-0.045em]">
            {clientName}
          </h1>
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[14px] bg-white/5 ring-1 ring-white/10">
              {heroImageUrl ? (
                <Image src={heroImageUrl} alt={study.mainImage?.alt || clientName} fill unoptimized className="object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white/50">No hero image</div>
              )}
            </div>
            <div className="flex flex-col justify-center">
              {headerTitle ? (
                <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold leading-[1.18]">{headerTitle}</h2>
              ) : null}
              {highlights.length > 0 ? (
                <div className="mt-8 grid grid-cols-3 gap-4">
                  {highlights.map((h, i) => (
                    <div key={i}>
                      <div className="text-2xl font-bold">{h.value}</div>
                      <div className="text-sm text-white/75">{h.label}</div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1240px] px-5 py-16 md:px-8">
          {study.excerpt ? (
            <p className="mb-10 text-xl font-medium leading-relaxed text-[#0d0a23]">{study.excerpt}</p>
          ) : null}
          {articleBody.length > 0 ? (
            <article className="prose prose-lg max-w-none">
              <PortableText
                value={articleBody as never}
                components={{
                  block: {
                    h2: ({ children }) => (
                      <h2 className="mt-12 mb-4 text-3xl font-bold text-[#0d0a23]">{children}</h2>
                    ),
                    normal: ({ children }) => (
                      <p className="mb-6 text-[1.05rem] leading-relaxed text-[#37354a]">{children}</p>
                    ),
                  },
                  types: sharedPortableTextTypes,
                }}
              />
            </article>
          ) : (
            <p className="text-[#6b7694]">Add Challenge, Approach, and Outcome content to see the story here.</p>
          )}
          <div className="mt-12">
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-gradient-to-r from-[#4FC3F7] via-[#2196F3] to-[#5B4FE9] px-10 py-3 text-sm font-semibold uppercase tracking-wider text-white"
            >
              Talk to our team
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-[#e6e1f2] bg-[#f8f4ea] py-8">
        <div className="mx-auto max-w-[1240px] px-5 text-sm text-[#6b7694] md:px-8">
          Industry: {study.industry || categoryLabel(study.category) || "—"} · Location: {study.location || "—"}
        </div>
      </section>

      <Footer />
    </div>
  )
}
