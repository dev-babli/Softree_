/**
 * Migrate manufacturing-power-platform case studies to page-composer layout.
 *
 * Usage:
 *   npm run sanity:migrate-to-composer          # dry run
 *   npm run sanity:migrate-to-composer -- --apply
 *
 * Requires SANITY_API_WRITE_TOKEN
 */
import { config as loadEnv } from 'dotenv'
import { createClient } from '@sanity/client'

loadEnv({ path: '.env.local' })
loadEnv()

function env(name: string, fallback = '') {
  return (process.env[name] || fallback).replace(/^["']|["']$/g, '')
}

const token = env('SANITY_API_WRITE_TOKEN') || env('SANITY_API_TOKEN')
if (!token) {
  console.error('Missing SANITY_API_WRITE_TOKEN')
  process.exit(1)
}

const apply = process.argv.includes('--apply')

const client = createClient({
  projectId: env('NEXT_PUBLIC_SANITY_PROJECT_ID', '1zmh4sfw'),
  dataset: env('NEXT_PUBLIC_SANITY_DATASET', 'production'),
  apiVersion: env('NEXT_PUBLIC_SANITY_API_VERSION', '2026-05-21'),
  token,
  useCdn: false,
})

type Block = { _type?: string; _key?: string; [key: string]: unknown }
type Card = { title?: string; description?: string; _key?: string }
type Metric = { value?: string; label?: string; description?: string; _key?: string }
type Faq = { question?: string; answer?: string; _key?: string }
type BeforeAfter = { metric?: string; before?: string; after?: string; _key?: string }

type CaseStudyDoc = {
  _id: string
  title: string
  slug?: { current?: string }
  detailLayout?: string
  composerSections?: unknown[]
  challengeSummary?: string
  approachSummary?: string
  outcomeSummary?: string
  challengeContent?: Block[]
  approachContent?: Block[]
  outcomeContent?: Block[]
  challengeCards?: Card[]
  solutionSummary?: string
  solutionFeatures?: string[]
  solutionArchitecture?: Card[]
  deliverables?: Card[]
  keyResults?: Metric[]
  metrics?: Metric[]
  highlights?: Array<{ value?: string; label?: string }>
  gallery?: unknown[]
  testimonial?: {
    quote?: string
    name?: string
    role?: string
    avatar?: unknown
  }
  technologies?: string[]
  beforeAfter?: BeforeAfter[]
  faqs?: Faq[]
}

function key() {
  return Math.random().toString(36).slice(2, 12)
}

function withKeys<T extends Record<string, unknown>>(items: T[] | undefined): Array<T & { _key: string }> {
  return (items || []).map((item) => ({ ...item, _key: (item._key as string) || key() }))
}

function buildComposerSections(study: CaseStudyDoc): unknown[] {
  const sections: unknown[] = [{ _type: 'csOverviewSection', _key: key() }]

  if (study.challengeContent?.length) {
    sections.push({
      _type: 'csNarrativeSection',
      _key: key(),
      anchorId: 'challenge',
      label: 'The challenge',
      heading: study.challengeSummary || 'The challenge',
      content: study.challengeContent,
      layout: 'text',
    })
  }

  if (study.challengeCards?.length) {
    sections.push({
      _type: 'csCardGridSection',
      _key: key(),
      label: 'Challenge highlights',
      heading: 'Key challenges',
      cards: withKeys(study.challengeCards),
      showImage: true,
    })
  }

  if (study.approachContent?.length) {
    sections.push({
      _type: 'csNarrativeSection',
      _key: key(),
      anchorId: 'approach',
      label: 'Our approach',
      heading: study.approachSummary || 'Our approach',
      content: study.approachContent,
      layout: 'split',
    })
  }

  const solutionCards = study.solutionArchitecture?.length
    ? study.solutionArchitecture
    : study.deliverables?.length
      ? study.deliverables
      : []

  if (study.solutionSummary || study.solutionFeatures?.length || solutionCards.length) {
    sections.push({
      _type: 'csSolutionSection',
      _key: key(),
      label: 'The solution',
      heading: 'Solution architecture',
      summary: study.solutionSummary || '',
      features: study.solutionFeatures || [],
    })
  }

  if (study.outcomeContent?.length) {
    sections.push({
      _type: 'csNarrativeSection',
      _key: key(),
      anchorId: 'outcome',
      label: 'The outcome',
      heading: study.outcomeSummary || 'The outcome',
      content: study.outcomeContent,
      layout: 'text',
    })
  }

  const impactMetrics =
    study.keyResults?.length
      ? study.keyResults
      : study.metrics?.length
        ? study.metrics
        : (study.highlights || []).map((h) => ({
            value: h.value || '',
            label: h.label || '',
          }))

  if (impactMetrics.length) {
    sections.push({
      _type: 'csMetricsSection',
      _key: key(),
      label: 'Impact',
      heading: 'Results & business impact',
      metrics: withKeys(impactMetrics),
    })
  }

  if (study.gallery?.length) {
    sections.push({
      _type: 'csGallerySection',
      _key: key(),
      heading: 'In production',
      subheading: 'Screenshots from the delivered solution',
      images: study.gallery,
    })
  }

  if (study.testimonial?.quote) {
    sections.push({
      _type: 'csTestimonialSection',
      _key: key(),
      quote: study.testimonial.quote,
      name: study.testimonial.name,
      role: study.testimonial.role,
      avatar: study.testimonial.avatar,
    })
  }

  if (study.technologies?.length) {
    sections.push({
      _type: 'csTechStackSection',
      _key: key(),
      heading: 'Technology stack',
      technologies: study.technologies.map((name) => ({ _key: key(), name })),
    })
  }

  if (study.beforeAfter?.length) {
    sections.push({
      _type: 'csBeforeAfterSection',
      _key: key(),
      heading: 'Before & after',
      rows: withKeys(study.beforeAfter),
    })
  }

  if (study.faqs?.length) {
    sections.push({
      _type: 'csFaqSection',
      _key: key(),
      heading: 'Frequently asked questions',
      faqs: withKeys(study.faqs),
    })
  }

  sections.push({ _type: 'csRelatedSection', _key: key() })
  sections.push({ _type: 'csContactSection', _key: key() })

  return sections
}

const query = `*[_type == "caseStudy" && detailLayout == "manufacturing-power-platform" && (!defined(composerSections) || count(composerSections) == 0)]{
  _id,
  title,
  slug,
  detailLayout,
  composerSections,
  challengeSummary,
  approachSummary,
  outcomeSummary,
  challengeContent,
  approachContent,
  outcomeContent,
  challengeCards[] { _key, title, description },
  solutionSummary,
  solutionFeatures,
  solutionArchitecture[] { _key, title, description },
  deliverables[] { _key, title, description },
  keyResults[] { _key, value, label, description },
  metrics[] { _key, value, label, description },
  highlights[] { value, label },
  gallery,
  testimonial { quote, name, role, avatar },
  technologies,
  beforeAfter[] { _key, metric, before, after },
  faqs[] { _key, question, answer }
}`

async function main() {
  const studies = await client.fetch<CaseStudyDoc[]>(query)
  console.log(`Found ${studies.length} manufacturing case studies to migrate.`)

  for (const study of studies) {
    const sections = buildComposerSections(study)
    console.log(`\n${study.title} (${study.slug?.current || 'no slug'})`)
    console.log(`  → ${sections.length} composer sections`)

    if (apply) {
      await client
        .patch(study._id)
        .set({
          detailLayout: 'page-composer',
          composerSections: sections,
        })
        .commit()
      console.log('  ✓ migrated')
    }
  }

  if (!apply) {
    console.log('\nDry run only. Re-run with --apply to write changes.')
  } else {
    console.log(`\nDone. Migrated ${studies.length} case studies to page-composer.`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
