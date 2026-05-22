import createImageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = createImageUrlBuilder(client)

export const urlFor = (source: Parameters<typeof builder.image>[0]) => {
  return builder.image(source)
}

// Helper to get optimized image URL with Next.js Image component
export const getImageUrl = (
  source: Parameters<typeof builder.image>[0],
  options?: { width?: number; height?: number; quality?: number; format?: 'webp' | 'jpg' | 'png' }
) => {
  let imageBuilder = builder.image(source).auto('format')
  
  if (options?.width) imageBuilder = imageBuilder.width(options.width)
  if (options?.height) imageBuilder = imageBuilder.height(options.height)
  if (options?.quality) imageBuilder = imageBuilder.quality(options.quality)
  if (options?.format) imageBuilder = imageBuilder.format(options.format)
  
  return imageBuilder.url()
}
