/** Notion / docs aesthetic — warm gray, narrow prose, sticky spec sidebar */
export const SIDEBAR_TOKENS = {
  bg: "#FBFBFA",
  surface: "#FFFFFF",
  border: "#E8E8E5",
  text: "#37352F",
  muted: "#787774",
  accent: "#6366F1",
  sidebar: "#F7F6F3",
  mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
} as const

export const sidebarCssVars: Record<string, string> = {
  "--layout-bg": SIDEBAR_TOKENS.bg,
  "--layout-accent": SIDEBAR_TOKENS.accent,
}
