import { projectId, dataset, apiVersion } from "./src/sanity/env"
import { client } from "./src/sanity/lib/client"

console.log("Sanity config from env.ts:")
console.log("projectId:", projectId)
console.log("dataset:", dataset)
console.log("apiVersion:", apiVersion)

console.log("\nProcess Env:")
console.log("NEXT_PUBLIC_SANITY_PROJECT_ID:", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
console.log("NEXT_PUBLIC_SANITY_DATASET:", process.env.NEXT_PUBLIC_SANITY_DATASET)
console.log("SANITY_API_READ_TOKEN exists:", !!process.env.SANITY_API_READ_TOKEN)

async function run() {
  const caseStudy = await client.fetch('*[_type == "caseStudy" && slug.current == "digital-learning-management-platform"][0]{ title, "slug": slug.current, detailLayout }')
  console.log("\nTarget Case Study in Sanity:")
  console.log(JSON.stringify(caseStudy, null, 2))
}
run().catch(console.error)
