import type { CSSProperties } from "react"

/** Nexora DataPulse product-story layout — indigo SaaS palette */
export const NEXORA_TOKENS = {
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
  heroGradient: "linear-gradient(145deg, #0F172A 0%, #1e1b4b 55%, #0F172A 100%)",
  heroGlow: "radial-gradient(ellipse 70% 55% at 92% 78%, rgba(99,102,241,0.35) 0%, transparent 68%)",
  cardShadow: "0 24px 48px -12px rgba(15,23,42,0.12)",
  mockupShadow:
    "0 1px 0 rgba(255,255,255,0.06) inset, 0 32px 64px -16px rgba(15,23,42,0.5), 0 12px 24px -8px rgba(99,102,241,0.15)",
} as const

export const nexoraCssVars = {
  "--nexora-accent": NEXORA_TOKENS.accent,
  "--nexora-navy": NEXORA_TOKENS.navy,
} as CSSProperties
