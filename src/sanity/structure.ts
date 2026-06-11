import type {DefaultDocumentNodeResolver, StructureBuilder, StructureResolver} from 'sanity/structure'
import {
  CaseIcon,
  CogIcon,
  DocumentIcon,
  DocumentTextIcon,
  EarthGlobeIcon,
  HomeIcon,
  SparklesIcon,
  TagIcon,
  UsersIcon,
} from '@sanity/icons'
import {CaseStudyLivePreviewPane} from './components/CaseStudyLivePreviewPane'
import StudioDashboard from './studio/StudioDashboard'
import PresentationShortcut from './studio/PresentationShortcut'
import { CASE_STUDY_NEEDS_WORK } from './lib/caseStudyCompleteness'
import { POST_NEEDS_WORK } from './lib/postCompleteness'

const API = '2026-05-21'

/** Document types that are embedded blocks — never show in sidebar */
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
])

/** Singletons — fixed document IDs, excluded from generic lists */
const SINGLETONS = new Set(['homepageCaseStudySlider', 'globalSettings', 'careersPage'])

export const getDefaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  if (schemaType === 'caseStudy') {
    return S.document()
      .views([
        S.view.form().id('editor').title('Edit'),
        S.view.component(CaseStudyLivePreviewPane).id('preview').title('Live preview'),
      ])
      .defaultPanes(['editor', 'preview'])
  }

  return S.document().views([S.view.form()])
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

  if (opts.id) {
    list = list.id(opts.id)
  }

  return list
}

