# About Intro + Globe

The homepage About block: left copy + right dotted globe with 6 marker cards.

## Files

| File | Role |
|---|---|
| `AboutIntroGlobe.tsx` | Full section (headline, stats, capability rows, CTA, globe) |
| `AboutGlobeMarkers.tsx` | Globe, orbital rings, dashed lines, 6 cards |
| `globe.tsx` | Cobe WebGL globe |
| `SectionHeader.tsx` | ABOUT US badge + headline |

## Drop into a Next.js + Tailwind app

1. Copy these files into a folder, e.g. `src/components/about-intro-globe/`.
2. Install: `npm i cobe framer-motion lucide-react`
3. Import:

```tsx
import AboutIntroGlobe from "@/components/about-intro-globe/AboutIntroGlobe";

<AboutIntroGlobe />
```

Brand colors: orange `#FF5812`, ink `#0a0a1a`.
