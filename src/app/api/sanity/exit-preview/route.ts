/**
 * Exit Preview Mode API Route
 * 
 * Disables draft mode and returns to published content.
 */

import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET() {
  const draft = await draftMode()
  draft.disable()
  redirect('/')
}
