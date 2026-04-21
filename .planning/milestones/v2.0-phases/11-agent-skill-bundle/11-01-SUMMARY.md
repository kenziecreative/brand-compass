---
phase: 11-agent-skill-bundle
plan: "01"
subsystem: agents
tags:
  - agent-definition
  - skill-bundle
  - voice-extraction
  - content-synthesis
dependency_graph:
  requires:
    - "Phase 8 (Toolkit Assembly) — produces workspace/output/client/ files that skill-bundle-packager reads"
    - "Phase 10 (Output Foundation) — established workspace/output/skill-bundle/ directory pattern"
  provides:
    - ".claude/agents/skill-bundle-packager.md — complete agent definition"
    - "Runtime agent that generates SKILL.md, brand-prompt.md, and source/ files from completed engagements"
  affects:
    - "Phase 13 (Integration) — Phase 8 skill file and Brand Verifier will reference this agent"
tech_stack:
  added: []
  patterns:
    - "design-kit-foundation.md structural pattern (frontmatter, identity, input, pre-flight, tasks, output, quality bar)"
    - "Translation Rule discipline from copywriter.md (discover language → behavioral instructions)"
    - "Glob-based conditional input handling from document-assembler.md and brand-verifier.md"
key_files:
  created:
    - ".claude/agents/skill-bundle-packager.md"
  modified: []
decisions:
  - "Translation Rule implemented with explicit BAD/GOOD worked example — archetype names must become behavioral descriptions in SKILL.md"
  - "Task 1 before Task 2 sequencing — source extraction provides clean extracted material for synthesis"
  - "language-bank.md deduplication: practical-toolkit.md version retained for overlapping entries"
  - "brand-prompt.md hard constraint: no heading characters, no bullet markers — prose-only persona injection"
  - "disable-model-invocation excluded from generated SKILL.md frontmatter — persona skill not a command skill"
  - "voice-fingerprint.md as enrichment-only — graceful skip if absent, no blocking"
metrics:
  duration: "~15 minutes"
  completed: "2026-04-20"
  tasks_completed: 2
  tasks_total: 2
  files_created: 1
  files_modified: 0
requirements:
  - SKIL-01
  - SKIL-02
  - SKIL-03
  - SKIL-04
---

# Phase 11 Plan 01: Skill Bundle Packager Agent — Summary

**One-liner:** 295-line agent definition that extracts voice-guide.md sections verbatim into source files and synthesizes a SKILL.md (behavioral voice rules) and brand-prompt.md (persona injection prose) from completed brand engagement outputs.

## What Was Built

Created `.claude/agents/skill-bundle-packager.md` — the sole deliverable of Phase 11. This agent definition provides complete instructions for a sonnet-model agent to produce a skill bundle from completed brand engagement outputs without any additional context.

The agent definition follows the `design-kit-foundation.md` structural pattern (frontmatter, opening identity, input, pre-flight, tasks, output, quality bar) at the `document-assembler.md` depth of instruction (295 lines, specific behavioral rules per section).

**Structural overview:**

- **YAML frontmatter:** `name: skill-bundle-packager`, `model: sonnet`, `tools: Read, Write, Glob, Grep`, trigger descriptions
- **Opening identity paragraph:** role, task scope, two-task sequential structure explanation
- **Input section:** 5 entries (3 required, 1 targeted, 1 conditional)
- **Before Starting:** 5 pre-flight Glob checks — 4 stop-on-missing for required files, 1 graceful-continue for optional voice-fingerprint.md
- **Task 1 (Source File Extraction):** verbatim copy instructions for voice-rules.md (Sections 3+3b+4), guardrails.md (Section 5+5b), and language-bank.md (merged from voice-guide.md + practical-toolkit.md with explicit deduplication logic)
- **Task 2 (Bundle Synthesis):** Translation Rule with worked BAD/GOOD archetype translation example; SKILL.md five-section template (Voice Definition, Signature Moves, Guardrails, Language Bank, Positioning Summary) with minimum line counts per section; brand-prompt.md 150-300 word composition algorithm with priority ordering and no-heading/no-bullet constraint
- **Output section:** all 5 output files listed
- **Quality Bar:** structural pass/fail checks including line count, translation rule enforcement, word count, bullet/heading scan

