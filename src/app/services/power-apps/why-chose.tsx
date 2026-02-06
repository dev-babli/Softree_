"use client";

import React from "react";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Power Apps Expertise",
      desc: "We build scalable, low-code Power Apps solutions tailored to your business needs.",
      img: "https://thestartupconsultancy.com/wp-content/uploads/2020/12/h1_ask-5-1.png",
    },
    {
      title: "End-to-End Platform Support",
      desc: "Complete Power Platform support including Power Automate and Dataverse.",
      img: "https://thestartupconsultancy.com/wp-content/uploads/2020/12/h1_ask-5-3.png",
    },
    {
      title: "Process Automation",
      desc: "Automate workflows to reduce effort, improve efficiency, and save time.",
      img: "https://thestartupconsultancy.com/wp-content/uploads/2020/12/h1_ask-5-2.png",
    },
    {
      title: "Secure & Scalable Apps",
      desc: "Enterprise-grade security, performance, and scalability for long-term growth.",
      img: "https://thestartupconsultancy.com/wp-content/uploads/2020/12/h1_ask-5.png",
    },
  ];

  return (
    <section className="py-12 md:py-14 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Why Choose <span className="text-blue-600">Softree</span> for
            Power Apps
          </h2>

          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300">
            We deliver efficient, secure, and scalable Power Apps solutions
          </p>

          <hr className="border-t border-gray-300 dark:border-gray-700 mt-4 w-20 mx-auto" />
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row items-stretch gap-8">
          {/* Left Image – stretch to match right */}
          <div className="md:w-1/2 flex items-center justify-center">
            <img
              src="https://thestartupconsultancy.com/wp-content/uploads/2020/12/Untitled-1-2.png"
              alt="Power Apps Consulting"
              className="w-full max-w-sm h-full max-h-full object-contain"
            />
          </div>

          {/* Right Features */}
          <div className="md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center md:items-start text-center md:text-left p-2"
              >
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="mb-3 w-20 h-20"
                />
                <h4 className="text-lg font-semibold mb-1">{feature.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
