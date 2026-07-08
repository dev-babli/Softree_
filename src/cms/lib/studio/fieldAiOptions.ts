import { defineField } from 'sanity'

import { defaultFieldInstructions } from '@/cms/studio/assist/instructions'
import {
  FIELD_AI_REGISTRY,
  getAutocompleteFields,
} from '@/cms/studio/assist/fieldRegistry'

/** Field-level AI Assist hints (used once AI is enabled in Studio via ✨). */
export function aiAssistInstruction(instruction: string) {
  return { aiAssist: { exclude: false as const }, description: instruction }
}

export function aiAssistExcluded() {
  return { aiAssist: { exclude: true as const } }
}

const registryHints = Object.fromEntries(
  FIELD_AI_REGISTRY.map((spec) => [spec.fieldName, aiAssistInstruction(spec.instruction)]),
)

export const fieldAi = {
  excerpt: registryHints.excerpt ?? aiAssistInstruction(defaultFieldInstructions.excerpt),
  metaTitle: registryHints.metaTitle ?? aiAssistInstruction(defaultFieldInstructions.metaTitle),
  metaDescription:
    registryHints.metaDescription ?? aiAssistInstruction(defaultFieldInstructions.metaDescription),
  body: registryHints.body ?? aiAssistInstruction(defaultFieldInstructions.body),
  challengeContent:
    registryHints.challengeContent ?? aiAssistInstruction(defaultFieldInstructions.challengeContent),
  approachContent:
    registryHints.approachContent ?? aiAssistInstruction(defaultFieldInstructions.approachContent),
  outcomeContent:
    registryHints.outcomeContent ?? aiAssistInstruction(defaultFieldInstructions.outcomeContent),
  faqAnswer: registryHints.answer ?? aiAssistInstruction(defaultFieldInstructions.faqAnswer),
  focusKeyword: registryHints.focusKeyword ?? aiAssistInstruction('Primary SEO keyword phrase'),
  secondaryKeywords: registryHints.secondaryKeywords ?? aiAssistInstruction('Secondary SEO keywords'),
} as const

export const AUTOCOMPLETE_FIELD_NAMES = getAutocompleteFields()

export function withFieldAi<T extends Record<string, unknown>>(field: T, key: keyof typeof fieldAi): T {
  const hint = fieldAi[key]
  return {
    ...field,
    description: hint.description,
    options: {
      ...((field as { options?: Record<string, unknown> }).options ?? {}),
      ...hint,
    },
  }
}
