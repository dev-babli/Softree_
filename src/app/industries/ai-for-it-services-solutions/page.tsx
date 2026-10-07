import type { Metadata } from "next";
import { applyPageOg } from "@/lib/site-metadata";
import React from 'react';
import Hero from './components/Hero/Hero';
import NavigationClient from '@/components/sections/navigation-client';
import WhyChoose from "./components/WhyChoose/WhyChoose";
import CaseStudy from "./components/CaseStudy/CaseStudy";
import Industry from "./components/Industry/Industry";
import AIEngineering from "./components/AIEngineering/AIEngineering";
import AIDevelopmentServices from "./components/AIForITDevlopmentServices/AIDevelopmentServices";

export const metadata: Metadata = applyPageOg("/industries/ai-for-it-services-solutions", {
  title: "AI Solutions for IT Services & MSPs | Softree Technology",
  description:
    "Accelerate IT service delivery, automated ticket triage, code generation assistance, and infrastructure anomaly detection with custom AI.",
  alternates: {
    canonical: "https://www.softreetechnology.com/industries/ai-for-it-services-solutions",
  },
  openGraph: {
    title: "AI Solutions for IT Services & MSPs | Softree Technology",
    description:
      "Accelerate IT service delivery, automated ticket triage, code generation assistance, and infrastructure anomaly detection with custom AI.",
    url: "https://www.softreetechnology.com/industries/ai-for-it-services-solutions",
    siteName: "Softree Technology",
    type: "website",
  },
});

export default function AiItDevelopmentServicesPage() {
  return (
    <main className="flex min-h-screen flex-col w-full overflow-hidden">
      <NavigationClient />
      <Hero />
      <CaseStudy />
      <WhyChoose />
      <Industry />
      <AIEngineering />
      <AIDevelopmentServices />
    </main>
  );
}
