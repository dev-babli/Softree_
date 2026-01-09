"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, Search, Menu, X } from "lucide-react";

const servicesData = [
  {
    title: "Salesforce",
    href: "/Salesforce-Development-Services",
    items: [
      { name: "Salesforce Consulting", href: "/salesforce-consulting-services" },
      { name: "Salesforce Customization", href: "/salesforce-customization-services" },
      { name: "Salesforce Implementation", href: "/salesforce-implementation-services" },
      { name: "Salesforce Integration & Maintenance", href: "/salesforce-integration-services" },
      { name: "Salesforce Support and Maintenance", href: "/salesforce-support-and-maintenance-services" },
      { name: "Salesforce Administration Services", href: "/salesforce-administration-services" },
    ],
  },
  {
    title: "Microsoft Dynamics 365",
    href: "/Dynamics-365-Development-Services",
    items: [
      { name: "Dynamics 365 Business Central", href: "/dynamics-365-business-central" },
      { name: "Microsoft Dynamics 365 Sales", href: "/dynamics-365-for-sales" },
      { name: "Microsoft Dynamics 365 Marketing", href: "/dynamics-365-for-marketing" },
      { name: "Microsoft Dynamics 365 Customer Service", href: "/dynamics-365-for-customer-service" },
      { name: "Microsoft Dynamics 365 Customer Insight", href: "/microsoft-dynamics-365-cutomer-insight" },
      { name: "Microsoft Dynamics 365 Field Service", href: "/dynamics-365-for-field-service" },
      { name: "Microsoft Dynamics 365 Project Operation", href: "/dynamics-365-for-project-service-automation" },
    ],
  },
  {
    title: "Power Platform",
    href: "/power-platform-Consulting-Services",
    items: [
      { name: "Power BI", href: "/power-bi-consulting-services" },
      { name: "Power Apps", href: "/powerapps-consulting-services" },
      { name: "Power Automate", href: "/power-automate-consulting-services" },
      { name: "Microsoft Copilot", href: "/microsoft-copilot-studio-consulting-services" },
    ],
  },
  {
    title: "Product Engineering",
    href: "/Product-Engineering-Services",
    items: [
      { name: "Web Application Development", href: "/web-application-development" },
      { name: "Mobile App Development", href: "/mobile-application-development" },
    ],
  },
  {
    title: "Generative AI",
    href: "/Generative-AI-Services",
    items: [],
  },
];

const industriesData = [
  { name: "Retail & E-Commerce", href: "/retail-and-e-commerce-industry" },
  { name: "IT-Healthcare", href: "/healthcare-industry" },
  { name: "Media & Entertainment", href: "/media-and-entertainment-solutions" },
  { name: "Real Estate", href: "/Real-Estate-IT-Services" },
  { name: "Service Industry", href: "/service-industry" },
  { name: "Utilities", href: "/utility-industry" },
];

const resourcesData = [
  { name: "Blogs", href: "/blog-post" },
  { name: "Case Studies", href: "/case-study" },
  { name: "Partners", href: "/partner" },
];

