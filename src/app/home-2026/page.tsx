import type { Metadata } from "next";
import dynamic from "next/dynamic";

import HomeShell from "@/components/home-2026/HomeShell";
import Hero2026 from "@/components/home-2026/Hero2026";
import SignalStrip from "@/components/home-2026/SignalStrip";
import Manifesto from "@/components/home-2026/Manifesto";
import CapabilityIndex from "@/components/home-2026/CapabilityIndex";
import EngagementModels from "@/components/home-2026/EngagementModels";
import GlobalDelivery from "@/components/home-2026/GlobalDelivery";
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";

/**
 * home-2026 — awwwards-track homepage rebuild (PREVIEW route; "/" untouched).
 * Composition is a SERVER component: Manifesto, GlobalDelivery and
 * EngagementModels stay server-rendered (brief §8); client sections are
 * leaves. Heavy below-fold client sections are lazy with color-matched dark
 * skeletons (LEARNINGS L-1); the ProofChapter placeholder reserves the full
 * pin-spacer height on desktop (lg:min-h-[400vh], brief §8 build rule 1).
 */
const ProofChapter = dynamic(() => import("@/components/home-2026/ProofChapter"), {
  loading: () => <div className="min-h-screen bg-[#050505] lg:min-h-[400vh]" aria-hidden />,
});
const AISpotlight = dynamic(() => import("@/components/home-2026/AISpotlight"), {
  loading: () => <div className="min-h-[640px] bg-[#0a0a0a]" aria-hidden />,
});
const FinalCTA = dynamic(() => import("@/components/home-2026/FinalCTA"), {
  loading: () => <div className="min-h-screen bg-[#050505]" aria-hidden />,
});

export const metadata: Metadata = {
  title: "Softree Technology — Offshore Teams That Ship Real AI",
  description:
    "Senior offshore engineering pods in 2 weeks, with applied-AI products like Avoora as proof. Offshore engineering, honestly.",
  alternates: { canonical: "https://softreetechnology.com/home-2026" },
  robots: { index: false, follow: false }, // preview route — do not index until it replaces "/"
  openGraph: {
    title: "Softree Technology — Offshore Teams That Ship Real AI",
    description:
      "Senior offshore engineering pods in 2 weeks, with applied-AI products like Avoora as proof.",
    images: ["/og/pages/home.png"],
  },
};

export default function Home2026Page() {
  return (
    <HomeShell>
      <NavigationClient />
      <main>
        <Hero2026 />
        <SignalStrip />
        <Manifesto />
        <CapabilityIndex />
        <ProofChapter />
        <AISpotlight />
        <GlobalDelivery />
        <EngagementModels />
        <FinalCTA />
      </main>
      <Footer />
    </HomeShell>
  );
}
