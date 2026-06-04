import { nvidiaSizeFromAspectRatio, openAiSizeFromAspectRatio } from "./aspect-ratio"
import type { ImageModelDefinition } from "./types"
import type { GenerateImageRequest, GenerateImageResult } from "./types"

function getNvidiaApiKey(): string {
  return (
    process.env.NVIDIA_API_KEY?.trim() ||
    process.env.NVAPI_API_KEY?.trim() ||
    ""
  )
}

export function isNvidiaConfigured(): boolean {
  return Boolean(getNvidiaApiKey())
}

type NvidiaGenaiResponse = {
  artifacts?: Array<{ base64?: string; finishReason?: string }>
  detail?: string
  message?: string
}

type NvidiaOpenAiImageResponse = {
  data?: Array<{ b64_json?: string; url?: string }>
  error?: { message?: string }
}

async function generateViaGenaiInfer(
  apiKey: string,
  model: ImageModelDefinition,
  prompt: string,
  aspectRatio?: string,
): Promise<GenerateImageResult> {
  const path = model.nvidiaGenaiPath ?? model.modelId
  const url = `https://ai.api.nvidia.com/v1/genai/${path}`
  const { width, height } = nvidiaSizeFromAspectRatio(aspectRatio ?? "1:1")

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      mode: "base",
      seed: 0,
      steps: model.nvidiaSteps ?? 4,
      width,
      height,
    }),
  })

  const data = (await response.json()) as NvidiaGenaiResponse

  if (!response.ok) {
    const msg =
      data.detail ||
      data.message ||
      `NVIDIA genai request failed (${response.status})`
    throw new Error(msg)
  }

  const base64 = data.artifacts?.[0]?.base64
  if (!base64) {
    throw new Error("No image in NVIDIA genai response")
  }

  return {
    imageData: base64,
    mimeType: "image/png",
    provider: "nvidia",
    modelId: model.modelId,
  }
}

async function generateViaOpenAiImages(
  apiKey: string,
  model: ImageModelDefinition,
  prompt: string,
  aspectRatio?: string,
): Promise<GenerateImageResult> {
  const size = openAiSizeFromAspectRatio(aspectRatio ?? "1:1")

  const response = await fetch(
    "https://integrate.api.nvidia.com/v1/images/generations",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model.modelId,
        prompt,
        n: 1,
        response_format: "b64_json",
        size,
      }),
    },
  )

  const data = (await response.json()) as NvidiaOpenAiImageResponse

  if (!response.ok) {
    throw new Error(
      data.error?.message ||
        `NVIDIA images API failed (${response.status})`,
    )
  }

  const b64 = data.data?.[0]?.b64_json
  if (!b64) {
    throw new Error("No image in NVIDIA OpenAI-compatible response")
  }

  return {
    imageData: b64,
    mimeType: "image/png",
    provider: "nvidia",
    modelId: model.modelId,
  }
}

export async function generateWithNvidia(
  request: GenerateImageRequest,
  model: ImageModelDefinition,
): Promise<GenerateImageResult> {
  const apiKey = getNvidiaApiKey()
  if (!apiKey) {
    throw new Error("NVIDIA API not configured (set NVIDIA_API_KEY or NVAPI_API_KEY)")
  }

  if (
    model.capabilities.includes("image-edit") &&
    !model.capabilities.includes("text-to-image") &&
    !request.baseImage
  ) {
    throw new Error(
      `${model.label} requires a base image for editing (not yet supported in Studio UI)`,
    )
  }

  if (model.nvidiaApiMode === "openai-images") {
    return generateViaOpenAiImages(
      apiKey,
      model,
      request.prompt,
      request.aspectRatio,
    )
  }

  return generateViaGenaiInfer(
    apiKey,
    model,
    request.prompt,
    request.aspectRatio,
  )
}
