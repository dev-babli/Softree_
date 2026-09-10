"use client";

import React from "react";
import { COUNTRIES_SERVED } from "@/lib/constants";
import { LogisticsWhoWeHelp } from "./LogisticsWhoWeHelp";
import LogisticsNetworkGlobe from "./LogisticsNetworkGlobe";

export default function LogisticsUseCases() {
  return (
    <div className="bg-white pt-6 md:pt-8 pb-6 md:pb-8 text-slate-900">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-[2cm]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Who We Help */}
          <div className="lg:col-span-6 flex flex-col h-full">
            <LogisticsWhoWeHelp />
          </div>
          {/* Right Column: Global Presence (LogisticsNetworkGlobe) */}
          <div className="lg:col-span-6 w-full flex flex-col h-full">
            <div className="w-full h-full max-w-[650px] lg:max-w-none flex flex-col mx-auto lg:ml-auto">
              <LogisticsNetworkGlobe
                heading="Where we operate"
                tagline="Global Reach. Local Understanding."
                subheading="Trusted by businesses across 13+ countries, we deliver technology solutions that help organizations build, scale, and transform digitally."
                storesLabel="13+ countries served"
                caption="Trusted by businesses across 13+ countries, we deliver technology solutions that help organizations build, scale, and transform digitally."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
