'use client'

import type {LayoutProps} from 'sanity'

import {dataset} from '../env'

import {StudioBoot} from './StudioBoot'

export function StudioLayout(props: LayoutProps) {
  const {renderDefault} = props
  const isProductionDataset = dataset === 'production'

  return (
    <div className="softree-studio-shell" data-softree-studio-layout>
      <StudioBoot />
      <div className="softree-studio-shell__mesh" aria-hidden />
      <div className="softree-studio-shell__glow softree-studio-shell__glow--tl" aria-hidden />
      <div className="softree-studio-shell__glow softree-studio-shell__glow--br" aria-hidden />

      {!isProductionDataset ? (
        <div className="softree-studio-env-banner" role="status">
          <span className="softree-studio-env-banner__dot" aria-hidden />
          Editing <strong>{dataset}</strong> dataset — content here is separate from production.
        </div>
      ) : null}

      <div className="softree-studio-shell__content">{renderDefault(props)}</div>
    </div>
  )
}
