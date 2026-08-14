import type { Metadata } from "next";
import { IndustryPage } from "../industry-ai/IndustryPage";

export const metadata: Metadata = {
  title: "AI for Healthcare Solutions | Softree Technology",
  description:
    "Softree builds AI for healthcare—HIPAA-aware clinical documentation, patient scheduling, medical imaging assist, secure clinical knowledge search, and governed care-team workflows.",
};

export default function HealthcarePage() {
  return <IndustryPage slug="ai-for-healthcare" />;
}
