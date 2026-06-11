/** Shared completeness checks for case study documents (legacy story + page composer). */

export type CaseStudyCompletenessDoc = {
  detailLayout?: string
  composerSections?: unknown[]
  challengeContent?: unknown[]
  approachContent?: unknown[]
  outcomeContent?: unknown[]
  body?: unknown[]
  challenge?: unknown[]
}

/** True when the document has page body content (legacy narrative OR composer sections). */
export function caseStudyHasStoryContent(doc: CaseStudyCompletenessDoc | undefined | null): boolean {
  if (!doc) return false

  const layout = doc.detailLayout || 'page-composer'
  if (layout === 'page-composer') {
    return (doc.composerSections?.length ?? 0) > 0
  }

  return (
    (doc.body?.length ?? 0) > 0 ||
    (doc.challengeContent?.length ?? 0) > 0 ||
    (doc.approachContent?.length ?? 0) > 0 ||
    (doc.outcomeContent?.length ?? 0) > 0 ||
    (doc.challenge?.length ?? 0) > 0
  )
}

/**
 * GROQ filter: published case studies missing required fields.
 * Composer docs satisfy "story" via composerSections; legacy docs via narrative fields.
 */
export const CASE_STUDY_NEEDS_WORK = `(
  !defined(excerpt) ||
  !defined(client) ||
  !defined(headerTitle) ||
  (
    count(coalesce(challengeContent, [])) == 0 &&
    count(coalesce(approachContent, [])) == 0 &&
    count(coalesce(outcomeContent, [])) == 0 &&
    count(coalesce(body, [])) == 0 &&
    count(coalesce(challenge, [])) == 0 &&
    !(
      coalesce(detailLayout, "page-composer") == "page-composer" &&
      count(coalesce(composerSections, [])) > 0
    )
  ) ||
  (!defined(mainImage) && !defined(mainImageUrl)) ||
  coalesce(status, "published") == "draft"
) && coalesce(status, "published") != "archived"`

/** GROQ expression for dashboard attention list — inline hasStory flag. */
export const CASE_STUDY_HAS_STORY_GROQ = `(
  count(coalesce(challengeContent, [])) > 0 ||
  count(coalesce(approachContent, [])) > 0 ||
  count(coalesce(outcomeContent, [])) > 0 ||
  count(coalesce(body, [])) > 0 ||
  (
    coalesce(detailLayout, "page-composer") == "page-composer" &&
    count(coalesce(composerSections, [])) > 0
  )
)`
