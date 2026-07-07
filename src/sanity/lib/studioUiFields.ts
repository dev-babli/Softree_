/** UI-only Studio fields — must never be persisted on published documents. */
export const STUDIO_UI_ONLY_FIELDS = [
  // Legacy object shells (caused publish mutation errors)
  'editorProgressPanel',
  'faqAeoPanel',
  'seoPreviewPanel',
  // Current string shells
  'publishChecklistUi',
  'faqReadinessUi',
  'seoPreviewUi',
] as const
