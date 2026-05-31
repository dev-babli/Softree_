import type { CaseStudyLayoutData } from "../types"
import { TabbedDeliverablesPage } from "./tabbed-deliverables"

export function TabbedDeliverablesLayout({ data }: { data: CaseStudyLayoutData }) {
  return <TabbedDeliverablesPage data={data} />
}
