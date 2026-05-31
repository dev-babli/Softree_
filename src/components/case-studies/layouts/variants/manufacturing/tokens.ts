/**
 * Manufacturing case study — Softree site tokens (Inter, brand orange, 1240px layout).
 * Reuses shared light tokens; no custom Google fonts.
 */
import {
  caseStudyLightCssVars,
  csLight,
} from "../../design-system/caseStudyLightTokens"

export const ACCENT = "#FF7A2F"

/** CSS vars for section components — maps legacy --cs-* names to Softree palette */
export const csCssVars: Record<string, string> = {
  ...caseStudyLightCssVars,
  "--cs-accent": csLight.accent,
  "--cs-ink": csLight.textPrimary,
  "--cs-ink-soft": csLight.textSecondary,
  "--cs-ink-muted": csLight.textMuted,
  "--cs-bg": csLight.bgBase,
  "--cs-bg-warm": csLight.bgCream,
  "--cs-bg-stone": csLight.bgMuted,
  "--cs-surface": csLight.bgWhite,
  "--cs-dark": "var(--softree-bg-dark, #0a0a0a)",
  "--cs-dark-soft": "var(--softree-surface-1, #141414)",
  "--cs-border": csLight.border,
  "--cs-ease-out": csLight.easeOut,
}

/** @deprecated V3 fonts removed — site uses Inter via globals */
export const csFontsUrl = ""
