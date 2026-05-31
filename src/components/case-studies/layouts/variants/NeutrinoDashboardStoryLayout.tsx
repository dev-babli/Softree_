import type { CaseStudyLayoutData } from "../types"
import { NeutrinoDashboardStoryPage } from "./neutrino-dashboard-story"

export function NeutrinoDashboardStoryLayout({ data }: { data: CaseStudyLayoutData }) {
  return <NeutrinoDashboardStoryPage data={data} />
}
