import type { CSSProperties } from "react"

/** SynqLab / DataCore product-story layout — light hero, indigo SaaS palette */
export const SYNQLAB_TOKENS = {
  accent: "#6366F1",
  accentHover: "#4F46E5",
  accentLight: "#EEF2FF",
  accentMuted: "#F5F3FF",
  accentIconBg: "#E0E7FF",
  navy: "#0F172A",
  navyDeep: "#1e1b4b",
  white: "#FFFFFF",
  heading: "#0F172A",
  body: "#64748B",
  label: "#94A3B8",
  border: "#E2E8F0",
  heroBg: "#FFFFFF",
  darkGradient: "linear-gradient(145deg, #0F172A 0%, #1e1b4b 55%, #0F172A 100%)",
  darkGlow: "radial-gradient(ellipse 70% 55% at 92% 78%, rgba(99,102,241,0.35) 0%, transparent 68%)",
  cardShadow: "0 24px 48px -12px rgba(15,23,42,0.12)",
  mockupShadow: "0 32px 64px -16px rgba(15,23,42,0.18)",
} as const

export const synqlabCssVars = {
  "--synqlab-accent": SYNQLAB_TOKENS.accent,
  "--synqlab-navy": SYNQLAB_TOKENS.navy,
} as CSSProperties
