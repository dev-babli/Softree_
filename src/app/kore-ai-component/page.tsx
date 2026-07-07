import type { Metadata } from "next"
import KoreAiExactPage from "@/components/kore-ai-exact/KoreAiExactPage"

export const metadata: Metadata = {
  title: "Softree Agentic AI | Build, govern & scale on Microsoft",
  description:
    "Design, deploy, and govern AI agents across Copilot Studio, Azure AI, and Power Platform — with offshore delivery speed and production-grade guardrails.",
}

export default function KoreAiComponentPage() {
  return <KoreAiExactPage />
}
