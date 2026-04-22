import NavigationClient from "@/components/sections/navigation-client";
import SharePointHero from "./hero";
import Footer from "@/components/sections/footer";
import SpfxBenefits from "./spfx-benefits";
import SpfxTabs from "./spfx-tab";
import SoftreeExpertiseTimeline from "./spfx.expertise";
import SpfxShowcase from "./case-study";
import CtaSharePoint from "./cta";
import TrustedBrandsMarquee from "../../business-applications/power-platform/trust";
import { SPFaq } from "./faq";
export default function Page() {
  return (
    <div>
      <NavigationClient />
      <SharePointHero />
      <TrustedBrandsMarquee />

      <SpfxTabs />
      <SpfxShowcase />
      <SpfxBenefits />
      <SoftreeExpertiseTimeline />
      {/* <Certifications /> */}
      <CtaSharePoint />
      <SPFaq />

      <Footer />
    </div>
  );
}
