# Register Softree Studio with Sanity (COS / Content Agent)

**Project ID:** `1zmh4sfw` (from `src/sanity/env.ts`)  
**Studio URL (production):** `https://www.softreetechnology.com/studio`  
**Local (port 3001):** `http://localhost:3001/studio` ← **separate registration from production**

---

## localhost:3001 not connected (your case)

Sanity registers studios **per exact URL**. Production and `*.sanity.studio` hosts are connected; **`http://localhost:3001/studio` is a different origin** and must be registered separately (port 3000 ≠ 3001).

Manifest on 3001 is OK if this returns 200:

`http://localhost:3001/studio/static/create-manifest.json`

### Fix (run in your terminal)

```bash
npx sanity login
npm run sanity:connect:local
```

This registers `http://localhost:3001/studio` + deploys schema.

### Add CORS for port 3001

[sanity.io/manage](https://www.sanity.io/manage) → project **1zmh4sfw** → **API** → **CORS origins** → add:

`http://localhost:3001` (with credentials)

Or CLI after login:

```bash
npx sanity cors add http://localhost:3001 --credentials
```

### Then in browser

1. Open `http://localhost:3001/studio/structure/dashboard`
2. Hard refresh (Ctrl+Shift+R)
3. Click **Register studio** while logged in as project admin

### Quick alternative

If `http://localhost:3000/studio` is already registered, run dev on **3000** instead of 3001:

```bash
npm run dev -- -p 3000
```

---

## Why you see "Connect this studio to your project"

Softree Studio is **embedded + self-hosted** (Next.js at `/studio`), not deployed to `*.sanity.studio`. Sanity COS features (schema sync, Content Agent, Dashboard discovery) require **registration** + **manifest** + **bridge script**.

Code changes applied:

- Dashboard bridge script in `src/app/studio/layout.tsx`
- `sanity.cli.ts` → `project.basePath: '/studio'`
- npm scripts: `sanity:manifest`, `sanity:schema-deploy`, `sanity:register`, `sanity:connect`

---

## One-time setup (you run these)

### 1. Log in to Sanity CLI

```bash
npx sanity login
```

### 2. Extract manifest + deploy schema + register external URL

```bash
npm run sanity:connect
```

Or step by step:

```bash
npm run sanity:manifest
npm run sanity:schema-deploy
npm run sanity:register
```

When `sanity:register` prompts, use:

- **Production:** `https://www.softreetechnology.com/studio`
- **Local only:** `http://localhost:3000/studio` (dev testing)

For CI/CD, create a deploy token at [sanity.io/manage](https://www.sanity.io/manage) → API → Tokens, then:

```bash
SANITY_AUTH_TOKEN=<deploy-token> npm run sanity:schema-deploy
```

### 3. Add studio URL in Sanity Manage (if not auto-registered)

1. Open [sanity.io/manage](https://www.sanity.io/manage)
2. Project **1zmh4sfw** → **Studios** tab
3. Add studio URL: `https://www.softreetechnology.com/studio`
4. Save

### 4. In the Studio UI — click **Register studio**

After steps 1–3, hard refresh `/studio` while logged in as a project admin. Click **Register studio** on the connect screen — this links the embedded app to COS (Content Agent, schema syncing).

### 5. Deploy Next.js to production

Manifest files live at `public/studio/static/` → served as `/studio/static/create-manifest.json` after deploy.

Add to your deploy pipeline (before or after `next build`):

```bash
npm run sanity:manifest
SANITY_AUTH_TOKEN=<token> npm run sanity:schema-deploy
```

---

## Verify registration worked

| Check | URL / action |
| --- | --- |
| Manifest | `https://www.softreetechnology.com/studio/static/create-manifest.json` → JSON 200 |
| Connect screen gone | Refresh `/studio` — dashboard loads, content visible |
| Content Agent | [sanity.io/welcome](https://www.sanity.io/welcome) → project → Content Agent lists studio |
| Open studio once | Required for Content Agent API (`NO_COMPATIBLE_APPLICATIONS` fix) |

---

## Optional: Sanity-hosted mirror

If you also want `softree.sanity.studio`:

```bash
npx sanity deploy
```

Choose hostname e.g. `softree`. This is optional — embedded `/studio` remains primary.

---

## Troubleshooting

| Error | Fix |
| --- | --- |
| Still shows "not registered" | Run `npm run sanity:connect`; confirm URL in Manage |
| Manifest 404 | Run `npm run sanity:manifest`; redeploy Next.js |
| Content Agent `NO_COMPATIBLE_APPLICATIONS` | Open production `/studio` once while logged in |
| CORS errors | Manage → API → CORS → add `https://www.softreetechnology.com` |
| Register button does nothing | Check bridge script loads (Network tab: `bridge.js`) |
