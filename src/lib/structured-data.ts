type ArticleJsonLdInput = {
  headline: string
  description: string
  url: string
  datePublished?: string
  dateModified?: string
  image?: string
  authorName?: string
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
