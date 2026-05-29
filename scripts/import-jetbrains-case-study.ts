#!/usr/bin/env tsx
import { createClient } from "@sanity/client"
import { loadEnvConfig } from "@next/env"
import { get } from "https"

loadEnvConfig(process.cwd())

const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN
if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN")
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "1zmh4sfw",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-21",
  token,
  useCdn: false,
})

const DOC_ID = "caseStudy-jetbrains"
const COVER_IMAGE_URL =
  "https://cdn.prod.website-files.com/68e69c204ba0666edacc94b1/6a028f0d8623f5b80fadbefc_jetbrains-cs-share-image.png"
const QUOTE_IMAGE_URL =
  "https://cdn.prod.website-files.com/68e69c204ba0666edacc94b1/6a03591e779c8ea3dbc76062_Jetbrains_Quote_1.png"
const PDF_URL =
  "https://6711345.fs1.hubspotusercontent-na1.net/hubfs/6711345/2026_CaseStudies/Rasa-JetBrains-CustomerStory.pdf"

function key() {
  return Math.random().toString(36).slice(2, 12)
}

type Span = { _type: "span"; _key: string; text: string; marks: string[] }
type Block = {
  _type: "block"
  _key: string
  style: string
  children: Span[]
  markDefs?: unknown[]
  listItem?: "bullet" | "number"
  level?: number
}

function span(text: string, marks: string[] = []): Span {
  return { _type: "span", _key: key(), text, marks }
}

function block(
  style: string,
  children: Span[],
  options?: { listItem?: "bullet" | "number"; level?: number }
): Block {
  return {
    _type: "block",
    _key: key(),
    style,
    children,
    markDefs: [],
    ...options,
  }
}

function p(text: string): Block {
  return block("normal", [span(text)])
}

function h2(text: string): Block {
  return block("h2", [span(text)])
}

function h3(text: string): Block {
  return block("h3", [span(text)])
}

function quote(text: string): Block {
  return block("blockquote", [span(text)])
}

function bullet(lead: string, rest: string): Block {
  return block("normal", [span(lead, ["strong"]), span(rest)], { listItem: "bullet", level: 1 })
}

