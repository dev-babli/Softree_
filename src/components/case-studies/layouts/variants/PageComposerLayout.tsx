import { mergeComposerStyleVars } from '@/lib/composer-style-vars'
import type { DesignTokenSettings } from '@/lib/design-tokens'
import type { CaseStudyLayoutData } from "../types"
import type { CaseStudyComposerSection } from "../../composer/types"
import { HeroSection } from "./manufacturing/sections/HeroSection"
import { caseStudyLightCssVars, csLightClasses } from "../design-system/caseStudyLightTokens"
import { CaseStudyComposer } from "../../composer/CaseStudyComposer"
import { CaseStudyScrollProgress } from "@/components/case-studies/detail/CaseStudyDetailChrome"

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
    <article
      className={`${csLightClasses.shell} bg-[#f8f4ec]`}
      style={{ ...caseStudyLightCssVars, ...mergeComposerStyleVars(designTokens) }}
    >
      <CaseStudyScrollProgress />
      <HeroSection data={data} />
      <CaseStudyComposer sections={sections} data={data} />
    </article>
  )
}
