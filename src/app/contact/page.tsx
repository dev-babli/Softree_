import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import ContactHeroPro from "./hero-pro";
import Certifications from "@/app/services/business-applications/power-platform/certification";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <NavigationClient />

      {/* Pro Split Layout with Spring Motion */}
      <ContactHeroPro />

      {/* Certifications Section */}
      <section className="bg-[#050505] py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <Certifications />
        </div>
      </section>

      <Footer />
    </main>
  );
}
