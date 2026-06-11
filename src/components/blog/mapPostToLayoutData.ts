import type { CaseStudyLayoutData, RelatedStudy } from "@/components/case-studies/layouts/types"

export type SanityPostDoc = {
  _id: string
  _updatedAt?: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt?: string
  heroEyebrow?: string
  heroHighlights?: Array<{ value?: string; label?: string }>
  mainImage?: { asset?: { url?: string } | null; alt?: string } | null
  categories?: Array<{ title?: string }>
  author?: { name?: string; bio?: string } | null
  faqSchema?: Array<{ question: string; answer: string }>
}

/** Maps a blog post into CaseStudyLayoutData so we reuse PageComposer / CaseStudyComposer unchanged. */
export function mapPostToLayoutData(
  post: SanityPostDoc,
  related: RelatedStudy[],
): CaseStudyLayoutData {
  const category = post.categories?.[0]?.title || "Insights"
  const authorName = post.author?.name || "Softree Team"
  const heroUrl = post.mainImage?.asset?.url

  return {
    slug: post.slug.current,
    layout: "page-composer",
    title: post.title,
    headerTitle: post.title,
    heroEyebrow: post.heroEyebrow || `Blog · ${category}`,
    excerpt: post.excerpt || "",
    client: authorName,
    category,
    industry: category,
    accentColor: "#FF7A2F",
    heroImageUrl: heroUrl,
    heroImageAlt: post.mainImage?.alt || post.title,
    highlights: (post.heroHighlights || [])
      .filter((item) => item.value && item.label)
      .map((item) => ({ value: item.value!, label: item.label! })),
    snapshot: {
      projectType: "",
      industry: category,
      region: "",
      duration: "",
      teamSize: "",
      users: "",
    },
    challengeHeading: "",
    challengeSubheading: "",
    challengeCards: [],
    solutionHeading: "",
    solutionNodes: [],
    deliverablesHeading: "",
    deliverables: [],
    gallery: [],
    impactHeading: "",
    impactMetrics: [],
    technologies: [],
    beforeAfter: [],
    cta: {
      headline: "Need help with a similar initiative?",
      subtext:
        "Talk to Softree about enterprise engineering, Microsoft platforms, and AI delivery.",
      buttonText: "Contact us",
      buttonHref: "/contact-us",
    },
    related,
    faqs: (post.faqSchema || []).map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    })),
    sectionImages: heroUrl
      ? {
          hero: heroUrl,
          heroAlt: post.mainImage?.alt || post.title,
        }
      : undefined,
    publishedAt: post.publishedAt,
    updatedAt: post._updatedAt,
  }
}

/** Shape Sanity related-post query results for RelatedStudy cards (blog mode). */
export function mapRelatedPosts(
  posts: Array<{
    _id: string
    title: string
    slug: { current: string }
    excerpt?: string
    categories?: Array<{ title?: string }>
    mainImage?: { asset?: { url?: string }; alt?: string }
  }>,
): RelatedStudy[] {
  return posts.map((post) => ({
    _id: post._id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    category: post.categories?.[0]?.title,
    industry: post.categories?.[0]?.title,
    client: post.title,
    mainImage: post.mainImage,
  }))
}
