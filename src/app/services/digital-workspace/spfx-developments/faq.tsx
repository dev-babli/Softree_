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
export const spfxFaqsLeft = [
  {
    question: "What is SharePoint Framework (SPFx)?",
    answer:
      "SharePoint Framework (SPFx) is a modern development model for building custom web parts, extensions, and applications for SharePoint using technologies like React, TypeScript, and Node.js.",
  },
  {
    question: "What can you build using SPFx?",
    answer:
      "With SPFx, you can build custom web parts, application customizers, extensions, dashboards, and fully integrated solutions tailored to SharePoint and Microsoft 365 environments.",
  },
  {
    question: "Is SPFx suitable for enterprise use?",
    answer:
      "Yes. SPFx supports enterprise-grade security, governance, and scalability, making it ideal for building robust and secure solutions within SharePoint environments.",
  },
  {
    question: "Can SPFx integrate with other systems?",
    answer:
      "SPFx can integrate with SharePoint APIs, Microsoft Graph, REST APIs, and third-party services to extend functionality and connect with enterprise systems.",
  },
];
export const spfxFaqsRight = [
  {
    question: "What are the benefits of using SPFx?",
    answer:
      "SPFx enables modern UI development, seamless integration with Microsoft 365, improved performance, and the ability to create responsive and reusable components.",
  },
  {
    question: "Do I need technical skills to use SPFx?",
    answer:
      "Yes. SPFx requires knowledge of web technologies such as JavaScript, TypeScript, React, and SharePoint development concepts.",
  },
  {
    question: "Can SPFx be used with modern SharePoint sites?",
    answer:
      "Yes. SPFx is designed specifically for modern SharePoint experiences and works seamlessly with SharePoint Online and Microsoft 365.",
  },
  {
    question: "How scalable is SPFx?",
    answer:
      "SPFx solutions are highly scalable and can be extended across multiple SharePoint sites, supporting growing business needs and complex applications.",
  },
];
// -----------------------------------------
// Component
// -----------------------------------------
export function SPFaq() {
  return (
    <section className="w-full py-24 px-4 md:px-6 bg-gradient-to-b from-zinc-50 via-white to-zinc-50 text-black">
      {/* Container */}
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="inline-block text-sm md:text-base text-gray-600 font-semibold tracking-wide mb-3 uppercase px-4 py-1 rounded-full border border-gray-300 bg-gray-50">
            SPFx FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">
            Everything You Need to Know About SPFx
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-[16px] md:text-lg leading-relaxed">
            Discover how SPFx enables secure collaboration, streamlines document
            management, and empowers teams to work efficiently across your
            organization.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[spfxFaqsLeft, spfxFaqsRight].map((faqColumn, idx) => (
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
