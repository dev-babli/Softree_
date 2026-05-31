import type { CaseStudyLayoutData } from "../types"
import { SynqLabProductStoryPage } from "./synqlab-product-story"

export function SynqLabProductStoryLayout({ data }: { data: CaseStudyLayoutData }) {
  return <SynqLabProductStoryPage data={data} />
}
