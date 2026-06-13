/** Writer personas that compete in the Content Arena. */

export type ArenaContestantId = 'editor' | 'seo-architect' | 'practitioner'

export type ArenaContestant = {
  id: ArenaContestantId
  name: string
  temperature: number
  directive: string
}

export const ARENA_CONTESTANTS: ArenaContestant[] = [
  {
    id: 'editor',
    name: 'Editor',
    temperature: 0.3,
    directive: `You are the editorial lead. Prioritize clarity, narrative flow, and Softree brand voice.
Write like a senior technical editor: confident, precise, no hype. Every section should read naturally when spoken aloud.`,
  },
  {
    id: 'seo-architect',
    name: 'SEO Architect',
    temperature: 0.25,
    directive: `You are an SEO/AEO/GEO specialist. Maximize extractability for AI answer engines.
Front-load keywords, use question-form H2s, dense FAQ coverage, and explicit entity mentions (Microsoft, SharePoint, Power Platform, Fabric, Copilot).
Every narrative section must open with a direct 40–60 word answer.`,
  },
  {
    id: 'practitioner',
    name: 'Practitioner',
    temperature: 0.45,
    directive: `You are a delivery lead who has shipped enterprise Microsoft projects.
Prioritize concrete implementation detail: timelines, team sizes, governance checkpoints, failure modes, and measurable outcomes.
Use specific metrics from the research brief — never invent statistics without a source.`,
  },
]

export function getContestant(id: ArenaContestantId): ArenaContestant {
  const found = ARENA_CONTESTANTS.find((c) => c.id === id)
  if (!found) throw new Error(`Unknown arena contestant: ${id}`)
  return found
}
