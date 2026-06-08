import type { Metadata } from "next"
import CaseStudyCategoryView, {
  generateCaseStudyCategoryMetadata,
} from "../CaseStudyCategoryView"

export const metadata: Metadata = generateCaseStudyCategoryMetadata("data-analytics")

export default function DataAnalyticsCaseStudiesPage() {
  return <CaseStudyCategoryView category="data-analytics" />
}
