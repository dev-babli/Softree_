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
export const webDevFaqsLeft = [
  {
    question: "What is web development?",
    answer:
      "Web development is the process of building and maintaining websites and web applications. It includes front-end development, back-end development, and full-stack solutions to deliver responsive and scalable digital experiences.",
  },
  {
    question: "What types of websites can you build?",
    answer:
      "We build corporate websites, e-commerce platforms, web applications, landing pages, and custom solutions tailored to business needs across various industries.",
  },
  {
    question: "Is web development important for businesses?",
    answer:
      "Yes. A well-designed website enhances online presence, improves customer engagement, builds credibility, and helps businesses generate leads and revenue.",
  },
  {
    question: "Can websites integrate with other systems?",
    answer:
      "Yes. Websites can integrate with APIs, CRMs, payment gateways, databases, and third-party services to provide seamless functionality and automation.",
  },
];
export const webDevFaqsRight = [
  {
    question: "What are the benefits of web development?",
    answer:
      "Web development helps businesses reach a global audience, improve user experience, automate processes, and provide scalable digital solutions.",
  },
  {
    question: "Do I need a custom website or a template?",
    answer:
      "It depends on your needs. Templates are faster and cost-effective, while custom websites offer better flexibility, scalability, and unique branding.",
  },
  {
    question: "How long does it take to develop a website?",
    answer:
      "Development time varies based on complexity. Simple websites may take a few weeks, while complex web applications can take several months.",
  },
  {
    question: "How scalable are web applications?",
    answer:
      "Web applications are highly scalable. They can handle increasing traffic, integrate new features, and grow with your business using modern technologies and cloud infrastructure.",
  },
];
// -----------------------------------------
// Component
// -----------------------------------------
export function WebFaq() {
  return (
    <section className="w-full py-24 px-4 md:px-6 bg-gradient-to-b from-gray-50 via-white to-gray-50 text-black">
      {/* Container */}
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="inline-block text-sm md:text-base text-gray-600 font-semibold tracking-wide mb-3 uppercase px-4 py-1 rounded-full border border-gray-300 bg-gray-50">
            Web App Developement FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">
            Everything You Need to Know About Web App Developement
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-[16px] md:text-lg leading-relaxed">
            Discover how web app development helps businesses build scalable,
            user-friendly applications, improve customer engagement, and deliver
            seamless digital experiences across devices.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[webDevFaqsLeft, webDevFaqsRight].map((faqColumn, idx) => (
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
