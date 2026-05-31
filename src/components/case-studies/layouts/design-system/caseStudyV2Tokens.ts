/**
 * V2 case study design tokens — cinematic editorial noir.
 * Manufacturing Power Platform and future premium narrative layouts.
 */

export const csV2 = {
  bgVoid: "#06070a",
  bgBase: "#0a0b0f",
  bgElevated: "#111318",
  bgSurface: "#16181f",
  bgGlass: "rgba(22, 24, 31, 0.72)",

  textPrimary: "#f4f4f5",
  textSecondary: "#a1a1aa",
  textMuted: "#71717a",
  textDim: "#52525b",

  accent: "var(--softree-accent, #FF7A2F)",
  accentGlow: "rgba(255, 122, 47, 0.35)",
  accentSoft: "rgba(255, 122, 47, 0.14)",
  accentLine: "rgba(255, 122, 47, 0.45)",

  border: "rgba(255, 255, 255, 0.08)",
  borderStrong: "rgba(255, 255, 255, 0.14)",
  divider: "rgba(255, 255, 255, 0.06)",

  grainOpacity: 0.04,
  maxWidth: "1280px",
  railWidth: "72px",

  easeOut: "cubic-bezier(0.23, 1, 0.32, 1)",
  easeExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
  durationFast: "160ms",
  durationNormal: "220ms",
  durationReveal: "0.55s",
} as const

export const caseStudyV2CssVars: Record<string, string> = {
  "--cs2-bg": csV2.bgBase,
  "--cs2-bg-elevated": csV2.bgElevated,
  "--cs2-text": csV2.textPrimary,
  "--cs2-text-muted": csV2.textMuted,
  "--cs2-accent": csV2.accent,
  "--cs2-border": csV2.border,
  "--cs2-ease": csV2.easeOut,
  "--cs2-display": '"Playfair Display", Georgia, "Times New Roman", serif',
  "--cs2-mono": 'ui-monospace, "SF Mono", "Cascadia Code", monospace',
}

export const csV2Classes = {
  shell:
    "relative min-h-screen bg-[#0a0b0f] font-sans text-[#f4f4f5] antialiased selection:bg-[rgba(255,122,47,0.25)]",
  container: "mx-auto w-full max-w-[1280px] px-5 md:px-8 lg:px-10",
  display:
    "font-[family-name:var(--cs2-display)] text-[clamp(2.5rem,6vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.03em] text-[#f4f4f5]",
  sectionTitle:
    "text-[clamp(1.85rem,3.8vw,3rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-[#f4f4f5]",
  eyebrow:
    'font-[family-name:var(--cs2-mono)] text-[11px] font-medium uppercase tracking-[0.22em] text-[#71717a]',
  chapterNum:
    'font-[family-name:var(--cs2-mono)] text-[clamp(3rem,8vw,6rem)] font-light leading-none tracking-[-0.04em] text-[rgba(255,122,47,0.22)]',
  bodyLg: "text-[1.125rem] leading-[1.7] text-[#a1a1aa]",
  body: "text-[0.9375rem] leading-[1.65] text-[#71717a]",
  linkAccent:
    "inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-[#FF7A2F] transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A2F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0b0f]",
  cta:
    "inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#FF7A2F] px-8 py-3.5 text-sm font-semibold text-[#0a0b0f] transition-[transform,background-color] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#ff8f4d] active:scale-[0.97] motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A2F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0b0f]",
} as const

export const CS_V2_EASE: [number, number, number, number] = [0.23, 1, 0.32, 1]

export const csV2Reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: CS_V2_EASE },
  },
} as const

export const csV2RevealReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
} as const

/** Light editorial variant — warm canvas, dark type, Softree orange accent */
export const csV2Light = {
  bgVoid: "#f5f4f1",
  bgBase: "#f8f7f4",
  bgElevated: "#ffffff",
  bgSurface: "#ffffff",
  bgGlass: "rgba(255, 255, 255, 0.88)",

  textPrimary: "#0f172a",
  textSecondary: "#475569",
  textMuted: "#64748b",
  textDim: "#94a3b8",

  accent: "var(--softree-accent, #FF7A2F)",
  accentGlow: "rgba(255, 122, 47, 0.2)",
  accentSoft: "rgba(255, 122, 47, 0.1)",
  accentLine: "rgba(255, 122, 47, 0.45)",

  border: "rgba(15, 23, 42, 0.08)",
  borderStrong: "rgba(15, 23, 42, 0.12)",
  divider: "rgba(15, 23, 42, 0.06)",

  grainOpacity: 0.012,
  maxWidth: csV2.maxWidth,
  railWidth: csV2.railWidth,

  easeOut: csV2.easeOut,
  easeExpo: csV2.easeExpo,
  durationFast: csV2.durationFast,
  durationNormal: csV2.durationNormal,
  durationReveal: csV2.durationReveal,
} as const

export const caseStudyV2LightCssVars: Record<string, string> = {
  "--cs2-bg": csV2Light.bgBase,
  "--cs2-bg-elevated": csV2Light.bgElevated,
  "--cs2-text": csV2Light.textPrimary,
  "--cs2-text-muted": csV2Light.textMuted,
  "--cs2-accent": csV2Light.accent,
  "--cs2-border": csV2Light.border,
  "--cs2-ease": csV2Light.easeOut,
  "--cs2-display": caseStudyV2CssVars["--cs2-display"],
  "--cs2-mono": caseStudyV2CssVars["--cs2-mono"],
}

export const csV2LightClasses = {
  shell:
    "relative min-h-screen bg-[#f8f7f4] font-sans text-slate-900 antialiased selection:bg-[rgba(255,122,47,0.18)]",
  container: csV2Classes.container,
  display:
    "font-[family-name:var(--cs2-display)] text-[clamp(2.5rem,6vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.03em] text-slate-900",
  sectionTitle:
    "text-[clamp(1.85rem,3.8vw,3rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-slate-900",
  eyebrow:
    'font-[family-name:var(--cs2-mono)] text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500',
  chapterNum:
    'font-[family-name:var(--cs2-mono)] text-[clamp(3rem,8vw,6rem)] font-light leading-none tracking-[-0.04em] text-[rgba(255,122,47,0.18)]',
  bodyLg: "text-[1.125rem] leading-[1.7] text-slate-600",
  body: "text-[0.9375rem] leading-[1.65] text-slate-500",
  linkAccent:
    "inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-[#FF7A2F] transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A2F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8f7f4]",
  cta:
    "inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#FF7A2F] px-8 py-3.5 text-sm font-semibold text-white transition-[transform,background-color] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#e86a1f] active:scale-[0.97] motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A2F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8f7f4]",
} as const

/** Scroll narrative chapters for progress rail */
export const MANUFACTURING_CHAPTERS = [
  { id: "hero", label: "Intro" },
  { id: "context", label: "Context" },
  { id: "challenge", label: "Challenge" },
  { id: "solution", label: "Solution" },
  { id: "deliverables", label: "Build" },
  { id: "gallery", label: "Product" },
  { id: "impact", label: "Impact" },
  { id: "stack", label: "Stack" },
  { id: "voice", label: "Voice" },
  { id: "more", label: "More" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
] as const
