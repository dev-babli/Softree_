import type { Metadata } from "next";
import { IndustryPage } from "../industry-ai/IndustryPage";

export const metadata: Metadata = {
  title: "AI for Logistics Solutions | Softree Technology",
  description:
    "Softree builds AI for logistics—route optimization, warehouse automation, demand forecasting, shipment tracking agents, and end-to-end supply chain visibility.",
};

export default function LogisticsPage() {
  return <IndustryPage slug="ai-for-logistics" />;
}
