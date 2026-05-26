import { client } from "@/sanity/client"
import { groq } from "next-sanity"
import { PortableText, type PortableTextComponents } from "@portabletext/react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Calendar, ArrowLeft, TrendingUp, Quote, Layers } from "lucide-react"
import NavigationClient from "@/components/sections/navigation-client"
import Footer from "@/components/sections/footer"
import LightContactSection from "@/components/qc/homepage-light/LightContactSection"

const CATEGORY_LABELS: Record<string, string> = {
    ai: "AI & Machine Learning",
    "power-platform": "Power Platform",
    sharepoint: "SharePoint",
    web: "Web Development",
    mobile: "Mobile Development",
    "data-analytics": "Data Analytics",
}

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
            <blockquote className="border-l-4 border-[#1852FF] pl-6 py-2 my-8 bg-slate-50 rounded-r-xl italic text-slate-800">
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
                className="text-[#1852FF] hover:text-[#0a3fd4] font-medium underline underline-offset-4 decoration-2 transition-colors"
            >
                {children}
            </a>
        ),
    },
    types: {
        image: ({ value }) => {
            if (!value?.asset?.url) return null
            return (
                <figure className="my-10 overflow-hidden rounded-3xl border border-slate-100 shadow-sm">
                    <div className="relative w-full aspect-[16/9]">
                        <Image
                            src={value.asset.url}
                            alt={value.alt || "Case study illustration"}
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
            )
        },
    },
}

const caseStudyQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    _updatedAt,
    title,
    slug,
    excerpt,
    category,
    industry,
    client,
    mainImage { asset->{ url }, alt },
    technologies,
    metrics,
    testimonial,
    publishedAt,
    body[]{
      ...,
      _type == "image" => { ..., asset-> }
    },
    metaTitle,
    metaDescription
  }
