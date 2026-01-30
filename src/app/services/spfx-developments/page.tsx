import NavigationClient from "@/components/sections/navigation-client";
import SharePointHero from "./hero";
import Footer from "@/components/footer";
import SpfxBenefits from "./spfx-benefits";
import SpfxTabs from "./spfx-tab";
import Certifications from "./certification";
import SoftreeExpertiseTimeline from "./spfx.expertise";
import SpfxShowcase from "./case-study";
import CtaSharePoint from "./cta";
export default function Page() {
  return <div>
     <NavigationClient />
     <SharePointHero />
     <SpfxTabs />
     <SpfxShowcase />
     <SpfxBenefits />
     <SoftreeExpertiseTimeline    />
     <Certifications />
      <CtaSharePoint />
     <Footer />
  </div>;
}
