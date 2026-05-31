import type { CaseStudyLayoutData } from "../types"
import { AIHorizontalStoryPage } from "./ai-horizontal-story"

export function AIHorizontalStoryLayout({ data }: { data: CaseStudyLayoutData }) {
  return <AIHorizontalStoryPage data={data} />
}
