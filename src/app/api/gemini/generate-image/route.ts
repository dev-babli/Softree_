import { GoogleGenAI } from "@google/genai"
import { NextResponse } from "next/server"
import {
  canGenerateWithGeminiProvider,
  generateImage,
} from "@/lib/image-generation"
import { ImageGenerationError } from "@/lib/image-generation/errors"
import { generateWithGemini } from "@/lib/image-generation/gemini"
import { isStudioApiRequest } from "@/lib/studio-api-auth"

const expectedApiKey = process.env.GEMINI_PLUGIN_API_KEY

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-API-Key, X-Softree-Studio",
}

function verifyApiKey(request: Request): boolean {
  if (expectedApiKey && request.headers.get("x-api-key") === expectedApiKey) {
    return true
  }
  // No shared key match: fall back to a same-origin Studio request rather than
  // failing open. Previously an unset GEMINI_PLUGIN_API_KEY left this paid
  // endpoint fully open to the internet.
  return isStudioApiRequest(request)
}

function getGeminiClient(): GoogleGenAI {
  const apiKey =
    process.env.GEMINI_API_KEY ?? process.env.GOOGLE_GENAI_API_KEY ?? ""
  return new GoogleGenAI({ apiKey })
}

/** Legacy series helper — still uses a single Gemini model. */
async function generateSingleImageLegacy(
  client: GoogleGenAI,
  modelName: string,
  prompt: string,
  aspectRatio?: string,
  mode?: string,
  baseImage?: string,
) {
  const result = await generateWithGemini({
    provider: "gemini",
    modelId: modelName,
    prompt,
    aspectRatio,
    mode: mode === "edit" ? "edit" : undefined,
    baseImage,
    model: modelName,
  })
  return { imageData: result.imageData, mimeType: result.mimeType }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders })
}

export async function POST(request: Request) {
  if (!verifyApiKey(request)) {
    return NextResponse.json(
      { error: "Invalid or missing API key" },
      { status: 401, headers: corsHeaders },
    )
  }

  if (!canGenerateWithGeminiProvider()) {
    return NextResponse.json(
      {
        error:
          "Neither Gemini nor NVIDIA API is configured. Set GEMINI_API_KEY and/or NVIDIA_API_KEY.",
      },
      { status: 500, headers: corsHeaders },
    )
  }

  try {
    const body = await request.json()
    const {
      prompt,
      aspectRatio,
      mode,
      baseImage,
      series,
      modelKey,
      modelId,
    } = body

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400, headers: corsHeaders },
      )
    }

    const modelName =
      modelKey ?? modelId ?? "gemini-2.5-flash-image"
    const client = getGeminiClient()

    if (series) {
      const { quantity, consistencyPrompt, variations } = series

      if (!variations?.length) {
        return NextResponse.json(
          { error: "Variations are required for series generation" },
          { status: 400, headers: corsHeaders },
        )
      }

      const parsedQuantity = Number(quantity)
      if (
        !Number.isFinite(parsedQuantity) ||
        parsedQuantity < 2 ||
        parsedQuantity > 10
      ) {
        return NextResponse.json(
          { error: "Quantity must be a number between 2 and 10" },
          { status: 400, headers: corsHeaders },
        )
      }

      const images: Array<{
        imageData: string
        mimeType: string
        variation: string
        index: number
      }> = []
      const errors: Array<{ index: number; variation: string; error: string }> =
        []

      const generateImage = async (variation: string, index: number) => {
        try {
          let fullPrompt = ""
          if (baseImage) {
            fullPrompt = [
              "CREATE A SINGLE IMAGE (NOT A GRID OR COLLAGE).",
              "IMPORTANT: Use this reference image as the EXACT subject/person.",
              consistencyPrompt,
              prompt,
              `Apply this specific variation ONLY: ${variation}`,
            ]
              .filter(Boolean)
              .join(" ")
          } else {
            fullPrompt = [
              "CREATE A SINGLE IMAGE (NOT A GRID OR COLLAGE).",
              prompt,
              consistencyPrompt,
              `Apply ONLY this variation: ${variation}`,
            ]
              .filter(Boolean)
              .join(" ")
          }

          const result = await generateSingleImageLegacy(
            client,
            modelName,
            fullPrompt,
            aspectRatio,
            mode,
            baseImage,
          )
          return { ...result, variation, index }
        } catch (error) {
          errors.push({
            index,
            variation,
            error:
              error instanceof Error ? error.message : "Generation failed",
          })
          return null
        }
      }

      const cappedVariations = variations.slice(0, parsedQuantity)
      for (let i = 0; i < cappedVariations.length; i++) {
        const result = await generateImage(cappedVariations[i], i)
        if (result) images.push(result)
        if (i < cappedVariations.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 500))
        }
      }

      if (images.length === 0) {
        return NextResponse.json(
          { error: "All image generations failed", details: errors },
          { status: 500, headers: corsHeaders },
        )
      }

      const payload = {
        images,
        metadata: {
          basePrompt: prompt,
          stylePrompt: consistencyPrompt,
          generatedAt: new Date().toISOString(),
          quantity: parsedQuantity,
          successful: images.length,
          failed: errors.length,
          model: modelName,
        },
        ...(errors.length > 0
          ? { errors, warning: "Some image generations failed" }
          : {}),
      }

      return NextResponse.json(payload, {
        status: errors.length > 0 ? 207 : 200,
        headers: corsHeaders,
      })
    }

    const result = await generateImage({
      provider: "gemini",
      modelKey: modelName,
      modelId: modelName,
      prompt,
      aspectRatio,
      mode: mode === "edit" ? "edit" : undefined,
      baseImage,
    })

    return NextResponse.json(result, { headers: corsHeaders })
  } catch (error) {
    console.error("Image generation failed:", error)
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
