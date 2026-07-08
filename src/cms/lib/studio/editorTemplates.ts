/**
 * Single source of truth for editor-facing document templates.
 * All other template IDs remain registered for legacy intents but are hidden from UI.
 */

/** Shown in global Create menu + structure sidebar create actions */
export const EDITOR_CREATE_TEMPLATE_IDS = new Set([
  'caseStudy-composer',
  'post-composer',
  'marketing-landing',
])

/** Legacy template IDs — still registered for old bookmarks/intents, never shown in UI */
export const LEGACY_TEMPLATE_IDS = new Set([
  'post-article',
  'post-how-to',
  'post-thought-leadership',
  'post-product-update',
  'caseStudy-article',
  'caseStudy-ai',
  'caseStudy-power-platform',
  'caseStudy-sharepoint',
  'caseStudy-web',
  'caseStudy-mobile',
  'caseStudy-data-analytics',
  'caseStudy-standard',
  'caseStudy-transformation',
  'caseStudy-product-showcase',
])

export function isEditorCreateTemplate(templateId: string): boolean {
  return EDITOR_CREATE_TEMPLATE_IDS.has(templateId)
}
