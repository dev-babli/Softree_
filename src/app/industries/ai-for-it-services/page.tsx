import type { Metadata } from "next";
import { applyPageOg } from "@/lib/site-metadata";
import Hero from './components/Hero/Hero';
import NavigationClient from '@/components/sections/navigation-client';
import AIITServicesWhoWeHelp from "./components/AIITServicesWhoWeHelp";
import AIITCapabilitiesStickyScroll from "./components/AIITCapabilitiesStickyScroll";
import AIITTechnologyStack from "./components/AIITTechnologyStack";
import TrustedBrandsMarquee from './components/trust';
import AiforitSpfxSharepointSqueezeCarouselDemo from './components/aiforitSpfxSharepointSqueezeCarouselDemo';
import AiforitWhyChooseWithTestimonials from "./components/aiforitWhyChooseWithTestimonials";
import AiforitLightFAQExact from "./components/aiforitLightFAQExact";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import Footer from "@/components/sections/footer";


const PAGE_URL = "https://www.softreetechnology.com/industries/ai-for-it-services";

export const metadata: Metadata = applyPageOg("/industries/ai-for-it-services", {
  title: "AI Solutions for IT Services & MSPs | Softree",
  description:
    "Accelerate IT service delivery, automated ticket triage, autonomous ITSM agents, code generation assistance, and infrastructure anomaly detection with custom enterprise AI solutions.",
  keywords: [
    // Commercial / Transactional Intent (High Buyer Value)
    "ai solutions for it services",
    "ai for it services",
    "ai solutions for msps",
    "managed service provider ai solutions",
    "enterprise aiops solutions",
    "ai itsm development services",
    "offshore ai engineering for it companies",
    "white label ai services for it firms",

    // Functional / Problem-Solving Intent (Operational IT & DevOps)
    "automated it service desk ai",
    "tier 1 ticket deflection ai",
    "ai automated incident triage",
    "aiops anomaly detection infrastructure",
    "it operations automation with ai",
    "autonomous ai agents for it support",
    "servicenow ai integration services",
    "jira service management ai automation",

    // Informational & Technology Intent (Modern GenAI & RAG)
    "generative ai for it operations",
    "rag for internal it knowledge base",
    "ai runbook automation",
    "ai observability and log analytics",
    "predictive maintenance for cloud infrastructure",
    "it service delivery automation",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "AI Solutions for IT Services & MSPs | Softree Technology",
    description:
      "Accelerate IT service delivery, automated ticket triage, code generation assistance, and infrastructure anomaly detection with custom AI.",
    url: "https://www.softreetechnology.com/industries/ai-for-it-services",
    siteName: "Softree Technology",
    type: "website",
  },
});

const itServicesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "AI Solutions for IT Services & MSPs | Softree Technology",
      description:
        "Accelerate IT service delivery, automated ticket triage, autonomous ITSM agents, and infrastructure anomaly detection with custom enterprise AI solutions.",
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://www.softreetechnology.com/#website",
        url: "https://www.softreetechnology.com",
        name: "Softree Technology",
      },
    },
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "AI Solutions for IT Services & MSPs",
      serviceType: "AIOps & IT Service Management Automation",
      provider: {
        "@type": "Organization",
        name: "Softree Technology",
        url: "https://www.softreetechnology.com",
      },
      areaServed: "Worldwide",
      description:
        "End-to-end enterprise AI solutions for IT companies, MSPs, and DevOps squads: automated incident response, AIOps telemetry monitoring, AI ticketing deflection, and autonomous IT agents.",
    },
  ],
};

export default function AiItDevelopmentServicesPage() {
  return (
    <main className="flex min-h-screen flex-col w-full overflow-hidden">
      <NavigationClient />
      <Hero />
      <TrustedBrandsMarquee />

      <AIITServicesWhoWeHelp />
      <AIITCapabilitiesStickyScroll />
      <AiforitSpfxSharepointSqueezeCarouselDemo />
      <AIITTechnologyStack />
      <AiforitWhyChooseWithTestimonials />
      <AiforitLightFAQExact />
      <LightContactSection />
      <Footer />
    </main>
  );
}
