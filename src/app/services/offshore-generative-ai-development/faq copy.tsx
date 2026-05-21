"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

// -----------------------------------------
// Agentic AI FAQ Content
// -----------------------------------------
export const agenticAIFaqsLeft = [
  {
    question: "What is Agentic AI?",
    answer:
      "Agentic AI refers to intelligent AI systems that can autonomously reason, plan, and take actions to complete tasks without continuous human input, acting like digital teammates.",
  },
  {
    question: "What can Agentic AI do?",
    answer:
      "Agentic AI can automate workflows, perform research, analyze data, generate content, interact with APIs, and execute multi-step tasks across different systems.",
  },
  {
    question: "Is Agentic AI suitable for enterprise use?",
    answer:
      "Yes. Agentic AI supports enterprise-grade security, governance, and scalability, making it suitable for automating complex business operations.",
  },
  {
    question: "Can Agentic AI integrate with existing systems?",
    answer:
      "Agentic AI integrates with CRMs, ERPs, APIs, databases, and enterprise tools, enabling seamless automation of real-world business workflows.",
  },
];
export const agenticAIFaqsRight = [
  {
    question: "What are the benefits of Agentic AI?",
    answer:
      "Agentic AI improves efficiency, reduces manual effort, enhances decision-making, and enables businesses to automate complex tasks with higher accuracy.",
  },
  {
    question: "Do I need technical skills to use Agentic AI?",
    answer:
      "No. Many Agentic AI solutions provide user-friendly interfaces, dashboards, and natural language interactions, making them accessible to non-technical users.",
  },
  {
    question: "How accurate and reliable is Agentic AI?",
    answer:
      "Agentic AI uses reasoning, validation loops, and tool integrations to improve accuracy, while built-in guardrails ensure safe and reliable outputs.",
  },
  {
    question: "Can Agentic AI scale with business needs?",
    answer:
      "Yes. Agentic AI can scale by deploying multiple agents, automating parallel workflows, and integrating with enterprise systems as business requirements grow.",
  },
];
// -----------------------------------------
// Component
// -----------------------------------------
export function AgenticFaq() {
  return (
    <section className="w-full py-24 px-4 md:px-6 bg-white text-black">
      {/* Container */}
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="inline-block text-sm md:text-base text-gray-600 font-semibold tracking-wide mb-3 uppercase px-4 py-1 rounded-full border border-gray-300 bg-gray-50">
            Agentic AI FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">
            Everything You Need to Know About Agentic AI
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-[16px] md:text-lg leading-relaxed">
            Discover how Agentic AI enables autonomous decision-making,
            automates complex workflows, and helps businesses operate more
            efficiently with intelligent digital agents.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[agenticAIFaqsLeft, agenticAIFaqsRight].map((faqColumn, idx) => (
            <Accordion
              key={idx}
              type="single"
              collapsible
              defaultValue={`item-${idx}-0`}
              className="space-y-5"
            >
              {faqColumn.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${idx}-${i}`}
                  className="border-b border-gray-200 py-5"
                >
                  <AccordionTrigger className="group [&>svg]:hidden flex w-full items-center justify-between text-left">
                    {/* Question */}
                    <span className="flex-1 text-lg md:text-l font-semibold text-black">
                      {faq.question}
                    </span>

                    {/* Icon */}
                    <span className="ml-4 flex h-6 w-6 items-center justify-center">
                      <Plus className="h-4 w-4 text-gray-500 group-data-[state=open]:hidden" />
                      <Minus className="h-4 w-4 text-gray-500 hidden group-data-[state=open]:block" />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-[15px] md:text-base text-gray-600 leading-relaxed mt-2">
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
