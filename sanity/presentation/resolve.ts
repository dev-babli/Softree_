import { defineLocations, PresentationPluginOptions } from 'sanity/presentation'
import { CASE_STUDY_LAYOUTS } from '../../src/lib/case-study-layouts'
import { CLASSIC_LAYOUT_VALUE } from '../../src/sanity/lib/layoutPreview'

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    post: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Blog post', href: doc?.slug ? `/blog/${doc.slug}` : '/blog' },
          { title: 'Blog index', href: '/blog' },
        ],
      }),
    }),

    caseStudy: defineLocations({
      select: { title: 'title', slug: 'slug.current', category: 'category' },
      resolve: (doc) => {
        const slugPath = doc?.slug ? `/case-studies/${doc.slug}` : '/case-studies'
        const locations = [
          {
            title: doc?.title || 'Case study',
            href: slugPath,
          },
          { title: 'Case studies index', href: '/case-studies' },
        ]
        if (doc?.category) {
          locations.push({
            title: `${doc.category} category`,
            href: `/case-studies/${doc.category}`,
          })
        }
        if (doc?.slug) {
          locations.push({
            title: 'Layout preview: Classic (light)',
            href: `${slugPath}?layout=${CLASSIC_LAYOUT_VALUE}`,
          })
          for (const layout of CASE_STUDY_LAYOUTS) {
            locations.push({
              title: `Layout preview: ${layout.title}`,
              href: `${slugPath}?layout=${layout.value}`,
            })
          }
        }
        return { locations }
      },
    }),

    marketingPage: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Marketing page', href: doc?.slug ? `/p/${doc.slug}` : '/' },
        ],
      }),
    }),

    homepageCaseStudySlider: defineLocations({
      select: { title: 'title' },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || 'Homepage slider', href: '/' }],
      }),
    }),

    globalSettings: defineLocations({
      select: { siteName: 'siteName' },
      resolve: (doc) => ({
        locations: [{ title: doc?.siteName || 'Global settings', href: '/' }],
      }),
    }),

    category: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Category', href: '/blog' },
        ],
      }),
    }),

    author: defineLocations({
      select: { name: 'name' },
      resolve: (doc) => ({
        locations: [{ title: doc?.name || 'Author', href: '/blog' }],
      }),
    }),
  },
}
