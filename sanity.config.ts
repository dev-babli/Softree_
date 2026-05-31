'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {assistPlugin} from './src/sanity/assist/config'
import {resolve as presentationResolve} from './sanity/presentation/resolve'
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure, getDefaultDocumentNode} from './src/sanity/structure'
import {DuplicateAsDraftAction} from './src/sanity/actions/duplicateAsDraft'
import {FixKeysAction} from './src/sanity/actions/fixKeys'
import {GenerateSeoFromContentAction} from './src/sanity/actions/generateSeoFromContent'
import {GeneratePremiumBlocksFromStoryAction} from './src/sanity/actions/generatePremiumBlocksFromStory'
import {documentTemplates} from './src/sanity/templates'

const singletonTypes = new Set(['homepageCaseStudySlider', 'globalSettings'])

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: schema.types,
    templates: (prev) => [...prev, ...documentTemplates],
  },
  plugins: [
    structureTool({structure, defaultDocumentNode: getDefaultDocumentNode}),
    assistPlugin,
    presentationTool({
      resolve: {
        ...presentationResolve,
        mainDocuments: [
          {
            route: '/',
            filter: '_type == "homepageCaseStudySlider"',
          },
          {
            route: '/blog/:slug',
            filter: '_type == "post" && slug.current == $slug',
          },
          {
            route: '/case-studies/:slug',
            filter: '_type == "caseStudy" && slug.current == $slug',
          },
          {
            route: '/p/:slug',
            filter: '_type == "marketingPage" && slug.current == $slug',
          },
        ],
      },
      previewUrl: {
        origin: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
      allowOrigins: [
        'http://localhost:3000',
        'https://www.softreetechnology.com',
      ],
    }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
  document: {
    actions: (prev, context) => {
      if (
        context.schemaType === 'post' ||
        context.schemaType === 'caseStudy' ||
        context.schemaType === 'marketingPage'
      ) {
        const actions = [...prev, DuplicateAsDraftAction, FixKeysAction, GenerateSeoFromContentAction]
        if (context.schemaType === 'caseStudy') {
          actions.push(GeneratePremiumBlocksFromStoryAction)
        }
        return actions
      }
      return prev
    },
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type === 'global') {
        return prev.filter((templateItem) => !singletonTypes.has(templateItem.templateId))
      }
      return prev
    },
  },
})
