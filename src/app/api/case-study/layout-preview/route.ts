import { NextRequest } from "next/server"

import { handleStudioPreviewEnter } from "@/lib/studio-preview"

/** @deprecated Use /api/preview/enter?path=/case-studies/{slug} */
export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug")?.trim()
  if (!slug) {
    return handleStudioPreviewEnter(request)
  }

  const url = new URL(request.url)
  url.pathname = "/api/preview/enter"
  url.searchParams.delete("slug")
  url.searchParams.set("path", `/case-studies/${slug}`)

  return handleStudioPreviewEnter(new NextRequest(url, request))
}
