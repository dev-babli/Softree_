export type CaseStudyListingItem = {
  category: string
  title: string
  description: string
  href: string
  image?: string
  imageAlt: string
  imageFit?: "cover" | "contain"
}
