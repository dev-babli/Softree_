import type { CaseStudyLayoutData } from "../types"
import { NexoraProductStoryPage } from "./nexora-product-story"

export function NexoraProductStoryLayout({ data }: { data: CaseStudyLayoutData }) {
  return <NexoraProductStoryPage data={data} />
}
