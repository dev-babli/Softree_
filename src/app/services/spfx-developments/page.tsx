import Footer from "@/components/sections/footer";
import SpfxBenefits from "./spfx-benefits";
import SpfxTabs from "./spfx-tab";
import SpfxExpertise from "./spfx.expertise";
import ServicesShowcase from "./show-case";
import Navigation from "@/components/navigation";
import { WhyChooseSoftreeSPFx } from "./why-chose";
import Certifications from "./certification";
import SpfxHero from "./hero";
export default function Home() {
  return (
    <main>
      <Navigation />
      <SpfxHero />
      <SpfxTabs />
      <ServicesShowcase />
      <SpfxExpertise />
      <SpfxBenefits />
      <WhyChooseSoftreeSPFx />
      <Certifications />
      <Footer />
    </main>
  );
}
