export type ComposerCard = { title: string; description: string; _key?: string }

export type ComposerMetric = { value: string; label: string; description?: string; _key?: string }

export type ComposerFaq = { question: string; answer: string; _key?: string }

export type ComposerImage = {
  asset?: { url?: string } | null
  alt?: string
  caption?: string
  _key?: string
}

export type CsOverviewSection = { _type: 'csOverviewSection'; _key?: string }

export type CsNarrativeSection = {
  _type: 'csNarrativeSection'
  _key?: string
  anchorId?: string
  label?: string
  heading?: string
  content?: unknown[]
  layout?: 'text' | 'split'
  image?: ComposerImage | null
}

export type CsCardGridSection = {
  _type: 'csCardGridSection'
  _key?: string
  label?: string
  heading?: string
  cards?: ComposerCard[]
  showImage?: boolean
  image?: ComposerImage | null
}

export type CsMetricsSection = {
  _type: 'csMetricsSection'
  _key?: string
  label?: string
  heading?: string
  metrics?: ComposerMetric[]
}

export type CsSolutionSection = {
  _type: 'csSolutionSection'
  _key?: string
  label?: string
  heading?: string
  summary?: string
  features?: string[]
}

export type CsGallerySection = {
  _type: 'csGallerySection'
  _key?: string
  heading?: string
  subheading?: string
  images?: ComposerImage[]
}

export type CsTestimonialSection = {
  _type: 'csTestimonialSection'
  _key?: string
  quote?: string
  name?: string
  role?: string
  avatar?: ComposerImage | null
}

export type ComposerTechItem = {
  name: string
  subtitle?: string
  logo?: ComposerImage | null
  _key?: string
}

export type CsTechStackSection = {
  _type: 'csTechStackSection'
  _key?: string
  heading?: string
  description?: string
  /** Legacy string entries may still exist in older documents */
  technologies?: Array<string | ComposerTechItem>
}

export type CsBeforeAfterSection = {
  _type: 'csBeforeAfterSection'
  _key?: string
  heading?: string
  rows?: Array<{ metric: string; before: string; after: string; _key?: string }>
}

export type CsFaqSection = {
  _type: 'csFaqSection'
  _key?: string
  heading?: string
  faqs?: ComposerFaq[]
}

export type CsRelatedSection = { _type: 'csRelatedSection'; _key?: string }
export type CsContactSection = { _type: 'csContactSection'; _key?: string }

export type CsReactBitsSection = {
  _type: 'csReactBitsSection'
  _key?: string
  componentId: string
  heading?: string
  minHeight?: 'sm' | 'md' | 'lg'
}

export type CsHeroMetricsStrip = {
  _type: 'csHeroMetricsStrip'
  _key?: string
  label?: string
  heading?: string
  metrics?: ComposerMetric[]
  variant?: 'band' | 'strip'
}

export type ComposerEvidence = {
  claim: string
  source: string
  sourceUrl?: string
  _key?: string
}

export type CsEvidencePanel = {
  _type: 'csEvidencePanel'
  _key?: string
  label?: string
  heading?: string
  summary?: string
  items?: ComposerEvidence[]
}

export type CaseStudyComposerSection =
  | CsOverviewSection
  | CsNarrativeSection
  | CsCardGridSection
  | CsMetricsSection
  | CsSolutionSection
  | CsGallerySection
  | CsTestimonialSection
  | CsTechStackSection
  | CsBeforeAfterSection
  | CsFaqSection
  | CsRelatedSection
  | CsContactSection
  | CsHeroMetricsStrip
  | CsEvidencePanel
  | CsReactBitsSection
