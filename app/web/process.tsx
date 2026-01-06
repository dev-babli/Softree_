"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

const softrreeSteps = [
  {
    number: 1,
    title: "Project Planning",
    description:
      "At Softrree, we start by understanding your business goals and requirements. We define a clear roadmap and select the most suitable technologies for your project.",
  },
  {
    number: 2,
    title: "UI/UX Design",
    description:
      "Our design team creates intuitive, user-friendly interfaces. Wireframes, prototypes, and modern UI/UX trends ensure a seamless experience for your users.",
  },
  {
    number: 3,
    title: "Development & Integration",
    description:
      "We implement frontend and backend functionalities, integrate APIs, databases, and third-party services to build a scalable and high-performance solution.",
  },
  {
    number: 4,
    title: "Quality Assurance",
    description:
      "Every Softrree project undergoes rigorous testing, including functional, performance, and security testing, to deliver a bug-free, reliable product.",
  },
  {
    number: 5,
    title: "Deployment & Support",
    description:
      "We launch your website or application on the chosen platform and provide ongoing support, updates, and maintenance for optimal performance.",
  },
];

const SoftrreeWebProcess = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-20 px-4 md:px-8 lg:px-0 flex justify-center bg-black">
      <div className="bg-white/10 backdrop-blur-md border-b-2 border-gray-500 shadow-xl rounded-3xl p-8 md:p-12 w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
            Softrree <span className="text-green-400">Web Development</span> Process
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Our structured process ensures high-quality, scalable, and user-friendly web solutions tailored for your business needs.
          </p>
        </div>

        {/* Stepper */}
        <div className="relative flex flex-col md:flex-row items-center justify-between">
          {/* Progress Line */}
          <div className="hidden md:block absolute top-6 left-6 right-6 h-1 rounded bg-gray-700 z-0">
            <motion.div
              className="h-1 rounded bg-green-400"
              style={{ width: `${(activeStep / (softrreeSteps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {softrreeSteps.map((step, idx) => {
            const isActive = idx === activeStep;
            const isCompleted = idx < activeStep;

            return (
              <React.Fragment key={step.number}>
                {/* Step */}
                <div
                  className="flex flex-col items-center text-center relative z-10 cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setActiveStep(idx)}
                >
                  <div
                    className={`flex items-center justify-center w-14 h-14 rounded-full mb-4 font-bold shadow-lg transition-all duration-300 ${
                      isActive || isCompleted
                        ? "bg-green-400 text-black scale-110"
                        : "border-2 border-gray-500 text-gray-400 bg-gray-800/50"
                    }`}
                  >
                    {isCompleted ? <Check className="w-6 h-6" /> : step.number}
                  </div>
                  <h4
                    className={`font-semibold mb-2 transition-colors ${
                      isActive || isCompleted ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </h4>

                  <AnimatePresence>
                    {(isActive || isCompleted) && (
                      <motion.p
                        className="text-gray-300 text-sm max-w-xs"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        {step.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Arrow */}
                {idx !== softrreeSteps.length - 1 && (
                  <div className="hidden md:flex flex-1 justify-center items-center relative">
                    <motion.svg
                      className={`w-6 h-6 transition-transform duration-500 ${
                        isCompleted ? "text-green-400 rotate-0" : "text-gray-600"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M2 12h20M20 12l-6-6M20 12l-6 6" />
                    </motion.svg>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center mt-10 gap-4">
          <button
            className="px-6 py-2 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50"
            disabled={activeStep === 0}
            onClick={() => setActiveStep((prev) => prev - 1)}
          >
            Previous
          </button>
          <button
            className="px-6 py-2 rounded bg-green-400 text-black hover:bg-green-300 disabled:opacity-50"
            disabled={activeStep === softrreeSteps.length - 1}
            onClick={() => setActiveStep((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default SoftrreeWebProcess;
