import { createElement, useMemo } from "react"
import { applySoftreeShellHtml } from "./softreeAgenticHtmlCopy"
import { SoftreeAgenticProgrammableSection as SoftreeAgenticProgrammableOrbitSection } from "./SoftreeAgenticProgrammableSection"
import { SoftreeAgenticAgentsSection as SoftreeAgenticAgentsBody } from "./SoftreeAgenticAgentsSection"
import { SoftreeAgenticBuildScaleOptimizeSection as SoftreeAgenticBuildScaleBody } from "./SoftreeAgenticBuildScaleOptimizeSection"
import { SoftreeAgenticDemoVideoSection } from "./SoftreeAgenticDemoVideoSection"
import { SoftreeAgenticOutcomesSection as SoftreeAgenticOutcomesBody } from "./SoftreeAgenticOutcomesSection"
import { SoftreeAgenticGetStartedSection as SoftreeAgenticGetStartedBody } from "./SoftreeAgenticGetStartedSection"
import { SoftreeAgenticHeroSection } from "./SoftreeAgenticHeroSection"
import { SoftreeAgenticPillarsSection as SoftreeAgenticPillarsBody } from "./SoftreeAgenticPillarsSection"
import { SoftreeAgenticScrollTabsSection as SoftreeAgenticScrollTabsBody } from "./SoftreeAgenticScrollTabsSection"
import { SOFTREE_AGENTIC_DIALOGS, SOFTREE_AGENTIC_FOOTER, SOFTREE_AGENTIC_HEADER, SOFTREE_AGENTIC_SCROLL_NAV } from "./referenceContent"

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

export function SoftreeAgenticHeader() {
  return <HtmlElement element={SOFTREE_AGENTIC_HEADER} />
}

export function SoftreeAgenticScrollNav() {
  return <HtmlElement element={SOFTREE_AGENTIC_SCROLL_NAV} />
}

export function SoftreeAgenticMeetSection() {
  return <SoftreeAgenticHeroSection />
}

export function SoftreeAgenticOutcomesSection() {
  return <SoftreeAgenticOutcomesBody />
}

export function SoftreeAgenticAgentsSection() {
  return <SoftreeAgenticAgentsBody />
}

export function SoftreeAgenticLightMiddleGroup() {
  return (
    <div className="k2-theme-light">
      <SoftreeAgenticAgentsSection />
      <SoftreeAgenticProgrammableOrbitSection />
      <SoftreeAgenticPillarsBody />
    </div>
  )
}

export function SoftreeAgenticProgrammableSection() {
  return <SoftreeAgenticProgrammableOrbitSection />
}

export function SoftreeAgenticPillarsSection() {
  return <SoftreeAgenticPillarsBody />
}

export function SoftreeAgenticBuildScaleOptimizeSection() {
  return <SoftreeAgenticBuildScaleBody />
}

export function SoftreeAgenticSection7Section() {
  return <SoftreeAgenticDemoVideoSection />
}

export function SoftreeAgenticScrollTabsSection() {
  return <SoftreeAgenticScrollTabsBody />
}

export function SoftreeAgenticGetStartedSection() {
  return <SoftreeAgenticGetStartedBody />
}

export function SoftreeAgenticFooter() {
  return <HtmlElement element={SOFTREE_AGENTIC_FOOTER} />
}

export function SoftreeAgenticReferenceModals() {
  return (
    <>
      {SOFTREE_AGENTIC_DIALOGS.map((dialog, index) => (
        <HtmlElement key={index} element={dialog} />
      ))}
    </>
  )
}

export const SOFTREE_AGENTIC_SECTION_COMPONENTS = [
  SoftreeAgenticMeetSection,
  SoftreeAgenticOutcomesSection,
  SoftreeAgenticLightMiddleGroup,
  SoftreeAgenticBuildScaleOptimizeSection,
  SoftreeAgenticSection7Section,
  SoftreeAgenticScrollTabsSection,
  SoftreeAgenticGetStartedSection,
] as const
