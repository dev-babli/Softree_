'use client'

import {EarthGlobeIcon, LaunchIcon, SearchIcon} from '@sanity/icons'
import type {NavbarProps} from 'sanity'
import {useRouter} from 'sanity/router'

import {dataset} from '../env'

import {SoftreeLogo} from './SoftreeLogo'

export function StudioNavbar(props: NavbarProps) {
  const {renderDefault} = props
  const router = useRouter()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const isProductionDataset = dataset === 'production'

  const go = (path: string) => router.navigateUrl({path})

  return (
    <header className="softree-studio-header" data-softree-studio-chrome>
      <div className="softree-studio-header__sheen" aria-hidden />

      <div className="softree-studio-header__brand-row">
        <div className="softree-studio-header__brand">
          <button
            type="button"
            className="softree-studio-header__logo-button"
            onClick={() => go('/studio/structure/dashboard')}
            aria-label="Softree Studio home"
          >
            <SoftreeLogo size="md" />
          </button>
          <div className="softree-studio-header__titles">
            <span className="softree-studio-header__name">Softree Studio</span>
            <span className="softree-studio-header__tagline">Content command center</span>
          </div>
          <span
            className={`softree-studio-header__dataset${isProductionDataset ? ' is-prod' : ' is-dev'}`}
          >
            {dataset}
          </span>
        </div>

        <nav className="softree-studio-header__nav" aria-label="Studio shortcuts">
          <button
            type="button"
            className="softree-studio-header__pill"
            onClick={() => go('/studio/presentation')}
          >
            <EarthGlobeIcon />
            Presentation
          </button>
          <button
            type="button"
            className="softree-studio-header__pill"
            onClick={() => go('/studio/structure/dashboard')}
          >
            <SearchIcon />
            Dashboard
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

      <div className="softree-studio-header__sanity-bar">
        {renderDefault(props)}
      </div>
    </header>
  )
}
