import type { Metadata } from "next"
import KoreAiExactPage from "@/components/kore-ai-exact/KoreAiExactPage"

export const metadata: Metadata = {
  title: "Kore.ai Artemis | AI Agent Platform: Build, govern & scale enterprise AI",
  description:
    "The AI-programmable platform for the agentic enterprise. Build, govern, and scale enterprise AI agents with Kore.ai Artemis.",
}

export default function KoreAiComponentPage() {
  return <KoreAiExactPage />
}
