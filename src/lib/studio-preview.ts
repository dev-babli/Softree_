import { draftMode } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

import { buildCaseStudyPreviewPath } from "@/sanity/lib/layoutPreview"

export function isStudioPreviewRequest(request: NextRequest): boolean {
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

function normalizePreviewPath(path: string): string | null {
  const trimmed = path.trim()
  if (!trimmed.startsWith("/")) return null
  if (trimmed.startsWith("//")) return null
  return trimmed
}

export async function handleStudioPreviewEnter(request: NextRequest) {
  if (!isStudioPreviewRequest(request)) {
    return NextResponse.json({ error: "Preview is only available from Sanity Studio." }, { status: 403 })
  }

  const pathParam = request.nextUrl.searchParams.get("path")?.trim()
  const legacySlug = request.nextUrl.searchParams.get("slug")?.trim()

  const redirectPath = pathParam
    ? normalizePreviewPath(pathParam)
    : legacySlug
      ? buildCaseStudyPreviewPath(legacySlug)
      : null

  if (!redirectPath) {
    return NextResponse.json({ error: "Missing or invalid path parameter." }, { status: 400 })
  }

  const draft = await draftMode()
  draft.enable()

  return NextResponse.redirect(new URL(redirectPath, request.url))
}
