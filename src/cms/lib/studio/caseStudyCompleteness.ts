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

/** True when the document has page body content (legacy narrative). */
export function caseStudyHasStoryContent(doc: CaseStudyCompletenessDoc | undefined | null): boolean {
  if (!doc) return false

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
 */
export const CASE_STUDY_NEEDS_WORK = `(
  !defined(category) ||
  !defined(excerpt) ||
  (
    count(coalesce(challengeContent, [])) == 0 &&
    count(coalesce(approachContent, [])) == 0 &&
    count(coalesce(outcomeContent, [])) == 0 &&
    count(coalesce(body, [])) == 0 &&
    count(coalesce(challenge, [])) == 0
  ) ||
  (!defined(mainImage) && !defined(mainImageUrl)) ||
  coalesce(visibility, status, "published") == "draft"
) && coalesce(visibility, status, "published") != "archived"`

/** GROQ expression for dashboard attention list — inline hasStory flag. */
export const CASE_STUDY_HAS_STORY_GROQ = `(
  count(coalesce(challengeContent, [])) > 0 ||
  count(coalesce(approachContent, [])) > 0 ||
  count(coalesce(outcomeContent, [])) > 0 ||
  count(coalesce(body, [])) > 0
)`