const aboutData = [
  { name: "About Us", href: "/about" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Career", href: "/career" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[#051340] relative z-[100] border-b border-white/10">
      <nav className="h-20 max-w-7xl w-[87%] mx-auto flex justify-between items-center lg:grid lg:grid-cols-12 gap-x-4">
        {/* Logo */}
        <div className="col-span-2">
          <a href="/" className="block w-[164px] h-[32px]">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f9231059-3647-4f7a-ab8a-965fcb6abfb0-cynoteck-com/assets/images/logo1-1.png"
              alt="Cynoteck Technology Solutions Logo"
              width={164}
              height={32}
              className="object-contain"
              priority
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center justify-center space-x-6 col-span-8 h-full">
          {/* Services Menu */}
          <li className="group h-full flex items-center">
            <a href="/services" className="flex items-center text-sm font-normal text-white/80 transition-all hover:text-white group-hover:font-medium">
              Services
              <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
            </a>
            {/* Mega Menu */}
            <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute top-20 left-1/2 -translate-x-1/2 w-[87%] max-w-7xl transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="bg-[#051340] border border-white/10 shadow-2xl rounded-md p-10 mt-2 max-h-[78vh] overflow-y-auto custom-scrollbar">
                <div className="border-b border-white/20 pb-8 flex flex-wrap gap-10">
                  {servicesData.map((service, idx) => (
                    <div key={idx} className="flex-1 min-w-[200px]">
                      <div className="mb-4 p-2">
                        <a
                          href={service.href}
                          className="text-[18px] text-white font-semibold hover:underline underline-offset-4 decoration-2"
                        >
                          {service.title}
                        </a>
                      </div>
                      {service.items.map((item, i) => (
                        <a
                          key={i}
                          href={item.href}
                          className="block text-[14px] p-2 mt-1 rounded-md text-white/80 hover:text-[#051340] hover:bg-white hover:font-bold transition-all duration-200"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-white/80 text-4xl font-normal">Services</p>
                  <a
                    href="/services"
                    className="bg-white/10 hover:bg-white hover:text-[#051340] transition-all duration-300 text-white/70 font-medium text-sm rounded-md py-2 px-6 flex items-center"
                  >
                    View All
                  </a>
                </div>
              </div>
            </div>
          </li>

          {/* Industries Menu */}
          <li className="group h-full flex items-center">
            <a href="/industries" className="flex items-center text-sm font-normal text-white/80 transition-all hover:text-white group-hover:font-medium">
              Industries
              <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
            </a>
            <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute top-20 left-1/2 -translate-x-1/2 w-[87%] max-w-7xl transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="bg-[#051340] border border-white/10 shadow-2xl rounded-md p-10 mt-2">
                <div className="border-b border-white/20 pb-8 flex flex-wrap gap-8">
                  {industriesData.map((industry, idx) => (
                    <div key={idx} className="p-2">
                      <a
                        href={industry.href}
                        className="text-[18px] text-white font-semibold hover:underline underline-offset-4 decoration-2"
                      >
                        {industry.name}
                      </a>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-white/80 text-4xl font-normal">Industries</p>
                  <a
                    href="/industries"
                    className="bg-white/10 hover:bg-white hover:text-[#051340] transition-all duration-300 text-white/70 font-medium text-sm rounded-md py-2 px-6 flex items-center"
                  >
                    View All
                  </a>
                </div>
              </div>
            </div>
          </li>

          {/* Resources */}
          <li className="group h-full flex items-center">
            <a href="#" className="flex items-center text-sm font-normal text-white/80 transition-all hover:text-white group-hover:font-medium">
              Resources
              <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
            </a>
            <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute top-20 left-1/2 -translate-x-1/2 w-[87%] max-w-7xl transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="bg-[#051340] border border-white/10 shadow-2xl rounded-md p-10 mt-2">
                <div className="border-b border-white/20 pb-8 flex flex-wrap gap-10">
                  {resourcesData.map((res, idx) => (
                    <div key={idx} className="p-2">
                      <a href={res.href} className="text-[18px] text-white font-semibold hover:underline underline-offset-4">
                        {res.name}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </li>

          {/* About */}
          <li className="group h-full flex items-center">
            <a href="#" className="flex items-center text-sm font-normal text-white/80 transition-all hover:text-white group-hover:font-medium">
              About
              <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
            </a>
            <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute top-20 left-1/2 -translate-x-1/2 w-[87%] max-w-7xl transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="bg-[#051340] border border-white/10 shadow-2xl rounded-md p-10 mt-2">
                <div className="border-b border-white/20 pb-8 flex flex-wrap gap-10">
                  {aboutData.map((item, idx) => (
                    <div key={idx} className="p-2">
                      <a href={item.href} className="text-[18px] text-white font-semibold hover:underline underline-offset-4">
                        {item.name}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </li>
        </ul>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center justify-end space-x-4 col-span-2">
          <button className="bg-[#1D4ED8] p-2 rounded-md text-white hover:bg-blue-600 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <a
            href="/contact?utm_source=website_main_header&utm_medium=button&utm_content=contact_us"
            className="px-4 py-2 bg-[#18285c] text-white font-medium text-[14px] rounded-md hover:bg-[#121e48] transition-colors whitespace-nowrap"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-[#051340] z-[90] overflow-y-auto p-6 flex flex-col space-y-4">
          <a href="/services" className="text-white text-xl py-2 border-b border-white/10">Services</a>
          <a href="/industries" className="text-white text-xl py-2 border-b border-white/10">Industries</a>
          <a href="/resources" className="text-white text-xl py-2 border-b border-white/10">Resources</a>
          <a href="/about" className="text-white text-xl py-2 border-b border-white/10">About</a>
          <a
            href="/contact"
            className="bg-[#1D4ED8] text-white text-center py-3 rounded-md font-medium mt-4"
          >
            Contact Us
          </a>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </header>
  );
}