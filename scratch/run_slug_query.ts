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
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    _type,
    _updatedAt,
    title
  }
`;

async function main() {
  const slug = 'microsoft-copilot-studio-development-guide-for-enterprises';
  const response: any = await client.fetch(postBySlugQuery, { slug }, { filterResponse: false });
  console.log('Result:', JSON.stringify(response.result, null, 2));
  console.log('Sync Tags:', response.syncTags);
}

main().catch(console.error);
