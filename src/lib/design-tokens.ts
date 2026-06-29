/** Writer-safe design presets — resolved from globalSettings.designTokens. */

export const ACCENT_PRESET_OPTIONS = [
  { value: 'softree-orange', title: 'Softree orange (default)' },
  { value: 'ocean-blue', title: 'Ocean blue' },
  { value: 'forest-green', title: 'Forest green' },
  { value: 'graphite', title: 'Graphite' },
] as const

export const TYPOGRAPHY_PRESET_OPTIONS = [
  { value: 'editorial', title: 'Editorial (default)' },
  { value: 'compact', title: 'Compact' },
  { value: 'display', title: 'Display' },
] as const

export type AccentPresetId = (typeof ACCENT_PRESET_OPTIONS)[number]['value']
export type TypographyPresetId = (typeof TYPOGRAPHY_PRESET_OPTIONS)[number]['value']

export type DesignTokenSettings = {
  accentPreset?: AccentPresetId | null
  typographyPreset?: TypographyPresetId | null
}

const ACCENT_VALUES: Record<
  AccentPresetId,
  {
    accent: string
    accentHover: string
    accentSoft: string
    accentTint: string
    accentBorder: string
  }
> = {
  'softree-orange': {
    accent: '#ff7a2f',
    accentHover: '#e85a1f',
    accentSoft: 'rgba(255, 122, 47, 0.12)',
    accentTint: 'rgba(255, 122, 47, 0.08)',
    accentBorder: 'rgba(255, 122, 47, 0.25)',
  },
  'ocean-blue': {
    accent: '#0f5cc0',
    accentHover: '#0c4a99',
    accentSoft: 'rgba(15, 92, 192, 0.12)',
    accentTint: 'rgba(15, 92, 192, 0.08)',
    accentBorder: 'rgba(15, 92, 192, 0.25)',
  },
  'forest-green': {
    accent: '#059669',
    accentHover: '#047857',
    accentSoft: 'rgba(5, 150, 105, 0.12)',
    accentTint: 'rgba(5, 150, 105, 0.08)',
    accentBorder: 'rgba(5, 150, 105, 0.25)',
  },
  graphite: {
    accent: '#475569',
    accentHover: '#334155',
    accentSoft: 'rgba(71, 85, 105, 0.12)',
    accentTint: 'rgba(71, 85, 105, 0.08)',
    accentBorder: 'rgba(71, 85, 105, 0.25)',
  },
}

const TYPOGRAPHY_SCALE: Record<TypographyPresetId, string> = {
  editorial: '1',
  compact: '0.94',
  display: '1.06',
}

export function resolveDesignTokenCssVars(
  settings?: DesignTokenSettings | null,
): Record<string, string> {
  const accentKey = settings?.accentPreset || 'softree-orange'
  const accent = ACCENT_VALUES[accentKey] ?? ACCENT_VALUES['softree-orange']
  const typoKey = settings?.typographyPreset || 'editorial'
  const headingScale = TYPOGRAPHY_SCALE[typoKey] ?? TYPOGRAPHY_SCALE.editorial

  return {
    '--softree-accent': accent.accent,
    '--softree-accent-hover': accent.accentHover,
    '--softree-accent-soft': accent.accentSoft,
    '--softree-accent-tint': accent.accentTint,
    '--softree-accent-border': accent.accentBorder,
    '--softree-heading-scale': headingScale,
    '--cs-accent': accent.accent,
    '--cs-accent-soft': accent.accentSoft,
  }
}
