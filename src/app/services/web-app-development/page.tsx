import Navigation from "@/components/sections/navigation";

import Footer from "@/components/sections/footer";
import FullStackTeams from "./full-stack";
import ThreePillars from "./three-pillar";
import CollaborationTabs from "./collab-tab";
import WebDevelopmentHero from "./process";
import QualityBenchmark from "./quality";
import WhyChooseSoftreeWebDevelopment from "./why-chose";
import WebDevelopmentCaseStudies from "./case-studies";
import WebDevHero from "./hero";
export default function Home() {
  return (
    <main>
      <Navigation />
  <WebDevHero/>
      <WebDevelopmentCaseStudies />
      <WebDevelopmentHero />
      <FullStackTeams />
      <ThreePillars />
      <CollaborationTabs />
      <QualityBenchmark />
      <WhyChooseSoftreeWebDevelopment />
      <Footer />
    </main>
  );
}
