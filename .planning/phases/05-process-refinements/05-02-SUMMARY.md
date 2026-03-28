---
phase: 05-process-refinements
plan: "02"
subsystem: orchestration
tags: [discovery, anti-anchoring, stakeholder-mapping, phase-2, phase-4, phase-5, phase-6]
dependency_graph:
  requires: [05-01]
  provides: [PROC-03, PROC-05]
  affects: [CLAUDE.md, all Phase 2-4 discovery sessions]
tech_stack:
  added: []
  patterns: [entity-type conditional gate]
key_files:
  created: []
  modified:
    - CLAUDE.md
decisions:
  - "Anti-anchoring audit is surgical — only the 7 specific count anchors listed in the plan were changed; all other questions left intact"
  - "Alternative frames added to Phase 4 Q1 (dinner party) and Phase 6 Q4 (noun/verb) only — narrowest questions"
  - "Stakeholder Mapping follows Phase 1 mission/vision and Phase 3 service definition conditional pattern exactly"
  - "Phase 4 'phase complete when' updated from '4-6 traits' to 'Key traits' to align with anti-anchoring principle"
metrics:
  duration: "~1.4 minutes"
  completed_date: "2026-03-28"
  tasks_completed: 2
  files_modified: 1
---

# Phase 05 Plan 02: Anti-Anchoring and Stakeholder Mapping Summary

Anti-anchored 7 count-specifying discovery questions across Phases 2, 4, 5, and 6; added alternative frames to Phase 4 Q1 and Phase 6 Q4; added org-conditional Stakeholder Mapping subsection (Q18-19) to Phase 2 following the established entity-type gate pattern.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Anti-anchoring audit of Phases 1-4 discovery questions | 0bc970a | CLAUDE.md |
| 2 | Add stakeholder mapping conditional in Phase 2 | 36a2d2e | CLAUDE.md |

## What Was Built

**Task 1 — Anti-anchoring rewrites:**

Seven count anchors removed or softened across Phases 2, 4, 5, and 6:

| Location | Before | After |
|----------|--------|-------|
| Phase 2 Q1 | "Think of 3-4 different people..." | "Think of the different people... as many as come to mind" |
| Phase 4 Q1 | "What 4-6 adjectives?" | "What words come to mind?" + alternative frame |
| Phase 4 Q5 | "Which 2-3 feel like home" | "Which feel like home" |
| Phase 4 phase-complete | "4-6 traits defined" | "Key traits defined" |
| Phase 5 Q1 | "In 3-7 words" | "In a few words" |
| Phase 5 Q11 | "4-6 specific things" | "What specific things?" |
| Phase 6 Q3 | "3-5 non-negotiables?" | "What are your non-negotiables?" |
| Phase 6 Q5 | "List 6-10 words" | "What words describe your voice?" |

Alternative frames added:
- Phase 4 Q1: "Or if that metaphor doesn't land: what energy does your brand bring to a room?"
- Phase 6 Q4: "If that format feels forced, just describe how your writing feels — what would someone say after reading your work?"

Boilerplate length specs ("one sentence," "one paragraph," "three paragraphs" in Phase 5 Q8-10) preserved — these define deliverable format, not discovery anchors.

**Task 2 — Stakeholder Mapping:**

New conditional subsection added to Phase 2 after the Anti-Audience block (before the Research Analyst check-in prompt):
- Q18: Who else beyond customers needs to buy into the brand
- Q19: Whose buy-in is hardest, and what would they push back on
- "Phase complete when" updated to include "key stakeholders identified" for org types
- Follows the established entity-type conditional gate pattern from Phase 1 (mission/vision) and Phase 3 (service definition)

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check

### Files exist:
- CLAUDE.md: modified (not a created file)

### Commits exist:
- 0bc970a: Task 1 anti-anchoring refactor
- 36a2d2e: Task 2 stakeholder mapping feat
