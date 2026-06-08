import type { Metadata } from "next"
import CaseStudyCategoryView, {
  generateCaseStudyCategoryMetadata,
} from "../CaseStudyCategoryView"

export const metadata: Metadata = generateCaseStudyCategoryMetadata("sharepoint")

export default function SharePointCaseStudiesPage() {
  return <CaseStudyCategoryView category="sharepoint" />
}
