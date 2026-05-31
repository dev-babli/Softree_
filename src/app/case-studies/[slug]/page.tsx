import { client } from "@/sanity/client"
import {
  caseStudyBySlugQuery,
  relatedCaseStudiesFallbackQuery,
  allCaseStudySlugsQuery,
} from "@/sanity/queries"
import { isPreviewMode, sanityFetch } from "@/sanity/lib/fetch"
import { CLASSIC_LAYOUT_VALUE } from "@/sanity/lib/layoutPreview"
import { PortableText, type PortableTextComponents } from "@portabletext/react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import NavigationClient from "@/components/sections/navigation-client"
import Footer from "@/components/sections/footer"
import { sharedPortableTextTypes } from "@/components/portable-text/contentBlockTypes"
import CaseStudyDownloadButton from "@/components/case-studies/CaseStudyDownloadButton"
import {
  CaseStudyPremiumLayout,
  isPremiumLayout,
  type CaseStudyDetailLayout,
} from "@/components/case-studies/layouts/CaseStudyPremiumLayout"
import { buildCaseStudyJsonLd } from "@/lib/structured-data"

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

type PortableTextLike = {
  _type?: string
  style?: string
  children?: Array<{ text?: string }>
  _key?: string
  listItem?: string
  level?: number
}

function asPlainText(value: unknown): string {
  if (typeof value === "string") return value
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string") return item
        if (item && typeof item === "object" && "children" in item) {
          const block = item as PortableTextLike
          return (block.children || []).map((c) => c?.text || "").join(" ")
        }
        return ""
      })
      .join(" ")
      .replace(/\s+/g, " ")
      .trim()
  }
  if (value && typeof value === "object" && "children" in value) {
    const block = value as PortableTextLike
    return (block.children || []).map((c) => c?.text || "").join(" ").replace(/\s+/g, " ").trim()
  }
  return ""
}

function asPortableTextArray(value: unknown): PortableTextLike[] {
  if (Array.isArray(value)) return value as PortableTextLike[]
  if (value && typeof value === "object") return [value as PortableTextLike]
  return []
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80)
}

function getHeadingText(block: PortableTextLike): string {
  return (block.children || []).map((c) => c?.text || "").join(" ").trim()
}

const CATEGORY_LABELS: Record<string, string> = {
  ai: "AI & Machine Learning",
  mobile: "Mobile Development",
  "power-platform": "Power Platform",
  sharepoint: "SharePoint",
  web: "Web Development",
  "data-analytics": "Data Analytics",
}

function categoryLabel(value?: string): string {
  if (!value) return ""
  return CATEGORY_LABELS[value] || value
}

export const dynamic = "force-dynamic"

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

type SanityImage = {
  asset?: { url?: string; metadata?: { dimensions?: { width: number; height: number } } } | null
  alt?: string
  caption?: string
} | null

type Highlight = { value: string; label: string }

type Metric = { label?: string; value?: string; description?: string }

type RelatedStudy = {
  _id: string
  title: string
  slug: { current: string }
  category?: string
  industry?: string
  excerpt?: string
  client?: string
  mainImage?: SanityImage
  mainImageUrl?: string
}

type Testimonial = {
  quote?: string
  name?: string
  role?: string
  avatar?: { asset?: { url?: string } } | null
} | null

type CaseStudyDoc = {
  _id: string
  _updatedAt?: string
  title: string
  slug: { current: string }
  headerTitle?: string
  excerpt?: string
  category?: string
  industry?: string
  client?: string
  location?: string
  employees?: string
  scaleOfOperation?: string
  projectDuration?: string
  teamSize?: string
  accentColor?: string
  detailLayout?: CaseStudyDetailLayout | string
  projectType?: string
  region?: string
  endUsers?: string
  videoUrl?: string
  challengeCards?: Array<{ title: string; description: string }>
  solutionArchitecture?: Array<{ title: string; description: string }>
  deliverables?: Array<{ title: string; description: string }>
  beforeAfter?: Array<{ metric: string; before: string; after: string }>
  ctaHeadline?: string
  ctaSubtext?: string
  ctaButtonText?: string
  mainImage?: SanityImage
  mainImageUrl?: string
  pdfUrl?: string
  liveUrl?: string
  technologies?: string[]
  highlights?: Highlight[]
  pullQuoteImage?: SanityImage
  challengeSummary?: string
  challenge?: PortableTextLike[] | string
  challengeContent?: PortableTextLike[]
  approachSummary?: string
  approach?: PortableTextLike[] | string
  approachContent?: PortableTextLike[]
  outcomeSummary?: string
  outcome?: PortableTextLike[] | string
  outcomeContent?: PortableTextLike[]
  // Legacy fields produced by `scripts/seed-sanity-content.ts`
  solution?: PortableTextLike[] | string
  result?: string
  rawResults?: string[] | Metric[]
  body?: PortableTextLike[]
  metrics?: Metric[]
  testimonial?: Testimonial
  gallery?: Array<{ asset?: { url?: string }; alt?: string; caption?: string }>
  galleryUrls?: Array<{ url?: string; alt?: string; caption?: string }>
  relatedCaseStudies?: RelatedStudy[]
  metaTitle?: string
  metaDescription?: string
  ogImage?: SanityImage
  publishedAt?: string
}

