import { applyPageOg } from "@/lib/site-metadata";
import type { Metadata } from "next";
import { IndustryPage } from "../industry-ai/IndustryPage";

export const metadata: Metadata = applyPageOg("/solutions/ai-for-manufacturing", {
  title: "AI for Manufacturing Solutions | Softree Technology",
  description:
    "Industrial AI solutions for predictive maintenance, computer vision quality inspection, production optimization, and supply chain intelligence.",
  alternates: {
    canonical: "https://www.softreetechnology.com/solutions/ai-for-manufacturing",
  },
  openGraph: {
    title: "AI for Manufacturing Solutions | Softree Technology",
    description:
      "Industrial AI solutions for predictive maintenance, computer vision quality inspection, production optimization, and supply chain intelligence.",
    url: "https://www.softreetechnology.com/solutions/ai-for-manufacturing",
    siteName: "Softree Technology",
    type: "website",
  },
});

export default function ManufacturingPage() {
  return <IndustryPage slug="ai-for-manufacturing" />;
}
