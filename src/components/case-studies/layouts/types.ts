import type { CaseStudyDetailLayout } from "@/lib/case-study-layouts"

export type CardItem = {
  title: string
  description: string
  imageUrl?: string
  imageAlt?: string
}

export type GalleryItem = {
  url: string
  alt?: string
  caption?: string
}

export type Highlight = {
  value: string
  label: string
  /** Lucide icon key for manufacturing reference hero/impact rows */
  icon?: "trending-down" | "clock" | "users" | "shield" | "zap"
}

export type Metric = { label?: string; value?: string; description?: string }

export type RelatedStudy = {
  _id: string
  title: string
  slug: { current: string }
  category?: string
  industry?: string
  excerpt?: string
  client?: string
  mainImage?: { asset?: { url?: string } | null; alt?: string } | null
  mainImageUrl?: string
}

export type Testimonial = {
  quote?: string
  name?: string
  role?: string
  company?: string
  location?: string
  avatarUrl?: string
}

export type BeforeAfterRow = {
  metric: string
  before: string
  after: string
}

export type CaseStudyFAQ = {
  question: string
  answer: string
}

export type ApproachStep = {
  title: string
  description: string
}

export type OverviewBar = {
  client: string
  industry: string
  team: string
  duration: string
  myRole: string
  deliverables: string
}

export type CaseStudyLayoutData = {
  slug: string
  layout: CaseStudyDetailLayout
  title: string
  headerTitle: string
  excerpt: string
  client: string
  category?: string
  industry?: string
  accentColor: string
  heroImageUrl?: string
  heroImageAlt?: string
  videoUrl?: string
  highlights: Highlight[]
  snapshot: {
    projectType: string
    industry: string
    region: string
    duration: string
    teamSize: string
    users: string
  }
  challengeHeading: string
  challengeTitle?: string
  challengeSubheading: string
  challengeCards: CardItem[]
  approachHeading?: string
  approachSummary?: string
  approachSteps?: ApproachStep[]
  solutionHeading: string
  solutionTitle?: string
  solutionSummary?: string
  solutionFeatures?: string[]
  resultsHeading?: string
  overviewBar?: OverviewBar
  servicesProvided?: string
  liveUrl?: string
  solutionNodes: CardItem[]
  deliverablesHeading: string
  deliverables: CardItem[]
  gallery: GalleryItem[]
  impactHeading: string
  impactMetrics: Highlight[]
  technologies: string[]
  testimonial?: Testimonial
  beforeAfter: BeforeAfterRow[]
  cta: {
    headline: string
    subtext: string
    buttonText: string
    buttonHref: string
  }
  related: RelatedStudy[]
  faqs: CaseStudyFAQ[]
  /** Curated imagery for V2 editorial sections */
  sectionImages?: {
    hero?: string
    heroAlt?: string
    challenge?: string
    solutionDashboard?: string
    impactBackground?: string
    testimonial?: string
  }
  publishedAt?: string
  updatedAt?: string
}
