"use client"

import { SparklesIcon } from "@sanity/icons"
import { Box, Card, Flex, Spinner, Text } from "@sanity/ui"
import { useMemo, useState } from "react"

import { REACT_BITS_CATALOG, REACT_BITS_CATEGORIES } from "@/components/react-bits/catalog"
import { getSiteOrigin } from "@/sanity/lib/layoutPreview"

function buildPreviewUrl(componentId: string): string {
  const origin = getSiteOrigin()
  const params = new URLSearchParams({
    component: componentId,
    embedded: "1",
  })
  return `${origin}/showcase/react-bits?${params.toString()}`
}

export default function ReactBitsStudioTool() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<string>("all")
  const [selectedId, setSelectedId] = useState(REACT_BITS_CATALOG[0]?.id ?? "")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return REACT_BITS_CATALOG.filter((entry) => {
      if (category !== "all" && entry.category !== category) return false
      if (!q) return true
      return (
        entry.name.toLowerCase().includes(q) ||
        entry.description.toLowerCase().includes(q) ||
        entry.id.toLowerCase().includes(q)
      )
    })
  }, [category, query])

  const selected = REACT_BITS_CATALOG.find((entry) => entry.id === selectedId)
  const previewUrl = selected ? buildPreviewUrl(selected.id) : null

  return (
    <Flex direction="column" style={{ height: "100%", minHeight: 0, background: "#0f1117", color: "#fff" }}>
      <Box padding={4} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <Flex align="center" gap={2}>
          <SparklesIcon />
          <Text size={2} weight="semibold">
            React Bits library
          </Text>
        </Flex>
        <Text size={1} muted style={{ marginTop: 8, color: "rgba(255,255,255,0.55)" }}>
          Browse {REACT_BITS_CATALOG.length} copy-paste animated components (TypeScript + Tailwind). Preview live, copy import paths for your pages.
        </Text>
      </Box>

      <Flex flex={1} style={{ minHeight: 0 }}>
        <Box
          padding={3}
          style={{
            width: 300,
            flexShrink: 0,
            borderRight: "1px solid rgba(255,255,255,0.08)",
            overflowY: "auto",
          }}
        >
          <Flex direction="column" gap={3}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              style={{
                width: "100%",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(0,0,0,0.25)",
                color: "#fff",
                padding: "8px 10px",
                fontSize: 13,
              }}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: "100%",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(0,0,0,0.25)",
                color: "#fff",
                padding: "8px 10px",
                fontSize: 13,
              }}
            >
              <option value="all">All categories</option>
              {REACT_BITS_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </Flex>

          <Flex direction="column" gap={1} marginTop={3}>
            {filtered.map((entry) => {
              const active = entry.id === selectedId
              return (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => setSelectedId(entry.id)}
                  style={{
                    textAlign: "left",
                    border: 0,
                    borderRadius: 8,
                    padding: "8px 10px",
                    cursor: "pointer",
                    background: active ? "rgba(255,122,47,0.18)" : "transparent",
                    color: active ? "#ffd8c2" : "rgba(255,255,255,0.82)",
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{entry.name}</div>
                  <div style={{ fontSize: 11, opacity: 0.55 }}>{entry.category}</div>
                </button>
              )
            })}
          </Flex>
        </Box>

        <Flex direction="column" flex={1} style={{ minHeight: 0, minWidth: 0 }}>
          {selected ? (
            <>
              <Box padding={4} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <Flex align="flex-start" justify="space-between" gap={3} wrap="wrap">
                  <Box>
                    <Text size={2} weight="semibold">
                      {selected.name}
                    </Text>
                    <Text size={1} style={{ marginTop: 6, color: "rgba(255,255,255,0.55)", maxWidth: 640 }}>
                      {selected.description}
                    </Text>
                  </Box>
                  <Flex gap={2} wrap="wrap">
                    <Card
                      as="a"
                      href={selected.docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      padding={3}
                      radius={3}
                      tone="transparent"
                      style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#fff", textDecoration: "none" }}
                    >
                      <Text size={1}>Open docs ↗</Text>
                    </Card>
                    <Card
                      as="a"
                      href={previewUrl ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      padding={3}
                      radius={3}
                      tone="transparent"
                      style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#fff", textDecoration: "none" }}
                    >
                      <Text size={1}>Open full preview ↗</Text>
                    </Card>
                  </Flex>
                </Flex>
                <Text size={1} style={{ marginTop: 10, fontFamily: "monospace", color: "rgba(255,200,160,0.9)" }}>
                  {`import ${selected.name} from '@/components/react-bits${selected.importPath.slice(1)}'`}
                </Text>
              </Box>

              <Box flex={1} style={{ minHeight: 0, background: "#090b10" }}>
                {previewUrl ? (
                  <iframe
                    key={previewUrl}
                    title={`React Bits preview: ${selected.name}`}
                    src={previewUrl}
                    style={{ display: "block", width: "100%", height: "100%", border: 0, background: "#0f1117" }}
                  />
                ) : (
                  <Flex align="center" justify="center" style={{ height: "100%" }}>
                    <Spinner muted />
                  </Flex>
                )}
              </Box>
            </>
          ) : (
            <Flex align="center" justify="center" flex={1}>
              <Text muted>Select a component</Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}
