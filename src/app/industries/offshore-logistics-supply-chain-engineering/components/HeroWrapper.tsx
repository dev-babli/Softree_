'use client';

import React from 'react';
import Hero from './animated-shader-hero';

export default function LogisticsHero() {
  const handlePrimaryClick = () => {
    window.location.href = '/contact';
  };

  const handleSecondaryClick = () => {
    window.location.href = '/contact';
  };

  return (
    <Hero
      trustBadge={{
        text: "OFFSHORE LOGISTICS & SUPPLY CHAIN ENGINEERING"
      }}
      headline={{
        line1: "Accelerate Logistics & Supply Chain Transformation",
        line2: "With an Offshore Engineering Team"
      }}
      subtitle="Extend your technology capabilities with dedicated offshore engineers who build scalable software, automate complex operations, integrate enterprise systems, and deliver AI, data, and cloud solutions."
      buttons={{
        primary: {
          text: "Talk to a Logistics Expert",
          onClick: handlePrimaryClick
        },
        secondary: {
          text: "Build Your Offshore Team",
          onClick: handleSecondaryClick
        }
      }}
    />
  );
}
