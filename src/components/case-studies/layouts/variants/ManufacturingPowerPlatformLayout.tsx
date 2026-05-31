import type { CaseStudyLayoutData } from "../types"

import { ManufacturingCaseStudyPage } from "./manufacturing"



/** Manufacturing Power Platform — Softree-native case study layout. */

export function ManufacturingPowerPlatformLayout({ data }: { data: CaseStudyLayoutData }) {

  return <ManufacturingCaseStudyPage data={data} />

}

