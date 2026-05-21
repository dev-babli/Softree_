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
export const generativeAIFaqsLeft = [
  {
    question: "What is Generative AI?",
    answer:
      "Generative AI refers to artificial intelligence systems that can create content such as text, images, code, and videos based on patterns learned from data.",
  },
  {
    question: "What can Generative AI do?",
    answer:
      "Generative AI can generate content, assist in coding, create designs, automate writing tasks, summarize information, and enhance creativity across various applications.",
  },
  {
    question: "Is Generative AI suitable for enterprise use?",
    answer:
      "Yes. Generative AI can be securely deployed in enterprise environments with proper governance, data protection, and compliance measures.",
  },
  {
    question: "Can Generative AI integrate with existing systems?",
    answer:
      "Generative AI can integrate with APIs, CRMs, databases, and enterprise tools to enhance workflows and automate content-driven processes.",
  },
];
export const generativeAIFaqsRight = [
  {
    question: "What are the benefits of Generative AI?",
    answer:
      "Generative AI improves productivity, accelerates content creation, enhances creativity, and reduces manual effort across business processes.",
  },
  {
    question: "Do I need technical skills to use Generative AI?",
    answer:
      "No. Many Generative AI tools provide simple interfaces and natural language prompts, making them accessible to both technical and non-technical users.",
  },
  {
    question: "How accurate and reliable is Generative AI?",
    answer:
      "Generative AI produces high-quality outputs but may require validation. Using prompts, guardrails, and human review improves reliability and accuracy.",
  },
  {
    question: "Can Generative AI scale with business needs?",
    answer:
      "Yes. Generative AI solutions can scale across teams and workflows, supporting increased demand for content, automation, and innovation.",
  },
];
// -----------------------------------------
// Component
// -----------------------------------------
export function GenAIFaq() {
  return (
    <section className="w-full py-24 px-4 md:px-6 text-black">
      {/* Container */}
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="inline-block text-sm md:text-base text-gray-600 font-semibold tracking-wide mb-3 uppercase px-4 py-1 rounded-full border border-gray-300 bg-gray-50">
            Generative AI FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">
            Everything You Need to Know About Generative AI
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-[16px] md:text-lg leading-relaxed">
            Discover how Generative AI enables autonomous decision-making,
            automates complex workflows, and helps businesses operate more
            efficiently with intelligent digital agents.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[generativeAIFaqsLeft, generativeAIFaqsRight].map(
            (faqColumn, idx) => (
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
            ),
          )}
        </div>
      </div>
    </section>
  );
}
