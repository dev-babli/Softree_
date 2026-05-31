import type { CaseStudyLayoutData } from "../types"
import { BeforeAfterTablePage } from "./before-after-table"

export function BeforeAfterTableLayout({ data }: { data: CaseStudyLayoutData }) {
  return <BeforeAfterTablePage data={data} />
}
