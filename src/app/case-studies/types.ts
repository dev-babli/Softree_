import type { CaseStudyCategoryKey } from './categoryConfig'

export type CaseStudyListingItem = {
  category: string
  categoryKey?: CaseStudyCategoryKey | null
  categoryHref?: string
  title: string
  description: string
  href: string
  image?: string
  imageAlt: string
  imageFit?: 'cover' | 'contain'
  industry?: string
  useCase?: string
  companySize?: string
  keyResults?: { value: string; label: string; description?: string }[]
  publishedAt?: string
}

export type CaseStudyHeroSlide = {
  company: string
  eyebrow: string
  title: string
  description: string
  ctaText: string
  ctaHref: string
  image: string
  imageAlt: string
  imageFit?: 'cover' | 'contain'
  stats: { score: string; label: string }[]
}
