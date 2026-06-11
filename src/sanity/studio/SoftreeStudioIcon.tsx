/** Workspace icon shown in the Studio tool switcher */
export function SoftreeStudioIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden>
      <defs>
        <linearGradient id="softree-studio-icon-grad" x1="2" y1="2" x2="18" y2="18">
          <stop offset="0%" stopColor="#ff7a2f" />
          <stop offset="55%" stopColor="#ff9f5a" />
          <stop offset="100%" stopColor="#ffb347" />
        </linearGradient>
        <linearGradient id="softree-studio-icon-bg" x1="0" y1="0" x2="20" y2="20">
          <stop offset="0%" stopColor="#1a1a1e" />
          <stop offset="100%" stopColor="#0c0c0e" />
        </linearGradient>
      </defs>
      <rect width={20} height={20} rx={5} fill="url(#softree-studio-icon-bg)" />
      <circle cx={10} cy={10} r={4.5} fill="url(#softree-studio-icon-grad)" />
      <circle cx={10} cy={10} r={6.5} stroke="rgba(255,122,47,0.35)" strokeWidth={1} fill="none" />
    </svg>
  )
}
