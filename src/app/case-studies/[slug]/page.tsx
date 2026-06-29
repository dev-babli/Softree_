import { sanityFetch } from "@/sanity/lib/fetch"
import { readClient } from "@/sanity/lib/readClient"
import {
  allCaseStudySlugsQuery,
  caseStudyBySlugQuery,
  relatedCaseStudiesFallbackQuery,
} from "@/sanity/queries"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { CaseStudyPageRenderer } from "@/components/case-studies/CaseStudyPageRenderer"
import { getNavigationData } from "@/components/sections/navigation-server"
import { fetchDesignTokens } from "@/lib/fetch-design-tokens"
import { buildBlogJsonLdGraph } from "@/lib/structured-data"
import { collectFaqItems } from "@/sanity/lib/aeoCompleteness"
import type { SanityCaseStudyDoc } from "@/components/case-studies/layouts/mapCaseStudyData"
import type { RelatedStudy } from "@/components/case-studies/layouts/types"
import { ogImages, pageOgImage, SITE_URL, twitterImages } from "@/lib/site-metadata"

export const dynamic = "force-dynamic"

type CaseStudyDoc = SanityCaseStudyDoc & {
  storyType?: "standard" | "transformation" | "product-showcase"
  metaTitle?: string
  metaDescription?: string
  ogImage?: { asset?: { url?: string } } | null
}

export async function generateStaticParams() {
  const slugs = await readClient.fetch<string[]>(allCaseStudySlugsQuery)
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

  const ogImage = pageOgImage(`/case-studies/${slug}`, title)

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/case-studies/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_URL}/case-studies/${slug}`,
      images: ogImages(ogImage),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: twitterImages(ogImage),
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
    related =
      (await sanityFetch<RelatedStudy[]>(relatedCaseStudiesFallbackQuery, { slug })) || []
  }

  const [{ blogCategories, caseStudyCategories }, designTokens] = await Promise.all([
    getNavigationData(),
    fetchDesignTokens(),
  ])

  const canonicalUrl = `${SITE_URL}/case-studies/${slug}`
  const ogImage = pageOgImage(`/case-studies/${slug}`, study.metaTitle || study.title).url
  const description =
    study.metaDescription ||
    study.excerpt ||
    `Read how ${study.client || study.title} partnered with Softree Technology.`
  const faqs = collectFaqItems({
    metaTitle: study.metaTitle,
    metaDescription: study.metaDescription,
    faqSchema: (study as { faqSchema?: { question: string; answer: string }[] }).faqSchema,
    composerSections: study.composerSections,
  })

  const jsonLdGraph = buildBlogJsonLdGraph({
    headline: study.metaTitle || study.title,
    description,
    url: canonicalUrl,
    datePublished: study.publishedAt,
    dateModified: study._updatedAt,
    image: ogImage,
    faqs,
    breadcrumb: {
      rootName: "Case Studies",
      rootUrl: `${SITE_URL}/case-studies`,
    },
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />
      <CaseStudyPageRenderer
        study={study}
        related={related}
        slug={slug}
        initialBlogCategories={blogCategories}
        initialCaseStudyCategories={caseStudyCategories}
        designTokens={designTokens}
      />
    </>
  )
}
