import type { DefaultDocumentNodeResolver, StructureResolver } from 'sanity/structure'
import { CaseStudyLivePreviewPane } from './components/CaseStudyLivePreviewPane'
import MigrationScriptsNote from './components/MigrationScriptsNote'
import { caseStudyTemplateByCategory } from './templates'

const API = '2026-05-21'

const needsWorkFilter = `(
  !defined(excerpt) ||
  !defined(client) ||
  !defined(headerTitle) ||
  (
    !defined(body) &&
    !defined(challengeContent) &&
    !defined(challenge)
  ) ||
  (!defined(mainImage) && !defined(mainImageUrl)) ||
  coalesce(status, "published") == "draft"
) && coalesce(status, "published") != "archived"`

export const getDefaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
  if (schemaType === 'caseStudy') {
    return S.document()
      .views([
        S.view.form().id('editor').title('Content'),
        S.view.component(CaseStudyLivePreviewPane).id('preview').title('Preview'),
      ])
      .defaultPanes(['editor', 'preview'])
  }

  return S.document().views([S.view.form()])
}

function publishedList(S: Parameters<StructureResolver>[0], schemaType: string, title: string) {
  return S.documentList()
    .title(title)
    .schemaType(schemaType)
    .apiVersion(API)
    .filter(`_type == "${schemaType}" && coalesce(status, "published") == "published"`)
    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
}

function draftList(S: Parameters<StructureResolver>[0], schemaType: string, title: string) {
  return S.documentList()
    .title(title)
    .schemaType(schemaType)
    .apiVersion(API)
    .filter(`_type == "${schemaType}" && coalesce(status, "published") == "draft"`)
    .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
}

function archivedList(S: Parameters<StructureResolver>[0], schemaType: string, title: string) {
  return S.documentList()
    .title(title)
    .schemaType(schemaType)
    .apiVersion(API)
    .filter(`_type == "${schemaType}" && status == "archived"`)
    .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
}

function reviewList(
  S: Parameters<StructureResolver>[0],
  schemaType: string,
  reviewStatus: string,
  title: string,
) {
  return S.documentList()
    .title(title)
    .schemaType(schemaType)
    .apiVersion(API)
    .filter(`_type == "${schemaType}" && reviewStatus == "${reviewStatus}"`)
    .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
}

function needsWorkList(S: Parameters<StructureResolver>[0], schemaType: string, title: string) {
  return S.documentList()
    .title(title)
    .schemaType(schemaType)
    .apiVersion(API)
    .filter(`_type == "${schemaType}" && ${needsWorkFilter}`)
    .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
}

const CASE_CATEGORIES: Array<{ title: string; value: string }> = [
  { title: 'AI & ML', value: 'ai' },
  { title: 'Power Platform', value: 'power-platform' },
  { title: 'SharePoint', value: 'sharepoint' },
  { title: 'Web', value: 'web' },
  { title: 'Mobile', value: 'mobile' },
  { title: 'Data analytics', value: 'data-analytics' },
]

