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
export const fabricFaqsLeft = [
  {
    question: "What is Microsoft Fabric?",
    answer:
      "Microsoft Fabric is an end-to-end data analytics platform that unifies data engineering, data integration, data science, real-time analytics, and business intelligence into a single integrated solution.",
  },
  {
    question: "What can you build using Microsoft Fabric?",
    answer:
      "With Microsoft Fabric, you can build data pipelines, analytics solutions, machine learning models, real-time dashboards, and unified data platforms to manage and analyze data efficiently.",
  },
  {
    question: "Is Microsoft Fabric suitable for enterprise use?",
    answer:
      "Yes. Microsoft Fabric offers enterprise-grade security, governance, scalability, and compliance, making it ideal for large organizations handling complex data workloads.",
  },
  {
    question: "Can Microsoft Fabric integrate with other systems?",
    answer:
      "Microsoft Fabric integrates seamlessly with Azure services, Power BI, data lakes, and third-party data sources, enabling unified data management and analytics across platforms.",
  },
];
export const fabricFaqsRight = [
  {
    question: "What are the benefits of using Microsoft Fabric?",
    answer:
      "Microsoft Fabric simplifies data management, reduces tool fragmentation, enables real-time analytics, and helps organizations make faster, data-driven decisions.",
  },
  {
    question: "Does Microsoft Fabric support real-time analytics?",
    answer:
      "Yes. Microsoft Fabric includes real-time analytics capabilities that allow organizations to process and analyze streaming data for immediate insights and actions.",
  },
  {
    question: "How scalable is Microsoft Fabric?",
    answer:
      "Microsoft Fabric is highly scalable, allowing businesses to handle large volumes of data, integrate multiple data sources, and expand analytics capabilities as their needs grow.",
  },
  {
    question: "Do I need technical expertise to use Microsoft Fabric?",
    answer:
      "Microsoft Fabric supports both technical and non-technical users. While advanced features may require expertise, it provides user-friendly tools and interfaces for data analysis and reporting.",
  },
];
// -----------------------------------------
// Component
// -----------------------------------------
export function FabricFaq() {
  return (
    <section className="w-full py-24 px-4 md:px-6 text-black">
      {/* Container */}
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="inline-block text-sm md:text-base text-gray-600 font-semibold tracking-wide mb-3 uppercase px-4 py-1 rounded-full border border-gray-300 bg-gray-50">
            Microsoft Fabric FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">
            Everything You Need to Know About Microsoft Fabric
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-[16px] md:text-lg leading-relaxed">
            Discover how Microsoft Fabric unifies data, analytics, and business
            intelligence to deliver real-time insights, improve decision-making,
            and streamline data operations across your organization.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[fabricFaqsLeft, fabricFaqsRight].map((faqColumn, idx) => (
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
