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
  title: "Who We Serve | Industries & Businesses We Empower",

  description:
    "Explore the industries, organizations, and businesses Softree serves with AI, cloud, data analytics, software development, and digital transformation solutions.",

  keywords: [
    "Softree Technology",
    "Softree",
    "technology solutions",
    "digital transformation",
    "AI solutions",
    "enterprise software solutions",
    "cloud solutions",
    "data analytics",
    "software development",
    "business technology solutions",
    "IT solutions for businesses",
    "enterprise technology services",
    "AI consulting",
  ],

  alternates: {
    canonical: "https://www.softree.com/who-do-we-serve",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "Who We Serve | Industries & Businesses We Empower | Softree Technology",
    description:
      "Discover how Softree partners with businesses and organizations across industries through AI, cloud, data, and digital transformation solutions.",
    url: "https://www.softree.com/who-do-we-serve",
    siteName: "Softree Technology",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://www.softree.com/images/who-we-serve-og.jpg",
        width: 1200,
        height: 630,
        alt: "Softree Technology - Who We Serve",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Who We Serve | Industries & Businesses We Empower | Softree Technology",
    description:
      "Explore the industries and organizations Softree supports with AI, cloud, analytics, software, and digital transformation solutions.",
    images: ["https://www.softree.com/images/who-we-serve-og.jpg"],
  },

  category: "Technology",
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
