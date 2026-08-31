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
  const query = `*[_type == "post" && _id in ["9bf08a29-3cd2-47af-b70a-c3f28a4e9abe", "a910f1fd-a65a-4cc5-82ec-4af5625089ba", "a88914d8-8be2-42fa-9cf1-89eb08bdac56", "d2106d40-bfca-477d-86ac-f6563f4006a3"]] {
    _id,
    title,
    slug,
    publishedAt,
    visibility,
    status
  }`;
  const posts = await client.fetch(query);
  console.log('Post details:', JSON.stringify(posts, null, 2));
}

main().catch(console.error);
