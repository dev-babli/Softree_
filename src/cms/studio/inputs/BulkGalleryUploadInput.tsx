'use client'

import { useClient, setIfMissing, insert, PatchEvent } from 'sanity'
import { useCallback, useRef, useState } from 'react'
import { Stack, Button, Flex, Spinner, Text } from '@sanity/ui'
import { UploadIcon } from '@sanity/icons'

function randomKey(): string {
  return Math.random().toString(36).substring(2, 15)
}

export default function BulkGalleryUploadInput(props: any) {
  const client = useClient({ apiVersion: '2023-01-01' })
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleButtonClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    const total = files.length
    const newItems: any[] = []

    try {
      for (let i = 0; i < total; i++) {
        const file = files[i]
        setProgress(`Uploading ${i + 1} of ${total}: ${file.name}...`)

        // Upload image to Sanity Content Lake
        const asset = await client.assets.upload('image', file, {
          filename: file.name,
        })

        // Create new array member matching the schema shape
        newItems.push({
          _key: randomKey(),
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
          alt: '',
          caption: '',
        })
      }

      // Generate a PatchEvent to append newly uploaded assets to Sanity array
      const patch = PatchEvent.from(
        insert(newItems, 'after', [-1])
      ).prepend(setIfMissing([]))

      props.onChange(patch)
      setProgress('Upload complete!')
      setTimeout(() => setProgress(''), 3000)
    } catch (err) {
      console.error('Bulk gallery upload failed:', err)
      setProgress('Upload failed. Please try again.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }, [client, props])

  return (
    <Stack space={3}>
      {/* Render the default Sanity array list with ordering and field editing capabilities */}
      {props.renderDefault(props)}

      {/* Bulk Upload Control Button */}
      <Flex gap={3} align="center" style={{ marginTop: '8px' }}>
        <Button
          fontSize={1}
          icon={UploadIcon}
          tone="primary"
          text={uploading ? 'Uploading...' : 'Bulk Upload (Select Multiple)'}
          disabled={uploading}
          onClick={handleButtonClick}
        />
        
        {uploading && <Spinner size={1} />}
        
        {progress && (
          <Text size={1} muted>
            {progress}
          </Text>
        )}

        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </Flex>
    </Stack>
  )
}