function singleton(S: StructureBuilder, typeName: string, title: string, documentId: string) {
  return S.listItem()
    .title(title)
    .child(S.document().schemaType(typeName).documentId(documentId).title(title))
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Softree Studio')
    .items([
      // ── Home ──
      S.listItem()
        .id('dashboard')
        .title('Dashboard')
        .icon(HomeIcon)
        .child(S.component(StudioDashboard).title('Dashboard')),

      S.listItem()
        .id('presentationShortcut')
        .title('Presentation mode')
        .icon(EarthGlobeIcon)
        .child(S.component(PresentationShortcut).title('Presentation')),

      S.divider(),

      // ── Site pages (singletons) ──
      S.listItem()
        .id('siteSettings')
        .title('Site & pages')
        .icon(CogIcon)
        .child(
          S.list()
            .id('siteSettingsMenu')
            .title('Site & pages')
            .items([
              singleton(S, 'globalSettings', 'Global settings', 'globalSettings'),
              singleton(S, 'homepageCaseStudySlider', 'Homepage case study slider', 'homepageCaseStudySlider'),
              singleton(S, 'careersPage', 'Careers page', 'careersPage'),
            ]),
        ),

      S.divider(),

      // ── Case studies (primary content) ──
      S.listItem()
        .id('caseStudies')
        .title('Case studies')
        .icon(CaseIcon)
        .child(
          S.list()
            .id('caseStudiesMenu')
            .title('Case studies')
            .items([
              S.listItem()
                .id('caseStudiesNeedsWork')
                .title('Needs work')
                .icon(SparklesIcon)
                .child(
                  docList(S, {
                    title: 'Case studies needing content',
                    schemaType: 'caseStudy',
                    filter: `_type == "caseStudy" && ${CASE_STUDY_NEEDS_WORK}`,
                  }),
                ),
              S.listItem()
                .id('caseStudiesDrafts')
                .title('Drafts')
                .child(
                  docList(S, {
                    title: 'Draft case studies',
                    schemaType: 'caseStudy',
                    filter: `_type == "caseStudy" && coalesce(status, "published") == "draft"`,
                  }),
                ),
              S.listItem()
                .id('caseStudiesPublished')
                .title('Published')
                .child(
                  docList(S, {
                    title: 'Published case studies',
                    schemaType: 'caseStudy',
                    filter: `_type == "caseStudy" && coalesce(status, "published") == "published"`,
                    defaultOrdering: [{field: 'publishedAt', direction: 'desc'}],
                  }),
                ),
              S.listItem()
                .id('caseStudiesArchived')
                .title('Archived')
                .child(
                  docList(S, {
                    title: 'Archived case studies',
                    schemaType: 'caseStudy',
                    filter: `_type == "caseStudy" && status == "archived"`,
                  }),
                ),
              S.divider(),
              S.listItem()
                .id('caseStudiesAll')
                .title('All case studies')
                .child(
                  docList(S, {
                    id: 'caseStudiesAllList',
                    title: 'All case studies',
                    schemaType: 'caseStudy',
                    filter: '_type == "caseStudy"',
                  }),
                ),
              S.listItem()
                .title('＋ Page composer')
                .child(
                  S.document().schemaType('caseStudy').initialValueTemplate('caseStudy-composer'),
                ),
              S.listItem()
                .title('＋ New case study')
                .child(S.document().schemaType('caseStudy').initialValueTemplate('caseStudy-standard')),
            ]),
        ),

      // ── Blog ──
      S.listItem()
        .id('blog')
        .title('Blog')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .id('blogMenu')
            .title('Blog')
            .items([
              S.listItem()
                .id('postsNeedsWork')
                .title('Needs work')
                .icon(SparklesIcon)
                .child(
                  docList(S, {
                    title: 'Posts needing content',
                    schemaType: 'post',
                    filter: `_type == "post" && ${POST_NEEDS_WORK}`,
                  }),
                ),
              S.listItem()
                .title('Published')
                .child(
                  docList(S, {
                    title: 'Published posts',
                    schemaType: 'post',
                    filter: '_type == "post" && coalesce(status, "published") == "published"',
                    defaultOrdering: [{field: 'publishedAt', direction: 'desc'}],
                  }),
                ),
              S.listItem()
                .title('Drafts')
                .child(
                  docList(S, {
                    title: 'Draft posts',
                    schemaType: 'post',
                    filter: '_type == "post" && coalesce(status, "published") == "draft"',
                  }),
                ),
              S.divider(),
              S.listItem()
                .id('postsAll')
                .title('All posts')
                .child(docList(S, {title: 'All posts', schemaType: 'post', filter: '_type == "post"'})),
              S.listItem()
                .title('＋ New article')
                .child(S.document().schemaType('post').initialValueTemplate('post-article')),
              S.divider(),
              S.documentTypeListItem('author').title('Authors').icon(UsersIcon),
              S.documentTypeListItem('category').title('Categories').icon(TagIcon),
            ]),
        ),

      // ── Marketing ──
      S.listItem()
        .id('marketing')
        .title('Marketing pages')
        .icon(DocumentIcon)
        .child(
          S.list()
            .id('marketingMenu')
            .title('Marketing pages')
            .items([
              S.listItem()
                .title('Published')
                .child(
                  docList(S, {
                    title: 'Published pages',
                    schemaType: 'marketingPage',
                    filter: '_type == "marketingPage" && status == "published"',
                  }),
                ),
              S.listItem()
                .title('Drafts')
                .child(
                  docList(S, {
                    title: 'Draft pages',
                    schemaType: 'marketingPage',
                    filter: '_type == "marketingPage" && coalesce(status, "draft") == "draft"',
                  }),
                ),
              S.divider(),
              S.listItem()
                .title('All pages')
                .child(
                  docList(S, {
                    title: 'All marketing pages',
                    schemaType: 'marketingPage',
                    filter: '_type == "marketingPage"',
                  }),
                ),
              S.listItem()
                .title('＋ New landing page')
                .child(S.document().schemaType('marketingPage').initialValueTemplate('marketing-landing')),
            ]),
        ),

      S.divider(),

      // ── Reference data ──
      S.listItem()
        .id('reference')
        .title('Reference')
        .child(
          S.list()
            .id('referenceMenu')
            .title('Reference data')
            .items([S.documentTypeListItem('aiContext').title('AI brand voice')]),
        ),

      // Safety net — only unexpected document types (not blocks or handled above)
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
