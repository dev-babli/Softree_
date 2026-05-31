import { defineBlueprint, defineDocumentFunction } from '@sanity/blueprints'

export default defineBlueprint({
  resources: [
    defineDocumentFunction({
      name: 'sync-homepage-slider-on-publish',
      displayName: 'Sync homepage slider on featured publish',
      event: {
        on: ['create', 'update'],
        filter: '_type == "caseStudy" && featured == true && status == "published"',
        projection: '{ _id, _type, featured, status, "slug": slug.current }',
      },
      env: {
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || '',
      },
    }),
    defineDocumentFunction({
      name: 'notify-on-publish',
      displayName: 'Slack notification on publish',
      event: {
        on: ['create', 'update'],
        filter:
          '_type in ["post", "caseStudy", "marketingPage"] && status == "published" && coalesce(reviewStatus, "approved") == "approved"',
        projection:
          '{ _id, _type, title, client, status, reviewStatus, "slug": slug.current }',
      },
      env: {
        SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL || '',
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || '',
        SANITY_STUDIO_URL: process.env.SANITY_STUDIO_URL || '',
      },
    }),
  ],
})
