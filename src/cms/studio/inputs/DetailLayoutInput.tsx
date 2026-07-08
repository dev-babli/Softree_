"use client"

import { CheckmarkIcon, DesktopIcon, LaunchIcon } from "@sanity/icons"
import { Box, Button, Card, Flex, Grid, Stack, Text } from "@sanity/ui"
import { useCallback, useMemo, useState } from "react"
import { type StringInputProps, set, useFormValue } from "sanity"

import { CASE_STUDY_LAYOUTS } from "@/lib/case-study-layouts"
import {
  buildLayoutPreviewIframeUrl,
  buildPresentationPreviewHref,
  getSiteOrigin,
} from "@/cms/lib/studio/layoutPreview"

const DEFAULT_LAYOUT = "page-composer"

function LayoutWireframe({ layoutValue }: { layoutValue: string }) {
  const accent = "var(--card-focus-ring-color, #5a17ee)"

  if (layoutValue === "page-composer") {
    return (
      <Stack space={2} padding={2}>
        {[0, 1, 2, 3].map((i) => (
          <Box
            key={i}
            style={{
              height: i === 0 ? 12 : 10,
              borderRadius: 3,
              background: i === 0 ? "#0d0a23" : "var(--card-border-color)",
            }}
          />
        ))}
      </Stack>
    )
  }

  if (layoutValue.includes("bento") || layoutValue.includes("stats")) {
    return (
      <Grid columns={3} gap={2} padding={2}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Box
            key={i}
            style={{
              height: i === 0 ? 28 : 18,
              gridColumn: i === 0 ? "span 2" : undefined,
              borderRadius: 3,
              background: i === 0 ? accent : "var(--card-border-color)",
              opacity: i === 0 ? 0.45 : 1,
            }}
          />
        ))}
      </Grid>
    )
  }

  if (layoutValue.includes("timeline") || layoutValue.includes("vertical")) {
    return (
      <Stack space={2} padding={2}>
        {[0, 1, 2].map((i) => (
          <Flex key={i} align="center" gap={2}>
            <Box style={{ width: 8, height: 8, borderRadius: "50%", background: accent }} />
            <Box flex={1} style={{ height: 8, borderRadius: 2, background: "var(--card-border-color)" }} />
          </Flex>
        ))}
      </Stack>
    )
  }

  if (layoutValue.includes("split") || layoutValue.includes("zigzag")) {
    return (
      <Stack space={2} padding={2}>
        <Flex gap={2}>
          <Box flex={1} style={{ height: 24, borderRadius: 3, background: "var(--card-border-color)" }} />
          <Box flex={1} style={{ height: 24, borderRadius: 3, background: accent, opacity: 0.35 }} />
        </Flex>
        <Flex gap={2}>
          <Box flex={1} style={{ height: 16, borderRadius: 3, background: accent, opacity: 0.35 }} />
          <Box flex={1} style={{ height: 16, borderRadius: 3, background: "var(--card-border-color)" }} />
        </Flex>
      </Stack>
    )
  }

  return (
    <Stack space={2} padding={2}>
      <Box style={{ height: 14, borderRadius: 3, background: "#0d0a23" }} />
      <Box style={{ height: 8, width: "55%", borderRadius: 2, background: accent, opacity: 0.45 }} />
      <Grid columns={3} gap={2}>
        {[0, 1, 2].map((i) => (
          <Box key={i} style={{ height: 16, borderRadius: 3, background: "var(--card-border-color)" }} />
        ))}
      </Grid>
    </Stack>
  )
}

