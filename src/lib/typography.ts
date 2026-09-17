/**
 * Centralized Typography Tokens & Class Names
 * 
 * Single source of truth for class references across the application.
 * All underlying font family, size, weight, line-height, letter-spacing,
 * and responsive desktop/tablet/mobile values are defined in:
 * `src/styles/typography.css`
 * 
 * Changing a property in `typography.css` automatically propagates
 * across every component referencing these tokens.
 */

export const typography = {
  /** Hero display / giant page headline */
  title: "typo-title",

  /** Section and page headings */
  heading: {
    /** Pillar / Major H1 (e.g. clamp(2rem, 3.4vw, 3.75rem)) */
    h1: "typo-heading-1",
    /** Standard Section Header (e.g. clamp(32px, 4.5vw, 56px)) */
    h2: "typo-heading-2",
    /** Card / Feature title (e.g. clamp(1.35rem, 2.45vw, 2.2rem)) */
    h3: "typo-heading-3",
    /** FAQ question / Row title / Sub-heading (e.g. clamp(1.05rem, 1.2vw, 1.25rem)) */
    h4: "typo-heading-4",
    /** Default section heading alias */
    default: "typo-heading",
  },

  /** Lead and supporting subheadings */
  description: {
    /** Primary lead description (e.g. clamp(0.9375rem, 1.3vw, 1.25rem)) */
    default: "typo-description",
    /** Card / Sub-panel supporting description */
    sm: "typo-description-sm",
  },

  /** Prose, paragraphs, list items */
  body: {
    /** Default body text (1rem / 16px, line-height: 1.625) */
    default: "typo-body",
    /** Large body text (1.125rem / 18px) */
    lg: "typo-body-lg",
    /** Small body text (0.875rem / 14px) */
    sm: "typo-body-sm",
  },

  /** Buttons, CTAs, action triggers */
  button: {
    /** Default button text (0.9375rem / 15px, weight: 600) */
    default: "typo-button",
    /** Hero primary CTA (1rem / 16px, weight: 600) */
    lg: "typo-button-lg",
    /** Compact / Navbar button (0.875rem / 14px, weight: 600) */
    sm: "typo-button-sm",
  },

  /** Navigation links, controls, and triggers */
  nav: {
    /** Top-level navigation link (1rem / 16px) */
    default: "typo-nav-link",
    link: "typo-nav-link",
  },

  /** Badges, pill labels, eyebrows, uppercase tags, metadata */
  caption: {
    /** Standard section badge / uppercase pill label (11px, 0.20em tracking) */
    default: "typo-caption",
    /** Fine print, timestamps, meta info (12px, 0.05em tracking) */
    meta: "typo-caption-meta",
  },
} as const;

export type TypographyToken = typeof typography;
