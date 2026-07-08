import type { ReactNode } from "react"

const CRITICAL_INTRO_CSS = `
html.agentic-ai-route{background:#f8f4ec}
html.agentic-ai-route:not(.agentic-ai-ready) body{background:#f8f4ec}
`

export default function OffshoreAiLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CRITICAL_INTRO_CSS }} />
      {children}
    </>
  )
}
