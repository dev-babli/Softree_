import { applyPageOg } from "@/lib/site-metadata";
import type { Metadata } from "next";
import { IndustryPage } from "../industry-ai/IndustryPage";

export const metadata: Metadata = applyPageOg("/solutions/ai-for-logistics", {
  title: "AI for Logistics & Supply Chain Solutions | Softree Technology",
  description:
    "AI-powered route optimization, demand forecasting, predictive maintenance, and autonomous warehouse operations for global logistics leaders.",
  alternates: {
    canonical: "https://www.softreetechnology.com/solutions/ai-for-logistics",
  },
  openGraph: {
    title: "AI for Logistics & Supply Chain Solutions | Softree Technology",
    description:
      "AI-powered route optimization, demand forecasting, predictive maintenance, and autonomous warehouse operations for global logistics leaders.",
    url: "https://www.softreetechnology.com/solutions/ai-for-logistics",
    siteName: "Softree Technology",
    type: "website",
  },
});

export default function LogisticsPage() {
  return <IndustryPage slug="ai-for-logistics" />;
}
