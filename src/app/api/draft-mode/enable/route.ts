import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

/**
 * Draft Mode Enable API Route
 * 
 * Enables Next.js Draft Mode for previewing unpublished content.
 * This is the standard pattern for Sanity Presentation Tool integration.
 * 
 * URL: /api/draft-mode/enable?slug=<path>&type=<documentType>
 * 
 * @see https://nextjs.org/docs/app/building-your-configuring/draft-mode
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const slug = searchParams.get('slug')
  const type = searchParams.get('type')

  // Validate secret to prevent unauthorized access
  const secret = searchParams.get('secret')
  if (!secret || secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 })
  }

  // Validate slug to prevent open redirect / path traversal
  const SLUG_RE = /^[a-zA-Z0-9\-/_]+$/
  if (slug && !SLUG_RE.test(slug)) {
    return new Response('Invalid slug', { status: 400 })
  }

  // Enable draft mode
  const draft = await draftMode()
  draft.enable()

  // Redirect to the requested path, or default to home
  if (slug) {
    redirect(`/${slug}`)
  }

  redirect('/')
}
