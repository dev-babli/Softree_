import type { CSSProperties } from "react"

/** PayFlow fintech product-story layout — blue SaaS palette */
export const PAYFLOW_TOKENS = {
  accent: "#2563EB",
  accentLight: "#3B82F6",
  accentHover: "#1D4ED8",
  accentMuted: "#EFF6FF",
  accentIconBg: "#DBEAFE",
  purple: "#7C3AED",
  purpleMuted: "#F3E8FF",
  white: "#FFFFFF",
  heading: "#0F172A",
  body: "#64748B",
  label: "#94A3B8",
  border: "#E2E8F0",
  cardBg: "#F8FAFC",
  cardShadow: "0 24px 48px -12px rgba(15,23,42,0.1)",
  mockupShadow:
    "0 1px 0 rgba(255,255,255,0.9) inset, 0 32px 64px -16px rgba(37,99,235,0.18), 0 8px 24px -8px rgba(15,23,42,0.08)",
  green: "#10B981",
  red: "#EF4444",
} as const

/** Challenge card icon backgrounds — index-matched in layout */
export const PAYFLOW_CHALLENGE_ICON_COLORS = [
  { bg: "#FCE7F3", icon: "#EC4899" }, // rose — Scalability
  { bg: "#FFEDD5", icon: "#F97316" }, // orange — Security
  { bg: "#FEF3C7", icon: "#F59E0B" }, // amber — Downtime
  { bg: "#EDE9FE", icon: "#8B5CF6" }, // purple — Visibility
] as const

/** Impact stat icon colors */
export const PAYFLOW_IMPACT_ICON_COLORS = [
  { bg: "#DCFCE7", icon: "#16A34A" }, // green — capacity
  { bg: "#DBEAFE", icon: "#2563EB" }, // blue — uptime
  { bg: "#EDE9FE", icon: "#7C3AED" }, // purple — cost
  { bg: "#FFEDD5", icon: "#EA580C" }, // orange — deployment
  { bg: "#FEE2E2", icon: "#DC2626" }, // red — countries
] as const

export const payflowCssVars = {
  "--payflow-accent": PAYFLOW_TOKENS.accent,
  "--payflow-purple": PAYFLOW_TOKENS.purple,
} as CSSProperties
