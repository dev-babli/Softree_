import { assist } from '@sanity/assist'

import { useSoftreeAssistFieldActions } from './fieldActions'
import { SOFTREE_STYLE_CONTEXT } from './constants'
export { defaultFieldInstructions } from './instructions'

/** Enable AI Assist in Sanity project settings (sanity.io/manage) for your project. */
export const assistPlugin = assist({
  assist: {
    temperature: 0.3,
  },
  fieldActions: {
    title: 'Softree AI',
    useFieldActions: useSoftreeAssistFieldActions,
  },
})

export { SOFTREE_STYLE_CONTEXT }
