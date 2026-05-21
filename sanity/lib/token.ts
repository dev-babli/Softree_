/**
 * Sanity API Token
 * 
 * Validates that SANITY_API_READ_TOKEN is set.
 * This token is required for:
 * - Draft mode / preview functionality
 * - Live Content API (real-time updates)
 * - Server-side rendering with fresh data
 * 
 * ⚠️ NEVER expose this token in client bundles.
 * It's only used server-side in defineLive.
 */
export const token = process.env.SANITY_API_READ_TOKEN

if (!token && process.env.NODE_ENV === 'production') {
  throw new Error(
    'Missing SANITY_API_READ_TOKEN environment variable.\n' +
    'Get your token from: https://www.sanity.io/manage\n' +
    'Required for preview mode and live content.'
  )
}
