"use client";

import React from "react";
import Image from "next/image";

const TechnologyStack = () => {
  return (
    <section className="bg-black py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Wrapper */}
        <div className="grid md:grid-cols-2 gap-12 items-stretch">

          {/* LEFT – TEXT CARD */}
          <div className="h-full flex flex-col justify-between
                          bg-white/5 backdrop-blur-md
                          border border-white/10 rounded-2xl p-10 shadow-lg
                          transition hover:shadow-[0_8px_24px_-6px_rgba(34,197,94,0.35)]">
            <div>
              <h2 className="text-4xl md:text-5xl font-semibold text-white">
                Technology Stack
              </h2>

              {/* Accent Divider */}
              <div className="w-20 h-1 bg-green-500 mt-5 mb-8 rounded-full"></div>

              <p className="text-gray-300 text-lg leading-relaxed">
                Softree delivers enterprise-grade SharePoint solutions across
                SharePoint Server 2016, 2019, Subscription Edition (SE), and
                SharePoint Online (Microsoft 365). Our modern SharePoint
                technology stack includes SPFx, React, TypeScript, and PnP
                libraries, combined with secure authentication standards such as
                SAML, Identity Provider (IdP), Federation Authentication (rtFA),
                and OIDC—ensuring scalable, compliant, and future-ready digital
                solutions.
              </p>
            </div>
          </div>

          {/* RIGHT – IMAGE CARD */}
          <div className="h-full bg-white/5 backdrop-blur-md
                          border border-white/10 rounded-2xl overflow-hidden shadow-lg
                          transition hover:shadow-[0_8px_24px_-6px_rgba(34,197,94,0.35)]">
            <div className="relative h-full w-full">
              <Image
                src="/images/sharepoint/sp.png"
                alt="Softree Technology Stack"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TechnologyStack;
