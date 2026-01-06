"use client";

import React from "react";

const PowerAppsSection: React.FC = () => {
  return (
    <div className="my-10 flex justify-center bg-black px-4 sm:px-6 md:px-12 lg:px-20">
      <section className="w-full max-w-7xl mx-auto">
        {/* Container for text + image */}
        <div
          className="w-full flex flex-col md:flex-row items-center gap-8
            bg-gradient-to-r from-gray-900 via-black to-gray-800 
            rounded-2xl p-8 md:p-12 border-b-4 border-gray-700 shadow-lg
            transition-all hover:scale-[1.01]"
        >
          {/* Text Content */}
          <div className="flex-1 text-white max-w-xl">
            <h3 className="text-3xl md:text-4xl font-extrabold mb-5 tracking-tight text-center md:text-left">
              Hire a <span className="text-green-500">Dedicated PowerApps</span> Developer
            </h3>
            <p className="mb-4 text-gray-300 leading-relaxed text-center md:text-left">
              Witness the true power of Microsoft PowerApps with Softree Technology and build enterprise applications in the shortest time possible. Our certified PowerApps consultants will enrich your traditional work process and help you gain more control over your business application development, SharePoint development, Office 365, and more.
            </p>
            <p className="mb-4 text-gray-300 leading-relaxed text-center md:text-left">
              Let our Microsoft PowerApps services empower your organization to optimize your business functionalities the best way possible. Call us at{" "}
              <a
                href="tel:+917008699927"
                className="text-green-500 underline hover:text-green-400 transition-colors"
              >
                +91-7008699927
              </a>{" "}
              or email{" "}
              <a
                href="mailto:sales@softreetechnology.com"
                className="text-green-500 underline hover:text-green-400 transition-colors"
              >
                sales@softreetechnology.com
              </a>{" "}
              for a quick consultation with our dedicated support team.
            </p>
          </div>

          {/* Image */}
          <div className="flex-1 flex justify-center md:justify-end">
            <img
              src="https://www.softreetechnology.com/wp-content/uploads/2024/08/powerappps-300x288.webp"
              alt="PowerApps"
              className="w-full md:w-[552px] h-[400px] md:h-[450px] rounded-xl object-cover transition-transform duration-500 hover:scale-105 shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PowerAppsSection;
