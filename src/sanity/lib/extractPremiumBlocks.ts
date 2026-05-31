import {
  bulletsFromBlocks,
  plainTextFromBlocks,
  sentencesFromText,
} from './portableTextUtils'

type PortableTextBlock = {
  _type?: string
  style?: string
  listItem?: string
  children?: Array<{ text?: string }>
}

type CardItem = { title: string; description: string }
type MetricItem = { label: string; value: string; description?: string }
type HighlightItem = { label?: string; value?: string }

type CaseStudySource = {
  client?: string
  title?: string
  challengeContent?: PortableTextBlock[]
  approachContent?: PortableTextBlock[]
  outcomeContent?: PortableTextBlock[]
  highlights?: HighlightItem[]
  metrics?: MetricItem[]
  challengeCards?: CardItem[]
  deliverables?: CardItem[]
  ctaHeadline?: string
  ctaSubtext?: string
  ctaButtonText?: string
}

function cardFromSentence(sentence: string, fallbackTitle: string): CardItem {
  const trimmed = sentence.trim()
  const colonIndex = trimmed.indexOf(':')
  if (colonIndex > 0 && colonIndex < 48) {
    return {
      title: trimmed.slice(0, colonIndex).trim(),
      description: trimmed.slice(colonIndex + 1).trim() || trimmed,
    }
  }
  const words = trimmed.split(/\s+/).slice(0, 4).join(' ')
  return {
    title: words.length > 3 ? words : fallbackTitle,
    description: trimmed,
  }
}

function buildChallengeCards(challengeText: string, bullets: string[]): CardItem[] {
  if (bullets.length >= 3) {
    return bullets.slice(0, 3).map((bullet, index) =>
      cardFromSentence(bullet, `Challenge ${index + 1}`),
    )
  }
  const sentences = sentencesFromText(challengeText, 3)
  if (sentences.length >= 3) {
    return sentences.map((sentence, index) =>
      cardFromSentence(sentence, `Challenge ${index + 1}`),
    )
  }
  const base = challengeText || 'Legacy systems and manual workflows slowed operations.'
  return [
    {
      title: 'Manual processes',
      description: `${sentences[0] || base.split('.')[0]}. Teams relied on spreadsheets for critical workflows.`,
    },
    {
      title: 'Data silos',
      description:
        sentences[1] ||
        'Information lived in disconnected systems, making reporting slow and error-prone.',
    },
    {
      title: 'Scaling pressure',
      description:
        sentences[2] ||
        'Growth exposed gaps in tooling, compliance, and cross-team coordination.',
    },
  ]
}

function buildDeliverables(approachText: string, bullets: string[]): CardItem[] {
  const source = bullets.length ? bullets : sentencesFromText(approachText, 4)
  if (!source.length) {
    return [
      {
        title: 'Discovery & architecture',
        description: 'Mapped workflows, integrations, and success metrics with stakeholders.',
      },
      {
        title: 'Implementation',
        description: 'Delivered the core platform with iterative releases and QA.',
      },
      {
        title: 'Enablement',
        description: 'Documented runbooks and trained client teams for adoption.',
      },
    ]
  }
  return source.slice(0, 6).map((item, index) => cardFromSentence(item, `Deliverable ${index + 1}`))
}

function buildMetrics(
  outcomeText: string,
  bullets: string[],
  highlights?: HighlightItem[],
  existing?: MetricItem[],
): MetricItem[] {
  if (existing?.length) return existing.slice(0, 4)

  if (highlights?.length) {
    return highlights.slice(0, 4).map((item) => ({
      label: item.label || 'Outcome',
      value: item.value || '',
    }))
  }

  const metricPattern = /(\d[\d,.%+xX]*)\s*([A-Za-z][A-Za-z\s/-]{2,40})/g
  const fromOutcome = [...outcomeText.matchAll(metricPattern)].slice(0, 4).map((match) => ({
    label: match[2].trim(),
    value: match[1].trim(),
  }))
  if (fromOutcome.length) return fromOutcome

  if (bullets.length) {
    return bullets.slice(0, 4).map((bullet, index) => ({
      label: `Outcome ${index + 1}`,
      value: bullet.slice(0, 40),
      description: bullet,
    }))
  }

  return [
    { label: 'Efficiency gain', value: '30%+' },
    { label: 'Time saved', value: '12 hrs/wk' },
  ]
}

export function extractPremiumBlocksFromStory(source: CaseStudySource) {
  const challengeText = plainTextFromBlocks(source.challengeContent)
  const approachText = plainTextFromBlocks(source.approachContent)
  const outcomeText = plainTextFromBlocks(source.outcomeContent)

  const challengeBullets = bulletsFromBlocks(source.challengeContent)
  const approachBullets = bulletsFromBlocks(source.approachContent)
  const outcomeBullets = bulletsFromBlocks(source.outcomeContent)

  const client = source.client || 'your team'
  const challengeCards =
    source.challengeCards?.length && source.challengeCards.length >= 3
      ? source.challengeCards
      : buildChallengeCards(challengeText, challengeBullets)

  const deliverables =
    source.deliverables?.length && source.deliverables.length >= 2
      ? source.deliverables
      : buildDeliverables(approachText, approachBullets)

  const metrics = buildMetrics(
    outcomeText,
    outcomeBullets,
    source.highlights,
    source.metrics,
  )

  const ctaHeadline =
    source.ctaHeadline ||
    `Ready to achieve similar results with ${client}?`
  const ctaSubtext =
    source.ctaSubtext ||
    truncate(outcomeText || `See how Softree can help ${client} modernize faster.`, 180)
  const ctaButtonText = source.ctaButtonText || 'Talk to Softree'

  return {
    challengeCards: challengeCards.slice(0, 3),
    deliverables: deliverables.slice(0, 6),
    metrics: metrics.slice(0, 4),
    ctaHeadline,
    ctaSubtext,
    ctaButtonText,
  }
}

function truncate(text: string, max: number): string {
  const trimmed = text.trim()
  if (trimmed.length <= max) return trimmed
  return `${trimmed.slice(0, max - 1).trimEnd()}…`
}
