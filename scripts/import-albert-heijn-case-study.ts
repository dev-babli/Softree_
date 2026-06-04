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

const DOC_ID = "caseStudy-albert-heijn"
const COVER_IMAGE_URL =
  "https://cdn.prod.website-files.com/68e69c204ba0666edacc94b1/69838670265fbb8fee358af8_Logo_Rectangle_AlbertHeijn.png"
const PDF_URL = "https://info.rasa.com/hubfs/2026_Case_Studies/Rasa_AlbertHeijn_customerstory.pdf"

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
    asset: { _type: "reference" as const, _ref: uploaded._id },
    alt,
  }
}

function buildBody() {
  return [
    h3(
      "How the Netherlands' largest supermarket chain uses Rasa to automate customer service at national scale while improving satisfaction"
    ),
    p(
      "Albert Heijn is the Netherlands' largest grocery retailer and a flagship brand of Ahold Delhaize. Founded in 1887, the company operates approximately 1,200 stores across the Netherlands and Belgium and serves more than 1.2 billion customer visits each year. As digital shopping and service expectations accelerated, Albert Heijn needed a conversational agent that could handle complex Dutch-language requests securely, integrate with existing systems, and reduce pressure on human support teams without compromising customer experience."
    ),
    h2("Key Takeaways"),
    bullet(
      "50% contact reduction: ",
      "Albert Heijn's Rasa-powered agent prevents half of customer service contacts from reaching human agents while maintaining service quality."
    ),
    bullet(
      "Higher satisfaction: ",
      "After migrating to Rasa CALM, customer satisfaction increased by 0.5 points on a 5-point scale."
    ),
    bullet(
      "Operational efficiency: ",
      "New conversation flows now require 2–3 story points to build, down from 5 previously, enabling faster iteration."
    ),
    h2("The Challenge"),
    p(
      "Albert Heijn set out to improve customer satisfaction while reducing pressure on human support teams. The company needed a digital agent that could handle complex customer requests in Dutch, operate securely at scale, and integrate seamlessly into existing systems without compromising control over data or operations."
    ),
    h3("Rising Service Volume Across Channels"),
    p(
      "Customers increasingly expected fast answers across web, mobile app, and messaging channels. Routine questions about orders, refunds, loyalty programs, and store services consumed agent time that could be spent on higher-value interactions."
    ),
    p("The support organization faced familiar constraints:"),
    block("normal", [span("High volumes of repetitive FAQs tied up human agents.")], { listItem: "bullet", level: 1 }),
    block("normal", [span("Complex journeys required multiple turns and backend lookups.")], { listItem: "bullet", level: 1 }),
    block("normal", [span("Legacy tooling made it difficult to evolve flows quickly.")], { listItem: "bullet", level: 1 }),
    h3("Need for Control and Integration"),
    p(
      "Albert Heijn required a platform that could connect to Tracebuzz, Salesforce, and internal order systems while keeping business logic under the team's control. Answers needed to go beyond static links — for example, retrieving refund status and delivery context before responding to payment questions."
    ),
    h2("The Solution"),
    p(
      "Albert Heijn began working with Rasa in 2019. The initial deployment focused on customer service with 20–25 structured conversation flows covering the most common questions, immediately reducing contact volume by resolving a meaningful share of inquiries without human involvement."
    ),
    h3("Migrating to Rasa CALM"),
    p(
      "After moving to Rasa CALM, Albert Heijn enabled more flexible and reliable handling of complex, multi-turn customer interactions. The team could design flows with greater visibility, iterate faster, and support richer journeys across Dutch-language service scenarios."
    ),
    h3("Agent Design and Escalation"),
    p("The digital assistant acts as a first line of support alongside human agents:"),
    block("normal", [span("It recognizes customer intent from real conversation data and varied phrasing.")], { listItem: "bullet", level: 1 }),
    block("normal", [span("It resolves routine cases autonomously across web, mobile, and WhatsApp.")], { listItem: "bullet", level: 1 }),
    block("normal", [span("It collects context before escalating complex cases so agents can resolve issues faster.")], { listItem: "bullet", level: 1 }),
    block("normal", [span("It integrates with backend systems to deliver personalized answers instead of generic links.")], { listItem: "bullet", level: 1 }),
    quote(
      "We want our employees to spend more time helping customers and less time on FAQs and administrative tasks. When a request is more complex, the assistant collects the relevant information so we can resolve it faster."
    ),
    h2("The Results"),
    p(
      "Today, Albert Heijn's Rasa-powered agent achieves a 50% prevented contact rate and a 42% quality score across operations in the Netherlands and Belgium, delivering substantial operational cost savings."
    ),
    p(
      "Customer satisfaction increased 0.5 points on a 5-point scale after the CALM migration. The assistant now handles routine inquiries independently while preserving smooth handoffs to human agents when needed."
    ),
    p(
      "Behind the scenes, the team reduced the effort required to launch new user stories from five story points to two or three — making continuous improvement sustainable at national scale."
    ),
    h2("The Future"),
    p(
      "Albert Heijn continues expanding the assistant's coverage across service journeys and channels, using Rasa to automate more complex retail workflows while keeping humans focused on the personal interactions that matter most."
    ),
  ]
}

async function run() {
  console.log("Uploading Albert Heijn case study cover image…")
  const coverImage = await uploadImage(
    COVER_IMAGE_URL,
    "albert-heijn-case-study.png",
    "Albert Heijn case study cover"
  )

  const doc = {
    _id: DOC_ID,
    _type: "caseStudy",
    title: "Albert Heijn Reduces 50% of Customer Service Contacts with a Rasa Agent",
    slug: { _type: "slug", current: "albert-heijn" },
    excerpt:
      "Albert Heijn used a Rasa-powered AI agent to automate routine grocery service journeys — reducing service contacts by 50% while improving customer satisfaction at national scale.",
    status: "published",
    category: "ai",
    industry: "Retail",
    client: "Albert Heijn",
    location: "Zaandam, The Netherlands",
    employees: "40,000+",
    scaleOfOperation: "1,200+ stores across the Netherlands and Belgium serving 1.2B+ annual customer visits",
    heroHeadline: "Cut customer service contacts in half.",
    heroEyebrow: "Customer Story — Retail",
    mainImage: coverImage,
    mainImageUrl: COVER_IMAGE_URL,
    accentColor: "#1852FF",
    featured: true,
    technologies: ["Rasa", "Rasa CALM", "Conversational AI", "NLU"],
    publishedAt: new Date().toISOString(),
    metrics: [
      { _key: key(), label: "service contacts reduced", value: "50%" },
      { _key: key(), label: "quality score", value: "42%" },
      { _key: key(), label: "annual customer visits", value: "1.2B+" },
    ],
    testimonial: {
      quote:
        "We want our employees to spend more time helping customers and less time on FAQs and administrative tasks.",
      name: "Albert Heijn Service Team",
      role: "Customer Service & Digital AI",
    },
    pdfUrl: PDF_URL,
    body: buildBody(),
    metaTitle: "Albert Heijn Reduces 50% of Customer Service Contacts | Customer Story",
    metaDescription:
      "How Albert Heijn used Rasa CALM to reduce customer service contacts by 50%, improve satisfaction, and automate complex Dutch-language service journeys at national scale.",
  }

  const result = await client.createOrReplace(doc)
  console.log(`✅ Albert Heijn case study published: ${result._id}`)
  console.log(`   View at /case-studies/albert-heijn`)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
