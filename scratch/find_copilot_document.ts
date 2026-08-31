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
  const query = `*[metaTitle match "*Microsoft Copilot Studio Guide*" || title match "*Microsoft Copilot Studio Guide*"] {
    _id,
    _type,
    title,
    metaTitle,
    slug
  }`;
  const results = await client.fetch(query);
  console.log('Query Results:', JSON.stringify(results, null, 2));
}

main().catch(console.error);
