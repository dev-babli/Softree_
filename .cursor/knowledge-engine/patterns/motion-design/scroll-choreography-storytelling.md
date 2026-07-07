---
id: pattern.scroll-choreography-storytelling
title: Scroll Choreography Storytelling Pattern
category: pattern
domain: motion-design
tags:
  - pattern
  - scroll
  - gsap
  - storytelling
  - awwwards
summary: Use pinned scroll-driven sequences (GSAP ScrollTrigger pin + scrub) to unfold a product narrative — the signature pattern of Apple product pages and Awwwards winners.
confidence: 0.88
version: 1.0.0
lastUpdated: 2026-07-07
sources:
  - type: observation
    ref: apple.com product pages — pinned section scroll behavior
    confidence: 0.9
    retrievedAt: 2026-07-07
  - type: observation
    ref: kore.ai platform pages — section narrative arc
    confidence: 0.85
    retrievedAt: 2026-07-07
  - type: internal
    ref: .cursor/atlas-revamp-super-prompt.md
    confidence: 0.95
    retrievedAt: 2026-07-07
related:
  - consulting.thinking-principles
  - playbook.website-audit
status: verified
---

## Summary

Scroll position drives narrative: headlines assemble, diagrams draw, numbers count, sections pin while content progresses. One crafted sequence per flagship page minimum.

## Core Concepts

- **Pin + scrub:** Section stays fixed while scroll progress animates inner timeline (0→1).
- **Narrative arc:** Hook → problem → mechanism → proof → CTA — mapped to scroll zones.
- **Easing:** cubic-bezier(0.16, 1, 0.3, 1); entrances 400–800ms; stagger 40–80ms.
- **Performance:** transform/opacity only; 60fps; no layout shift.

## Best Practices

- One primary pinned sequence per page — not five competing pins.
- Degrade gracefully on mobile: shorter pin or static layout with fade reveals.
- Respect `prefers-reduced-motion`: show final states, skip scrub.
- Read gsap-scrolltrigger + gsap-react skills before implementation.

## Common Mistakes

- Pinning everything → scroll jank and user fatigue.
- Linear easing → feels robotic.
- Animating width/height/top/left → layout thrashing.
- Scroll effects that block reading on 3rd visit.

## Decision Framework

**When to use:** Flagship pages (About, main AI hub, hero service pages) where story justifies craft investment.

**When not to use:** FAQ pages, legal, dense documentation, low-traffic secondary pages.

## Implementation Guide

1. UX Architect maps narrative beats to scroll zones.
2. Motion Engineer builds GSAP timeline synced to ScrollTrigger scrub.
3. Responsive Engineer defines mobile fallback.
4. Performance Engineer verifies no CLS, 60fps on mid-tier laptop.
5. Verifier compares motion to reference screenshots.

## Trade-offs

High craft cost vs. maintenance burden. Budget 2–6 verifier loops on flagships.

## References

- GSAP ScrollTrigger docs (official)
- atom:consulting.thinking-principles (3rd-visit test)

## Related Topics

- pattern.business-outcomes-first
- playbook.website-audit

## Future Research

- Barba.js + ScrollTrigger coexistence patterns in Next.js App Router
