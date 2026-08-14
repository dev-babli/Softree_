import type { Metadata } from "next";
import { IndustryPage } from "../industry-ai/IndustryPage";

export const metadata: Metadata = {
  title: "AI for Manufacturing Solutions | Softree Technology",
  description:
    "Softree builds AI for manufacturing—predictive maintenance, computer vision quality inspection, supply chain planning, SOP assistants, and governed OT workflows for the plant floor.",
};

export default function ManufacturingPage() {
  return <IndustryPage slug="ai-for-manufacturing" />;
}
