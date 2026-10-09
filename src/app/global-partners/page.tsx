import { Metadata } from "next";
import { GlobalPartnersHero } from "./components/GlobalPartnersHero";
import TrustedBrandsMarquee from "./components/trust";
import GlobalPartnersLogos from "./components/GlobalPartnersLogos";
import GlobalPartnersWhoWeServe from "./components/GlobalPartnersWhoWeServe";
import GlobalPartnersWhatWeDeliver from "./components/GlobalPartnersWhatWeDeliver";
import GlobalPartnersModels from "./components/GlobalPartnersModels";
import GlobalPartnersWhy from "./components/GlobalPartnersWhy";
import { GlobalPartnersTestimonials } from "./components/GlobalPartnersTestimonials";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "Global Technology Partnerships | Softree",
  description:
    "Softree partners with technology companies, Microsoft partners, digital agencies, and businesses worldwide to extend their capabilities.",
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
        <GlobalPartnersModels />
        <GlobalPartnersWhy />
        <GlobalPartnersTestimonials />
        <LightContactSection />
      </main>
      <Footer />
    </div>
  );
}
