import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import type { Metadata } from "next";
import { applyPageOg } from "@/lib/site-metadata";

import LightContactSection from "./components/LightContactSection";
import { AdvancedHero } from "./components/AdvancedHero";
import TrustedBrandsMarquee from "../offshore-power-platform-development/trust";
import SuccessStories from "./components/SuccessStories/SuccessStories";
import { SolutionMapper } from "./components/SolutionMapper";
import { InteractiveStepper } from "./components/InteractiveStepper";
import IndustriesShowcase from "./components/IndustriesShowcase";
import { HowAIHelps } from "./components/HowAIHelps";
import CaseStudiesSection from "./components/CaseStudiesSection";
import LightFAQExact from "./components/LightFAQExact";
import TestimonialsSplitSlider from "@/app/services/offshore-power-platform-development/testimonial";
import EnterpriseAICapabilities from "./components/enterprise-ai-capabilites";

export const metadata: Metadata = applyPageOg("/services/enterprise-ai-solution", {
  title: "Enterprise AI Solutions & Strategy Services | Softree Technology",
  description:
    "Deploy secure, scalable, and governed Enterprise AI Solutions. We specialize in AI strategy, custom agentic systems, RAG, and business process automation to deliver measurable ROI.",
  keywords: [
    "Enterprise AI solutions",
    "Enterprise AI strategy",
    "AI strategy and consulting",
    "autonomous AI agents",
    "intelligent workflows",
    "generative AI integration",
    "business process automation",
    "Azure AI solutions",
    "AI platform architecture",
  ],
  openGraph: {
    title: "Enterprise AI Solutions & Strategy Services | Softree Technology",
    description:
      "Accelerate time-to-value with secure, scalable, and governed Enterprise AI Solutions tailored for business outcomes.",
    url: "https://www.softreetechnology.com/services/enterprise-ai-solution",
    siteName: "Softree Technology",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise AI Solutions & Strategy",
    description:
      "Transform business operations with secure, scalable, and responsible enterprise AI.",
  },
  alternates: {
    canonical:
      "https://www.softreetechnology.com/services/enterprise-ai-solution",
  },
}, "Softree Technology");

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
            <NavigationClient />
            <main className="flex-1">
                <AdvancedHero />
                <TrustedBrandsMarquee/>
                <SuccessStories />
                <EnterpriseAICapabilities />
                <SolutionMapper />
                <HowAIHelps />
                <IndustriesShowcase />
                <InteractiveStepper />
                <CaseStudiesSection />
                <TestimonialsSplitSlider />
            </main>
            <LightFAQExact />
            <LightContactSection />
            <Footer />
        </div>
    );
}