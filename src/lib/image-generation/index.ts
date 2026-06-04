import { getModelById } from "./catalog"
import { generateWithGemini } from "./gemini"
import { generateWithNvidia } from "./nvidia"
import type { GenerateImageRequest, GenerateImageResult } from "./types"

export {
  IMAGE_MODEL_CATALOG,
  getModelById,
  getModelsForProvider,
  getProviderAvailability,
} from "./catalog"
export type {
  GenerateImageRequest,
  GenerateImageResult,
  ImageModelDefinition,
  ImageProvider,
} from "./types"

export async function generateImage(
  body: GenerateImageRequest & { modelKey?: string },
): Promise<GenerateImageResult> {
  const modelKey = body.modelKey ?? body.modelId
  if (!modelKey) {
    throw new Error("modelKey or modelId is required")
  }

  const model = getModelById(modelKey)
  if (!model) {
    throw new Error(`Unknown model: ${modelKey}`)
  }

  if (model.provider !== body.provider) {
    throw new Error(`Model ${modelKey} does not match provider ${body.provider}`)
  }

  const request: GenerateImageRequest = {
    provider: body.provider,
    modelId: model.modelId,
    prompt: body.prompt,
    aspectRatio: body.aspectRatio ?? model.defaultAspectRatio,
    mode: body.mode,
    baseImage: body.baseImage,
  }

  if (model.provider === "gemini") {
    return generateWithGemini({ ...request, model: model.modelId })
  }

  return generateWithNvidia(request, model)
}
