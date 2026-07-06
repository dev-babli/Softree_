import type { ReactNode } from "react"

const CRITICAL_INTRO_CSS = `
html.generative-ai-route{background:#f8f4ec}
html.generative-ai-route:not(.generative-ai-ready) body{background:#f8f4ec}
`

export default function GenerativeAiLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CRITICAL_INTRO_CSS }} />
      {children}
    </>
  )
}
