import type { CaseStudyLayoutData } from "../types"
import { ParallaxScreenshotsPage } from "./parallax-screenshots"

export function ParallaxScreenshotsLayout({ data }: { data: CaseStudyLayoutData }) {
  return <ParallaxScreenshotsPage data={data} />
}
