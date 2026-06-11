import {
  CASE_STUDY_CATEGORY_CONFIG,
  type CaseStudyCategoryKey,
  isCaseStudyCategory,
} from "@/app/case-studies/categoryConfig"
import type { SanityNavCaseStudy, SanityNavCaseStudyCategory } from "./types"

const NAV_GROUPS: {
  key: string
  title: string
  description: string
  categoryKeys: CaseStudyCategoryKey[]
}[] = [
  {
    key: "microsoft",
    title: "Microsoft & data",
    description: "Power Platform, SharePoint, and analytics delivery.",
    categoryKeys: ["power-platform", "sharepoint", "data-analytics"],
  },
  {
    key: "engineering",
    title: "Product engineering",
    description: "Web and mobile platforms built for scale.",
    categoryKeys: ["web", "mobile"],
  },
  {
    key: "intelligence",
    title: "AI & automation",
    description: "Intelligent systems with measurable outcomes.",
    categoryKeys: ["ai"],
  },
]

const USE_CASE_CATEGORY_MAP: Record<string, CaseStudyCategoryKey> = {
  "Web Platform": "web",
  "Mobile App": "mobile",
  "AI Agents": "ai",
  "Process Automation": "power-platform",
  "Customer Experience": "web",
  Operations: "data-analytics",
}

function resolveCategoryKey(study: SanityNavCaseStudy): CaseStudyCategoryKey | null {
  if (study.category && isCaseStudyCategory(study.category)) {
    return study.category
  }
  if (study.useCase && USE_CASE_CATEGORY_MAP[study.useCase]) {
    return USE_CASE_CATEGORY_MAP[study.useCase]
  }
  return null
}

export function buildCaseStudyNavCategories(
  studies: SanityNavCaseStudy[],
): SanityNavCaseStudyCategory[] {
  const counts = new Map<CaseStudyCategoryKey, number>()

  for (const study of studies) {
    if (!study.slug?.current) continue
    const key = resolveCategoryKey(study)
    if (!key) continue
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }

  return NAV_GROUPS.map((group) => {
    const links = group.categoryKeys
      .filter((key) => (counts.get(key) ?? 0) > 0)
      .map((key) => {
        const config = CASE_STUDY_CATEGORY_CONFIG[key]
        return {
          key,
          label: config.title,
          description: config.eyebrow,
          href: `/case-studies/${key}`,
        }
      })

    return {
      key: group.key,
      title: group.title,
      description: group.description,
      links: links.map(({ key, label, description, href }) => ({
        key,
        label,
        description,
        href,
      })),
    }
  }).filter((group) => group.links.length > 0)
}
