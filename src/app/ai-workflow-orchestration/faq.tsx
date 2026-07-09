"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Minus } from "lucide-react";

export const workflowFaqsLeft = [
  {
    question: "What is AI Workflow Orchestration?",
    answer:
      "AI Workflow Orchestration refers to coordinating and automating business processes, multiple AI agents, applications, databases, and manual approvals into a single unified execution pipeline.",
  },
  {
    question: "How does this differ from traditional RPA automation?",
    answer:
      "Traditional RPA follows rigid, rule-based scripts that break on layout changes. AI orchestration uses LLM-powered agents to read unstructured documents, reason about exceptions, and adapt dynamically.",
  },
  {
    question: "What is a 'human-in-the-loop' checkpoint?",
    answer:
      "It is a workflow step where the AI agent pauses for manual review or validation (e.g., approving invoices above a certain threshold) before syncing records to internal systems.",
  },
  {
    question: "What platforms and databases can be connected?",
    answer:
      "We build integrations with SharePoint, Microsoft 365, Power Platform, SAP, Salesforce, custom SQL databases, and secure internal REST/SOAP APIs.",
  },
];

export const workflowFaqsRight = [
  {
    question: "How does the orchestrator handle errors and exceptions?",
    answer:
      "Exceptions are routed according to your rules: either handled automatically using fallback LLM reasoning or flagged and escalated immediately to a human reviewer's task list.",
  },
  {
    question: "Is orchestrating internal enterprise data secure?",
    answer:
      "Yes. The entire system runs inside your secure cloud perimeter (Azure/AWS/M365). Your documents and database fields are never shared with public model training pools.",
  },
  {
    question: "How do multiple AI agents collaborate in one run?",
    answer:
      "An orchestrator divides complex tasks into sub-tasks, delegates them to specialized agent nodes, passes structured context between nodes, and coordinates final outputs.",
  },
  {
    question: "Can we track live workflow runs in real time?",
    answer:
      "Yes. The platform provides full execution trace dashboards, logging active steps, execution times, LLM inputs/outputs, and audit trails for compliance.",
  },
];

export default function WorkflowFAQ() {
  return (
    <section className="w-full py-24 px-6 sm:px-10 lg:px-16 text-neutral-800 bg-white border-t border-neutral-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .ws-display { font-family: 'Space Grotesk', sans-serif; }
        .ws-body { font-family: 'Inter', sans-serif; }
        .ws-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* Container */}
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="ws-mono mb-3 text-xs uppercase tracking-[0.3em] text-[#F0A83C]">
            Orchestration FAQ
          </p>
          <h2 className="ws-display text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
            Frequently Asked <span className="text-[#F0A83C]">Questions</span>
          </h2>
          <p className="ws-body mt-4 text-base leading-relaxed text-neutral-500 max-w-2xl">
            Answers to common questions about setting up pipeline agents, automating database syncs, and establishing human-in-the-loop checkpoints.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
          {[workflowFaqsLeft, workflowFaqsRight].map((faqColumn, idx) => (
            <Accordion
              key={idx}
              type="single"
              collapsible
              defaultValue={`item-${idx}-0`}
              className="space-y-4"
            >
              {faqColumn.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${idx}-${i}`}
                  className="border-b border-neutral-100 py-4 last:border-none"
                >
                  <AccordionTrigger className="group [&>svg]:hidden flex w-full items-center justify-between text-left transition-colors duration-200 hover:no-underline">
                    {/* Question */}
                    <span className="ws-display flex-1 text-[17px] font-semibold text-neutral-800 group-hover:text-neutral-950 transition-colors">
                      {faq.question}
                    </span>

                    {/* Icon */}
                    <span className="ml-4 flex h-5 w-5 items-center justify-center shrink-0">
                      <Plus className="h-4 w-4 text-neutral-400 group-hover:text-[#F0A83C] group-data-[state=open]:hidden transition-colors" />
                      <Minus className="h-4 w-4 text-neutral-400 group-hover:text-[#F0A83C] hidden group-data-[state=open]:block transition-colors" />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="ws-body text-sm leading-relaxed text-neutral-500 mt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}
