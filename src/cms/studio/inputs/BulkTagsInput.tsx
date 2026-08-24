'use client'

import { useCallback, useState } from 'react'
import { Card, Flex, TextInput, Button, Stack, Text } from '@sanity/ui'
import { CloseIcon } from '@sanity/icons'
import { PatchEvent, set, unset } from 'sanity'

export default function BulkTagsInput(props: any) {
  const { value = [], onChange } = props
  const [inputValue, setInputValue] = useState('')

  const addTags = useCallback((text: string) => {
    // Split by comma, newline, or semicolon
    const newTags = text
      .split(/[,\n;]+/)
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)

    if (newTags.length === 0) return

    // Deduplicate tags
    const combined = Array.from(new Set([...value, ...newTags]))
    onChange(PatchEvent.from(set(combined)))
  }, [value, onChange])

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      addTags(inputValue)
      setInputValue('')
    }
  }, [inputValue, addTags])

  const handlePaste = useCallback((event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const pastedText = event.clipboardData.getData('text')
    addTags(pastedText)
    setInputValue('')
  }, [addTags])

  const removeTag = useCallback((indexToRemove: number) => {
    const updated = value.filter((_: any, index: number) => index !== indexToRemove)
    onChange(PatchEvent.from(updated.length > 0 ? set(updated) : unset()))
  }, [value, onChange])

  return (
    <Stack space={2}>
      <Text size={1} weight="semibold" muted>
        {props.schemaType.title || 'Technologies Used'}
      </Text>
      
      {/* TextInput with copy-paste listener */}
      <TextInput
        placeholder="Paste comma-separated technologies (e.g. React, Next.js, TypeScript) and press Enter"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onBlur={() => {
          if (inputValue.trim()) {
            addTags(inputValue)
            setInputValue('')
          }
        }}
      />

      {/* Render individual tags with close buttons */}
      {value.length > 0 && (
        <Flex gap={2} wrap="wrap" style={{ marginTop: '4px' }}>
          {value.map((tag: string, index: number) => (
            <Card
              key={`${tag}-${index}`}
              padding={1}
              paddingLeft={2}
              radius={2}
              tone="transparent"
              border
            >
              <Flex gap={2} align="center">
                <Text size={1}>{tag}</Text>
                <Button
                  fontSize={1}
                  padding={1}
                  icon={CloseIcon}
                  mode="bleed"
                  tone="critical"
                  onClick={() => removeTag(index)}
                  style={{ cursor: 'pointer' }}
                />
              </Flex>
            </Card>
          ))}
        </Flex>
      )}
    </Stack>
  )
}
