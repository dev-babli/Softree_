"use client";

import React from "react";
import ProductArcSlider from "./ProductArcSlider";
import InfoSection from "./InfoSection";

/**
 * FeaturesShowcase
 *
 * Two stacked sections (`ProductArcSlider` + `InfoSection`) sharing one
 * continuous cream `#F3F0EE` canvas.
 */
export default function FeaturesShowcase() {
  return (
    <div className="relative w-full" style={{ backgroundColor: "#F3F0EE" }}>
      <ProductArcSlider />
      <InfoSection />
    </div>
  );
}