## Tasks Completed

| Task | Description | Commit | Files |
|------|-------------|--------|-------|
| 1 | Write complete skill-bundle-packager agent definition | 2db49ac | `.claude/agents/skill-bundle-packager.md` (created) |
| 2 | Verify agent definition against reference examples and patterns | (no file changes — all checks passed on Task 1 output) | — |

## Verification Results

All acceptance criteria passed:

| Check | Result |
|-------|--------|
| File exists | PASS |
| Line count 250+ | PASS (295 lines) |
| `model: sonnet` | PASS (1 match) |
| `tools: Read, Write, Glob, Grep` | PASS (1 match) |
| `name: skill-bundle-packager` | PASS (1 match) |
| `## Input` section | PASS (1 match) |
| `## Before Starting` | PASS (1 match) |
| `### Task 1` | PASS (1 match) |
| `### Task 2` | PASS (1 match) |
| `## Output` | PASS (1 match) |
| `## Quality Bar` | PASS (1 match) |
| `Translation Rule` | PASS (1 match) |
| `voice-fingerprint` occurrences | PASS (5 matches: Input, Before Starting ×2, Task 1, Task 2) |
| `deduplicat` | PASS (3 matches) |
| `verbatim` | PASS (15 matches) |
| `disable-model-invocation` in SKILL.md template | PASS — term only appears in prohibition instructions ("Do NOT include"), not in any template block |
| `## Codify` | PASS (9 matches) |
| `## Retire` / Retire mentions | PASS (13 matches) |
| `150-300` word constraint | PASS (4 matches) |
| `Section 3: Writing Style` reference | PASS (1 match) |
| `Section 4: Signature Moves` reference | PASS (1 match) |
| `Section 5: Guardrails` reference | PASS (1 match) |
| `brand-foundation.md` | PASS (9 matches including Input and Task 2) |
| `workspace/drafts/` reads | PASS — 0 matches (agent reads only from workspace/output/client/ and workspace/research/) |

## Decisions Made

1. **Translation Rule implementation:** Included an explicit `#### The Translation Rule` section between the Task 2 opening and Part A with a worked example showing BAD output (archetype name transcribed) vs. GOOD output (behavioral description). Warning signs listed for self-audit by the executing agent.

2. **Task sequencing:** Task 2 explicitly references "the source/ files you just created in Task 1" — making the dependency clear and the sequential order mandatory.

3. **language-bank.md deduplication detail:** Listed specific overlapping entries ("Leverage," "Synergy," "Best-in-class," "Turnkey solution," "Disrupting the industry") so the agent knows exactly which entries to check. Practical-toolkit.md version retained for all overlaps.

4. **brand-prompt.md format enforcement:** Added three separate enforcement points — the composition instruction block, an anti-pattern instruction, and the Quality Bar check — to prevent structural formatting from appearing in the prose output.

5. **SKILL.md minimum line counts per section:** Added per-section minimums (Voice Definition: 20 lines, Signature Moves: 30 lines, Guardrails: 25 lines, Language Bank: 25 lines, Positioning Summary: 20 lines) to prevent thin sections from bringing total below 200 lines.

## Deviations from Plan

None — plan executed exactly as written. All 12 decisions (D-01 through D-12) from CONTEXT.md are implemented as specific instructions within the agent definition.

## Known Stubs

None. The agent definition is complete instruction-set content, not a runtime output file. No placeholder text, no hardcoded empty values, no TODO markers.

## Threat Flags

None. The agent definition is a static markdown file in `.claude/agents/`. It reads from `workspace/output/client/` (trusted, generated by Document Assembler) and writes to `workspace/output/skill-bundle/` (same trust level). No new network endpoints, auth paths, or trust boundary crossings.

Pre-flight checks (Before Starting) implement T-11-03 mitigation from the plan's threat register — all 4 required inputs Glob-checked with stop-on-missing behavior; optional voice-fingerprint.md gracefully skipped if absent.

## Self-Check: PASSED

| Item | Status |
|------|--------|
| `.claude/agents/skill-bundle-packager.md` exists | FOUND |
| Commit `2db49ac` exists | FOUND |
| Line count 295 (≥250) | PASS |
| SUMMARY.md created | FOUND |
