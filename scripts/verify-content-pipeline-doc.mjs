import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '1zmh4sfw',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-05-21',
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
})

const docId = process.argv[2] || 'post-content-agent-recheck-verification-2026'

const doc = await client.fetch(
  `*[_type == "post" && _id == $docId][0]{
    _id,
    title,
    status,
    reviewStatus,
    displayMode,
    "sectionCount": count(composerSections),
    "hasExcerpt": defined(excerpt),
    "hasMainImage": defined(mainImage.asset)
  }`,
  { docId },
)

const needsWork = await client.fetch(
  `count(*[_type == "post" && _id == $docId && (
    !defined(excerpt) ||
    !defined(title) ||
    !defined(mainImage.asset) ||
    (
      coalesce(displayMode, "classic") == "composer" &&
      count(coalesce(composerSections, [])) == 0
    ) ||
    coalesce(status, "published") == "draft"
  ) && coalesce(status, "published") != "archived"])`,
  { docId },
)

const authorExists = await client.fetch(`defined(*[_id == "softree-technology"][0]._id)`)

console.log(JSON.stringify({ doc, needsWork: needsWork === 1, authorExists }, null, 2))
