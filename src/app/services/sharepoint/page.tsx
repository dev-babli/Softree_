import NavigationClient from "@/components/sections/navigation-client";
import SharePointMigration from "./sp-migrarion";
import SharePointFeatures from "./feature";
import TechStack from "./tech-stack";
import SharePointMigrationProcess from "./sp-process";
import AIDrivenSharePointMigration from "./ai-sp";
import Footer from "@/components/sections/footer";
import Certifications from "./certification";
import PowerAppsCaseStudies from "./casestudies";
import TimelinePage from "./timeline";
import SharePointHero from "./hero";
import HireSharePointPricing from "./pricing-cards";
import CtaSharePoint from "./cta";
import WhyChooseUs from "./why-chose";

const FIXED_WIDTH = "mx-auto max-w-8xl px-8 sm:px-10 md:px-14 lg:px-20";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#141414]">
      <NavigationClient />

      {/* HERO (can stay full-width or internally centered) */}
      <SharePointHero />

      {/* MAIN CONTENT – FIXED WIDTH */}
      <section
        className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50
  py-24"
      >
        <div className={FIXED_WIDTH}>
          {/* <SharePointFeatures /> */}
          <PowerAppsCaseStudies />
          <SharePointMigration />
          <SharePointMigrationProcess />
          <AIDrivenSharePointMigration />
          <WhyChooseUs />
          <TechStack />
          <HireSharePointPricing />
          <TimelinePage />
          <Certifications />
        </div>
      </section>

      <CtaSharePoint />

      <Footer />
    </main>
  );
}
