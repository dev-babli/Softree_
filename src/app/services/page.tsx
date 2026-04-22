import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import ServicesHeader from "./header";
import ServicesDetails from "./service-details";
import CaseStudiesSlider from "./cases";
import ProjectProcessSection from "./start-project";
import Certifications from "./business-applications/power-platform/certification";
import CTASection from "../about-us/cta";

export default function Home() {
  return (
    <>
      {/* FIXED NAVIGATION */}
      <NavigationClient />
      {/* MAIN CONTENT – space reserved for pill navbar */}
      <main className="pt-32 md:pt-1 bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
        <ServicesHeader />
        <ServicesDetails />
        <CaseStudiesSlider />
        <Certifications />
        <CTASection />
      </main>
      {/* FOOTER */}
      <Footer />
    </>
  );
}
