/**
 * Publish notification helpers for Sanity webhooks.
 *
 * Required env vars (all optional — notifications are skipped when unset):
 * - SLACK_WEBHOOK_URL — Incoming webhook for Slack publish alerts
 * - NEXT_PUBLIC_SITE_URL — Public site origin (defaults to production URL)
 * - SANITY_STUDIO_URL — Full Studio URL override (defaults to {site}/studio)
 */

type PublishNotificationPayload = {
  _type?: string
  _id?: string
  title?: string
  client?: string
  status?: string
  reviewStatus?: string
  slug?: { current?: string }
  category?: string
}

function siteOrigin(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_VERCEL_URL?.replace(/^/, "https://") ||
    "https://www.softreetechnology.com"
  )
}

function studioBase(): string {
  return process.env.SANITY_STUDIO_URL || `${siteOrigin()}/studio`
}

function documentLabel(body: PublishNotificationPayload): string {
  if (body.client && body.title) return `${body.client} — ${body.title}`
  return body.title || body.client || body._type || "Content"
}

function presentationPath(body: PublishNotificationPayload): string | null {
  const slug = body.slug?.current
  if (!slug) return null
  if (body._type === "post") return `/blog/${slug}`
  if (body._type === "caseStudy") return `/case-studies/${slug}`
  if (body._type === "marketingPage") return `/p/${slug}`
  return null
}

function studioEditUrl(body: PublishNotificationPayload): string | null {
  if (!body._id || !body._type) return null
  const id = body._id.replace(/^drafts\./, "")
  return `${studioBase()}/intent/edit/id=${encodeURIComponent(id)};type=${body._type}`
}

function presentationUrl(body: PublishNotificationPayload): string | null {
  const path = presentationPath(body)
  if (!path) return null
  return `${studioBase()}/presentation?preview=${encodeURIComponent(`${siteOrigin()}${path}`)}`
}

export function shouldNotifyPublish(body: PublishNotificationPayload): boolean {
  if (body.status !== "published") return false
  if (body.reviewStatus && body.reviewStatus !== "approved") return false
  return Boolean(body._type && ["post", "caseStudy", "marketingPage"].includes(body._type))
}

export async function notifyPublish(body: PublishNotificationPayload): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL
  if (!webhookUrl) return
  if (!shouldNotifyPublish(body)) return

  const label = documentLabel(body)
  const editUrl = studioEditUrl(body)
  const previewUrl = presentationUrl(body)

  const lines = [
    `*Published:* ${label}`,
    `*Type:* ${body._type}`,
    editUrl ? `<${editUrl}|Open in Studio>` : null,
    previewUrl ? `<${previewUrl}|Open in Presentation>` : null,
  ].filter(Boolean)

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: lines.join("\n") }),
  })
}
