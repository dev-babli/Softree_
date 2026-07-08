import { createImageUrlBuilder } from '@sanity/image-url'
import { createDataAttribute } from '@sanity/visual-editing'

import { apiVersion, dataset, projectId, studioUrl } from '@/cms/api'

const builder = createImageUrlBuilder({ projectId, dataset })

export function urlForImage(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source).auto('format')
}

export function urlForOpenGraphImage(
  source: Parameters<typeof builder.image>[0] | null | undefined,
) {
  if (!source) return undefined
  return urlForImage(source).width(1200).height(627).fit('crop').url()
}

export function dataAttr(config: {
  id: string
  type: string
  path: string | string[]
}) {
  return createDataAttribute({
    projectId,
    dataset,
    baseUrl: studioUrl,
    ...config,
  }).toString()
}

export { apiVersion, dataset, projectId, studioUrl }
