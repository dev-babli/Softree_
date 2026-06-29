"use client"

import { SparklesIcon } from "@sanity/icons"
import { useCallback } from "react"
import { type DocumentActionComponent, useClient } from "sanity"

import { extractBlocksFromStory } from "@/sanity/lib/extractBlocks"

export const GenerateBlocksFromStoryAction: DocumentActionComponent = (props) => {
  const client = useClient({ apiVersion: "2026-05-21" })

  const onHandle = useCallback(async () => {
    const source = props.draft || props.published
    if (!source) return

    const extracted = extractBlocksFromStory({
      client: typeof source.client === "string" ? source.client : undefined,
      title: typeof source.title === "string" ? source.title : undefined,
      challengeContent: source.challengeContent as Parameters<
        typeof extractBlocksFromStory
      >[0]["challengeContent"],
      approachContent: source.approachContent as Parameters<
        typeof extractBlocksFromStory
      >[0]["approachContent"],
      outcomeContent: source.outcomeContent as Parameters<
        typeof extractBlocksFromStory
      >[0]["outcomeContent"],
      highlights: source.highlights as Parameters<
        typeof extractBlocksFromStory
      >[0]["highlights"],
      metrics: source.metrics as Parameters<typeof extractBlocksFromStory>[0]["metrics"],
      challengeCards: source.challengeCards as Parameters<
        typeof extractBlocksFromStory
      >[0]["challengeCards"],
      deliverables: source.deliverables as Parameters<
        typeof extractBlocksFromStory
      >[0]["deliverables"],
      ctaHeadline: typeof source.ctaHeadline === "string" ? source.ctaHeadline : undefined,
      ctaSubtext: typeof source.ctaSubtext === "string" ? source.ctaSubtext : undefined,
      ctaButtonText: typeof source.ctaButtonText === "string" ? source.ctaButtonText : undefined,
    })

    await client
      .patch(props.id)
      .set({
        challengeCards: extracted.challengeCards,
        deliverables: extracted.deliverables,
        metrics: extracted.metrics,
        ctaHeadline: extracted.ctaHeadline,
        ctaSubtext: extracted.ctaSubtext,
        ctaButtonText: extracted.ctaButtonText,
      })
      .commit()

    props.onComplete()
  }, [client, props])

  if (!props.draft && !props.published) return null
  if (props.type !== "caseStudy") return null

  return {
    label: "Extract blocks from story (auto-fill)",
    icon: SparklesIcon,
    onHandle,
  }
}