function downloadBuffer(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        const next = res.headers.location
        if (!next) {
          reject(new Error(`Redirect without location: ${url}`))
          return
        }
        downloadBuffer(next).then(resolve).catch(reject)
        return
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to fetch (${res.statusCode}): ${url}`))
        return
      }
      const chunks: Buffer[] = []
      res.on("data", (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)))
      res.on("end", () => resolve(Buffer.concat(chunks)))
      res.on("error", reject)
    }).on("error", reject)
  })
}

async function uploadImage(url: string, filename: string, alt: string) {
  const buffer = await downloadBuffer(url)
  const uploaded = await client.assets.upload("image", buffer, { filename })
  return {
    _type: "image" as const,
    _key: key(),
    asset: { _type: "reference" as const, _ref: uploaded._id },
    alt,
  }
}

function buildBody(quoteImageRef: string) {
  return [
    h3(
      "How a global leader in intelligent software development tools uses Rasa to unify a fragmented support ecosystem and give millions of developers a faster path to answers"
    ),
    p(
      "JetBrains creates intelligent software development tools trusted by over 15 million users and 92 Fortune Global Top 100 companies. Headquartered in Amsterdam, the company operates as a key enabler of technology, supporting the developers who build the industry-shaping products of the future. Its lineup of 30+ products includes award-winning IDEs like IntelliJ IDEA, the AI coding agent Junie, and Mellum — JetBrains' focal LLM purpose-built for code-related tasks. These milestones, alongside team tools like YouTrack and the multiplatform language Kotlin, exemplify a commitment to reducing development friction by natively embedding emerging technologies into professional workflows."
    ),
    h2("Key Takeaways"),
    bullet("Centralized entry point: ", "Rasa is powering the vision for a single AI-driven support agent that routes customers to the right JetBrains team instantly, replacing a fragmented web of 100+ separate contact forms."),
    bullet("High customer satisfaction: ", "JetBrains is sustaining a CSAT score of 75–80% with their Rasa-powered agent, which is approaching parity with their human support team."),
    bullet("Scalable without compromise: ", "JetBrains' Rasa-powered agent deflects a rapidly scaling volume of routine inquiries so humans can focus on the complex, highly technical cases they're best equipped for."),
    block("normal", [span("On-premise control: ", ["strong"]), span("Rasa's self-hosted deployment model gave JetBrains full control over sensitive customer data, eliminating legal and compliance delays and enabling a faster launch.")]),
    h2("The Challenge"),
    p(
      "JetBrains customers are developers with highly technical support needs that require precise answers. Building a specialized support operation capable of meeting their expectations across a portfolio of 20+ products was itself a considerable undertaking. Doing it at scale for millions of users made it even harder."
    ),
    h3("A Support Model Built for Quality, Not Scale"),
    p(
      "For most of JetBrains' history, their support model was built around depth, not throughput. Each ticket received careful attention from technically skilled agents, many of whom specialized in specific areas of the IntelliJ platform."
    ),
    p(
      "The result was consistently high satisfaction. But, as JetBrains' customer base grew, the cracks in the model became harder to ignore:"
    ),
    block("normal", [span("Resolution times stretched.")], { listItem: "bullet", level: 1 }),
    block("normal", [span("Tickets required multiple back-and-forth exchanges to gather enough context for a resolution.")], { listItem: "bullet", level: 1 }),
    block("normal", [span("Agents found themselves repeatedly answering the same known issues.")], { listItem: "bullet", level: 1 }),
    p(
      "It was a quality-first model straining under the weight of volume, and it was occupying human expertise that could be better directed at genuinely novel problems."
    ),
    {
      _type: "image",
      _key: key(),
      asset: { _type: "reference", _ref: quoteImageRef },
      alt: "JetBrains customer quote",
    },
    h3("A Fragmented Entry Point Experience"),
    p(
      "The scalability problem was compounded by a structural one. Over time, JetBrains had accumulated more than 100 separate contact forms and support entry points scattered across their website and products. Customers who wanted to get help had to first figure out where to submit their inquiry."
    ),
    quote(
      '"It shouldn\'t be difficult for customers to figure out how to reach JetBrains," Letic noted. "We wanted to give customers one entry point to make their support experience as easy as possible."'
    ),
    p(
      "This fragmentation also made it difficult to operate efficiently. Running analytics across disconnected intake channels was unwieldy. And identifying patterns in customer issues — the kind of insights that drive meaningful product and support improvements — required piecing together data from too many places."
    ),
    h2("The Solution"),
    p(
      "JetBrains evaluated several vendors before selecting Rasa. Two requirements ultimately drove their decision: on-premise deployment capability and a platform that could serve as the foundation for a long-term, evolving support operation."
    ),
    h3("On-Premise Deployment: A Non-Negotiable"),
    p(
      'As a company that handles sensitive customer data at scale, routing that data through a third-party cloud wasn\'t an option for JetBrains. Rasa\'s ability to run fully self-hosted on JetBrains\' own infrastructure was, in Letic\'s words, "one of the main reasons" they chose it. The fact that it would be on-prem also removed the need to negotiate data processing agreements and push through lengthy legal reviews, which let JetBrains move from evaluation to launch faster than a cloud-only alternative would have allowed.'
    ),
    h3("Building the Agent"),
    p(
      "The JetBrains team used Rasa Studio to design and develop conversation flows, giving team leads visibility into the agent's logic without requiring deep engineering involvement at every step."
    ),
    p("The agent they built does several things well:"),
    block("normal", [span("It recognizes customer intent across the full breadth of JetBrains' product catalog.")], { listItem: "bullet", level: 1 }),
    block("normal", [span("It determines whether a question can be resolved immediately or needs escalation.")], { listItem: "bullet", level: 1 }),
    block("normal", [span("When it can answer, it generates a response grounded in JetBrains' internal knowledge base, structured through their KCS (Knowledge-Centered Service) framework.")], { listItem: "bullet", level: 1 }),
    block("normal", [span("When it can't, it escalates to the appropriate human team with full context already captured, so customers don't have to explain their issue again.")], { listItem: "bullet", level: 1 }),
    p(
      "JetBrains also implemented pre- and post-processing checks to validate that an incoming question is complete before generating a response and to verify that the response itself meets quality standards before it reaches the customer."
    ),
    quote(
      '"We wanted something that\'s not just a deflection tool," Letic said. "Rasa allowed us to build an advanced chatbot that can understand complex customer needs and problems."'
    ),
    h2("The Results"),
    p(
      "JetBrains' Rasa-powered agent is now live across the key entry points of their support ecosystem, processing roughly 3,000 conversations per month and sustaining a CSAT score of 75–80% — numbers that put the agent on par with their human support team in terms of customer satisfaction."
    ),
    p(
      "Customer feedback suggests users are happy when they get answers instantly, and they appreciate that, when escalation happens, it's a smooth experience. Many conversations end with a simple \"thank you\" and no further action — a signal that the agent is resolving their issues."
    ),
    p(
      "The centralized entry point is also delivering on its operational promise. Instead of tracking outcomes across fragmented channels, JetBrains now has a single system where patterns are visible, analytics are actionable, and improvements can be measured clearly."
    ),
    h2("The Future"),
    p(
      "JetBrains is actively expanding the agent's coverage to additional entry points across their web presence. They're also developing more sophisticated use cases in sales-sensitive areas like license management and account matters. Longer term, they expect their Rasa agent will handle the majority of JetBrains' support conversation volume."
    ),
  ]
}

async function run() {
  console.log("Uploading JetBrains case study images…")
  const [coverImage, quoteImage] = await Promise.all([
    uploadImage(COVER_IMAGE_URL, "jetbrains-cs-share-image.png", "JetBrains case study cover"),
    uploadImage(QUOTE_IMAGE_URL, "jetbrains-quote.png", "JetBrains customer quote"),
  ])

  const doc = {
    _id: DOC_ID,
    _type: "caseStudy",
    title: "JetBrains Centralizes Developer Support at Scale With Rasa",
    slug: { _type: "slug", current: "jetbrains" },
    excerpt:
      "How JetBrains replaced 100+ fragmented support forms with a single Rasa-powered AI agent and achieved 75–80% CSAT across a customer base of millions.",
    status: "published",
    category: "ai",
    industry: "Software",
    client: "JetBrains",
    location: "Amsterdam, The Netherlands",
    employees: "2,800",
    scaleOfOperation:
      "Used by over 12.8 million professionals and 92 of the Fortune Global Top 100",
    mainImage: coverImage,
    mainImageUrl: COVER_IMAGE_URL,
    accentColor: "#1852FF",
    featured: true,
    technologies: ["Rasa", "Rasa Studio", "AI Agents", "Conversational AI"],
    publishedAt: new Date().toISOString(),
    metrics: [
      { _key: key(), label: "CSAT", value: "75–80%" },
      { _key: key(), label: "products supported", value: "100%" },
      { _key: key(), label: "deflection rate", value: "80%" },
    ],
    testimonial: {
      quote:
        "It shouldn't be difficult for customers to figure out how to reach JetBrains. We wanted to give customers one entry point to make their support experience as easy as possible.",
      name: "Letic",
      role: "JetBrains Support Leadership",
    },
    pdfUrl: PDF_URL,
    body: buildBody(quoteImage.asset._ref),
    metaTitle: "JetBrains Centralizes Developer Support at Scale | Customer Story",
    metaDescription:
      "How JetBrains replaced 100+ fragmented support forms with a single Rasa-powered AI agent — and achieved 75–80% CSAT across a customer base of millions.",
  }

  const result = await client.createOrReplace(doc)
  console.log(`✅ JetBrains case study published: ${result._id}`)
  console.log(`   View at /case-studies/jetbrains`)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
