import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import { AgenticAiPage } from "@/components/agentic-ai/AgenticAiPage";
import { Metadata } from "next";
import { applyPageOg } from "@/lib/site-metadata";

const agenticAIFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What Agentic AI services do you offer?",
    answer:
      "We build autonomous AI agents, intelligent automation systems, AI-powered workflows, and enterprise AI solutions. We specialize in creating AI agents that can execute complex tasks, make decisions, and interact with systems autonomously.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How do AI agents differ from traditional automation?",
    answer:
      "AI agents use LLMs and machine learning to understand context, make decisions, and adapt to changing situations. Unlike traditional automation, AI agents can handle unstructured data, learn from feedback, and execute complex multi-step workflows.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "How long does it take to build an AI agent solution?",
    answer:
      "Simple AI agents take 4-8 weeks. Complex enterprise agent systems with multiple integrations and custom training take 10-16 weeks. We provide detailed timelines after assessing your requirements and use cases.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Can AI agents integrate with existing business systems?",
    answer:
      "Yes, we integrate AI agents with CRMs, databases, APIs, document management systems, and other enterprise software. Agents can trigger actions, retrieve information, and update systems across your technology stack.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "How do you ensure AI agent reliability and safety?",
    answer:
      "We implement guardrails, human-in-the-loop validation, monitoring, and fallback mechanisms. We establish clear boundaries for agent actions and provide comprehensive testing to ensure safe and reliable operation.",
  },
];

export const metadata: Metadata = applyPageOg("/services/offshore-ai-development", {
  title:
    "Agentic AI Development Services | AI Agents & Intelligent Automation | Softree",

  description:
    "Softree delivers Agentic AI development services for enterprises, including autonomous AI agents, intelligent workflow automation, Generative AI solutions, and AI-powered business applications.",

  keywords: [
    "Agentic AI development services",
    "AI agent development",
    "autonomous AI agents",
    "enterprise AI solutions",
    "AI workflow automation",
    "Generative AI development",
    "AI automation solutions",
    "LLM application development",
    "AI consulting company",
    "intelligent automation services",
  ],

  alternates: {
    canonical:
      "https://www.softreetechnology.com/services/offshore-ai-development",
  },

  openGraph: {
    title: "Agentic AI Development Services | AI Agents & Automation Solutions",

    description:
      "Build autonomous AI agents, intelligent workflows, and enterprise AI automation systems with Softree’s Agentic AI development services.",

    url: "https://www.softreetechnology.com/services/offshore-ai-development",

    siteName: "Softree Technology",

    type: "website",
  },

  twitter: {
    title: "Agentic AI Development Services | AI Agents & Automation",

    description:
      "Autonomous AI agents, intelligent automation, and enterprise Generative AI solutions tailored for modern businesses.",
  },
}, "Softree Agentic AI Development Services");

export default function AgenticAIPage() {
  return (
    <div className="min-h-screen bg-white pt-[100px]">
      <NavigationClient />
      <AgenticAiPage faqs={agenticAIFAQs} />
      <Footer />
    </div>
  );
}
