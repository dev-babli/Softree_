import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Blog Posts')
        .child(
          S.list()
            .title('Blog Posts')
            .items([
              S.listItem()
                .title('Published')
                .child(
                  S.documentList()
                    .title('Published Blog Posts')
                    .schemaType('post')
                    .apiVersion('2026-05-21')
                    .filter('_type == "post" && coalesce(status, "published") == "published"')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
                ),
              S.listItem()
                .title('Archived')
                .child(
                  S.documentList()
                    .title('Archived Blog Posts')
                    .schemaType('post')
                    .apiVersion('2026-05-21')
                    .filter('_type == "post" && status == "archived"')
                    .defaultOrdering([{field: '_updatedAt', direction: 'desc'}]),
                ),
              S.divider(),
              S.listItem()
                .title('All Blog Posts')
                .child(
                  S.documentList()
                    .title('All Blog Posts')
                    .schemaType('post')
                    .apiVersion('2026-05-21')
                    .filter('_type == "post"')
                    .defaultOrdering([{field: '_updatedAt', direction: 'desc'}]),
                ),
            ]),
        ),
      S.listItem()
        .title('Case Studies')
        .child(
          S.list()
            .title('Case Studies')
            .items([
              S.listItem()
                .title('Published')
                .child(
                  S.documentList()
                    .title('Published Case Studies')
                    .schemaType('caseStudy')
                    .apiVersion('2026-05-21')
                    .filter('_type == "caseStudy" && coalesce(status, "published") == "published"')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
                ),
              S.listItem()
                .title('Archived')
                .child(
                  S.documentList()
                    .title('Archived Case Studies')
                    .schemaType('caseStudy')
                    .apiVersion('2026-05-21')
                    .filter('_type == "caseStudy" && status == "archived"')
                    .defaultOrdering([{field: '_updatedAt', direction: 'desc'}]),
                ),
              S.divider(),
              S.listItem()
                .title('All Case Studies')
                .child(
                  S.documentList()
                    .title('All Case Studies')
                    .schemaType('caseStudy')
                    .apiVersion('2026-05-21')
                    .filter('_type == "caseStudy"')
                    .defaultOrdering([{field: '_updatedAt', direction: 'desc'}]),
                ),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Homepage Case Study Slider")
        .child(
          S.documentList()
            .title('Homepage Case Study Slider')
            .schemaType('homepageCaseStudySlider')
            .apiVersion('2026-05-21')
            .filter('_type == "homepageCaseStudySlider"')
            .defaultOrdering([{field: '_updatedAt', direction: 'desc'}]),
        ),
      S.divider(),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !["post", "caseStudy", "category", "author", "homepageCaseStudySlider"].includes(item.getId()!),
      ),
    ])
