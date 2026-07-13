# Implementation Plan

**Date**: July 8, 2026
**Lead**: Cascade AI
**Purpose**: Step-by-step implementation plan for Neo's foundation

---

## Current State

**Existing Foundation**:
- npm workspaces with `frontend/` and `studio/`
- Next.js 16 frontend with App Router
- Sanity Studio v6 in `studio/`
- Tailwind CSS, shadcn/ui in frontend
- Turborepo build orchestration
- TypeScript, ESLint, Prettier configured

**Gaps**:
- No shared packages (ui, types, utils, config)
- No custom Studio application (only Sanity Studio)
- No AI module
- No workspace/permission/navigation systems
- npm instead of pnpm (per research recommendation)

---

## Implementation Strategy

**Approach**: Build incrementally on existing foundation. Avoid destructive rewrites. Add new packages alongside existing code, then gradually migrate.

**Phases**:

### Phase 5.1: Foundation (Week 1)
1. Set up shared packages
2. Create design tokens package
3. Create custom Studio shell
4. Update workspace configuration

### Phase 5.2: Core Systems (Week 2)
1. Implement workspace system
2. Implement navigation system
3. Implement permission system (basic)
4. Set up routing and command palette

### Phase 5.3: AI Module (Week 3)
1. Create AI gateway package
2. Add provider adapters (OpenAI)
3. Add context engine
4. Add prompt library

### Phase 5.4: Content & Editor (Week 4)
1. Build custom content list
2. Build custom editor shell
3. Integrate AI into editor
4. Add media library UI

### Phase 5.5: Collaboration (Week 5)
1. Add review system
2. Add comments UI
3. Add activity feed
4. Add notifications

### Phase 5.6: Polish (Week 6)
1. Add animations and motion
2. Add empty states
3. Add loading states
4. Add error handling
5. Performance optimization

---

## Week 1 Detailed Plan

### Day 1: Shared Packages

**Tasks**:
1. Create `packages/` directory
2. Create `@neo/config`
3. Create `@neo/types`
4. Create `@neo/utils`
5. Create `@neo/ui` (design tokens + primitives)
6. Update root `package.json` workspaces

**Deliverables**:
- `packages/config/package.json`
- `packages/types/package.json`
- `packages/utils/package.json`
- `packages/ui/package.json`
- Root workspaces updated

### Day 2: Design Tokens

**Tasks**:
1. Create CSS variables for colors, spacing, radius, motion
2. Create Tailwind config extension
3. Create theme provider component
4. Add dark/light mode support

**Deliverables**:
- `packages/ui/styles/tokens.css`
- `packages/ui/styles/tailwind.config.ts`
- `packages/ui/components/theme-provider.tsx`

### Day 3: UI Primitives

**Tasks**:
1. Button component
2. Input component
3. Card component
4. Modal/Sheet component
5. Command palette base

**Deliverables**:
- `packages/ui/components/button.tsx`
- `packages/ui/components/input.tsx`
- `packages/ui/components/card.tsx`
- `packages/ui/components/modal.tsx`
- `packages/ui/components/command.tsx`

### Day 4: Custom Studio Shell

**Tasks**:
1. Create `apps/studio/` (new custom studio)
2. Set up Next.js 16 with App Router
3. Create app shell layout (sidebar + top bar)
4. Add workspace switcher placeholder

**Deliverables**:
- `apps/studio/package.json`
- `apps/studio/app/layout.tsx`
- `apps/studio/app/page.tsx`
- `apps/studio/components/sidebar.tsx`
- `apps/studio/components/top-bar.tsx`

### Day 5: Navigation Shell

**Tasks**:
1. Add sidebar navigation
2. Add keyboard shortcut handling
3. Add command palette integration
4. Add breadcrumb component

**Deliverables**:
- `apps/studio/components/navigation.tsx`
- `apps/studio/lib/keyboard.ts`
- `apps/studio/components/command-palette.tsx`
- `apps/studio/components/breadcrumbs.tsx`

### Day 6-7: Integration & Testing

**Tasks**:
1. Wire shared packages to studio
2. Add turbo pipeline for new packages
3. Run typecheck and lint
4. Document changes

---

## Key Decisions

### Keep npm (for now)
Although research recommended pnpm, switching package managers mid-project is disruptive. Keep npm workspaces but add `packages/`.

### Keep Existing Sanity Studio
Continue using existing `studio/` for content schema management. Custom Studio (`apps/studio/`) will be the primary editing interface but can still leverage Sanity's APIs.

### Incremental Migration
Don't rewrite frontend/ immediately. Let it continue working while new Studio is built alongside.

### AI Module Priority
Build AI module as a shared package early. It will be used by both existing frontend and new Studio.

---

## File Structure Target

```
project-neo/
├── apps/
│   ├── frontend/          (existing)
│   ├── studio/            (existing Sanity Studio)
│   └── custom-studio/     (new custom studio)
├── packages/
│   ├── ui/                (shared UI + design tokens)
│   ├── types/             (shared types)
│   ├── utils/             (shared utilities)
│   ├── config/            (shared configs)
│   ├── ai/                (AI module)
│   ├── navigation/        (navigation module)
│   ├── workspace/         (workspace module)
│   └── permissions/       (permission module)
├── frontend/              (legacy, to migrate)
├── studio/                (legacy Sanity Studio)
├── package.json
├── turbo.json
└── pnpm-workspace.yaml    (future migration)
```

---

## Success Criteria

### Week 1
- [ ] Shared packages build successfully
- [ ] Custom Studio shell runs locally
- [ ] Command palette opens with Cmd+K
- [ ] Design tokens applied consistently

### Week 6
- [ ] Full custom Studio functional
- [ ] AI features working end-to-end
- [ ] Workspace system functional
- [ ] Permission system functional
- [ ] Content editor functional
- [ ] All tests passing

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| npm workspace complexity | Medium | Keep package count small; migrate to pnpm later |
| Existing frontend conflicts | Medium | Build new Studio in `apps/` without touching `frontend/` |
| Sanity API limits | Medium | Cache content; use webhooks |
| AI provider costs | Medium | Implement quotas and rate limiting early |

---

## Next Steps

1. Begin Day 1 tasks: create shared packages
2. Update root workspace configuration
3. Start building custom Studio shell
