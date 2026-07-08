'use client'

import type {
  DefaultDocumentNodeResolver,
  StructureBuilder,
  StructureResolver,
  UserViewComponent,
} from 'sanity/structure'
import {
  CaseIcon,
  CogIcon,
  DocumentIcon,
  DocumentTextIcon,
  SparklesIcon,
} from '@sanity/icons'

import {
  CASE_STUDY_CATEGORY_CONFIG,
  CASE_STUDY_CATEGORY_KEYS,
} from '@/app/case-studies/categoryConfig'
import CaseStudyLivePreviewPane from '@/cms/studio/inputs/CaseStudyLivePreviewPane'
import { CASE_STUDY_NEEDS_WORK } from '@/cms/lib/studio/caseStudyCompleteness'
import { POST_NEEDS_WORK } from '@/cms/lib/studio/postCompleteness'
import {
  VISIBILITY_DRAFT_FILTER,
  VISIBILITY_PUBLISHED_FILTER,
} from '@/cms/lib/studio/visibilityField'

import StudioDashboard from '@/cms/studio/StudioDashboard'

const LivePreviewPane: UserViewComponent = (props) => <CaseStudyLivePreviewPane {...props} />

const EDITOR_VIEW = 'editor'
const PREVIEW_VIEW = 'preview'

function editorialDocumentNode(S: StructureBuilder) {
  return S.document().views([
    S.view.form().id(EDITOR_VIEW).title('Edit'),
    S.view.component(LivePreviewPane).id(PREVIEW_VIEW).title('Live preview'),
  ])
}

export const cmsDefaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
  switch (schemaType) {
    case 'caseStudy':
    case 'post':
      return editorialDocumentNode(S)
    default:
      return S.document().views([S.view.form()])
  }
}

const API = '2026-05-21'

const HIDDEN_TYPES = new Set([
  'callout',
  'ctaButton',
  'statHighlight',
  'pageHeroBlock',
  'pageFeatureGridBlock',
  'pageCtaBlock',
  'pageRichTextBlock',
  'pageTestimonialBlock',
  'csOverviewSection',
  'csNarrativeSection',
  'csCardGridSection',
  'csMetricsSection',
  'csSolutionSection',
  'csGallerySection',
  'csTestimonialSection',
  'csTechStackSection',
  'csBeforeAfterSection',
  'csFaqSection',
  'csRelatedSection',
  'csContactSection',
  'csReactBitsSection',
  'csHeroMetricsStrip',
  'csEvidencePanel',
])

const SINGLETONS = new Set([
  'homepageCaseStudySlider',
  'homepage',
  'globalSettings',
  'navigation',
  'footer',
  'careersPage',
  'aiContext',
])

function matchesSchemaIntent(type: string | undefined, schemaType: string) {
  return type === schemaType
}

function docList(
  S: StructureBuilder,
  opts: {
    id?: string
    title: string
    schemaType: string
    filter: string
    defaultOrdering?: { field: string; direction: 'asc' | 'desc' }[]
  },
) {
  let list = S.documentList()
    .title(opts.title)
    .schemaType(opts.schemaType)
    .apiVersion(API)
    .filter(opts.filter)
    .defaultOrdering(opts.defaultOrdering ?? [{ field: '_updatedAt', direction: 'desc' }])
    .canHandleIntent((intentName, { type }) => {
      if (intentName === 'edit') return matchesSchemaIntent(type, opts.schemaType)
      if (intentName === 'create') return matchesSchemaIntent(type, opts.schemaType)
      return false
    })

  if (opts.id) list = list.id(opts.id)
  return list
}

