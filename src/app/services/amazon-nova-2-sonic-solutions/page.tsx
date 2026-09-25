import React from 'react';
import { Metadata } from 'next';
import NavigationClient from '@/components/sections/navigation-client';
import Footer from '@/components/sections/footer';
import Hero from './components/Hero';
import dynamic from 'next/dynamic';
import TrustedBrandsMarquee from './components/trust';
import '@/styles/typography.css';

const NovaVoiceSolutionsArc = dynamic(() => import('./components/NovaVoiceSolutionsArc'), {
  ssr: true,
  loading: () => <div className="w-full min-h-[420px] bg-slate-50/50 animate-pulse rounded-2xl" aria-hidden="true" />,
});

const LightContactSection = dynamic(() => import('@/components/homepage-light/LightContactSection'), { ssr: true });
const FAQ = dynamic(() => import('./components/FAQ'), { ssr: true });
const WhatYouCanBuild = dynamic(() => import('./components/WhatYouCanBuild').then((mod) => mod.WhatYouCanBuild), { ssr: true });
const NetworkGlobe = dynamic(() => import('./components/NetworkGlobe'), {
  ssr: true,
  loading: () => <div className="w-full h-full min-h-[380px] bg-slate-900/10 animate-pulse rounded-3xl" aria-hidden="true" />,
});
const Nova2SonicDevelopmentApproach = dynamic(() => import('./components/Nova2SonicDevelopmentApproach'), { ssr: true });
const AmazonNovaVoiceAiCapabilities = dynamic(() => import('./components/AmazonNovaVoiceAiCapabilities'), { ssr: true });
const HowWeBuildIt = dynamic(() => import('./components/HowWeBuildIt'), { ssr: true });
const WhyChooseSoftree = dynamic(() => import('./components/WhyChooseSoftree'), { ssr: true });
const TrustAndReadiness = dynamic(() => import('./components/TrustAndReadiness'), { ssr: true });
const FeaturedCaseStudies = dynamic(() => import('./components/FeaturedCaseStudies'), { ssr: true });

const PAGE_URL = 'https://www.softreetechnology.com/services/amazon-nova-2-sonic-solutions';

export const metadata: Metadata = {
  title: 'Amazon Nova 2 Sonic Development Services | Softree',
  description: 'Build real-time voice AI applications with Amazon Nova 2 Sonic and Amazon Bedrock. Softree delivers production-ready voice agents with offshore engineering expertise.',
  alternates: {
    canonical: PAGE_URL,
  },
};

export default function AmazonNova2SonicDevelopmentPage() {
  return (
    <main className="min-h-screen bg-white typo-body text-slate-900 selection:bg-orange-500 selection:text-white overflow-x-clip">
      <NavigationClient />

      {/* Hero Section which also includes the Trust Strip */}
      <Hero />

      {/* Two-Column Layout: What You Can Build & Global Network */}
      <div className="bg-white py-10 md:py-14">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-[2cm]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left Column: What You Can Build */}
            <div className="lg:col-span-6 flex flex-col h-full">
              <WhatYouCanBuild />
            </div>
            {/* Right Column: Global Presence (NetworkGlobe) */}
            <div className="lg:col-span-6 w-full flex flex-col h-full">
              <div className="w-full h-full max-w-[550px] lg:max-w-none flex flex-col mx-auto lg:ml-auto">
                <NetworkGlobe
                  heading="Deploying voice AI globally"
                  tagline="Global Reach. Local Execution."
                  subheading="Trusted by businesses across 13+ countries, our offshore engineering teams build and deploy scalable real-time voice AI solutions."
                  storesLabel="13+ countries served"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <NovaVoiceSolutionsArc />
      <Nova2SonicDevelopmentApproach />

      <AmazonNovaVoiceAiCapabilities />
      <HowWeBuildIt />
      <TrustAndReadiness />
      {/* <FeaturedCaseStudies /> */}
      <TrustedBrandsMarquee />
      <WhyChooseSoftree />
      <FAQ />
      <LightContactSection />
      <Footer />
    </main>
  );
}
