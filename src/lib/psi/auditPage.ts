const PSI_ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'
const PSI_TIMEOUT_MS = 12_000

export type PsiScores = {
  performance: number
  accessibility: number
  seo: number
  bestPractices: number
}

function score(raw?: number): number {
  return Math.round((raw ?? 0) * 100)
}

export async function auditPageSpeed(
  url: string,
  strategy: 'mobile' | 'desktop',
  apiKey: string,
): Promise<PsiScores> {
  const endpoint = new URL(PSI_ENDPOINT)
  endpoint.searchParams.set('url', url)
  endpoint.searchParams.set('strategy', strategy)
  endpoint.searchParams.set('key', apiKey)
  for (const cat of ['performance', 'accessibility', 'best-practices', 'seo']) {
    endpoint.searchParams.append('category', cat)
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), PSI_TIMEOUT_MS)

  try {
    const res = await fetch(endpoint.toString(), {
      signal: controller.signal,
      next: { revalidate: 3600 },
    })
    if (!res.ok) {
      const body = await res.text()
      throw new Error(`PSI ${res.status}: ${body.slice(0, 200)}`)
    }

    const json = (await res.json()) as {
      lighthouseResult?: { categories?: Record<string, { score?: number }> }
    }
    const cats = json.lighthouseResult?.categories ?? {}

    return {
      performance: score(cats.performance?.score),
      accessibility: score(cats.accessibility?.score),
      seo: score(cats.seo?.score),
      bestPractices: score(cats['best-practices']?.score),
    }
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      throw new Error(`PSI timed out after ${PSI_TIMEOUT_MS / 1000}s`)
    }
    throw err
  } finally {
    clearTimeout(timer)
  }
}
