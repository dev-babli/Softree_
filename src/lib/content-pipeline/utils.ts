export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 96)
}

export function randomKey(): string {
  return Math.random().toString(36).slice(2, 12)
}

export function stripJsonFence(text: string): string {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (fenced?.[1]) return fenced[1].trim()
  return text.trim()
}

/** Parse LLM JSON output — repairs unescaped newlines and stray control chars. */
export function parseLlmJson<T>(text: string): T {
  const raw = stripJsonFence(text)

  const attempts = [
    raw,
    raw.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, ''),
    raw.replace(/"(?:[^"\\]|\\.)*"/g, (match) =>
      match
        .replace(/\r/g, '\\r')
        .replace(/\n/g, '\\n')
        .replace(/\t/g, '\\t')
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, ''),
    ),
  ]

  let lastError: unknown
  for (const candidate of attempts) {
    try {
      return JSON.parse(candidate) as T
    } catch (error) {
      lastError = error
    }
  }

  throw lastError instanceof Error ? lastError : new Error('Invalid JSON from LLM')
}
