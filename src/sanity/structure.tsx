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
  EarthGlobeIcon,
  SparklesIcon,
  TagIcon,
  UsersIcon,
} from '@sanity/icons'

import {
  CASE_STUDY_CATEGORY_CONFIG,
  CASE_STUDY_CATEGORY_KEYS,
} from '@/app/case-studies/categoryConfig'
import CaseStudyLivePreviewPane from './components/CaseStudyLivePreviewPane'
import {CASE_STUDY_NEEDS_WORK} from './lib/caseStudyCompleteness'
import {POST_NEEDS_WORK} from './lib/postCompleteness'
import PresentationShortcut from './studio/PresentationShortcut'
import StudioDashboard from './studio/StudioDashboard'

/**
 * Sanity structure `.component()` / `.view.component()` require plain functions
 * defined in this module — not memo() wrappers or opaque re-exports.
 */
function DashboardPane() {
  return <StudioDashboard />
}

function PresentationPane() {
  return <PresentationShortcut />
}

const LivePreviewPane: UserViewComponent = (props) => <CaseStudyLivePreviewPane {...props} />

const EDITOR_VIEW = 'editor'
const PREVIEW_VIEW = 'preview'

function editorialDocumentNode(S: StructureBuilder) {
  // Note: deliberately NOT using .defaultPanes([EDITOR_VIEW, PREVIEW_VIEW]).
  // Auto-split bootstrap caused "Too many re-renders" (#301) on production.
  return S.document().views([
    S.view.form().id(EDITOR_VIEW).title('Edit'),
    S.view.component(LivePreviewPane).id(PREVIEW_VIEW).title('Live preview'),
  ])
}

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
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

const SINGLETONS = new Set(['homepageCaseStudySlider', 'globalSettings', 'careersPage', 'aiContext'])

/** Route create/edit intents to the correct document list (Sanity structure docs). */
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
    defaultOrdering?: {field: string; direction: 'asc' | 'desc'}[]
  },
) {
  let list = S.documentList()
    .title(opts.title)
    .schemaType(opts.schemaType)
    .apiVersion(API)
    .filter(opts.filter)
    .defaultOrdering(opts.defaultOrdering ?? [{field: '_updatedAt', direction: 'desc'}])
    .canHandleIntent((intentName, {type}) => {
      if (intentName === 'edit') return matchesSchemaIntent(type, opts.schemaType)
      if (intentName === 'create') return matchesSchemaIntent(type, opts.schemaType)
      return false
    })

  if (opts.id) list = list.id(opts.id)
  return list
}

