import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import ServicesSection from "./services";
import AIBannerSection from "./banner";
import WhySoftreeSection from "./why";
import IndustriesSection from "./industries";
import ProjectProcessSection from "./start-project";
import StartupHero from "./hero";
import HireExperts from "./hire";
import ProcessTimeline from "./process";
import PowerPlatformSection from "./services-section";
import TrustedBrandsMarquee from "../trust";
import Certifications from "../certification";
export default function Page() {
  return (
    <div className="min-h-screen">
      <NavigationClient />
      <StartupHero />
      <TrustedBrandsMarquee />
      <ServicesSection />
      <IndustriesSection />
      <AIBannerSection />
      <PowerPlatformSection />
      <ProcessTimeline />
      <HireExperts />
      <WhySoftreeSection />
      <Certifications />
      <ProjectProcessSection />
      <Footer />
    </div>
  );
}
