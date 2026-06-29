const MS_PER_MINUTE = 60_000

/** Matches the default shown on build.nvidia.com ("Up to 40 rpm"). */
export const DEFAULT_NVIDIA_RPM = 40

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function resolveNvidiaMaxRpm(): number {
  const raw = process.env.CONTENT_PIPELINE_NVIDIA_RPM?.trim()
  if (raw) {
    const parsed = Number.parseInt(raw, 10)
    if (Number.isFinite(parsed) && parsed > 0) return parsed
  }
  return DEFAULT_NVIDIA_RPM
}

/** Minimum spacing between NVIDIA API calls with a small safety margin. */
export function nvidiaMinIntervalMs(rpm = resolveNvidiaMaxRpm()): number {
  return Math.ceil((MS_PER_MINUTE / rpm) * 1.08)
}

let lastNvidiaCallAt = 0
let nvidiaQueue: Promise<void> = Promise.resolve()

/** Serialize NVIDIA calls so bursts stay under your RPM ceiling (default 40). */
export async function throttleNvidiaApi(): Promise<void> {
  const interval = nvidiaMinIntervalMs()

  nvidiaQueue = nvidiaQueue.then(async () => {
    const now = Date.now()
    const waitMs = Math.max(0, lastNvidiaCallAt + interval - now)
    if (waitMs > 0) await sleep(waitMs)
    lastNvidiaCallAt = Date.now()
  })

  await nvidiaQueue
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  try {
    return JSON.stringify(error)
  } catch {
    return String(error)
  }
}

function isRateLimitError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false
  const record = error as { status?: number; code?: string; message?: string }
  if (record.status === 429) return true
  if (record.code === 'rate_limit_exceeded') return true
  const message = errorMessage(error).toLowerCase()
  return message.includes('429') || message.includes('rate limit') || message.includes('too many')
}

/** Transient Gemini / Google AI failures worth retrying or falling back to another provider. */
export function isRetryableLlmError(error: unknown): boolean {
  const message = errorMessage(error).toLowerCase()
  return (
    message.includes('503') ||
    message.includes('429') ||
    message.includes('unavailable') ||
    message.includes('high demand') ||
    message.includes('resource_exhausted') ||
    message.includes('overloaded') ||
    message.includes('deadline exceeded') ||
    message.includes('internal error') ||
    message.includes('json') ||
    message.includes('unexpected token')
  )
}

/**
 * Pace NVIDIA requests and retry on 429 with exponential backoff.
 * Use for LLM chat completions and image generation on build.nvidia.com.
 */
export async function withNvidiaRateLimit<T>(
  fn: () => Promise<T>,
  maxRetries = 4,
): Promise<T> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    await throttleNvidiaApi()
    try {
      return await fn()
    } catch (error) {
      if (!isRateLimitError(error) || attempt >= maxRetries) throw error
      const backoffMs = Math.min(30_000, 2000 * 2 ** attempt)
      await sleep(backoffMs)
    }
  }

  throw new Error('NVIDIA rate limit retries exhausted')
}

/** Retry Gemini calls on transient 503/429 spikes before falling back to another LLM. */
export async function withGeminiRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 4,
): Promise<T> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      if (!isRetryableLlmError(error) || attempt >= maxRetries) throw error
      const backoffMs = Math.min(30_000, 2000 * 2 ** attempt)
      await sleep(backoffMs)
    }
  }

  throw new Error('Gemini retries exhausted')
}
