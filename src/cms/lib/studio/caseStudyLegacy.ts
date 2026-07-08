import { isCaseStudyCategory } from '@/app/case-studies/categoryConfig'
import {
  resolveCaseStudyCategory,
  type CaseStudyCategorySource,
} from '@/lib/case-study-category'

export type CaseStudyLegacyDoc = CaseStudyCategorySource & {
  headerTitle?: string | null
  heroHeadline?: string | null
  title?: string | null
  category?: string | null
}

/** Effective service category — stored value or inferred from legacy fields. */
export function effectiveCaseStudyCategory(
  doc: CaseStudyLegacyDoc | null | undefined,
): string | null {
  if (!doc) return null
  if (doc.category && isCaseStudyCategory(doc.category)) return doc.category
  return resolveCaseStudyCategory(doc)
}

/** Header title for validation / publish — prefers headerTitle, falls back to legacy hero fields. */
export function effectiveCaseStudyHeaderTitle(
  doc: CaseStudyLegacyDoc | null | undefined,
): string | null {
  if (!doc) return null
  const direct = doc.headerTitle?.trim()
  if (direct) return direct
  return doc.heroHeadline?.trim() || doc.title?.trim() || null
}

/** Patches to backfill canonical fields from legacy data (safe to apply on existing docs). */
export function getLegacyCaseStudyFieldPatches(
  doc: CaseStudyLegacyDoc | null | undefined,
): Record<string, string> {
  if (!doc) return {}

  const patches: Record<string, string> = {}

  if (!doc.category || !isCaseStudyCategory(doc.category)) {
    const resolved = resolveCaseStudyCategory(doc)
    if (resolved) patches.category = resolved
  }

  if (!doc.headerTitle?.trim()) {
    const fallback = effectiveCaseStudyHeaderTitle(doc)
    if (fallback && fallback.length >= 10) {
      patches.headerTitle = fallback
    }
  }

  return patches
}

export function hasLegacyCaseStudyFieldGaps(doc: CaseStudyLegacyDoc | null | undefined): boolean {
  return Object.keys(getLegacyCaseStudyFieldPatches(doc)).length > 0
}
