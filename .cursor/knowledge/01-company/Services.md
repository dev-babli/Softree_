---
id: company.services
title: Services
category: atom
domain: company
knowledgeFolder: 01-company
fileName: Services.md
tags:
  - company
  - services
  - routes
summary: Production service routes and offerings mapped from Softree_ src/app/services/** and navigation.tsx (July 2026 repo scan).
confidence: 0.92
version: 1.1.0
lastVerified: 2026-07-13
lastUpdated: 2026-07-13
sources:
  - type: internal
    ref: src/components/sections/navigation.tsx
    confidence: 0.95
    retrievedAt: 2026-07-13
  - type: internal
    ref: src/app/services/
    confidence: 0.95
    retrievedAt: 2026-07-13
  - type: url
    ref: https://softreetechnology.com/services
    confidence: 0.9
    retrievedAt: 2026-07-13
related:
  - company.softree
status: verified
---

## Summary

Softree production services are organized under `/services` with offshore delivery positioning across AI, Microsoft stack, data, and application modernization. Nav authority: `src/components/sections/navigation.tsx`.

## Production Service Routes

| Route | Nav label | Category |
|-------|-----------|----------|
| `/services` | Services hub | Index |
| `/services/offshore-ai-development` | AI Agents | AI |
| `/services/offshore-generative-ai-development` | Generative AI | AI |
| `/services/ai-powered-test-automation` | AI Test Automation | AI |
| `/services/offshore-power-platform-development` | Power Apps / Automate / Dataverse | Microsoft |
| `/services/offshore-data-analytics` | Power BI / Databricks / Snowflake | Data |
| `/services/offshore-microsoft-fabric` | Microsoft Fabric | Data |
| `/services/offshore-sharepoint-development` | SharePoint Online | Digital workspace |
| `/services/offshore-spfx-development` | SPFx Development | Digital workspace |
| `/services/offshore-web-app-development` | Web Applications | Apps |
| `/services/offshore-mobile-app-development` | Mobile Applications | Apps |
| `/services/mvp` | MVP Development | Startups |
| `/services/legacy-application-modernization` | Legacy Modernization | Modernization |
| `/services/website-modernization` | Website Modernisation | Modernization (active-build / ATLAS revamp target) |

## Flagship Adjacent Pages (not under /services)

| Route | Purpose |
|-------|---------|
| `/ai` | AI solutions hub |
| `/agentic-ai-platform` | Agentic platform exact clone (active-build, not yet in nav/sitemap) |
| `/webanalyser` | AI website intelligence lead magnet |

## Positioning Pattern

- **Offshore velocity** + **Microsoft stack depth** (Copilot Studio, Azure AI, Power Platform)
- **Outcomes language** over technology labels (per BrandPositioning.md)
- Website modernization funnel ties to ATLAS audit rubrics (`web-revamp-super-prompt.md`)

## Gaps

- Nav link `/geo` in navigation.tsx has **no matching route** (engineering debt)
- `header.tsx` lists stale URLs (`/services/mobile-app-development`) — not production nav

## References

- `src/components/sections/navigation.tsx`
- `.cursor/knowledge/20-memory/audits/repo-scan-2026-07-13.json`
