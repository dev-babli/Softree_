import CaseStudies from "./CaseStudies";
 import FeatureSwitcher from "./FeatureSwitcher";
import ComparisonSection from "./ComparisonSection";
import BuildWebsiteSection from "./BuildWebsiteSection";
import MarqueeCarousel from "./MarqueeCarousel";
import PremiumMarquee from "./PremiumMarquee";
export default function Home() 

{
  return (
    <div>
   <FeatureSwitcher />
      <CaseStudies />
      <ComparisonSection />
      <BuildWebsiteSection />
      <MarqueeCarousel />
      <PremiumMarquee />
    </div>
  );
}