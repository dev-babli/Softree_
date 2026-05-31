"use client"

import { WarningOutlineIcon } from "@sanity/icons"
import { Card, Flex, Stack, Text } from "@sanity/ui"
import { useMemo } from "react"
import { useFormValue } from "sanity"

import { isPremiumLayout } from "@/lib/case-study-layouts"
import { CLASSIC_LAYOUT_VALUE } from "@/sanity/lib/layoutPreview"

type Warning = {
  field: string
  message: string
}

function countBlocks(value: unknown): number {
  return Array.isArray(value) ? value.length : 0
}

function analyzeReadiness(doc: Record<string, unknown>): Warning[] {
  const warnings: Warning[] = []
  const layout = (doc.detailLayout as string | undefined) || CLASSIC_LAYOUT_VALUE
  const premium = isPremiumLayout(layout === CLASSIC_LAYOUT_VALUE ? undefined : layout)

  if (!doc.client) {
    warnings.push({
      field: "client",
      message: "Client name is empty — the hero will fall back to the document title.",
    })
  }

  if (!doc.headerTitle) {
    warnings.push({
      field: "headerTitle",
      message: "Header title is empty — the hero subtitle area will be blank on the classic layout.",
    })
  }

  if (!doc.excerpt) {
    warnings.push({ field: "excerpt", message: "Excerpt is missing — listing cards and SEO will use fallbacks." })
  }

  const hasStory =
    countBlocks(doc.challengeContent) > 0 ||
    countBlocks(doc.approachContent) > 0 ||
    countBlocks(doc.outcomeContent) > 0 ||
    countBlocks(doc.body) > 0

  if (!hasStory) {
    warnings.push({
      field: "story",
      message: "No story sections filled — the page body will look empty.",
    })
  }

  const mainImage = doc.mainImage as { asset?: { _ref?: string } } | undefined
  if (!mainImage?.asset?._ref && !doc.mainImageUrl) {
    warnings.push({
      field: "mainImage",
      message: "No cover image — hero and social previews will show placeholders.",
    })
  }

  const highlights = doc.highlights as unknown[] | undefined
  if (!highlights?.length && !doc.metrics) {
    warnings.push({
      field: "highlights",
      message: "No hero highlights or metrics — premium layouts will show demo stat placeholders.",
    })
  }

  if (premium) {
    const challengeCards = doc.challengeCards as unknown[] | undefined
    if (!challengeCards?.length) {
      warnings.push({
        field: "challengeCards",
        message: `Premium layout "${layout}" will show demo challenge cards until you add 3 cards.`,
      })
    }

    const solutionArchitecture = doc.solutionArchitecture as unknown[] | undefined
    if (!solutionArchitecture?.length) {
      warnings.push({
        field: "solutionArchitecture",
        message: "Solution architecture nodes missing — preview uses demo technology stack nodes.",
      })
    }

    const deliverables = doc.deliverables as unknown[] | undefined
    if (!deliverables?.length) {
      warnings.push({
        field: "deliverables",
        message: "Deliverables missing — preview fills in demo deliverable cards.",
      })
    }

    const gallery = doc.gallery as unknown[] | undefined
    const galleryUrls = doc.galleryUrls as unknown[] | undefined
    if (!gallery?.length && !galleryUrls?.length && !mainImage?.asset?._ref && !doc.mainImageUrl) {
      warnings.push({
        field: "gallery",
        message: "Gallery empty — screenshot sections will repeat the cover image as placeholders.",
      })
    }

    const beforeAfter = doc.beforeAfter as unknown[] | undefined
    if (!beforeAfter?.length && layout === "before-after-table") {
      warnings.push({
        field: "beforeAfter",
        message: "Before/After rows missing — comparison table will show demo metrics.",
      })
    }

    if (layout === "video-hero" && !doc.videoUrl) {
      warnings.push({
        field: "videoUrl",
        message: "Video Hero layout selected but no hero video URL — background video will be absent.",
      })
    }
  }

  return warnings
}

export default function LayoutReadinessPanel() {
  const document = useFormValue([]) as Record<string, unknown> | undefined
  const layout = (document?.detailLayout as string | undefined) || CLASSIC_LAYOUT_VALUE

  const warnings = useMemo(
    () => (document ? analyzeReadiness(document) : []),
    [document],
  )

  if (!document) return null

  return (
    <Card padding={4} radius={3} tone={warnings.length ? "caution" : "positive"} border>
      <Stack space={4}>
        <Flex align="center" gap={2}>
          {warnings.length ? <WarningOutlineIcon /> : null}
          <Text size={1} weight="semibold">
            Layout readiness
          </Text>
        </Flex>
        <Text size={1} muted>
          {warnings.length
            ? `The preview may include demo/placeholder content for "${layout}" until these are addressed:`
            : `Content looks ready for "${layout}". Preview should match what visitors will see.`}
        </Text>
        {warnings.length > 0 ? (
          <Stack space={3}>
            {warnings.map((warning) => (
              <Card key={warning.field} padding={3} radius={2} tone="caution" border>
                <Text size={1} weight="medium">
                  {warning.field}
                </Text>
                <Text size={1} muted style={{ marginTop: 4 }}>
                  {warning.message}
                </Text>
              </Card>
            ))}
          </Stack>
        ) : null}
      </Stack>
    </Card>
  )
}
