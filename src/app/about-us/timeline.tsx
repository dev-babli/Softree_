"use client";

import React from "react";

const timelineData = [
  {
    year: "2007",
    title: "Founding",
    description:
      "Right People Group was created by consultants Henrik Arent and Søren Rosenmeier in Copenhagen. The ambition was to deliver exactly the right competencies as soon as the need arises.",
  },
  {
    year: "2010",
    title: "Growth",
    description:
      "Increasing customer satisfaction and digital acceleration became key to success. RPG built a strong network of customers and consultants based on speed, quality, and reliability.",
  },
  {
    year: "2015",
    title: "Expansion",
    description:
      "Established office in Berlin, growing customer engagement and delivering to 10+ countries. Trusted advisor in sectors from healthcare and finance to defense.",
  },
  {
    year: "Now",
    title: "Scaling",
    description:
      "Expanding focus on growth and M&A under Jesper Geisler as Group CEO. RPG was acquired by private equity fund Capidea in 2023, continuing to create value through closer customer relationships.",
  },
];

export default function HorizontalTimeline() {
  return (
    <div className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6 bg-gradient-to-b from-gray-900 via-gray-800 to-black rounded-3xl p-10">
        
        {/* Heading Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 drop-shadow-lg">
            From Vision to Reality
          </h2>

          <h3 className="text-xl md:text-2xl text-gray-300 mt-4">
            Milestones that define who we are
          </h3>

          <p className="text-gray-400 max-w-2xl mx-auto mt-4 text-base md:text-lg">
            From humble beginnings to remarkable growth, our journey reflects our commitment 
            to innovation, excellence, and delivering the right solutions at the right time.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="flex justify-center space-x-20 min-w-[1000px]">
          {timelineData.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center min-w-[250px]"
            >
              {/* Dot */}
              <div className="w-12 h-12 bg-gradient-to-tr from-green-400 to-blue-500 rounded-full border-4 border-white mb-4"></div>

              {/* Year */}
              <span className="text-gray-400 font-semibold text-lg mb-4">{item.year}</span>

              {/* Card */}
              <div className="p-6 w-72 h-64 bg-gradient-to-b from-gray-800 to-black rounded-2xl shadow-xl border-b-4 border-gray-500 flex flex-col justify-between">
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-gray-300 mt-2 text-base">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
