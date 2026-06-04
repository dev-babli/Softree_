import {definePlugin} from 'sanity'
import {pptImportStructure} from './structure'

export const pptImportPlugin = definePlugin({
  name: 'ppt-import',
  title: 'PPT Import',
  description: 'Import case studies from PowerPoint presentations',
  studio: {
    components: {
      ...(pptImportStructure as any),
    },
  },
})
