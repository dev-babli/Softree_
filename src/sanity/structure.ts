/**
 * Softree Studio structure — sidebar + split-pane authoring for editorial types.
 */

import type {
  DefaultDocumentNodeResolver,
  StructureBuilder,
  StructureResolver,
} from 'sanity/structure'
import {
  CaseIcon,
  CogIcon,
  DocumentIcon,
  DocumentTextIcon,
  SparklesIcon,
  TagIcon,
  UsersIcon,
} from '@sanity/icons'

import {CaseStudyLivePreviewPane} from './components/CaseStudyLivePreviewPane'
import {CASE_STUDY_NEEDS_WORK} from './lib/caseStudyCompleteness'
import {POST_NEEDS_WORK} from './lib/postCompleteness'
import StudioDashboard from './studio/StudioDashboard'

const EDITOR_VIEW = 'editor'
const PREVIEW_VIEW = 'preview'

function editorialDocumentNode(S: StructureBuilder) {
  return S.document()
    .views([
      S.view.form().id(EDITOR_VIEW).title('Edit'),
      S.view
        .component(CaseStudyLivePreviewPane)
        .id(PREVIEW_VIEW)
        .title('Live preview'),
    ])
    .defaultPanes([EDITOR_VIEW, PREVIEW_VIEW])
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
        .title('Home')
        .icon(SparklesIcon)
        .child(S.component(StudioDashboard).title('Dashboard')),

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
                .title('All case studies')
                .child(
                  docList(S, {
                    id: 'caseStudiesAll',
                    title: 'All case studies',
                    schemaType: 'caseStudy',
                    filter: '_type == "caseStudy"',
                  }),
                ),
              S.divider(),
              S.listItem()
                .title('New — page composer')
                .child(
                  S.document()
                    .schemaType('caseStudy')
                    .initialValueTemplate('caseStudy-composer'),
                ),
              S.listItem()
                .title('New — standard template')
                .child(
                  S.document()
                    .schemaType('caseStudy')
                    .initialValueTemplate('caseStudy-standard'),
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
              S.documentTypeListItem('post').title('All posts'),
              S.divider(),
              S.listItem()
                .title('New article (composer)')
                .child(S.document().schemaType('post').initialValueTemplate('post-composer')),
              S.listItem()
                .title('New classic article')
                .child(S.document().schemaType('post').initialValueTemplate('post-article')),
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
