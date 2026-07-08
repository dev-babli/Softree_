'use client'

import { EarthGlobeIcon, SparklesIcon } from '@sanity/icons'
import { Box, Button, Card, Flex, Stack, Text } from '@sanity/ui'
import type { ArrayOfObjectsInputProps } from 'sanity'
import { useCallback } from 'react'

import { BEGINNER_PAGE_STARTER } from './sectionLibrary'
import { SectionPickerTrigger } from './SectionPicker'

/**
 * Unified page builder input — cms-kit template picker + Softree composer blocks.
 * Used for case studies, blog composer mode, and marketing pages.
 */
export default function SoftreePageBuilderInput(props: ArrayOfObjectsInputProps) {
  const { renderDefault, onItemAppend, value } = props

  const appendSection = useCallback(
    (sectionType: string) => {
      onItemAppend({ _type: sectionType })
    },
    [onItemAppend],
  )

  const appendStarterPage = useCallback(() => {
    for (const sectionType of BEGINNER_PAGE_STARTER) {
      onItemAppend({ _type: sectionType })
    }
  }, [onItemAppend])

  const sectionCount = Array.isArray(value) ? value.length : 0

  return (
    <Stack space={4}>
      <Card padding={4} radius={3} tone="primary" border>
        <Stack space={4}>
          <Flex align="flex-start" justify="space-between" gap={3} wrap="wrap">
            <Stack space={2}>
              <Text size={2} weight="semibold">
                Page builder
              </Text>
              <Text size={1} muted style={{ lineHeight: 1.55, maxWidth: '40rem' }}>
                Build your page by stacking sections. No code needed — pick blocks, fill in text,
                and open <strong>Presentation</strong> (top bar) to see the live site.
              </Text>
            </Stack>
            <Flex gap={2} wrap="wrap">
              <Button
                as="a"
                fontSize={1}
                icon={EarthGlobeIcon}
                mode="ghost"
                text="Open Presentation"
                href="/studio/presentation"
                target="_self"
              />
              <Button
                as="a"
                fontSize={1}
                icon={SparklesIcon}
                mode="ghost"
                text="React Bits library"
                href="/studio/react-bits"
                target="_self"
              />
            </Flex>
          </Flex>

          <Flex gap={2} wrap="wrap">
            <Box flex={1} style={{ minWidth: 200 }}>
              <SectionPickerTrigger onPick={appendSection} />
            </Box>
            {sectionCount === 0 ? (
              <Button
                fontSize={1}
                mode="default"
                tone="primary"
                text="Start with suggested layout"
                onClick={appendStarterPage}
              />
            ) : null}
          </Flex>

          <Card padding={3} radius={2} tone="transparent" border>
            <Stack space={2}>
              <Text size={1} weight="medium">
                Quick guide
              </Text>
              <Text size={1} muted style={{ lineHeight: 1.6 }}>
                1. Fill in <strong>Story</strong> tab (title, client, category, excerpt){' '}
                2. Add sections below 3. Use ✨ <strong>AI Assist</strong> on any text field{' '}
                4. Preview in Presentation before publishing
              </Text>
            </Stack>
          </Card>
        </Stack>
      </Card>

      {renderDefault(props)}
    </Stack>
  )
}
