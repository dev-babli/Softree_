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
      cta: "Explore Shipment Intelligence",
      href: "/contact",
      icon: MapPin,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "Warehouse & Inventory Management",
      desc: "Optimize warehouse and inventory operations with AI-driven forecasting, stock intelligence, workflow automation, and operational decision support.",
      cta: "Explore Warehouse AI",
      href: "/contact",
      icon: Package,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "Logistics Document Processing",
      desc: "Automate bills of lading, invoices, shipping documents, proof of delivery, and other logistics documents with intelligent document processing.",
      cta: "Explore Document AI",
      href: "/contact",
      icon: FileText,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "Transportation & Route Optimization",
      desc: "Improve transportation operations with intelligent planning, route optimization, delivery insights, exception management, and AI-powered decision support.",
      cta: "Explore Transportation AI",
      href: "/contact",
      icon: Truck,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "Order & Freight Management",
      desc: "Streamline order processing, freight coordination, shipment workflows, approvals, and communication across logistics operations.",
      cta: "Explore Freight Automation",
      href: "/contact",
      icon: Boxes,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
    {
      title: "Supply Chain Intelligence",
      desc: "Connect logistics data across ERP, TMS, WMS, CRM, APIs, and business systems to deliver actionable supply chain intelligence and predictive insights.",
      cta: "Explore Supply Chain AI",
      href: "/contact",
      icon: LineChart,
      color: "text-[#FF6B00]",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="flex flex-col justify-between h-full w-full lg:max-w-[600px] mx-auto lg:mx-0 px-4 lg:px-2 pt-0">
      {!simple && (
        <div className="mb-1">
          {/* Heading */}
          <h2 className="text-2xl md:text-3xl lg:text-[24px] xl:text-[26px] font-extrabold text-slate-900 leading-[1.15] mb-1.5 tracking-tight pr-4">
            LOGISTICS AI <span className="text-[#FF6B00]">USE CASES</span>
          </h2>

          {/* Description */}
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-3">
            Discover how AI transforms logistics operations, improves supply chain visibility, automates workflows, and helps logistics teams make faster, data-driven decisions.
          </p>
        </div>
      )}

      {/* Logistics Use Cases List */}
      <div className="flex flex-col justify-between flex-1">
        {items.map((item, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 py-2 sm:py-2.5 ${
              i !== items.length - 1 ? "border-b border-slate-100" : ""
            }`}
          >
            <div className={`shrink-0 w-8 h-8 rounded-full ${item.bg} flex items-center justify-center mt-0.5`}>
              <item.icon className={`w-4 h-4 ${item.color}`} />
            </div>
            <div className="flex flex-col pt-0">
              <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-tight mb-0.5">
                {item.title}
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-500 leading-normal mb-1.5">
                {item.desc}
              </p>
              <Link
                href={item.href}
                className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#FF6B00] hover:text-[#e05e00] group/cta w-fit transition-all"
              >
                <span>{item.cta}</span>
                <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover/cta:translate-x-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
