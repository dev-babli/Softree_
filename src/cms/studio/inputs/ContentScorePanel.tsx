'use client'

import type { StringInputProps } from 'sanity'
import { useFormValue } from 'sanity'

import { getPublishWarnings, publishReadinessPercent } from '@/cms/lib/studio/publishReadiness'
import { countFaqItems } from '@/cms/lib/studio/aeoCompleteness'

/** Editorial content score sidebar — publish readiness at a glance */
export default function ContentScorePanel(props: StringInputProps) {
  const doc = useFormValue([]) as Record<string, unknown> | undefined
  const docType = (doc?._type as string) || 'document'

  if (!doc || !['caseStudy', 'post', 'marketingPage'].includes(docType)) {
    return props.renderDefault(props)
  }

  const warnings = getPublishWarnings(docType, doc)
  const percent = publishReadinessPercent(docType, doc)
  const faqCount = countFaqItems(doc)

  return (
    <div className="softree-content-score" data-content-score>
      <div className="softree-content-score__header">
        <span>Content score</span>
        <strong>{percent}%</strong>
      </div>
      <div className="softree-readiness__bar" aria-hidden>
        <div className="softree-readiness__bar-fill" style={{ width: `${percent}%` }} />
      </div>
      <ul className="softree-content-score__list">
        <li>FAQ items: {faqCount}</li>
        {warnings.length === 0 ? (
          <li className="softree-content-score__ok">Ready to publish</li>
        ) : (
          warnings.slice(0, 5).map((warning) => (
            <li key={warning} className="softree-content-score__warn">
              {warning}
            </li>
          ))
        )}
      </ul>
      {props.renderDefault(props)}
    </div>
  )
}
