import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import PowerBIServicesTabs from "./power-bi-tabs";
import Certifications from "./certification";
import PowerBIHero from "./hero";
import CtaAbout from "./cta";
import WhyChooseUs from "./why";
import PowerBIStackOverview from "./tools";
import PowerBIBenefits from "./benefits";
import StackedSlider from "./stach-slider";
import PowerBICaseStudies from "./case-studies";
import HirePowerBIPricing from "./pricing";
import PowerBIProcessSection from "./process";
import TestimonialsSplitSlider from "./testimonials";
import { PowerBIFaq } from "./faq";
import TrustedBrandsMarquee from "../../business-applications/power-platform/trust";
/* ------------------------------------------------------------------ */
/* Fixed Width Config                                                  */
/* ------------------------------------------------------------------ */
const FIXED_WIDTH = "mx-auto max-w-8xl px-8 sm:px-10 md:px-14 lg:px-20";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <NavigationClient />

      {/* HERO (can stay full-width internally) */}
      <PowerBIHero />
      {/* <PowerBICaseStudies /> */}
      <TrustedBrandsMarquee />
      <StackedSlider />
      <PowerBICaseStudies />
      <PowerBIServicesTabs />
      <PowerBIBenefits />
      <PowerBIStackOverview />
      <HirePowerBIPricing />
      <PowerBIProcessSection />
      <WhyChooseUs />
      <TestimonialsSplitSlider />
      <Certifications />

      <CtaAbout />
      <PowerBIFaq />
      <Footer />
    </main>
  );
}
