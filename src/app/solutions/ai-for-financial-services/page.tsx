import { applyPageOg } from "@/lib/site-metadata";
import type { Metadata } from "next";
import { IndustryPage } from "../industry-ai/IndustryPage";

export const metadata: Metadata = applyPageOg("/solutions/ai-for-financial-services", {
  title: "AI for Financial Services | Softree Technology",
  description:
    "Custom AI solutions for banking, insurance, and wealth management. Secure fraud detection, AML compliance, intelligent document processing, and AI advisory systems.",
  alternates: {
    canonical: "https://www.softreetechnology.com/solutions/ai-for-financial-services",
  },
  openGraph: {
    title: "AI for Financial Services | Softree Technology",
    description:
      "Custom AI solutions for banking, insurance, and wealth management. Secure fraud detection, AML compliance, intelligent document processing, and AI advisory systems.",
    url: "https://www.softreetechnology.com/solutions/ai-for-financial-services",
    siteName: "Softree Technology",
    type: "website",
  },
});

export default function FinancialServicesPage() {
  return <IndustryPage slug="ai-for-financial-services" />;
}
