import React from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import NavigationClient from '@/components/sections/navigation-client';
import Footer from '@/components/sections/footer';
import LogisticsHero from './components/HeroWrapper';

const LogisticsUseCases = dynamic(() => import('./components/LogisticsUseCases'), { ssr: true });
const LogisticsDeliveryFramework = dynamic(() => import('./components/LogisticsDeliveryFramework'), { ssr: true });
const LogisticsFAQ = dynamic(() => import('./components/LogisticsFAQ'), { ssr: true });
const LightContactSection = dynamic(() => import('@/components/homepage-light/LightContactSection'), { ssr: true });

const PAGE_URL = 'https://www.softreetechnology.com/industries/offshore-logistics-supply-chain-engineering';

export const metadata: Metadata = {
  title: 'Offshore Logistics & Supply Chain Engineering Services | Softree',
  description: 'Transform logistics and supply chain operations with Softree’s offshore engineering team. Build scalable software, automation, AI, data, integration, and cloud solutions.',
  alternates: {
    canonical: PAGE_URL,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function LogisticsSolutionsPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-orange-500 selection:text-white overflow-x-clip">
      <NavigationClient />
      <LogisticsHero />
      <LogisticsUseCases />
      <LogisticsDeliveryFramework />
      <LogisticsFAQ />
      <LightContactSection />
      <Footer />
    </main>
  );
}
