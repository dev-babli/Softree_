/** Completeness checks for blog posts (classic body OR composer sections). */

export type PostCompletenessDoc = {
  displayMode?: 'classic' | 'composer'
  body?: unknown[]
  composerSections?: unknown[]
}

export function postHasContent(doc: PostCompletenessDoc | undefined | null): boolean {
  if (!doc) return false
  if (doc.displayMode === 'composer') {
    return (doc.composerSections?.length ?? 0) > 0
  }
  return (doc.body?.length ?? 0) > 0
}

export const POST_NEEDS_WORK = `(
  !defined(excerpt) ||
  !defined(title) ||
  !defined(mainImage.asset) ||
  (
    coalesce(displayMode, "classic") == "composer" &&
    count(coalesce(composerSections, [])) == 0
  ) ||
  (
    coalesce(displayMode, "classic") == "classic" &&
    count(coalesce(body, [])) == 0
  ) ||
  coalesce(visibility, status, "published") == "draft"
) && coalesce(visibility, status, "published") != "archived"`
