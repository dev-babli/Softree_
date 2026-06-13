"use client"

import { useMemo } from "react"
import type { ObjectInputProps } from "sanity"

import { getAeoPublishIssues, type AeoCompletenessDoc } from '../lib/aeoCompleteness'
import { caseStudyHasStoryContent, type CaseStudyCompletenessDoc } from '../lib/caseStudyCompleteness'
import { postHasContent, type PostCompletenessDoc } from '../lib/postCompleteness'
import { isCaseStudyCategory } from '@/app/case-studies/categoryConfig'

type EditorDocShape = CaseStudyCompletenessDoc &
  PostCompletenessDoc &
  AeoCompletenessDoc & {
  _type?: string
  title?: string
  slug?: { current?: string }
  client?: string
  headerTitle?: string
  excerpt?: string
  category?: string
  mainImage?: { asset?: { _ref?: string } }
  mainImageUrl?: string
  sections?: unknown[]
}

function storyContentPass(doc: EditorDocShape): boolean {
  if (doc._type === 'post') return postHasContent(doc)
  if (doc._type === 'marketingPage') return (doc.sections?.length ?? 0) > 0
  return caseStudyHasStoryContent(doc)
}

export default function EditorProgressInput(props: ObjectInputProps) {
  // @ts-expect-error -- documented pattern in Sanity input components
  const doc = props?.context?.document as EditorDocShape | undefined
  const docType = doc?._type

  const { percent, checks } = useMemo(() => {
    const d = doc || {}
    const aeoIssues = getAeoPublishIssues(d)
    const isCaseStudy = docType === 'caseStudy'
    const isPost = docType === 'post'
    const isMarketing = docType === 'marketingPage'

    const items: Array<{ label: string; pass: boolean }> = [
      { label: 'Title', pass: !!d.title },
      { label: 'Slug', pass: !!d.slug?.current },
    ]

    if (isCaseStudy) {
      items.push(
        { label: 'Client', pass: !!d.client },
        { label: 'Header title', pass: !!d.headerTitle },
        { label: 'Technology category', pass: !!d.category && isCaseStudyCategory(d.category) },
      )
    }

    if (!isMarketing) {
      items.push({ label: 'Excerpt', pass: !!d.excerpt })
    }

    if (!isMarketing) {
      items.push({
        label: 'Cover',
        pass: !!(d.mainImage?.asset?._ref || d.mainImageUrl),
      })
    }

    items.push({
      label: isMarketing ? 'Sections' : 'Story',
      pass: storyContentPass(d),
    })

    if (!isMarketing) {
      items.push(
        { label: 'Meta title', pass: !aeoIssues.some((issue) => issue.startsWith('meta title')) },
        {
          label: 'Meta description',
          pass: !aeoIssues.some((issue) => issue.startsWith('meta description')),
        },
        { label: 'FAQ (AEO)', pass: !aeoIssues.some((issue) => issue.startsWith('FAQ')) },
      )
    }

    const passed = items.filter((c) => c.pass).length
    const pct = Math.round((passed / items.length) * 100)
    return { percent: pct, checks: items }
  }, [doc, docType])

  const barColor = percent >= 85 ? '#16a34a' : percent >= 50 ? '#ff7a2f' : '#d97706'
  const missing = checks.filter((c) => !c.pass)

  return (
    <div className="softree-readiness">
      <div className="softree-readiness__head">
        <span className="softree-readiness__title">Publish readiness</span>
        <span className="softree-readiness__pct" style={{ color: barColor }}>
          {percent}%
        </span>
      </div>
      <div className="softree-readiness__bar">
        <div
          className="softree-readiness__bar-fill"
          style={{ width: `${percent}%`, background: barColor }}
        />
      </div>
      <div className="softree-readiness__checks">
        {checks.map((check) => (
          <span
            key={check.label}
            className={`softree-readiness__check ${check.pass ? 'is-done' : 'is-missing'}`}
          >
            {check.label}
          </span>
        ))}
      </div>
      {missing.length > 0 ? (
        <p className="softree-readiness__hint">
          Next: {missing.map((m) => m.label.toLowerCase()).join(', ')}
        </p>
      ) : (
        <p className="softree-readiness__hint is-ready">
          Ready to publish — click Publish to push live (syncs Status + date)
        </p>
      )}
      <p className="softree-readiness__hint" style={{ marginTop: '0.5rem', opacity: 0.85 }}>
        Saving in Studio is not enough: use the green Publish button. Status must be Published for
        the website to show this document.
      </p>
    </div>
  )
}
