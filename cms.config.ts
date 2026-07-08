'use client'

/**
 * Softree CMS — greenfield Studio (src/cms/)
 * Legacy src/sanity/studio removed. Frontend still reads @/sanity/lib until Sprint 3.
 */

import './src/cms/studio/shell/studio.css'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { defineDocuments, presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId } from './src/cms/env'
import { cmsSchema } from './src/cms/schema'
import { cmsDefaultDocumentNode, cmsStructure } from './src/cms/studio/structure'
import { assistPlugin } from './src/cms/studio/assist/config'
import { GuardedPublishAction } from './src/cms/studio/actions/guardedPublishAction'
import { DuplicateAsDraftAction } from './src/cms/studio/actions/duplicateAsDraft'
import { FixKeysAction } from './src/cms/studio/actions/fixKeys'
import { GenerateSeoFromContentAction } from './src/cms/studio/actions/generateSeoFromContent'
import { MarkLiveOnWebsiteAction } from './src/cms/studio/actions/markLiveOnWebsiteAction'
import { GenerateFaqsFromContentAction } from './src/cms/studio/actions/generateFaqsFromContentAction'
import { GenerateBlocksFromStoryAction } from './src/cms/studio/actions/generatePremiumBlocksFromStory'
import { SyncLegacyCaseStudyFieldsAction } from './src/cms/studio/actions/syncLegacyCaseStudyFields'
import { contentAgentToolPlugin } from './src/cms/studio/plugins/contentAgentTool'
import { geminiImageToolPlugin } from './src/cms/studio/plugins/geminiImageTool'
import { reactBitsToolPlugin } from './src/cms/studio/plugins/reactBitsTool'
import {
  presentationLocations,
  previewOrigin,
} from './src/cms/studio/presentation/resolve'
import { documentTemplates } from './src/cms/studio/templates'
import { isEditorCreateTemplate } from './src/cms/lib/studio/editorTemplates'
import { CaseStudyDocumentBadge } from './src/cms/studio/badges/CaseStudyDocumentBadge'
import { StudioLayout } from './src/cms/studio/shell/StudioLayout'
import { StudioNavbar } from './src/cms/studio/shell/StudioNavbar'
import { SoftreeStudioIcon } from './src/cms/studio/shell/SoftreeStudioIcon'
import { softreeStudioTheme } from './src/cms/studio/shell/theme'

const singletonTypes = new Set([
  'homepageCaseStudySlider',
  'homepage',
  'globalSettings',
  'navigation',
  'footer',
  'careersPage',
  'aiContext',
])
const editorialTypes = new Set(['caseStudy', 'post', 'marketingPage'])

export default defineConfig({
  name: 'softree-cms',
  title: 'Softree CMS',
  icon: SoftreeStudioIcon,
  basePath: '/studio',
  projectId,
  dataset,
  theme: softreeStudioTheme,
  studio: {
    components: {
      layout: StudioLayout,
      navbar: StudioNavbar,
    },
  },
  schema: {
    types: cmsSchema.types,
    templates: (prev) => [...prev, ...documentTemplates],
  },
  plugins: [
    structureTool({ structure: cmsStructure, defaultDocumentNode: cmsDefaultDocumentNode }),
    presentationTool({
      resolve: {
        locations: presentationLocations,
        mainDocuments: defineDocuments([
          { route: '/', filter: '_type == "homepageCaseStudySlider"' },
          { route: '/blog', filter: '_type == "post"' },
          { route: '/blog/:slug', filter: '_type == "post" && slug.current == $slug' },
          { route: '/case-studies', filter: '_type == "caseStudy"' },
          {
            route: '/case-studies/:slug',
            filter: '_type == "caseStudy" && slug.current == $slug',
          },
          { route: '/p/:slug', filter: '_type == "marketingPage" && slug.current == $slug' },
        ]),
      },
      previewUrl: {
        origin: previewOrigin,
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
      allowOrigins: ['http://localhost:3000', 'https://www.softreetechnology.com'],
    }),
    assistPlugin,
    contentAgentToolPlugin(),
    geminiImageToolPlugin(),
    reactBitsToolPlugin(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    comments: { enabled: false },
    actions: (prev, context) => {
      if (editorialTypes.has(context.schemaType)) {
        const actions = prev.map((action) =>
          (action as { action?: string }).action === 'publish' ? GuardedPublishAction : action,
        )
        actions.push(
          DuplicateAsDraftAction,
          FixKeysAction,
          GenerateSeoFromContentAction,
          MarkLiveOnWebsiteAction,
        )
        if (context.schemaType === 'caseStudy') {
          actions.push(GenerateBlocksFromStoryAction)
          actions.push(SyncLegacyCaseStudyFieldsAction)
        }
        actions.push(GenerateFaqsFromContentAction)
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
    newDocumentOptions: (prev, { creationContext }) => {
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
