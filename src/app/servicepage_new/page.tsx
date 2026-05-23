import AscendiaShowcase from "@/components/servicepage_new/AscendiaShowcase";
import FeatureSwitcher from "@/components/servicepage_new/FeatureSwitcher";
import CaseStudies from "@/components/servicepage_new/CaseStudies";
import ComparisonSection from "@/components/servicepage_new/ComparisonSection";
import BuildWebsiteSection from "@/components/servicepage_new/BuildWebsiteSection";
import MarqueeCarousel from "@/components/servicepage_new/MarqueeCarousel";
import PremiumMarquee from "@/components/servicepage_new/PremiumMarquee";

export const metadata = {
  title: 'Service Page',
  description: 'Explore our services',
};

export default function ServicePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <AscendiaShowcase />
      <FeatureSwitcher />
      <CaseStudies />
      <ComparisonSection />
      <BuildWebsiteSection />
      <MarqueeCarousel />
      <PremiumMarquee />
    </main>
  );
}
