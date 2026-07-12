import type { Metadata } from "next"
import AiHomeExactPage from "@/components/ai-home-exact/AiHomeExactPage"
import { applyPageOg } from "@/lib/site-metadata"

const PAGE_PATH = "/ai-home"

export const metadata: Metadata = applyPageOg(PAGE_PATH, {
  title: "Agentic AI for the Enterprise | Softree Technology",
  description:
    "Build and deploy AI agents for customer and employee experiences on Microsoft — Copilot Studio, Azure AI, and Power Platform with offshore delivery speed and production-grade guardrails.",
  keywords: [
    "Softree agentic AI",
    "enterprise AI agents",
    "Microsoft AI platform",
    "Copilot Studio development",
    "offshore AI delivery",
  ],
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: "Agentic AI for the Enterprise | Softree Technology",
    description:
      "AI agents for work, service, and process — designed, deployed, and governed on Microsoft with Softree.",
    url: PAGE_PATH,
    siteName: "Softree Technology",
    type: "website",
  },
})

export default function AiHomeRoute() {
  return <AiHomeExactPage />
}
