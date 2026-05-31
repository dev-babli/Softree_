import type { Metadata } from "next"
import CaseStudyCategoryView, {
  generateCaseStudyCategoryMetadata,
} from "../CaseStudyCategoryView"

export const metadata: Metadata = generateCaseStudyCategoryMetadata("ai")

export default function AICaseStudiesPage() {
  return <CaseStudyCategoryView category="ai" />
}
