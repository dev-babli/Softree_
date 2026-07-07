'use client'

import { CogIcon, EarthGlobeIcon, LaunchIcon, SparklesIcon } from '@sanity/icons'

type DashboardQuickToolsProps = {
  attentionCount: number
  siteUrl: string
  onNavigate: (path: string) => void
}

const TOOLS = [
  {
    id: 'content-agent',
    label: 'Content Agent',
    hint: 'AI blog drafts & audits',
    icon: SparklesIcon,
    path: '/studio/content-agent',
    accent: true,
  },
  {
    id: 'ai-voice',
    label: 'AI brand voice',
    hint: 'Powers field ✨ Assist',
    icon: SparklesIcon,
    path: '/studio/structure/siteSettings;aiContext',
    accent: true,
  },
  {
    id: 'presentation',
    label: 'Presentation',
    hint: 'Visual editing',
    icon: EarthGlobeIcon,
    path: '/studio/presentation',
  },
  {
    id: 'settings',
    label: 'Site settings',
    hint: 'SEO, slider, tokens',
    icon: CogIcon,
    path: '/studio/structure/siteSettings',
  },
] as const

export function DashboardQuickTools({ siteUrl, onNavigate }: DashboardQuickToolsProps) {
  return (
    <section className="softree-dash__panel softree-dash__tools">
      <div className="softree-dash__panel-head">
        <h2 className="softree-dash__panel-title softree-dash__panel-title--friendly">Tools</h2>
      </div>
      <div className="softree-dash__tools-grid">
        {TOOLS.map((tool) => {
          const Icon = tool.icon
          return (
            <button
              key={tool.id}
              type="button"
              className={`softree-dash__tool${tool.accent ? ' softree-dash__tool--accent' : ''}`}
              onClick={() => onNavigate(tool.path)}
            >
              <Icon aria-hidden style={{ width: 18, height: 18 }} />
              <span className="softree-dash__tool-label">{tool.label}</span>
              <span className="softree-dash__tool-hint">{tool.hint}</span>
            </button>
          )
        })}
        <a
          className="softree-dash__tool"
          href={siteUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LaunchIcon aria-hidden style={{ width: 18, height: 18 }} />
          <span className="softree-dash__tool-label">Live site</span>
          <span className="softree-dash__tool-hint">Open in new tab</span>
        </a>
      </div>
    </section>
  )
}
