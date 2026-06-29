/** Studio route — lean layout without site chrome noise. */
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
      {children}
    </div>
  )
}