export const cmsStructure: StructureResolver = (S) => {
  const singletonItems = [...SINGLETONS].map((type) =>
    S.listItem()
      .title(type.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase()))
      .id(type)
      .child(S.document().schemaType(type).documentId(type)),
  )

  const categoryItems = CASE_STUDY_CATEGORY_KEYS.map((key) => {
    const config = CASE_STUDY_CATEGORY_CONFIG[key]
    return S.listItem()
      .title(config.title)
      .id(`caseStudies-${key}`)
      .child(
        docList(S, {
          title: config.title,
          schemaType: 'caseStudy',
          filter: `_type == "caseStudy" && category == "${key}" && ${CASE_STUDY_NEEDS_WORK}`,
        }),
      )
  })

  return S.list()
    .title('Softree CMS')
    .items([
      S.listItem()
        .title('Dashboard')
        .icon(SparklesIcon)
        .id('dashboard')
        .child(S.component().component(StudioDashboard).title('Dashboard')),
      S.divider(),
      S.listItem()
        .title('Case studies')
        .icon(CaseIcon)
        .child(
          S.list()
            .title('Case studies')
            .items([
              S.listItem()
                .title('All published')
                .child(
                  docList(S, {
                    id: 'caseStudiesPublished',
                    title: 'Published case studies',
                    schemaType: 'caseStudy',
                    filter: `_type == "caseStudy" && ${VISIBILITY_PUBLISHED_FILTER}`,
                  }),
                ),
              S.listItem()
                .title('Drafts on site')
                .child(
                  docList(S, {
                    id: 'caseStudiesDraft',
                    title: 'Draft on website',
                    schemaType: 'caseStudy',
                    filter: `_type == "caseStudy" && ${VISIBILITY_DRAFT_FILTER}`,
                  }),
                ),
              S.listItem()
                .title('Needs work')
                .child(
                  docList(S, {
                    id: 'caseStudiesNeedsWork',
                    title: 'Needs work',
                    schemaType: 'caseStudy',
                    filter: `_type == "caseStudy" && ${CASE_STUDY_NEEDS_WORK}`,
                  }),
                ),
              S.divider(),
              S.listItem()
                .title('Browse by category')
                .child(S.list().title('Category').items(categoryItems)),
            ]),
        ),
      S.listItem()
        .title('Blog')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem()
                .title('Published posts')
                .child(
                  docList(S, {
                    id: 'postsPublished',
                    title: 'Published posts',
                    schemaType: 'post',
                    filter: `_type == "post" && ${VISIBILITY_PUBLISHED_FILTER}`,
                  }),
                ),
              S.listItem()
                .title('Needs work')
                .child(
                  docList(S, {
                    id: 'postsNeedsWork',
                    title: 'Needs work',
                    schemaType: 'post',
                    filter: `_type == "post" && ${POST_NEEDS_WORK}`,
                  }),
                ),
            ]),
        ),
      S.listItem()
        .title('Marketing pages')
        .icon(DocumentIcon)
        .child(
          docList(S, {
            id: 'marketingPages',
            title: 'Marketing pages',
            schemaType: 'marketingPage',
            filter: '_type == "marketingPage"',
          }),
        ),
      S.listItem()
        .title('Service lines')
        .icon(DocumentIcon)
        .child(
          docList(S, {
            id: 'serviceLines',
            title: 'Service lines',
            schemaType: 'serviceLine',
            filter: '_type == "serviceLine"',
          }),
        ),
      S.listItem()
        .title('Tags')
        .icon(DocumentTextIcon)
        .child(
          docList(S, {
            id: 'tags',
            title: 'Tags',
            schemaType: 'tag',
            filter: '_type == "tag"',
          }),
        ),
      S.listItem()
        .title('Redirects')
        .icon(DocumentIcon)
        .child(
          docList(S, {
            id: 'redirects',
            title: 'Redirects',
            schemaType: 'redirect',
            filter: '_type == "redirect"',
          }),
        ),
      S.divider(),
      S.listItem()
        .title('Site settings')
        .icon(CogIcon)
        .child(S.list().title('Settings').items(singletonItems)),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId()
        return id && !HIDDEN_TYPES.has(id) && !SINGLETONS.has(id)
      }),
    ])
}
