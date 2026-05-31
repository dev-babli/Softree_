import type { CaseStudyLayoutData } from "../types"
import { BentoResultsPage } from "./bento-results"

export function BentoResultsLayout({ data }: { data: CaseStudyLayoutData }) {
  return <BentoResultsPage data={data} />
}
