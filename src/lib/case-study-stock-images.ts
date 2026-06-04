/**
 * Curated remote imagery for case studies — never `/public/Gallery/*` office photos.
 * Used only when Sanity has no mainImage / gallery assets.
 */

export type CaseStudyImageTheme = "power-platform" | "ai-copilot" | "product-engineering"

const unsplash = (id: string, w = 1600, h = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=88`

/** Hero + section fallbacks by client theme */
export const CASE_STUDY_STOCK: Record<
  CaseStudyImageTheme,
  { hero: string; challenge: string; solution: string; gallery: string[] }
> = {
  "power-platform": {
    hero: unsplash("photo-1551288049-bebda4e38f71"),
    challenge: unsplash("photo-1522071820081-007f6699c483", 1400, 933),
    solution: unsplash("photo-1460925895917-afdab827c52f"),
    gallery: [
      unsplash("photo-1556761175-b413da4baf72", 1400, 900),
      unsplash("photo-1553877522-43269d4ea984", 1400, 900),
      unsplash("photo-1551434678-e076c223a692", 1400, 900),
      unsplash("photo-1542744173-8e7e53415bb0", 1400, 900),
    ],
  },
  "ai-copilot": {
    hero: unsplash("photo-1677442136019-21780ecad995"),
    challenge: unsplash("photo-1634017839464-5c339ebe3cb4", 1400, 933),
    solution: unsplash("photo-1551288049-bebda4e38f71"),
    gallery: [
      unsplash("photo-1620712943543-bcc4688e7485", 1400, 900),
      unsplash("photo-1454165804606-c3d57bc86b40", 1400, 900),
      unsplash("photo-1504868584819-f8e8b4b6d7e3", 1400, 900),
      unsplash("photo-1460925895917-afdab827c52f", 1400, 900),
    ],
  },
  "product-engineering": {
    hero: unsplash("photo-1498050108023-c5249f4df085"),
    challenge: unsplash("photo-1517245386807-bb43a063c63d", 1400, 933),
    solution: unsplash("photo-1504639727930-c1c4e9a5b4c3"),
    gallery: [
      unsplash("photo-1531482615713-2afd69097998", 1400, 900),
      unsplash("photo-1555066931-4365d14bab8c", 1400, 900),
      unsplash("photo-1553877522-43269d4ea984", 1400, 900),
      unsplash("photo-1551434678-e076c223a692", 1400, 900),
    ],
  },
}

const SLUG_THEME: Record<string, CaseStudyImageTheme> = {
  "wicked-point-power-platform-governance": "power-platform",
  "ecg-group-ai-copilot-transformation": "ai-copilot",
  "sp-marketplace-installation-automation": "product-engineering",
}

export function themeForCaseStudySlug(slug: string): CaseStudyImageTheme {
  return SLUG_THEME[slug] ?? "power-platform"
}

export function stockPackForSlug(slug: string) {
  return CASE_STUDY_STOCK[themeForCaseStudySlug(slug)]
}

export function stockHeroUrl(slug?: string): string {
  const theme = slug ? themeForCaseStudySlug(slug) : "power-platform"
  return CASE_STUDY_STOCK[theme].hero
}
