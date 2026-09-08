import React from 'react';
import { Metadata } from 'next';
import CurtainSliderPageClient from './CurtainSliderPageClient';

export const metadata: Metadata = {
  title: 'Curtain Slider Animation Demo | Softree Technology',
  description: 'Experience the premium full-bleed curtain slider animation: direction-aware clip-path wipes, staggered column actions, rolling text titles, and native pointer dragging.',
  openGraph: {
    title: 'Curtain Slider Animation Demo | Softree Technology',
    description: 'Experience the premium full-bleed curtain slider animation: direction-aware clip-path wipes, staggered column actions, rolling text titles, and native pointer dragging.',
    type: 'website',
  },
};

export default function CurtainSliderPage() {
  return <CurtainSliderPageClient />;
}
