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
export const mobileAppFaqsLeft = [
  {
    question: "What is mobile app development?",
    answer:
      "Mobile app development is the process of creating applications for smartphones and tablets. It includes designing, developing, testing, and deploying apps for platforms like iOS and Android.",
  },
  {
    question: "What types of mobile apps can you build?",
    answer:
      "We build native apps (iOS and Android), cross-platform apps, hybrid apps, and progressive web apps tailored to business needs such as e-commerce, healthcare, finance, and more.",
  },
  {
    question: "Is mobile app development suitable for businesses?",
    answer:
      "Yes. Mobile apps help businesses improve customer engagement, streamline operations, increase accessibility, and create new revenue opportunities.",
  },
  {
    question: "Can mobile apps integrate with existing systems?",
    answer:
      "Yes. Mobile apps can integrate with APIs, CRMs, ERPs, payment gateways, cloud services, and other third-party systems to ensure seamless functionality.",
  },
];
export const mobileAppFaqsRight = [
  {
    question: "What are the benefits of mobile app development?",
    answer:
      "Mobile apps enhance user experience, increase customer engagement, provide real-time access to services, and help businesses build strong digital presence and brand loyalty.",
  },
  {
    question: "Do I need separate apps for iOS and Android?",
    answer:
      "Not necessarily. You can build cross-platform apps using technologies like React Native or Flutter to run on both platforms, or choose native development for platform-specific performance.",
  },
  {
    question: "How long does it take to develop a mobile app?",
    answer:
      "Development time depends on complexity, features, and design. Simple apps may take a few weeks, while complex applications can take several months.",
  },
  {
    question: "How scalable are mobile apps?",
    answer:
      "Mobile apps are highly scalable. They can handle increasing users, integrate new features, and evolve with business growth using cloud infrastructure and modern architectures.",
  },
];
// -----------------------------------------
// Component
// -----------------------------------------
export function MobileFaq() {
  return (
    <section className="w-full py-24 px-4 md:px-6 bg-gradient-to-b from-gray-50 via-white to-gray-50 text-black">
      {/* Container */}
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="inline-block text-sm md:text-base text-gray-600 font-semibold tracking-wide mb-3 uppercase px-4 py-1 rounded-full border border-gray-300 bg-gray-50">
            Mobile App Developement FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">
            Everything You Need to Know About Mobile App Developement
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-[16px] md:text-lg leading-relaxed">
            Discover how mobile app development helps businesses build scalable,
            user-friendly applications, improve customer engagement, and deliver
            seamless digital experiences across devices.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[mobileAppFaqsLeft, mobileAppFaqsRight].map((faqColumn, idx) => (
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
