'use client'

import { CaseIcon, EarthGlobeIcon, LaunchIcon } from '@sanity/icons'
import { isCaseStudyCategory } from '@/app/case-studies/categoryConfig'
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

function useCaseStudySteps() {
  const title = useFormValue(['title']) as string | undefined
  const slug = useFormValue(['slug', 'current']) as string | undefined
  const client = useFormValue(['client']) as string | undefined
  const excerpt = useFormValue(['excerpt']) as string | undefined
  const category = useFormValue(['category']) as string | undefined
  const detailLayout = useFormValue(['detailLayout']) as string | undefined
  const composerSections = useFormValue(['composerSections']) as unknown[] | undefined
  const mainImage = useFormValue(['mainImage']) as { asset?: { _ref?: string } } | undefined
  const mainImageUrl = useFormValue(['mainImageUrl']) as string | undefined

  const layout = detailLayout || 'page-composer'
  const isComposer = layout === 'page-composer'
  const hasCover = !!(mainImage?.asset?._ref || mainImageUrl)
  const hasSections = (composerSections?.length ?? 0) > 0

  const steps: Step[] = [
    {
      id: 'category',
      label: 'Pick service category',
      hint: 'Story tab → choose AI, Web, Mobile, SharePoint, etc. (required).',
      done: isCaseStudyCategory(category ?? ''),
      tab: 'story',
    },
    {
      id: 'title',
      label: 'Add title & slug',
      hint: 'Story tab → Title and Slug below the category picker.',
      done: !!(title && slug),
      tab: 'story',
    },
    {
      id: 'client',
      label: 'Client name & excerpt',
      hint: 'Story tab → Client and Excerpt fields.',
      done: !!(client && excerpt),
      tab: 'story',
    },
    {
      id: 'cover',
      label: 'Cover image',
      hint: 'Media tab → upload a hero / social image.',
      done: hasCover,
      tab: 'media',
    },
    {
      id: 'content',
      label: isComposer ? 'Build page sections' : 'Write story sections',
      hint: isComposer
        ? 'Page tab → add or edit sections below the page builder.'
        : 'Story tab → fill Challenge, Approach, and Outcome.',
      done: isComposer ? hasSections : !!(title && excerpt),
      tab: isComposer ? 'composer' : 'story',
    },
    {
      id: 'publish',
      label: 'Review & publish',
      hint: 'Publish & SEO tab → check readiness, then click Publish.',
      done: false,
      tab: 'publish',
    },
  ]

  const doneCount = steps.filter((s) => s.done).length
  const percent = Math.round((doneCount / steps.length) * 100)
  const next = steps.find((s) => !s.done)

  return { steps, percent, next, layout, isComposer }
}

export default function CaseStudyEditorWelcome(_props: ObjectInputProps) {
  const { steps, percent, next, layout, isComposer } = useCaseStudySteps()

  return (
    <Card padding={4} radius={3} tone="primary" border>
      <Stack space={4}>
        <Flex align="flex-start" justify="space-between" gap={3} wrap="wrap">
          <Stack space={2}>
            <Flex align="center" gap={2}>
              <CaseIcon />
              <Text size={2} weight="semibold">
                New case study — start here
              </Text>
            </Flex>
            <Text size={1} muted style={{ lineHeight: 1.55, maxWidth: '42rem' }}>
              Start with <strong>service category</strong> on the Story tab, then fill title, client,
              and page sections. Category controls which page on the site lists this story (e.g.{' '}
              <code>/case-studies/web</code>).
            </Text>
          </Stack>
          <Flex gap={2} wrap="wrap">
            <Button
              as="a"
              fontSize={1}
              icon={EarthGlobeIcon}
              mode="ghost"
              text="Presentation preview"
              href="/studio/presentation"
              target="_self"
            />
            <Button
              as="a"
              fontSize={1}
              icon={LaunchIcon}
              mode="ghost"
              text="Open site"
              href="/case-studies"
              target="_blank"
              rel="noopener noreferrer"
            />
          </Flex>
        </Flex>

        <Box>
          <Flex align="center" justify="space-between" marginBottom={2}>
            <Text size={1} weight="medium">
              Progress
            </Text>
            <Text size={1} muted>
              {percent}% · layout: {layout}
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
                transition: 'width 0.3s ease',
              }}
            />
          </Box>
        </Box>

        <Stack space={2}>
          {steps.map((step, index) => (
            <Flex key={step.id} align="flex-start" gap={3}>
              <Text
                size={1}
                style={{
                  width: 20,
                  flexShrink: 0,
                  color: step.done ? '#16a34a' : 'var(--card-muted-fg-color)',
                }}
              >
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
              <strong>Next:</strong> {next.label} — {next.hint}
            </Text>
          </Card>
        ) : (
          <Card padding={3} radius={2} tone="positive" border>
            <Text size={1}>Core fields look good — open Publish & SEO to go live.</Text>
          </Card>
        )}
      </Stack>
    </Card>
  )
}
