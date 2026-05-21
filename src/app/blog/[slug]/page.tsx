import { client } from '@/sanity/client'
import { groq } from 'next-sanity'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-10 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-3">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-semibold text-slate-800 mt-6 mb-2">{children}</h4>,
    normal: ({ children }) => <p className="text-slate-700 leading-relaxed mb-4">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-6 bg-blue-50 rounded-r-lg">
        <p className="text-slate-700 italic">{children}</p>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-6 text-slate-700 ml-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-6 text-slate-700 ml-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-slate-900">{children}</strong>,
    em: ({ children }) => <em className="italic text-slate-700">{children}</em>,
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline underline-offset-2">
        {children}
      </a>
    ),
  },
}

const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
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

const allSlugsQuery = groq`*[_type == "post"]{ "slug": slug.current }`

export async function generateStaticParams() {
  const posts = await client.fetch(allSlugsQuery)
  return posts.map((p: { slug: string }) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await client.fetch(postQuery, { slug })

  if (!post) return { title: 'Blog Post Not Found' }

  const title = post.metaTitle || post.title
  const description = post.metaDescription || post.excerpt || post.body?.[0]?.children?.[0]?.text?.substring(0, 160) || ''
  const keywords = [post.focusKeyword, ...(post.secondaryKeywords || [])].filter(Boolean).join(', ')

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.publishedAt,
      images: post.ogImage?.asset?.url ? [{ url: post.ogImage.asset.url, width: 1200, height: 630 }] : [],
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
    <div className="min-h-screen bg-white">
      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: excerpt,
            author: {
              '@type': 'Organization',
              name: post.author?.name || 'Softree Technology',
              url: 'https://www.softreetechnology.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Softree Technology',
              url: 'https://www.softreetechnology.com',
            },
            datePublished: post.publishedAt,
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
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="relative container mx-auto px-6 max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-6">
            {post.categories?.map((cat: { title: string }, i: number) => (
              <span key={i} className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">
                {cat.title}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            {excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                <span className="text-white text-xs font-bold">ST</span>
              </div>
              <span>{post.author?.name || 'Softree Technology'}</span>
            </div>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recent'}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              8 min read
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-6 max-w-4xl py-16 md:py-24">
        <article className="max-w-none">
          {post.body && <PortableText value={post.body} components={portableTextComponents} />}
        </article>

        {/* FAQ Section - AEO */}
        {post.faqSchema && post.faqSchema.length > 0 && (
          <div className="mt-12 border-t border-slate-200 pt-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {post.faqSchema.map((faq: { question: string; answer: string }, i: number) => (
                <details key={i} className="group border border-slate-200 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors font-semibold text-slate-900">
                    {faq.question}
                    <span className="ml-4 text-blue-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-5 text-slate-700 leading-relaxed">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio */}
        <div className="mt-12 p-8 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-slate-300 flex items-center justify-center flex-shrink-0">
              <span className="text-slate-600 font-bold text-xl">ST</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{post.author?.name || 'Softree Technology'}</h3>
              <p className="text-sm text-slate-600 mb-2">Technology Solutions Provider</p>
              <p className="text-slate-700">Leading provider of AI, Microsoft 365, and web development solutions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="container mx-auto px-6 max-w-4xl pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Related Articles</h2>
          <Link href="/blog" className="text-blue-600 hover:text-blue-700 font-medium">
            View All
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/blog" className="p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all">
            <p className="text-sm text-slate-600 mb-2">Explore more articles</p>
            <p className="font-semibold text-slate-900">Browse our blog for more insights</p>
          </Link>
        </div>
      </section>
    </div>
  )
}
