import type { CaseStudyLayoutData } from "../types"
import { VideoHeroPage } from "./video-hero"

export function VideoHeroLayout({ data }: { data: CaseStudyLayoutData }) {
  return <VideoHeroPage data={data} />
}
