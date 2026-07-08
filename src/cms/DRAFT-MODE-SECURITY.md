# Draft mode security review

**Status:** Accepted  
**Date:** 2026-07-08

## Controls

1. **Enable route** (`/api/draft-mode/enable`) — requires Sanity Presentation secret or valid preview token; sets httpOnly draft mode cookie.
2. **Disable route** (`/api/draft-mode/disable`) — clears cookie; safe to call publicly.
3. **Live fetch** — `cmsFetch` / `CmsSanityLive` use `SANITY_API_READ_TOKEN` server-side only; never in client bundles.
4. **Studio APIs** — `/api/studio/*` and `/api/cms/*` require `studio-api-auth` referer check.
5. **Preview paths** — `/case-studies/preview` excluded from `CmsSanityLive` to avoid double subscriptions.

## Recommendations

- Rotate `SANITY_API_READ_TOKEN` if exposed in client-side code.
- Keep draft mode enable behind Presentation tool or authenticated preview links only.
- Do not embed write tokens in Studio client code.
