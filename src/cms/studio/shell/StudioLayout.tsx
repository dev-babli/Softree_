'use client'

import type { LayoutProps } from 'sanity'

import { StudioCommandPalette } from './StudioCommandPalette'

export function StudioLayout(props: LayoutProps) {
  const { renderDefault } = props

  return (
    <div className="softree-studio-shell" data-softree-studio-layout>
      <div className="softree-studio-shell__mesh" aria-hidden />
      <div className="softree-studio-shell__glow softree-studio-shell__glow--tl" aria-hidden />
      <div className="softree-studio-shell__glow softree-studio-shell__glow--br" aria-hidden />
      <div className="softree-studio-shell__content">{renderDefault(props)}</div>
      <StudioCommandPalette />
    </div>
  )
}
