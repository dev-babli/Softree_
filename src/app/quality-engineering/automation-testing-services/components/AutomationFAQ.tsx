"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

const faqs = [
  {
    id: "01",
    question: "How does Softree approach custom AI and automation development for enterprise organizations?",
    answer: "We approach custom AI development as a strategic partnership focused on measurable business outcomes. Our process begins with a comprehensive consulting phase where we assess your existing infrastructure, identify high-ROI use cases, and design a scalable enterprise architecture. By leveraging the Microsoft AI ecosystem, we ensure that every solution is secure, compliant, and seamlessly integrated into your existing environment.",
    color: "blue",
  },
  {
    id: "02",
    question: "Can you integrate AI agents and Microsoft Copilot into our existing business workflows?",
    answer: "Absolutely. Integrating AI agents and Microsoft Copilot into existing enterprise systems is one of our core capabilities. We build intelligent automation solutions that connect these AI tools directly with your enterprise data, ERPs, and CRMs. This allows autonomous AI agents to handle complex, multi-step tasks securely.",
    color: "orange",
  },
  {
    id: "03",
    question: "What is your process for ensuring AI security and data governance?",
    answer: "We implement robust governance models encompassing role-based access control, strict API authentication, and comprehensive audit logging. All AI agents and models are tested for vulnerabilities, prompt injection risks, and data leakage before deployment.",
    color: "blue",
  },
  {
    id: "04",
    question: "How long does a typical enterprise AI implementation timeline take?",
    answer: "Timelines vary depending on complexity. A proof-of-concept (POC) can typically be delivered in 4-6 weeks, while a full enterprise integration involving custom AI agents and enterprise data sources generally takes 3-6 months to properly architect, test, and deploy.",
    color: "orange",
  },
  {
    id: "05",
    question: "What kind of ROI and business outcomes can we expect from generative AI solutions?",
    answer: "Clients typically see massive reductions in manual processing time, faster decision-making cycles, and improved accuracy in data-heavy tasks. ROI is usually measured through hours saved, improved customer satisfaction metrics, and reduced operational bottlenecks.",
    color: "blue",
  },
  {
    id: "06",
    question: "Do you provide ongoing maintenance and support for deployed AI solutions?",
    answer: "Yes, we offer comprehensive managed services including continuous monitoring, model fine-tuning, security patching, and workflow optimization to ensure your AI systems remain highly performant as your business scales.",
    color: "blue",
  },
  {
    id: "07",
    question: "Why should we choose Softree as our AI consulting and development partner?",
    answer: "Softree combines deep Microsoft ecosystem expertise with cutting-edge AI engineering. We don't just build models; we build secure, enterprise-grade architectures that integrate seamlessly into your daily operations and drive real business value.",
    color: "orange",
  },
  {
    id: "08",
    question: "How do you handle the integration of AI into legacy enterprise systems?",
    answer: "We utilize custom middleware, APIs, and robotic process automation (RPA) bridges where necessary to connect modern AI capabilities with legacy systems, ensuring zero disruption to your existing core operations.",
    color: "blue",
  },
];

export const AutomationFAQ = () => {
  // Set first two open by default to match screenshot
  const [openIds, setOpenIds] = useState<string[]>(["01", "02"]);

  const toggleFaq = (id: string) => {
    setOpenIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-24 bg-zinc-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-16">
          <span className={cn("inline-block py-1 px-3 rounded-full border border-orange-200 bg-orange-50 text-orange-600 mb-4", typography.caption.default)}>
            Frequently Asked Questions
          </span>
          <h2 className={cn("text-slate-900", typography.heading.h2)}>
            Frequently Asked <span className="text-[#F25A28]">Questions</span>
          </h2>
        </div>

        <div className="columns-1 md:columns-2 gap-6 space-y-6">
          {faqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            const isBlue = faq.color === "blue";

            // Gradients matching screenshot
            const bgClass = isBlue
              ? "bg-gradient-to-br from-white to-blue-100 border border-blue-100"
              : "bg-gradient-to-br from-white to-orange-100 border border-orange-100";

            const textColor = isBlue ? "text-blue-600" : "text-orange-500";
            const hoverClass = isBlue ? "hover:border-blue-300" : "hover:border-orange-300";

            return (
              <div
                key={faq.id}
                className={`rounded-2xl p-6 md:p-8 transition-all duration-300 cursor-pointer break-inside-avoid ${bgClass} ${hoverClass} shadow-sm`}
                onClick={() => toggleFaq(faq.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className={cn("text-slate-500 mb-3", typography.caption.default)}>
                      Question {faq.id}
                    </div>
                    <h3 className={cn("text-slate-900", typography.heading.h4)}>
                      {faq.question}
                    </h3>
                  </div>
                  <div className={`shrink-0 mt-1 ${textColor}`}>
                    {isOpen ? <Minus size={24} /> : <Plus size={24} />}
                  </div>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 mt-6 border-t border-black/5">
                        <div className={cn("text-slate-500 mb-3", typography.caption.default)}>
                          Question Answer:
                        </div>
                        <p className={cn("text-slate-700", typography.body.default)}>
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
