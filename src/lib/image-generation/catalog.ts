import type { ImageModelDefinition } from "./types"

/** All image models exposed in Sanity Studio (Gemini + NVIDIA build.nvidia.com). */
export const IMAGE_MODEL_CATALOG: ImageModelDefinition[] = [
  // —— Google Gemini ——
  {
    id: "gemini-2.5-flash-image",
    provider: "gemini",
    modelId: "gemini-2.5-flash-image",
    label: "Gemini 2.5 Flash Image",
    description: "Fast default; text-to-image and image editing.",
    capabilities: ["text-to-image", "image-edit"],
    supportsAspectRatio: true,
    defaultAspectRatio: "1:1",
  },
  {
    id: "gemini-3-pro-image-preview",
    provider: "gemini",
    modelId: "gemini-3-pro-image-preview",
    label: "Gemini 3 Pro Image (Preview)",
    description: "Higher quality preview; text-to-image and editing.",
    capabilities: ["text-to-image", "image-edit"],
    supportsAspectRatio: true,
    defaultAspectRatio: "1:1",
  },
  {
    id: "gemini-3-pro-image",
    provider: "gemini",
    modelId: "gemini-3-pro-image",
    label: "Gemini 3 Pro Image",
    description: "Pro-quality image generation.",
    capabilities: ["text-to-image", "image-edit"],
    supportsAspectRatio: true,
    defaultAspectRatio: "1:1",
  },
  {
    id: "gemini-3.1-flash-image-preview",
    provider: "gemini",
    modelId: "gemini-3.1-flash-image-preview",
    label: "Gemini 3.1 Flash Image (Preview)",
    description: "Latest flash image model preview.",
    capabilities: ["text-to-image"],
    supportsAspectRatio: true,
    defaultAspectRatio: "1:1",
  },
  {
    id: "gemini-2.0-flash-exp-image-generation",
    provider: "gemini",
    modelId: "gemini-2.0-flash-exp-image-generation",
    label: "Gemini 2.0 Flash Exp (Image)",
    description: "Experimental image generation.",
    capabilities: ["text-to-image", "image-edit"],
    supportsAspectRatio: true,
    defaultAspectRatio: "1:1",
  },

  // —— NVIDIA (build.nvidia.com image generation) ——
  {
    id: "nvidia-flux-1-dev",
    provider: "nvidia",
    modelId: "black-forest-labs/flux.1-dev",
    label: "FLUX.1 [dev]",
    description: "High-quality FLUX dev (slower).",
    capabilities: ["text-to-image"],
    supportsAspectRatio: true,
    defaultAspectRatio: "1:1",
    nvidiaApiMode: "genai-infer",
    nvidiaGenaiPath: "black-forest-labs/flux.1-dev",
    nvidiaSteps: 30,
  },
  {
    id: "nvidia-flux-1-schnell",
    provider: "nvidia",
    modelId: "black-forest-labs/flux.1-schnell",
    label: "FLUX.1 [schnell]",
    description: "Fast FLUX generation (few steps).",
    capabilities: ["text-to-image"],
    supportsAspectRatio: true,
    defaultAspectRatio: "1:1",
    nvidiaApiMode: "genai-infer",
    nvidiaGenaiPath: "black-forest-labs/flux.1-schnell",
    nvidiaSteps: 4,
  },
  {
    id: "nvidia-flux-2-klein-4b",
    provider: "nvidia",
    modelId: "black-forest-labs/flux.2-klein-4b",
    label: "FLUX.2 [klein] 4B",
    description: "Compact FLUX.2; OpenAI-compatible images API.",
    capabilities: ["text-to-image"],
    supportsAspectRatio: true,
    defaultAspectRatio: "1:1",
    nvidiaApiMode: "openai-images",
    nvidiaGenaiPath: "black-forest-labs/flux.2-klein-4b",
    nvidiaSteps: 4,
  },
  {
    id: "nvidia-flux-1-kontext-dev",
    provider: "nvidia",
    modelId: "black-forest-labs/flux.1-kontext-dev",
    label: "FLUX.1 Kontext [dev]",
    description: "Context-aware editing (requires base image).",
    capabilities: ["image-edit"],
    supportsAspectRatio: true,
    defaultAspectRatio: "1:1",
    nvidiaApiMode: "genai-infer",
    nvidiaGenaiPath: "black-forest-labs/flux.1-kontext-dev",
    nvidiaSteps: 30,
  },
  {
    id: "nvidia-sd35-large",
    provider: "nvidia",
    modelId: "stabilityai/stable-diffusion-3.5-large",
    label: "Stable Diffusion 3.5 Large",
    description: "SD 3.5 Large on NVIDIA NIM.",
    capabilities: ["text-to-image"],
    supportsAspectRatio: true,
    defaultAspectRatio: "1:1",
    nvidiaApiMode: "genai-infer",
    nvidiaGenaiPath: "stabilityai/stable-diffusion-3.5-large",
    nvidiaSteps: 30,
  },
  {
    id: "nvidia-qwen-image",
    provider: "nvidia",
    modelId: "qwen/qwen-image-2512",
    label: "Qwen Image",
    description: "Qwen image generation (OpenAI images API).",
    capabilities: ["text-to-image"],
    supportsAspectRatio: true,
    defaultAspectRatio: "1:1",
    nvidiaApiMode: "openai-images",
    nvidiaGenaiPath: "qwen/qwen-image",
    nvidiaSteps: 20,
  },
  {
    id: "nvidia-qwen-image-edit",
    provider: "nvidia",
    modelId: "qwen/qwen-image-edit",
    label: "Qwen Image Edit",
    description: "Image editing with Qwen (requires base image).",
    capabilities: ["image-edit"],
    supportsAspectRatio: true,
    defaultAspectRatio: "1:1",
    nvidiaApiMode: "genai-infer",
    nvidiaGenaiPath: "qwen/qwen-image-edit",
    nvidiaSteps: 20,
  },
]

export function getModelById(id: string): ImageModelDefinition | undefined {
  return IMAGE_MODEL_CATALOG.find((m) => m.id === id)
}

export function getModelsForProvider(
  provider: ImageModelDefinition["provider"],
): ImageModelDefinition[] {
  return IMAGE_MODEL_CATALOG.filter((m) => m.provider === provider)
}

export function getProviderAvailability(): {
  gemini: boolean
  nvidia: boolean
} {
  const geminiKey =
    process.env.GEMINI_API_KEY?.trim() ||
    process.env.GOOGLE_GENAI_API_KEY?.trim()
  const nvidiaKey =
    process.env.NVIDIA_API_KEY?.trim() ||
    process.env.NVAPI_API_KEY?.trim()
  return {
    gemini: Boolean(geminiKey),
    nvidia: Boolean(nvidiaKey),
  }
}
