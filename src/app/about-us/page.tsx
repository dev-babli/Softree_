import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import AboutHeroPro from "./hero-pro";
import StoryTimeline from "./story-timeline";
import PillarsSection from "./pillars-section";
import Certifications from "@/app/services/business-applications/power-platform/certification";
import CTASection from "./cta";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <NavigationClient />

      {/* HERO - Pro Globe with Jakub/Emil Motion */}
      <AboutHeroPro />

      {/* STORY TIMELINE */}
      <StoryTimeline />

      {/* PILLARS & STATS */}
      <PillarsSection />

      {/* CERTIFICATIONS */}
      <section className="bg-[#fafafa] py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <Certifications />
        </div>
      </section>

      {/* CTA */}
      <CTASection />

      <Footer />
    </main>
  );
}
