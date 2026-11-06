import { Metadata } from "next";
import { GlobalPartnersHero } from "./components/GlobalPartnersHero";
import GlobalPartnersLogos from "./components/GlobalPartnersLogos";
import GlobalPartnersSqueezeCarouselDemo from "./components/globalpartnerSqueezeCarouselDemo";
import GlobalPartnersWhoWeWorkWith from "./components/GlobalPartnersWhoWeWorkWith";
import GlobalPartnersEngagementModels from "./components/GlobalPartnersEngagementModels";
import LightTestimonialFeature from "./components/LightTestimonialFeature";
import NavigationClient from "@/components/sections/navigation-client";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import Footer from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "Global Technology Partnerships | Partner with Softree",
  description:
    "Partner with Softree Technology to expand your software development, AI, Microsoft, and data engineering capabilities through flexible global technology partnerships.",
  keywords: [
    //primary keyword
    "Global Technology Partnerships",

    //secondary keywords
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
    title: "Global Technology Partnerships | Partner with Softree",
    description:
      "Partner with Softree Technology to expand your software development, AI, Microsoft, and data engineering capabilities through flexible global technology partnerships.",
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
        <GlobalPartnersLogos />
        <GlobalPartnersSqueezeCarouselDemo />
        <GlobalPartnersWhoWeWorkWith />
        <GlobalPartnersEngagementModels />
        <LightTestimonialFeature />
        <LightContactSection />
      </main>
      <Footer />
    </div>
  );
}
