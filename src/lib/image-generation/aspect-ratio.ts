import { getModelById } from "./catalog"
import type { ImageModelDefinition } from "./types"

/** Maps aspect ratio labels to NVIDIA genai infer width/height (FLUX family). */
export function nvidiaSizeFromAspectRatio(aspectRatio: string): {
  width: number
  height: number
} {
  switch (aspectRatio) {
    case "16:9":
      return { width: 1344, height: 768 }
    case "9:16":
      return { width: 768, height: 1344 }
    case "4:3":
      return { width: 1152, height: 896 }
    case "3:4":
      return { width: 896, height: 1152 }
    case "3:2":
      return { width: 1216, height: 832 }
    case "2:3":
      return { width: 832, height: 1216 }
    case "21:9":
      return { width: 1536, height: 640 }
    case "1:1":
    default:
      return { width: 1024, height: 1024 }
  }
}

export function openAiSizeFromAspectRatio(aspectRatio: string): string | undefined {
  const { width, height } = nvidiaSizeFromAspectRatio(aspectRatio)
  return `${width}x${height}`
}

export function findModelByKey(modelKey: string): ImageModelDefinition | undefined {
  return getModelById(modelKey)
}
