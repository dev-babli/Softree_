import {definePlugin} from 'sanity'
import {pptImportStructure} from './structure'

export const pptImportPlugin = definePlugin({
  name: 'ppt-import',
  studio: {
    components: {
      ...(pptImportStructure as any),
    },
  },
})
