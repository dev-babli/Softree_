"use client";

import React from "react";
import { CheckCircle } from "lucide-react";

const benefits = [
  {
    title: "10+ Years of SharePoint Excellence",
    description:
      "Softree brings over a decade of hands-on SharePoint consulting experience, delivering secure and scalable solutions across enterprise environments.",
  },
  {
    title: "Enhanced Collaboration & Productivity",
    description:
      "We enable seamless document collaboration, version control, and team communication, reducing operational friction and email dependency.",
  },
  {
    title: "Structured & Intelligent Data Management",
    description:
      "Our SharePoint implementations ensure organized content, fast searchability, and improved access to business-critical information.",
  },
  {
    title: "Continuous Support & Optimization",
    description:
      "Beyond implementation, Softree provides ongoing monitoring, performance optimization, and continuous improvements as your business evolves.",
  },
  {
    title: "Tailored SharePoint Solutions",
    description:
      "We design and customize SharePoint environments aligned with your business workflows, ensuring faster adoption and long-term value.",
  },
  {
    title: "Enterprise-Grade Security & Compliance",
    description:
      "Softree ensures data protection through role-based access, compliance controls, and governance best practices across Microsoft 365.",
  },
];

const SharePointBenefits = () => {
  return (
    <section className="bg-black py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-white">
            Why Choose Softree for SharePoint Consulting
          </h2>

          {/* Softree Green Divider */}
          <div className="w-24 h-[2px] bg-gradient-to-r from-green-500 to-emerald-400 mt-6 mb-6" />

          <p className="text-gray-300 text-lg leading-relaxed">
            Softree delivers enterprise-grade SharePoint consulting services
            focused on security, scalability, and measurable business outcomes.
            We help organizations modernize collaboration and streamline digital
            workplaces using Microsoft SharePoint and Microsoft 365.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="
                relative bg-white/5 backdrop-blur-md
                rounded-2xl p-8
                border-b-2 border-white/20
                transition-all duration-300
                hover:-translate-y-1
                hover:border-green-400
                hover:shadow-[0_8px_20px_-6px_rgba(34,197,94,0.35)]
              "
            >
              <div className="flex items-start gap-4">
                <CheckCircle className="text-green-400 w-6 h-6 mt-1 shrink-0" />
                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>
              </div>

              <p className="text-gray-300 mt-4 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16">
          <a
            href="/services/sharepoint"
            className="
              inline-flex items-center gap-2
              bg-white/10 hover:bg-green-500/10
              text-white px-8 py-4
              rounded-lg
              border border-white/10 hover:border-green-400/40
              transition
            "
          >
            Explore Softree SharePoint Services →
          </a>
        </div>
      </div>
    </section>
  );
};

export default SharePointBenefits;
