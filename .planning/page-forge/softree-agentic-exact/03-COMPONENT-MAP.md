# Component Map

| # | Component | Source | Notes |
| --- | --- | --- | --- |
| 0 | `SoftreeAgenticHeader` | `header.k2-header` | Exact reference header DOM rendered as `<header>` |
| 0b | `SoftreeAgenticScrollNav` | `nav.k2-scroll-nav` | Original side anchor nav rendered as `<nav>` |
| 0c | `SoftreeAgenticIntroTransition` | Hero background asset / page shell | Page-scoped Barba once transition with typewriter loader and falling hero reveal, verified in `07-BARBA-INTRO.md` |
| 0d | `SoftreeAgenticLightMiddleGroup` | `div.k2-theme-light` | Restores source wrapper around agents, AI programmable, and pillars so middle sections inherit the exact light-theme context, verified in `08-MIDDLE-FIX.md` |
| 1 | `SoftreeAgenticMeetSection` / `SoftreeAgenticHeroSection` | `meet-artemis` | Hand-authored React hero component, verified in `04a-HERO.md` |
| 2 | `SoftreeAgenticOutcomesSection` / `SoftreeAgenticOutcomesSection` | `enterprise-ai-outcomes` | Hand-authored React outcomes component, verified in `04b-OUTCOMES.md` |
| 3 | `SoftreeAgenticAgentsSection` / `SoftreeAgenticAgentsSection` | `ai-agents` | Hand-authored React tab component, verified in `04c-AGENTS.md` |
| 4 | `SoftreeAgenticProgrammableSection` / `SoftreeAgenticProgrammableOrbitSection` | `ai-programmable` | Exact orbit DOM with component-owned scroll step behavior, verified in `04d-AI-PROGRAMMABLE.md` |
| 5 | `SoftreeAgenticPillarsSection` / `KorePillarsExactSection` | `pillars` | Exact pillar DOM with modal trigger verified in `04e-PILLARS.md` |
| 6 | `SoftreeAgenticBuildScaleOptimizeSection` / `KoreBuildScaleOptimizeExactSection` | `build-scale-optimize` | Exact tabbed DOM with local tab/autoplay initializer, verified in `04f-BUILD-SCALE-OPTIMIZE.md` |
| 7 | `SoftreeAgenticSection7Section` / `SoftreeAgenticDemoVideoSection` | demo video `k2-section` | Exact video DOM with component-owned play/pause/progress/booking popup, verified in `04g-DEMO-VIDEO.md` |
| 8 | `SoftreeAgenticScrollTabsSection` / `SoftreeAgenticScrollTabsSection` | `k2-section k2-section-scroll-tabs` | Exact scroll-tabs DOM with live ScrollTrigger/fallback progress behavior, verified in `04h-SCROLL-TABS.md` |
| 9 | `SoftreeAgenticGetStartedSection` / `KoreGetStartedExactSection` | `get-started` | Exact prefooter DOM with local reveal behavior, verified in `04i-GET-STARTED.md` |
| 10 | `SoftreeAgenticHeader` / `SoftreeAgenticScrollNav` | `header.k2-header`, `nav.k2-scroll-nav` | Exact shell DOM with page-level current-link and scroll-nav state, verified in `04j-SHELL.md` |
| 11 | `SoftreeAgenticFooter` | `footer.k2-footer` | Exact footer DOM with route-current state, verified in `04j-SHELL.md` |
| 12 | `SoftreeAgenticReferenceModals` | `dialog` | Original modal DOM with page-level open/close controller, verified in `04j-SHELL.md` |
