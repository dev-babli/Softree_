import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * Draft Mode Disable API Route
 * 
 * Disables Next.js Draft Mode to return to published content.
 * 
 * URL: /api/draft-mode/disable
 * 
 * @see https://nextjs.org/docs/app/building-your-configuring/draft-mode
 */
export async function GET() {
  const draft = await draftMode()
  draft.disable()
  
  // Redirect back to the page that was being previewed
  // or default to home
  redirect('/')
}
