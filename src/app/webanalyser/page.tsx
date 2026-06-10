import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Growth Intelligence | AI-Powered Website Intelligence",
  description:
    "AI-powered website intelligence and growth analysis from Softree Technology.",
};

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
