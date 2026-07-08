"use client"

import { CopyIcon } from "@sanity/icons"
import { useCallback } from "react"
import { type DocumentActionComponent, useClient } from "sanity"

const OMIT_KEYS = new Set([
  "_id",
  "_rev",
  "_createdAt",
  "_updatedAt",
  "_type",
])

export const DuplicateAsDraftAction: DocumentActionComponent = (props) => {
  const client = useClient({ apiVersion: "2026-05-21" })

  const onHandle = useCallback(async () => {
    const source = props.draft || props.published
    if (!source) return

    const nextDocument = Object.fromEntries(
      Object.entries(source).filter(([key]) => !OMIT_KEYS.has(key)),
    ) as Record<string, unknown>

    const title = typeof nextDocument.title === "string" ? nextDocument.title : "Untitled"

    const { slug: _removedSlug, ...rest } = nextDocument as Record<string, unknown> & {
      slug?: unknown
    }

    await client.create({
      ...rest,
      _type: props.type,
      title: `${title} (Copy)`,
      status: "archived",
    })

    props.onComplete()
  }, [client, props])

  if (!props.draft && !props.published) return null

  return {
    label: "Duplicate as copy (archived)",
    icon: CopyIcon,
    onHandle,
  }
}
