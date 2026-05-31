import type { CaseStudyLayoutData } from "../types"
import { StatsDashboardPage } from "./stats-dashboard"

export function StatsDashboardLayout({ data }: { data: CaseStudyLayoutData }) {
  return <StatsDashboardPage data={data} />
}
