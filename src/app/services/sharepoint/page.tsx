import Navigation from "@/components/sections/navigation";
import SharePointMigration from "./sp-migrarion";
import SharePointFeatures from "./feature";
import TechStack from "./tech-stack";
import SharePointMigrationProcess from "./sp-process";
import AIDrivenSharePointMigration from "./ai-sp";
import Footer from "@/components/sections/footer";
import Certifications from "./certification";
import PowerAppsCaseStudies from "./casestudies";
import TimelinePage from "./timeline";
import SharePointHero from "./hero";
export default function Home() {
  return (
    <main>
      <Navigation />
      <SharePointHero />
      <SharePointFeatures />
      <PowerAppsCaseStudies />
      <SharePointMigration />
      <SharePointMigrationProcess />
      <AIDrivenSharePointMigration />
      <TechStack />
      <TimelinePage />
      <Certifications />
      <Footer />
    </main>
  );
}
