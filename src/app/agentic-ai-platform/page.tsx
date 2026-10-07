import type { Metadata } from "next"
import SoftreeAgenticPage from "@/components/softree-agentic-exact/SoftreeAgenticPage"
import { applyPageOg } from "@/lib/site-metadata"

export const metadata: Metadata = applyPageOg("/agentic-ai-platform", {
  title: "Softree Agentic AI | Build, Govern & Scale Enterprise Agents",
  description:
    "Design, deploy, and govern AI agents across Copilot Studio, Azure AI, and Power Platform — with offshore delivery speed and production-grade guardrails.",
  alternates: {
    canonical: "https://www.softreetechnology.com/agentic-ai-platform",
  },
  openGraph: {
    title: "Softree Agentic AI Platform",
    description:
      "Design, deploy, and govern AI agents across Copilot Studio, Azure AI, and Power Platform with enterprise governance.",
    url: "https://www.softreetechnology.com/agentic-ai-platform",
    siteName: "Softree Technology",
    type: "website",
  },
})

export default function SoftreeAgenticComponentPage() {
  return <SoftreeAgenticPage />
}
