"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FlowButton } from '@/components/ui/flow-button';

export default function SuccessStoryCTA() {
  return (
    <div className="flex justify-center w-full mt-6 lg:mt-10 relative z-20">
      <FlowButton 
        text="Explore More Success Stories"
        variant="orange-outline"
      />
    </div>
  );
}
