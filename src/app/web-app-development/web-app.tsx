"use client";

import React from "react";
import { CheckCircle } from "lucide-react";

export default function JointWebAppCards() {
  const businessImportance = [
    "Tailored to Business Needs: Custom web apps are designed specifically to address your business requirements, ensuring optimal functionality and efficiency.",
    "Scalability: As your business grows, custom web apps can easily scale to meet increased demands, adapting without compromising performance.",
    "Competitive Advantage: Custom solutions offer unique features that set your business apart from competitors using generic software.",
    "Enhanced Security: Custom apps are built with robust security features, offering better protection against cyber threats compared to off-the-shelf solutions.",
    "Long-term Cost Efficiency: Though the initial investment may be higher, custom web apps save money in the long run by minimizing licensing fees and ongoing maintenance costs.",
  ];

  const hireReasons = [
    "Expertise and Skills: Experienced developers bring a deep understanding of the latest technologies and best practices, ensuring high-quality, efficient solutions.",
    "Efficient Problem Solving: With their knowledge, certified developers can quickly troubleshoot and resolve issues, keeping projects on track.",
    "Quality Assurance: Their experience ensures thorough testing and optimization for performance, resulting in a reliable and bug-free web app.",
    "Security: Experienced developers know how to implement strong security measures, protecting your app from vulnerabilities and cyber threats.",
    "Ongoing Support: Certified developers provide reliable post-launch support, ensuring continuous updates and maintenance for long-term success.",
  ];

  const CardSection = ({ title, items }: { title: string; items: string[] }) => (
    <div className="flex-1 p-10 flex flex-col gap-6">
      <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">{title}</h3>
      <ul className="flex flex-col gap-4">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
            <span className="text-gray-200 text-lg">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section className="py-24 bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-6 overflow-hidden rounded-3xl">

          {/* Left Glass Card */}
          <div className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-xl">
            <CardSection title="Business Importance of Custom Web App Services" items={businessImportance} />
          </div>

          {/* Right Glass Card */}
          <div className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-xl">
            <CardSection title="Why Hire Experienced and Certified Web App Developers?" items={hireReasons} />
          </div>

        </div>
      </div>
    </section>
  );
}
