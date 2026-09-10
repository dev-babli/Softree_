import React from "react";
import type { Metadata } from "next";
import NavigationClient from "@/components/sections/navigation-client";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import Footer from "@/components/sections/footer";

import Hero from "./components/Hero";
import Audiences from "./components/Audiences";
import HowWeHelp from "./components/HowWeHelp";
import WhoDoWeServeCTA from "./components/WhoDoWeServeCTA";

export const metadata: Metadata = {
  title: "Who Do We Serve? | Softree",
  description:
    "Discover who Softree serves and partners with to deliver innovative technology solutions.",
};

export default function WhoDoWeServePage() {
  return (
    <main className="flex min-h-screen w-full flex-col overflow-x-hidden bg-white font-sans text-base text-[#0A0F3C] antialiased">
      <NavigationClient />
      
      <Hero />
      <Audiences />
      <HowWeHelp />

      <WhoDoWeServeCTA />
      <LightContactSection />
      <Footer />
    </main>
  );
}
