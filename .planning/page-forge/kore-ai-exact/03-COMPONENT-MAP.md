# Component Map

| # | Component | Source | Notes |
| --- | --- | --- | --- |
| 0 | `KoreAiHeader` | `header.k2-header` | Exact reference header DOM rendered as `<header>` |
| 0b | `KoreAiScrollNav` | `nav.k2-scroll-nav` | Original side anchor nav rendered as `<nav>` |
| 0c | `KoreBarbaIntroTransition` | Hero background asset / page shell | Page-scoped Barba once transition with typewriter loader and falling hero reveal, verified in `07-BARBA-INTRO.md` |
| 0d | `KoreAiLightMiddleGroup` | `div.k2-theme-light` | Restores source wrapper around agents, AI programmable, and pillars so middle sections inherit the exact light-theme context, verified in `08-MIDDLE-FIX.md` |
| 1 | `KoreMeetArtemisSection` / `KoreHeroSection` | `meet-artemis` | Hand-authored React hero component, verified in `04a-HERO.md` |
| 2 | `KoreEnterpriseAiOutcomesSection` / `KoreEnterpriseOutcomesSection` | `enterprise-ai-outcomes` | Hand-authored React outcomes component, verified in `04b-OUTCOMES.md` |
| 3 | `KoreAiAgentsSection` / `KoreAgentsSection` | `ai-agents` | Hand-authored React tab component, verified in `04c-AGENTS.md` |
| 4 | `KoreAiProgrammableSection` / `KoreAiProgrammableOrbitSection` | `ai-programmable` | Exact orbit DOM with component-owned scroll step behavior, verified in `04d-AI-PROGRAMMABLE.md` |
| 5 | `KorePillarsSection` / `KorePillarsExactSection` | `pillars` | Exact pillar DOM with modal trigger verified in `04e-PILLARS.md` |
| 6 | `KoreBuildScaleOptimizeSection` / `KoreBuildScaleOptimizeExactSection` | `build-scale-optimize` | Exact tabbed DOM with local tab/autoplay initializer, verified in `04f-BUILD-SCALE-OPTIMIZE.md` |
| 7 | `KoreSection7Section` / `KoreDemoVideoSection` | demo video `k2-section` | Exact video DOM with component-owned play/pause/progress/booking popup, verified in `04g-DEMO-VIDEO.md` |
| 8 | `KoreK2SectionScrollTabsSection` / `KoreScrollTabsSection` | `k2-section k2-section-scroll-tabs` | Exact scroll-tabs DOM with live ScrollTrigger/fallback progress behavior, verified in `04h-SCROLL-TABS.md` |
| 9 | `KoreGetStartedSection` / `KoreGetStartedExactSection` | `get-started` | Exact prefooter DOM with local reveal behavior, verified in `04i-GET-STARTED.md` |
| 10 | `KoreAiHeader` / `KoreAiScrollNav` | `header.k2-header`, `nav.k2-scroll-nav` | Exact shell DOM with page-level current-link and scroll-nav state, verified in `04j-SHELL.md` |
| 11 | `KoreAiFooter` | `footer.k2-footer` | Exact footer DOM with route-current state, verified in `04j-SHELL.md` |
| 12 | `KoreAiReferenceModals` | `dialog` | Original modal DOM with page-level open/close controller, verified in `04j-SHELL.md` |
