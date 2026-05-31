import type { CaseStudyLayoutData } from "../types"
import { ZigzagAlternatingPage } from "./zigzag-alternating"

export function ZigzagAlternatingLayout({ data }: { data: CaseStudyLayoutData }) {
  return <ZigzagAlternatingPage data={data} />
}
