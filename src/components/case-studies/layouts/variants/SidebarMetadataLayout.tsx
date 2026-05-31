import type { CaseStudyLayoutData } from "../types"
import { SidebarMetadataPage } from "./sidebar-metadata"

export function SidebarMetadataLayout({ data }: { data: CaseStudyLayoutData }) {
  return <SidebarMetadataPage data={data} />
}
