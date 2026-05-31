import type { SanityNavCaseStudy, SanityNavCaseStudyCategory } from "./types"

const CATEGORY_ORDER = [
  "power-platform",
  "ai",
  "mobile",
  "web",
  "sharepoint",
  "data-analytics",
] as const

const CATEGORY_META: Record<
  string,
  { title: string; description: string; fallbackImage: string }
> = {
  "power-platform": {
    title: "Microsoft Power Platform",
    description: "Low-code and automation customer stories",
    fallbackImage: "/images/case-study/power-apps/automated.jpg",
  },
  ai: {
    title: "AI & Machine Learning",
    description: "Intelligent automation and AI at scale",
    fallbackImage: "/images/ai/ai-agent.jpg",
  },
  mobile: {
    title: "Mobile Development",
    description: "Android and iOS product delivery",
    fallbackImage: "/images/case-study/mobile/education.png",
  },
  web: {
    title: "Web Development",
    description: "High-performance web platforms",
    fallbackImage: "/images/case-study/power-apps/automated.jpg",
  },
  sharepoint: {
    title: "Microsoft 365 & SharePoint",
    description: "Enterprise collaboration solutions",
    fallbackImage: "/images/case-study/power-apps/automated.jpg",
  },
  "data-analytics": {
    title: "Data Analytics",
    description: "Analytics and data platform outcomes",
    fallbackImage: "/images/ai/analytics.jpg",
  },
}

function getCaseStudyImage(study: SanityNavCaseStudy): string | undefined {
  return study.mainImage?.asset?.url || study.mainImageUrl
}

export function buildCaseStudyNavCategories(
  studies: SanityNavCaseStudy[],
): SanityNavCaseStudyCategory[] {
  const grouped = new Map<string, SanityNavCaseStudy[]>()

  for (const study of studies) {
    if (!study.slug?.current) continue
    const key = study.category || "web"
    const bucket = grouped.get(key) ?? []
    bucket.push(study)
    grouped.set(key, bucket)
  }

  return CATEGORY_ORDER.filter((key) => (grouped.get(key)?.length ?? 0) > 0)
    .slice(0, 4)
    .map((key) => {
      const items = grouped.get(key) ?? []
      const meta = CATEGORY_META[key] ?? {
        title: key,
        description: "Customer stories",
        fallbackImage: "/images/case-study/power-apps/automated.jpg",
      }

      return {
        key,
        title: meta.title,
        description: meta.description,
        image: getCaseStudyImage(items[0]) || meta.fallbackImage,
        viewAllUrl: `/case-studies/${key}`,
        caseStudies: items.slice(0, 3),
      }
    })
}
