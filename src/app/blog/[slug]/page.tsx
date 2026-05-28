import { client } from '@/sanity/client'
import { groq } from 'next-sanity'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, CalendarDays, Clock3, Facebook, Linkedin, Link2, Twitter } from 'lucide-react'
import NavigationClient from '@/components/sections/navigation-client'
import Footer from '@/components/sections/footer'

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

const portableTextComponents: PortableTextComponents = {
  block: {
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
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-[#0f5cc0] underline decoration-2 underline-offset-4 transition-colors hover:text-[#0a428b]"
      >
        {children}
      </a>
    ),
  },
  types: {
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

const postQuery = groq`
  *[_type == "post" && slug.current == $slug && coalesce(status, "published") == "published"][0] {
    _id,
    _updatedAt,
    title,
    slug,
    excerpt,
    publishedAt,
    author->{ name, bio },
    categories[]->{ title },
    mainImage { asset->{ url }, alt },
    body[]{
      ...,
      _type == "image" => {
        ...,
        asset->
      },
      markDefs[]{
        ...,
        _type == "link" => {
          ...,
          href
        }
      }
    },
    metaTitle,
    metaDescription,
    focusKeyword,
    secondaryKeywords,
    faqSchema,
    ogImage { asset->{ url } }
  }
`

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await client.fetch(postQuery, { slug })

  if (!post) return { title: 'Blog Post Not Found' }

  const title = toPlainText(post.metaTitle) || toPlainText(post.title)
  const description =
    toPlainText(post.metaDescription) ||
    toPlainText(post.excerpt) ||
    toPlainText(post.body?.[0])?.substring(0, 160) ||
    ''
  const keywords = [post.focusKeyword, ...(post.secondaryKeywords || [])].filter(Boolean).join(', ')

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `https://www.softreetechnology.com/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://www.softreetechnology.com/blog/${slug}`,
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : ['Softree Technology'],
      images: post.ogImage?.asset?.url
        ? [{ url: post.ogImage.asset.url, width: 1200, height: 630 }]
        : [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await client.fetch(postQuery, { slug })

  if (!post) notFound()

  const excerpt =
    toPlainText(post.excerpt) ||
    toPlainText(post.body?.[0])?.substring(0, 160) ||
    ''
  const pageUrl = `https://www.softreetechnology.com/blog/${slug}`
  const encodedUrl = encodeURIComponent(pageUrl)
  const encodedTitle = encodeURIComponent(post.title || 'Softree Technology Blog')
  const readTime = Math.max(3, Math.ceil((JSON.stringify(post.body || '').split(/\s+/).length || 700) / 220))
  const categoryName = post.categories?.[0]?.title || 'Blog'
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'Recent'
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
      <NavigationClient />

      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: excerpt,
            url: `https://www.softreetechnology.com/blog/${slug}`,
            author: {
              '@type': 'Person',
              name: post.author?.name || 'Softree Technology',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Softree Technology',
              '@id': 'https://www.softreetechnology.com/#organization',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.softreetechnology.com/logo/Softree-Technology-Final-Logo.png',
              },
            },
            datePublished: post.publishedAt,
            dateModified: post._updatedAt || post.publishedAt,
            keywords: [post.focusKeyword, ...(post.secondaryKeywords || [])].filter(Boolean).join(', '),
            ...(post.mainImage?.asset?.url && { image: post.mainImage.asset.url }),
          }),
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
                {readTime} min read
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

            {post.faqSchema && post.faqSchema.length > 0 ? (
              <div className="mt-14 border-t border-zinc-200 pt-10">
                <h2 className="text-2xl font-black tracking-tight text-zinc-950 md:text-3xl">
                  Frequently Asked Questions
                </h2>
                <div className="mt-6 space-y-4">
                  {post.faqSchema.map((faq: { question: string; answer: string }, i: number) => (
                    <details key={i} className="rounded-xl border border-zinc-200 bg-zinc-50">
                      <summary className="cursor-pointer list-none px-5 py-4 text-base font-semibold text-zinc-900">
                        {faq.question}
                      </summary>
                      <div className="border-t border-zinc-200 px-5 py-4 text-zinc-700">{faq.answer}</div>
                    </details>
                  ))}
                </div>
              </div>
            ) : null}
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
              <Link href="/contact-us" className="rounded-xl border border-zinc-200 bg-[#f8faff] p-5">
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
