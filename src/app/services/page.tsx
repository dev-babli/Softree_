import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import ServicesHeroPro from "./hero-pro";
import Certifications from "./business-applications/power-platform/certification";
import CTASection from "../about-us/cta";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <NavigationClient />

      {/* Pro Bento Grid with AnimatePresence */}
      <ServicesHeroPro />

      {/* Certifications */}
      <section className="bg-white py-16">
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
