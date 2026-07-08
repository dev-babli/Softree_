'use client'

import { CheckmarkIcon, LaunchIcon } from '@sanity/icons'
import { Box, Button, Card, Flex, Grid, Stack, Text } from '@sanity/ui'
import { useCallback } from 'react'
import type { StringInputProps } from 'sanity'
import { set } from 'sanity'

import {
  CASE_STUDY_CATEGORY_CONFIG,
  CASE_STUDY_CATEGORY_KEYS,
  type CaseStudyCategoryKey,
  isCaseStudyCategory,
} from '@/app/case-studies/categoryConfig'

const SITE_PREVIEW = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.softreetechnology.com'

export default function CaseStudyCategoryInput(props: StringInputProps) {
  const selected = isCaseStudyCategory(props.value as string)
    ? (props.value as CaseStudyCategoryKey)
    : undefined

  const selectCategory = useCallback(
    (value: CaseStudyCategoryKey) => {
      props.onChange(set(value))
    },
    [props],
  )

  return (
    <Stack space={4}>
      <Card padding={4} radius={3} tone="transparent" border>
        <Stack space={2}>
          <Text size={1} weight="semibold">
            Which service line is this case study about?
          </Text>
          <Text size={1} muted style={{ lineHeight: 1.55 }}>
            This controls where the story appears on the website — category pages like{' '}
            <code>/case-studies/web</code>, navigation, and filters. Pick the best match; do not
            leave the default as Power Platform unless the project truly was Power Platform.
          </Text>
        </Stack>
      </Card>

      {!selected ? (
        <Card padding={3} radius={2} tone="caution" border>
          <Text size={1} weight="medium">
            Required — choose a category below
          </Text>
        </Card>
      ) : null}

      <Grid columns={[1, 1, 2]} gap={3}>
        {CASE_STUDY_CATEGORY_KEYS.map((key) => {
          const config = CASE_STUDY_CATEGORY_CONFIG[key]
          const isSelected = selected === key

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
                  <Text size={1} muted>
                    {config.eyebrow}
                  </Text>
                  <Text size={1} muted style={{ lineHeight: 1.5 }}>
                    {config.description.slice(0, 120)}
                    {config.description.length > 120 ? '…' : ''}
                  </Text>
                </Stack>
                <Flex gap={2} wrap="wrap">
                  <Button
                    fontSize={1}
                    mode={isSelected ? 'default' : 'ghost'}
                    tone="primary"
                    text={isSelected ? 'Selected' : `Use ${config.title}`}
                    onClick={(event) => {
                      event.stopPropagation()
                      selectCategory(key)
                    }}
                  />
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
                </Flex>
              </Stack>
            </Card>
          )
        })}
      </Grid>
    </Stack>
  )
}
