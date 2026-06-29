import { definePlugin } from 'sanity'
import { SparklesIcon } from '@sanity/icons'

import ContentAgentStudioTool from './ContentAgentStudioTool'

export const contentAgentToolPlugin = definePlugin({
  name: 'softree-content-agent-tool',
  tools: (prev) => [
    ...prev,
    {
      name: 'content-agent',
      title: 'Content Agent',
      icon: SparklesIcon,
      component: ContentAgentStudioTool,
    },
  ],
})
