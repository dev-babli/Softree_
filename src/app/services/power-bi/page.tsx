import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import PowerBIServicesTabs from "./power-bi-tabs";
import OurProcess from "./process";
import Certifications from "./certification";
import PowerBISuccessStories from "./success";
import PowerBIHero from "./hero";

export default function Home() {
  return (
    <main>
      <Navigation />
      <PowerBIHero />
      <PowerBIServicesTabs />
      <OurProcess />
      <PowerBISuccessStories />
      <Certifications />
      <Footer />
    </main>
  );
}
