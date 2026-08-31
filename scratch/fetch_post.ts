import { createClient } from '@sanity/client';

const projectId = '1zmh4sfw';
const dataset = 'production';

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-02-01',
  useCdn: false,
});

const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug && ($preview == true || coalesce(visibility, status, "published") == "published")][0] {
    _id,
    _updatedAt,
    title,
    slug,
    excerpt,
    displayMode,
    layoutRecipe,
    heroEyebrow,
    heroHighlights[] { value, label },
    publishedAt,
    status,
    author->{ name, bio },
    categories[]->{ title, slug },
    mainImage { asset->{ url }, alt },
    body[]{
      ...,
      _type == "image" => {
        ...,
        asset->
      },
      markDefs[]{
        ...,
        _type == "link" => {
          ...,
          href
        }
      }
    },
    metaTitle,
    metaDescription,
    focusKeyword,
    secondaryKeywords,
    faqSchema,
    composerSections
  }
`;

async function main() {
  const slug = 'microsoft-copilot-studio-development-guide-for-enterprises';
  const post = await client.fetch(postBySlugQuery, { slug, preview: false });
  console.log('Result with preview=false:', post ? 'Found document ID ' + post._id : 'Not Found');
}

main().catch(console.error);
