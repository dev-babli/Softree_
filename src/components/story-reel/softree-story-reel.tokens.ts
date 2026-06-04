/**
 * Compact Softree tokens — section-sized, not hero-sized.
 */

export const SOFTREE_STORY_REEL_TOKENS = {
  colors: {
    textMuted: "rgba(255, 255, 255, 0.55)",
    textPrimary: "var(--softree-fg-on-dark, #ffffff)",
    accent: "var(--softree-accent, #ff7a2f)",
    accentSoft: "var(--softree-accent-soft, rgba(255, 122, 47, 0.12))",
    bgProgressTrack: "rgba(255, 255, 255, 0.22)",
    bgProgressFill: "var(--softree-accent, #ff7a2f)",
    gradientOverlay:
      "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 45%, transparent 70%)",
    vignette: "none",
  },
  typography: {
    fontFamily: "var(--font-sans)",
    eyebrow: {
      fontSize: "10px",
      fontWeight: 600,
      letterSpacing: "0.14em",
      lineHeight: "1",
    },
    date: {
      fontSize: "12px",
      fontWeight: 500,
      letterSpacing: "-0.01em",
      lineHeight: "1.2",
    },
    title: {
      fontSize: "clamp(1.375rem, 2.8vw, 1.75rem)",
      fontWeight: 600,
      letterSpacing: "-0.03em",
      lineHeight: "1.1",
    },
    description: {
      fontSize: "14px",
      fontWeight: 500,
      letterSpacing: "-0.01em",
      lineHeight: "1.4",
    },
    counter: {
      fontSize: "11px",
      fontWeight: 600,
      letterSpacing: "0.1em",
      lineHeight: "1",
    },
  },
  spacing: {
    containerPadding: "20px",
    controlsInset: 14,
    controlsGap: 8,
    progressGap: 4,
    contentGap: 12,
    textGap: 6,
    contentMaxWidth: "36rem",
  },
  radius: {
    container: 12,
    progressBar: 999,
    navButton: 999,
    chip: 999,
    cta: 999,
  },
  transitions: {
    progressWidth: "width 0.3s linear",
    button: "opacity 0.2s ease",
  },
  animation: {
    contentStagger: 0.06,
    contentDuration: 0.45,
    contentEase: [0.22, 1, 0.36, 1] as const,
  },
} as const;
