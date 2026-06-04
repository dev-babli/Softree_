import { documentEventHandler } from '@sanity/functions'

type PublishEvent = {
  _id: string
  _type: string
  title?: string
  client?: string
  status?: string
  reviewStatus?: string
  slug?: { current?: string }
}

function siteOrigin(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://www.softreetechnology.com'
}

function studioBase(): string {
  return process.env.SANITY_STUDIO_URL || `${siteOrigin()}/studio`
}

function presentationPath(body: PublishEvent): string | null {
  const slug = body.slug?.current
  if (!slug) return null
  if (body._type === 'post') return `/blog/${slug}`
  if (body._type === 'caseStudy') return `/case-studies/${slug}`
  if (body._type === 'marketingPage') return `/p/${slug}`
  return null
}

export const handler = documentEventHandler<PublishEvent>(async ({ event }) => {
  const { data } = event
  if (data.status !== 'published') return
  if (data.reviewStatus && data.reviewStatus !== 'approved') return
  if (!['post', 'caseStudy', 'marketingPage'].includes(data._type)) return

  const webhookUrl = process.env.SLACK_WEBHOOK_URL
  if (!webhookUrl) return

  const label =
    data.client && data.title ? `${data.client} — ${data.title}` : data.title || data._type
  const id = data._id.replace(/^drafts\./, '')
  const editUrl = `${studioBase()}/intent/edit/id=${encodeURIComponent(id)};type=${data._type}`
  const path = presentationPath(data)
  const previewUrl = path
    ? `${studioBase()}/presentation?preview=${encodeURIComponent(`${siteOrigin()}${path}`)}`
    : null

  const lines = [
    `*Published:* ${label}`,
    `*Type:* ${data._type}`,
    `<${editUrl}|Open in Studio>`,
    previewUrl ? `<${previewUrl}|Open in Presentation>` : null,
  ].filter(Boolean)

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: lines.join('\n') }),
  })
})
