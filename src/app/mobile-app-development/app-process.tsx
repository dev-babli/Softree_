// AppDevelopmentSlider.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

interface Step {
  step: string;
  title: string;
  description: string;
  image: string;
  thumb: string;
}

const steps: Step[] = [
  {
    step: "01 - 07",
    title: "Requirement Analysis",
    description:
      "Gather and analyze all requirements for your software solution to ensure that the project scope, business objectives, and user needs are fully understood before starting development.",
    image: "/images/mobile-app/app1.jpg",
    thumb: "/images/mobile-app/app.jpg",
  },
  {
    step: "02 - 07",
    title: "System Design",
    description:
      "Create a robust system architecture and detailed design documents that define how the software components will interact, ensuring scalability and maintainability.",
    image: "/images/mobile-app/app1.jpg",
    thumb: "/images/mobile-app/app.jpg",
  },
  {
    step: "03 - 07",
    title: "Prototyping",
    description:
      "Build interactive prototypes to validate the design concepts and gather feedback from stakeholders, helping to reduce risks and improve user experience before full-scale development.",
    image: "/images/mobile-app/app1.jpg",
    thumb: "/images/mobile-app/app.jpg",
  },
  {
    step: "04 - 07",
    title: "Software Development",
    description:
      "Our development team writes clean, efficient, and secure code following best practices, turning your design and requirements into a fully functional software solution.",
    image: "/images/mobile-app/app1.jpg",
    thumb: "/images/mobile-app/app.jpg",
  },
  {
    step: "05 - 07",
    title: "Testing & Quality Assurance",
    description:
      "Perform thorough testing including functional, integration, and performance tests to ensure the software is stable, secure, and meets all requirements before deployment.",
    image: "/images/mobile-app/app1.jpg",
    thumb: "/images/mobile-app/app.jpg",
  },
  {
    step: "06 - 07",
    title: "Deployment",
    description:
      "Deploy your software to the production environment efficiently, following best practices to ensure minimal downtime and seamless integration with existing systems.",
    image: "/images/mobile-app/app1.jpg",
    thumb: "/images/mobile-app/app.jpg",
  },
  {
    step: "07 - 07",
    title: "Maintenance & Support",
    description:
      "Provide ongoing maintenance, updates, and technical support to keep your software running smoothly and adapt to evolving business needs.",
    image: "/images/mobile-app/app1.jpg",
    thumb: "/images/mobile-app/app.jpg",
  },
];

const AppDevelopmentSlider = () => {
  const [current, setCurrent] = useState(0);

  const prevStep = () => {
    setCurrent((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
  };

  const nextStep = () => {
    setCurrent((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full bg-black py-16 text-white">
      {/* Inner container */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-0">
        {/* Header */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Software Development{" "}
            <span className="text-yellow-400">Process We Follow</span> To
            Deliver High-Quality Solutions
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We follow a structured software development process covering every
            stage, from requirements gathering to deployment and maintenance,
            ensuring reliable and scalable solutions for businesses across
            industries.
          </p>
        </div>

        {/* Main Image with arrows */}
        <div className="relative mb-10">
          <Image
            src={steps[current].image}
            alt={steps[current].title}
            width={1051}
            height={1000} // smaller fixed height
            className="w-full h-[220px] md:h-[300px] lg:h-[580px] rounded-xl shadow-lg object-cover"
          />

          <button
            onClick={prevStep}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-purple-700 p-3 rounded-full hover:bg-purple-800 transition-shadow shadow-lg"
          >
            &#8592;
          </button>
          <button
            onClick={nextStep}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-purple-700 p-3 rounded-full hover:bg-purple-800 transition-shadow shadow-lg"
          >
            &#8594;
          </button>
        </div>

        {/* Thumbnail & description */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <Image
            src={steps[current].thumb}
            alt={steps[current].title}
            width={150}
            height={150}
            className="rounded-xl shadow-lg"
          />
          <div className="text-center md:text-left">
            <span className="text-blue-500 font-bold">{steps[current].step}</span>
            <h4 className="text-xl md:text-2xl font-semibold mt-2">
              {steps[current].title}
            </h4>
            <p className="text-gray-300 mt-2 max-w-md">{steps[current].description}</p>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-3 mt-6">
          {steps.map((_, idx) => (
            <span
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-300 ${
                idx === current ? "bg-purple-700 scale-125" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppDevelopmentSlider;