function editorialLists(
  S: Parameters<StructureResolver>[0],
  schemaType: string,
  publishedTitle: string,
  draftTitle: string,
  needsWorkTitle: string,
  archivedTitle: string,
) {
  return [
    S.listItem().title('Published').child(publishedList(S, schemaType, publishedTitle)),
    S.listItem().title('Drafts').child(draftList(S, schemaType, draftTitle)),
    S.listItem()
      .title('In review')
      .child(reviewList(S, schemaType, 'in-review', `${publishedTitle} — in review`)),
    S.listItem()
      .title('Approved')
      .child(reviewList(S, schemaType, 'approved', `${publishedTitle} — approved`)),
    S.listItem().title('Needs work').child(needsWorkList(S, schemaType, needsWorkTitle)),
    S.listItem().title('Archived').child(archivedList(S, schemaType, archivedTitle)),
  ]
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Softree Content')
    .items([
      S.listItem()
        .title('Start writing')
        .child(
          S.list()
            .title('New from template')
            .items([
              S.listItem()
                .title('Blog posts')
                .child(
                  S.list()
                    .title('Blog templates')
                    .items([
                      S.listItem()
                        .title('Standard article')
                        .child(S.document().schemaType('post').initialValueTemplate('post-article')),
                      S.listItem()
                        .title('How-to guide')
                        .child(S.document().schemaType('post').initialValueTemplate('post-how-to')),
                      S.listItem()
                        .title('Thought leadership')
                        .child(
                          S.document().schemaType('post').initialValueTemplate('post-thought-leadership'),
                        ),
                      S.listItem()
                        .title('Product update')
                        .child(S.document().schemaType('post').initialValueTemplate('post-product-update')),
                    ]),
                ),
              S.listItem()
                .title('Case studies')
                .child(
                  S.list()
                    .title('Case study templates')
                    .items(
                      CASE_CATEGORIES.map(({ title, value }) =>
                        S.listItem()
                          .title(title)
                          .child(
                            S.document()
                              .schemaType('caseStudy')
                              .initialValueTemplate(
                                caseStudyTemplateByCategory[value] || 'caseStudy-article',
                              ),
                          ),
                      ),
                    ),
                ),
              S.listItem()
                .title('Marketing landing page')
                .child(
                  S.document().schemaType('marketingPage').initialValueTemplate('marketing-landing'),
                ),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              ...editorialLists(
                S,
                'post',
                'Published posts',
                'Draft posts',
                'Posts needing content',
                'Archived posts',
              ),
              S.divider(),
              S.listItem()
                .title('All posts')
                .child(
                  S.documentList()
                    .title('All posts')
                    .schemaType('post')
                    .apiVersion(API)
                    .filter('_type == "post"')
                    .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }]),
                ),
            ]),
        ),

      S.listItem()
        .title('Case studies')
        .child(
          S.list()
            .title('Case studies')
            .items([
              ...editorialLists(
                S,
                'caseStudy',
                'Published case studies',
                'Draft case studies',
                'Case studies needing content',
                'Archived case studies',
              ),
              S.divider(),
              S.listItem()
                .title('By category')
                .child(
                  S.list()
                    .title('By category')
                    .items(
                      CASE_CATEGORIES.map(({ title, value }) =>
                        S.listItem()
                          .title(title)
                          .child(
                            S.documentList()
                              .title(`${title} case studies`)
                              .schemaType('caseStudy')
                              .apiVersion(API)
                              .filter(
                                `_type == "caseStudy" && category == "${value}" && coalesce(status, "published") == "published"`,
                              )
                              .initialValueTemplates([
                                S.initialValueTemplateItem(
                                  caseStudyTemplateByCategory[value] || 'caseStudy-article',
                                  (item) => item.title(`New ${title} case study`),
                                ),
                              ])
                              .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
                          ),
                      ),
                    ),
                ),
              S.listItem()
                .title('All case studies')
                .child(
                  S.documentList()
                    .title('All case studies')
                    .schemaType('caseStudy')
                    .apiVersion(API)
                    .filter('_type == "caseStudy"')
                    .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }]),
                ),
            ]),
        ),

      S.listItem()
        .title('Marketing pages')
        .child(
          S.list()
            .title('Marketing pages')
            .items([
              S.listItem()
                .title('Published')
                .child(
                  S.documentList()
                    .title('Published pages')
                    .schemaType('marketingPage')
                    .apiVersion(API)
                    .filter('_type == "marketingPage" && status == "published"')
                    .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }]),
                ),
              S.listItem()
                .title('Drafts')
                .child(
                  S.documentList()
                    .title('Draft pages')
                    .schemaType('marketingPage')
                    .apiVersion(API)
                    .filter('_type == "marketingPage" && coalesce(status, "draft") == "draft"')
                    .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }]),
                ),
              S.listItem()
                .title('In review')
                .child(
                  reviewList(S, 'marketingPage', 'in-review', 'Marketing pages in review'),
                ),
              S.listItem()
                .title('Approved')
                .child(reviewList(S, 'marketingPage', 'approved', 'Approved marketing pages')),
              S.listItem()
                .title('All pages')
                .child(
                  S.documentList()
                    .title('All marketing pages')
                    .schemaType('marketingPage')
                    .apiVersion(API)
                    .filter('_type == "marketingPage"')
                    .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }]),
                ),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('Library & settings')
        .child(
          S.list()
            .title('Library')
            .items([
              S.listItem()
                .title('Homepage case study slider')
                .child(
                  S.document()
                    .schemaType('homepageCaseStudySlider')
                    .documentId('homepageCaseStudySlider')
                    .title('Homepage Case Study Slider'),
                ),
              S.listItem()
                .title('Careers page')
                .child(
                  S.document()
                    .schemaType('careersPage')
                    .documentId('careersPage')
                    .title('Careers Page'),
                ),
              S.listItem()
                .title('Global settings')
                .child(
                  S.document()
                    .schemaType('globalSettings')
                    .documentId('globalSettings')
                    .title('Global Settings'),
                ),
              S.documentTypeListItem('aiContext').title('AI context (brand voice)'),
              S.documentTypeListItem('category').title('Categories'),
              S.documentTypeListItem('author').title('Authors'),
              S.listItem()
                .title('Migration scripts (CLI)')
                .child(S.component(MigrationScriptsNote).title('Migration scripts')),
            ]),
        ),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            'post',
            'caseStudy',
            'category',
            'author',
            'homepageCaseStudySlider',
            'globalSettings',
            'marketingPage',
            'aiContext',
            'careersPage',
            'callout',
            'ctaButton',
            'statHighlight',
            'pageHeroBlock',
            'pageFeatureGridBlock',
            'pageCtaBlock',
            'pageRichTextBlock',
            'pageTestimonialBlock',
          ].includes(item.getId()!),
      ),
    ])
