import type { CaseStudyLayoutData } from "../types"
import { VerticalTimelinePage } from "./vertical-timeline"

export function VerticalTimelineLayout({ data }: { data: CaseStudyLayoutData }) {
  return <VerticalTimelinePage data={data} />
}
