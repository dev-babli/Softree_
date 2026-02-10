"use client";

import * as React from "react";
import { HelpCircle, MessageCircle, ChevronDown } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";

/* ================= ACCORDION CORE ================= */

const CustomAccordion = AccordionPrimitive.Root;

const CustomAccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("", className)} {...props} />
));
CustomAccordionItem.displayName = "CustomAccordionItem";

const CustomAccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex justify-center">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex flex-1 items-center justify-between gap-4 rounded-3xl p-6 text-left w-full max-w-3xl",
        "bg-[#0a0a0a] text-white shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2",
        "data-[state=open] data-[state=open]:shadow-2xl",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-4">
        <HelpCircle className="h-5 w-5 text-white" />
        <span className="text-lg font-medium tracking-wide">{children}</span>
      </div>

      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gray-800 transition-transform group-hover:scale-105 group-data-[state=open]:rotate-180">
        <ChevronDown className="h-4 w-4 text-white" />
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
CustomAccordionTrigger.displayName = "CustomAccordionTrigger";

const CustomAccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-white",
      "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down pb-4",
      className
    )}
    {...props}
  >
    <div className="mt-4 flex justify-center">
      <div className="flex items-start gap-4 rounded-3xl bg-[#111111] p-6 shadow-lg w-full max-w-3xl transition-all">
        <span className="flex-1 text-md leading-relaxed">{children}</span>
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-800 transition-transform hover:scale-105">
          <MessageCircle className="h-5 w-5 text-white" />
        </div>
      </div>
    </div>
  </AccordionPrimitive.Content>
));
CustomAccordionContent.displayName = "CustomAccordionContent";

/* ================= FAQ DATA ================= */

const faqs = [
  {
    question: "How can Softree help us adopt Generative AI?",
    answer:
      "Softree delivers end-to-end generative AI solutions — from identifying the right use cases to building, integrating, and scaling copilots, knowledge assistants, and automation systems within your enterprise ecosystem.",
  },
  {
    question: "What types of Generative AI solutions do you build?",
    answer:
      "We design AI copilots, enterprise search with retrieval-augmented generation (RAG), document intelligence, workflow automation, and custom LLM-powered applications aligned with your business priorities.",
  },
  {
    question: "Can Softree integrate AI with our existing platforms?",
    answer:
      "Yes. Our experts connect generative AI with your applications, APIs, and data sources while maintaining security, performance, and compatibility with your current technology landscape.",
  },
  {
    question: "How do you manage security, privacy, and governance?",
    answer:
      "We apply strict access controls, responsible AI practices, monitoring frameworks, and guardrails to ensure outputs remain compliant, explainable, and enterprise-ready.",
  },
  {
    question: "Do you provide support after deployment?",
    answer:
      "Absolutely. Softree provides continuous optimization, monitoring, model improvements, and scaling strategies so your AI investment keeps delivering value over time.",
  },
];

/* ================= COMPONENT ================= */

export function AccordionComponent() {
  return (
    <main className="min-h-screen w-full p-4 flex flex-col items-center justify-center md:p-8 bg-black">
      <div className="w-full">
        <h2 className="mb-12 text-center text-3xl font-bold text-white md:text-4xl">
          Frequently Asked Questions About Generative AI
        </h2>

        <CustomAccordion
          type="single"
          collapsible
          defaultValue="item-0"
          className="space-y-8"
        >
          {faqs.map((faq, index) => (
            <CustomAccordionItem key={index} value={`item-${index}`}>
              <CustomAccordionTrigger>
                {faq.question}
              </CustomAccordionTrigger>

              <CustomAccordionContent>
                {faq.answer}
              </CustomAccordionContent>
            </CustomAccordionItem>
          ))}
        </CustomAccordion>
      </div>
    </main>
  );
}
