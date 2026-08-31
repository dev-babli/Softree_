const { createClient } = require("@sanity/client")

const client = createClient({
  projectId: "1zmh4sfw",
  dataset: "production",
  apiVersion: "2026-05-21",
  useCdn: false
})

const slugs = [
  "barcode-scanner-app-audio-equipment-management"
]

async function run() {
  const query = `*[_type == "caseStudy" && slug.current in $slugs]`
  
  const results = await client.fetch(query, { slugs })
  console.log("RESULTS:")
  console.log(JSON.stringify(results, null, 2))
}

run().catch(console.error)
