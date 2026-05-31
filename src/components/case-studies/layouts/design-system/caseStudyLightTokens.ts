/**
 * Light-theme design tokens for case study detail layouts.
 * Used by Manufacturing Power Platform and adoptable by future light variants.
 */

export const csLight = {
  /* Surfaces */
  bgBase: "var(--softree-bg-light, #fafaf9)",
  bgCream: "#f5f4f0",
  bgMuted: "#f1f0ec",
  bgWhite: "#ffffff",
  bgWarmGradient:
    "linear-gradient(135deg, #fafaf9 0%, #fff7f2 48%, #fef3eb 100%)",

  /* Text */
  textPrimary: "#0f172a",
  textSecondary: "#334155",
  textMuted: "#64748b",
  textSubtle: "#94a3b8",

  /* Brand accent */
  accent: "var(--softree-accent, #FF7A2F)",
  accentHover: "var(--softree-accent-hover, #E85A1F)",
  accentSoft: "var(--softree-accent-soft, rgba(255, 122, 47, 0.12))",
  accentTint: "rgba(255, 122, 47, 0.08)",
  accentBorder: "rgba(255, 122, 47, 0.25)",

  /* Borders & shadows */
  border: "rgba(15, 23, 42, 0.08)",
  borderStrong: "rgba(15, 23, 42, 0.12)",
  divider: "rgba(15, 23, 42, 0.06)",
  shadowSm: "0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.06)",
  shadowMd: "0 4px 12px rgba(15, 23, 42, 0.06), 0 2px 4px rgba(15, 23, 42, 0.04)",
  shadowLg: "0 12px 32px rgba(15, 23, 42, 0.08), 0 4px 8px rgba(15, 23, 42, 0.04)",
  shadowHover: "0 16px 40px rgba(15, 23, 42, 0.1), 0 6px 12px rgba(15, 23, 42, 0.05)",

  /* Layout */
  maxWidth: "1240px",
  sectionPy: "5rem",
  sectionPyMd: "7rem",
  cardRadius: "1rem",
  cardRadiusLg: "1.25rem",
  pillRadius: "9999px",

  /* Motion */
  easeOut: "cubic-bezier(0.23, 1, 0.32, 1)",
  easeOutExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
  durationFast: "160ms",
  durationNormal: "200ms",
  durationReveal: "400ms",

  /* Focus */
  focusRing: "0 0 0 2px #fafaf9, 0 0 0 4px #FF7A2F",
} as const

/** CSS custom properties for inline style on layout shell */
export const caseStudyLightCssVars: Record<string, string> = {
  "--cs-bg-base": csLight.bgBase,
  "--cs-bg-cream": csLight.bgCream,
  "--cs-bg-muted": csLight.bgMuted,
  "--cs-bg-white": csLight.bgWhite,
  "--cs-text-primary": csLight.textPrimary,
  "--cs-text-secondary": csLight.textSecondary,
  "--cs-text-muted": csLight.textMuted,
  "--cs-accent": csLight.accent,
  "--cs-accent-soft": csLight.accentSoft,
  "--cs-border": csLight.border,
  "--cs-shadow-sm": csLight.shadowSm,
  "--cs-shadow-md": csLight.shadowMd,
  "--cs-ease-out": csLight.easeOut,
  "--cs-duration-normal": csLight.durationNormal,
  "--cs-duration-reveal": csLight.durationReveal,
}

/** Tailwind-friendly class bundles */
export const csLightClasses = {
  shell: "min-h-screen bg-[var(--cs-bg-base,#fafaf9)] font-sans text-[var(--cs-text-primary,#0f172a)] antialiased",
  section: "px-5 md:px-8",
  container: "mx-auto w-full max-w-[1240px]",
  headingDisplay:
    "text-[clamp(2rem,4.2vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[var(--cs-text-primary,#0f172a)]",
  headingSection:
    "text-[clamp(1.75rem,3vw,2.5rem)] font-bold tracking-[-0.02em] text-[var(--cs-text-primary,#0f172a)]",
  bodyLg: "text-[1.0625rem] leading-[1.65] text-[var(--cs-text-secondary,#334155)]",
  body: "text-[0.9375rem] leading-relaxed text-[var(--cs-text-muted,#64748b)]",
  label:
    "text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--cs-text-muted,#64748b)]",
  card: "rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white shadow-[var(--cs-shadow-sm,0_1px_3px_rgba(15,23,42,0.06))]",
  cardInteractive:
    "cursor-pointer transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 hover:shadow-[var(--cs-shadow-hover,0_16px_40px_rgba(15,23,42,0.1))] active:scale-[0.99] motion-reduce:transform-none motion-reduce:hover:translate-y-0",
  ctaButton:
    "inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-transform duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-px active:scale-[0.97] motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A2F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafaf9]",
} as const

export const CS_LIGHT_EASE: [number, number, number, number] = [0.23, 1, 0.32, 1]

export const csLightReveal = {
  hidden: { opacity: 0, transform: "translateY(12px)" },
  visible: {
    opacity: 1,
    transform: "translateY(0)",
    transition: { duration: 0.4, ease: CS_LIGHT_EASE },
  },
} as const

export const csLightRevealReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
} as const
