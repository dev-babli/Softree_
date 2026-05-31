import type { Metadata } from "next"
import CaseStudyCategoryView, {
  generateCaseStudyCategoryMetadata,
} from "../CaseStudyCategoryView"

export const metadata: Metadata = generateCaseStudyCategoryMetadata("web")

export default function WebCaseStudiesPage() {
  return <CaseStudyCategoryView category="web" />
}
