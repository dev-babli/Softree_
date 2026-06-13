"use client"

import { DesktopIcon, LaunchIcon, RefreshIcon } from "@sanity/icons"
import { Box, Button, Flex, Spinner, Text } from "@sanity/ui"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { UserViewComponent } from "sanity/structure"

import { hydrateCaseStudyForPreview } from "@/sanity/lib/hydrateCaseStudyPreview"
import {
  buildBlogPreviewPath,
  buildPresentationPreviewHref,
  buildStudioPreviewEnterUrl,
  getSiteOrigin,
} from "@/sanity/lib/layoutPreview"

const STORY_TYPE_OPTIONS = [
  { value: "standard", title: "Standard Story" },
  { value: "transformation", title: "Transformation Epic" },
  { value: "product-showcase", title: "Product Showcase" },
]

const DEBOUNCE_MS = 400

export const CaseStudyLivePreviewPane: UserViewComponent = (props) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [frameReady, setFrameReady] = useState(false)
  const [iframeKey, setIframeKey] = useState(0)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const previewOrigin = getSiteOrigin()

  const displayed = props.document?.displayed as Record<string, unknown> | undefined
  const docType = (displayed?._type as string | undefined) || props.schemaType || "caseStudy"
  const isPost = docType === "post"
  const slug = (displayed?.slug as { current?: string } | undefined)?.current?.trim()
  const detailLayout = (displayed?.detailLayout as string | undefined) || ""
  const layout =
    detailLayout === "page-composer"
      ? "page-composer"
      : detailLayout === "manufacturing-power-platform"
        ? "manufacturing-power-platform"
        : (displayed?.storyType as string | undefined) || "standard"
  const layoutTitle =
    isPost
      ? (displayed?.displayMode as string | undefined) === "composer"
        ? "Blog · page composer"
        : "Blog · classic article"
      : detailLayout === "page-composer"
        ? "Page composer"
        : detailLayout === "manufacturing-power-platform"
          ? "Manufacturing layout"
          : STORY_TYPE_OPTIONS.find((option) => option.value === layout)?.title || layout

  const usesRealSlugPreview = Boolean(slug)
  const previewPath = isPost
    ? slug
      ? buildBlogPreviewPath(slug)
      : null
    : slug
      ? `/case-studies/${slug}`
      : null
  const previewSrc = previewPath
    ? buildStudioPreviewEnterUrl(previewPath, previewOrigin)
    : isPost
      ? null
      : `${previewOrigin}/case-studies/preview`

  const openInNewTabHref = previewPath
    ? buildStudioPreviewEnterUrl(previewPath, previewOrigin)
    : !isPost && slug
      ? buildPresentationPreviewHref(slug, previewOrigin)
      : null

  const payload = useMemo(() => {
    if (isPost || !displayed || usesRealSlugPreview) return null
    return hydrateCaseStudyForPreview(displayed)
  }, [displayed, isPost, usesRealSlugPreview])

  const pushPreview = useCallback(() => {
    if (isPost || usesRealSlugPreview || !frameReady || !payload || !iframeRef.current?.contentWindow) return
    iframeRef.current.contentWindow.postMessage(
      {
        type: "CASE_STUDY_PREVIEW_UPDATE",
        study: payload,
        layout,
      },
      previewOrigin,
    )
    setLastUpdated(new Date())
  }, [isPost, usesRealSlugPreview, frameReady, payload, layout, previewOrigin])

  useEffect(() => {
    if (usesRealSlugPreview || isPost) {
      setFrameReady(true)
      return
    }

    const allowedOrigins = [new URL(previewOrigin).origin, window.location.origin].filter(
      (o, i, arr) => arr.indexOf(o) === i,
    )
    const onMessage = (event: MessageEvent) => {
      if (!allowedOrigins.includes(event.origin)) return
      if (event.data?.type === "CASE_STUDY_PREVIEW_READY") {
        setFrameReady(true)
      }
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [previewOrigin, usesRealSlugPreview, isPost])

  useEffect(() => {
    if (isPost || usesRealSlugPreview || !frameReady) return
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(pushPreview, DEBOUNCE_MS)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [isPost, usesRealSlugPreview, frameReady, pushPreview, displayed])

  useEffect(() => {
    if ((!usesRealSlugPreview && !isPost) || !frameReady || !previewSrc) return
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      try {
        iframeRef.current?.contentWindow?.location.reload()
      } catch {
        setIframeKey((key) => key + 1)
      }
      setLastUpdated(new Date())
    }, DEBOUNCE_MS)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [usesRealSlugPreview, isPost, frameReady, previewSrc, displayed])

  const refresh = useCallback(() => {
    if (!usesRealSlugPreview && !isPost) setFrameReady(false)
    setIframeKey((key) => key + 1)
    setLastUpdated(new Date())
  }, [usesRealSlugPreview, isPost])

  if (isPost && !previewSrc) {
    return (
      <Flex direction="column" className="softree-preview-pane" style={{ height: "100%", padding: 24 }}>
        <Text size={2} weight="semibold">
          Live preview
        </Text>
        <Text size={1} muted style={{ marginTop: 12, maxWidth: "28rem", lineHeight: 1.6 }}>
          Add a slug in the Content tab to preview this post with draft mode. Until then, use
          Presentation from the top bar for a site-wide preview.
        </Text>
        <Box marginTop={4}>
          <Button
            as="a"
            fontSize={1}
            icon={LaunchIcon}
            mode="default"
            href="/studio/presentation"
            text="Open Presentation"
          />
        </Box>
      </Flex>
    )
  }

  return (
    <Flex direction="column" className="softree-preview-pane" style={{ height: "100%", minHeight: 0 }}>
      <div className="softree-preview-pane__toolbar">
        <Flex align="center" justify="space-between" gap={3} wrap="wrap">
          <Flex align="center" gap={2}>
            <DesktopIcon />
            <span className="softree-preview-pane__title">Live preview</span>
            {!frameReady ? <Spinner muted /> : null}
          </Flex>
          <Flex align="center" gap={3}>
            <span className="softree-preview-pane__meta">
              {layoutTitle}
              {slug
                ? isPost
                  ? ` · /blog/${slug}`
                  : ` · /case-studies/${slug}`
                : " · draft (no slug)"}
              {lastUpdated
                ? ` · updated ${lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}`
                : ""}
            </span>
            <Button
              fontSize={1}
              icon={RefreshIcon}
              mode="ghost"
              text="Refresh"
              onClick={refresh}
            />
            {openInNewTabHref ? (
              <Button
                as="a"
                fontSize={1}
                icon={LaunchIcon}
                mode="ghost"
                href={openInNewTabHref}
                target="_blank"
                rel="noopener noreferrer"
                text="Open in new tab"
              />
            ) : null}
          </Flex>
        </Flex>
        <Text size={1} muted style={{ marginTop: 8 }}>
          {usesRealSlugPreview
            ? isPost
              ? "Previewing the real blog URL with draft mode — matches what readers see after publish."
              : "Previewing the real case study URL with draft mode — matches what visitors see after publish."
            : "Add a slug to preview the live page. Until then, changes appear here as you type."}
        </Text>
      </div>

      <Box flex={1} className="softree-preview-pane__frame-wrap">
        {previewSrc ? (
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
        ) : null}
      </Box>
    </Flex>
  )
}
