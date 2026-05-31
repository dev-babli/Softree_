import { defaultFieldInstructions } from '../assist/config'

/** Field-level AI Assist hints (used once AI is enabled in Studio via ✨). */
export function aiAssistInstruction(instruction: string) {
  return { aiAssist: { exclude: false as const }, description: instruction }
}

export function aiAssistExcluded() {
  return { aiAssist: { exclude: true as const } }
}

export const fieldAi = {
  excerpt: aiAssistInstruction(defaultFieldInstructions.excerpt),
  metaTitle: aiAssistInstruction(defaultFieldInstructions.metaTitle),
  metaDescription: aiAssistInstruction(defaultFieldInstructions.metaDescription),
  body: aiAssistInstruction(defaultFieldInstructions.body),
  challengeContent: aiAssistInstruction(defaultFieldInstructions.challengeContent),
  approachContent: aiAssistInstruction(defaultFieldInstructions.approachContent),
  outcomeContent: aiAssistInstruction(defaultFieldInstructions.outcomeContent),
  faqAnswer: aiAssistInstruction(defaultFieldInstructions.faqAnswer),
} as const
