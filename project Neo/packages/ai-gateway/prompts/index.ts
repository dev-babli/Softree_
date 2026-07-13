import type { AIMessage, AIContext } from '@neo/types';

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  system: string;
  user: (variables: Record<string, string>) => string;
  tools?: string[];
}

export const promptLibrary: PromptTemplate[] = [
  {
    id: 'generate-content',
    name: 'Generate Content',
    description: 'Generate marketing content from a brief',
    system:
      'You are a senior content strategist. Create concise, engaging content that matches the brand voice and includes a clear call to action.',
    user: (v) => `Create ${v.type ?? 'content'} about: ${v.topic}. Target audience: ${v.audience ?? 'general'}. Tone: ${v.tone ?? 'professional'}. Length: ${v.length ?? 'medium'}.`,
  },
  {
    id: 'improve-seo',
    name: 'Improve SEO',
    description: 'Optimize content for search engines',
    system:
      'You are an SEO expert. Improve the provided content for search visibility while preserving its meaning and readability.',
    user: (v) => `Optimize this content for SEO. Target keyword: ${v.keyword}. Content: ${v.content}`,
  },
  {
    id: 'summarize',
    name: 'Summarize',
    description: 'Summarize long content into key points',
    system:
      'You are an expert at distilling information. Summarize the content into clear, actionable bullet points.',
    user: (v) => `Summarize the following content:\n\n${v.content}`,
  },
  {
    id: 'translate',
    name: 'Translate',
    description: 'Translate content to another language',
    system:
      'You are a professional translator. Translate the content accurately while preserving tone and meaning.',
    user: (v) => `Translate this content to ${v.language}:\n\n${v.content}`,
  },
  {
    id: 'review',
    name: 'Review Content',
    description: 'Review and suggest edits',
    system:
      'You are a meticulous editor. Review the content for clarity, grammar, tone, and accuracy. Provide specific suggestions.',
    user: (v) => `Review this content and suggest improvements:\n\n${v.content}`,
  },
];

export function getPromptTemplate(id: string): PromptTemplate | undefined {
  return promptLibrary.find((p) => p.id === id);
}

export function buildPrompt(
  templateId: string,
  variables: Record<string, string>,
  context?: AIContext
): AIMessage[] {
  const template = getPromptTemplate(templateId);
  if (!template) {
    return [
      { role: 'system', content: 'You are Neo, an AI assistant.' },
      { role: 'user', content: variables.content ?? variables.topic ?? '' },
    ];
  }

  const systemMessage = context
    ? `${template.system}\n\nContext: workspace=${context.workspaceId}, user=${context.userId}${context.documentId ? `, document=${context.documentId}` : ''}`
    : template.system;

  return [
    { role: 'system', content: systemMessage },
    { role: 'user', content: template.user(variables) },
  ];
}

export function listPrompts(): { id: string; name: string; description: string }[] {
  return promptLibrary.map(({ id, name, description }) => ({ id, name, description }));
}
