import { defaultFieldInstructions } from './instructions'

export type FieldAiAction = 'autocomplete' | 'rewrite'

export type FieldAiSpec = {
  fieldName: string
  documentTypes: Array<'caseStudy' | 'post' | 'marketingPage'>
  actions: FieldAiAction[]
  instruction: string
  contextFields: string[]
  maxLength?: number
}

export const FIELD_AI_REGISTRY: FieldAiSpec[] = [
  {
    fieldName: 'excerpt',
    documentTypes: ['caseStudy', 'post'],
    actions: ['autocomplete', 'rewrite'],
    instruction: defaultFieldInstructions.excerpt,
    contextFields: ['title', 'client', 'industry', 'challengeContent', 'approachContent', 'outcomeContent', 'body'],
    maxLength: 160,
  },
  {
    fieldName: 'metaTitle',
    documentTypes: ['caseStudy', 'post', 'marketingPage'],
    actions: ['autocomplete', 'rewrite'],
    instruction: defaultFieldInstructions.metaTitle,
    contextFields: ['title', 'excerpt', 'client', 'focusKeyword'],
    maxLength: 60,
  },
  {
    fieldName: 'metaDescription',
    documentTypes: ['caseStudy', 'post', 'marketingPage'],
    actions: ['autocomplete', 'rewrite'],
    instruction: defaultFieldInstructions.metaDescription,
    contextFields: ['title', 'excerpt', 'metaTitle', 'focusKeyword'],
    maxLength: 160,
  },
  {
    fieldName: 'focusKeyword',
    documentTypes: ['post'],
    actions: ['autocomplete'],
    instruction: 'Suggest one primary SEO focus keyword phrase for this article.',
    contextFields: ['title', 'excerpt', 'body'],
    maxLength: 80,
  },
  {
    fieldName: 'secondaryKeywords',
    documentTypes: ['post'],
    actions: ['autocomplete'],
    instruction: 'Suggest 3–5 comma-separated secondary SEO keywords.',
    contextFields: ['title', 'excerpt', 'focusKeyword', 'body'],
    maxLength: 200,
  },
  {
    fieldName: 'featuredImagePrompt',
    documentTypes: ['post'],
    actions: ['autocomplete'],
    instruction:
      'Write a detailed AI image generation prompt for a blog hero (16:9, no text, no faces, enterprise tech aesthetic).',
    contextFields: ['title', 'excerpt', 'categories'],
    maxLength: 800,
  },
  {
    fieldName: 'heroImagePrompt',
    documentTypes: ['caseStudy'],
    actions: ['autocomplete'],
    instruction:
      'Write a detailed AI image generation prompt for a case study hero (16:9, no text, no faces, enterprise tech aesthetic).',
    contextFields: ['title', 'excerpt', 'client', 'industry', 'category'],
    maxLength: 800,
  },
  {
    fieldName: 'question',
    documentTypes: ['caseStudy', 'post'],
    actions: ['autocomplete', 'rewrite'],
    instruction: 'Write a clear FAQ question editors would search for.',
    contextFields: ['title', 'excerpt', 'challengeContent', 'approachContent', 'outcomeContent', 'body'],
    maxLength: 120,
  },
  {
    fieldName: 'answer',
    documentTypes: ['caseStudy', 'post'],
    actions: ['autocomplete', 'rewrite'],
    instruction: defaultFieldInstructions.faqAnswer,
    contextFields: ['title', 'excerpt', 'challengeContent', 'approachContent', 'outcomeContent', 'question'],
    maxLength: 400,
  },
  {
    fieldName: 'body',
    documentTypes: ['post'],
    actions: ['rewrite'],
    instruction: defaultFieldInstructions.body,
    contextFields: ['title', 'excerpt'],
    maxLength: 2000,
  },
  {
    fieldName: 'challengeContent',
    documentTypes: ['caseStudy'],
    actions: ['rewrite'],
    instruction: defaultFieldInstructions.challengeContent,
    contextFields: ['title', 'client', 'industry', 'excerpt'],
    maxLength: 2000,
  },
  {
    fieldName: 'approachContent',
    documentTypes: ['caseStudy'],
    actions: ['rewrite'],
    instruction: defaultFieldInstructions.approachContent,
    contextFields: ['title', 'challengeContent', 'client'],
    maxLength: 2000,
  },
  {
    fieldName: 'outcomeContent',
    documentTypes: ['caseStudy'],
    actions: ['rewrite'],
    instruction: defaultFieldInstructions.outcomeContent,
    contextFields: ['title', 'approachContent', 'metrics'],
    maxLength: 2000,
  },
]

export function getFieldSpec(fieldName: string, documentType: string): FieldAiSpec | undefined {
  return FIELD_AI_REGISTRY.find(
    (spec) => spec.fieldName === fieldName && spec.documentTypes.includes(documentType as FieldAiSpec['documentTypes'][number]),
  )
}

export function getAutocompleteFields(): Set<string> {
  return new Set(
    FIELD_AI_REGISTRY.filter((spec) => spec.actions.includes('autocomplete')).map((spec) => spec.fieldName),
  )
}

export function getRewriteFields(): Set<string> {
  return new Set(
    FIELD_AI_REGISTRY.filter((spec) => spec.actions.includes('rewrite')).map((spec) => spec.fieldName),
  )
}

export const FIELD_SPECS_RECORD = Object.fromEntries(
  FIELD_AI_REGISTRY.map((spec) => [
    spec.fieldName,
    {
      contextFields: spec.contextFields,
      instruction: spec.instruction,
      maxLength: spec.maxLength,
    },
  ]),
) as Record<string, { contextFields: string[]; instruction: string; maxLength?: number }>
