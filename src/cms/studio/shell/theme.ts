import {buildLegacyTheme} from 'sanity'

/** Softree Studio — light editorial shell with warm orange accent (matches homepage). */
const palette = {
  '--softree-black': '#0a0a1a',
  '--softree-ink': '#141416',
  '--softree-surface': '#ffffff',
  '--softree-surface-2': '#f4f2ee',
  '--softree-white': '#ffffff',
  '--softree-cream': '#f4f2ee',
  '--softree-muted': '#6b7280',
  '--softree-text': '#0a0a1a',
  '--softree-accent': '#ff7a2f',
  '--softree-accent-hover': '#e85a1f',
  '--softree-accent-glow': '#ff9f5a',
  '--softree-success': '#16a34a',
  '--softree-warning': '#d97706',
  '--softree-danger': '#dc2626',
  '--softree-info': '#3b82f6',
} as const

export const softreeStudioTheme = buildLegacyTheme({
  '--black': palette['--softree-black'],
  '--white': palette['--softree-white'],

  '--gray': palette['--softree-muted'],
  '--gray-base': palette['--softree-muted'],

  '--component-bg': palette['--softree-surface'],
  '--component-text-color': palette['--softree-text'],

  '--brand-primary': palette['--softree-accent'],

  '--default-button-color': palette['--softree-muted'],
  '--default-button-primary-color': palette['--softree-accent'],
  '--default-button-success-color': palette['--softree-success'],
  '--default-button-warning-color': palette['--softree-warning'],
  '--default-button-danger-color': palette['--softree-danger'],

  '--state-info-color': palette['--softree-info'],
  '--state-success-color': palette['--softree-success'],
  '--state-warning-color': palette['--softree-warning'],
  '--state-danger-color': palette['--softree-danger'],

  '--main-navigation-color': palette['--softree-surface'],
  '--main-navigation-color--inverted': palette['--softree-text'],

  '--focus-color': palette['--softree-accent'],
})
