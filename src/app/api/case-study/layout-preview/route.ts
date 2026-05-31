import { draftMode } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

import { buildCaseStudyPreviewPath, CLASSIC_LAYOUT_VALUE } from "@/sanity/lib/layoutPreview"

function isStudioPreviewRequest(request: NextRequest): boolean {
  const referer = request.headers.get("referer") || ""
  const origin = request.headers.get("origin") || ""

  if (referer.includes("/studio")) return true
  if (origin.includes("/studio")) return true

  const host = request.headers.get("host") || ""
  if (host.startsWith("localhost") || host.startsWith("127.0.0.1")) return true

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  if (siteUrl && referer.startsWith(siteUrl) && referer.includes("/studio")) return true

  return false
}

export async function GET(request: NextRequest) {
  if (!isStudioPreviewRequest(request)) {
    return NextResponse.json({ error: "Preview is only available from Sanity Studio." }, { status: 403 })
  }

  const slug = request.nextUrl.searchParams.get("slug")?.trim()
  if (!slug) {
    return NextResponse.json({ error: "Missing slug parameter." }, { status: 400 })
  }

  const layout = request.nextUrl.searchParams.get("layout")?.trim() || CLASSIC_LAYOUT_VALUE
  const draft = await draftMode()
  draft.enable()

  const redirectPath = buildCaseStudyPreviewPath(slug, layout)
  return NextResponse.redirect(new URL(redirectPath, request.url))
}
