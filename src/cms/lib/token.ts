import 'server-only'

/** Read token for draft/live preview — optional during static build */
export const cmsReadToken = process.env.SANITY_API_READ_TOKEN
