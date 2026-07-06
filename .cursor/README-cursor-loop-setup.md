# Cursor "Keep Going" Loop System — v2, corrected against Cursor's actual docs

## What changed from v1
The first draft guessed at the hook's input schema (`status`, `loop_count`) based on an older blog example. Cursor's real documented common schema for every hook is:
```json
{
  "conversation_id": "string",
  "generation_id": "string",
  "model": "string",
  "hook_event_name": "string",
  "cursor_version": "string",
  "workspace_roots": ["<path>"],
  "user_email": "string | null",
  "transcript_path": "string | null"
}
```
There's no guaranteed `loop_count` field, so v2 tracks iteration count itself, per `conversation_id`, in a small state file — it doesn't trust a field that might not exist in your Cursor version. The native looping mechanism is the `followup_message` field, and Cursor caps how many times it will honor that with a `loop_limit` set on the hook entry in `hooks.json` (default 5 if you don't set one). v2 sets `loop_limit: 12` explicitly and mirrors that number in the script so the agent gets an explained stop instead of being cut off silently.

## Files to place in your project

```
your-project/
  .cursor/
    rules/
      no-slacking.mdc         <- always-apply behavior rules (rename from no-slacking.md)
    hooks.json                 <- registers the stop hook, note the required "version": 1 field
    hooks/
      keep-going.ts            <- the stop hook itself (rename from keep-going.txt if needed)
      state/                    <- created automatically, one JSON file per conversation_id
    scratchpad.md               <- created automatically by the hook on first run
```

**Path gotcha, confirmed in Cursor's docs:** project-level hook commands resolve relative to the **project root**, so `.cursor/hooks/keep-going.ts` in `hooks.json` is correct as written — don't add a leading `./` or rewrite it relative to `.cursor/`.

**Schema gotcha, confirmed in Cursor's docs and a known live bug report:** the top-level `"version": 1` field in `hooks.json` is required. Omitting it causes Cursor 3.x to silently fail to load *any* hooks in the file, with no obvious error beyond "Configured Hooks (0)" in Settings. The `hooks.json` in this bundle already includes it — don't remove it if you merge this into an existing hooks file.

## 1. Rules
Drop `no-slacking.mdc` into `.cursor/rules/`. `alwaysApply: true` means it's injected into every agent turn with no further setup.

## 2. The hook registration
Drop `hooks.json` into `.cursor/` (merge the `stop` array into an existing `hooks.json` if you already have one — don't just overwrite it if you have other hooks registered).

## 3. The hook script
Drop `keep-going.ts` into `.cursor/hooks/`. It needs Bun on PATH, matching Cursor's hook execution model (the `command` in `hooks.json` runs `bun .cursor/hooks/keep-going.ts`).

## 4. Verify it's actually wired up
Cursor gives you two real debugging surfaces — use them instead of guessing:
- **Settings → Hooks tab**: shows configured hooks and whether they're currently registered.
- **Hooks output channel** (Output panel → select "Hooks"): shows execution errors, malformed JSON, and what each hook actually returned.

Cursor watches `hooks.json` and reloads on save; if a change doesn't seem to take effect, restart Cursor before assuming your script is wrong.

## 5. How the loop actually works
1. First stop attempt with no `.cursor/scratchpad.md` present → hook forces the agent to write a real, verifiable checklist before anything else.
2. Every subsequent stop attempt → hook counts `- [x]` vs `- [ ]`, records the count against this `conversation_id` in `.cursor/hooks/state/<id>.json`, and:
   - All checked → returns `{}`, agent is allowed to actually stop.
   - Checked-count flat for 2 iterations in a row → treated as a real blocker, agent is told to explain it and stop, not loop forever on something it can't fix by retrying.
   - Otherwise → returns `followup_message`, naming exact progress, forcing another lap.
3. Hits `MAX_ITERATIONS` (12, matching `loop_limit` in `hooks.json`) → forced to write a status note and stop, regardless of checklist state.

## 6. Example scratchpad
```markdown
# Task: Add rate limiting to /api/upload

- [ ] Middleware implemented and wired into the upload route
- [ ] Unit test for over-limit request returns 429
- [ ] Unit test for under-limit request passes through
- [ ] `npm run build` succeeds
- [ ] `npm test` passes with no skipped tests
- [ ] Edge case: concurrent requests at the boundary don't double-count
```

If the agent tries to stop at 4/6, the hook forces it back in. If it tries to check an item without actually running it, that's what `no-slacking.mdc` catches — the hook enforces *quantity* of real progress across turns, the rules file enforces *honesty* about each individual item within a turn.

## 7. One thing this setup can't verify for you
Hook behavior has shifted across Cursor's 1.7 → 3.x releases (this is explicitly still evolving, beta-flagged functionality per Cursor's own changelog history). If something in this setup doesn't fire as described, check the Hooks output channel first — it will tell you whether the hook ran and what it returned, which is a faster diagnosis than re-guessing the schema.
