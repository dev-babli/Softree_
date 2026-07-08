# Build

## Files created

- `src/components/generative-ai/data.ts`
- `src/components/generative-ai/generative-ai-intro.ts`
- `src/components/generative-ai/generative-ai-loader.css`
- `src/components/generative-ai/GenerativeAiPageLoader.tsx`
- `src/components/generative-ai/GenerativeAiPage.tsx`
- `src/components/generative-ai/primitives/GenSection.tsx`
- `src/components/generative-ai/sections/GenAiHero.tsx`
- `src/components/generative-ai/sections/GenAiServices.tsx`
- `src/components/generative-ai/sections/GenAiModels.tsx`
- `src/components/generative-ai/sections/GenAiIndustry.tsx`
- `src/components/generative-ai/sections/GenAiFramework.tsx`
- `src/components/generative-ai/sections/GenAiProcess.tsx`
- `src/components/generative-ai/sections/GenAiWhy.tsx`
- `src/app/services/offshore-generative-ai-development/layout.tsx`

## Files modified

- `src/app/services/offshore-generative-ai-development/page.tsx` — wires `GenerativeAiPage`, preserves metadata/FAQs/nav/footer

## Legacy (unwired, kept)

- `hero.tsx`, `services.tsx`, `sticky-models.tsx`, `process.tsx`, `industry.tsx`, `gen-frame.tsx`, `why-gen-ai.tsx`, etc.

## Deviations from map

- None material. Sticky models use CSS sticky (no GSAP pin) as planned.
- Hero stats are qualitative labels (2013 / Azure / End-to-end), not invented conversion metrics.
