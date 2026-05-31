"use client"

import { SparklesIcon } from "@sanity/icons"
import { useCallback } from "react"
import { type DocumentActionComponent, useClient } from "sanity"

function truncate(text: string, max: number): string {
  const trimmed = text.trim()
  if (trimmed.length <= max) return trimmed
  return `${trimmed.slice(0, max - 1).trimEnd()}…`
}

export const GenerateSeoFromContentAction: DocumentActionComponent = (props) => {
  const client = useClient({ apiVersion: "2026-05-21" })

  const onHandle = useCallback(async () => {
    const source = props.draft || props.published
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

    await client
      .patch(props.id)
      .set({ metaTitle, metaDescription })
      .commit()

    props.onComplete()
  }, [client, props])

  if (!props.draft && !props.published) return null
  if (props.type !== "post" && props.type !== "caseStudy" && props.type !== "marketingPage") {
    return null
  }

  return {
    label: "Generate SEO from content",
    icon: SparklesIcon,
    onHandle,
  }
}
