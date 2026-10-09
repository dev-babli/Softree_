import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, Facebook, Linkedin, Link2, Twitter } from 'lucide-react'
import NavigationServer from '@/components/sections/navigation-server'
import Footer from '@/components/sections/footer'
import { BlogComposerPage } from '@/components/blog/BlogComposerPage'
import type { CaseStudyComposerSection } from '@/components/case-studies/composer/types'
import { sharedPortableTextTypes } from '@/components/portable-text/contentBlockTypes'
import { getNavigationData } from '@/components/sections/navigation-server'
import { cmsClient } from '@/cms/lib/client'
import { sanityFetch } from '@/cms/lib/fetch'
import { allPostSlugsQuery, latestBlogsQuery, postBySlugQuery, relatedPostsQuery } from '@/cms/lib/queries/queries'
import { buildArticleJsonLd, buildBlogJsonLdGraph } from '@/lib/structured-data'
import { fetchDesignTokens } from '@/lib/fetch-design-tokens'
import { collectFaqItems } from '@/cms/lib/studio/aeoCompleteness'
import { ogImages, pageOgImage, SITE_URL, twitterImages } from '@/lib/site-metadata'
import LightFAQExact from '@/components/homepage-light/LightFAQExact'
import LightContactSection from '@/components/homepage-light/LightContactSection'
import { BlogConsultationCard } from '@/components/blog/BlogConsultationCard'

function toPlainText(value: unknown): string {
  if (!value) return ''

  if (typeof value === 'string') {
    return value.trim()
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => toPlainText(item))
      .filter(Boolean)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim()
  }

  if (typeof value === 'object') {
    const entry = value as { text?: unknown; children?: unknown[] }

    if (typeof entry.text === 'string') {
      return entry.text.trim()
    }

    if (Array.isArray(entry.children)) {
      return entry.children
        .map((child) => toPlainText(child))
        .filter(Boolean)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim()
    }
  }

  return ''
}

function getSanityDimensions(url?: string): { width: number; height: number } {
  if (!url) return { width: 1200, height: 800 }
  const cleanUrl = url.split('?')[0]
  const match = cleanUrl.match(/-(\d+)x(\d+)\.[a-zA-Z0-9]+$/)
  if (match) {
    const width = parseInt(match[1], 10)
    const height = parseInt(match[2], 10)
    if (!isNaN(width) && !isNaN(height) && width > 0 && height > 0) {
      return { width, height }
    }
  }
  return { width: 1200, height: 800 }
}

