type PosthogQueryResponse = {
  results?: Array<{ results?: Array<Array<number | string>> }>
}

export type PosthogSnapshot = {
  configured: boolean
  hint?: string
  pageviews7d?: number
  uniqueVisitors7d?: number
  topPages?: Array<{ path: string; views: number }>
}

export async function fetchPosthogSnapshot(): Promise<PosthogSnapshot> {
  const apiKey = process.env.POSTHOG_PERSONAL_API_KEY
  const projectId = process.env.POSTHOG_PROJECT_ID
  const host = (process.env.POSTHOG_API_HOST || 'https://us.posthog.com').replace(/\/$/, '')

  if (!apiKey || !projectId) {
    return {
      configured: false,
      hint: 'Set POSTHOG_PERSONAL_API_KEY and POSTHOG_PROJECT_ID for live traffic tiles.',
    }
  }

  try {
    const res = await fetch(`${host}/api/projects/${projectId}/query/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: {
          kind: 'HogQLQuery',
          query: `
            SELECT
              countIf(event = '$pageview') AS pageviews,
              count(DISTINCT person_id) AS visitors
            FROM events
            WHERE timestamp >= now() - INTERVAL 7 DAY
          `,
        },
      }),
      next: { revalidate: 900 },
    })

    if (!res.ok) {
      const body = await res.text()
      return {
        configured: false,
        hint: `PostHog query failed (${res.status}). Check API key and project ID.`,
      }
    }

    const json = (await res.json()) as PosthogQueryResponse
    const row = json.results?.[0]?.results?.[0]
    const pageviews = Number(row?.[0] ?? 0)
    const visitors = Number(row?.[1] ?? 0)

    let topPages: Array<{ path: string; views: number }> | undefined
    try {
      const topRes = await fetch(`${host}/api/projects/${projectId}/query/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: {
            kind: 'HogQLQuery',
            query: `
              SELECT
                coalesce(properties.$pathname, '/') AS path,
                count() AS views
              FROM events
              WHERE event = '$pageview'
                AND timestamp >= now() - INTERVAL 7 DAY
              GROUP BY path
              ORDER BY views DESC
              LIMIT 8
            `,
          },
        }),
        next: { revalidate: 900 },
      })
      if (topRes.ok) {
        const topJson = (await topRes.json()) as PosthogQueryResponse
        const rows = topJson.results?.[0]?.results ?? []
        topPages = rows
          .map((r) => ({
            path: String(r?.[0] ?? '/'),
            views: Number(r?.[1] ?? 0),
          }))
          .filter((p) => p.views > 0)
      }
    } catch (error) {
      console.error('[posthogSnapshot] Failed to fetch top pages:', error)
      topPages = undefined
    }

    return {
      configured: true,
      pageviews7d: Number.isFinite(pageviews) ? pageviews : 0,
      uniqueVisitors7d: Number.isFinite(visitors) ? visitors : 0,
      topPages,
    }
  } catch (error) {
    console.error('[posthogSnapshot] Failed to fetch PostHog snapshot:', error)
    return {
      configured: false,
      hint: 'Could not reach PostHog API. Verify POSTHOG_API_HOST if self-hosted.',
    }
  }
}
