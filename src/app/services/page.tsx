import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import ServicesHeader from "./header";
import ServicesDetails from "./service-details";
import CaseStudiesSlider from "./cases";
import ProjectProcessSection from "./start-project";
import Certifications from "./offshore-power-platform-development/certification";
import ServicesHero from "./hero";
import CTASection from "@/components/sections/cta-banner";
import ProcessTimeline from "./process";
import ServicesSection from "./services";
export default function Home() {
  return (
    <>
      {/* FIXED NAVIGATION */}
      <NavigationClient />
      {/* MAIN CONTENT – space reserved for pill navbar */}
      <main className="bg-[#09090f]">
        <ServicesHero />
        <ServicesHeader />
        <ServicesSection />
        <ProcessTimeline />
        <CTASection />
      </main>
      {/* FOOTER */}
      <Footer />
    </>
  );
}
