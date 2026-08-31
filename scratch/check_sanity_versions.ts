import { createClient } from '@sanity/client';

const projectId = '1zmh4sfw';
const dataset = 'production';

// Use a token if available, but for public read or draft read we might need token or we can try without token first
const token = process.env.SANITY_API_READ_TOKEN;

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-02-01',
  useCdn: false,
  token,
});

async function main() {
  const docId = 'd2106d40-bfca-477d-86ac-f6563f4006a3';
  const query = `*[_id in [$publishedId, $draftId]] { _id, title, slug, _updatedAt }`;
  const result = await client.fetch(query, {
    publishedId: docId,
    draftId: `drafts.${docId}`,
  });
  console.log('Sanity documents found:', result);
}

main().catch(console.error);
