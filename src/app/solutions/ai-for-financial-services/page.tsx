import type { Metadata } from "next";
import { IndustryPage } from "../industry-ai/IndustryPage";

export const metadata: Metadata = {
  title: "AI for Financial Services Solutions | Softree Technology",
  description:
    "Softree builds AI for financial services—fraud detection, KYC automation, compliance knowledge assistants, customer service agents, and governed model risk workflows.",
};

export default function FinancialServicesPage() {
  return <IndustryPage slug="ai-for-financial-services" />;
}
