'use client'

import { HelpCircleIcon } from '@sanity/icons'
import { Card, Flex, Stack, Text } from '@sanity/ui'
import { useMemo } from 'react'
import type { StringInputProps } from 'sanity'

import { usePublishReadinessDoc } from '@/cms/studio/hooks/usePublishReadinessDoc'
import { countFaqItems } from '@/cms/lib/studio/aeoCompleteness'

export default function FaqAeoPanelInput(_props: StringInputProps) {
  const doc = usePublishReadinessDoc()
  const count = useMemo(() => countFaqItems(doc), [doc])
  const complete = count >= 2

  return (
    <Card padding={4} radius={3} border tone={complete ? 'positive' : 'caution'}>
      <Stack space={3}>
        <Flex align="center" gap={2}>
          <HelpCircleIcon />
          <Text size={2} weight="semibold">
            FAQ for search &amp; AI answers ({count}/2)
          </Text>
        </Flex>
        <Text size={1} muted style={{ lineHeight: 1.55 }}>
          Add at least two question-and-answer pairs below, or add a <strong>FAQ accordion</strong>{' '}
          section on the <strong>Page</strong> tab. Both count toward publish readiness.
        </Text>
        {!complete ? (
          <Text size={1}>
            Need {2 - count} more complete Q&amp;A pair{2 - count === 1 ? '' : 's'} (question and
            answer both filled in).
          </Text>
        ) : (
          <Text size={1} style={{ color: 'var(--card-positive-fg-color)' }}>
            FAQ requirement met — you can publish once the rest of the checklist is complete.
          </Text>
        )}
      </Stack>
    </Card>
  )
}
