import type { CaseStudyLayoutData } from "../types"
import { SplitHeroMockupPage } from "./split-hero-mockup"

export function SplitHeroMockupLayout({ data }: { data: CaseStudyLayoutData }) {
  return <SplitHeroMockupPage data={data} />
}
