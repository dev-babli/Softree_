type ArticleJsonLdInput = {
  headline: string
  description: string
  url: string
  datePublished?: string
  dateModified?: string
  image?: string
  authorName?: string
}

type FaqJsonLdItem = { question: string; answer: string }

type BlogJsonLdInput = ArticleJsonLdInput & {
  faqs?: FaqJsonLdItem[]
  keywords?: string[]
}

export function buildArticleJsonLd(input: ArticleJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    url: input.url,
    datePublished: input.datePublished,
    dateModified: input.dateModified || input.datePublished,
    image: input.image ? [input.image] : undefined,
    author: input.authorName
      ? {
          "@type": "Person",
          name: input.authorName,
        }
      : {
          "@type": "Organization",
          name: "Softree Technology",
        },
    publisher: {
      "@type": "Organization",
      name: "Softree Technology",
      logo: {
        "@type": "ImageObject",
        url: "https://www.softreetechnology.com/logo/Softree-Technology-Final-Logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": input.url,
    },
  }
}

export function buildCaseStudyJsonLd(input: ArticleJsonLdInput & { clientName?: string }) {
  return {
    ...buildArticleJsonLd(input),
    "@type": "Article",
    about: input.clientName
      ? {
          "@type": "Organization",
          name: input.clientName,
        }
      : undefined,
    articleSection: "Case Study",
  }
}

/** Stacked @graph for blog SEO + AEO + GEO (Article + FAQPage + BreadcrumbList). */
export function buildBlogJsonLdGraph(input: BlogJsonLdInput) {
  const siteOrigin = "https://www.softreetechnology.com"
  const article = buildArticleJsonLd(input)

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": `${siteOrigin}/#organization`,
      name: "Softree Technology",
      url: siteOrigin,
      logo: {
        "@type": "ImageObject",
        url: `${siteOrigin}/logo/Softree-Technology-Final-Logo.png`,
      },
    },
    {
      ...article,
      "@id": `${input.url}#article`,
      publisher: { "@id": `${siteOrigin}/#organization` },
      ...(input.keywords?.length ? { keywords: input.keywords.join(", ") } : {}),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Blog",
          item: `${siteOrigin}/blog`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: input.headline,
          item: input.url,
        },
      ],
    },
  ]

  if (input.faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${input.url}#faq`,
      mainEntity: input.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    })
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  }
}
