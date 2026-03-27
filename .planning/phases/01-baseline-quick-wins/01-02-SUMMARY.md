---
phase: 01-baseline-quick-wins
plan: 02
subsystem: discovery
tags: [claude-md, orchestration, discovery-questions, agent-triggers, phase-2, phase-3, phase-5, phase-7]

# Dependency graph
requires:
  - phase: 01-01
    provides: clean baseline CLAUDE.md committed to git
provides:
  - Updated CLAUDE.md with 6 quick-win edits applied
  - Competitive alternatives question in Phase 2 (Dunford methodology)
  - Push/habit force and anxiety force questions in Phase 2 Market of One (JTBD)
  - Outside-in category question in Phase 3 Territory
  - Accessibility constraints section as Phase 7 opening
  - Research Analyst changed from optional to required with hard Phase 2/3 gate
  - Mandatory devil's advocate pass in Phase 5 messaging
  - Phase 0 reference note pointing to start.md for full onboarding question set
affects:
  - 01-03 (checkpoint-a quick wins reference same CLAUDE.md)
  - 01-04 (start.md quick wins for QW-3/4/5)
  - All future brand engagements run via CLAUDE.md

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Discovery questions numbered sequentially within each subsection"
    - "Agent triggers in Agent Table use imperative voice: Required vs. Optional"
    - "Phase transition gates documented inline after Phase complete when line"

key-files:
  created: []
  modified:
    - CLAUDE.md

key-decisions:
  - "QW-1 placed in Phase 2 Finding Common Thread (after Q6) not Phase 3 — customer-perspective competitive analysis belongs with audience work"
  - "QW-2 placed after Q9 (What keeps them up at night) not Q10 — push/habit and anxiety forces enrich the Market of One portrait, not the outcome confirmation"
  - "Research Analyst is a hard gate: Phase 3 cannot start until it completes — no escape hatch"
  - "Devil's advocate pass is mandatory before Phase 5 finalization, not optional pushback"
  - "Accessibility questions open Phase 7 as design constraints, not afterthoughts appended to the visual direction section"

patterns-established:
  - "Phase transition gates: add inline between Phase complete when and the next phase heading"
  - "Required vs Optional agents: agent table Trigger column uses Required or Optional as first word"

requirements-completed: [DSCV-01, DSCV-02, DSCV-06, DSCV-07, AGNT-01, AGNT-03]

# Metrics
duration: 3min
completed: 2026-03-27
---

# Phase 01 Plan 02: CLAUDE.md Quick Wins Summary

**Six surgical edits to CLAUDE.md: 4 discovery question additions (QW-1/2/6/7), Research Analyst trigger changed to required hard gate (QW-8), mandatory devil's advocate pass added to Phase 5 (QW-10)**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-27T11:00:22Z
- **Completed:** 2026-03-27T11:03:26Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments

- Added 7 new discovery questions across Phases 2, 3, and 7 (QW-1, QW-2, QW-6, QW-7) with proper sequential renumbering
- Changed Research Analyst from passive/optional to Required with auto-launch at Phase 2 completion and a hard gate blocking Phase 3 (QW-8)
- Added mandatory Devil's Advocate Pass to Phase 5 requiring facilitator to challenge chosen messaging against Phase 3 positioning before finalization (QW-10)
- Added Phase 0 reference note directing to start.md for full onboarding question set (QW-3/4/5 prep)

## Task Commits

Each task was committed atomically:

1. **Task 1: Add discovery questions to CLAUDE.md Phases 2, 3, and 7** - `8142bd9` (feat)
2. **Task 2: Change Research Analyst trigger and add devil's advocate pass** - `672b2d9` (feat)

**Plan metadata:** (pending final commit)

## Files Created/Modified

- `CLAUDE.md` - Added 7 discovery questions, changed Research Analyst to required, added devil's advocate pass, added Phase 0 note, added Phase 2/3 gate text

## Decisions Made

- QW-1 placed in Finding Common Thread (after Q6 "real problem") rather than Market of One — the competitive alternatives question is about the audience's alternatives, which belongs with the audience-understanding thread, not the single-person portrait
- QW-2 push/habit and anxiety forces placed after Q10 "What keeps them up at night?" — they extend the psychological portrait before moving to outcome/differentiation questions
- Research Analyst gate worded with "MUST" and "no escape hatch" to make the hard dependency explicit for the LLM orchestrator — soft language gets soft compliance
- Devil's advocate pass includes a 3-step protocol (check against positioning, generate alternative, present framing) to ensure consistent execution across engagements

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

Minor: After adding QW-7 accessibility questions as new Q1-3 in Phase 7, the first Visual Direction question accidentally retained its old number (1) while the subsequent ones didn't get renumbered yet. Fixed in the same edit by renumbering all Visual Direction through Application questions (original Q1-21 became Q4-24). Not a blocking issue — caught and corrected before commit.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- CLAUDE.md updated with all 6 quick wins from this plan
- Plan 01-03 (checkpoint quick wins) can proceed — targets checkpoint-a.md and checkpoint-b.md, which are separate files
- Plan 01-04 (start.md quick wins) can proceed — targets the /brand-compass:start command file for QW-3/4/5

---
*Phase: 01-baseline-quick-wins*
*Completed: 2026-03-27*
