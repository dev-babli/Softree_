import HeroWithTestimonial from "./hero";
import FabricTabs from "./fabric-tabs";
import ProwessSection from "./process";
import WhyFabricSection from "./business";
import HireFabricPricing from "./pricing";
import WhyChooseWithTestimonials from "./why";
import TrustedBrandsMarquee from "../offshore-power-platform-development/trust";
import CtaFabric from "./cta";
import UseCasesSection from "./use-cases";
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import FabricPartner from "./fabric-partner";
import { FabricFaq } from "./faq";
export default function Home() {
  return (
    <>
      <NavigationClient />
      <HeroWithTestimonial />
      <TrustedBrandsMarquee />
      <FabricTabs />
      <ProwessSection />

      <UseCasesSection />
      <WhyFabricSection />
      <FabricPartner />
      <HireFabricPricing />
      <WhyChooseWithTestimonials />
      <CtaFabric />
      <FabricFaq />

      <Footer />
    </>
  );
}
