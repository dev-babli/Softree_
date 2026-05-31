"use client"

import { DesktopIcon, RefreshIcon } from "@sanity/icons"
import { Box, Button, Card, Flex, Spinner, Text } from "@sanity/ui"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { UserViewComponent } from "sanity/structure"

import { hydrateCaseStudyForPreview } from "@/sanity/lib/hydrateCaseStudyPreview"
import { CLASSIC_LAYOUT_VALUE, getSiteOrigin, LAYOUT_PREVIEW_OPTIONS } from "@/sanity/lib/layoutPreview"

const DEBOUNCE_MS = 400

export const CaseStudyLivePreviewPane: UserViewComponent = (props) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [frameReady, setFrameReady] = useState(false)
  const [iframeKey, setIframeKey] = useState(0)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const previewOrigin = getSiteOrigin()
  const previewSrc = `${previewOrigin}/case-studies/preview`

  const displayed = props.document?.displayed as Record<string, unknown> | undefined
  const layout = (displayed?.detailLayout as string | undefined) || CLASSIC_LAYOUT_VALUE
  const layoutTitle =
    LAYOUT_PREVIEW_OPTIONS.find((option) => option.value === layout)?.title || layout

  const payload = useMemo(() => {
    if (!displayed) return null
    return hydrateCaseStudyForPreview(displayed)
  }, [displayed])

  const pushPreview = useCallback(() => {
    if (!frameReady || !payload || !iframeRef.current?.contentWindow) return
    iframeRef.current.contentWindow.postMessage(
      {
        type: "CASE_STUDY_PREVIEW_UPDATE",
        study: payload,
        layout,
      },
      previewOrigin,
    )
    setLastUpdated(new Date())
  }, [frameReady, payload, layout, previewOrigin])

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== new URL(previewOrigin).origin) return
      if (event.data?.type === "CASE_STUDY_PREVIEW_READY") {
        setFrameReady(true)
      }
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [previewOrigin])

  useEffect(() => {
    if (!frameReady) return
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(pushPreview, DEBOUNCE_MS)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [frameReady, pushPreview])

  const refresh = useCallback(() => {
    setFrameReady(false)
    setIframeKey((key) => key + 1)
  }, [])

  return (
    <Flex direction="column" style={{ height: "100%", minHeight: 0 }}>
      <Card padding={3} borderBottom tone="transparent">
        <Flex align="center" justify="space-between" gap={3} wrap="wrap">
          <Flex align="center" gap={2}>
            <DesktopIcon />
            <Text size={1} weight="semibold">
              Live preview
            </Text>
            {!frameReady ? <Spinner muted /> : null}
          </Flex>
          <Flex align="center" gap={3}>
            <Text size={1} muted>
              {layoutTitle}
              {lastUpdated
                ? ` · updated ${lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}`
                : ""}
            </Text>
            <Button
              fontSize={1}
              icon={RefreshIcon}
              mode="ghost"
              text="Refresh"
              onClick={refresh}
            />
          </Flex>
        </Flex>
        <Text size={1} muted style={{ marginTop: 8 }}>
          Changes appear here as you type — no save required. Switch layouts in the Content pane to
          compare variants.
        </Text>
      </Card>

      <Box flex={1} style={{ minHeight: 0, background: "#0d0a23" }}>
        <iframe
          key={iframeKey}
          ref={iframeRef}
          title="Case study live preview"
          src={previewSrc}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            border: 0,
            background: "#fff",
          }}
        />
      </Box>
    </Flex>
  )
}
