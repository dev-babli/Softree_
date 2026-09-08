import React from 'react';
import Hero from './components/Hero/Hero';
import NavigationClient from '@/components/sections/navigation-client';
import WhyChoose from "./components/WhyChoose/WhyChoose";

export const metadata = {
  title: 'AI & IT Development Services | Softree Technology',
  description: 'AI-powered software development and IT solutions designed to help businesses innovate, automate, and scale.',
};

export default function AiItDevelopmentServicesPage() {
  return (
    <main className="flex min-h-screen flex-col w-full overflow-hidden">
      <NavigationClient />
      <Hero />
      <WhyChoose />
    </main>
  );
}
