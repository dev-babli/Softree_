"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  Package,
  FileText,
  Truck,
  Boxes,
  LineChart,
  ArrowRight,
} from "lucide-react";

export const LogisticsWhoWeHelp = ({ simple = false }: { simple?: boolean }) => {
  const items = [
    {
      title: "Shipment Visibility & Tracking",
      desc: "Improve shipment visibility with AI-powered tracking, intelligent status monitoring, exception detection, and real-time operational insights.",
      icon: MapPin,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "Warehouse & Inventory Management",
      desc: "Optimize warehouse and inventory operations with AI-driven forecasting, stock intelligence, workflow automation, and operational decision support.",
      icon: Package,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "Logistics Document Processing",
      desc: "Automate bills of lading, invoices, shipping documents, proof of delivery, and other logistics documents with intelligent document processing.",
      icon: FileText,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "Transportation & Route Optimization",
      desc: "Improve transportation operations with intelligent planning, route optimization, delivery insights, exception management, and AI-powered decision support.",
      icon: Truck,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "Order & Freight Management",
      desc: "Streamline order processing, freight coordination, shipment workflows, approvals, and communication across logistics operations.",
      icon: Boxes,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "Supply Chain Intelligence",
      desc: "Connect logistics data across ERP, TMS, WMS, CRM, APIs, and business systems to deliver actionable supply chain intelligence and predictive insights.",
      icon: LineChart,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="flex flex-col justify-between h-full w-full lg:max-w-[660px] mx-auto lg:mx-0 px-4 lg:px-2 pt-0">
      {!simple && (
        <div className="mb-4">
          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-[35px] xl:text-[38px] font-extrabold font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 leading-[1.2] mb-3 tracking-tight">
            Transform Logistics &amp; Supply Chain Operations with{" "}
            <span className="text-[#FF6B00]">AI-Powered Solutions</span>
          </h2>

          {/* Description */}
          <p className="text-slate-600 text-[16px] sm:text-[17.5px] leading-relaxed mb-4">
            From shipment tracking and warehouse management to transportation, freight, document processing, and supply chain intelligence, Softree helps logistics businesses automate operations, improve visibility, and make smarter decisions with AI.
          </p>
        </div>
      )}

      {/* Logistics Use Cases List */}
      <div className="flex flex-col justify-between flex-1">
        {items.map((item, i) => (
          <div
            key={i}
            className={`flex items-start gap-4 py-2.5 sm:py-3 ${
              i !== items.length - 1 ? "border-b border-slate-100" : ""
            }`}
          >
            <div className={`shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full ${item.bg} flex items-center justify-center mt-0.5 border border-orange-200/50`}>
              <item.icon className={`w-5 h-5 sm:w-5.5 sm:h-5.5 ${item.color}`} />
            </div>
            <div className="flex flex-col pt-0">
              <h3 className="text-[18.5px] sm:text-[20px] font-bold text-slate-900 leading-snug mb-1">
                {item.title}
              </h3>
              <p className="text-[15.5px] sm:text-[16.5px] text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Single Section-Level CTA */}
      <div className="pt-4 mt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[15.5px] sm:text-[16.5px] text-slate-700 font-medium text-center sm:text-left">
          Ready to deploy customized AI across your logistics operations?
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white text-[15px] sm:text-[16px] font-semibold shadow-md shadow-orange-500/20 transition-all duration-200 shrink-0 group"
        >
          <span>Schedule a Consultation</span>
          <ArrowRight className="w-4.5 h-4.5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};
