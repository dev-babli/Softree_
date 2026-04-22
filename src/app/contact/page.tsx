import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import GlobalLocations from "./global";
import ContactPage from "./form";
import Certifications from "@/app/services/business-applications/power-platform/certification";

import ContactHero from "./hero";
export default function Home() {
  return (
    <main>
      <NavigationClient />
      <ContactHero />

      <ContactPage />
      <GlobalLocations />
      <Certifications />

      <Footer />
    </main>
  );
}
