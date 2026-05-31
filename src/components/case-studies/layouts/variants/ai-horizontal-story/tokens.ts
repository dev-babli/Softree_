/** Design tokens — Nexora / Neutrino AI horizontal story */
export const STORY_TOKENS = {
  bg: "#F8F9FC",
  primary: "#6366F1",
  primaryMuted: "rgba(99, 102, 241, 0.12)",
  navy: "#0B1020",
  navyDeep: "#050816",
  text: "#0B1020",
  textMuted: "#64748B",
  textOnDark: "#E2E8F0",
  white: "#FFFFFF",
  panelGap: 32,
  radius: 32,
  radiusSm: 20,
  sidebarWidth: 320,
  /** Fixed nav: 72px bar + ~16px top margin */
  navOffset: 88,
  panelWidthVw: 90,
} as const

export const PROGRESS_NODES = [
  { id: "start", label: "Start" },
  { id: "01", label: "01", subtitle: "Challenge" },
  { id: "02", label: "02", subtitle: "Approach" },
  { id: "03", label: "03", subtitle: "Solution" },
  { id: "04", label: "04", subtitle: "Impact" },
  { id: "05", label: "05", subtitle: "Future" },
] as const

export type ProgressNodeId = (typeof PROGRESS_NODES)[number]["id"]
