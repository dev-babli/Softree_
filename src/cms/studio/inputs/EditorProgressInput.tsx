'use client'

import { CheckmarkIcon, CloseIcon } from '@sanity/icons'
import { Card, Flex, Stack, Text } from '@sanity/ui'
import { useMemo } from 'react'
import type { StringInputProps } from 'sanity'

import { usePublishReadinessDoc } from '@/cms/studio/hooks/usePublishReadinessDoc'
import { getPublishChecklist } from '@/cms/lib/studio/publishReadiness'

export default function EditorProgressInput(_props: StringInputProps) {
  const doc = usePublishReadinessDoc()
  const docType = doc._type || 'caseStudy'

  const { percent, checks, missing } = useMemo(() => {
    const items = getPublishChecklist(docType, doc)
    const passed = items.filter((c) => c.pass).length
    const pct = items.length ? Math.round((passed / items.length) * 100) : 0
    return {
      percent: pct,
      checks: items,
      missing: items.filter((c) => !c.pass),
    }
  }, [doc, docType])

  const barColor = percent >= 100 ? '#16a34a' : percent >= 70 ? '#ff7a2f' : '#d97706'

  return (
    <Card padding={4} radius={3} border tone={percent >= 100 ? 'positive' : 'caution'}>
      <Stack space={4}>
        <Flex align="center" justify="space-between" gap={3}>
          <Stack space={2}>
            <Text size={2} weight="semibold">
              Publish checklist
            </Text>
            <Text size={1} muted style={{ lineHeight: 1.55 }}>
              Complete every item below, then <strong>Save</strong> (Ctrl+S) and use{' '}
              <strong>Publish</strong> in the ⋯ menu. The checklist reads your current edits; Publish
              uses the last saved draft — save after changing FAQs or review status.
            </Text>
          </Stack>
          <Text size={3} weight="bold" style={{ color: barColor }}>
            {percent}%
          </Text>
        </Flex>

        <div
          style={{
            height: 8,
            borderRadius: 4,
            background: 'var(--card-border-color)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${percent}%`,
              background: barColor,
              transition: 'width 0.25s ease',
            }}
          />
        </div>

        <Stack space={2}>
          {checks.map((check) => (
            <Flex key={check.id} align="flex-start" gap={3}>
              <Flex
                align="center"
                justify="center"
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 999,
                  flexShrink: 0,
                  background: check.pass ? 'rgba(22,163,74,0.12)' : 'rgba(217,119,6,0.12)',
                  color: check.pass ? '#16a34a' : '#d97706',
                }}
              >
                {check.pass ? <CheckmarkIcon /> : <CloseIcon />}
              </Flex>
              <Stack space={1}>
                <Text size={1} weight={check.pass ? 'regular' : 'semibold'}>
                  {check.label}
                  {!check.pass ? (
                    <Text as="span" size={0} muted>
                      {' '}
                      → {check.tab} tab
                    </Text>
                  ) : null}
                </Text>
                {!check.pass ? (
                  <Text size={1} muted style={{ lineHeight: 1.5 }}>
                    {check.hint}
                  </Text>
                ) : null}
              </Stack>
            </Flex>
          ))}
        </Stack>

        {missing.length > 0 ? (
          <Card padding={3} radius={2} tone="transparent" border>
            <Text size={1}>
              <strong>Recommended before publish:</strong>{' '}
              {missing.map((m) => m.label.toLowerCase()).join(', ')}
            </Text>
          </Card>
        ) : (
          <Card padding={3} radius={2} tone="positive" border>
            <Text size={1}>
              Checklist complete — save draft (Ctrl+S), then Publish from the ⋯ menu.
            </Text>
          </Card>
        )}
      </Stack>
    </Card>
  )
}
