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
export const powerAppsFaqsLeft = [
  {
    question: "What is Microsoft Power Apps?",
    answer:
      "Microsoft Power Apps is a low-code platform that allows businesses to build custom applications quickly with minimal coding. It helps automate processes, connect to data sources, and create scalable business solutions.",
  },
  {
    question: "What types of apps can be built using Power Apps?",
    answer:
      "You can build canvas apps, model-driven apps, and portal apps. These can be used for internal tools, workflow automation, dashboards, mobile apps, and customer-facing applications.",
  },
  {
    question: "Is Power Apps suitable for enterprise use?",
    answer:
      "Absolutely. Power Apps supports enterprise-grade security, governance, compliance, and scalability, making it ideal for large organizations and complex business environments.",
  },
  {
    question: "Can Power Apps integrate with existing systems?",
    answer:
      "Yes. Power Apps integrates seamlessly with Microsoft services like SharePoint, Dynamics 365, and Teams, as well as third-party APIs, SQL databases, and cloud platforms.",
  },
];

export const powerAppsFaqsRight = [
  {
    question: "Do I need coding skills to use Power Apps?",
    answer:
      "No. Power Apps is designed for both developers and non-developers. Its low-code interface allows users to build applications using drag-and-drop components and simple formulas.",
  },
  {
    question: "What are the benefits of using Power Apps?",
    answer:
      "Power Apps helps reduce development time, automate workflows, improve productivity, and enable faster digital transformation with cost-effective solutions.",
  },
  {
    question: "Can Power Apps be used on mobile devices?",
    answer:
      "Yes. Apps built with Power Apps are responsive and can run on web browsers, tablets, and mobile devices, ensuring accessibility across platforms.",
  },
  {
    question: "How scalable is Power Apps for growing businesses?",
    answer:
      "Power Apps is highly scalable. It supports integration with enterprise systems, handles increasing data loads, and allows businesses to expand applications as their needs grow.",
  },
];
// -----------------------------------------
// Component
// -----------------------------------------
export function AgenticAIFAQSection() {
  return (
    <section className="w-full py-24 px-4 md:px-6 bg-gradient-to-b from-zinc-50 via-white to-zinc-50 text-black">
      {/* Container */}
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="inline-block text-sm md:text-base text-gray-600 font-semibold tracking-wide mb-3 uppercase px-4 py-1 rounded-full border border-gray-300 bg-gray-50">
            Power Apps FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">
            Everything You Need to Know About Power Apps
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-[16px] md:text-lg leading-relaxed">
            Discover how Power Apps streamlines business processes, improves
            productivity, and helps organizations build custom applications
            faster with low-code solutions.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[powerAppsFaqsLeft, powerAppsFaqsRight].map((faqColumn, idx) => (
            <Accordion
              key={idx}
              type="single"
              collapsible
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
