/**
 * Sanity CLI entry (schema extract, typegen, manifest).
 * Embedded Studio uses cms.config.ts directly — see src/app/studio/[[...tool]]/Studio.tsx
 */
import { defineConfig } from 'sanity'

import { schema } from './src/cms/schema/types'

export default defineConfig({
  name: 'softree-cms',
  title: 'Softree CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '1zmh4sfw',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  schema,
})
