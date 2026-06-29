import type { Metadata } from "next"
import CaseStudyCategoryView, {
  generateCaseStudyCategoryMetadata,
} from "../CaseStudyCategoryView"

export const metadata: Metadata = generateCaseStudyCategoryMetadata("ai")

export default function AiCaseStudiesPage() {
  return <CaseStudyCategoryView category="ai" />
}
