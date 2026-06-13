'use client'

import { useEffect, useState } from 'react'

import { SoftreeLogo } from './SoftreeLogo'

const BOOT_MS = 900

/** Branded boot overlay — fades out once Studio shell mounts. */
export function StudioBoot() {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setFadeOut(true), BOOT_MS)
    const hideTimer = window.setTimeout(() => setVisible(false), BOOT_MS + 420)
    return () => {
      window.clearTimeout(fadeTimer)
      window.clearTimeout(hideTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className={`softree-studio-boot${fadeOut ? ' softree-studio-boot--out' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Softree Studio"
    >
      <div className="softree-studio-boot__mesh" aria-hidden />
      <div className="softree-studio-boot__inner">
        <SoftreeLogo size="lg" className="softree-studio-boot__logo-mark" />
        <p className="softree-studio-boot__title">Softree Studio</p>
        <p className="softree-studio-boot__subtitle">Loading your content command center…</p>
        <div className="softree-studio-boot__bar" aria-hidden>
          <span className="softree-studio-boot__bar-fill" />
        </div>
      </div>
    </div>
  )
}
