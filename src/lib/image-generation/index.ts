import {
  getModelById,
  getProviderAvailability,
  NVIDIA_FALLBACK_MODEL_KEY,
} from "./catalog"
import { ImageGenerationError } from "./errors"
import { generateWithGemini, isGeminiConfigured } from "./gemini"
import { generateWithNvidia, isNvidiaConfigured } from "./nvidia"
import type { GenerateImageRequest, GenerateImageResult } from "./types"

export {
  IMAGE_MODEL_CATALOG,
  getModelById,
  getModelsForProvider,
  getProviderAvailability,
  NVIDIA_FALLBACK_MODEL_KEY,
} from "./catalog"
export type {
  GenerateImageRequest,
  GenerateImageResult,
  ImageModelDefinition,
  ImageProvider,
} from "./types"

function primaryErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

async function generateWithNvidiaFallback(
  request: GenerateImageRequest,
  geminiModelId: string,
  primaryError: string | null,
): Promise<GenerateImageResult> {
  const fallbackModel = getModelById(NVIDIA_FALLBACK_MODEL_KEY)
  if (
    !fallbackModel ||
    fallbackModel.provider !== "nvidia" ||
    !fallbackModel.capabilities.includes("text-to-image")
  ) {
    throw new ImageGenerationError(
      "NVIDIA fallback model is not configured in the catalog",
      500,
    )
  }

  const nvidiaRequest: GenerateImageRequest = {
    provider: "nvidia",
    modelId: fallbackModel.modelId,
    prompt: request.prompt,
    aspectRatio: request.aspectRatio ?? fallbackModel.defaultAspectRatio,
  }

  const result = await generateWithNvidia(nvidiaRequest, fallbackModel)

  return {
    ...result,
    fallbackUsed: true,
    requestedProvider: "gemini",
    requestedModelId: geminiModelId,
    ...(primaryError ? { primaryError } : {}),
  }
}

async function generateGeminiWithNvidiaFallback(
  request: GenerateImageRequest,
  geminiModelId: string,
): Promise<GenerateImageResult> {
  const availability = getProviderAvailability()

  if (!availability.gemini) {
    if (availability.nvidia) {
      return generateWithNvidiaFallback(
        request,
        geminiModelId,
        "Gemini API key not set — used NVIDIA fallback",
      )
    }
    throw new ImageGenerationError(
      "Gemini API not configured (set GEMINI_API_KEY or GOOGLE_GENAI_API_KEY)",
      500,
    )
  }

  if (request.mode === "edit" && request.baseImage) {
    return generateWithGemini({ ...request, model: geminiModelId })
  }

  try {
    return await generateWithGemini({ ...request, model: geminiModelId })
  } catch (error) {
    if (!availability.nvidia) {
      throw error
    }

    console.warn(
      "[image-generation] Gemini failed, switching to NVIDIA:",
      primaryErrorMessage(error),
    )

    return generateWithNvidiaFallback(
      request,
      geminiModelId,
      primaryErrorMessage(error),
    )
  }
}

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
    return generateGeminiWithNvidiaFallback(request, model.modelId)
  }

  if (!isNvidiaConfigured()) {
    throw new ImageGenerationError(
      "NVIDIA API not configured (set NVIDIA_API_KEY or NVAPI_API_KEY)",
      500,
    )
  }

  return generateWithNvidia(request, model)
}

/** Whether Studio can generate with provider=gemini (Gemini and/or NVIDIA fallback). */
export function canGenerateWithGeminiProvider(): boolean {
  return isGeminiConfigured() || isNvidiaConfigured()
}
