"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Code,
  Settings,
  Monitor,
  Server,
  Database,
  Box,
} from "lucide-react";

const webServices = [
  {
    title: "Custom Web Development",
    description:
      "Transform your ideas into fully-functional, high-performance websites tailored to your business. We use modern technologies, responsive UI/UX design, and best coding practices to ensure your website is scalable, fast, and visually appealing. From concept to deployment, we provide end-to-end web development solutions.",
    icon: <Code className="w-16 h-16 text-green-400" />,
  },
  {
    title: "Website Maintenance & Support",
    description:
      "Keep your website secure, optimized, and up-to-date with our proactive maintenance and support services. We monitor performance, implement security updates, fix bugs, and enhance functionalities to ensure your website remains reliable and competitive. Our experts provide ongoing support to keep your digital presence flawless.",
    icon: <Settings className="w-16 h-16 text-green-400" />,
  },
  {
    title: "Website Redevelopment",
    description:
      "Revamp your existing web solutions to be future-ready, modern, and fully optimized. We enhance UI/UX, improve performance, update legacy code, and integrate new functionalities to provide a seamless experience for your users. Ensure your website meets current standards and scales with your growing business needs.",
    icon: <Monitor className="w-16 h-16 text-green-400" />,
  },
  {
    title: "Web App Development",
    description:
      "Build innovative and scalable web applications that deliver exceptional user experiences. We focus on creating robust front-end and back-end architectures, smooth interactivity, and secure integrations. Our applications are designed to handle high traffic, complex workflows, and provide intuitive user interfaces for maximum engagement.",
    icon: <Server className="w-16 h-16 text-green-400" />,
  },
  {
    title: "CMS Development",
    description:
      "Create SEO-friendly, responsive, and feature-rich content management systems tailored to your business. We design CMS platforms with easy content management, robust security, and scalable architecture. Enhance your digital presence with customized CMS solutions that streamline content workflows and improve user engagement.",
    icon: <Database className="w-16 h-16 text-green-400" />,
  },
  {
    title: "Third-Party Integration",
    description:
      "Seamlessly integrate third-party APIs, payment gateways, and other services to enhance your web solutions. Our experts ensure smooth connectivity, efficient data flow, and secure interactions with external systems. Maximize functionality, reduce manual work, and optimize the performance of your website or application with reliable integrations.",
    icon: <Box className="w-16 h-16 text-green-400" />,
  },
];

export default function SoftrreeWebServices() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevService = () => {
    setActiveIndex((prev) => (prev === 0 ? webServices.length - 1 : prev - 1));
  };

  const nextService = () => {
    setActiveIndex((prev) => (prev === webServices.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-32 bg-black text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          End-to-End Web Development Services
        </h2>
        <p className="text-gray-300 mb-16 max-w-4xl mx-auto text-lg md:text-xl">
          Softree provides a complete web development journey, from planning and
          design to deployment and support, ensuring world-class results.
        </p>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-gray-800/80 to-black/80 backdrop-blur-xl border border-gray-700 p-12 md:p-16 rounded-3xl shadow-2xl flex flex-col items-center text-center hover:scale-105 transition-transform duration-500"
            >
              {/* Icon in a circular background */}
              <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-green-400 shadow-lg text-white text-3xl">
                {webServices[activeIndex].icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                {webServices[activeIndex].title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 text-lg md:text-xl max-w-xl">
                {webServices[activeIndex].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12">
            <button
              onClick={prevService}
              className="flex items-center gap-3 px-8 py-4 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors text-white shadow-xl text-lg md:text-xl"
            >
              <ArrowLeft className="w-6 h-6" />
              Prev
            </button>
            <button
              onClick={nextService}
              className="flex items-center gap-3 px-8 py-4 rounded-full bg-green-400 hover:bg-green-500 transition-colors text-black shadow-xl text-lg md:text-xl"
            >
              Next
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
