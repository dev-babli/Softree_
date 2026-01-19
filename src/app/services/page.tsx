import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import ServicesHeader from "./header";
import ServicesDetails from "./service-details";
import CaseStudiesSlider from "./cases";
import CTABanner from "@/components/sections/cta-banner";

export default function Home() {
  return (
    <>
      {/* FIXED NAVIGATION */}
      <NavigationClient />
      {/* MAIN CONTENT – space reserved for pill navbar */}
      <main className="pt-32 md:pt-1 bg-black">
        <ServicesHeader />
        <ServicesDetails />
        <CaseStudiesSlider />
        <CTABanner />
      </main>
      {/* FOOTER */}
      <Footer />
    </>
  );
}
