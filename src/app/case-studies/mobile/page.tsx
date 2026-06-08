import type { Metadata } from "next"
import CaseStudyCategoryView, {
  generateCaseStudyCategoryMetadata,
} from "../CaseStudyCategoryView"

export const metadata: Metadata = generateCaseStudyCategoryMetadata("mobile")

export default function MobileCaseStudiesPage() {
  return <CaseStudyCategoryView category="mobile" />
}
