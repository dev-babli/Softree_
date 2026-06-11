import type { CaseStudyLayoutData } from "../types"
import type { CaseStudyComposerSection } from "../../composer/types"
import { csCssVars } from "./manufacturing/tokens"
import { HeroSection } from "./manufacturing/sections/HeroSection"
import { csLightClasses } from "../design-system/caseStudyLightTokens"
import { CaseStudyComposer } from "../../composer/CaseStudyComposer"

/** Drag-and-drop case study layout — hero from document + composable sections */
export function PageComposerLayout({
  data,
  sections,
}: {
  data: CaseStudyLayoutData
  sections?: CaseStudyComposerSection[] | null
}) {
  return (
    <article className={csLightClasses.shell} style={csCssVars}>
      <HeroSection data={data} />
      <CaseStudyComposer sections={sections} data={data} />
    </article>
  )
}
