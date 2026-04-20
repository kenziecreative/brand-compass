# Phase 13: Integration - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-20
**Phase:** 13-integration
**Areas discussed:** Export command, Verifier bundle checks, Phase 8 orchestration, Phase transition handoffs

---

## Export Command

| Option | Description | Selected |
|--------|-------------|----------|
| Per-bundle sections | Three distinct labeled sections (Client Package, Agent Skill Bundle, Design Kit) with per-bundle file tables and per-bundle missing-file flags | ✓ |
| Single unified table | One flat table with a Bundle column, one consolidated missing list. Shorter output but loses per-bundle attribution | |

**User's choice:** Per-bundle sections (Recommended)
**Notes:** Mirrors how bundles are authored (separate agents, separate directories). Missing files attributed to owning bundle with actionable guidance.

---

## Verifier Bundle Checks

| Option | Description | Selected |
|--------|-------------|----------|
| Existence + substance | File presence checks plus targeted content quality — line counts, format validation, placeholder detection | ✓ |
| Existence only | Just check files exist. Fast but misses stub files with no substance | |
| Full cross-bundle consistency | Add drift detection between bundles. Most thorough but highest complexity and false positive risk | |

**User's choice:** Existence + substance (Recommended)
**Notes:** Catches real failure modes (stub SKILL.md, wrong token linking in components) without overcomplicating. Maps to Quality Bar sections in packager agents.

---

## Phase 8 Agent Orchestration

| Option | Description | Selected |
|--------|-------------|----------|
| Sequential with handoff | Doc Assembler → skill-bundle-packager → design-kit-foundation → design-kit-packager → Brand Verifier | ✓ |
| Parallel where possible | skill-bundle-packager and design-kit chain run simultaneously after Doc Assembler | |

**User's choice:** Sequential with handoff (Recommended)
**Notes:** Matches existing serial pattern. Clear chain, simple status updates. If design-kit-foundation fails, design-kit-packager is skipped; skill-bundle-packager failure is independent.

---

## Phase Transition Handoffs

| Option | Description | Selected |
|--------|-------------|----------|
| STATE.md handoff block | Structured handoff section in STATE.md at phase completion + /clear nudge in closing message. Resume skill reads handoff block. | ✓ |
| Inline preamble detection | Each phase skill's Step 1 detects new vs. continuing sessions. Requires duplicating detection logic across all 8 phase skills. | |

**User's choice:** STATE.md handoff block (Recommended)
**Notes:** Handoff block overwritten (not appended) at each phase completion. Resume skill is the detection mechanism — no new heuristic needed.

---

## Claude's Discretion

- Export section wording and missing-file message format
- Verifier level organization (follows existing Level 1-6 pattern)
- Phase 8 step numbering for new agent launches
- CLAUDE.md section ordering and formatting
- Frontend card layout for new bundle deliverables
- STATE.md handoff block field names and formatting
