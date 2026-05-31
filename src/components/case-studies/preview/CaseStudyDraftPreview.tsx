"use client"

import {
  CaseStudyPremiumLayout,
  isPremiumLayout,
} from "@/components/case-studies/layouts/CaseStudyPremiumLayout"
import type { SanityCaseStudyDoc } from "@/components/case-studies/layouts/mapCaseStudyData"
import { CLASSIC_LAYOUT_VALUE } from "@/sanity/lib/layoutPreview"

import { CaseStudyClassicPreview } from "./CaseStudyClassicPreview"

type Props = {
  study: SanityCaseStudyDoc
  layout: string
}

export default function CaseStudyDraftPreview({ study, layout }: Props) {
  const effectiveLayout = layout === CLASSIC_LAYOUT_VALUE ? undefined : layout

  if (isPremiumLayout(effectiveLayout)) {
    return <CaseStudyPremiumLayout study={study} related={[]} layout={effectiveLayout} />
  }

  return <CaseStudyClassicPreview study={study} />
}
