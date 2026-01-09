import Navigation from "@/components/sections/navigation";
import HeroSection from "@/components/sections/hero";
import SolutionsGrid from "@/components/sections/solutions-grid";
import IndustryCards from "@/components/sections/industry-cards";
import Testimonials from "@/components/sections/testimonials";
import TrustedPartners from "@/components/sections/trusted-partners";
import BlogResults from "@/components/sections/blog-results";
import CTABanner from "@/components/sections/cta-banner";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">
        <HeroSection />
        <SolutionsGrid />
        <IndustryCards />
        <Testimonials />
        <TrustedPartners />
        <BlogResults />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
