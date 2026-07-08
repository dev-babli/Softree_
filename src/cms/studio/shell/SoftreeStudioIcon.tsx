import {SOFTREE_LOGO_ALT, SOFTREE_LOGO_URL} from '@/lib/brand-assets'

/** Workspace icon shown in the Studio tool switcher */
export function SoftreeStudioIcon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={SOFTREE_LOGO_URL}
      alt={SOFTREE_LOGO_ALT}
      width={20}
      height={20}
      style={{
        display: 'block',
        width: 20,
        height: 20,
        objectFit: 'contain',
        borderRadius: 4,
        background: '#fff',
        padding: 2,
      }}
    />
  )
}
