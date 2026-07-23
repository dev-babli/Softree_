import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../src/cms/api'

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

async function run() {
  console.log("Querying all composer posts...")
  const posts = await client.fetch('*[_type == "post" && displayMode == "composer"] { _id, title, "slug": slug.current, "sections": composerSections[] { _type, content, body } }')
  console.log("Found posts:")
  console.log(JSON.stringify(posts, null, 2))
}

run().catch(console.error)
