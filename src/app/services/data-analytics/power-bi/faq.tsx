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
export const powerBIFaqsLeft = [
  {
    question: "What is Microsoft Power BI?",
    answer:
      "Microsoft Power BI is a business analytics and data visualization platform that helps organizations turn raw data into interactive dashboards and insightful reports for better decision-making.",
  },
  {
    question: "What can you build using Power BI?",
    answer:
      "With Power BI, you can create dashboards, reports, data models, and real-time analytics solutions to monitor performance, track KPIs, and visualize business data effectively.",
  },
  {
    question: "Is Power BI suitable for enterprise use?",
    answer:
      "Yes. Power BI offers enterprise-grade security, data governance, compliance features, and scalability, making it suitable for organizations of all sizes.",
  },
  {
    question: "Can Power BI integrate with other systems?",
    answer:
      "Power BI integrates seamlessly with Microsoft tools like Excel, Azure, and Dynamics 365, as well as third-party databases, APIs, and cloud services for comprehensive data analysis.",
  },
];

export const powerBIFaqsRight = [
  {
    question: "Do I need technical skills to use Power BI?",
    answer:
      "Basic knowledge of data is helpful, but Power BI is designed to be user-friendly. It provides drag-and-drop features and pre-built visuals, making it accessible for both technical and non-technical users.",
  },
  {
    question: "What are the benefits of using Power BI?",
    answer:
      "Power BI helps businesses make data-driven decisions, improves reporting efficiency, provides real-time insights, and enables better visualization of complex data.",
  },
  {
    question: "Can Power BI handle real-time data?",
    answer:
      "Yes. Power BI supports real-time data streaming and dashboards, allowing businesses to monitor live data and respond quickly to changes.",
  },
  {
    question: "How scalable is Power BI for growing businesses?",
    answer:
      "Power BI is highly scalable. It can handle large datasets, integrate with enterprise systems, and grow with your organization’s data and analytics needs.",
  },
];
// -----------------------------------------
// Component
// -----------------------------------------
export function PowerBIFaq() {
  return (
    <section className="w-full py-24 px-4 md:px-6 bg-gradient-to-b from-zinc-50 via-white to-zinc-50 text-black">
      {/* Container */}
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="inline-block text-sm md:text-base text-gray-600 font-semibold tracking-wide mb-3 uppercase px-4 py-1 rounded-full border border-gray-300 bg-gray-50">
            Power BI FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">
            Everything You Need to Know About Power BI
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-[16px] md:text-lg leading-relaxed">
            Discover how Power BI transforms data into actionable insights,
            improves decision-making, and enables organizations to visualize and
            analyze business performance effectively.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[powerBIFaqsLeft, powerBIFaqsRight].map((faqColumn, idx) => (
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
