import type { CaseStudyLayoutData } from "../../types"
import { YAMAMA_MADAR_DEFAULT } from "./defaultContent"
import type { MadarAccordionItem, MadarIconKey, MadarLayoutData } from "./types"

const CHALLENGE_ICONS: MadarIconKey[] = [
  "transportation",
  "fleet",
  "communication",
  "load",
  "delivery",
]

const INTEGRATION_ICONS: MadarIconKey[] = [
  "compliance",
  "centralized",
  "package",
  "communication",
  "time",
  "delivery",
  "wallet",
]

function splitTitleLines(title: string): string[] {
  const parts = title.split(/\s*&\s*|\s+and\s+/i)
  if (parts.length >= 2) {
    return [parts[0].trim(), `& ${parts.slice(1).join(" & ").trim()}`]
  }
  const words = title.split(/\s+/)
  if (words.length <= 3) return [title]
  const mid = Math.ceil(words.length / 2)
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")]
}

function toAccordionItems(
  cards: { title: string; description: string }[],
  icons: MadarIconKey[],
): MadarAccordionItem[] {
  return cards.map((card, i) => ({
    id: `item-${i}`,
    title: card.title,
    description: card.description,
    icon: icons[i % icons.length],
  }))
}

export function mapMadarCaseStudyData(data: CaseStudyLayoutData): MadarLayoutData {
  const hero = data.sectionImages?.hero ?? data.heroImageUrl ?? YAMAMA_MADAR_DEFAULT.heroImage
  const challengeCards =
    data.challengeCards.length > 0
      ? data.challengeCards
      : YAMAMA_MADAR_DEFAULT.challengeItems.map((c) => ({
          title: c.title,
          description: c.description,
        }))

  const integrationSource =
    data.solutionFeatures && data.solutionFeatures.length > 0
      ? data.solutionFeatures.map((feature) => ({
          title: feature.split(":")[0]?.trim() || feature,
          description: feature.includes(":") ? feature.split(":").slice(1).join(":").trim() : feature,
        }))
      : data.approachSteps && data.approachSteps.length > 0
        ? data.approachSteps
        : YAMAMA_MADAR_DEFAULT.integrationItems.map((c) => ({
            title: c.title,
            description: c.description,
          }))

  return {
    eyebrow: data.heroEyebrow ?? data.category ?? "Case Studies",
    heroTitleLines: splitTitleLines(data.headerTitle || data.title),
    heroLeadLines: data.excerpt
      ? data.excerpt.split(/(?<=\.)\s+/).slice(0, 2)
      : YAMAMA_MADAR_DEFAULT.heroLeadLines,
    heroImage: hero,
    heroImageMobile: hero,
    aboutHeading: data.challengeHeading || YAMAMA_MADAR_DEFAULT.aboutHeading,
    aboutIntro: data.challengeSubheading || data.excerpt || YAMAMA_MADAR_DEFAULT.aboutIntro,
    aboutClientHeading: `About ${data.client}`,
    aboutClientBody: data.solutionSummary || YAMAMA_MADAR_DEFAULT.aboutClientBody,
    aboutBackgroundImage:
      data.sectionImages?.challenge ?? data.gallery[0]?.url ?? YAMAMA_MADAR_DEFAULT.aboutBackgroundImage,
    aboutBackgroundMobile:
      data.sectionImages?.challenge ?? data.gallery[0]?.url ?? YAMAMA_MADAR_DEFAULT.aboutBackgroundMobile,
    clientLogo: data.clientLogoUrl ?? YAMAMA_MADAR_DEFAULT.clientLogo,
    challengeHeading: data.challengeTitle ?? "Challenges",
    challengeItems: toAccordionItems(challengeCards, CHALLENGE_ICONS),
    assessmentHeading: data.approachHeading ?? YAMAMA_MADAR_DEFAULT.assessmentHeading,
    assessmentBody: data.approachSummary ?? YAMAMA_MADAR_DEFAULT.assessmentBody,
    assessmentBackground:
      data.sectionImages?.impactBackground ??
      data.gallery[1]?.url ??
      YAMAMA_MADAR_DEFAULT.assessmentBackground,
    assessmentBackgroundMobile:
      data.sectionImages?.impactBackground ??
      data.gallery[1]?.url ??
      YAMAMA_MADAR_DEFAULT.assessmentBackgroundMobile,
    integrationHeading: data.solutionHeading || YAMAMA_MADAR_DEFAULT.integrationHeading,
    integrationItems: toAccordionItems(integrationSource, INTEGRATION_ICONS),
  }
}
