import type { Metadata } from "next"
import CaseStudyCategoryView, {
  generateCaseStudyCategoryMetadata,
} from "../CaseStudyCategoryView"

export const metadata: Metadata = generateCaseStudyCategoryMetadata("power-platform")

export default function PowerPlatformCaseStudiesPage() {
  return <CaseStudyCategoryView category="power-platform" />
}
