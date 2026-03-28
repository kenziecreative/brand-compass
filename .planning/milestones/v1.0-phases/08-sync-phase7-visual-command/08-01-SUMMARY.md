---
phase: 08-sync-phase7-visual-command
plan: "01"
subsystem: discovery-commands
tags: [phase-7, visual-identity, accessibility, motion, graphic-devices, core-flex, ai-generation]
dependency_graph:
  requires: []
  provides:
    - phase-7-visual.md with full 35-question parity to CLAUDE.md
    - Accessibility constraint capture chain (Phase 7 discovery -> STATE.md -> Visual Director)
    - Verbal-to-visual-mappings reference directive in Step 2
  affects:
    - .claude/commands/brand-compass/phase-7-visual.md
tech_stack:
  added: []
  patterns:
    - entity-type conditional annotation (italic format)
    - bold capture/processing blocks
    - hard constraint language (WCAG AA floor)
    - skip-if-minimal annotation for optional content
key_files:
  created: []
  modified:
    - .claude/commands/brand-compass/phase-7-visual.md
decisions:
  - phase-7-visual.md expanded from 6 groups (Q1-21) to 12 groups (Q1-35) with full CLAUDE.md verbatim parity
  - Accessibility Constraint Capture block is a hard constraint chain — WCAG AA universal floor, AAA auto-escalation for regulated sectors
  - Graphic devices always asked but output conditional on brand fit (skip-if-minimal annotation)
  - Application section moved to end (Q34-35) per Phase 6 decision
  - AI-generation rules compiled from approved visual direction, not from discovery answers directly
metrics:
  duration: "106 seconds"
  completed: "2026-03-28"
  tasks_completed: 2
  files_modified: 1
---

# Phase 8 Plan 01: Sync Phase 7 Visual Command Summary

**One-liner:** Phase 7 command expanded from 21-question/6-group to 35-question/12-group full CLAUDE.md parity with accessibility hard constraint chain, verbal-to-visual reference, motion, graphic devices, core+flex, and AI-generation rules.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Sync phase-7-visual.md with CLAUDE.md Phase 7 spec | ef7c273 | .claude/commands/brand-compass/phase-7-visual.md |
| 2 | Verify E2E Visual Pipeline wiring and question coverage | — (verification only, no file changes) | — |

## Changes Made

### Task 1: phase-7-visual.md

**Step 2 addition:**
- Added verbal-to-visual-mappings reference directive: "Before starting Phase 7 discovery, read `.claude/skills/visual-translation/verbal-to-visual-mappings.md`."

**Step 3 — Discovery Conversation:**
- Header updated: "six question groups" → "twelve question groups"
- Added **Accessibility Constraints** group (Q1-3) as first group, before any aesthetic discussion
- Added **Accessibility Constraint Capture** bold block: WCAG AA universal floor, AAA auto-escalation for regulated sectors, STATE.md update instructions, hard constraint language
- Added **Visual Adjective Revisit** group (Q4) reading from STATE.md with preference-vs-strategy bridge annotation
- Existing Visual Direction questions renumbered Q5-8 (was Q1-4)
- Existing Color questions renumbered Q9-12 (was Q5-8)
- Existing Typography questions renumbered Q13-15 (was Q9-11)
- Existing Mark/Logo questions renumbered Q16-19 (was Q12-15)
- Existing Imagery questions renumbered Q20-23 (was Q16-19)
- Added **Graphic Devices** group (Q24-26) with italic skip-if-minimal annotation
- Added **Motion** group (Q27-29)
- Added **Core + Flex** group (Q30-31) with italic classification annotation (Core/Flex element lists)
- Added **AI-Generation Rules** group (Q32-33) with italic compilation annotation (required/banned keywords, consistency anchors, quality bar)
- Moved Application to end as Q34-35 (was Q20-21)

**Step 4 updates:**
- Replaced launch prompt with CLAUDE.md verbatim: references motion principles, graphic device direction, accessibility as hard constraints
- Expanded check-in prompt to preview: Color rationale, Typography rationale, Imagery style, Mark direction, Motion direction, Graphic device direction, Accessibility note
- Added AI-gen rules compilation note after check-in prompt (post-approval step)

**Step 6 expansion:**
- Expanded from 5 sections to 9 sections
- Added: Motion Direction (5), Graphic Devices (6), Core+Flex Classification (7), AI-Generation Guidelines (8)
- Renumbered: Colors/Typography to Avoid → 9

**Step 7 expansion:**
- Expanded completion checklist from 4 items to 9 items matching CLAUDE.md phase-complete criteria
- New items: Graphic devices specified (if applicable), Motion direction defined, Core+flex elements classified, AI-generation rules captured (if applicable)
- Updated closing client message to reference motion and graphic devices

**Conversation Guidelines additions:**
- Accessibility is a hard constraint, not a preference — WCAG AA is the floor for every client, escalate to AAA for regulated sectors
- Motion should reflect brand energy — a "provocative" brand moves differently than a "calm" one
- Graphic devices are optional — don't push if the brand world is minimal; some clients discover the need, others don't have one
- Core+flex helps clients think about consistency vs. flexibility — what never changes vs. what adapts by platform

### Task 2: Verification Pass

All verification checks passed:
- 35 discovery questions present (Q1-35 across 12 groups)
- 12 group headers present with correct names and order
- All 5 annotation types present (Accessibility Constraint Capture bold block, Visual Adjective bridge italic, Graphic device skip note italic, Core+Flex classification italic, AI-gen compilation italic)
- WCAG AA appears 3 times (capture block x2, conversation guidelines x1)
- verbal-to-visual-mappings reference in Step 2 confirmed
- BLOCKING gate preserved
- hard constraint language present (4 occurrences)
- Accessibility hard constraint chain confirmed: Q1-3 capture block → STATE.md → Visual Director launch prompt

## Requirement Coverage

| Requirement | Content | Location |
|-------------|---------|----------|
| DSCV-07 | Accessibility questions in discovery section before Color heading | Step 3: Accessibility Constraints (Q1-3) |
| QUAL-02 | "WCAG AA" and "hard constraint" present | Accessibility Constraint Capture block + Conversation Guidelines |
| DLVR-01 | Motion as question group and in Step 6 synthesis | Step 3: Motion (Q27-29) + Step 6 item 5 |
| PROC-06 | Core+Flex and AI-Generation both present | Step 3: Core+Flex (Q30-31) + AI-Generation Rules (Q32-33) |
| FUTR-02 | Graphic Devices as question group and in Step 6 | Step 3: Graphic Devices (Q24-26) + Step 6 item 6 |
| PIPE-02 | Visual Adjective Revisit and Accessibility both present | Step 3 Q4 + Step 3 Q1-3 |
| PROC-04 | verbal-to-visual-mappings reference directive | Step 2 |

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

- `.claude/commands/brand-compass/phase-7-visual.md` confirmed present on disk
- Task 1 commit ef7c273 confirmed in git log
- Task 2 was verification-only; no file change commit needed
