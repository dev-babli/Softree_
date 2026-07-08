'use client'

import { EarthGlobeIcon, LaunchIcon } from '@sanity/icons'
import type { NavbarProps } from 'sanity'
import { useRouter } from 'sanity/router'

import { dataset } from '@/cms/env'

import { SoftreeLogo } from './SoftreeLogo'

export function StudioNavbar(props: NavbarProps) {
  const { renderDefault } = props
  const router = useRouter()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const go = (path: string) => router.navigateUrl({ path })

  return (
    <header className="softree-studio-header" data-softree-studio-chrome>
      <div className="softree-studio-header__sheen" aria-hidden />

      <div className="softree-studio-header__brand-row">
        <div className="softree-studio-header__brand">
          <button
            type="button"
            className="softree-studio-header__logo-button"
            onClick={() => go('/studio')}
            aria-label="Softree CMS home"
          >
            <SoftreeLogo size="md" />
          </button>
          <div className="softree-studio-header__titles">
            <span className="softree-studio-header__name">Softree CMS</span>
            <span className="softree-studio-header__tagline">Greenfield editor</span>
          </div>
          <span className="softree-studio-header__dataset is-prod">{dataset}</span>
        </div>

        <nav className="softree-studio-header__nav" aria-label="Studio shortcuts">
          <button
            type="button"
            className="softree-studio-header__pill"
            onClick={() => go('/studio/presentation')}
          >
            <EarthGlobeIcon />
            Preview
          </button>
          <a
            className="softree-studio-header__pill softree-studio-header__pill--ghost"
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Live site
            <LaunchIcon />
          </a>
        </nav>
      </div>

      <div className="softree-studio-header__sanity-bar">{renderDefault(props)}</div>
    </header>
  )
}
