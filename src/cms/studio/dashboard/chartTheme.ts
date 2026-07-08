export const DASH_CHART = {
  accent: '#ff7a2f',
  accentSoft: '#ff9f5a',
  accentPale: '#ffb347',
  success: '#16a34a',
  successSoft: '#86efac',
  warning: '#d97706',
  danger: '#dc2626',
  ink: '#141416',
  muted: '#6b7280',
  grid: 'rgba(15, 23, 42, 0.08)',
  surface: '#ffffff',
} as const

export const CONTENT_STATUS_COLORS = {
  published: DASH_CHART.success,
  draft: '#94a3b8',
  needsWork: DASH_CHART.accent,
} as const
