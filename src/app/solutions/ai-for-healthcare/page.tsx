import { applyPageOg } from "@/lib/site-metadata";
import type { Metadata } from "next";
import { IndustryPage } from "../industry-ai/IndustryPage";

export const metadata: Metadata = applyPageOg("/solutions/ai-for-healthcare", {
  title: "AI for Healthcare Solutions | Softree Technology",
  description:
    "Softree builds AI for healthcare—HIPAA-aware clinical documentation, patient scheduling, medical imaging assist, secure clinical knowledge search, and governed care-team workflows.",
  alternates: {
    canonical: "https://www.softreetechnology.com/solutions/ai-for-healthcare",
  },
  openGraph: {
    title: "AI for Healthcare Solutions | Softree Technology",
    description:
      "Softree builds AI for healthcare—HIPAA-aware clinical documentation, patient scheduling, medical imaging assist, secure clinical knowledge search, and governed care-team workflows.",
    url: "https://www.softreetechnology.com/solutions/ai-for-healthcare",
    siteName: "Softree Technology",
    type: "website",
  },
});

export default function HealthcarePage() {
  return <IndustryPage slug="ai-for-healthcare" />;
}
