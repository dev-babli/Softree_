import type { DesignTokenSettings } from "@/lib/design-tokens"
import type { CaseStudyLayoutData } from "../types"

import { ManufacturingCaseStudyPage } from "./manufacturing"

/** Manufacturing Power Platform — Softree-native case study layout. */
export function ManufacturingPowerPlatformLayout({
  data,
  designTokens,
}: {
  data: CaseStudyLayoutData
  designTokens?: DesignTokenSettings | null
}) {
  return <ManufacturingCaseStudyPage data={data} designTokens={designTokens} />
}
