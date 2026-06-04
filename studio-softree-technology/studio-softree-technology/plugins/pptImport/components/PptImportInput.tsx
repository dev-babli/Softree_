import React, { useState, useCallback } from 'react'
import { Stack, Text, Button, Card, Box, Spinner, Flex } from '@sanity/ui'
import { UploadIcon, DocumentIcon, CheckmarkIcon, WarningOutlineIcon } from '@sanity/icons'
import { useClient } from 'sanity'
import { parsePptxFile, extractCaseStudyFromPpt } from '../utils/pptParser'
import type { ExtractedCaseStudy, PptImage, PptDesignTheme } from '../types'

interface PptImportInputProps {
  value?: any
  onChange?: (value: any) => void
  documentId?: string
}

interface UploadState {
  status: 'idle' | 'uploading' | 'parsing' | 'extracting' | 'uploading-images' | 'preview' | 'success' | 'error'
  message: string
  progress?: number
  extracted?: ExtractedCaseStudy
}

export function PptImportInput(props: PptImportInputProps) {
  const { documentId } = props
  const client = useClient({ apiVersion: '2026-05-21' })
  const [uploadState, setUploadState] = useState<UploadState>({ status: 'idle', message: '' })
  const [dragActive, setDragActive] = useState(false)

  const uploadImageToSanity = async (image: PptImage): Promise<string | null> => {
    try {
      const buffer = Buffer.from(image.data)
      const blob = new Blob([buffer], { type: image.mimeType })
      const file = new File([blob], `ppt-image-${image.id}`, { type: image.mimeType })

      const asset = await client.assets.upload('image', file, {
        filename: `ppt-import-${Date.now()}-${image.id}`,
      })

      return asset._id
    } catch (err) {
      console.error('Failed to upload image:', err)
      return null
    }
  }

  const populateDocument = async (extracted: ExtractedCaseStudy) => {
    if (!documentId) {
      throw new Error('No document ID available')
    }

    setUploadState({ status: 'uploading-images', message: `Uploading ${extracted.images.length} images...` })

    // Upload images
    const imageRefs: string[] = []
    for (let i = 0; i < extracted.images.length; i++) {
      const ref = await uploadImageToSanity(extracted.images[i])
      if (ref) {
        imageRefs.push(ref)
      }
      setUploadState({
        status: 'uploading-images',
        message: `Uploading images... (${i + 1}/${extracted.images.length})`,
        progress: ((i + 1) / extracted.images.length) * 100,
      })
    }

    setUploadState({ status: 'extracting', message: 'Populating document fields...' })

    // Helpers
    const toPT = (text?: string | string[]) => {
      if (!text) return []
      if (Array.isArray(text)) {
        return text
          .filter((t) => typeof t === 'string' && t.trim())
          .map((t) => ({ _type: 'block', style: 'normal', children: [{ text: t }] }))
      }
      if (typeof text === 'string' && text.trim()) {
        return [{ _type: 'block', style: 'normal', children: [{ text }] }]
      }
      return []
    }

    const suggestStoryType = () => {
      const imgCount = extracted.images?.length || 0
      // Simple heuristic: many visuals → product showcase; otherwise standard
      if (imgCount >= 4) return 'product-showcase'
      return 'standard'
    }

    const suggestHeroLayout = () => {
      const hasImage = (extracted.images?.length || 0) > 0
      return hasImage ? 'split' : 'centered'
    }

    // Build patch operations
    const patch: Record<string, any> = {
      title: extracted.title,
      client: extracted.client,
      industry: extracted.industry,
      description: extracted.description,
      storyType: suggestStoryType(),
      heroLayout: suggestHeroLayout(),
      // Map narrative into structured Portable Text
      challengeContent: toPT(extracted.challenge),
      approachContent: toPT(extracted.solution),
      outcomeContent: toPT(extracted.result),
      body: Array.isArray(extracted.bodyContent) ? extracted.bodyContent : [],
    }

    // Store design metadata
    if (extracted.design) {
      patch.designTheme = extracted.design
    }
    if (extracted.dominantColor) {
      patch.color = extracted.dominantColor
    }

    if (extracted.challenge) {
      patch.challenge = extracted.challenge
    }

    if (extracted.solution) {
      patch.solution = extracted.solution
    }

    if (extracted.result) {
      patch.result = extracted.result
    }

    if (Array.isArray(extracted.keyResults) && extracted.keyResults.length > 0) {
      // Normalize into structured keyResults objects
      patch.keyResults = extracted.keyResults.map((item: any) => {
        if (typeof item === 'string') {
          // naive parse "35% conversion uplift" → value: 35% label: conversion uplift
          const m = item.match(/^(\S+)\s+(.+)$/)
          return m ? { value: m[1], label: m[2] } : { value: item, label: 'Result' }
        }
        return item
      }).slice(0, 3)
    }

    if (extracted.bodyContent.length > 0) {
      patch.body = extracted.bodyContent
    }

    // Add main image if available
    if (imageRefs.length > 0) {
      patch.image = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageRefs[0],
        },
      }
      // New schema fields
      patch.mainImage = patch.image
      const base = [extracted.title, extracted.industry].filter(Boolean).join(' — ')
      patch.heroImagePrompt = `Case study hero image for ${base}. Modern tech aesthetic, clean geometry, professional editorial style.`
    }

    // Apply patch to document
    await client.patch(documentId).set(patch).commit()

    return imageRefs.length
  }

  const handleFile = async (file: File) => {
    if (!file.name.endsWith('.pptx')) {
      setUploadState({ status: 'error', message: 'Only .pptx files are supported' })
      return
    }

    try {
      setUploadState({ status: 'uploading', message: 'Reading file...' })

      setUploadState({ status: 'parsing', message: 'Parsing PowerPoint structure...' })
      const parsed = await parsePptxFile(file)

      setUploadState({ status: 'extracting', message: 'Extracting case study content...' })
      const extracted = extractCaseStudyFromPpt(parsed)

      const uploadedCount = await populateDocument(extracted)

      setUploadState({
        status: 'success',
        message: `Success! Imported "${extracted.title}" with ${uploadedCount} images.`,
        extracted,
      })
    } catch (err) {
      console.error('PPT import failed:', err)
      setUploadState({
        status: 'error',
        message: `Import failed: ${err instanceof Error ? err.message : 'Unknown error'}`,
      })
    }
  }

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }, [])

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }, [])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }, [])

  const onFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }, [])

  const reset = () => {
    setUploadState({ status: 'idle', message: '' })
  }

  // Design Preview Component
  const DesignPreview = ({ design, dominantColor }: { design?: PptDesignTheme; dominantColor?: string }) => {
    if (!design) return null

    const colors = [
      { key: 'primary', label: 'Primary', value: design.colors.primary || dominantColor },
      { key: 'secondary', label: 'Secondary', value: design.colors.secondary },
      { key: 'accent1', label: 'Accent 1', value: design.colors.accent1 },
      { key: 'accent2', label: 'Accent 2', value: design.colors.accent2 },
    ].filter((c) => c.value)

    return (
      <Card padding={3} radius={2} tone="transparent">
        <Stack space={3}>
          <Text size={1} weight="semibold">
            Design Style Preserved
          </Text>

          {colors.length > 0 && (
            <Stack space={2}>
              <Text size={1} muted>
                Theme Colors:
              </Text>
              <Flex gap={2} wrap="wrap">
                {colors.map((color) => (
                  <Box key={color.key} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Box
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 4,
                        backgroundColor: color.value,
                        border: '1px solid rgba(0,0,0,0.1)',
                      }}
                    />
                    <Text size={0} muted>
                      {color.label}
                    </Text>
                  </Box>
                ))}
              </Flex>
            </Stack>
          )}

          {(design.fonts.heading || design.fonts.body) && (
            <Stack space={1}>
              <Text size={1} muted>
                Typography:
              </Text>
              {design.fonts.heading && (
                <Text size={0} style={{ fontFamily: design.fonts.heading }}>
                  Heading: {design.fonts.heading}
                </Text>
              )}
              {design.fonts.body && (
                <Text size={0} style={{ fontFamily: design.fonts.body }}>
                  Body: {design.fonts.body}
                </Text>
              )}
            </Stack>
          )}
        </Stack>
      </Card>
    )
  }

  if (uploadState.status === 'success') {
    const extracted = uploadState.extracted
    return (
      <Card padding={4} radius={2} shadow={1} tone="positive">
        <Stack space={4} style={{ alignItems: 'center' }}>
          <CheckmarkIcon style={{ fontSize: 32 }} />
          <Text size={2} weight="semibold">
            {uploadState.message}
          </Text>

          {extracted?.design && (
            <DesignPreview design={extracted.design} dominantColor={extracted.dominantColor} />
          )}

          <Text size={1} muted>
            The document fields have been auto-populated with content and design style preserved.
          </Text>
          <Button mode="ghost" onClick={reset} text="Import Another" />
        </Stack>
      </Card>
    )
  }

  if (uploadState.status === 'error') {
    return (
      <Card padding={4} radius={2} shadow={1} tone="critical">
        <Stack space={3} style={{ alignItems: 'center' }}>
          <WarningOutlineIcon style={{ fontSize: 32 }} />
          <Text size={2} weight="semibold">
            {uploadState.message}
          </Text>
          <Button mode="ghost" onClick={reset} text="Try Again" tone="critical" />
        </Stack>
      </Card>
    )
  }

  const isProcessing = uploadState.status !== 'idle'

  return (
    <Stack space={4}>
      <Card
        padding={4}
        radius={2}
        shadow={1}
        tone={dragActive ? 'primary' : 'default'}
        style={{
          border: dragActive ? '2px dashed #2276fc' : '2px dashed #cad1dc',
          backgroundColor: dragActive ? 'rgba(34, 118, 252, 0.05)' : 'transparent',
          transition: 'all 0.2s ease',
        }}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <Stack space={4} style={{ alignItems: 'center' }}>
          {isProcessing ? (
            <>
              <Spinner size={3} />
              <Stack space={2} style={{ alignItems: 'center' }}>
                <Text size={2} weight="semibold">
                  {uploadState.message}
                </Text>
                {uploadState.progress !== undefined && (
                  <Box style={{ width: 200, height: 4, background: '#e2e6ec', borderRadius: 2 }}>
                    <Box
                      style={{
                        width: `${uploadState.progress}%`,
                        height: '100%',
                        background: '#2276fc',
                        borderRadius: 2,
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </Box>
                )}
              </Stack>
            </>
          ) : (
            <>
              <DocumentIcon style={{ fontSize: 40, color: '#2276fc' }} />
              <Stack space={2} style={{ alignItems: 'center' }}>
                <Text size={2} weight="semibold">
                  Drop your PowerPoint here
                </Text>
                <Text size={1} muted>
                  or click to browse (.pptx files only)
                </Text>
              </Stack>
              <input
                type="file"
                accept=".pptx"
                onChange={onFileInputChange}
                style={{ display: 'none' }}
                id="ppt-file-input"
              />
              <Button
                mode="ghost"
                icon={UploadIcon}
                text="Select File"
                onClick={() => document.getElementById('ppt-file-input')?.click()}
              />
            </>
          )}
        </Stack>
      </Card>

      <Card padding={3} radius={2} tone="transparent">
        <Stack space={2}>
          <Text size={1} weight="semibold">
            What gets imported:
          </Text>
          <Stack as="ul" space={1}>
            <Text as="li" size={1} muted>
              • Slide titles become section headings
            </Text>
            <Text as="li" size={1} muted>
              • Bullet points become list items
            </Text>
            <Text as="li" size={1} muted>
              • Images are uploaded as assets
            </Text>
            <Text as="li" size={1} muted>
              • Challenge/Solution/Result sections are auto-detected
            </Text>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  )
}
