import NavigationClient from "@/components/sections/navigation-client";
import CaseFooter from "../footer";
import CaseStudyGrid from "./case-study-grid";
import Certifications from "@/app/services/business-applications/power-apps/certification";
import HeroWithTestimonial from "./hero";
import PowerAppsCaseStudies from "./latest-cases";
import WhyChooseUs from "./why-chose";
import PowerAppsTechnologies from "./tech-stack";
import CtaPowerApps from "@/app/services/business-applications/power-apps/cta";
export default function PowerAppsCaseStudiesPage() {
  return (
    <>
      <NavigationClient />
      <HeroWithTestimonial />
      <PowerAppsCaseStudies />

      <CaseStudyGrid />
      <WhyChooseUs />
      <PowerAppsTechnologies />
      <Certifications />
      <CtaPowerApps />
      <CaseFooter />
    </>
  );
}
