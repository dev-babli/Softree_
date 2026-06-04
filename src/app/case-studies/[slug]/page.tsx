import { client } from "@/sanity/client"
import {
  caseStudyBySlugQuery,
  relatedCaseStudiesFallbackQuery,
  allCaseStudySlugsQuery,
} from "@/sanity/queries"
import { isPreviewMode, sanityFetch } from "@/sanity/lib/fetch"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { CaseStudyPageRenderer } from "@/components/case-studies/CaseStudyPageRenderer"
import type { SanityCaseStudyDoc } from "@/components/case-studies/layouts/mapCaseStudyData"
import type { RelatedStudy } from "@/components/case-studies/layouts/types"

export const dynamic = "force-dynamic"

type CaseStudyDoc = SanityCaseStudyDoc & {
  storyType?: "standard" | "transformation" | "product-showcase"
  metaTitle?: string
  metaDescription?: string
  ogImage?: { asset?: { url?: string } } | null
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(allCaseStudySlugsQuery)
  return (slugs || []).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const study = await sanityFetch<CaseStudyDoc | null>(caseStudyBySlugQuery, { slug })

  if (!study) return { title: "Case Study Not Found" }

  const title = study.metaTitle || `${study.title} | Customer Story`
  const description =
    study.metaDescription ||
    study.excerpt ||
    `Read how ${study.client || study.title} partnered with Softree Technology.`

  const ogImage = study.ogImage?.asset?.url || study.mainImage?.asset?.url || study.mainImageUrl

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.softreetechnology.com/case-studies/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://www.softreetechnology.com/case-studies/${slug}`,
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630 }]
        : [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
  }
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = await sanityFetch<CaseStudyDoc | null>(caseStudyBySlugQuery, { slug })
  if (!study) notFound()

  let related: RelatedStudy[] = study.relatedCaseStudies || []
  if (!related || related.length === 0) {
    related = (await client.fetch<RelatedStudy[]>(relatedCaseStudiesFallbackQuery, { slug })) || []
  }

  return <CaseStudyPageRenderer study={study} related={related} slug={slug} />
}
