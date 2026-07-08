# MCP server for editors

**Status:** Deferred (Phase 2)

## Rationale

Full MCP server requires hosted tooling, auth, and editor UX beyond Studio scope for this milestone.

## Interim

- Command palette (`⌘K`) — natural language document search
- Content Agent tool — bulk generation workflows
- `/api/cms/ai/*` — field completion and FAQ generation

## Phase 2 target

- MCP tools: `search_documents`, `audit_content`, `suggest_internal_links`
- Auth: Studio session token scoped to read + suggest only
