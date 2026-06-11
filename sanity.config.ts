'use client'

/**
 * Softree embedded Sanity Studio — mounted at /studio
 */

import './src/sanity/studio/studio.css'

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'

import {assistPlugin} from './src/sanity/assist/config'
import {geminiImageToolPlugin} from './src/sanity/plugins/geminiImageTool'
import {reactBitsToolPlugin} from './src/sanity/plugins/reactBitsTool'
import {resolve as presentationResolve} from './src/sanity/presentation/resolve'
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure, getDefaultDocumentNode} from './src/sanity/structure'
import {DuplicateAsDraftAction} from './src/sanity/actions/duplicateAsDraft'
import {FixKeysAction} from './src/sanity/actions/fixKeys'
import {GenerateSeoFromContentAction} from './src/sanity/actions/generateSeoFromContent'
import {GenerateBlocksFromStoryAction} from './src/sanity/actions/generatePremiumBlocksFromStory'
import {documentTemplates} from './src/sanity/templates'
import {CaseStudyDocumentBadge} from './src/sanity/badges/CaseStudyDocumentBadge'
import {softreeStudioTheme} from './src/sanity/studio/theme'
import {SoftreeStudioIcon} from './src/sanity/studio/SoftreeStudioIcon'
import {StudioLayout} from './src/sanity/studio/StudioLayout'
import {StudioNavbar} from './src/sanity/studio/StudioNavbar'
import {StudioToolMenu} from './src/sanity/studio/StudioToolMenu'

const singletonTypes = new Set(['homepageCaseStudySlider', 'globalSettings', 'careersPage'])

export default defineConfig({
  name: 'softree',
  title: 'Softree Studio',
  icon: SoftreeStudioIcon,
  basePath: '/studio',
  projectId,
  dataset,
  theme: softreeStudioTheme,
  schema: {
    types: schema.types,
    templates: (prev) => [...prev, ...documentTemplates],
  },
  studio: {
    components: {
      layout: StudioLayout,
      navbar: StudioNavbar,
      toolMenu: StudioToolMenu,
    },
  },
  plugins: [
    structureTool({structure, defaultDocumentNode: getDefaultDocumentNode}),
    assistPlugin,
    geminiImageToolPlugin(),
    reactBitsToolPlugin(),
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
          actions.push(GenerateBlocksFromStoryAction)
        }
        return actions
      }
      return prev
    },
    badges: (prev, context) => {
      if (context.schemaType === 'caseStudy') {
        return [...prev, CaseStudyDocumentBadge]
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
