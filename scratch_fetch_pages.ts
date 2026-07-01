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
  const count = await client.fetch('count(*[_type == "caseStudy"])')
  console.log("\nTotal caseStudy documents in this dataset:", count)
}
run().catch(console.error)