function singleton(S: StructureBuilder, typeName: string, title: string, documentId: string) {
  return S.listItem()
    .title(title)
    .child(S.document().schemaType(typeName).documentId(documentId).title(title))
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .id('dashboard')
        .title('Workspace')
        .icon(SparklesIcon)
        .child(S.component(DashboardPane).title('Workspace')),

      S.listItem()
        .id('presentationShortcut')
        .title('Presentation')
        .icon(EarthGlobeIcon)
        .child(S.component(PresentationPane).title('Presentation')),

      S.divider(),

      S.listItem()
        .id('caseStudies')
        .title('Case studies')
        .icon(CaseIcon)
        .child(
          S.list()
            .title('Case studies')
            .items([
              S.listItem()
                .title('＋ New case study')
                .icon(SparklesIcon)
                .child(
                  S.document()
                    .schemaType('caseStudy')
                    .title('New case study')
                    .initialValueTemplate('caseStudy-composer'),
                ),
              S.divider(),
              S.listItem()
                .title('Needs work')
                .icon(SparklesIcon)
                .child(
                  docList(S, {
                    id: 'caseStudiesNeedsWork',
                    title: 'Needs content',
                    schemaType: 'caseStudy',
                    filter: `_type == "caseStudy" && ${CASE_STUDY_NEEDS_WORK}`,
                  }),
                ),
              S.listItem()
                .title('Browse by category')
                .child(
                  S.list()
                    .title('By service line')
                    .items([
                      ...CASE_STUDY_CATEGORY_KEYS.map((key) =>
                        S.listItem()
                          .title(CASE_STUDY_CATEGORY_CONFIG[key].title)
                          .child(
                            docList(S, {
                              id: `caseStudiesCat_${key}`,
                              title: CASE_STUDY_CATEGORY_CONFIG[key].title,
                              schemaType: 'caseStudy',
                              filter: `_type == "caseStudy" && category == "${key}"`,
                            }),
                          ),
                      ),
                      S.divider(),
                      S.listItem()
                        .title('Missing category')
                        .child(
                          docList(S, {
                            id: 'caseStudiesNoCategory',
                            title: 'Missing category',
                            schemaType: 'caseStudy',
                            filter: '_type == "caseStudy" && !defined(category)',
                          }),
                        ),
                    ]),
                ),
              S.listItem()
                .title('Published')
                .child(
                  docList(S, {
                    id: 'caseStudiesPublished',
                    title: 'Published case studies',
                    schemaType: 'caseStudy',
                    filter: '_type == "caseStudy" && !(_id in path("drafts.**"))',
                  }),
                ),
              S.listItem()
                .title('Drafts')
                .child(
                  docList(S, {
                    id: 'caseStudiesDrafts',
                    title: 'Draft case studies',
                    schemaType: 'caseStudy',
                    filter: '_type == "caseStudy" && _id in path("drafts.**")',
                  }),
                ),
              S.listItem()
                .title('All case studies')
                .child(
                  docList(S, {
                    id: 'caseStudiesAll',
                    title: 'All case studies',
                    schemaType: 'caseStudy',
                    filter: '_type == "caseStudy"',
                  }),
                ),
            ]),
        ),

      S.listItem()
        .id('blog')
        .title('Blog')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem()
                .title('＋ New blog post')
                .icon(SparklesIcon)
                .child(
                  S.document()
                    .schemaType('post')
                    .title('New blog post')
                    .initialValueTemplate('post-composer'),
                ),
              S.divider(),
              S.listItem()
                .title('Needs work')
                .icon(SparklesIcon)
                .child(
                  docList(S, {
                    id: 'postsNeedsWork',
                    title: 'Posts needing content',
                    schemaType: 'post',
                    filter: `_type == "post" && ${POST_NEEDS_WORK}`,
                  }),
                ),
              S.listItem()
                .title('All posts')
                .child(
                  docList(S, {
                    id: 'postsAll',
                    title: 'All posts',
                    schemaType: 'post',
                    filter: '_type == "post"',
                  }),
                ),
              S.divider(),
              S.documentTypeListItem('author').title('Authors').icon(UsersIcon),
              S.documentTypeListItem('category').title('Categories').icon(TagIcon),
            ]),
        ),

      S.listItem()
        .id('marketing')
        .title('Marketing pages')
        .icon(DocumentIcon)
        .child(S.documentTypeList('marketingPage').title('Marketing pages')),

      S.divider(),

      S.listItem()
        .id('siteSettings')
        .title('Site settings')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Site settings')
            .items([
              singleton(S, 'globalSettings', 'Global settings', 'globalSettings'),
              singleton(S, 'aiContext', 'AI brand voice', 'aiContext'),
              singleton(S, 'homepageCaseStudySlider', 'Homepage slider', 'homepageCaseStudySlider'),
              singleton(S, 'careersPage', 'Careers page', 'careersPage'),
            ]),
        ),

      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId()
        if (!id) return false
        if (HIDDEN_TYPES.has(id)) return false
        if (SINGLETONS.has(id)) return false
        if (['post', 'caseStudy', 'marketingPage', 'category', 'author', 'aiContext'].includes(id)) {
          return false
        }
        return true
      }),
    ])
