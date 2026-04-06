import HeroWithTestimonial from "./hero";
import FabricTabs from "./fabric-tabs";
import ProwessSection from "./process";
import WhyFabricSection from "./business";
import HireFabricPricing from "./pricing";
import WhyChooseWithTestimonials from "./why";
import TrustedBrandsMarquee from "./trust";
import CtaFabric from "./cta";
import UseCasesSection from "./use-cases";
export default function Home() {
  return (
    <>
      <HeroWithTestimonial />
      <TrustedBrandsMarquee/>
      <FabricTabs/>
      <ProwessSection/>
      <UseCasesSection/>
      <WhyFabricSection/>
      <HireFabricPricing/>
      <WhyChooseWithTestimonials/>      
      <CtaFabric/>
    </>
  );
}
