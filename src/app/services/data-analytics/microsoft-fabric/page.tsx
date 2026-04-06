import HeroWithTestimonial from "./hero";
import FabricTabs from "./fabric-tabs";
import ProwessSection from "./process";
import WhyFabricSection from "./business";
import HireFabricPricing from "./pricing";
import WhyChooseWithTestimonials from "./why";
import TrustedBrandsMarquee from "./trust";
import CtaFabric from "./cta";
import UseCasesSection from "./use-cases";
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
export default function Home() {
  return (
    <>
    <NavigationClient/>
      <HeroWithTestimonial />
      <TrustedBrandsMarquee/>
      <FabricTabs/>
      <ProwessSection/>
      <UseCasesSection/>
      <WhyFabricSection/>
      <HireFabricPricing/>
      <WhyChooseWithTestimonials/>      
      <CtaFabric/>
      <Footer/>
    </>
  );
}
