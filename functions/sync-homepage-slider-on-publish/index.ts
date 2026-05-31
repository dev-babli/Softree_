import { createClient } from '@sanity/client'
import { documentEventHandler } from '@sanity/functions'

const SLIDER_ID = 'homepageCaseStudySlider'

type CaseStudyEvent = {
  _id: string
  _type: string
  featured?: boolean
  status?: string
  slug?: { current?: string }
}

function publishedId(id: string): string {
  return id.replace(/^drafts\./, '')
}

export const handler = documentEventHandler<CaseStudyEvent>(async ({ context, event }) => {
  const { data } = event
  if (data._type !== 'caseStudy') return
  if (!data.featured || data.status !== 'published') return

  const client = createClient({
    ...context.clientOptions,
    apiVersion: '2026-05-21',
  })

  const refId = publishedId(data._id)

  const slider = await client.fetch<{ slides?: Array<Record<string, unknown>> } | null>(
    `*[_id == $id][0]{ slides }`,
    { id: SLIDER_ID },
  )

  const slides = [...(slider?.slides || [])]
  const existingIndex = slides.findIndex((slide) => {
    const ref = slide.caseStudy as { _ref?: string } | undefined
    return ref?._ref === refId || ref?._ref === data._id
  })

  const caseStudyRef = { _type: 'reference', _ref: refId }

  if (existingIndex >= 0) {
    slides[existingIndex] = {
      ...slides[existingIndex],
      caseStudy: caseStudyRef,
    }
  } else {
    slides.unshift({
      _type: 'homepageSlide',
      _key: `featured-${refId.slice(0, 12)}`,
      caseStudy: caseStudyRef,
    })
  }

  await client
    .patch(SLIDER_ID)
    .setIfMissing({ _type: 'homepageCaseStudySlider', title: 'Homepage Case Study Slider' })
    .set({ slides: slides.slice(0, 8) })
    .commit({ autoGenerateArrayKeys: true })
})
