import { defineLocations, PresentationPluginOptions } from 'sanity/presentation'

/**
 * Document Locations for Sanity Presentation Tool
 * 
 * Defines where documents appear in the front-end.
 * Enables quick navigation between Structure and Presentation tools.
 * 
 * @see https://www.sanity.io/docs/presentation
 */
export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    // Service documents
    service: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
        category: 'serviceCategory',
      },
      resolve: (doc) => {
        const slug = doc?.slug
        const category = doc?.category
        return {
          locations: [
            {
              title: doc?.title || 'Untitled Service',
              href: slug ? `/services/${slug}` : '/services',
            },
            {
              title: 'Services Index',
              href: '/services',
            },
          ],
        }
      },
    }),

    // Case study documents
    caseStudy: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled Case Study',
            href: doc?.slug ? `/case-studies/${doc.slug}` : '/case-studies',
          },
          {
            title: 'Case Studies Index',
            href: '/case-studies',
          },
        ],
      }),
    }),

    // Blog post documents
    blogPost: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled Post',
            href: doc?.slug ? `/blog/${doc.slug}` : '/blog',
          },
          {
            title: 'Blog Index',
            href: '/blog',
          },
        ],
      }),
    }),

    // Team member documents
    teamMember: defineLocations({
      select: {
        name: 'name',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.name || 'Untitled Team Member',
            href: doc?.slug ? `/about-us/team/${doc.slug}` : '/about-us',
          },
          {
            title: 'About Us',
            href: '/about-us',
          },
        ],
      }),
    }),

    // FAQ documents
    faq: defineLocations({
      select: {
        question: 'question',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: 'FAQ Page',
            href: '/faq',
          },
        ],
      }),
    }),

    // Testimonial documents
    testimonial: defineLocations({
      select: {
        author: 'author',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: 'Homepage (Testimonials)',
            href: '/',
          },
          {
            title: 'Services (Testimonials)',
            href: '/services',
          },
        ],
      }),
    }),
  },
}