export default function DetailLayoutInput(props: StringInputProps) {
  const slug = useFormValue(["slug", "current"]) as string | undefined
  const savedLayout = (props.value as string | undefined) || DEFAULT_LAYOUT
  const [iframeKey, setIframeKey] = useState(0)

  const origin = getSiteOrigin()

  const previewUrl = useMemo(() => {
    if (!slug) return null
    return buildLayoutPreviewIframeUrl(slug, origin)
  }, [slug, origin])

  const presentationHref = slug ? buildPresentationPreviewHref(slug, origin) : null

  const selectLayout = useCallback(
    (value: string) => {
      props.onChange(set(value))
      setIframeKey((key) => key + 1)
    },
    [props],
  )

  return (
    <Stack space={5}>
      <Card padding={4} radius={3} tone="transparent" border>
        <Stack space={3}>
          <Text size={1} weight="semibold">
            Page layout
          </Text>
          <Text size={1} muted>
            Choose how this case study renders on the website. Page composer lets you stack sections in any order.
            Other layouts are fixed templates. Preview uses the real case study URL with your draft content.
          </Text>
        </Stack>
      </Card>

      <Grid columns={[1, 1, 2]} gap={3}>
        {CASE_STUDY_LAYOUTS.map((layout) => {
          const isSaved = savedLayout === layout.value

          return (
            <Card
              key={layout.value}
              padding={3}
              radius={3}
              border
              tone={isSaved ? "primary" : "default"}
              style={{
                cursor: "pointer",
                outline: isSaved ? "2px solid var(--card-focus-ring-color)" : undefined,
              }}
              onClick={() => selectLayout(layout.value)}
            >
              <Stack space={3}>
                <LayoutWireframe layoutValue={layout.value} />
                <Stack space={2}>
                  <Flex align="center" justify="space-between" gap={2}>
                    <Text size={1} weight="semibold">
                      {layout.title}
                    </Text>
                    {isSaved ? (
                      <Flex align="center" gap={1}>
                        <CheckmarkIcon />
                        <Text size={0} muted>
                          Selected
                        </Text>
                      </Flex>
                    ) : null}
                  </Flex>
                  <Text size={1} muted>
                    {layout.description}
                  </Text>
                  <Button
                    fontSize={1}
                    mode={isSaved ? "default" : "ghost"}
                    tone="primary"
                    text={isSaved ? "Selected layout" : "Use this layout"}
                    onClick={(event) => {
                      event.stopPropagation()
                      selectLayout(layout.value)
                    }}
                  />
                </Stack>
              </Stack>
            </Card>
          )
        })}
      </Grid>

      <Card padding={4} radius={3} border>
        <Stack space={4}>
          <Flex align="center" justify="space-between" gap={3} wrap="wrap">
            <Stack space={2}>
              <Flex align="center" gap={2}>
                <DesktopIcon />
                <Text size={1} weight="semibold">
                  Live layout preview
                </Text>
              </Flex>
              <Text size={1} muted>
                {slug
                  ? `Showing "${CASE_STUDY_LAYOUTS.find((l) => l.value === savedLayout)?.title || savedLayout}" at /case-studies/${slug}.`
                  : "Add a slug before previewing."}
              </Text>
            </Stack>
            <Flex gap={2} wrap="wrap">
              <Button
                fontSize={1}
                mode="ghost"
                text="Refresh preview"
                disabled={!previewUrl}
                onClick={() => setIframeKey((key) => key + 1)}
              />
              {presentationHref ? (
                <Button
                  as="a"
                  fontSize={1}
                  icon={LaunchIcon}
                  mode="ghost"
                  href={presentationHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  text="Open in new tab"
                />
              ) : null}
            </Flex>
          </Flex>

          {!slug ? (
            <Card padding={4} radius={2} tone="caution">
              <Text size={1}>Set a document slug to enable layout preview.</Text>
            </Card>
          ) : previewUrl ? (
            <Box
              style={{
                border: "1px solid var(--card-border-color)",
                borderRadius: 12,
                overflow: "hidden",
                background: "#0d0a23",
              }}
            >
              <iframe
                key={iframeKey}
                title="Case study layout preview"
                src={previewUrl}
                style={{
                  display: "block",
                  width: "100%",
                  height: "min(72vh, 900px)",
                  border: 0,
                  background: "#fff",
                }}
              />
            </Box>
          ) : null}
        </Stack>
      </Card>
    </Stack>
  )
}
