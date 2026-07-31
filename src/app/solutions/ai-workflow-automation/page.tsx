import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import WorkflowHero from "./components/WorkflowHero";
import dynamic from "next/dynamic";
import LightContactSection from "@/components/homepage-light/LightContactSection";

const TrustedBrandsMarquee = dynamic(() => import("@/app/services/offshore-power-platform-development/trust"));
const WhyAIWorkflow = dynamic(() => import("./components/WhyAIWorkflow/WhyAIWorkflow").then(m => m.WhyAIWorkflow));
const CapabilitiesBentoGrid = dynamic(() => import("./components/Core-capabilities/CapabilitiesBentoGrid"));
const BusinessChallenges = dynamic(() => import("./components/Business-Challenges/BusinessChallenges"));
const Industries = dynamic(() => import("./components/Industries/Industries").then(m => m.Industries));
const WorkflowArchitecture = dynamic(() => import("./components/Automation-architecture/WorkflowArchitecture").then(m => m.WorkflowArchitecture));
const HowWorkflowWorks = dynamic(() => import("./components/HowWorkflowWorks"));
const WorkflowSolutions = dynamic(() => import("./components/workflow-solutions/WorkflowSolutions").then(m => m.WorkflowSolutions));
const WorkflowTechnologyStack = dynamic(() => import("./components/Technologies/WorkflowTechnologyStack"));
const WhyChooseWithTestimonialsSoftree = dynamic(() => import("./components/WhySoftree/WhyChooseWithTestimonialsSoftree"));
const BusinessBenefits = dynamic(() => import("./components/business-benefits/BusinessBenefits").then(m => m.BusinessBenefits));
const RelatedCaseStudiesCarousel = dynamic(() => import("./components/Case-studies/RelatedCaseStudiesCarousel").then(m => m.RelatedCaseStudiesCarousel));
const WorkflowAutomationTestimonials = dynamic(() => import("./components/Testimonial/WorkflowAutomationTestimonials"));
const WorkflowAutomationFAQ = dynamic(() => import("./components/FAQ/WorkflowAutomationFAQ").then(m => m.WorkflowAutomationFAQ));
const ProvenResults = dynamic(() => import("@/components/sections/ProvenResults"));

export const metadata = {
  title: "AI Workflow Automation | Softree Technology",
  description: "Automate repetitive business processes with AI-powered workflows, intelligent agents, and enterprise automation.",
};

export default function AIWorkflowAutomationPage() {
  return (
    <>
      <NavigationClient />
      <main className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50 relative overflow-hidden">
        {/* Very subtle background glows */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#FF6B00]/5 rounded-full blur-3xl mix-blend-multiply"></div>
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl mix-blend-multiply"></div>
        </div>

        <WorkflowHero />
        <TrustedBrandsMarquee />
        <RelatedCaseStudiesCarousel />
        <CapabilitiesBentoGrid />
        <BusinessChallenges />
        <BusinessBenefits />
        <ProvenResults solution="ai-workflow" />
        <Industries />
        <WorkflowTechnologyStack />
        {/* <WhyAIWorkflow />
        <WorkflowArchitecture /> */}

        <HowWorkflowWorks />
        {/* <WorkflowSolutions /> */}
        <WhyChooseWithTestimonialsSoftree />

        {/* <WorkflowAutomationTestimonials /> */}
        <WorkflowAutomationFAQ />
      </main>
      <LightContactSection />
      <Footer />
    </>
  );
}
