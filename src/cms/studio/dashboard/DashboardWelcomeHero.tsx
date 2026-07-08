'use client'

import { CaseIcon, DocumentTextIcon, EarthGlobeIcon } from '@sanity/icons'

type DashboardWelcomeHeroProps = {
  greeting: string
  subtitle: string
  readiness: number
  loading: boolean
  onCreateCaseStudy: () => void
  onCreatePost: () => void
  onOpenPresentation: () => void
}

export function DashboardWelcomeHero({
  greeting,
  subtitle,
  readiness,
  loading,
  onCreateCaseStudy,
  onCreatePost,
  onOpenPresentation,
}: DashboardWelcomeHeroProps) {
  const ringColor =
    readiness >= 85 ? '#16a34a' : readiness >= 50 ? '#ff7a2f' : '#d97706'

  return (
    <header className="softree-dash__hero softree-dash__hero--workspace">
      <div className="softree-dash__hero-orbs" aria-hidden>
        <span className="softree-dash__orb softree-dash__orb--1" />
        <span className="softree-dash__orb softree-dash__orb--2" />
      </div>

      <div className="softree-dash__hero-inner softree-dash__hero-inner--workspace">
        <div className="softree-dash__hero-copy">
          <p className="softree-dash__eyebrow">Your editorial workspace</p>
          <h1 className="softree-dash__title">{greeting}</h1>
          <p className="softree-dash__subtitle">
            {loading ? 'Loading your content…' : subtitle}
          </p>

          <div className="softree-dash__hero-ctas">
            <button
              type="button"
              className="softree-dash__hero-cta softree-dash__hero-cta--primary"
              onClick={onCreateCaseStudy}
            >
              <CaseIcon aria-hidden />
              <span>
                <strong>New case study</strong>
                <small>Story → Page → Publish</small>
              </span>
            </button>
            <button
              type="button"
              className="softree-dash__hero-cta"
              onClick={onCreatePost}
            >
              <DocumentTextIcon aria-hidden />
              <span>
                <strong>New blog post</strong>
                <small>Content → Sections → Publish</small>
              </span>
            </button>
            <button
              type="button"
              className="softree-dash__hero-cta softree-dash__hero-cta--ghost"
              onClick={onOpenPresentation}
            >
              <EarthGlobeIcon aria-hidden />
              <span>
                <strong>Presentation</strong>
                <small>Edit on the live site</small>
              </span>
            </button>
          </div>
        </div>

        <div className="softree-dash__hero-readiness" aria-label="Publish readiness">
          <div
            className="softree-dash__readiness-ring"
            style={{
              background: `conic-gradient(${ringColor} ${readiness * 3.6}deg, rgba(15,23,42,0.08) 0)`,
            }}
          >
            <div className="softree-dash__readiness-ring-inner">
              <span className="softree-dash__readiness-value">
                {loading ? '—' : `${readiness}%`}
              </span>
              <span className="softree-dash__readiness-label">ready</span>
            </div>
          </div>
          <p className="softree-dash__readiness-caption">
            {loading
              ? 'Calculating…'
              : readiness >= 85
                ? 'Looking great — ship when you are ready'
                : 'Finish items in your queue below'}
          </p>
        </div>
      </div>
    </header>
  )
}
