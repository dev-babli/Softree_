/** Shared fetch helpers for Studio tools calling /api/studio/* routes. */

export function studioApiUrl(path: string): string {
  if (typeof window === 'undefined') return path
  return `${window.location.origin}${path}`
}

export function studioFetchHeaders(contentType = true): HeadersInit {
  const headers: Record<string, string> = {
    'X-Softree-Studio': '1',
  }
  if (contentType) headers['Content-Type'] = 'application/json'
  return headers
}

export function studioFetchInit(method = 'GET', body?: unknown): RequestInit {
  return {
    method,
    credentials: 'same-origin',
    headers: studioFetchHeaders(Boolean(body)),
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  }
}
