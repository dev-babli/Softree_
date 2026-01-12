import Navigation from "@/components/sections/navigation";

import Footer from "@/components/sections/footer";
import MobileAppLifecycle from "./lifecycle";
import ServicesShowcase from "./services";
import Technologies from "./tech-stack";
import WhyChooseSoftreeMobileApps from "./why-chose";
import MobileAppCaseStudies from "./case-studies";
import WhoWeWorkWith from "./who-we";
import MobileAppHero from "./hero";

export default function Home() {
  return (
    <main>
      <Navigation />
      <MobileAppHero />
      <MobileAppCaseStudies />
      <WhoWeWorkWith />
      <MobileAppLifecycle />
      <ServicesShowcase />
      <Technologies />
      <WhyChooseSoftreeMobileApps />
      <Footer />
    </main>
  );
}
