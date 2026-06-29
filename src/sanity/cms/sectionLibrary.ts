/**
 * Softree page builder section catalog — cms-kit style metadata for editors.
 * Powers the visual section picker in Studio.
 */

export type SectionCategory = 'start' | 'story' | 'proof' | 'visual' | 'closing'

export type SectionCatalogEntry = {
  type: string
  title: string
  description: string
  category: SectionCategory
  beginnerTip: string
  previewImage: string
}

export const SECTION_CATEGORIES: Record<
  SectionCategory,
  { title: string; description: string }
> = {
  start: {
    title: 'Start the page',
    description: 'Open with context — who, what, and why it matters.',
  },
  story: {
    title: 'Tell the story',
    description: 'Explain the challenge, approach, and solution.',
  },
  proof: {
    title: 'Show results',
    description: 'Metrics, testimonials, and before/after proof.',
  },
  visual: {
    title: 'Visual effects',
    description: 'Animated backgrounds and motion from React Bits.',
  },
  closing: {
    title: 'Finish strong',
    description: 'Tech stack, FAQs, related links, and contact.',
  },
}

export const SOFTREE_SECTION_LIBRARY: SectionCatalogEntry[] = [
  {
    type: 'csOverviewSection',
    title: 'Project overview',
    description: 'Client name, excerpt, and project snapshot bar.',
    category: 'start',
    beginnerTip: 'Add this first — it pulls from the Story tab automatically.',
    previewImage: '/studio/composer-previews/csOverviewSection.svg',
  },
  {
    type: 'csNarrativeSection',
    title: 'Story section',
    description: 'Heading + rich text. Use for challenge, approach, or outcomes.',
    category: 'story',
    beginnerTip: 'Click ✨ AI Assist in the body field to draft from your notes.',
    previewImage: '/studio/composer-previews/csNarrativeSection.svg',
  },
  {
    type: 'csCardGridSection',
    title: 'Card grid',
    description: 'Three or more cards — great for challenges or deliverables.',
    category: 'story',
    beginnerTip: 'Keep card titles short; one idea per card.',
    previewImage: '/studio/composer-previews/csCardGridSection.svg',
  },
  {
    type: 'csSolutionSection',
    title: 'Solution summary',
    description: 'Short summary plus bullet features.',
    category: 'story',
    beginnerTip: 'Use after the challenge section to show what you built.',
    previewImage: '/studio/composer-previews/csSolutionSection.svg',
  },
  {
    type: 'csGallerySection',
    title: 'Screenshot gallery',
    description: 'Carousel of product or project images.',
    category: 'story',
    beginnerTip: 'Upload 3–6 screenshots with short captions.',
    previewImage: '/studio/composer-previews/csGallerySection.svg',
  },
  {
    type: 'csMetricsSection',
    title: 'Impact metrics',
    description: 'Big numbers with labels — e.g. "40% faster".',
    category: 'proof',
    beginnerTip: 'Use real numbers from the project; 3–4 metrics works best.',
    previewImage: '/studio/composer-previews/csMetricsSection.svg',
  },
  {
    type: 'csBeforeAfterSection',
    title: 'Before / after',
    description: 'Comparison table showing transformation.',
    category: 'proof',
    beginnerTip: 'One row per metric — keep before/after values concrete.',
    previewImage: '/studio/composer-previews/csBeforeAfterSection.svg',
  },
  {
    type: 'csTestimonialSection',
    title: 'Client quote',
    description: 'Testimonial with name, role, and optional photo.',
    category: 'proof',
    beginnerTip: 'Ask for a quote that mentions a specific outcome.',
    previewImage: '/studio/composer-previews/csTestimonialSection.svg',
  },
  {
    type: 'csHeroMetricsStrip',
    title: 'Hero metrics strip',
    description: 'Bold metrics band — ideal directly under the hero.',
    category: 'start',
    beginnerTip: 'Use 3–4 headline numbers from the project.',
    previewImage: '/studio/composer-previews/csMetricsSection.svg',
  },
  {
    type: 'csEvidencePanel',
    title: 'Evidence panel',
    description: 'Cited facts + extractable summary for AI answer engines.',
    category: 'story',
    beginnerTip: 'Write one quotable summary paragraph and link each claim to a source.',
    previewImage: '/studio/composer-previews/csNarrativeSection.svg',
  },
  {
    type: 'csReactBitsSection',
    title: 'Visual effect',
    description: 'Animated background or motion block from React Bits.',
    category: 'visual',
    beginnerTip: 'Pick a background for hero areas; avoid stacking many effects.',
    previewImage: '/studio/composer-previews/csNarrativeSection.svg',
  },
  {
    type: 'csTechStackSection',
    title: 'Tech stack',
    description: 'Technologies used with optional logos.',
    category: 'closing',
    beginnerTip: 'List tools the client cares about, not every dependency.',
    previewImage: '/studio/composer-previews/csTechStackSection.svg',
  },
  {
    type: 'csFaqSection',
    title: 'FAQ',
    description: 'Accordion of common questions.',
    category: 'closing',
    beginnerTip: 'Great for SEO — write questions people actually search.',
    previewImage: '/studio/composer-previews/csFaqSection.svg',
  },
  {
    type: 'csRelatedSection',
    title: 'Related stories',
    description: 'Links to other case studies.',
    category: 'closing',
    beginnerTip: 'Configure related items on the Publish tab.',
    previewImage: '/studio/composer-previews/csRelatedSection.svg',
  },
  {
    type: 'csContactSection',
    title: 'Contact CTA',
    description: 'Site-wide contact section — no setup needed.',
    category: 'closing',
    beginnerTip: 'Usually the last block on the page.',
    previewImage: '/studio/composer-previews/csContactSection.svg',
  },
]

export const SECTION_BY_TYPE = Object.fromEntries(
  SOFTREE_SECTION_LIBRARY.map((entry) => [entry.type, entry]),
) as Record<string, SectionCatalogEntry>

/** Suggested first-time page stack for new editors */
export const BEGINNER_PAGE_STARTER = [
  'csOverviewSection',
  'csNarrativeSection',
  'csCardGridSection',
  'csMetricsSection',
  'csContactSection',
] as const

/** Curated React Bits safe for page sections (backgrounds + subtle motion) */
export const REACT_BITS_SECTION_PICKER = [
  { value: 'Backgrounds/Aurora', title: 'Aurora gradient' },
  { value: 'Backgrounds/Beams', title: 'Light beams' },
  { value: 'Backgrounds/DotGrid', title: 'Dot grid' },
  { value: 'Backgrounds/GridMotion', title: 'Grid motion' },
  { value: 'Backgrounds/Particles', title: 'Particles' },
  { value: 'Backgrounds/Waves', title: 'Waves' },
  { value: 'TextAnimations/SplitText', title: 'Split text reveal' },
  { value: 'TextAnimations/BlurText', title: 'Blur text reveal' },
  { value: 'TextAnimations/GradientText', title: 'Gradient text' },
  { value: 'Components/SpotlightCard', title: 'Spotlight card' },
  { value: 'Components/MagicBento', title: 'Magic bento grid' },
  { value: 'Animations/FadeContent', title: 'Fade on scroll' },
] as const
