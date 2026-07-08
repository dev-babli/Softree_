import {SOFTREE_LOGO_ALT, SOFTREE_LOGO_URL} from '@/lib/brand-assets'

type SoftreeLogoProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  /** When true, wraps logo in a light chip so the homepage asset reads on dark chrome. */
  onDark?: boolean
  className?: string
}

const HEIGHTS = {
  xs: 18,
  sm: 24,
  md: 28,
  lg: 44,
} as const

export function SoftreeLogo({size = 'md', onDark = false, className = ''}: SoftreeLogoProps) {
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={SOFTREE_LOGO_URL}
      alt={SOFTREE_LOGO_ALT}
      className={`softree-brand-logo__img ${className}`.trim()}
      style={{height: HEIGHTS[size], width: 'auto', display: 'block'}}
    />
  )

  if (onDark) {
    return <span className="softree-brand-logo-chip">{img}</span>
  }

  return img
}
