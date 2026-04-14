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
export const sharepointFaqsLeft = [
  {
    question: "What is Microsoft SharePoint?",
    answer:
      "Microsoft SharePoint is a web-based collaboration and document management platform that helps organizations store, organize, share, and access information securely from anywhere.",
  },
  {
    question: "What can you build using SharePoint?",
    answer:
      "With SharePoint, you can build intranet portals, document management systems, team collaboration sites, workflows, and custom business applications.",
  },
  {
    question: "Is SharePoint suitable for enterprise use?",
    answer:
      "Yes. SharePoint offers enterprise-grade security, compliance, scalability, and governance, making it ideal for large organizations and complex business environments.",
  },
  {
    question: "Can SharePoint integrate with other systems?",
    answer:
      "SharePoint integrates seamlessly with Microsoft 365 tools like Teams, Power Apps, and Power Automate, as well as third-party APIs and enterprise systems.",
  },
];
export const sharepointFaqsRight = [
  {
    question: "What are the benefits of using SharePoint?",
    answer:
      "SharePoint improves collaboration, centralizes document management, enhances productivity, and enables secure information sharing across teams.",
  },
  {
    question: "Do I need technical skills to use SharePoint?",
    answer:
      "No. SharePoint provides a user-friendly interface for content management, while advanced customization can be handled by developers if needed.",
  },
  {
    question: "Can SharePoint automate business processes?",
    answer:
      "Yes. SharePoint, combined with Power Automate, allows you to automate workflows such as approvals, notifications, and document processing.",
  },
  {
    question: "How scalable is SharePoint?",
    answer:
      "SharePoint is highly scalable and can support growing data, users, and business needs, making it suitable for organizations of all sizes.",
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
            SharePoint FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">
            Everything You Need to Know SharePoint
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-[16px] md:text-lg leading-relaxed">
            Discover how SharePoint enables secure collaboration, streamlines
            document management, and empowers teams to work efficiently across
            your organization.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[sharepointFaqsLeft, sharepointFaqsRight].map((faqColumn, idx) => (
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
