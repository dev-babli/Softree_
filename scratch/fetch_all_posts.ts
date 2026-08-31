import { createClient } from '@sanity/client';

const projectId = '1zmh4sfw';
const dataset = 'production';

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-02-01',
  useCdn: false,
});

async function main() {
  const query = `*[_type == "post"] | order(coalesce(publishedAt, _createdAt) desc) {
    _id,
    title,
    slug,
    publishedAt,
    _updatedAt
  }`;
  const posts = await client.fetch(query);
  console.log('Sanity Posts:', JSON.stringify(posts, null, 2));
}

main().catch(console.error);
