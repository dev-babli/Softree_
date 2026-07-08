import { definePlugin } from 'sanity'
import { SparklesIcon } from '@sanity/icons'

import { LazyReactBitsStudioTool } from './LazyReactBitsStudioTool'

export const reactBitsToolPlugin = definePlugin({
  name: 'softree-react-bits-tool',
  tools: (prev) => [
    ...prev,
    {
      name: 'react-bits',
      title: 'React Bits',
      icon: SparklesIcon,
      component: LazyReactBitsStudioTool,
    },
  ],
})
