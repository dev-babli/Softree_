/**
 * Design tokens extracted from the original Framer testimonial slider.
 * All values are pixel-for-pixel matches from the source HTML inline styles.
 */

export const TESTIMONIAL_TOKENS = {
  /** ── Colors ───────────────────────────────────────────── */
  colors: {
    bgCard: "#0E0E0E",
    bgImageWrapper: "rgb(25, 25, 25)",
    textEyebrowIcon: "rgba(255, 255, 255, 0.85)",
    textEyebrowLabel: "rgba(255, 255, 255, 0.36)",
    textQuoteDecorative: "rgba(255, 255, 255, 0.038)",
    textQuoteBody: "rgba(255, 255, 255, 0.9)",
    divider: "rgba(255, 255, 255, 0.07)",
    starFill: "rgba(255, 255, 255, 0.72)",
    starStroke: "rgba(255, 255, 255, 0.72)",
    textName: "rgba(255, 255, 255, 0.88)",
    textTitle: "rgba(255, 255, 255, 0.38)",
    textCounter: "rgba(255, 255, 255, 0.26)",
    bgButtonPrev: "rgba(255, 255, 255, 0.08)",
    bgButtonNext: "rgba(255, 255, 255, 0.92)",
    strokeButtonPrev: "rgba(255, 255, 255, 0.52)",
    strokeButtonNext: "rgb(14, 14, 14)",
    bgProgressTrack: "rgba(255, 255, 255, 0.08)",
    bgProgressFill: "rgba(255, 255, 255, 0.82)",
    dotBg: "rgb(255, 255, 255)",
    dotOpacityInactive: 0.38,
    dotOpacityActive: 1,
    imageGradient:
      "linear-gradient(145deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.65) 100%), linear-gradient(to top right, rgba(255,122,47,0.18) 0%, transparent 50%)",
  },

  /** ── Typography ───────────────────────────────────────── */
  typography: {
    systemFont:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    quoteFont: 'Georgia, "Times New Roman", serif',
    eyebrowIcon: { fontSize: "12px" },
    eyebrowLabel: {
      fontSize: "11px",
      fontWeight: 600,
      letterSpacing: "0.08em",
      lineHeight: "1em",
    },
    quoteDecorative: {
      fontSize: "220px",
      lineHeight: "1",
      fontFamily: 'Georgia, serif',
    },
    quoteBody: {
      fontSize: "26px",
      fontWeight: 400,
      letterSpacing: "-0.015em",
      lineHeight: "1.5",
    },
    name: {
      fontSize: "14px",
      fontWeight: 600,
      letterSpacing: "-0.01em",
      lineHeight: "1.3",
    },
    title: {
      fontSize: "12.5px",
      fontWeight: 400,
      lineHeight: "1.3",
    },
    counter: {
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "1em",
    },
  },

  /** ── Spacing ──────────────────────────────────────────── */
  spacing: {
    cardPaddingTop: 52,
    cardPaddingRight: 56,
    cardPaddingBottom: 44,
    cardPaddingLeft: 56,
    eyebrowGap: 7,
    eyebrowMarginBottom: 34,
    quoteHeight: 160,
    quoteDecorativeTop: -40,
    quoteDecorativeLeft: -14,
    dividerMarginTop: 26,
    dividerMarginBottom: 22,
    attributionGap: 12,
    starGap: 3,
    starMarginBottom: 8,
    nameTitleGap: 3,
    navButtonGap: 8,
    counterMarginRight: 2,
    counterMinWidth: 30,
    bottomProgressBottom: 2,
    bottomProgressInset: 16,
    bottomProgressHeight: 2,
    imagePanelMarginTop: 20,
    imagePanelMarginRight: 20,
    imagePanelMarginBottom: 20,
    imagePanelMarginLeft: 0,
    dotPaginationBottom: 16,
    dotPaginationGap: 5,
  },

  /** ── Border Radius ────────────────────────────────────── */
  radius: {
    card: 20,
    navButton: 10,
    imagePanel: 14,
    dot: 999,
    progress: 999,
  },

  /** ── Sizes ────────────────────────────────────────────── */
  sizes: {
    leftPanelFlex: "0 0 48%",
    navButton: 44,
    navButtonSvg: 14,
    starSvg: 13,
    dotHeight: 6,
    dotInactiveWidth: 6,
    dotActiveWidth: 22,
  },

  /** ── Animation ────────────────────────────────────────── */
  animation: {
    slideDuration: 0.45,
    slideEase: [0.22, 1, 0.36, 1] as const,
    imageDuration: 0.5,
  },
} as const;
