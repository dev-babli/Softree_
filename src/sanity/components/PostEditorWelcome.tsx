'use client'

import { DocumentTextIcon, EarthGlobeIcon, SparklesIcon } from '@sanity/icons'
import { Box, Button, Card, Flex, Stack, Text } from '@sanity/ui'
import type { ObjectInputProps } from 'sanity'
import { useFormValue } from 'sanity'

type Step = {
  id: string
  label: string
  hint: string
  done: boolean
  tab?: string
}

function usePostSteps() {
  const title = useFormValue(['title']) as string | undefined
  const slug = useFormValue(['slug', 'current']) as string | undefined
  const excerpt = useFormValue(['excerpt']) as string | undefined
  const displayMode = useFormValue(['displayMode']) as string | undefined
  const composerSections = useFormValue(['composerSections']) as unknown[] | undefined
  const body = useFormValue(['body']) as unknown[] | undefined
  const mainImage = useFormValue(['mainImage']) as { asset?: { _ref?: string } } | undefined

  const isComposer = (displayMode || 'composer') === 'composer'
  const hasContent = isComposer
    ? (composerSections?.length ?? 0) > 0
    : (body?.length ?? 0) > 0
  const hasCover = !!mainImage?.asset?._ref

  const steps: Step[] = [
    {
      id: 'title',
      label: 'Add title & slug',
      hint: 'Content tab → Title and Slug.',
      done: !!(title && slug),
      tab: 'content',
    },
    {
      id: 'excerpt',
      label: 'Write excerpt',
      hint: 'Short summary for listing cards and search.',
      done: !!excerpt,
      tab: 'content',
    },
    {
      id: 'cover',
      label: 'Cover image',
      hint: 'Content tab → Main image.',
      done: hasCover,
      tab: 'content',
    },
    {
      id: 'sections',
      label: isComposer ? 'Build page sections' : 'Write article body',
      hint: isComposer
        ? 'Page composer tab → edit starter sections below.'
        : 'Content tab → classic body (legacy articles only).',
      done: hasContent,
      tab: isComposer ? 'composer' : 'content',
    },
    {
      id: 'publish',
      label: 'Review & publish',
      hint: 'Publish tab → check readiness → Publish.',
      done: false,
      tab: 'publish',
    },
  ]

  const doneCount = steps.filter((s) => s.done).length
  const percent = Math.round((doneCount / steps.length) * 100)
  const next = steps.find((s) => !s.done)

  return { steps, percent, next, isComposer }
}

export default function PostEditorWelcome(_props: ObjectInputProps) {
  const { steps, percent, next } = usePostSteps()

  return (
    <Card padding={4} radius={3} tone="primary" border>
      <Stack space={4}>
        <Flex align="flex-start" justify="space-between" gap={3} wrap="wrap">
          <Stack space={2}>
            <Flex align="center" gap={2}>
              <DocumentTextIcon />
              <Text size={2} weight="semibold">
                New blog post — start here
              </Text>
            </Flex>
            <Text size={1} muted style={{ lineHeight: 1.55, maxWidth: '42rem' }}>
              One path: fill <strong>Content</strong>, build sections in <strong>Page composer</strong>,
              then publish. Need a full AI draft? Use <strong>Content Agent</strong> from the top tools menu.
            </Text>
          </Stack>
          <Flex gap={2} wrap="wrap">
            <Button
              as="a"
              fontSize={1}
              icon={SparklesIcon}
              mode="ghost"
              text="Content Agent"
              href="/studio/content-agent"
              target="_self"
            />
            <Button
              as="a"
              fontSize={1}
              icon={EarthGlobeIcon}
              mode="ghost"
              text="Presentation"
              href="/studio/presentation"
              target="_self"
            />
          </Flex>
        </Flex>

        <Box>
          <Flex align="center" justify="space-between" marginBottom={2}>
            <Text size={1} weight="medium">
              Progress
            </Text>
            <Text size={1} muted>
              {percent}%
            </Text>
          </Flex>
          <Box
            style={{
              height: 6,
              borderRadius: 3,
              background: 'var(--card-border-color)',
              overflow: 'hidden',
            }}
          >
            <Box
              style={{
                height: '100%',
                width: `${percent}%`,
                background: 'var(--card-focus-ring-color, #ff7a2f)',
              }}
            />
          </Box>
        </Box>

        <Stack space={2}>
          {steps.map((step, index) => (
            <Flex key={step.id} align="flex-start" gap={3}>
              <Text size={1} style={{ width: 20, flexShrink: 0 }}>
                {step.done ? '✓' : `${index + 1}.`}
              </Text>
              <Stack space={1}>
                <Text size={1} weight={step.done ? 'regular' : 'medium'}>
                  {step.label}
                  {step.tab ? (
                    <Text as="span" size={0} muted>
                      {' '}
                      → {step.tab} tab
                    </Text>
                  ) : null}
                </Text>
                {!step.done ? (
                  <Text size={1} muted>
                    {step.hint}
                  </Text>
                ) : null}
              </Stack>
            </Flex>
          ))}
        </Stack>

        {next ? (
          <Card padding={3} radius={2} tone="transparent" border>
            <Text size={1}>
              <strong>Next:</strong> {next.label}
            </Text>
          </Card>
        ) : null}
      </Stack>
    </Card>
  )
}
