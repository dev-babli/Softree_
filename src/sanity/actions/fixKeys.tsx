"use client"

import { RevertIcon } from "@sanity/icons"
import { useCallback } from "react"
import { type DocumentActionComponent, useClient } from "sanity"

function randomKey(): string {
  return Math.random().toString(36).slice(2, 10)
}

function addMissingKeys(value: unknown): { next: unknown; changed: boolean } {
  if (Array.isArray(value)) {
    let changed = false
    const next = value.map((item) => {
      if (item && typeof item === "object" && !Array.isArray(item)) {
        const record = item as Record<string, unknown>
        let withKey = record
        if (!record._key) {
          withKey = { ...record, _key: randomKey() }
          changed = true
        }
        const nested = addMissingKeys(withKey)
        if (nested.changed) changed = true
        return nested.next
      }
      return item
    })
    return { next, changed }
  }

  if (value && typeof value === "object") {
    let changed = false
    const record = value as Record<string, unknown>
    const next: Record<string, unknown> = { ...record }
    for (const [key, child] of Object.entries(record)) {
      if (key.startsWith("_")) continue
      const nested = addMissingKeys(child)
      if (nested.changed) {
        next[key] = nested.next
        changed = true
      }
    }
    return { next, changed }
  }

  return { next: value, changed: false }
}

export const FixKeysAction: DocumentActionComponent = (props) => {
  const client = useClient({ apiVersion: "2026-05-21" })

  const onHandle = useCallback(async () => {
    const source = props.draft || props.published
    if (!source) return

    const { next, changed } = addMissingKeys(source)
    if (!changed) {
      props.onComplete()
      return
    }

    await client.patch(props.id).set(next as Record<string, unknown>).commit()
    props.onComplete()
  }, [client, props])

  if (props.type !== "post" && props.type !== "caseStudy") return null
  if (!props.draft && !props.published) return null

  return {
    label: "Fix missing array keys",
    icon: RevertIcon,
    onHandle,
    title: "Add _key to array items missing keys (helps Portable Text and reordering)",
  }
}
