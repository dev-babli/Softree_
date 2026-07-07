import { readFile } from 'node:fs/promises'
import { isAbsolute, join } from 'node:path'

import { JWT } from 'google-auth-library'

export type GscSnapshot = {
  configured: boolean
  hint?: string
  clicks28d?: number
  impressions28d?: number
  ctr?: number
  consoleUrl: string
  source?: 'api' | 'snapshot'
}

const GSC_CONSOLE = 'https://search.google.com/search-console'
const GSC_SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly'
const GSC_API = 'https://www.googleapis.com/webmasters/v3'

type ServiceAccountCredentials = {
  client_email: string
  private_key: string
}

function calcCtr(clicks: number, impressions: number): number {
  return impressions > 0 ? Math.round((clicks / impressions) * 1000) / 10 : 0
}

function formatYmd(d: Date): string {
  return d.toISOString().slice(0, 10)
}

/** GSC reporting lags ~2 days; use a 28-day window ending there. */
function get28DayRange(): { startDate: string; endDate: string } {
  const end = new Date()
  end.setUTCDate(end.getUTCDate() - 2)
  const start = new Date(end)
  start.setUTCDate(start.getUTCDate() - 27)
  return { startDate: formatYmd(start), endDate: formatYmd(end) }
}

async function loadServiceAccount(): Promise<ServiceAccountCredentials | null> {
  const json = process.env.GSC_SERVICE_ACCOUNT_JSON
  if (json) {
    try {
      const parsed = JSON.parse(json) as ServiceAccountCredentials
      if (parsed.client_email && parsed.private_key) {
        return {
          client_email: parsed.client_email,
          private_key: parsed.private_key.replace(/\\n/g, '\n'),
        }
      }
    } catch (error) {
      console.error('[gscSnapshot] Failed to parse GSC_SERVICE_ACCOUNT_JSON:', error)
      return null
    }
  }

  const keyPath = process.env.GSC_SERVICE_ACCOUNT_KEY_PATH
  if (keyPath) {
    try {
      const resolved = isAbsolute(keyPath) ? keyPath : join(process.cwd(), keyPath)
      const raw = await readFile(resolved, 'utf8')
      const parsed = JSON.parse(raw) as ServiceAccountCredentials
      if (parsed.client_email && parsed.private_key) return parsed
    } catch (error) {
      console.error('[gscSnapshot] Failed to read GSC service account key file:', error)
      return null
    }
  }

  return null
}

function resolvePropertyUrl(): string | undefined {
  return (
    process.env.GSC_PROPERTY_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    undefined
  )
}

async function fetchGscLiveMetrics(
  propertyUrl: string,
  credentials: ServiceAccountCredentials,
): Promise<GscSnapshot> {
  const client = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: [GSC_SCOPE],
  })

  const tokenResponse = await client.getAccessToken()
  const token = tokenResponse.token
  if (!token) {
    return {
      configured: false,
      hint: 'Could not authenticate with the GSC service account.',
      consoleUrl: GSC_CONSOLE,
    }
  }

  const { startDate, endDate } = get28DayRange()
  const siteUrl = encodeURIComponent(propertyUrl)
  const url = `${GSC_API}/sites/${siteUrl}/searchAnalytics/query`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      startDate,
      endDate,
      type: 'web',
      dataState: 'final',
    }),
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    if (res.status === 403) {
      return {
        configured: false,
        hint: `GSC denied access. In Search Console → Settings → Users, add ${credentials.client_email} with Full permission.`,
        consoleUrl: GSC_CONSOLE,
      }
    }
    if (res.status === 404) {
      return {
        configured: false,
        hint:
          'Property not found. Set GSC_PROPERTY_URL to the exact URL shown in Search Console (e.g. https://www.softreetechnology.com/ or sc-domain:softreetechnology.com).',
        consoleUrl: GSC_CONSOLE,
      }
    }
    const body = await res.text()
    return {
      configured: false,
      hint: `GSC API error (${res.status}). ${body.slice(0, 140)}`,
      consoleUrl: GSC_CONSOLE,
    }
  }

  const json = (await res.json()) as {
    rows?: Array<{ clicks?: number; impressions?: number }>
  }
  const row = json.rows?.[0]
  const clicks = Math.round(row?.clicks ?? 0)
  const impressions = Math.round(row?.impressions ?? 0)

  return {
    configured: true,
    source: 'api',
    clicks28d: clicks,
    impressions28d: impressions,
    ctr: calcCtr(clicks, impressions),
    consoleUrl: GSC_CONSOLE,
  }
}

function parseManualSnapshot(raw: string): GscSnapshot {
  try {
    const parsed = JSON.parse(raw) as {
      clicks28d?: number
      impressions28d?: number
    }
    const clicks = parsed.clicks28d ?? 0
    const impressions = parsed.impressions28d ?? 0
    return {
      configured: true,
      source: 'snapshot',
      clicks28d: clicks,
      impressions28d: impressions,
      ctr: calcCtr(clicks, impressions),
      consoleUrl: GSC_CONSOLE,
    }
  } catch {
    return {
      configured: false,
      hint: 'GSC_SNAPSHOT_JSON is invalid JSON.',
      consoleUrl: GSC_CONSOLE,
    }
  }
}

export async function fetchGscSnapshot(): Promise<GscSnapshot> {
  const propertyUrl = resolvePropertyUrl()
  const credentials = await loadServiceAccount()

  if (credentials && propertyUrl) {
    try {
      return await fetchGscLiveMetrics(propertyUrl, credentials)
    } catch (err) {
      return {
        configured: false,
        hint: err instanceof Error ? err.message : 'GSC API request failed.',
        consoleUrl: GSC_CONSOLE,
      }
    }
  }

  if (process.env.GSC_SNAPSHOT_JSON) {
    return parseManualSnapshot(process.env.GSC_SNAPSHOT_JSON)
  }

  if (credentials && !propertyUrl) {
    return {
      configured: false,
      hint: 'Service account loaded. Set GSC_PROPERTY_URL to your Search Console property URL.',
      consoleUrl: GSC_CONSOLE,
    }
  }

  if (propertyUrl && !credentials) {
    return {
      configured: false,
      hint:
        'Set GSC_SERVICE_ACCOUNT_KEY_PATH (local file) or GSC_SERVICE_ACCOUNT_JSON, then add the service account email in Search Console → Users.',
      consoleUrl: GSC_CONSOLE,
    }
  }

  return {
    configured: false,
    hint:
      'Connect Search Console: create a GCP service account, enable Search Console API, add the account in GSC Users, set GSC_PROPERTY_URL + credentials in .env.local.',
    consoleUrl: GSC_CONSOLE,
  }
}
