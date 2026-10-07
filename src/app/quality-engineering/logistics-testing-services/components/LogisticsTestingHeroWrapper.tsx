'use client';

import React from 'react';
import Hero from '@/app/industries/offshore-logistics-supply-chain-engineering/components/animated-shader-hero';

export default function LogisticsTestingHeroWrapper() {
  return (
    <Hero
      trustBadge={{
        text: "LOGISTICS TESTING SERVICES"
      }}
      headline={{
        line1: "Your Offshore",
        line2: "Logistics Software Testing & QA Partner"
      }}
      subtitle="Validate logistics and supply chain applications with comprehensive software testing across TMS, WMS, warehouse automation, visibility platforms, EDI integrations, APIs, and enterprise logistics systems."
    />
  );
}
