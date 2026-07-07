"use client"

import { SparklesIcon } from "@sanity/icons"
import { useCallback } from "react"
import { type DocumentActionComponent, useClient } from "sanity"

function truncate(text: string, max: number): string {
  const trimmed = text.trim()
  if (trimmed.length <= max) return trimmed
  return `${trimmed.slice(0, max - 1).trimEnd()}…`
}

function suggestCoverAlt(source: Record<string, unknown>): string | undefined {
  const client = typeof source.client === "string" ? source.client.trim() : ""
  const title = typeof source.title === "string" ? source.title.trim() : ""
  const industry = typeof source.industry === "string" ? source.industry.trim() : ""
  const parts = [client, title, industry ? `${industry} case study` : "case study"].filter(Boolean)
  const alt = parts.join(" — ")
  return alt ? truncate(alt, 125) : undefined
}

export const GenerateSeoFromContentAction: DocumentActionComponent = (props) => {
  const client = useClient({ apiVersion: "2026-05-21" })

  const onHandle = useCallback(async () => {
    const source = (props.draft || props.published) as Record<string, unknown> | null
    if (!source) return

    const title = typeof source.title === "string" ? source.title : ""
    const excerpt = typeof source.excerpt === "string" ? source.excerpt : ""
    const clientName = typeof source.client === "string" ? source.client : ""
    const metaTitle =
      (typeof source.metaTitle === "string" && source.metaTitle) ||
      truncate(clientName ? `${clientName} — ${title}` : title, 60)
    const metaDescription =
      (typeof source.metaDescription === "string" && source.metaDescription) ||
      truncate(excerpt, 160)

    const patch: Record<string, unknown> = { metaTitle, metaDescription }

    const mainImage = source.mainImage as { asset?: { _ref?: string }; alt?: string } | undefined
    if (mainImage?.asset?._ref && !mainImage.alt?.trim()) {
      const alt = suggestCoverAlt(source)
      if (alt) {
        patch['mainImage.alt'] = alt
      }
    }

    await client.patch(props.id).set(patch).commit()

    props.onComplete()
  }, [client, props])

  if (!props.draft && !props.published) return null
  if (props.type !== "post" && props.type !== "caseStudy" && props.type !== "marketingPage") {
    return null
  }

  return {
    label: "Fill SEO & cover alt from story",
    icon: SparklesIcon,
    onHandle,
  }
}
