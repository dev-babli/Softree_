import type { Metadata } from "next";
import { KoreAiComponent } from "@/components/superdesign/kore-ai-component";

export const metadata: Metadata = {
  title: "SuperDesign Component: kore.ai",
  description: "Native React/Tailwind implementation of the SuperDesign kore.ai page.",
};

export default function KoreAiComponentPage() {
  return <KoreAiComponent />;
}
