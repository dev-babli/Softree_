/**
 * Design tokens extracted from the original Framer story reel component.
 * All values are pixel-for-pixel matches from the source HTML inline styles.
 */

export const STORY_REEL_TOKENS = {
  /** ── Colors ───────────────────────────────────────────── */
  colors: {
    textMuted: "rgb(204, 204, 204)",
    textPrimary: "rgb(255, 255, 255)",
    bgGlass: "rgba(0, 0, 0, 0.3)",
    bgProgressTrack: "rgba(255, 255, 255, 0.3)",
    bgProgressFill: "rgb(255, 255, 255)",
    gradientOverlay: "linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent)",
  },

  /** ── Typography (Inter Display → Inter) ───────────────── */
  typography: {
    fontFamily: '"Inter", "Inter Display", ui-sans-serif, system-ui, sans-serif',
    date: {
      fontSize: "12px",
      fontWeight: 500,
      letterSpacing: "-0.01em",
      lineHeight: "1em",
    },
    title: {
      fontSize: "26px",
      fontWeight: 600,
      letterSpacing: "-0.03em",
      lineHeight: "1em",
    },
    description: {
      fontSize: "14px",
      fontWeight: 500,
      letterSpacing: "-0.01em",
      lineHeight: "1.3em",
    },
  },

  /** ── Spacing ──────────────────────────────────────────── */
  spacing: {
    containerPadding: 24,
    controlsInset: 16,
    controlsGap: 8,
    progressGap: 4,
    contentGap: 16,
    textGap: 8,
  },

  /** ── Border Radius ──────────────────────────────────────── */
  radius: {
    container: 8,
    progressBar: 2,
    button: "50%",
  },

  /** ── Transitions ──────────────────────────────────────── */
  transitions: {
    progressWidth: "width 0.3s linear",
    buttonOpacity: "opacity 0.2s ease",
  },

  /** ── Animation (Framer Motion spring equivalents) ───────── */
  animation: {
    contentStagger: 0.08,
    contentDuration: 0.55,
    contentEase: [0.22, 1, 0.36, 1] as const,
  },
} as const;
