import { client } from '@/sanity/client'
import { groq } from 'next-sanity'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react'
import NavigationClient from '@/components/sections/navigation-client'
import Footer from '@/components/sections/footer'

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-12 mb-6 scroll-m-20 border-b border-slate-100 pb-2">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-8 mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-bold text-slate-900 mt-6 mb-2">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-slate-700 leading-relaxed mb-6 text-base md:text-lg">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#ff7a2f] pl-6 py-2 my-8 bg-slate-50 rounded-r-xl italic text-slate-800">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 space-y-3 mb-8 text-slate-700 text-base md:text-lg">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-3 mb-8 text-slate-700 text-base md:text-lg">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-slate-900">{children}</strong>,
    em: ({ children }) => <em className="italic text-slate-700">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#ff7a2f] hover:text-[#e05e1a] font-medium underline underline-offset-4 decoration-2 transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?.url) return null;
      return (
        <figure className="my-10 overflow-hidden rounded-3xl border border-slate-100 shadow-sm">
          <div className="relative w-full aspect-[16/9]">
            <Image
              src={value.asset.url}
              alt={value.alt || "Article illustration"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-xs text-slate-500 font-medium px-4">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
}

const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
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

export const revalidate = 0
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await client.fetch(postQuery, { slug }, { next: { revalidate: 0 } })

  if (!post) return { title: 'Blog Post Not Found' }

  const title = post.metaTitle || post.title
  const description = post.metaDescription || post.excerpt || post.body?.[0]?.children?.[0]?.text?.substring(0, 160) || ''
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
  const post = await client.fetch(postQuery, { slug }, { next: { revalidate: 0 } })

  if (!post) notFound()

  const excerpt = post.excerpt || post.body?.[0]?.children?.[0]?.text?.substring(0, 160) || ''
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
    <div className="min-h-screen bg-slate-50/50">
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

      {/* Hero Section */}
      <section className="relative bg-slate-950 pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        {/* Subtle grid accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

        <div className="relative container mx-auto px-6 max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors text-sm font-medium group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Articles
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-6">
            {post.categories?.map((cat: { title: string }, i: number) => (
              <span key={i} className="text-xs font-semibold px-3.5 py-1 rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/5 uppercase tracking-wider">
                {cat.title}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            {post.title}
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed font-light">
            {excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-y-4 gap-x-6 text-sm text-slate-400 border-t border-white/10 pt-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center">
                <User className="w-4 h-4 text-[#ff7a2f]" />
              </div>
              <span className="font-medium text-slate-200">{post.author?.name || 'Softree Team'}</span>
            </div>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-500" />
              {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recent'}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500" />
              8 min read
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto px-6 max-w-4xl py-12 md:py-20">
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] p-6 md:p-12">

          {/* Featured Banner Image */}
          {post.mainImage?.asset?.url && (
            <div className="relative w-full aspect-[16/9] mb-12 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
              <Image
                src={post.mainImage.asset.url}
                alt={post.mainImage.alt || post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
          )}

          {/* Article Rich Text Body */}
          <article className="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-tight prose-p:text-slate-700 prose-li:text-slate-700">
            {post.body && <PortableText value={post.body} components={portableTextComponents} />}
          </article>

          {/* FAQ Section - AEO */}
          {post.faqSchema && post.faqSchema.length > 0 && (
            <div className="mt-16 border-t border-slate-100 pt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-950 mb-8 tracking-tight">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {post.faqSchema.map((faq: { question: string; answer: string }, i: number) => (
                  <details key={i} className="group border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/50 transition-all duration-300 open:bg-white open:ring-1 open:ring-slate-100">
                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 transition-colors font-semibold text-slate-900 list-none [&::-webkit-details-marker]:hidden">
                      <span className="pr-4">{faq.question}</span>
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs text-slate-500 group-open:rotate-180 group-open:text-[#ff7a2f] group-open:border-[#ff7a2f]/20 transition-all duration-300">▼</span>
                    </summary>
                    <div className="px-6 pb-6 pt-2 text-slate-600 leading-relaxed border-t border-slate-50">{faq.answer}</div>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          <div className="mt-16 p-6 md:p-8 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-14 h-14 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center flex-shrink-0 text-slate-600 font-bold text-lg">
              ST
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-bold text-slate-900 mb-1">{post.author?.name || 'Softree Team'}</h3>
              <p className="text-xs text-[#ff7a2f] font-semibold mb-3 uppercase tracking-wider">Enterprise Delivery Partner</p>
              <p className="text-slate-600 text-sm leading-relaxed">{post.author?.bio || 'Leading technology and app delivery partner specializing in Microsoft 365, Power Platform, custom full-stack solutions, and enterprise AI automation.'}</p>
            </div>
          </div>

        </div>
      </section>

      {/* Related Posts */}
      <section className="bg-slate-100/30 border-t border-slate-100 py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Continue Reading</h2>
            <Link href="/blog" className="text-sm font-semibold text-[#ff7a2f] hover:text-[#e05e1a] transition-colors flex items-center gap-1.5">
              Explore All Articles &rarr;
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/blog" className="group p-8 bg-white rounded-3xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-slate-200 transition-all duration-300 flex flex-col justify-between h-full">
              <div>
                <p className="text-xs text-[#ff7a2f] font-bold uppercase tracking-wider mb-2">Explore insights</p>
                <h3 className="font-bold text-slate-900 text-lg leading-snug group-hover:text-[#ff7a2f] transition-colors">
                  Discover more engineering, platform, and intelligence insights in our primary blog grid.
                </h3>
              </div>
              <span className="mt-6 text-sm font-semibold text-slate-500 group-hover:text-slate-900 transition-colors inline-flex items-center gap-1">
                Browse Blog &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
