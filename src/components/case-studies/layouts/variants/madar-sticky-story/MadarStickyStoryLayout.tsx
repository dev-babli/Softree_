import type { CaseStudyLayoutData } from "../../types"
import { mapMadarCaseStudyData } from "./mapMadarCaseStudyData"
import { MadarStickyStoryPage } from "./MadarStickyStoryPage"

/** Madar × Yamama sticky parallax case study — Vide Infra reference layout */
export function MadarStickyStoryLayout({ data }: { data: CaseStudyLayoutData }) {
  const madarData = mapMadarCaseStudyData(data)
  return <MadarStickyStoryPage data={madarData} />
}
