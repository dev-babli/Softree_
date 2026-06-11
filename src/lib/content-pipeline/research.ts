import type { ResearchBrief } from './types'

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

export async function suggestTopic(): Promise<string> {
  const apiKey = process.env.PERPLEXITY_API_KEY
  const monthYear = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

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
