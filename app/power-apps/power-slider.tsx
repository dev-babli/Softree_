"use client";

import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const services = [
  {
    title: "Microsoft Power BI",
    description:
      "Our dedicated team offers a full spectrum of Microsoft Power BI services that help in generating analytical reports for informed, data-driven business decisions.",
    image: "https://cdn.prod.website-files.com/67ab7d8cb75ff3a997dd4044/placeholder-powerbi.png",
  },
  {
    title: "Microsoft Power Apps",
    description:
      "We leverage MS Power Apps to turn ideas into customized apps. This low-code platform enables rapid application development tailored to your business needs.",
    image: "https://cdn.prod.website-files.com/67ab7d8cb75ff3a997dd4044/placeholder-powerapps.png",
  },
  {
    title: "Microsoft Power Automate",
    description:
      "Ensure workflow automation and boost productivity using our Microsoft Power Automate services. Connect with us for the best business automation plan for your organization.",
    image: "https://cdn.prod.website-files.com/67ab7d8cb75ff3a997dd4044/placeholder-powerautomate.png",
  },
];

const PowerPlatformSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = services.length;

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const moveLeft = () => setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  const moveRight = () => setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));

  return (
    <section className="relative py-20 text-white bg-black overflow-hidden">
      {/* Background Animated Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 animate-gradient-x opacity-40 pointer-events-none z-0"></div>

      {/* Optional Particle Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(50)].map((_, i) => (
          <span
            key={i}
            className="absolute bg-white/20 rounded-full animate-float"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold mb-4">Microsoft Power Platform Suite of Tools</h3>
          <p className="text-gray-400">
            Power Platform’s suite of tools brings people, data, and processes together to create value-added experiences for clients.
          </p>
        </div>

        {/* Slider Controls */}
        <div className="flex justify-between items-center mb-10 relative z-10">
          {/* Counter with animated underline */}
          <div className="relative text-xl font-medium pb-1">
            {String(currentIndex + 1).padStart(2, "0")}/{String(totalSlides).padStart(2, "0")}
            <span
              className="absolute bottom-0 left-0 h-1 bg-orange-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentIndex + 1) / totalSlides) * 100}%` }}
            />
          </div>

          {/* Arrows */}
          <div className="flex gap-4">
            <button
              onClick={moveLeft}
              className="p-3 rounded-full border border-gray-600 hover:bg-orange-500 hover:text-black transform transition-all duration-500 hover:rotate-12 hover:scale-110"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={moveRight}
              className="p-3 rounded-full border border-gray-600 hover:bg-orange-500 hover:text-black transform transition-all duration-500 hover:-rotate-12 hover:scale-110"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {services.map((service, idx) => (
              <div
                key={idx}
                className={`flex-shrink-0 w-full flex flex-col md:flex-row items-center gap-10 transition-transform duration-700 ${
                  idx === currentIndex ? "scale-105 opacity-100" : "scale-95 opacity-50"
                }`}
              >
                {/* Glass Card with 3D tilt */}
                <div className="md:w-1/2 px-4 bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl transition-transform duration-500 hover:scale-105 hover:-rotate-1 hover:rotate-1 hover:translate-y-1 relative">
                  <h4 className="text-2xl font-semibold mb-4">{service.title}</h4>
                  <ul className="list-disc list-inside text-gray-200">
                    <li>{service.description}</li>
                  </ul>
                  {/* Glow behind active card */}
                  {idx === currentIndex && (
                    <div className="absolute inset-0 -z-10 bg-orange-500/10 rounded-2xl blur-xl animate-pulse"></div>
                  )}
                </div>

                {/* Image with parallax hover */}
                <div className="md:w-1/2 px-4 flex justify-center perspective">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="max-w-[400px] w-full h-auto rounded-lg shadow-xl transition-transform duration-700 transform hover:scale-110 hover:-translate-y-2"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Dot Indicators */}
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
            {services.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                  idx === currentIndex ? "bg-orange-500 scale-125" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Tailwind Custom Animations */}
      <style>
        {`
          @keyframes gradient-x {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 20s ease infinite;
          }

          @keyframes float {
            0% { transform: translateY(0); opacity: 0.5; }
            50% { transform: translateY(-10px); opacity: 0.8; }
            100% { transform: translateY(0); opacity: 0.5; }
          }
          .animate-float {
            animation: float linear infinite;
          }

          .perspective { perspective: 1000px; }
        `}
      </style>
    </section>
  );
};

export default PowerPlatformSlider;
