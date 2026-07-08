'use client'

import { AddIcon, CloseIcon, SearchIcon } from '@sanity/icons'
import { Box, Button, Card, Flex, Grid, Stack, Text } from '@sanity/ui'
import { useEffect, useMemo, useState } from 'react'

import {
  SECTION_CATEGORIES,
  SOFTREE_SECTION_LIBRARY,
  type SectionCategory,
} from './sectionLibrary'

type SectionPickerProps = {
  onPick: (sectionType: string) => void
  onClose: () => void
}

export function SectionPicker({ onPick, onClose }: SectionPickerProps) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<SectionCategory | 'all'>('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return SOFTREE_SECTION_LIBRARY.filter((entry) => {
      if (category !== 'all' && entry.category !== category) return false
      if (!q) return true
      return (
        entry.title.toLowerCase().includes(q) ||
        entry.description.toLowerCase().includes(q) ||
        entry.type.toLowerCase().includes(q)
      )
    })
  }, [category, query])

  return (
    <Flex direction="column" style={{ height: '100%', minHeight: 0 }}>
      <Flex
        align="center"
        justify="space-between"
        gap={3}
        padding={3}
        style={{ borderBottom: '1px solid var(--card-border-color)', flexShrink: 0 }}
      >
        <Stack space={2}>
          <Text size={2} weight="semibold">
            Add a section
          </Text>
          <Text size={1} muted>
            Pick a block — reorder anytime. Live preview updates in the pane beside the editor.
          </Text>
        </Stack>
        <Button icon={CloseIcon} mode="bleed" aria-label="Close section picker" onClick={onClose} />
      </Flex>

      <Box padding={3} style={{ flex: 1, overflow: 'auto' }}>
        <Stack space={4}>
          <Flex gap={2} wrap="wrap">
            <Box flex={1} style={{ minWidth: 180 }}>
              <Flex
                align="center"
                gap={2}
                padding={2}
                style={{ border: '1px solid var(--card-border-color)', borderRadius: 8 }}
              >
                <SearchIcon />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search sections…"
                  style={{
                    border: 0,
                    outline: 'none',
                    width: '100%',
                    background: 'transparent',
                    fontSize: 13,
                  }}
                />
              </Flex>
            </Box>
          </Flex>

          <Flex gap={2} wrap="wrap">
            <Button
              fontSize={1}
              mode={category === 'all' ? 'default' : 'ghost'}
              text="All"
              onClick={() => setCategory('all')}
            />
            {(Object.keys(SECTION_CATEGORIES) as SectionCategory[]).map((key) => (
              <Button
                key={key}
                fontSize={1}
                mode={category === key ? 'default' : 'ghost'}
                text={SECTION_CATEGORIES[key].title}
                onClick={() => setCategory(key)}
              />
            ))}
          </Flex>

          <Grid columns={[1, 2]} gap={3}>
            {filtered.map((entry) => (
              <Card
                key={entry.type}
                padding={3}
                radius={3}
                border
                tone="default"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  onPick(entry.type)
                  onClose()
                }}
              >
                <Stack space={3}>
                  <Box
                    style={{
                      position: 'relative',
                      height: 72,
                      borderRadius: 8,
                      overflow: 'hidden',
                      background: '#f4f2ee',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={entry.previewImage}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                  <Stack space={2}>
                    <Text size={1} weight="semibold">
                      {entry.title}
                    </Text>
                    <Text size={1} muted style={{ lineHeight: 1.45 }}>
                      {entry.description}
                    </Text>
                    <Text size={0} style={{ color: '#ff7a2f', lineHeight: 1.4 }}>
                      {entry.beginnerTip}
                    </Text>
                  </Stack>
                </Stack>
              </Card>
            ))}
          </Grid>

          {filtered.length === 0 ? (
            <Card padding={4} tone="caution">
              <Text size={1}>No sections match your search.</Text>
            </Card>
          ) : null}
        </Stack>
      </Box>
    </Flex>
  )
}

export function SectionPickerTrigger({
  onPick,
  disabled,
}: {
  onPick: (sectionType: string) => void
  disabled?: boolean
}) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <>
      <Button
        icon={AddIcon}
        mode="ghost"
        text="Add section…"
        disabled={disabled}
        onClick={() => setOpen(true)}
        style={{ width: '100%' }}
      />
      {open ? (
        <Box className="softree-section-drawer" role="presentation">
          <Box
            className="softree-section-drawer__backdrop"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <Card
            className="softree-section-drawer__panel"
            radius={0}
            shadow={3}
            onClick={(e) => e.stopPropagation()}
          >
            <SectionPicker onPick={onPick} onClose={() => setOpen(false)} />
          </Card>
        </Box>
      ) : null}
    </>
  )
}
