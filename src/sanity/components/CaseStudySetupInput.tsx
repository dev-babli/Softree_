'use client'

import { CheckmarkIcon, ChevronDownIcon, ChevronUpIcon, LaunchIcon } from '@sanity/icons'
import { Box, Button, Card, Flex, Grid, Stack, Text } from '@sanity/ui'
import { useCallback, useMemo, useState } from 'react'
import { PatchEvent, set, type StringInputProps } from 'sanity'
import { useFormValue } from 'sanity'

import {
  CASE_STUDY_CATEGORY_CONFIG,
  CASE_STUDY_CATEGORY_KEYS,
  type CaseStudyCategoryKey,
  isCaseStudyCategory,
} from '@/app/case-studies/categoryConfig'
import { CASE_STUDY_LAYOUTS } from '@/lib/case-study-layouts'
import {
  CASE_STUDY_CREATE_TEMPLATE,
  CATEGORY_WHEN_TO_USE,
  EDITOR_PAGE_FORMAT,
  REFERENCE_LAYOUT_GROUPS,
} from '@/sanity/lib/caseStudyEditorGuide'

const SITE_PREVIEW = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.softreetechnology.com'

const layoutByValue = Object.fromEntries(CASE_STUDY_LAYOUTS.map((layout) => [layout.value, layout]))

function SetupProgress({
  categoryDone,
  formatDone,
  titleDone,
}: {
  categoryDone: boolean
  formatDone: boolean
  titleDone: boolean
}) {
  const steps = [
    { label: 'Category', done: categoryDone },
    { label: 'Format', done: formatDone },
    { label: 'Title', done: titleDone },
  ]
  const doneCount = steps.filter((s) => s.done).length
  const percent = Math.round((doneCount / steps.length) * 100)

  return (
    <Box>
      <Flex align="center" justify="space-between" marginBottom={2}>
        <Text size={1} weight="medium">
          Story setup
        </Text>
        <Text size={1} muted>
          {percent}% ready
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
  )
}

