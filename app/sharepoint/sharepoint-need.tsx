"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

const benefits = [
  "Streamline your document management and improve data accessibility.",
  "Ensure smooth migrations, upgrades, and platform scalability.",
  "Save time and resources with expert SharePoint customization.",
  "Implement robust security measures to safeguard sensitive data.",
];

const SharePointNeed = () => {
  return (
    <section className="bg-black py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-stretch">

        {/* LEFT – Glass Text Card */}
        <div className="flex flex-col justify-between bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-semibold text-white">
              Why Choose Softree SharePoint Consulting?
            </h2>

            {/* Green Divider */}
            <div className="w-24 h-1 bg-green-500 rounded-full"></div>

            <p className="text-gray-300 text-lg leading-relaxed">
              Softree helps businesses unlock the full potential of SharePoint by delivering expert guidance, tailored solutions, and secure, scalable implementations. Our services ensure your teams work smarter, faster, and more collaboratively.
            </p>

            <ul className="space-y-3">
              {benefits.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300 text-lg">
                  <CheckCircle className="text-green-400 w-5 h-5 mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <a
            href="/contact-us/"
            className="mt-6 inline-block px-8 py-4 bg-green-500/10 border border-green-400/30 text-white font-semibold rounded-lg hover:bg-green-500/20 transition"
          >
            Get Started with Softree →
          </a>
        </div>

        {/* RIGHT – Glass Image Card */}
        <div className="h-full relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
          <Image
            src="/images/sharepoint/1.png"
            alt="Softree SharePoint Consulting"
            fill
            className="object-cover rounded-2xl"
            priority
          />
        </div>

      </div>
    </section>
  );
};

export default SharePointNeed;
