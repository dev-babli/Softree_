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
  const documentId = 'a4e9a51f-cc53-401c-a8ef-0847ef19d598';
  const result = await client.getDocument(documentId);
  console.log('Full Document Details:', JSON.stringify(result, null, 2));
}

main().catch(console.error);
