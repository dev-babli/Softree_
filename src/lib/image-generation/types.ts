export type ImageProvider = "gemini" | "nvidia"

export type ImageModelCapability = "text-to-image" | "image-edit"

export type NvidiaApiMode = "genai-infer" | "openai-images"

export type ImageModelDefinition = {
  /** Stable key sent from Studio UI */
  id: string
  provider: ImageProvider
  /** Provider-native model identifier */
  modelId: string
  label: string
  description: string
  capabilities: ImageModelCapability[]
  supportsAspectRatio: boolean
  defaultAspectRatio: string
  nvidiaApiMode?: NvidiaApiMode
  /** Path segment for https://ai.api.nvidia.com/v1/genai/{genaiPath} */
  nvidiaGenaiPath?: string
  /** Default diffusion steps (NVIDIA genai) */
  nvidiaSteps?: number
}

export type GenerateImageRequest = {
  provider: ImageProvider
  modelId: string
  prompt: string
  aspectRatio?: string
  mode?: "base" | "edit"
  baseImage?: string
}

export type GenerateImageResult = {
  imageData: string
  mimeType: string
  provider: ImageProvider
  modelId: string
}
