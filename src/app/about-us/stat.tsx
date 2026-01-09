"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  FaGlobe,
  FaProjectDiagram,
  FaUsers,
  FaBuilding,
  FaHandshake,
  FaCogs,
  FaTasks,
  FaLaptopCode,
  FaSmile,
} from "react-icons/fa";

const statsData = [
  { value: 20, label: "Years of Excellence", icon: <FaBuilding className="w-6 h-6 mb-2" /> },
  { value: 800, label: "Skilled Professionals", icon: <FaUsers className="w-6 h-6 mb-2" /> },
  { value: 3000, label: "Projects Completed", icon: <FaProjectDiagram className="w-6 h-6 mb-2" /> },
  { value: 10, label: "Global Offices", icon: <FaGlobe className="w-6 h-6 mb-2" /> },
  { value: 25, label: "Countries Served", icon: <FaHandshake className="w-6 h-6 mb-2" /> },
  { value: 12, label: "Technology Partners", icon: <FaCogs className="w-6 h-6 mb-2" /> },
  { label: "Quality Processes", description: "ISO & CMMI Standards", icon: <FaTasks className="w-6 h-6 mb-2" /> },
  { label: "DevOps Practices", description: "Continuous Delivery", icon: <FaLaptopCode className="w-6 h-6 mb-2" /> },
  { label: "Client Engagement", description: "Customer First Approach", icon: <FaSmile className="w-6 h-6 mb-2" /> },
];

export default function FactsAtAGlance() {
  const [counts, setCounts] = useState<number[]>(statsData.map(stat => stat.value || 0));
  const leftRef = useRef<HTMLUListElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  // Animate counters
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    statsData.forEach((stat, index) => {
      if (!stat.value) return;
      let start = 0;
      const end = stat.value;
      const duration = 1200;
      const increment = end / (duration / 10);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setCounts(prev => {
          const newCounts = [...prev];
          newCounts[index] = Math.ceil(start);
          return newCounts;
        });
      }, 10);
      timers.push(timer);
    });

    return () => timers.forEach(timer => clearInterval(timer));
  }, []);

  // Equal height for left and right
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (leftRef.current && rightRef.current) {
        const maxHeight = Math.max(leftRef.current.clientHeight, rightRef.current.clientHeight);
        leftRef.current.style.height = `${maxHeight}px`;
        rightRef.current.style.height = `${maxHeight}px`;
      }
    });

    if (leftRef.current && rightRef.current) {
      resizeObserver.observe(leftRef.current);
      resizeObserver.observe(rightRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <section className="bg-black py-16 text-white">
      {/* Header */}
      <div className="container mx-auto text-center mb-16 px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Achievements At A Glance</h2>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl">
          We empower businesses to embrace digital transformation, scale faster, and innovate with cutting-edge technology solutions.
        </p>
      </div>

      {/* Left-Right Layout */}
      <div className="flex flex-col lg:flex-row items-start gap-12 container mx-auto px-4">
        {/* LEFT: Stats */}
        <ul
          ref={leftRef}
          className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-500 p-6 rounded-xl"
        >
          {statsData.map((stat, idx) => (
            <li
              key={idx}
              className="flex flex-col items-center text-center bg-black/30 rounded-lg p-4 hover:bg-black/50 transition duration-300 shadow-lg"
            >
              <div className="text-white">{stat.icon}</div>
              {stat.value ? (
                <span className="text-3xl md:text-4xl font-bold block mb-2 mt-2">{counts[idx]}+</span>
              ) : (
                <span className="text-2xl font-semibold block mb-1 mt-2">{stat.label}</span>
              )}
              <span className="text-gray-200">{stat.description || stat.label}</span>
            </li>
          ))}
        </ul>

        {/* RIGHT: Image */}
        <div ref={rightRef} className="flex-1 flex justify-center lg:justify-end">
          <img
            src="/images/about-us.jpg"
            alt="Our Achievements"
            className="rounded-xl shadow-lg object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
