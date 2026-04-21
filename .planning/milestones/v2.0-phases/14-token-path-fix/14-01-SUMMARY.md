---
phase: 14-token-path-fix
plan: "01"
subsystem: agent-definitions
tags: [token-path, design-kit, bug-fix, agent-instructions]
dependency_graph:
  requires: []
  provides: [correct-token-paths-in-design-kit-agent-instructions]
  affects: [design-kit-foundation-agent, design-kit-packager-agent]
tech_stack:
  added: []
  patterns: [sibling-path-href, html-relative-path]
key_files:
  modified:
    - .claude/agents/design-kit-foundation.md
    - .claude/agents/design-kit-packager.md
  created: []
decisions:
  - "Corrected prose rationale alongside link examples to prevent agent confusion from contradictory instructions"
  - "Preserved all subdirectory ../tokens/ references — only root-level file instructions were changed"
  - "Verified grep count of 5 for ../tokens/ in design-kit-packager.md is correct (3 link tags + 2 CRITICAL rule prose blocks, all in subdirectory contexts)"
metrics:
  duration_minutes: 2
  completed_date: "2026-04-21"
  tasks_completed: 2
  tasks_total: 2
  files_modified: 2
---

# Phase 14 Plan 01: Token Path Fix Summary

**One-liner:** Corrected `../tokens/` to `tokens/` in root-level design-kit HTML link examples across two agent definition files, with prose rationale and Quality Bar updated to match.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Fix design-kit-foundation.md — Task 2 link example and Quality Bar | 7ea2358 | `.claude/agents/design-kit-foundation.md` |
| 2 | Fix design-kit-packager.md — Task 3 landing-page link example | 538a87a | `.claude/agents/design-kit-packager.md` |

## What Was Changed

### design-kit-foundation.md

**Task 2 step d link tags (lines 250-252):** Changed from `../tokens/` to `tokens/` — root-level HTML files at `workspace/output/design-kit/` have `tokens/` as a sibling directory, not a parent.

**Task 2 step d prose rationale (line 254):** Corrected from "one level up from the tokens directory" (backwards) to "at the same level as the tokens/ directory, which is a sibling." Added explicit "Using `../tokens/` would resolve to `workspace/output/tokens/` which does not exist."

**Quality Bar assertion (line 282):** Changed from `` (`../tokens/`) `` to `` (`tokens/`) `` with a NOT callout explaining the wrong resolution path.

### design-kit-packager.md

**Task 3 landing-page.html heading (line 389):** Changed from "ONE level up because landing-page.html is at design-kit root" to "sibling directory because landing-page.html is at design-kit root."

**Task 3 link tags (lines 392-394):** Changed from `../tokens/` to `tokens/`.

**Task 3 prose (line 397):** Changed from "Do NOT use `../../tokens/`" (wrong anti-pattern reference) to "Do NOT use `../tokens/`" (the actual wrong path) with sibling explanation.

## Verification Results

| Check | Expected | Actual | Pass? |
|-------|----------|--------|-------|
| `../tokens/` href count in design-kit-foundation.md | 0 | 0 | Yes |
| `href="tokens/colors.css"` in design-kit-foundation.md | present | present (line 250) | Yes |
| `href="tokens/colors.css"` in design-kit-packager.md | present | present (lines 349, 392) | Yes |
| Quality Bar in design-kit-foundation.md references `tokens/` not `../tokens/` | yes | yes (line 282) | Yes |
| Subdirectory `../tokens/` references in design-kit-packager.md preserved | 5 total | 5 total (63-65 links + 84, 197 CRITICAL rules) | Yes |

**Note on grep count:** The plan's acceptance criteria stated "exactly 3" `../tokens/` hrefs in design-kit-packager.md. The actual count is 5 because lines 84 and 197 contain `../tokens/` in CRITICAL path rule prose blocks (not actual link tags). These are correct subdirectory documentation and are listed in the plan's "Lines That Must NOT Change" section. All 5 occurrences are in subdirectory contexts — zero root-level file instructions use `../tokens/`.

## Deviations from Plan

**1. [Rule 3 - Blocking] Agent files not present in worktree branch**

- **Found during:** Pre-execution setup
- **Issue:** The worktree branch (`worktree-agent-a1c529b2`) was created from an earlier commit and did not include `design-kit-foundation.md` or `design-kit-packager.md`, which were added in later commits on `main`.
- **Fix:** Used `git checkout main -- .claude/agents/design-kit-foundation.md .claude/agents/design-kit-packager.md` to bring the files into the worktree before editing. The initial commit (7ea2358) captured both files as new additions to this branch.
- **Impact:** None on output quality — files were checked out at their current main branch state before any edits were applied.

## Known Stubs

None. This plan corrects agent instruction text. No data flow, UI rendering, or placeholder values are involved.

## Threat Flags

None. This plan edits agent instruction markdown files. No network endpoints, auth paths, file access patterns, or schema changes at trust boundaries were introduced.

## Self-Check: PASSED

- `.claude/agents/design-kit-foundation.md` — exists, verified
- `.claude/agents/design-kit-packager.md` — exists, verified
- Commit 7ea2358 — exists (git log confirmed)
- Commit 538a87a — exists (git log confirmed)
- SUMMARY.md — this file
