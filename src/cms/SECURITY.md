# CMS token scoping

| Token | Env var | Scope | Used by |
|-------|---------|-------|---------|
| Read | `SANITY_API_READ_TOKEN` | Draft + published read, live preview | `defineLive`, server fetch in draft mode |
| Write | `SANITY_API_WRITE_TOKEN` | Patch/publish documents | `/api/cms/publish`, content pipeline |
| Revalidate | `SANITY_REVALIDATE_SECRET` | Webhook auth only | `/api/revalidate` |

## Rules

- Never expose write token to the browser or client bundles.
- Read token may be passed to `defineLive` browserToken for Presentation — restrict dataset to `production` only.
- Studio API routes require `studio-api-auth` referer check.
- Rotate tokens if leaked; update Vercel env + local `.env.local`.
