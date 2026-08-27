import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, CalendarDays, Clock3, Facebook, Linkedin, Link2, Twitter } from 'lucide-react'
import NavigationServer from '@/components/sections/navigation-server'
import Footer from '@/components/sections/footer'
import { BlogComposerPage } from '@/components/blog/BlogComposerPage'
import type { CaseStudyComposerSection } from '@/components/case-studies/composer/types'
import { sharedPortableTextTypes } from '@/components/portable-text/contentBlockTypes'
import { getNavigationData } from '@/components/sections/navigation-server'
import { sanityFetch } from '@/cms/lib/fetch'
import { postBySlugQuery, relatedPostsQuery } from '@/cms/lib/queries/queries'
import { buildArticleJsonLd, buildBlogJsonLdGraph } from '@/lib/structured-data'
import { fetchDesignTokens } from '@/lib/fetch-design-tokens'
import { collectFaqItems } from '@/cms/lib/studio/aeoCompleteness'
import { ogImages, pageOgImage, SITE_URL, twitterImages } from '@/lib/site-metadata'
import LightFAQExact from '@/components/homepage-light/LightFAQExact'

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
  author?: { name?: string; bio?: string }
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
      return (
        <figure className="my-10 overflow-hidden rounded-2xl border border-zinc-200">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={value.asset.url}
              alt={value.alt || 'Article illustration'}
              fill
              className="object-cover"
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
  const post = await sanityFetch<BlogPostDocument | null>(postBySlugQuery, { slug }, { tags: ['post', `post:${slug}`] })

  if (!post) return { title: 'Blog Post Not Found' }

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

// ISR: individual posts are cacheable; draft mode auto-opts editors into dynamic rendering.
export const revalidate = 3600

function estimateReadTime(post: { body?: unknown; composerSections?: unknown[] }): string {
  const composerText = JSON.stringify(post.composerSections || '')
  const bodyText = JSON.stringify(post.body || '')
  const words = (composerText + bodyText).split(/\s+/).filter(Boolean).length
  return `${Math.max(3, Math.ceil(Math.max(words, 700) / 220))} min read`
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await sanityFetch<BlogPostDocument | null>(postBySlugQuery, { slug }, { tags: ['post', `post:${slug}`] })

  if (!post) notFound()

  const authorName = toPlainText(post.author?.name) || 'Softree Team'
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

  if (post.displayMode === 'composer' && post.composerSections?.length) {
    const [relatedPosts, nav, designTokens] = await Promise.all([
      sanityFetch<any[]>(relatedPostsQuery, { slug }, { tags: ['post'] }),
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
          relatedPosts={relatedPosts || []}
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
  const updatedDate = post._updatedAt
    ? new Date(post._updatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : publishedDate
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
              <span>Updated: {updatedDate}</span>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1240px] gap-8 px-4 py-10 md:grid-cols-[1fr_320px] md:px-8 md:py-14">
          <article className="rounded-2xl border border-zinc-200 bg-white p-6 md:p-8">
            {post.mainImage?.asset?.url ? (
              <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-xl border border-zinc-200">
                <Image
                  src={post.mainImage.asset.url}
                  alt={post.mainImage.alt || post.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 900px) 100vw, 860px"
                />
              </div>
            ) : null}

            <div className="blog-content">
              {post.body ? <PortableText value={post.body} components={portableTextComponents} /> : null}
            </div>
          </article>

          <aside className="space-y-5 md:sticky md:top-28 md:h-fit">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">Share</p>
              <div className="mt-4 flex items-center gap-2">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-zinc-300 p-2 text-zinc-600 transition-colors hover:border-zinc-900 hover:text-zinc-900"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-zinc-300 p-2 text-zinc-600 transition-colors hover:border-zinc-900 hover:text-zinc-900"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-zinc-300 p-2 text-zinc-600 transition-colors hover:border-zinc-900 hover:text-zinc-900"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href={pageUrl}
                  className="rounded-lg border border-zinc-300 p-2 text-zinc-600 transition-colors hover:border-zinc-900 hover:text-zinc-900"
                >
                  <Link2 className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">Author</p>
              <p className="mt-3 text-lg font-bold text-zinc-900">{toPlainText(post.author?.name) || 'Softree Team'}</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                {toPlainText(post.author?.bio) ||
                  'Practical guides and implementation insights on enterprise engineering, automation, and AI transformation.'}
              </p>
            </div>
          </aside>
        </section>

        <LightFAQExact faqs={mappedFaqs} />

        <section className="border-t border-zinc-200 bg-white py-14">
          <div className="mx-auto max-w-[1240px] px-4 md:px-8">
            <div className="mb-8 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-black tracking-tight text-zinc-950">Recent Blogs</h2>
              <Link href="/blog" className="text-sm font-semibold text-[#0f5cc0] hover:text-[#0a428b]">
                View all
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <Link href="/blog" className="rounded-xl border border-zinc-200 bg-[#f8faff] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0f5cc0]">Explore</p>
                <p className="mt-2 font-semibold text-zinc-900">Browse all blog posts and latest enterprise insights.</p>
              </Link>
              <Link href="/case-studies" className="rounded-xl border border-zinc-200 bg-[#f8faff] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0f5cc0]">Case Studies</p>
                <p className="mt-2 font-semibold text-zinc-900">See delivered outcomes and implementation stories.</p>
              </Link>
              <Link href="/contact" className="rounded-xl border border-zinc-200 bg-[#f8faff] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0f5cc0]">Talk to us</p>
                <p className="mt-2 font-semibold text-zinc-900">Need help with a similar initiative? Let&apos;s connect.</p>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
