import type { CaseStudyLayoutData } from "../types"
import { PayFlowFintechStoryPage } from "./payflow-fintech-story"

export function PayFlowFintechStoryLayout({ data }: { data: CaseStudyLayoutData }) {
  return <PayFlowFintechStoryPage data={data} />
}
