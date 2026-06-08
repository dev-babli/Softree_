import type { SanityNavCaseStudy, SanityNavCaseStudyCategory } from "./types"

const FALLBACK_IMAGE = "/images/case-study/power-apps/automated.jpg"

function getCaseStudyImage(study: SanityNavCaseStudy): string | undefined {
  return study.mainImage?.asset?.url || study.mainImageUrl
}

function getGroupKey(study: SanityNavCaseStudy): string {
  return (study.industry || study.category || "Featured").trim()
}

export function buildCaseStudyNavCategories(
  studies: SanityNavCaseStudy[],
): SanityNavCaseStudyCategory[] {
  const grouped = new Map<string, SanityNavCaseStudy[]>()

  for (const study of studies) {
    if (!study.slug?.current) continue
    const key = getGroupKey(study)
    const bucket = grouped.get(key) ?? []
    if (bucket.length < 3) bucket.push(study)
    grouped.set(key, bucket)
  }

  const orderedKeys: string[] = []
  for (const study of studies) {
    if (!study.slug?.current) continue
    const key = getGroupKey(study)
    if (!orderedKeys.includes(key) && (grouped.get(key)?.length ?? 0) > 0) {
      orderedKeys.push(key)
    }
  }

  return orderedKeys.slice(0, 4).map((key) => {
    const items = grouped.get(key) ?? []

    return {
      key: key.toLowerCase().replace(/\s+/g, "-"),
      title: key,
      description: `Latest ${key.toLowerCase()} customer stories`,
      image: getCaseStudyImage(items[0]) || FALLBACK_IMAGE,
      viewAllUrl: "/case-studies",
      caseStudies: items,
    }
  })
}
