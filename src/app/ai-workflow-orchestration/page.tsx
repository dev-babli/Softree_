import AIWorkflowOrchestration from "./services";
import HeroSection from "./hero";
import BusinessChallenges from "./challenges";
import NavigationServer from "@/components/sections/navigation-server";
import Footer from "@/components/sections/footer";
import type { Metadata } from "next";
import { applyPageOg } from "@/lib/site-metadata";
import HowItWorks from "./how-it-works";
import OurDeliveryProcess from "./delhivary-process";
import TechStack from "./tech";
import Benefits from "./benefits";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";
import LightContactSection from "@/components/homepage-light/LightContactSection";

const workflowFaqs = [
  {
    id: 1,
    serial: "question 01",
    question: "What is AI Workflow Orchestration?",
    answer:
      "AI Workflow Orchestration coordinates and automates business processes, multiple AI agents, databases, and manual approvals into a single unified execution pipeline.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How does this differ from traditional RPA automation?",
    answer:
      "Traditional RPA follows rigid, rule-based scripts that break on layout changes. AI orchestration uses LLM-powered agents to read unstructured documents, reason about exceptions, and adapt dynamically.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "What is a 'human-in-the-loop' checkpoint?",
    answer:
      "It is a workflow step where the AI agent pauses for manual review or validation (e.g., approving invoices above a certain threshold) before syncing records to internal systems.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "What platforms and databases can be connected?",
    answer:
      "We build integrations with SharePoint, Microsoft 365, Power Platform, SAP, Salesforce, custom SQL databases, and secure internal REST/SOAP APIs.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "How does the orchestrator handle errors and exceptions?",
    answer:
      "Exceptions are routed according to your rules: either handled automatically using fallback LLM reasoning or flagged and escalated immediately to a human reviewer's task list.",
  },
  {
    id: 6,
    serial: "question 06",
    question: "Is orchestrating internal enterprise data secure?",
    answer:
      "Yes. The entire system runs inside your secure cloud perimeter (Azure/AWS/M365). Your documents and database fields are never shared with public model training pools.",
  },
];

export const metadata: Metadata = applyPageOg("/ai-workflow-orchestration", {
  title: "AI Workflow Orchestration Services | Softree Technology",
  description:
    "Automate enterprise operations, coordinate multiple AI agents, integrate CRM/ERP/SharePoint systems, and enable human-in-the-loop workflows.",
  keywords: [
    "AI workflow orchestration",
    "agent orchestration",
    "process automation",
    "human in the loop workflow",
    "enterprise workflow integration",
    "intelligent document processing",
  ],
  alternates: {
    canonical: "https://www.softreetechnology.com/ai-workflow-orchestration",
  },
  openGraph: {
    title: "AI Workflow Orchestration Services | Softree Technology",
    description: "Connect process, agent, and approval systems into one unified operational pipeline.",
    url: "https://www.softreetechnology.com/ai-workflow-orchestration",
    siteName: "Softree Technology",
    type: "website",
  },
  twitter: {
    title: "AI Workflow Orchestration Services | Softree Technology",
    description: "Enterprise AI workflow orchestration by Softree Technology.",
  },
}, "AI Workflow Orchestration");

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-white">
      <NavigationServer />
      <main className="flex-grow overflow-x-clip pt-[64px]">
        <HeroSection />
        <AIWorkflowOrchestration />
        <BusinessChallenges />
        <HowItWorks />
        <OurDeliveryProcess/>
        <TechStack/>
        <Benefits/>
        <LightFAQExact faqs={workflowFaqs} />
        <LightContactSection/>
      </main>
      <Footer />
    </div>
  );
}