import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {pptImportPlugin} from './plugins/pptImport'

export default defineConfig({
  name: 'default',
  title: 'Softree Technology',

  projectId: '1zmh4sfw',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), pptImportPlugin()],

  schema: {
    types: schemaTypes,
  },
})
