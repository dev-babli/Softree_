/**
 * Softree case study design tokens — aligned with globals.css + About Us / Careers.
 * Inter only; brand orange #FF7A2F; light #fafaf9 / dark #0a0a0a alternation.
 */
export { csLight, csLightClasses, caseStudyLightCssVars, CS_LIGHT_EASE } from "../design-system/caseStudyLightTokens"

export const SOFTREE = {
  accent: "var(--softree-accent, #FF7A2F)",
  accentHover: "var(--softree-accent-hover, #E85A1F)",
  accentSoft: "rgba(255, 122, 47, 0.12)",
  bgLight: "var(--softree-bg-light, #fafaf9)",
  bgDark: "var(--softree-bg-dark, #0a0a0a)",
  bgCream: "#F8F9FC",
  surfaceDark: "var(--softree-surface-1, #141414)",
  surfaceLight: "#ffffff",
  maxWidth: "1240px",
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
} as const

export type SectionTheme = "light" | "dark"

export function sectionBg(theme: SectionTheme, alt = false): string {
  if (theme === "dark") return alt ? "bg-[#111111]" : "bg-[#0a0a0a]"
  return alt ? "bg-[#F8F9FC]" : "bg-[#fafaf9]"
}

export function sectionText(theme: SectionTheme) {
  return theme === "dark"
    ? { heading: "text-white", body: "text-white/60", muted: "text-white/45", border: "border-white/10" }
    : { heading: "text-[#0f172a]", body: "text-[#64748b]", muted: "text-[#94a3b8]", border: "border-[rgba(15,23,42,0.08)]" }
}

export function cardClasses(theme: SectionTheme): string {
  return theme === "dark"
    ? "rounded-2xl border border-white/10 bg-[#141414]"
    : "rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06)]"
}
