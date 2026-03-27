---
phase: 02-discovery-pipeline-reframe
plan: 02
subsystem: discovery-pipeline
tags: [positioning, competitive-analysis, phase-3, research-analyst, entity-adaptive]

# Dependency graph
requires:
  - phase: 02-discovery-pipeline-reframe plan 01
    provides: Phase 2 audience discovery with Research Analyst hard gate already in place
provides:
  - Phase 3 positioning reframed from fill-in-the-blank to component-by-component exploration (April Dunford methodology)
  - Research Analyst agent with entity-adaptive structured output mapping to positioning components
  - Facilitator Notes section in competitive brief so findings weave into component discussions
affects:
  - phase-03 (Phase 3 facilitator flow depends on component exploration sequence)
  - research-analyst agent (output structure changes how findings are consumed)
  - workspace/research/competitive-brief.md (output format changed)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Component-first positioning: explore alternatives, unique attributes, value, category BEFORE synthesis statement"
    - "Entity-adaptive framing: business/org vs personal brand/creator conditional instruction sets within a single phase"
    - "Agent output mapped to facilitator workflow: structured sections align to conversation sequence, not just analytical categories"

key-files:
  created: []
  modified:
    - CLAUDE.md
    - .claude/agents/research-analyst.md

key-decisions:
  - "Phase 3 positioning opens with Competitive Alternatives (entity-adaptive), not a fill-in-the-blank template -- fill-in-the-blank is the synthesis capstone at question 9"
  - "Research Analyst output restructured into Competitive Alternatives Landscape, Claims & Differentiators / Voice & Perspective Differentiation, Category Framing, Language Patterns & White Space, Facilitator Notes -- sections map directly to Phase 3 component exploration sequence"
  - "Research Analyst inputs formalized to include entity type from STATE.md, enabling entity-adaptive analysis path selection at runtime"

patterns-established:
  - "Entity-adaptive instructions: use STATE.md entity type to select between business/org vs personal brand/creator question framing -- don't ask both, pick one"
  - "Facilitator Notes as agent output section: 2-3 actionable observations formatted as When discussing [component], you might reference: [finding]"

requirements-completed: [PIPE-03]

# Metrics
duration: 2min
completed: 2026-03-27
---

# Phase 02 Plan 02: Discovery Pipeline Reframe Summary

**Phase 3 positioning reframed from fill-in-the-blank opener to April Dunford-style component exploration (competitive alternatives, unique attributes, value enabled, category framing, synthesis), with Research Analyst output restructured to feed each component directly**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-03-27T15:09:28Z
- **Completed:** 2026-03-27T15:11:00Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Phase 3 "The Positioning" section replaced with 10-question component exploration sequence — fill-in-the-blank now at question 9 as synthesis capstone
- Entity-adaptive framing added to Competitive Alternatives (business/org vs personal brand/creator conditional question sets)
- Research Analyst agent restructured with formalized inputs (entity type, named competitors, audience segments, industry/domain) and entity-adaptive output sections that map directly to Phase 3 component sequence
- CLAUDE.md Agent Table input column updated to reference STATE.md fields explicitly

## Task Commits

Each task was committed atomically:

1. **Task 1: Reframe Phase 3 positioning section in CLAUDE.md** - `8c76911` (feat)
2. **Task 2: Update Research Analyst agent definition and CLAUDE.md agent table** - `c756369` (feat)

**Plan metadata:** (pending final commit)

## Files Created/Modified
- `/Users/kelseyruger/Projects/a-emporium-working/gold-master-projects/brand-compass/CLAUDE.md` - Phase 3 positioning section rewritten; Agent Table input column updated
- `/Users/kelseyruger/Projects/a-emporium-working/gold-master-projects/brand-compass/.claude/agents/research-analyst.md` - Formalized inputs, entity-adaptive analysis paths, structured output sections mapped to positioning components

## Decisions Made
- Fill-in-the-blank positioning template moved from question 1 (opener) to question 9 (synthesis capstone). It now reads "based on everything we've just explored" -- forcing component exploration first.
- Competitive Alternatives uses entity-adaptive framing: business/org clients explore named competitors and real alternatives; personal brand/creator clients explore what their audience would turn to instead. STATE.md entity type determines which path.
- Research Analyst Facilitator Notes section added to bridge agent output to facilitator conversational use -- formatted as actionable drop-in references per component, not raw findings.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Phase 3 component exploration sequence is complete and ready for facilitator use
- Research Analyst output format aligned to feed component discussions
- Remaining plans in phase 02 can proceed (Phase 2 discovery questions, push trigger refinements)

## Self-Check: PASSED

- CLAUDE.md: FOUND
- .claude/agents/research-analyst.md: FOUND
- .planning/phases/02-discovery-pipeline-reframe/02-02-SUMMARY.md: FOUND
- Commit 8c76911: FOUND (Task 1)
- Commit c756369: FOUND (Task 2)

---
*Phase: 02-discovery-pipeline-reframe*
*Completed: 2026-03-27*