export default function CaseStudySetupInput(props: StringInputProps) {
  const [showReferenceLayouts, setShowReferenceLayouts] = useState(false)

  const title = useFormValue(['title']) as string | undefined
  const slug = useFormValue(['slug', 'current']) as string | undefined
  const detailLayout = (useFormValue(['detailLayout']) as string | undefined) || EDITOR_PAGE_FORMAT.value

  const selectedCategory = isCaseStudyCategory(props.value as string)
    ? (props.value as CaseStudyCategoryKey)
    : undefined

  const isRecommendedFormat = detailLayout === EDITOR_PAGE_FORMAT.value
  const formatDone = !!detailLayout
  const titleDone = !!(title && slug)

  const selectCategory = useCallback(
    (value: CaseStudyCategoryKey) => {
      props.onChange(set(value))
    },
    [props],
  )

  const selectLayout = useCallback(
    (value: string) => {
      props.onChange(PatchEvent.from(set(value, ['detailLayout'])))
    },
    [props],
  )

  const referenceLayoutCount = useMemo(
    () => REFERENCE_LAYOUT_GROUPS.reduce((sum, group) => sum + group.values.length, 0),
    [],
  )

  return (
    <Stack space={5}>
      <Card padding={4} radius={3} tone="primary" border>
        <Stack space={4}>
          <Stack space={2}>
            <Text size={2} weight="semibold">
              Start here — category &amp; format
            </Text>
            <Text size={1} muted style={{ lineHeight: 1.55 }}>
              Softree uses <strong>one create template</strong> ({CASE_STUDY_CREATE_TEMPLATE.title}
              ). Category is <em>where</em> the story lives on the site; page format is{' '}
              <em>how</em> it renders. They are independent — a web project can use the flexible
              builder, and so can a Power Platform story.
            </Text>
          </Stack>
          <SetupProgress
            categoryDone={!!selectedCategory}
            formatDone={formatDone}
            titleDone={titleDone}
          />
        </Stack>
      </Card>

      {/* Step 1 — Service category */}
      <Stack space={3}>
        <Stack space={1}>
          <Text size={1} weight="semibold">
            1. Service category
          </Text>
          <Text size={1} muted>
            Required — controls category pages like <code>/case-studies/web</code> and navigation
            filters. This is <strong>not</strong> a separate create template.
          </Text>
        </Stack>

        {!selectedCategory ? (
          <Card padding={3} radius={2} tone="caution" border>
            <Text size={1} weight="medium">
              Pick the service line this project belongs to
            </Text>
          </Card>
        ) : null}

        <Grid columns={[1, 1, 2]} gap={3}>
          {CASE_STUDY_CATEGORY_KEYS.map((key) => {
            const config = CASE_STUDY_CATEGORY_CONFIG[key]
            const isSelected = selectedCategory === key

            return (
              <Card
                key={key}
                padding={3}
                radius={3}
                border
                tone={isSelected ? 'primary' : 'default'}
                style={{
                  cursor: 'pointer',
                  outline: isSelected ? '2px solid var(--card-focus-ring-color)' : undefined,
                }}
                onClick={() => selectCategory(key)}
              >
                <Stack space={3}>
                  <Flex align="center" justify="space-between" gap={2}>
                    <Box
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 999,
                        background: config.accentColor,
                        flexShrink: 0,
                      }}
                    />
                    {isSelected ? (
                      <Flex align="center" gap={1}>
                        <CheckmarkIcon />
                        <Text size={0} muted>
                          Selected
                        </Text>
                      </Flex>
                    ) : null}
                  </Flex>
                  <Stack space={2}>
                    <Text size={2} weight="semibold">
                      {config.title}
                    </Text>
                    <Text size={1} muted style={{ lineHeight: 1.5 }}>
                      {CATEGORY_WHEN_TO_USE[key]}
                    </Text>
                  </Stack>
                  <Button
                    as="a"
                    fontSize={1}
                    icon={LaunchIcon}
                    mode="ghost"
                    href={`${SITE_PREVIEW.replace(/\/$/, '')}/case-studies/${key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    text="Preview category page"
                    onClick={(event) => event.stopPropagation()}
                  />
                </Stack>
              </Card>
            )
          })}
        </Grid>
      </Stack>

      {/* Step 2 — Page format */}
      <Stack space={3}>
        <Stack space={1}>
          <Text size={1} weight="semibold">
            2. Page format
          </Text>
          <Text size={1} muted>
            Almost all new stories should use the flexible page builder. Reference layouts below
            are for showcase / demo URLs only.
          </Text>
        </Stack>

        <Card
          padding={4}
          radius={3}
          border
          tone={isRecommendedFormat ? 'primary' : 'default'}
          style={{
            cursor: 'pointer',
            outline: isRecommendedFormat ? '2px solid var(--card-focus-ring-color)' : undefined,
          }}
          onClick={() => selectLayout(EDITOR_PAGE_FORMAT.value)}
        >
          <Stack space={3}>
            <Flex align="center" justify="space-between" gap={2} wrap="wrap">
              <Text size={2} weight="semibold">
                {EDITOR_PAGE_FORMAT.title}
              </Text>
              <Card padding={2} radius={2} tone="positive">
                <Text size={0} weight="semibold">
                  {EDITOR_PAGE_FORMAT.badge}
                </Text>
              </Card>
            </Flex>
            <Text size={1} muted style={{ lineHeight: 1.55 }}>
              {EDITOR_PAGE_FORMAT.description}
            </Text>
            <Text size={1} muted>
              <strong>When to use:</strong> {EDITOR_PAGE_FORMAT.whenToUse}
            </Text>
            {isRecommendedFormat ? (
              <Flex align="center" gap={1}>
                <CheckmarkIcon />
                <Text size={1}>Selected — build sections on the Page tab</Text>
              </Flex>
            ) : (
              <Button
                fontSize={1}
                tone="primary"
                text="Use flexible page builder"
                onClick={(event) => {
                  event.stopPropagation()
                  selectLayout(EDITOR_PAGE_FORMAT.value)
                }}
              />
            )}
          </Stack>
        </Card>

        {!isRecommendedFormat ? (
          <Card padding={3} radius={2} tone="caution" border>
            <Text size={1}>
              Current format:{' '}
              <strong>{layoutByValue[detailLayout]?.title ?? detailLayout}</strong> — a reference
              layout. Switch to the flexible builder unless this is an intentional showcase page.
            </Text>
          </Card>
        ) : null}

        <Card padding={3} radius={3} border tone="transparent">
          <Stack space={3}>
            <Button
              fontSize={1}
              icon={showReferenceLayouts ? ChevronUpIcon : ChevronDownIcon}
              mode="ghost"
              text={
                showReferenceLayouts
                  ? 'Hide reference layouts'
                  : `Show reference layouts (${referenceLayoutCount} — developers & showcase only)`
              }
              onClick={() => setShowReferenceLayouts((open) => !open)}
            />

            {showReferenceLayouts ? (
              <Stack space={4}>
                {REFERENCE_LAYOUT_GROUPS.map((group) => (
                  <Stack key={group.title} space={2}>
                    <Text size={1} weight="semibold">
                      {group.title}
                    </Text>
                    <Text size={1} muted>
                      {group.hint}
                    </Text>
                    <Grid columns={[1, 1, 2]} gap={2}>
                      {group.values.map((value) => {
                        const layout = layoutByValue[value]
                        if (!layout) return null
                        const isSelected = detailLayout === value

                        return (
                          <Card
                            key={value}
                            padding={3}
                            radius={2}
                            border
                            tone={isSelected ? 'primary' : 'default'}
                            style={{ cursor: 'pointer' }}
                            onClick={() => selectLayout(value)}
                          >
                            <Stack space={2}>
                              <Text size={1} weight="semibold">
                                {layout.title}
                              </Text>
                              <Text size={0} muted style={{ lineHeight: 1.45 }}>
                                {layout.description.slice(0, 100)}
                                {layout.description.length > 100 ? '…' : ''}
                              </Text>
                              {isSelected ? (
                                <Text size={0} muted>
                                  Selected reference layout
                                </Text>
                              ) : null}
                            </Stack>
                          </Card>
                        )
                      })}
                    </Grid>
                  </Stack>
                ))}
              </Stack>
            ) : null}
          </Stack>
        </Card>
      </Stack>

      {/* Quick reference matrix */}
      <Card padding={4} radius={3} border tone="transparent">
        <Stack space={3}>
          <Text size={1} weight="semibold">
            Which template for which story?
          </Text>
          <Stack space={2}>
            <Text size={1} muted style={{ lineHeight: 1.55 }}>
              <strong>Create (+):</strong> always pick &ldquo;{CASE_STUDY_CREATE_TEMPLATE.title}
              &rdquo; — there is no separate template per service line.
            </Text>
            <Text size={1} muted style={{ lineHeight: 1.55 }}>
              <strong>Service category:</strong> pick AI, Web, Mobile, etc. → controls{' '}
              <code>/case-studies/[category]</code> listing.
            </Text>
            <Text size={1} muted style={{ lineHeight: 1.55 }}>
              <strong>Page format:</strong> flexible builder for new work; reference layouts only for
              pre-built demo pages at <code>/case-studies/layout-showcase</code>.
            </Text>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  )
}
