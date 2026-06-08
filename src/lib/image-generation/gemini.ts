import { GoogleGenAI } from "@google/genai"
import { formatProviderError } from "./errors"
import type { GenerateImageRequest, GenerateImageResult } from "./types"

function getGeminiApiKey(): string {
  return (
    process.env.GEMINI_API_KEY?.trim() ||
    process.env.GOOGLE_GENAI_API_KEY?.trim() ||
    ""
  )
}

export function isGeminiConfigured(): boolean {
  return Boolean(getGeminiApiKey())
}

export async function generateWithGemini(
  request: GenerateImageRequest & { model: string },
): Promise<GenerateImageResult> {
  const apiKey = getGeminiApiKey()
  if (!apiKey) {
    throw new Error(
      "Gemini API not configured (set GEMINI_API_KEY or GOOGLE_GENAI_API_KEY)",
    )
  }

  const client = new GoogleGenAI({ apiKey })
  const { model, prompt, aspectRatio, mode, baseImage } = request
  let response

  try {
    if (mode === "edit" && baseImage) {
      response = await client.models.generateContent({
        model,
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
        model,
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          responseModalities: ["Image"],
          imageConfig: aspectRatio ? { aspectRatio } : {},
        },
      })
    }
  } catch (error) {
    throw formatProviderError(error, "gemini")
  }

  const result = response as {
    candidates?: Array<{
      content?: {
        parts?: Array<{ inlineData?: { data: string; mimeType?: string } }>
      }
    }>
  }

  if (result.candidates?.[0]?.content?.parts) {
    for (const part of result.candidates[0].content.parts) {
      if (part.inlineData?.data) {
        return {
          imageData: part.inlineData.data,
          mimeType: part.inlineData.mimeType || "image/png",
          provider: "gemini",
          modelId: model,
        }
      }
    }
  }

  throw new Error("No image generated in Gemini response")
}
