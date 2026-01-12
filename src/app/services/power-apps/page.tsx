import Navigation from "@/components/sections/navigation";
import PowerAppsServices from "./power-apps-services";
import TechStackSection from "./tech-stack";
import PowerAppsCaseStudies from "./casestudies";
import Certifications from "./certification";
import PowerAppsProcess from "./process";
import Footer from "@/components/sections/footer";
import WhyChooseSoftreePowerApps from "./why-chose";
import PowerAppsHero from "./hero";
export default function Home() {
  return (
    <main>
      <Navigation />
  <PowerAppsHero/>
      <PowerAppsServices />
  <WhyChooseSoftreePowerApps/>
      <TechStackSection />
      <PowerAppsProcess />
      <PowerAppsCaseStudies />
      <Certifications />
      <Footer />
    </main>
  );
}
