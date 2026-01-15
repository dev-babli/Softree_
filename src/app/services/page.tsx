import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import ServicesHeader from "./header";
import ServicesDetails from "./service-details";
import CaseStudiesSlider from "./cases";
import CTABanner from "@/components/sections/cta-banner";

export default function Home() {
  return (
    <>
      {/* FIXED NAVIGATION */}
      <Navigation />

      {/* MAIN CONTENT – space reserved for pill navbar */}
      <main className="pt-32 md:pt-36 bg-black">
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
