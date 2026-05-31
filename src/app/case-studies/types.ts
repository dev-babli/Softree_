export type CaseStudyListingItem = {
  category: string
  title: string
  description: string
  href: string
  image?: string
  imageAlt: string
  imageFit?: "cover" | "contain"
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
  imageFit?: "cover" | "contain"
  stats: { score: string; label: string }[]
}
