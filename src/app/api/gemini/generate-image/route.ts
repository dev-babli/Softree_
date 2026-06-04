import { GoogleGenAI } from "@google/genai"
import { NextResponse } from "next/server"

const geminiApiKey =
  process.env.GEMINI_API_KEY ?? process.env.GOOGLE_GENAI_API_KEY ?? ""
const expectedApiKey = process.env.GEMINI_PLUGIN_API_KEY

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-API-Key",
}

function verifyApiKey(request: Request): boolean {
  if (!expectedApiKey) return true
  return request.headers.get("x-api-key") === expectedApiKey
}

async function generateSingleImage(
  client: GoogleGenAI,
  prompt: string,
  aspectRatio?: string,
  mode?: string,
  baseImage?: string,
) {
  const modelName = "gemini-2.5-flash-image"
  let response

  if (mode === "edit" && baseImage) {
    response = await client.models.generateContent({
      model: modelName,
      contents: [
        {
          parts: [
            {
              inlineData: {
                mimeType: "image/png",
                data: baseImage,
              },
            },
            { text: prompt },
          ],
        },
      ],
      config: {
        imageConfig: aspectRatio ? { aspectRatio } : {},
      },
    })
  } else {
    response = await client.models.generateContent({
      model: modelName,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: ["Image"],
        imageConfig: aspectRatio ? { aspectRatio } : {},
      },
    })
  }

  const result = response as {
    candidates?: Array<{
      content?: { parts?: Array<{ inlineData?: { data: string; mimeType?: string } }> }
    }>
  }

  if (result.candidates?.[0]?.content?.parts) {
    for (const part of result.candidates[0].content.parts) {
      if (part.inlineData) {
        return {
          imageData: part.inlineData.data,
          mimeType: part.inlineData.mimeType || "image/png",
        }
      }
    }
  }

  throw new Error("No image generated in response")
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

  if (!geminiApiKey) {
    return NextResponse.json(
      { error: "Gemini API not configured (set GEMINI_API_KEY or GOOGLE_GENAI_API_KEY)" },
      { status: 500, headers: corsHeaders },
    )
  }

  try {
    const body = await request.json()
    const { prompt, aspectRatio, mode, baseImage, series } = body

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400, headers: corsHeaders },
      )
    }

    const client = new GoogleGenAI({ apiKey: geminiApiKey })

    if (series) {
      const { quantity, consistencyPrompt, variations } = series

      if (!variations?.length) {
        return NextResponse.json(
          { error: "Variations are required for series generation" },
          { status: 400, headers: corsHeaders },
        )
      }

      const parsedQuantity = Number(quantity)
      if (!Number.isFinite(parsedQuantity) || parsedQuantity < 2 || parsedQuantity > 10) {
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
      const errors: Array<{ index: number; variation: string; error: string }> = []

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

          const result = await generateSingleImage(
            client,
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
            error: error instanceof Error ? error.message : "Generation failed",
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
        },
        ...(errors.length > 0 ? { errors, warning: "Some image generations failed" } : {}),
      }

      return NextResponse.json(payload, {
        status: errors.length > 0 ? 207 : 200,
        headers: corsHeaders,
      })
    }

    const result = await generateSingleImage(client, prompt, aspectRatio, mode, baseImage)
    return NextResponse.json(result, { headers: corsHeaders })
  } catch (error) {
    console.error("Image generation failed:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Image generation failed" },
      { status: 500, headers: corsHeaders },
    )
  }
}
