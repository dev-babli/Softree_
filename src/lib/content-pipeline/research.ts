import type { ResearchBrief } from './types'

export type MarketTopicCategory =
  | 'AI & Copilots'
  | 'Power Platform'
  | 'SharePoint'
  | 'Data & Fabric'
  | 'Delivery'

export type MarketTopicTrend = 'rising' | 'stable' | 'seasonal'

export type MarketTopicSuggestion = {
  topic: string
  category: MarketTopicCategory
  trend: MarketTopicTrend
  rationale: string
  asOf: string
}

function currentMonthYear(): string {
  return new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

function fallbackMarketTopics(asOf: string): MarketTopicSuggestion[] {
  return [
    {
      topic: 'Copilot Studio agents vs custom Azure AI — enterprise governance playbook',
      category: 'AI & Copilots',
      trend: 'rising',
      rationale: 'IT leaders are standardizing agent rollout, security review, and cost controls.',
      asOf,
    },
    {
      topic: 'Power Platform environment strategy for multi-geo enterprises in 2026',
      category: 'Power Platform',
      trend: 'rising',
      rationale: 'DLP, ALM, and managed environments are top buyer concerns this quarter.',
      asOf,
    },
    {
      topic: 'SharePoint Premium + Microsoft Graph: modern intranet without migration downtime',
      category: 'SharePoint',
      trend: 'stable',
      rationale: 'Teams still modernize knowledge bases while avoiding big-bang cutovers.',
      asOf,
    },
    {
      topic: 'Microsoft Fabric adoption — lakehouse ROI metrics finance teams actually trust',
      category: 'Data & Fabric',
      trend: 'rising',
      rationale: 'Fabric pilots are moving from POC to funded programs with CFO scrutiny.',
      asOf,
    },
    {
      topic: 'Nearshore vs offshore delivery models for Microsoft implementation partners',
      category: 'Delivery',
      trend: 'seasonal',
      rationale: 'Budget cycles are reopening staffing and velocity conversations.',
      asOf,
    },
    {
      topic: 'Agentic workflows on Power Automate — where RPA ends and orchestration begins',
      category: 'Power Platform',
      trend: 'rising',
      rationale: 'Automation teams are replatforming legacy flows to agent-ready patterns.',
      asOf,
    },
  ]
}

export async function researchTopic(topic: string): Promise<ResearchBrief> {
  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const apiKey = process.env.PERPLEXITY_API_KEY
  if (!apiKey) {
    return fallbackResearch(topic, today)
  }

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'sonar',
        temperature: 0.2,
        return_citations: true,
        search_recency_filter: 'month',
        messages: [
          {
            role: 'system',
            content:
              'You are an enterprise technology research analyst for Softree Technology (Microsoft, Power Platform, SharePoint, AI, offshore engineering). Return ONLY valid JSON.',
          },
          {
            role: 'user',
            content: `Today is ${today}. Research this topic for a B2B blog post: "${topic}".

Return JSON:
{
  "summary": "2-3 sentences, answer-first",
  "facts": [{"fact": "...", "date": "June 2026", "source": "...", "url": "https://..."}],
  "citations": [{"title": "...", "url": "https://..."}],
  "faqSeeds": ["question 1", "..."],
  "suggestedH2": ["heading 1", "..."],
  "competitorGaps": ["gap Softree can own"]
}

Include 5+ dated facts from the last 30 days where possible. Cite authoritative sources.`,
          },
        ],
      }),
    })

    if (!response.ok) {
      return fallbackResearch(topic, today)
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>
    }
    const content = data.choices?.[0]?.message?.content
    if (!content) return fallbackResearch(topic, today)

    const parsed = JSON.parse(content.replace(/```json|```/g, '').trim()) as ResearchBrief
    return {
      summary: parsed.summary || fallbackResearch(topic, today).summary,
      facts: parsed.facts || [],
      citations: parsed.citations || [],
      faqSeeds: parsed.faqSeeds || [],
      suggestedH2: parsed.suggestedH2 || [],
      competitorGaps: parsed.competitorGaps || [],
    }
  } catch {
    return fallbackResearch(topic, today)
  }
}

