'use client'

import {Card, Stack, Text} from '@sanity/ui'
import type {ArrayOfObjectsInputProps} from 'sanity'

/** Header above the drag-and-drop page composer array */
export default function ComposerSectionsInput(props: ArrayOfObjectsInputProps) {
  const {renderDefault} = props

  return (
    <Stack space={4}>
      <Card padding={4} radius={3} tone="transparent" style={{background: '#f7f6f3', border: '1px solid rgba(15,23,42,0.08)'}}>
        <Stack space={3}>
          <Text size={2} weight="semibold">
            Page composer
          </Text>
          <Text size={1} muted style={{lineHeight: 1.55, maxWidth: '42rem'}}>
            Drag sections to reorder. Use the <strong>grid view</strong> when adding blocks to pick
            from the component library. Open the <strong>Live preview</strong> pane to see changes
            as you type — or use Presentation mode for full-site preview.
          </Text>
          <Text size={1} style={{color: '#ff7a2f', fontWeight: 600}}>
            Hero always comes from Client name, title, excerpt, and cover image on other tabs.
          </Text>
        </Stack>
      </Card>
      {renderDefault(props)}
    </Stack>
  )
}
