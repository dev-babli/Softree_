import Script from 'next/script'

const SANITY_DASHBOARD_BRIDGE = 'https://core.sanity-cdn.com/bridge.js'

/** Studio route — viewport lock + Sanity Dashboard bridge for COS registration. */
export default function StudioRouteLayout({children}: {children: React.ReactNode}) {
  return (
    <div
      data-softree-studio-route
      style={{
        height: '100dvh',
        maxHeight: '100dvh',
        overflow: 'hidden',
        isolation: 'isolate',
      }}
    >
      <Script src={SANITY_DASHBOARD_BRIDGE} strategy="beforeInteractive" type="module" />
      {children}
    </div>
  )
}