function fallbackResearch(topic: string, today: string): ResearchBrief {
  return {
    summary: `${topic} — enterprise teams are evaluating implementation options as of ${today}. Softree recommends grounding decisions in measurable outcomes, governance, and delivery speed.`,
    facts: [
      {
        fact: `Enterprise interest in ${topic} remains high in ${new Date().getFullYear()}.`,
        date: today,
        source: 'Softree editorial research',
      },
    ],
    citations: [],
    faqSeeds: [
      `What is ${topic}?`,
      `Why does ${topic} matter for enterprises in ${new Date().getFullYear()}?`,
      `How does Softree approach ${topic}?`,
    ],
    suggestedH2: [
      `What is ${topic}?`,
      `Why enterprises are prioritizing this now`,
      `How Softree delivers ${topic}`,
      `Common mistakes to avoid`,
    ],
    competitorGaps: ['Practical implementation detail with metrics', 'Microsoft ecosystem specifics'],
  }
}

/** Multiple market-aware topic ideas for the Content Agent UI. */
export async function suggestMarketTopics(limit = 6): Promise<MarketTopicSuggestion[]> {
  const asOf = currentMonthYear()
  const apiKey = process.env.PERPLEXITY_API_KEY

  if (!apiKey) {
    return fallbackMarketTopics(asOf).slice(0, limit)
  }

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'sonar',
        temperature: 0.35,
        search_recency_filter: 'month',
        messages: [
          {
            role: 'system',
            content:
              'You are a B2B content strategist for Softree Technology (Microsoft, SharePoint, Power Platform, Agentic AI, Fabric). Return ONLY valid JSON.',
          },
          {
            role: 'user',
            content: `Today is ${asOf}. Suggest ${limit} high-value blog topics aligned with current enterprise Microsoft market trends.

Return JSON array:
[
  {
    "topic": "specific headline-style topic",
    "category": "AI & Copilots" | "Power Platform" | "SharePoint" | "Data & Fabric" | "Delivery",
    "trend": "rising" | "stable" | "seasonal",
    "rationale": "one sentence why this matters now"
  }
]

Focus on buyer intent, governance, ROI, and implementation — not generic AI hype.`,
          },
        ],
      }),
    })

    if (!response.ok) {
      return fallbackMarketTopics(asOf).slice(0, limit)
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>
    }
    const content = data.choices?.[0]?.message?.content
    if (!content) return fallbackMarketTopics(asOf).slice(0, limit)

    const parsed = JSON.parse(content.replace(/```json|```/g, '').trim()) as Array<
      Omit<MarketTopicSuggestion, 'asOf'>
    >

    if (!Array.isArray(parsed) || parsed.length === 0) {
      return fallbackMarketTopics(asOf).slice(0, limit)
    }

    return parsed.slice(0, limit).map((item) => ({
      topic: item.topic?.trim() || 'Microsoft enterprise trends',
      category: item.category || 'Power Platform',
      trend: item.trend || 'stable',
      rationale: item.rationale || 'Timely for enterprise Microsoft buyers.',
      asOf,
    }))
  } catch {
    return fallbackMarketTopics(asOf).slice(0, limit)
  }
}

export async function suggestTopic(): Promise<string> {
  const topics = await suggestMarketTopics(1)
  if (topics[0]?.topic) return topics[0].topic

  const apiKey = process.env.PERPLEXITY_API_KEY
  const monthYear = currentMonthYear()

  if (!apiKey) {
    return `Enterprise SharePoint and Power Platform trends for ${monthYear}`
  }

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'sonar',
        temperature: 0.4,
        search_recency_filter: 'month',
        messages: [
          {
            role: 'user',
            content: `Suggest ONE high-value B2B blog topic for Softree Technology (Microsoft, SharePoint, Power Platform, Agentic AI, Fabric) for ${monthYear}. Return only the topic title, no quotes.`,
          },
        ],
      }),
    })
    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>
    }
    const topic = data.choices?.[0]?.message?.content?.trim()
    return topic || `Microsoft enterprise automation trends — ${monthYear}`
  } catch {
    return `Microsoft enterprise automation trends — ${monthYear}`
  }
}
