import { CASE_STUDY_HAS_STORY_GROQ, CASE_STUDY_NEEDS_WORK } from '@/sanity/lib/caseStudyCompleteness'

export const API_VERSION = '2026-05-21'

export { CASE_STUDY_NEEDS_WORK }

export const POST_NEEDS_WORK_FILTER = `(
  !defined(excerpt) ||
  !defined(body) ||
  !defined(mainImage) ||
  coalesce(status, "published") == "draft"
) && coalesce(status, "published") != "archived"`

export const DASHBOARD_QUERY = `{
  "caseStudies": {
    "total": count(*[_type == "caseStudy"]),
    "published": count(*[_type == "caseStudy" && coalesce(status, "published") == "published"]),
    "drafts": count(*[_type == "caseStudy" && coalesce(status, "published") == "draft"]),
    "needsWork": count(*[_type == "caseStudy" && ${CASE_STUDY_NEEDS_WORK}])
  },
  "posts": {
    "total": count(*[_type == "post"]),
    "published": count(*[_type == "post" && coalesce(status, "published") == "published"]),
    "drafts": count(*[_type == "post" && coalesce(status, "published") == "draft"]),
    "needsWork": count(*[_type == "post" && ${POST_NEEDS_WORK_FILTER}])
  },
  "marketing": {
    "total": count(*[_type == "marketingPage"]),
    "published": count(*[_type == "marketingPage" && status == "published"]),
    "drafts": count(*[_type == "marketingPage" && coalesce(status, "draft") == "draft"])
  },
  "attentionCaseStudies": *[_type == "caseStudy" && ${CASE_STUDY_NEEDS_WORK}] | order(_updatedAt desc)[0...8] {
    _id,
    title,
    client,
    excerpt,
    headerTitle,
    "status": coalesce(status, "published"),
    "hasImage": defined(mainImage.asset) || defined(mainImageUrl),
    "hasStory": ${CASE_STUDY_HAS_STORY_GROQ},
    _updatedAt
  },
  "attentionPosts": *[_type == "post" && ${POST_NEEDS_WORK_FILTER}] | order(_updatedAt desc)[0...5] {
    _id,
    title,
    "status": coalesce(status, "published"),
    "hasImage": defined(mainImage.asset),
    "hasBody": count(coalesce(body, [])) > 0,
    excerpt,
    _updatedAt
  },
  "recentActivity": *[_type in ["caseStudy", "post", "marketingPage"]] | order(_updatedAt desc)[0...8] {
    _id,
    _type,
    title,
    client,
    "status": coalesce(status, "published"),
    _updatedAt
  }
}`
