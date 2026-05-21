/**
 * Sanity Preview API Route
 * 
 * Enables draft mode for previewing unpublished content.
 * This is used by the Sanity Studio "Preview" button.
 */

import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const type = searchParams.get('type')

  // Validate the preview secret
  if (!secret || secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 })
  }

  // Validate slug to prevent open redirect / path traversal
  const SLUG_RE = /^[a-zA-Z0-9\-/_]+$/
  if (slug && !SLUG_RE.test(slug)) {
    return new Response('Invalid slug', { status: 400 })
  }

  // Whitelist allowed document types
  const ALLOWED_TYPES = ['service', 'caseStudy', 'blogPost', 'page']
  if (type && !ALLOWED_TYPES.includes(type)) {
    return new Response('Invalid type', { status: 400 })
  }

  // Enable draft mode
  const draft = await draftMode()
  draft.enable()

  // Map document types to frontend routes
  const routeMap: Record<string, (slug: string) => string> = {
    service: (s) => `/services/${s}`,
    caseStudy: (s) => `/case-studies/${s}`,
    blogPost: (s) => `/blog/${s}`,
    page: (s) => `/${s}`,
  }

  // Redirect to the preview page
  if (type && slug && routeMap[type]) {
    redirect(routeMap[type](slug))
  }

  // Fallback to homepage
  redirect('/')
}
