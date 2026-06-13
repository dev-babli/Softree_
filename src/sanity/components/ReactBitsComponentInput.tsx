'use client'

import { SearchIcon } from '@sanity/icons'
import { Box, Card, Flex, Stack, Text } from '@sanity/ui'
import { useMemo, useState } from 'react'
import type { StringInputProps } from 'sanity'
import { set } from 'sanity'

import { REACT_BITS_SECTION_PICKER } from '../cms/sectionLibrary'

/** Beginner-friendly React Bits picker for csReactBitsSection */
export default function ReactBitsComponentInput(props: StringInputProps) {
  const [query, setQuery] = useState('')
  const selected = (props.value as string | undefined) || REACT_BITS_SECTION_PICKER[0].value

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return REACT_BITS_SECTION_PICKER
    return REACT_BITS_SECTION_PICKER.filter(
      (item) =>
        item.title.toLowerCase().includes(q) || item.value.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <Stack space={3}>
      <Text size={1} muted>
        Choose a visual effect. Backgrounds work best as full-width sections.
      </Text>
      <Flex align="center" gap={2} padding={2} style={{ border: '1px solid var(--card-border-color)', borderRadius: 8 }}>
        <SearchIcon />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search effects…"
          style={{ border: 0, outline: 'none', width: '100%', background: 'transparent', fontSize: 13 }}
        />
      </Flex>
      <Stack space={2}>
        {filtered.map((item) => {
          const isSelected = selected === item.value
          return (
            <Card
              key={item.value}
              padding={3}
              radius={2}
              border
              tone={isSelected ? 'primary' : 'default'}
              style={{ cursor: 'pointer' }}
              onClick={() => props.onChange(set(item.value))}
            >
              <Flex align="center" justify="space-between" gap={2}>
                <Text size={1} weight={isSelected ? 'semibold' : 'regular'}>
                  {item.title}
                </Text>
                <Text size={0} muted>
                  {item.value.split('/')[0]}
                </Text>
              </Flex>
            </Card>
          )
        })}
      </Stack>
    </Stack>
  )
}