`

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const study = await client.fetch(caseStudyQuery, { slug })

    if (!study) return { title: "Case Study Not Found" }

    const title = study.metaTitle || `${study.title} | Case Study`
    const description = study.metaDescription || study.excerpt || ""

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
            images: study.mainImage?.asset?.url
                ? [{ url: study.mainImage.asset.url, width: 1200, height: 630 }]
                : [{ url: "/og-image.png", width: 1200, height: 630 }],
        },
    }
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const study = await client.fetch(caseStudyQuery, { slug })

    if (!study) notFound()

    const categoryLabel = CATEGORY_LABELS[study.category] || study.category

    return (
        <div className="min-h-screen bg-slate-50/50">
            <NavigationClient />

            {/* Article JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        headline: study.title,
                        description: study.excerpt,
                        url: `https://www.softreetechnology.com/case-studies/${slug}`,
                        author: {
                            "@type": "Organization",
                            name: "Softree Technology",
                            "@id": "https://www.softreetechnology.com/#organization",
                        },
                        publisher: {
                            "@type": "Organization",
                            name: "Softree Technology",
                            logo: {
                                "@type": "ImageObject",
                                url: "https://www.softreetechnology.com/logo/Softree-Technology-Final-Logo.png",
                            },
                        },
                        datePublished: study.publishedAt,
                        dateModified: study._updatedAt || study.publishedAt,
                        ...(study.mainImage?.asset?.url && { image: study.mainImage.asset.url }),
                    }),
                }}
            />

            {/* Hero Section */}
            <section className="relative bg-slate-950 pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

                <div className="relative container mx-auto px-6 max-w-4xl">
                    <Link
                        href="/case-studies"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors text-sm font-medium group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to Case Studies
                    </Link>

                    <div className="flex flex-wrap items-center gap-2 mb-6">
                        <span className="text-xs font-semibold px-3.5 py-1 rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/5 uppercase tracking-wider">
                            {categoryLabel}
                        </span>
                        {study.industry && (
                            <span className="text-xs font-semibold px-3.5 py-1 rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/5 uppercase tracking-wider">
                                {study.industry}
                            </span>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                        {study.title}
                    </h1>

                    <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed font-light">
                        {study.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center gap-y-4 gap-x-6 text-sm text-slate-400 border-t border-white/10 pt-6">
                        {study.client && (
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center">
                                    <Layers className="w-4 h-4 text-[#1852FF]" />
                                </div>
                                <span className="font-medium text-slate-200">{study.client}</span>
                            </div>
                        )}
                        <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-slate-500" />
                            {study.publishedAt
                                ? new Date(study.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                                : "Recent"}
                        </span>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="container mx-auto px-6 max-w-4xl py-12 md:py-20">
                <div className="bg-white rounded-[32px] border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] p-6 md:p-12">

                    {/* Cover Image */}
                    {study.mainImage?.asset?.url && (
                        <div className="relative w-full aspect-[16/9] mb-12 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                            <Image
                                src={study.mainImage.asset.url}
                                alt={study.mainImage.alt || study.title}
                                fill
                                priority
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 896px"
                            />
                        </div>
                    )}

                    {/* Key Metrics */}
                    {study.metrics && study.metrics.length > 0 && (
                        <div className="mb-12 grid grid-cols-2 md:grid-cols-3 gap-4">
                            {study.metrics.map((metric: { label: string; value: string }, i: number) => (
                                <div
                                    key={i}
                                    className="rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-5 text-center"
                                >
                                    <div className="flex items-center justify-center gap-1.5 mb-1">
                                        <TrendingUp className="h-4 w-4 text-[#1852FF]" />
                                        <span className="text-2xl font-black text-[#1852FF]">{metric.value}</span>
                                    </div>
                                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        {metric.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Technologies */}
                    {study.technologies && study.technologies.length > 0 && (
                        <div className="mb-12 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Technologies Used</h3>
                            <div className="flex flex-wrap gap-2">
                                {study.technologies.map((tech: string) => (
                                    <span
                                        key={tech}
                                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Body Content */}
                    <article className="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-tight prose-p:text-slate-700 prose-li:text-slate-700">
                        {study.body && <PortableText value={study.body} components={portableTextComponents} />}
                    </article>

                    {/* Testimonial */}
                    {study.testimonial?.quote && (
                        <div className="mt-16 border-t border-slate-100 pt-12">
                            <div className="relative rounded-3xl bg-gradient-to-br from-[#1852FF]/5 to-slate-50 border border-[#1852FF]/10 p-8 md:p-10">
                                <Quote className="absolute top-6 left-6 h-8 w-8 text-[#1852FF]/20" />
                                <blockquote className="relative z-10">
                                    <p className="text-lg md:text-xl font-medium text-slate-800 leading-relaxed italic mb-6">
                                        &ldquo;{study.testimonial.quote}&rdquo;
                                    </p>
                                    <footer className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-[#1852FF]/10 flex items-center justify-center">
                                            <span className="text-xs font-bold text-[#1852FF]">
                                                {study.testimonial.name?.charAt(0) || "C"}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">{study.testimonial.name || "Client"}</p>
                                            <p className="text-xs text-slate-500">{study.testimonial.role || ""}</p>
                                        </div>
                                    </footer>
                                </blockquote>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Related / CTA */}
            <section className="bg-slate-100/30 border-t border-slate-100 py-16 md:py-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Explore More</h2>
                        <Link href="/case-studies" className="text-sm font-semibold text-[#1852FF] hover:text-[#0a3fd4] transition-colors flex items-center gap-1.5">
                            All Case Studies &rarr;
                        </Link>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <Link href="/case-studies" className="group p-8 bg-white rounded-3xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-slate-200 transition-all duration-300 flex flex-col justify-between h-full">
                            <div>
                                <p className="text-xs text-[#1852FF] font-bold uppercase tracking-wider mb-2">Browse projects</p>
                                <h3 className="font-bold text-slate-900 text-lg leading-snug group-hover:text-[#1852FF] transition-colors">
                                    Discover more case studies across AI, Power Platform, SharePoint, and web development.
                                </h3>
                            </div>
                            <span className="mt-6 text-sm font-semibold text-slate-500 group-hover:text-slate-900 transition-colors inline-flex items-center gap-1">
                                View All &rarr;
                            </span>
                        </Link>
                        <Link href="/contact" className="group p-8 bg-white rounded-3xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-slate-200 transition-all duration-300 flex flex-col justify-between h-full">
                            <div>
                                <p className="text-xs text-[#ff5812] font-bold uppercase tracking-wider mb-2">Start a project</p>
                                <h3 className="font-bold text-slate-900 text-lg leading-snug group-hover:text-[#ff5812] transition-colors">
                                    Ready to achieve similar results? Let&apos;s discuss your project requirements.
                                </h3>
                            </div>
                            <span className="mt-6 text-sm font-semibold text-slate-500 group-hover:text-slate-900 transition-colors inline-flex items-center gap-1">
                                Get in Touch &rarr;
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            <LightContactSection />
            <Footer />
        </div>
    )
}
