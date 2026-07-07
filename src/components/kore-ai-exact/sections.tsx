import { createElement, useMemo } from "react"
import { applySoftreeShellHtml } from "./koreHtmlCopy"
import { KoreAiProgrammableSection as KoreAiProgrammableOrbitSection } from "./KoreAiProgrammableSection"
import { KoreAgentsSection } from "./KoreAgentsSection"
import { KoreBuildScaleOptimizeSection as KoreBuildScaleOptimizeExactSection } from "./KoreBuildScaleOptimizeSection"
import { KoreDemoVideoSection } from "./KoreDemoVideoSection"
import { KoreEnterpriseOutcomesSection } from "./KoreEnterpriseOutcomesSection"
import { KoreGetStartedSection as KoreGetStartedExactSection } from "./KoreGetStartedSection"
import { KoreHeroSection } from "./KoreHeroSection"
import { KorePillarsSection as KorePillarsExactSection } from "./KorePillarsSection"
import { KoreScrollTabsSection } from "./KoreScrollTabsSection"
import { KORE_AI_DIALOGS, KORE_AI_FOOTER, KORE_AI_HEADER, KORE_AI_SCROLL_NAV } from "./referenceContent"

type ReferenceElement = {
  tag: string
  attrs: Record<string, unknown>
  html: string
}

function toReactStyle(style: unknown) {
  if (typeof style !== "string") return style

  return style
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce<Record<string, string>>((acc, declaration) => {
      const [rawName, ...rawValue] = declaration.split(":")
      const name = rawName?.trim()
      const value = rawValue.join(":").trim()
      if (!name || !value) return acc

      const reactName = name.startsWith("--")
        ? name
        : name.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase())

      acc[reactName] = value
      return acc
    }, {})
}

function HtmlElement({ element }: { element: ReferenceElement }) {
  const html = useMemo(() => applySoftreeShellHtml(element.html), [element.html])
  const attrs = {
    ...element.attrs,
    style: toReactStyle(element.attrs.style),
  }

  return createElement(element.tag, {
    ...attrs,
    dangerouslySetInnerHTML: { __html: html },
  })
}

export function KoreAiHeader() {
  return <HtmlElement element={KORE_AI_HEADER} />
}

export function KoreAiScrollNav() {
  return <HtmlElement element={KORE_AI_SCROLL_NAV} />
}

export function KoreMeetArtemisSection() {
  return <KoreHeroSection />
}

export function KoreEnterpriseAiOutcomesSection() {
  return <KoreEnterpriseOutcomesSection />
}

export function KoreAiAgentsSection() {
  return <KoreAgentsSection />
}

export function KoreAiLightMiddleGroup() {
  return (
    <div className="k2-theme-light">
      <KoreAgentsSection />
      <KoreAiProgrammableOrbitSection />
      <KorePillarsExactSection />
    </div>
  )
}

export function KoreAiProgrammableSection() {
  return <KoreAiProgrammableOrbitSection />
}

export function KorePillarsSection() {
  return <KorePillarsExactSection />
}

export function KoreBuildScaleOptimizeSection() {
  return <KoreBuildScaleOptimizeExactSection />
}

export function KoreSection7Section() {
  return <KoreDemoVideoSection />
}

export function KoreK2SectionScrollTabsSection() {
  return <KoreScrollTabsSection />
}

export function KoreGetStartedSection() {
  return <KoreGetStartedExactSection />
}

export function KoreAiFooter() {
  return <HtmlElement element={KORE_AI_FOOTER} />
}

export function KoreAiReferenceModals() {
  return (
    <>
      {KORE_AI_DIALOGS.map((dialog, index) => (
        <HtmlElement key={index} element={dialog} />
      ))}
    </>
  )
}

export const KORE_AI_SECTION_COMPONENTS = [
  KoreMeetArtemisSection,
  KoreEnterpriseAiOutcomesSection,
  KoreAiLightMiddleGroup,
  KoreBuildScaleOptimizeSection,
  KoreSection7Section,
  KoreK2SectionScrollTabsSection,
  KoreGetStartedSection,
] as const
