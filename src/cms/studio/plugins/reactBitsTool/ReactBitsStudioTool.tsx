"use client"

import { Flex, Spinner } from "@sanity/ui"
import { useEffect, useState } from "react"

import { getSiteOrigin } from "@/cms/lib/studio/layoutPreview"

/** Same UI as /showcase/react-bits — no duplicate Studio sidebar. */
export default function ReactBitsStudioTool() {
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    const origin =
      typeof window !== "undefined" ? window.location.origin : getSiteOrigin()
    setSrc(`${origin}/showcase/react-bits?embedded=1`)
  }, [])

  if (!src) {
    return (
      <Flex align="center" justify="center" style={{ height: "100%" }}>
        <Spinner muted />
      </Flex>
    )
  }

  return (
    <iframe
      title="React Bits"
      src={src}
      style={{ display: "block", width: "100%", height: "100%", border: 0, background: "#0f1117" }}
    />
  )
}
