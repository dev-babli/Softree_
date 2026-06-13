import { mergeComposerStyleVars } from '@/lib/composer-style-vars'
import type { DesignTokenSettings } from '@/lib/design-tokens'
import type { CaseStudyLayoutData } from "../types"
import type { CaseStudyComposerSection } from "../../composer/types"
import { HeroSection } from "./manufacturing/sections/HeroSection"
import { csLightClasses } from "../design-system/caseStudyLightTokens"
import { CaseStudyComposer } from "../../composer/CaseStudyComposer"

/** Drag-and-drop case study layout — hero from document + composable sections */
export function PageComposerLayout({
  data,
  sections,
  designTokens,
}: {
  data: CaseStudyLayoutData
  sections?: CaseStudyComposerSection[] | null
  designTokens?: DesignTokenSettings | null
}) {
  return (
    <article className={csLightClasses.shell} style={mergeComposerStyleVars(designTokens)}>
      <HeroSection data={data} />
      <CaseStudyComposer sections={sections} data={data} />
    </article>
  )
}
