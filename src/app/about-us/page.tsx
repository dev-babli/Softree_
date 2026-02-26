import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import GlobalDelivery from "./global";
import InspiredByOurValues from "./inspired";
import EngagementModels from "./model";
import AgileProcessStack from "./agile";
import OurStorySection from "./story";
import AboutUsWithTestimonials from "./hero";
import ProjectProcessSection from "./start-project";
import Certifications from "@/app/services/power-apps/certification";

import Link from "next/link";

/* ------------------------------------------------------------------ */
/* Fixed Width Config                                                  */
/* ------------------------------------------------------------------ */
const FIXED_WIDTH = "mx-auto max-w-8xl px-8 sm:px-10 md:px-14 lg:px-20";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <NavigationClient />

      {/* HERO (can be full-width internally) */}
      <AboutUsWithTestimonials />

      {/* MAIN CONTENT – FIXED WIDTH */}
      <section className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50 py-24">
        <div className={FIXED_WIDTH}>
          <OurStorySection />
          <AgileProcessStack />
          <GlobalDelivery />
          <InspiredByOurValues />
          <EngagementModels />
          <Certifications />
        </div>
      </section>
      <ProjectProcessSection />

      <Footer />
    </main>
  );
}
