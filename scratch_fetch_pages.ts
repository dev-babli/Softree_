import { client } from "./src/sanity/lib/client"

async function run() {
  const pages = await client.fetch('*[_type == "marketingPage"]{ title, "slug": slug.current, status }')
  console.log(JSON.stringify(pages, null, 2))
}

run().catch(console.error)
