import { NextRequest, NextResponse } from 'next/server'
import {
  IMAGE_MODEL_CATALOG,
  canGenerateWithGeminiProvider,
  generateImage,
  getProviderAvailability,
  NVIDIA_FALLBACK_MODEL_KEY,
} from '@/lib/image-generation'
import { ImageGenerationError } from '@/lib/image-generation/errors'
import type { ImageProvider } from '@/lib/image-generation/types'
import { isStudioApiRequest, studioApiUnauthorized } from '@/lib/studio-api-auth'

const expectedApiKey = process.env.GEMINI_PLUGIN_API_KEY

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key, X-Softree-Studio',
}

function verifyPostAuth(request: Request): boolean {
  if (isStudioApiRequest(request)) return true
  if (!expectedApiKey) return false
  return request.headers.get('x-api-key') === expectedApiKey
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders })
}

/** List models and which providers have API keys configured. */
export async function GET(request: Request) {
  if (!isStudioApiRequest(request)) return studioApiUnauthorized()
  const availability = getProviderAvailability()

  const models = IMAGE_MODEL_CATALOG.map((m) => ({
    id: m.id,
    provider: m.provider,
    modelId: m.modelId,
    label: m.label,
    description: m.description,
    capabilities: m.capabilities,
    supportsAspectRatio: m.supportsAspectRatio,
    defaultAspectRatio: m.defaultAspectRatio,
    available:
      m.provider === "gemini" ? availability.gemini : availability.nvidia,
  }))

  return NextResponse.json(
    {
      providers: [
        {
          id: "gemini" as const,
          label: "Google Gemini",
          configured: availability.gemini,
          envVars: ["GEMINI_API_KEY", "GOOGLE_GENAI_API_KEY"],
        },
        {
          id: "nvidia" as const,
          label: "NVIDIA NIM",
          configured: availability.nvidia,
          envVars: ["NVIDIA_API_KEY", "NVAPI_API_KEY"],
        },
      ],
      models,
      fallback: {
        when: "gemini",
        toProvider: "nvidia" as const,
        modelKey: NVIDIA_FALLBACK_MODEL_KEY,
        enabled: availability.nvidia,
      },
    },
    { headers: corsHeaders },
  )
}

export async function POST(request: Request) {
  if (!verifyPostAuth(request)) {
    return NextResponse.json(
      {
        error: expectedApiKey
          ? 'Studio session or valid X-API-Key required'
          : 'Studio session required — set GEMINI_PLUGIN_API_KEY for server-to-server access',
      },
      { status: 401, headers: corsHeaders },
    )
  }

  try {
    const body = await request.json()
    const {
      prompt,
      provider,
      modelKey,
      modelId,
      aspectRatio,
      mode,
      baseImage,
      series,
    } = body

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400, headers: corsHeaders },
      )
    }

    const resolvedProvider = provider as ImageProvider | undefined
    const resolvedModelKey = modelKey ?? modelId

    if (!resolvedProvider || !resolvedModelKey) {
      return NextResponse.json(
        { error: "provider and modelKey (or modelId) are required" },
        { status: 400, headers: corsHeaders },
      )
    }

    const availability = getProviderAvailability()
    if (resolvedProvider === "gemini" && !canGenerateWithGeminiProvider()) {
      return NextResponse.json(
        {
          error:
            "Neither Gemini nor NVIDIA API is configured. Set GEMINI_API_KEY and/or NVIDIA_API_KEY.",
        },
        { status: 500, headers: corsHeaders },
      )
    }
    if (resolvedProvider === "nvidia" && !availability.nvidia) {
      return NextResponse.json(
        {
          error:
            "NVIDIA API not configured (set NVIDIA_API_KEY or NVAPI_API_KEY)",
        },
        { status: 500, headers: corsHeaders },
      )
    }

    if (series) {
      return NextResponse.json(
        {
          error:
            "Batch series generation is only supported on /api/gemini/generate-image for now",
        },
        { status: 400, headers: corsHeaders },
      )
    }

    const result = await generateImage({
      provider: resolvedProvider,
      modelKey: resolvedModelKey,
      modelId: resolvedModelKey,
      prompt,
      aspectRatio,
      mode,
      baseImage,
    })

    return NextResponse.json(result, { headers: corsHeaders })
  } catch (error) {
    console.error("Studio image generation failed:", error)
    const status =
      error instanceof ImageGenerationError ? error.status : 500
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Image generation failed",
      },
      { status, headers: corsHeaders },
    )
  }
}