/* ------------------------------------------------------------------ */
/* Static params + metadata                                           */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/* Portable Text components                                           */
/* ------------------------------------------------------------------ */

const createPortableTextComponents = (
  registerHeading: (id: string, text: string) => void
): PortableTextComponents => ({
  block: {
    h1: ({ children }) => (
      <h1 className="mt-12 mb-6 text-[2rem] md:text-[2.4rem] font-bold tracking-[-0.03em] text-[#0d0a23]">
        {children}
      </h1>
    ),
    h2: ({ children, value }) => {
      const text = getHeadingText(value as PortableTextLike)
      const id = slugify(text || "section")
      registerHeading(id, text)
      return (
        <h2
          id={id}
          className="scroll-mt-32 mt-14 mb-5 text-[1.75rem] md:text-[2.1rem] font-bold tracking-[-0.02em] text-[#0d0a23]"
        >
          {children}
        </h2>
      )
    },
    h3: ({ children }) => (
      <h3 className="mt-10 mb-3 text-[1.25rem] md:text-[1.45rem] font-bold tracking-tight text-[#0d0a23]">
        {children}
      </h3>
    ),
    h4: ({ children }) => <h4 className="mt-8 mb-2 text-lg font-bold text-[#0d0a23]">{children}</h4>,
    normal: ({ children }) => (
      <p className="mb-6 text-[1.02rem] md:text-[1.06rem] leading-[1.75] text-[#37354a]">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 rounded-[14px] border border-[#e6e1f2] bg-[#f3eefe] px-6 py-5 text-[1.05rem] leading-[1.7] text-[#2a1f82]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-7 list-disc space-y-2.5 pl-6 text-[1.02rem] leading-[1.75] text-[#37354a] marker:text-[#5a17ee]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-7 list-decimal space-y-2.5 pl-6 text-[1.02rem] leading-[1.75] text-[#37354a] marker:text-[#5a17ee]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-[1.75]">{children}</li>,
    number: ({ children }) => <li className="leading-[1.75]">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-[#0d0a23]">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline underline-offset-2">{children}</span>,
    code: ({ children }) => (
      <code className="rounded bg-[#f3f4f8] px-1.5 py-0.5 font-mono text-[0.92em] text-[#0d0a23]">{children}</code>
    ),
    "strike-through": ({ children }) => <s className="text-[#6b7694]">{children}</s>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="font-medium text-[#5a17ee] underline underline-offset-4 decoration-[#5a17ee]/40 transition-colors hover:decoration-[#5a17ee]"
      >
        {children}
      </a>
    ),
  },
  types: {
    ...sharedPortableTextTypes,
    image: ({ value }) => {
      const url = value?.asset?.url
      if (!url) return null
      return (
        <figure className="my-10 overflow-hidden rounded-[14px] border border-[#e6e1f2] bg-white shadow-sm">
          <div className="relative w-full aspect-[16/9]">
            <Image
              src={url}
              alt={value.alt || "Case study illustration"}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 760px"
            />
          </div>
          {value.caption ? (
            <figcaption className="px-4 py-3 text-center text-xs font-medium text-[#6b7694]">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      )
    },
  },
})

/* ------------------------------------------------------------------ */
/* Subcomponents                                                       */
/* ------------------------------------------------------------------ */

function HeroHighlight({ value, label }: Highlight) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="text-[clamp(2rem,3vw,2.6rem)] font-bold leading-none tracking-[-0.02em] text-white">
        {value}
      </div>
      <div className="max-w-[16ch] text-[0.95rem] leading-[1.4] text-white/75">{label}</div>
    </div>
  )
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[#6b7694]">{label}</div>
      <div className="text-[1rem] font-medium leading-[1.4] text-[#0d0a23]">{value || "—"}</div>
    </div>
  )
}

function RelatedCard({ study }: { study: RelatedStudy }) {
  const img = study.mainImage?.asset?.url || study.mainImageUrl
  const eyebrow = study.industry || categoryLabel(study.category) || "Customer Story"
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
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center px-4 text-center text-[#6b7694]">
            {display}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 px-1 pb-1">
        <div className="text-[13px] font-semibold text-[#1852ff]">{eyebrow}</div>
        <h3 className="text-[1.55rem] font-bold leading-[1.15] tracking-[-0.01em] text-[#171717]">{display}</h3>
        {blurb ? <p className="line-clamp-3 text-[15px] leading-[1.55] text-[#4c5366]">{blurb}</p> : null}
        <div className="mt-auto pt-3">
          <span className="inline-flex items-center rounded-full border border-[#191919] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#191919] transition-colors duration-200 group-hover:bg-[#191919] group-hover:text-white">
            read case study
          </span>
        </div>
      </div>
    </Link>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default async function CaseStudyDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ layout?: string }>
}) {
  const { slug } = await params
  const { layout: layoutOverride } = await searchParams
  const previewActive = await isPreviewMode()
  const study = await sanityFetch<CaseStudyDoc | null>(caseStudyBySlugQuery, { slug })
  if (!study) notFound()

  let effectiveLayout = study.detailLayout
  const allowLayoutOverride = previewActive || process.env.NODE_ENV === "development"
  if (allowLayoutOverride && layoutOverride) {
    if (layoutOverride === CLASSIC_LAYOUT_VALUE) {
      effectiveLayout = undefined
    } else if (isPremiumLayout(layoutOverride)) {
      effectiveLayout = layoutOverride
    }
  }

  // Pull related: prefer manually-curated, fall back to latest 3 others.
  let related: RelatedStudy[] = study.relatedCaseStudies || []
  if (!related || related.length === 0) {
    related = (await client.fetch<RelatedStudy[]>(relatedCaseStudiesFallbackQuery, { slug })) || []
  }

  /* ----- Build the article body --------------------------------
   * Schema gives us multiple Portable Text fields:
   *   challengeSummary (text), challenge (PT)
   *   approachSummary (text), approach (PT)
   *   outcomeSummary (text), outcome (PT)
   *   body (PT, additional content)
   *
   * Legacy seed data stores `challenge`, `solution`, `result` as plain strings
   * (not PT) — we coerce them into normal blocks below.
   *
   * We assemble them in order with H2 separators so the TOC works,
   * mirroring the Rasa "The Challenge / The Solution / The Results" structure.
   */
  const toPT = (input: unknown): PortableTextLike[] => {
    if (typeof input === "string" && input.trim()) {
      return [{ _type: "block", style: "normal", children: [{ text: input }] }]
    }
    return asPortableTextArray(input)
  }

  const challenge = toPT(study.challengeContent ?? study.challenge)
  const approach = toPT(study.approachContent ?? study.approach ?? study.solution)
  const outcomeSource = study.outcomeContent ?? study.outcome ?? study.result
  const outcome = toPT(outcomeSource)
  const extra = asPortableTextArray(study.body)

  const articleBody: PortableTextLike[] = []
  const pushHeading = (key: string, text: string) =>
    articleBody.push({
      _type: "block",
      _key: key,
      style: "h2",
      children: [{ text }],
    })
  const pushParagraph = (key: string, text: string) =>
    articleBody.push({
      _type: "block",
      _key: key,
      style: "normal",
      children: [{ text }],
    })

  const hasChallenge = challenge.length > 0 || !!study.challengeSummary
  const hasSolution = approach.length > 0 || !!study.approachSummary
  const hasResults = outcome.length > 0 || !!study.outcomeSummary

  // Legacy seed: `results` was a string[] (not metric objects). If we have
  // those AND no outcome/results section yet, show them as a bulleted list.
  const legacyResultStrings: string[] = Array.isArray(study.rawResults)
    ? (study.rawResults as Array<string | Metric>).filter(
      (r): r is string => typeof r === "string"
    )
    : []

  if (hasChallenge || hasSolution || hasResults || legacyResultStrings.length > 0) {
    if (hasChallenge) {
      pushHeading("h2-challenge", "The Challenge")
      if (study.challengeSummary) pushParagraph("p-challenge-summary", study.challengeSummary)
      articleBody.push(...challenge)
    }
    if (hasSolution) {
      pushHeading("h2-solution", "The Solution")
      if (study.approachSummary) pushParagraph("p-approach-summary", study.approachSummary)
      articleBody.push(...approach)
    }
    if (hasResults || legacyResultStrings.length > 0) {
      pushHeading("h2-results", "The Results")
      if (study.outcomeSummary) pushParagraph("p-outcome-summary", study.outcomeSummary)
      articleBody.push(...outcome)
      if (!hasResults && legacyResultStrings.length > 0) {
        legacyResultStrings.forEach((line, i) => {
          articleBody.push({
            _type: "block",
            _key: `legacy-result-${i}`,
            style: "normal",
            listItem: "bullet",
            level: 1,
            children: [{ text: line }],
          })
        })
      }
    }
    if (extra.length > 0) {
      articleBody.push(...extra)
    }
  } else if (extra.length > 0) {
    articleBody.push(...extra)
  }

  // Build TOC from H2 headings in articleBody
  const headings: { id: string; text: string }[] = []
  articleBody.forEach((block) => {
    if (block && block._type === "block" && block.style === "h2") {
      const text = getHeadingText(block)
      if (text) {
        const id = slugify(text)
        if (!headings.find((h) => h.id === id)) headings.push({ id, text })
      }
    }
  })
  const components = createPortableTextComponents(() => { })

  // Hero stats — prefer `highlights[]`, fall back to first 3 `metrics[]`,
  // then to legacy seeded `results: string[]`.
  let heroHighlights: Highlight[] = Array.isArray(study.highlights) ? study.highlights : []
  if (heroHighlights.length === 0 && Array.isArray(study.metrics)) {
    heroHighlights = study.metrics
      .slice(0, 3)
      .map((m) => ({ value: m.value || "", label: m.label || m.description || "" }))
      .filter((h) => h.value)
  }
  if (heroHighlights.length === 0 && legacyResultStrings.length > 0) {
    heroHighlights = legacyResultStrings.slice(0, 3).map((r) => {
      // Try to split a leading "value" token off (e.g. "35% conversion uplift")
      const match = r.match(/^([^\s]+(?:\s*[%x])?)\s+(.+)$/)
      if (match) return { value: match[1], label: match[2] }
      return { value: r, label: "" }
    })
  }

  const heroImageUrl = study.mainImage?.asset?.url || study.mainImageUrl
  const clientName = study.client || study.title
  const headerTitle =
    study.headerTitle || (study.client && study.client !== study.title ? study.title : "")
  const excerptText = study.excerpt || ""
  const downloadUrl = study.pdfUrl

  if (isPremiumLayout(effectiveLayout)) {
    return (
      <CaseStudyPremiumLayout
        study={study}
        related={related}
        layout={effectiveLayout}
      />
    )
  }

  return (
    <div className="min-h-screen bg-white text-[#0d0a23]">
      <NavigationClient />

      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildCaseStudyJsonLd({
              headline: study.title,
              description: excerptText,
              url: `https://www.softreetechnology.com/case-studies/${slug}`,
              datePublished: study.publishedAt,
              dateModified: study._updatedAt,
              image: heroImageUrl,
              clientName: study.client,
            }),
          ),
        }}
      />

      {/* ───────────────────────── HERO (Customer Stories Header) ───────────────────────── */}
      <section className="relative overflow-hidden bg-[#0d0a23] text-white">
        {/* Grid mask */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:54px_54px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-[radial-gradient(ellipse_at_bottom,rgba(91,79,233,0.32)_0%,transparent_65%)]"
        />

        <div className="relative mx-auto w-full max-w-[1240px] px-5 pb-20 pt-32 md:px-8 md:pb-28 md:pt-36 lg:pt-40">
          {/* Big H1 client name */}
          <h1 className="text-[clamp(3rem,9vw,7rem)] font-bold leading-[0.95] tracking-[-0.045em] text-white">
            {clientName}
          </h1>

          <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
            {/* Hero image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[14px] bg-white/5 ring-1 ring-white/10">
              {heroImageUrl ? (
                <Image
                  src={heroImageUrl}
                  alt={study.mainImage?.alt || clientName}
                  fill
                  unoptimized
                  priority
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white/50">
                  No hero image
                </div>
              )}
            </div>

            {/* Highlights panel */}
            <div className="flex flex-col justify-center">
              {headerTitle ? (
                <h2 className="text-[clamp(1.55rem,2.5vw,2.05rem)] font-bold leading-[1.18] tracking-[-0.02em] text-white">
                  {headerTitle}
                </h2>
              ) : null}

              <div className="mt-7 h-px w-full bg-white/15" />

              {heroHighlights.length > 0 ? (
                <div className="mt-9 grid grid-cols-1 gap-7 sm:grid-cols-3">
                  {heroHighlights.slice(0, 3).map((h, i) => (
                    <HeroHighlight key={`${h.label}-${i}`} value={h.value} label={h.label} />
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── MAIN BODY (sidebar + article) ───────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1240px] px-5 py-16 md:px-8 md:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
            {/* TOC sidebar */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="text-[0.75rem] font-bold uppercase tracking-[0.18em] text-[#6b7694]">
                Table of Contents
              </div>
              <nav className="mt-4 flex flex-col gap-2.5 text-[0.94rem]">
                {headings.length > 0 ? (
                  headings.map((h) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className="text-[#37354a] transition-colors hover:text-[#5a17ee]"
                    >
                      {h.text}
                    </a>
                  ))
                ) : (
                  <span className="text-[#6b7694]">No sections yet.</span>
                )}
              </nav>
            </aside>

            {/* Main column */}
            <div>
              {/* Summary grid */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-7 border-b border-[#e6e1f2] pb-10 md:grid-cols-3 lg:grid-cols-6">
                <SummaryItem
                  label="Industry"
                  value={study.industry || categoryLabel(study.category) || ""}
                />
                <SummaryItem label="Location" value={study.location || ""} />
                <SummaryItem label="Employees" value={study.employees || ""} />
                <SummaryItem label="Project duration" value={study.projectDuration || ""} />
                <SummaryItem label="Team size" value={study.teamSize || ""} />
                <SummaryItem
                  label="Scale of Operation"
                  value={study.scaleOfOperation || (clientName ? `Trusted by ${clientName}` : "")}
                />
              </div>

              {/* Intro excerpt */}
              {excerptText ? (
                <p className="mt-10 text-[1.18rem] font-medium leading-[1.55] text-[#0d0a23] md:text-[1.28rem]">
                  {excerptText}
                </p>
              ) : null}

              {/* Article body */}
              <article className="mt-2">
                {articleBody.length > 0 ? <PortableText value={articleBody} components={components} /> : null}

                {study.pullQuoteImage?.asset?.url ? (
                  <figure className="my-12 overflow-hidden rounded-[14px] border border-[#e6e1f2] bg-white">
                    <div className="relative w-full aspect-[16/9]">
                      <Image
                        src={study.pullQuoteImage.asset.url}
                        alt={study.pullQuoteImage.alt || "Highlight"}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 760px"
                      />
                    </div>
                    {study.pullQuoteImage.caption ? (
                      <figcaption className="px-4 py-3 text-center text-xs font-medium text-[#6b7694]">
                        {study.pullQuoteImage.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                ) : null}

                {/* Metrics grid (if present and not already shown in hero) */}
                {Array.isArray(study.metrics) && study.metrics.length > 0 && heroHighlights.length === 0 ? (
                  <div className="my-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
                    {study.metrics.map((m, i) => (
                      <div
                        key={`metric-${i}`}
                        className="rounded-[14px] border border-[#e6e1f2] bg-white p-5"
                      >
                        <div className="text-[1.7rem] font-bold leading-none tracking-[-0.02em] text-[#0d0a23]">
                          {m.value}
                        </div>
                        <div className="mt-3 text-[0.95rem] font-semibold text-[#0d0a23]">{m.label}</div>
                        {m.description ? (
                          <div className="mt-1.5 text-[0.85rem] leading-snug text-[#6b7694]">{m.description}</div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : null}
              </article>

              {/* Testimonial */}
              {study.testimonial?.quote ? (
                <div className="mt-14 rounded-[14px] border border-[#e6e1f2] bg-[#f3eefe] p-6 md:p-8">
                  <p className="text-[1.1rem] font-medium leading-[1.6] text-[#2a1f82] md:text-[1.18rem]">
                    &ldquo;{study.testimonial.quote}&rdquo;
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    {study.testimonial.avatar?.asset?.url ? (
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          src={study.testimonial.avatar.asset.url}
                          alt={study.testimonial.name || "Client"}
                          fill
                          unoptimized
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5a17ee]/15 text-[0.75rem] font-bold text-[#5a17ee]">
                        {(study.testimonial.name || "C").charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="text-[0.95rem] font-bold text-[#0d0a23]">
                        {study.testimonial.name || "Client"}
                      </div>
                      {study.testimonial.role ? (
                        <div className="text-[0.85rem] text-[#6b7694]">{study.testimonial.role}</div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Gallery */}
              {(() => {
                const galleryItems = [
                  ...(study.gallery || [])
                    .filter((g) => g?.asset?.url)
                    .map((g) => ({
                      url: g.asset!.url!,
                      alt: g.alt,
                      caption: g.caption,
                    })),
                  ...(study.galleryUrls || [])
                    .filter((g) => g?.url)
                    .map((g) => ({ url: g.url!, alt: g.alt, caption: g.caption })),
                ]
                if (galleryItems.length === 0) return null
                return (
                  <div className="mt-14">
                    <h3 className="text-[0.75rem] font-bold uppercase tracking-[0.18em] text-[#6b7694]">
                      Project gallery
                    </h3>
                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                      {galleryItems.map((item, i) => (
                        <figure
                          key={`${item.url}-${i}`}
                          className="overflow-hidden rounded-[14px] border border-[#e6e1f2] bg-white"
                        >
                          <div className="relative aspect-[16/10] w-full">
                            <Image
                              src={item.url}
                              alt={item.alt || `Gallery image ${i + 1}`}
                              fill
                              unoptimized
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, 400px"
                            />
                          </div>
                          {item.caption ? (
                            <figcaption className="px-4 py-3 text-center text-xs font-medium text-[#6b7694]">
                              {item.caption}
                            </figcaption>
                          ) : null}
                        </figure>
                      ))}
                    </div>
                  </div>
                )
              })()}

              {/* Download CTA */}
              <div className="mt-14 flex flex-wrap items-center gap-4">
                {downloadUrl ? (
                  <CaseStudyDownloadButton
                    href={downloadUrl}
                    slug={slug}
                    title={study.title}
                    client={study.client}
                    category={study.category}
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#4FC3F7] via-[#2196F3] to-[#5B4FE9] px-12 py-4 text-[0.9rem] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_4px_15px_rgba(91,79,233,0.3)] transition-transform duration-200 ease-out hover:-translate-y-[1px] hover:shadow-[0_6px_20px_rgba(91,79,233,0.4)]"
                  >
                    Download Customer Story
                  </CaseStudyDownloadButton>
                ) : (
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#4FC3F7] via-[#2196F3] to-[#5B4FE9] px-12 py-4 text-[0.9rem] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_4px_15px_rgba(91,79,233,0.3)] transition-transform duration-200 ease-out hover:-translate-y-[1px] hover:shadow-[0_6px_20px_rgba(91,79,233,0.4)]"
                  >
                    Talk to our team
                  </Link>
                )}
                {study.liveUrl ? (
                  <Link
                    href={study.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-[#5a17ee] px-8 py-4 text-[0.9rem] font-semibold uppercase tracking-[0.14em] text-[#5a17ee] transition-colors hover:bg-[#5a17ee] hover:text-white"
                  >
                    View live project
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── MORE CUSTOMER STORIES ───────────────────────── */}
      {related && related.length > 0 ? (
        <section className="bg-[#f8f4ea] py-20 md:py-28">
          <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8">
            <div className="mb-12 flex items-end justify-between gap-6">
              <h2 className="text-[clamp(1.85rem,3.4vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#0d0a23]">
                More Customer Stories
              </h2>
              <Link
                href="/case-studies"
                className="hidden md:inline-flex items-center rounded-full border border-[#191919] px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#191919] transition-colors duration-200 hover:bg-[#191919] hover:text-white"
              >
                View all
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => (
                <RelatedCard key={item._id} study={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ───────────────────────── BIG CTA CARD (Rasa-style) ───────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8">
          <div className="relative overflow-hidden rounded-[28px] bg-[#0d0a23] px-6 py-14 text-white md:px-14 md:py-20 lg:px-20 lg:py-24">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_85%_30%,rgba(91,79,233,0.55)_0%,transparent_55%),radial-gradient(circle_at_15%_85%,rgba(255,88,18,0.35)_0%,transparent_60%)]"
            />
            <div className="relative max-w-2xl">
              <h2 className="text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.025em]">
                Build your next AI agent with Softree
              </h2>
              <p className="mt-6 max-w-lg text-[1.05rem] leading-[1.65] text-white/70 md:text-[1.15rem]">
                Power every conversation, workflow, and decision with enterprise-grade tools that keep your teams in
                control.
              </p>
              <div className="mt-9">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0d0a23] transition-colors duration-200 hover:bg-[#ff5812] hover:text-white"
                >
                  Get a demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