interface BlogPostDocument {
  _id: string
  _updatedAt?: string
  title: string
  slug: { current: string }
  excerpt?: string
  displayMode?: string
  layoutRecipe?: string
  heroEyebrow?: string
  heroHighlights?: { value: string; label: string }[]
  publishedAt?: string
  status?: string
  author?: {
    name?: string
    bio?: unknown
    image?: { asset?: { url: string }; alt?: string }
  }
  categories?: { title: string; slug: { current: string } }[]
  mainImage?: { asset?: { url: string }; alt?: string }
  body?: unknown[]
  metaTitle?: string
  metaDescription?: string
  focusKeyword?: string
  secondaryKeywords?: string[]
  faqSchema?: { question: string; answer: string }[]
  ogImage?: { asset?: { url: string } }
  composerSections?: CaseStudyComposerSection[]
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="mt-10 mb-6 text-3xl font-bold tracking-tight text-zinc-950 md:text-4xl">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 border-b border-zinc-200 pb-2 text-2xl font-bold tracking-tight text-zinc-950 md:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-xl font-bold tracking-tight text-zinc-950 md:text-2xl">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 text-lg font-bold text-zinc-950">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="mb-6 text-[1.03rem] leading-8 text-zinc-700">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-[#0f5cc0] bg-[#f2f6ff] px-5 py-4 text-zinc-800 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-8 list-disc space-y-3 pl-6 text-[1.03rem] leading-8 text-zinc-700">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-8 list-decimal space-y-3 pl-6 text-[1.03rem] leading-8 text-zinc-700">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-zinc-950">{children}</strong>,
    em: ({ children }) => <em className="italic text-zinc-700">{children}</em>,
    underline: ({ children }) => <span className="underline underline-offset-2">{children}</span>,
    code: ({ children }) => (
      <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.92em] text-zinc-900">{children}</code>
    ),
    'strike-through': ({ children }) => <s className="text-zinc-500">{children}</s>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="font-medium text-[#0f5cc0] underline decoration-2 underline-offset-4 transition-colors hover:text-[#0a428b]"
      >
        {children}
      </a>
    ),
  },
  types: {
    ...sharedPortableTextTypes,
    image: ({ value }) => {
      if (!value?.asset?.url) return null
      const dims = getSanityDimensions(value.asset.url)
      return (
        <figure className="my-10 overflow-hidden rounded-2xl border border-zinc-200 bg-[#f8f9fc]">
          <div className="relative w-full flex items-center justify-center">
            <Image
              src={value.asset.url}
              alt={value.alt || 'Article illustration'}
              width={dims.width}
              height={dims.height}
              className="h-auto w-full rounded-2xl object-contain"
              sizes="(max-width: 768px) 100vw, 900px"
            />
          </div>
          {value.caption ? (
            <figcaption className="px-4 py-3 text-center text-xs font-medium text-zinc-500">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      )
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  if (!slug || slug === 'null' || slug === 'undefined' || slug.trim() === '') {
    return { title: 'Blog Post Not Found' }
  }

  const post = await sanityFetch<BlogPostDocument | null>(postBySlugQuery, { slug }, { tags: ['post', `post:${slug}`] })

  if (!post || !post.title) return { title: 'Blog Post Not Found' }

  const title = toPlainText(post.metaTitle) || toPlainText(post.title)
  const description =
    toPlainText(post.metaDescription) ||
    toPlainText(post.excerpt) ||
    toPlainText(post.body?.[0])?.substring(0, 160) ||
    ''
  const keywords = [post.focusKeyword, ...(post.secondaryKeywords || [])].filter(Boolean).join(', ')
  const ogImage = pageOgImage(`/blog/${slug}`, title)

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${SITE_URL}/blog/${slug}`,
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : ['Softree Technology'],
      images: ogImages(ogImage),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: twitterImages(ogImage),
    },
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await cmsClient.fetch<string[]>(allPostSlugsQuery)
    return slugs.map((slug) => ({ slug }))
  } catch (error) {
    console.error('Failed to generate static params for blog posts:', error)
    return []
  }
}

// Caching is now handled by Next.js ISR (generateStaticParams + revalidateTag webhooks)

function estimateReadTime(post: { body?: unknown; composerSections?: unknown[] }): string {
  const composerText = JSON.stringify(post.composerSections || '')
  const bodyText = JSON.stringify(post.body || '')
  const words = (composerText + bodyText).split(/\s+/).filter(Boolean).length
  return `${Math.max(3, Math.ceil(Math.max(words, 700) / 220))} min read`
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!slug || slug === 'null' || slug === 'undefined' || slug.trim() === '') {
    notFound()
  }

  const [post, rawRelatedPosts] = await Promise.all([
    sanityFetch<BlogPostDocument | null>(postBySlugQuery, { slug }, { tags: ['post', `post:${slug}`] }),
    sanityFetch<any[]>(relatedPostsQuery, { slug }, { tags: ['post'] }),
  ])

  if (!post || !post.title) notFound()

  const authorName = toPlainText(post.author?.name) || 'Softree Team'
  const authorBio =
    toPlainText(post.author?.bio) ||
    'Practical guides, implementation playbooks, and architectural insights on modern enterprise engineering, cloud platforms, and scalable digital delivery.'
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recent'
  const readTime = estimateReadTime(post)
  const mappedFaqs = post.faqSchema?.map((faq: { question: string; answer: string }, i: number) => ({
    id: i + 1,
    serial: `question ${String(i + 1).padStart(2, '0')}`,
    question: faq.question,
    answer: faq.answer,
  }))

  let recentPosts = rawRelatedPosts || []
  if (!recentPosts.length) {
    const latest = await sanityFetch<any[]>(latestBlogsQuery, {}, { tags: ['post'] })
    recentPosts = (latest || []).filter((p: any) => p.slug?.current !== slug).slice(0, 3)
  }

  if (post.displayMode === 'composer' && post.composerSections?.length) {
    const [nav, designTokens] = await Promise.all([
      getNavigationData(),
      fetchDesignTokens(),
    ])
    const pageUrl = `https://www.softreetechnology.com/blog/${slug}`
    const excerpt =
      toPlainText(post.excerpt) ||
      toPlainText(post.composerSections?.[0])?.substring(0, 160) ||
      ''
    const keywords = [post.focusKeyword, ...(post.secondaryKeywords || [])].filter((val): val is string => Boolean(val))
    const faqs = collectFaqItems({
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
      faqSchema: post.faqSchema,
      composerSections: post.composerSections,
    })

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              buildBlogJsonLdGraph({
                headline: post.title,
                description:
                  toPlainText(post.metaDescription) || excerpt,
                url: pageUrl,
                datePublished: post.publishedAt,
                dateModified: post._updatedAt,
                image: post.mainImage?.asset?.url || post.ogImage?.asset?.url,
                authorName,
                faqs,
                keywords,
              }),
            ),
          }}
        />
        <BlogComposerPage
          post={post}
          relatedPosts={recentPosts}
          slug={slug}
          authorName={authorName}
          publishedLabel={`Published: ${publishedDate}`}
          readTime={readTime}
          initialBlogCategories={nav.blogCategories}
          initialCaseStudyCategories={nav.caseStudyCategories}
          designTokens={designTokens}
        />
      </>
    )
  }


  const excerpt =
    toPlainText(post.excerpt) ||
    toPlainText(post.body?.[0])?.substring(0, 160) ||
    ''
  const pageUrl = `https://www.softreetechnology.com/blog/${slug}`
  const encodedUrl = encodeURIComponent(pageUrl)
  const encodedTitle = encodeURIComponent(post.title || 'Softree Technology Blog')
  const categoryName = post.categories?.[0]?.title || 'Blog'
  const faqSchema = post.faqSchema && post.faqSchema.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqSchema.map((faq: { question: string; answer: string }) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  } : null

  return (
    <div className="min-h-screen bg-[#f6f7fb]">
      <NavigationServer />

      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildArticleJsonLd({
              headline: post.title,
              description: excerpt,
              url: pageUrl,
              datePublished: post.publishedAt,
              dateModified: post._updatedAt,
              image: post.mainImage?.asset?.url,
              authorName: post.author?.name,
            }),
          ),
        }}
      />
      {/* FAQ JSON-LD for AEO */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <main>
        <section className="border-b border-zinc-200 bg-white">
          <div className="mx-auto max-w-[1240px] px-4 pb-10 pt-32 md:px-8">
            <Link
              href="/blog"
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.12em] text-zinc-600">
              <span className="rounded-full border border-[#0f5cc0]/30 bg-[#edf3ff] px-3 py-1 text-[#0f5cc0]">
                Blog
              </span>
              <span>{categoryName}</span>
            </div>

            <h1 className="mt-5 max-w-4xl text-3xl font-black leading-tight tracking-[-0.03em] text-zinc-950 md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-zinc-600">{excerpt}</p>

            <div className="mt-7 flex flex-wrap items-center gap-5 border-t border-zinc-200 pt-5 text-sm text-zinc-600">
              <span className="font-semibold text-zinc-800">{toPlainText(post.author?.name) || 'Softree Team'}</span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                Published: {publishedDate}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                {readTime}
              </span>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1240px] gap-8 px-4 py-10 md:grid-cols-[1fr_320px] md:px-8 md:py-14">
          <article className="rounded-2xl border border-zinc-200 bg-white p-6 md:p-8">
            {post.mainImage?.asset?.url ? (() => {
              const dims = getSanityDimensions(post.mainImage.asset.url)
              return (
                <div className="relative mb-10 w-full overflow-hidden rounded-xl border border-zinc-200 bg-[#0a0d14]/[0.02] flex items-center justify-center">
                  <Image
                    src={post.mainImage.asset.url}
                    alt={post.mainImage.alt || post.title}
                    width={dims.width}
                    height={dims.height}
                    priority
                    className="h-auto w-full rounded-xl object-contain"
                    sizes="(max-width: 900px) 100vw, 860px"
                  />
                </div>
              )
            })() : null}

            <div className="blog-content">
              {post.body ? <PortableText value={post.body} components={portableTextComponents} /> : null}
            </div>
          </article>

          <aside className="space-y-5 md:sticky md:top-28 md:h-fit">
            <BlogConsultationCard
              category={categoryName}
              buttonHref="#contact"
            />

            <div className="rounded-3xl border border-zinc-200/90 bg-white p-5 sm:p-6 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-500">Share this Article</p>
              <div className="mt-3.5 flex items-center gap-2">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-[#f8faff] text-zinc-700 transition-all hover:border-[#0f5cc0] hover:bg-[#0f5cc0] hover:text-white"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Twitter"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-[#f8faff] text-zinc-700 transition-all hover:border-[#0f5cc0] hover:bg-[#0f5cc0] hover:text-white"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-[#f8faff] text-zinc-700 transition-all hover:border-[#0f5cc0] hover:bg-[#0f5cc0] hover:text-white"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href={pageUrl}
                  aria-label="Copy Link"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-[#f8faff] text-zinc-700 transition-all hover:border-[#0f5cc0] hover:bg-[#0f5cc0] hover:text-white"
                >
                  <Link2 className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-200/90 bg-white p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0f5cc0]" />
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-500">About the Author</p>
              </div>

              <div className="flex items-center gap-3.5">
                {post.author?.image?.asset?.url ? (
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-zinc-200 ring-2 ring-[#edf3ff]">
                    <Image
                      src={post.author.image.asset.url}
                      alt={post.author?.image?.alt || authorName}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0f5cc0] to-[#083b7e] font-black text-sm text-white shadow-sm ring-4 ring-[#edf3ff]">
                    {authorName
                      .split(' ')
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase() || 'ST'}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-base font-bold text-zinc-950">{authorName}</h4>
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-50 text-[10px] text-[#0f5cc0]" title="Verified Softree Contributor">
                      ✓
                    </span>
                  </div>
                  <p className="text-[11px] font-medium text-[#0f5cc0]">
                    Engineering & Solutions Advisory
                  </p>
                </div>
              </div>

              <p className="mt-3.5 text-xs leading-relaxed text-zinc-600 border-t border-zinc-100 pt-3">
                {authorBio}
              </p>

              <div className="mt-3 flex items-center justify-between border-t border-zinc-50 pt-2 text-[11px] text-zinc-500">
                <span>Practice Lead</span>
                <span className="font-semibold text-zinc-700">Softree Technology</span>
              </div>
            </div>
          </aside>
        </section>

        <LightFAQExact faqs={mappedFaqs} />

        <section className="border-t border-zinc-200 bg-[#f8f9fc] py-14 md:py-20">
          <div className="mx-auto max-w-[1240px] px-4 md:px-8">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0f5cc0]">
                  Explore Further
                </span>
                <h2 className="mt-1 text-2xl font-black tracking-tight text-zinc-950 md:text-3xl">
                  Recent Blogs & Articles
                </h2>
              </div>
              <Link
                href="/blog"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#0f5cc0] transition hover:text-[#0a428b]"
              >
                <span>View all articles</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((rel: any) => {
                const relCategory = rel.categories?.[0]?.title || "Insights"
                const relExcerpt = toPlainText(rel.excerpt) || "Implementation insights, architecture decisions, and practical enterprise delivery lessons."
                const relDate = rel.publishedAt
                  ? new Date(rel.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : null

                return (
                  <Link
                    key={rel._id || rel.slug?.current}
                    href={`/blog/${rel.slug?.current}`}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0f5cc0]/35 hover:shadow-[0_20px_40px_rgba(15,92,192,0.1)]"
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-white border-b border-zinc-100">
                      <Image
                        src={rel.mainImage?.asset?.url || "/og-image.png"}
                        alt={rel.mainImage?.alt || rel.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <div className="flex items-center gap-2.5 mb-3">
                        <span className="rounded-full bg-[#edf3ff] border border-[#0f5cc0]/20 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#0f5cc0]">
                          {relCategory}
                        </span>
                        {relDate && (
                          <span className="text-xs text-zinc-500">{relDate}</span>
                        )}
                      </div>
                      <h3 className="text-base font-bold leading-snug tracking-tight text-zinc-950 transition-colors group-hover:text-[#0f5cc0] line-clamp-2">
                        {rel.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-zinc-600 line-clamp-2 leading-relaxed">
                        {relExcerpt}
                      </p>
                      <div className="mt-auto pt-4 flex items-center gap-1.5 text-xs font-semibold text-[#0f5cc0] group-hover:translate-x-0.5 transition-transform">
                        <span>Read article</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>


        <LightContactSection />
      </main>

      <Footer />

    </div>
  )
}
