import { Metadata } from "next";
import { GlobalPartnersHero } from "./components/GlobalPartnersHero";
import TrustedBrandsMarquee from "./components/trust";
import GlobalPartnersLogos from "./components/GlobalPartnersLogos";
import GlobalPartnersWhoWeServe from "./components/GlobalPartnersWhoWeServe";
import GlobalPartnersWhatWeDeliver from "./components/GlobalPartnersWhatWeDeliver";
import GlobalPartnersTechStack from "./components/GlobalPartnersTechStack";
import GlobalPartnersIndustries from "./components/GlobalPartnersIndustries";
import GlobalPartnersModels from "./components/GlobalPartnersModels";
import GlobalPartnersWhy from "./components/GlobalPartnersWhy";
import { GlobalPartnersTestimonials } from "./components/GlobalPartnersTestimonials";
import { GlobalPartnersAboutUs } from "./components/GlobalPartnersAboutUs";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "Your Global Technology Partner for AI, Microsoft, Data & Software Engineering | Softree",
  description:
    "Softree partners with technology companies, Microsoft partners, digital agencies, SaaS providers, and businesses worldwide to accelerate AI development, Microsoft technology adoption, data engineering, and software development.",
  keywords: [
    "Global Technology Partners",
    "Technology Partnerships",
    "Global Technology Partnership",
    "Microsoft Technology Partners",
    "AI Technology Partners",
    "Software Development Partners",
    "Global IT Partnerships",
    "Technology Partner Program",
    "Strategic Technology Partnerships",
    "Microsoft Solutions Partners",
    "AI Development Partners",
    "Data Engineering Partners",
    "Software Engineering Partners",
    "Digital Transformation Partners",
    "Technology Consulting Partners",
    "Offshore Technology Partners",
    "Offshore Software Development Partners",
    "Technology Delivery Partners",
    "White Label Software Development Partners",
    "IT Staff Augmentation Partners",
  ],
  alternates: {
    canonical: "https://www.softreetechnology.com/global-partners",
  },
  openGraph: {
    title: "Global Technology Partners & Partnerships | Softree",
    description:
      "Partner with Softree Technology to extend your AI, Microsoft, data, and software engineering capabilities through flexible technology partnerships and delivery models.",
    url: "https://www.softreetechnology.com/global-partners",
    siteName: "Softree Technology",
    type: "website",
  },
};

export default function GlobalPartnersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavigationClient />
      <main className="flex-grow flex flex-col">
        <GlobalPartnersHero />
        <TrustedBrandsMarquee surface="light" />
        <GlobalPartnersLogos />
        <GlobalPartnersWhoWeServe />
        <GlobalPartnersWhatWeDeliver />
        <GlobalPartnersTechStack />
        <GlobalPartnersIndustries />
        <GlobalPartnersModels />
        <GlobalPartnersWhy />
        <GlobalPartnersTestimonials />
        <GlobalPartnersAboutUs />
        <LightContactSection />
      </main>
      <Footer />
    </div>
  );
}
