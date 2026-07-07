'use client'

/**
 * Softree Studio — embedded Sanity at /studio
 * @see src/app/studio/[[...tool]]/page.tsx
 */

import './src/sanity/studio/studio.css'

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {defineDocuments, presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'

import {assistPlugin} from './src/sanity/assist/config'
import {GuardedPublishAction} from './src/sanity/actions/guardedPublishAction'
import {DuplicateAsDraftAction} from './src/sanity/actions/duplicateAsDraft'
import {FixKeysAction} from './src/sanity/actions/fixKeys'
import {GenerateSeoFromContentAction} from './src/sanity/actions/generateSeoFromContent'
import {GenerateBlocksFromStoryAction} from './src/sanity/actions/generatePremiumBlocksFromStory'
import {contentAgentToolPlugin} from './src/sanity/plugins/contentAgentTool'
import {geminiImageToolPlugin} from './src/sanity/plugins/geminiImageTool'
import {reactBitsToolPlugin} from './src/sanity/plugins/reactBitsTool'
import {presentationLocations, previewOrigin} from './src/sanity/presentation/resolve'
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {defaultDocumentNode, structure} from './src/sanity/structure'
import {documentTemplates} from './src/sanity/templates'
import {isEditorCreateTemplate} from './src/sanity/lib/editorTemplates'
import {CaseStudyDocumentBadge} from './src/sanity/badges/CaseStudyDocumentBadge'
import {StudioLayout} from './src/sanity/studio/StudioLayout'
import {StudioNavbar} from './src/sanity/studio/StudioNavbar'
import {StudioToolMenu} from './src/sanity/studio/StudioToolMenu'
import {SoftreeStudioIcon} from './src/sanity/studio/SoftreeStudioIcon'
import {softreeStudioTheme} from './src/sanity/studio/theme'

const singletonTypes = new Set(['homepageCaseStudySlider', 'globalSettings', 'careersPage', 'aiContext'])
const editorialTypes = new Set(['post', 'caseStudy', 'marketingPage'])

export default defineConfig({
  name: 'softree',
  title: 'Softree Studio',
  icon: SoftreeStudioIcon,
  basePath: '/studio',
  projectId,
  dataset,
  theme: softreeStudioTheme,
  studio: {
    components: {
      layout: StudioLayout,
      navbar: StudioNavbar,
      toolMenu: StudioToolMenu,
    },
  },
  schema: {
    types: schema.types,
    templates: (prev) => [...prev, ...documentTemplates],
  },
  plugins: [
    structureTool({structure, defaultDocumentNode}),
    presentationTool({
      resolve: {
        locations: presentationLocations,
        mainDocuments: defineDocuments([
          {
            route: '/',
            filter: '_type == "homepageCaseStudySlider"',
          },
          {
            route: '/blog',
            filter: '_type == "post"',
          },
          {
            route: '/blog/:slug',
            filter: '_type == "post" && slug.current == $slug',
          },
          {
            route: '/case-studies',
            filter: '_type == "caseStudy"',
          },
          {
            route: '/case-studies/:slug',
            filter: '_type == "caseStudy" && slug.current == $slug',
          },
          {
            route: '/p/:slug',
            filter: '_type == "marketingPage" && slug.current == $slug',
          },
        ]),
      },
      previewUrl: {
        origin: previewOrigin,
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
    assistPlugin,
    contentAgentToolPlugin(),
    geminiImageToolPlugin(),
    reactBitsToolPlugin(),
    visionTool({defaultApiVersion: apiVersion}),
  ],
  document: {
    // Case studies/posts use many named object arrays; Studio comments on those
    // fields triggered "Too many re-renders" (sanity-io/sanity#12000, fixed in 5.9+).
    // Keep disabled until we confirm v6.3+ is stable in production.
    comments: {
      enabled: false,
    },
    actions: (prev, context) => {
      if (editorialTypes.has(context.schemaType)) {
        const actions = prev.map((action) =>
          (action as {action?: string}).action === 'publish' ? GuardedPublishAction : action,
        )
        actions.push(
          DuplicateAsDraftAction,
          FixKeysAction,
          GenerateSeoFromContentAction,
        )
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
        return prev.filter(
          (templateItem) =>
            !singletonTypes.has(templateItem.templateId) &&
            isEditorCreateTemplate(templateItem.templateId),
        )
      }
      return prev
    },
  },
})
