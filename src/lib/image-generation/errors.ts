export class ImageGenerationError extends Error {
  readonly status: number

  constructor(message: string, status = 500) {
    super(message)
    this.name = "ImageGenerationError"
    this.status = status
  }
}

/** Turn Gemini / Google API failures into short Studio-friendly messages. */
export function formatProviderError(
  error: unknown,
  provider: "gemini" | "nvidia",
): ImageGenerationError {
  const raw =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : JSON.stringify(error)

  const lower = raw.toLowerCase()

  if (
    lower.includes("429") ||
    lower.includes("resource_exhausted") ||
    lower.includes("quota exceeded") ||
    lower.includes("rate limit")
  ) {
    const retryMatch = raw.match(/retry in ([\d.]+)s/i)
    const retryHint = retryMatch
      ? ` Retry in about ${Math.ceil(Number(retryMatch[1]))} seconds.`
      : ""

    if (provider === "gemini") {
      return new ImageGenerationError(
        `Gemini image quota is exhausted on your current Google AI plan (free tier limits are often 0 for image models).${retryHint} Enable billing at https://ai.google.dev/ or use Provider: NVIDIA in AI Images.`,
        429,
      )
    }

    return new ImageGenerationError(
      `NVIDIA rate limit or quota hit.${retryHint} Check usage at https://build.nvidia.com/`,
      429,
    )
  }

  if (lower.includes("401") || lower.includes("api key") || lower.includes("unauthorized")) {
    return new ImageGenerationError(
      `${provider === "gemini" ? "Gemini" : "NVIDIA"} API key is missing or invalid. Check Vercel / .env.local env vars.`,
      401,
    )
  }

  return new ImageGenerationError(
    raw.length > 280 ? `${raw.slice(0, 280)}…` : raw || "Image generation failed",
    500,
  )
}
