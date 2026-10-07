import { applyPageOg } from "@/lib/site-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = applyPageOg("/webanalyser", {
  title: "WebAnalyser | Website Performance & SEO Audit Platform",
  description:
    "Free comprehensive website audit tool for performance, technical SEO, accessibility, and Core Web Vitals analysis.",
  alternates: {
    canonical: "https://www.softreetechnology.com/webanalyser",
  },
  openGraph: {
    title: "WebAnalyser | Website Performance & SEO Audit Platform",
    description:
      "Free comprehensive website audit tool for performance, technical SEO, accessibility, and Core Web Vitals analysis.",
    url: "https://www.softreetechnology.com/webanalyser",
    siteName: "Softree Technology",
    type: "website",
  },
});

const ANALYZER_URL = "https://web-lead-magnet-seven.vercel.app";

export default function WebAnalyserPage() {
  return (
    <main className="fixed inset-0 z-50 h-[100dvh] w-full overflow-hidden bg-[#0a0a0a]">
      <iframe
        src={ANALYZER_URL}
        title="AI Growth Intelligence | AI-Powered Website Intelligence"
        className="h-full w-full border-0"
        allow="clipboard-write"
      />
    </main>
  );
}
