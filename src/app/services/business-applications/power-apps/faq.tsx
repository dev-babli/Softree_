"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What Power Apps services does Softree offer?",
    answer:
      "Softree provides end-to-end Power Apps services including custom Canvas apps, Model-driven apps, Dataverse solutions, Power Automate workflows, and seamless integration with Microsoft 365 and SharePoint.",
  },
  {
    question: "Can you build custom Power Apps tailored to our business?",
    answer:
      "Yes. We design and develop fully customized Power Apps based on your business processes, data structure, and security requirements to ensure scalability and performance.",
  },
  {
    question: "Do you integrate Power Apps with SharePoint and Microsoft 365?",
    answer:
      "Absolutely. We specialize in integrating Power Apps with SharePoint, Microsoft Teams, Outlook, Excel, and other Microsoft 365 services for a connected digital workplace.",
  },
  {
    question: "How secure are Power Apps solutions developed by Softree?",
    answer:
      "Security is built into every solution. We follow Microsoft best practices including role-based access, Dataverse security roles, environment-level governance, and compliance standards.",
  },
  {
    question: "How long does it take to develop a Power App?",
    answer:
      "The development timeline depends on the complexity of the solution. Simple Power Apps can be delivered in 1–2 weeks, while enterprise-grade applications with integrations and automation typically take 4–6 weeks.",
  },
  {
    question: "Can Power Apps be used on mobile devices?",
    answer:
      "Yes. Power Apps are responsive by design and work seamlessly across mobile phones, tablets, and web browsers, enabling users to access business applications anytime, anywhere.",
  },
  {
    question: "Do you provide support and maintenance after deployment?",
    answer:
      "Yes. Softree offers ongoing support, maintenance, performance optimization, and enhancements to ensure your Power Apps continue to meet evolving business needs.",
  },
  {
    question:
      "Can you modernize existing legacy applications using Power Apps?",
    answer:
      "Absolutely. We help organizations replace or modernize legacy systems and manual processes by building scalable Power Apps solutions integrated with Dataverse and Power Automate.",
  },
];

export default function PowerAppsFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative  overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">
        {/* ===== Heading ===== */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-600/10 text-blue-700 px-4 py-1 text-xs font-medium">
            ❓ FAQs
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-gray-900">
            Power Apps Services – FAQs
          </h2>

          <p className=" text-gray-600 max-w-4xl mx-auto">
            Clear answers to common questions about Softree’s Power Apps
            consulting, development, and ongoing support services.
          </p>
        </div>

        {/* ===== FAQ Grid ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`
          group
          relative
          rounded-3xl
          overflow-hidden
          border
          transition-all duration-300
          ${
            isOpen
              ? "border-cyan-400/30 bg-gradient-to-br from-black via-[#0f2f7a] to-black shadow-[0_20px_60px_rgba(15,47,122,0.55)]"
              : "border-white/10 bg-gradient-to-br from-black via-[#0f2f7a] to-black hover:shadow-[0_15px_45px_rgba(15,47,122,0.4)]"
          }
        `}
              >
                {/* Glow layer */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition duration-500" />

                {/* Question */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="relative z-10 w-full flex items-center justify-between gap-4 px-7 py-6 text-left"
                >
                  <span className="text-base font-medium text-white">
                    {faq.question}
                  </span>

                  <div
                    className={`
              flex h-9 w-9 items-center justify-center rounded-full
              bg-gradient-to-br from-cyan-500 to-blue-600
              text-white
              shadow-lg
              transition-transform duration-300
              ${isOpen ? "rotate-180 scale-110" : ""}
            `}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {/* Answer */}
                <div
                  className={`
            relative z-10 px-7 transition-all duration-300 ease-in-out
            ${
              isOpen
                ? "max-h-48 pb-7 opacity-100"
                : "max-h-0 opacity-0 overflow-hidden"
            }
          `}
                >
                  <p className="text-sm text-white/80 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ===== Bottom CTA ===== */}
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-600 mb-5">
            Need help planning your Power Apps solution?
          </p>

          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-2xl
                   bg-gradient-to-r from-blue-600 to-cyan-600
                   px-8 py-3 text-sm font-medium text-white
                   shadow-lg hover:shadow-xl hover:scale-105 transition"
          >
            Talk to a Power Apps Expert
          </a>
        </div>
      </div>
    </section>
  );
}
