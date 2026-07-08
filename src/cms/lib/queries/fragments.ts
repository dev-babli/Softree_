/** Shared GROQ fragments — expand during Sprint 3 migration */
export const SLUG_FIELD = `slug { current }`

export const VISIBILITY_FILTER = `coalesce(visibility, status, "published") == "published"`

export const CASE_STUDY_CARD = `{
  _id,
  title,
  excerpt,
  category,
  ${SLUG_FIELD},
  coverImage,
  clientName
}`

export const POST_CARD = `{
  _id,
  title,
  excerpt,
  ${SLUG_FIELD},
  publishedAt,
  mainImage
}`
