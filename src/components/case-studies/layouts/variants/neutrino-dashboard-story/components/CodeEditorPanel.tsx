"use client"

import type { ReactNode } from "react"
import { DASHBOARD_TOKENS } from "../tokens"

type Props = {
  code: string
  filename?: string
  branch?: string
}

function highlightLine(line: string): ReactNode {
  const parts: ReactNode[] = []
  let remaining = line
  let key = 0

  const patterns: [RegExp, string][] = [
    [/^(\s*)(\/\/.*|#.*)$/, "comment"],
    [/^(\s*)(\/\*|\*\/|\*)/, "comment"],
    [/^(\s*)(const|let|type|interface|export|import|async|await|return|from|kind|spec|metadata|name|apiVersion)(?=\s|:|$)/, "keyword"],
    [/^(\s*)("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/, "string"],
    [/^(\s*)(\d+\.?\d*)/, "number"],
    [/^(\s*)([a-zA-Z_$][\w$]*)(?=\s*:)/, "property"],
    [/^(\s*)([a-zA-Z_$][\w$]*)(?=\()/, "function"],
    [/^(\s*)(>|\*\*|##|---)/, "markdown"],
  ]

  while (remaining.length > 0) {
    let matched = false
    for (const [regex, type] of patterns) {
      const m = remaining.match(regex)
      if (m) {
        const [, ws = "", token = ""] = m
        if (ws) parts.push(<span key={key++}>{ws}</span>)
        const colors: Record<string, string> = {
          comment: DASHBOARD_TOKENS.textLight,
          keyword: DASHBOARD_TOKENS.primary,
          string: DASHBOARD_TOKENS.teal,
          number: "#059669",
          property: DASHBOARD_TOKENS.architectureBlue,
          function: DASHBOARD_TOKENS.navy,
          markdown: DASHBOARD_TOKENS.primary,
        }
        parts.push(
          <span key={key++} style={{ color: colors[type] || DASHBOARD_TOKENS.navy }}>
            {token}
          </span>,
        )
        remaining = remaining.slice(m[0].length)
        matched = true
        break
      }
    }
    if (!matched) {
      parts.push(<span key={key++}>{remaining[0]}</span>)
      remaining = remaining.slice(1)
    }
  }
  return parts
}

export function CodeEditorPanel({ code, filename = "architecture.ts", branch = "main" }: Props) {
  const lines = code.split("\n")
  const ext = filename.split(".").pop() || "ts"

  return (
    <div className="flex h-full min-h-0 flex-col" style={{ background: DASHBOARD_TOKENS.editorBg }}>
      <div
        className="flex min-h-0 flex-1 overflow-auto font-mono text-[11px] leading-[1.65]"
        style={{ color: DASHBOARD_TOKENS.navy }}
      >
        <div
          className="sticky left-0 shrink-0 select-none border-r px-3 py-3 text-right"
          style={{
            background: DASHBOARD_TOKENS.editorGutter,
            borderColor: DASHBOARD_TOKENS.editorBorder,
            color: DASHBOARD_TOKENS.textLight,
            minWidth: 36,
          }}
        >
          {lines.map((_, i) => (
            <div key={i} className="leading-[1.65]">
              {i + 1}
            </div>
          ))}
        </div>
        <pre className="min-w-0 flex-1 overflow-x-auto px-4 py-3">
          {lines.map((line, i) => (
            <div key={i} className="leading-[1.65]">
              {highlightLine(line)}
            </div>
          ))}
        </pre>
      </div>
      <div
        className="flex shrink-0 items-center gap-4 border-t px-4 py-1.5 text-[10px]"
        style={{
          borderColor: DASHBOARD_TOKENS.editorBorder,
          background: DASHBOARD_TOKENS.editorGutter,
          color: DASHBOARD_TOKENS.textLight,
        }}
      >
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: DASHBOARD_TOKENS.liveGreen }}
          />
          {branch}
        </span>
        <span>0 errors</span>
        <span>0 warnings</span>
        <span className="ml-auto uppercase">{ext}</span>
      </div>
    </div>
  )
}

export const ARCHITECTURE_CODE = `// AI — Core Architecture
const architecture = {
  gateway: {
    protocol: "websocket",
    port: 8080,
    auth: "oauth2",
  },
  orchestrator: {
    router: "ai-router-v2",
    maxConcurrent: 128,
    timeout: 30000,
  },
  agents: [
    { id: "research", model: "gpt-4o", tools: ["web", "db"] },
    { id: "support", model: "claude-3", tools: ["crm", "kb"] },
    { id: "sales", model: "gpt-4o", tools: ["crm", "email"] },
    { id: "analytics", model: "gpt-4o", tools: ["db", "viz"] },
    { id: "finance", model: "claude-3", tools: ["erp", "audit"] },
  ],
  vectorStore: {
    provider: "pinecone",
    dimensions: 1536,
    index: "neutrino-prod",
  },
}`
