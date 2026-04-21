---
phase: 10-output-foundation
plan: 02
subsystem: frontend
tags: [glob, path-migration, output-directory, react, typescript, vite]
status: checkpoint-pause
checkpoint: Task 3 (human-verify) — TypeScript passes, awaiting browser verification

dependency_graph:
  requires:
    - 10-01 (output directory structure created)
  provides:
    - Frontend reads from workspace/output/client/ for existing deliverables
    - Frontend handles workspace/output/skill-bundle/ and workspace/output/design-kit/ gracefully when empty
    - OutputViewer correctly resolves subdirectory paths for iframe/fetch srcUrl
  affects:
    - src/lib/content-loader.ts
    - src/lib/content-parser.ts
    - src/lib/phase-utils.ts
    - src/components/OutputPage.tsx
    - src/components/OutputViewer.tsx

tech_stack:
  added: []
  patterns:
    - Per-subdirectory static import.meta.glob calls (Vite requirement — no dynamic patterns)
    - Mixed-extension glob with inline format derivation from path extension
    - useParams wildcard capture for subdirectory-qualified route paths

key_files:
  created: []
  modified:
    - src/lib/content-loader.ts
    - src/lib/content-parser.ts
    - src/lib/phase-utils.ts
    - src/components/OutputPage.tsx
    - src/components/OutputViewer.tsx

decisions:
  - skillBundleFiles and designKitFiles use **/*.{html,md} to avoid loading binary files (tokens JSON/CSS not needed in frontend)
  - Empty subdirectories return {} naturally from import.meta.glob — no crash, no special handling needed
  - OutputViewer keeps filename variable for fileTitles lookup and extension detection; only srcUrl and breadcrumb changed to use filePath
  - Placeholder bundle cards use opacity-50 border-dashed matching existing dimmed-file treatment

metrics:
  duration: ~8 minutes (Tasks 1-2 complete, Task 3 checkpoint pause)
  completed_date: 2026-04-20
  tasks_completed: 2
  tasks_total: 3
  files_modified: 5
---

# Phase 10 Plan 02: Frontend Path Migration Summary

Five frontend files migrated to the three-bundle output directory structure (workspace/output/client/, skill-bundle/, design-kit/) with graceful empty-state handling and fixed OutputViewer subdirectory path resolution.

## Tasks Completed

### Task 1: Migrate content-loader.ts to per-subdirectory globs
**Commit:** `c4b72ac`

Replaced two flat-directory glob declarations (`outputMdFiles`, `outputHtmlFiles` matching `/workspace/output/*.md` and `*.html`) with four per-subdirectory static glob declarations:

- `clientMdFiles` — `/workspace/output/client/*.md`
- `clientHtmlFiles` — `/workspace/output/client/*.html`
- `skillBundleFiles` — `/workspace/output/skill-bundle/**/*.{html,md}`
- `designKitFiles` — `/workspace/output/design-kit/**/*.{html,md}`

Updated all three consumer functions:
- `loadOutputFiles()` — spreads all four results; skillBundle/designKit use inline format derivation since `toContentFiles` takes a fixed format parameter
- `getFile()` — fallback chain now checks all four new maps
- `hasOutputFiles()` — checks any of four maps; empty `{}` returns false naturally (no crash on empty dirs)

### Task 2: Migrate path strings in content-parser, phase-utils, OutputPage, and OutputViewer
**Commit:** `65e4de1`

**content-parser.ts:**
- Phase 6 `outputFile`: `/workspace/output/voice-guide.md` → `/workspace/output/client/voice-guide.md`
- Phase 7 `outputFile`: `/workspace/drafts/visual-direction.md` — unchanged (stays in drafts/)
- Phase 8 `outputFile`: `/workspace/output/practical-toolkit.md` → `/workspace/output/client/practical-toolkit.md`
- `getPhaseContent()` foundation lookup: `/workspace/output/brand-foundation.md` → `/workspace/output/client/brand-foundation.md`

**phase-utils.ts:**
All 8 ASSET_PACKS `outputFile` strings updated: `workspace/output/[pack].html` → `workspace/output/client/[pack].html`

**OutputPage.tsx:**
- All 7 deliverable `filename` strings updated to `workspace/output/client/` paths
- Core deliverables `Link to` route: `basename` → `f.filename.replace('workspace/output/', '')` (passes `client/brand-foundation.html` to OutputViewer's wildcard)
- Asset pack `Link to` route: `basename` → `outputFile?.replace('workspace/output/', '') ?? ''`
- Added two placeholder cards after deliverables section: "Agent Skill Bundle" (Phase 11) and "Design Kit" (Phase 12), both `opacity-50 border-dashed`

**OutputViewer.tsx:**
- `srcUrl`: `` `/workspace/output/${filename}` `` → `` `/workspace/output/${filePath}` `` (critical fix — `filename` was basename only, stripping subdirectory)
- Breadcrumb path display: same change, `filename` → `filePath`
- `filename` variable preserved for `fileTitles` lookup and extension detection (keyed by basename)

## Checkpoint Status: AWAITING HUMAN VERIFICATION

### Task 3: Verify frontend loads and path migration is complete

**Automated check result:** `npx tsc --noEmit` — PASSED (zero errors)

**What was built:**
All five frontend files updated for the new three-bundle output directory structure. OutputViewer srcUrl fixed for subdirectory paths. Empty-state placeholder cards added for Agent Skill Bundle and Design Kit bundles.

**Human verification steps:**
1. Start the dev server if not running: `npm run dev` (should start on port 3001)
2. Open http://localhost:3001 in browser — app should load without console errors
3. Navigate to the Brand Kit page (/output) — should show deliverables list with `workspace/output/client/` paths displayed under each file
4. Verify the two new placeholder cards appear: "Agent Skill Bundle" (Phase 11) and "Design Kit" (Phase 12), both dimmed with dashed borders
5. If any brand engagement files exist in workspace/output/client/, verify they appear correctly. If none exist, all files should show dimmed (opacity-50) without errors.
6. Check browser console for any import errors or glob-related warnings
7. Click a file link (if any exist) and verify the OutputViewer shows the correct full path in breadcrumb (e.g., `workspace/output/client/brand-foundation.html`)

**Resume signal:** Type "approved" if frontend loads correctly, or describe any issues found.

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — no hardcoded empty values or placeholder data introduced. The placeholder bundle cards are intentional future-state indicators, not data stubs.

## Threat Flags

None — no new network endpoints, auth paths, or file access patterns introduced beyond what the plan's threat model covers (T-10-04 through T-10-06).

## Self-Check

**Files exist:**
- src/lib/content-loader.ts — modified (verified via grep)
- src/lib/content-parser.ts — modified (verified via grep)
- src/lib/phase-utils.ts — modified (verified via grep)
- src/components/OutputPage.tsx — modified (verified via grep)
- src/components/OutputViewer.tsx — modified (verified via grep)

**Commits exist:**
- c4b72ac — feat(10-02): migrate content-loader.ts to per-subdirectory globs
- 65e4de1 — feat(10-02): migrate path strings to client/ subdirectory and fix OutputViewer srcUrl

**TypeScript:** npx tsc --noEmit passed with zero errors.

## Self-Check: PASSED
