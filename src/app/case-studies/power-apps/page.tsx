import NavigationClient from "@/components/sections/navigation-client";
import CaseFooter from "../footer";
import CaseStudyGrid from "./case-study-grid";
import Certifications from "@/app/services/power-apps/certification";
import StartProjectSection from "./start-project";
import Link from "next/link";
import HeroWithTestimonial from "./hero";
import PowerAppsCaseStudies from "./latest-cases";
import WhyChooseUs from "./why-chose";
import PowerAppsTechnologies from "./tech-stack";
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
      <StartProjectSection />
      <CaseFooter />
    </>
  );
}
