"use client";

import React from "react";
import { motion } from "framer-motion";
import { Truck, ShieldCheck, CheckCircle, LucideIcon } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: Truck,
    title: "Logistics Quality",
    description:
      "Accuracy • Functional Validation • Shipment Data Integrity • Workflow Validation • Usability",
  },
  {
    icon: ShieldCheck,
    title: "Logistics Security",
    description:
      "Data Privacy • Access Control • Vulnerability Testing • API Security • EDI Safeguards",
  },
  {
    icon: CheckCircle,
    title: "Logistics Reliability",
    description:
      "Regression • Performance • Availability • TMS/WMS Integration • End-to-End Workflows",
  },
];

export default function LogisticsTestingPositioning() {
  return (
    <section className="relative w-full bg-white overflow-hidden font-sans py-16 lg:py-24">
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full overflow-hidden bg-white rounded-[32px] border border-slate-200/80 shadow-md flex flex-col lg:flex-row items-stretch"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-[#ea580c]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex-[1.25] p-8 sm:p-12 lg:p-16 flex flex-col justify-center items-start">
            <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/70 px-4 py-1.5 rounded-full border border-white/60 mb-5 inline-block">
              <span className="typo-caption text-[#ea580c] uppercase">
                WHY SOFTREE
              </span>
            </div>

            <h2 className="typo-heading-2 text-slate-900 mb-4 max-w-xl">
              Logistics Applications Need <br className="hidden lg:block" />
              <span className="text-[#ea580c]">Engineering-Grade Testing</span>
            </h2>

            <div className="typo-description text-slate-600 max-w-xl mb-8 space-y-4">
              <p>
                Traditional software testing isn&apos;t enough for logistics
                platforms that move shipments, inventory, carrier data, EDI
                messages, and time-critical warehouse workflows.
              </p>
              <p>
                Softree combines logistics testing + test automation + security
                testing to help 3PLs, carriers, and shippers validate TMS, WMS,
                and visibility systems before and after production.
              </p>
            </div>

            <div className="flex flex-col gap-5 w-full max-w-xl">
              {FEATURES.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-full border border-orange-200/80 bg-orange-50/80 flex items-center justify-center shrink-0 mt-0.5 shadow-sm group-hover:border-[#ea580c]/40 group-hover:bg-orange-100/60 transition-colors duration-200">
                      <Icon className="w-5 h-5 text-[#ea580c]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="typo-heading-4 text-slate-900 mb-1">
                        {item.title}
                      </h4>
                      <p className="typo-body-sm text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="inline-block mt-9">
              <FlowButton
                href="/contact"
                text="TALK TO OUR LOGISTICS TESTING TEAM"
                variant="orange-filled"
              />
            </div>
          </div>

          <div className="relative flex-1 min-h-[360px] sm:min-h-[440px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-100 flex items-center justify-center bg-slate-900">
            <video
              src="/images/solutions/ai-for-logistics/hero.mp4"
              poster="/images/solutions/ai-for-logistics/hero.png"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover absolute inset-0 select-none pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
