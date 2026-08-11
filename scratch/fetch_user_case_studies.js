const { createClient } = require("@sanity/client")

const client = createClient({
  projectId: "1zmh4sfw",
  dataset: "production",
  apiVersion: "2026-05-21",
  useCdn: false
})

const slugs = [
  "ai-competitive-gap-report-businesses-outperform-competitors",
  "how-an-enterprise-organization-automated-hr-operations-using-ai",
  "barcode-scanner-app-audio-equipment-management",
  "hr-analytics-and-employee-experience-platform",
  "sharepoint-site-pages-to-pdf"
]

async function run() {
  const query = `*[_type == "caseStudy" && slug.current in $slugs] {
    "slug": slug.current,
    title,
    client,
    industry,
    category,
    useCase,
    excerpt,
    challenge,
    solution,
    impact,
    "keyResults": keyResults[] { value, label, description },
    metrics
  }`
  
  const results = await client.fetch(query, { slugs })
  console.log("RESULTS:")
  console.log(JSON.stringify(results, null, 2))
}

run().catch(console.error)
