---
phase: 04-deliverable-expansions
plan: "03"
subsystem: documentation
tags: [document-assembler, html-specimens, design-tokens, accessibility, motion, voice]

# Dependency graph
requires:
  - phase: 04-deliverable-expansions
    provides: "04-01 established motion pipeline in Visual Director; 04-02 established markdown toolkit additions"
provides:
  - "Document Assembler HTML spec for semantic design tokens in color-palette.html"
  - "Document Assembler HTML spec for DTCG-format JSON export block"
  - "Document Assembler HTML spec for accessible color combination pairing cards"
  - "Document Assembler HTML spec for color do/don't examples"
  - "Document Assembler HTML spec for motion direction section in visual-system.html"
  - "Document Assembler HTML spec for imagery do/don't examples in visual-system.html"
  - "Document Assembler HTML spec for channel-voice matrix table in voice-guide.html"
  - ".do-dont-grid cross-specimen pattern reference in Before Starting Work"
affects: [document-assembler, workspace/output/color-palette.html, workspace/output/visual-system.html, workspace/output/voice-guide.html]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Semantic design token naming convention: --color-surface, --color-action, --color-text-primary etc."
    - "DTCG JSON format for design token export (color + structural tokens in one block)"
    - ".do-dont-grid CSS pattern extending from voice-guide.html into color-palette.html and visual-system.html"
    - "Channel-Voice Matrix table: platform rows from STATE.md, voice dimension columns"
    - "Motion timing table: Category/Duration/Easing/Reduced-Motion-Alternative columns"

key-files:
  created: []
  modified:
    - ".claude/agents/document-assembler.md"

key-decisions:
  - "Semantic tokens use 13 purpose-based names covering surface, text, action, border, and feedback categories"
  - "DTCG JSON export block is comprehensive (color + structural tokens) so developers import entire brand system in one block"
  - "Accessible combination cards flag failures per client's compliance level (AA or AAA) from STATE.md with red border treatment"
  - "Reduced-motion alternatives appear inline in the motion timing table (not a separate section)"
  - "Channel-Voice Matrix draws platform rows from client's STATE.md platform inventory, not a static list"

patterns-established:
  - ".do-dont-grid pattern: two-column grid with .do-card/.dont-card — originates in voice-guide.html, extends to color-palette.html and visual-system.html"
  - "Motion direction section always includes prefers-reduced-motion CSS guidance note"

requirements-completed: [DLVR-04, DLVR-06, DLVR-07]

# Metrics
duration: 5min
completed: 2026-03-27
---

# Phase 04 Plan 03: HTML Specimen Specs — Semantic Tokens, Accessible Combos, Motion, Do/Don'ts, Channel-Voice Matrix

**Document Assembler updated with HTML rendering specs for semantic design tokens (DTCG JSON export), accessible color combination pairing cards, motion direction timing table, imagery do/don'ts, and channel-voice matrix across color-palette.html, visual-system.html, and voice-guide.html**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-27T21:57:24Z
- **Completed:** 2026-03-27T22:02:47Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments
- color-palette.html spec expanded with 13-token semantic design system (purpose-based naming, two-column card grid), DTCG JSON export block covering both color and structural tokens, accessible color combination pairing cards with AA/AAA badges and compliance-level failure flagging, and color do/don't examples
- visual-system.html spec expanded with motion direction section (principle cards, timing table with inline reduced-motion alternatives, prefers-reduced-motion note) and imagery do/don't examples
- voice-guide.html spec expanded with channel-voice matrix table (platform rows from STATE.md, voice dimension columns, brand-colored header)
- .do-dont-grid cross-specimen pattern documented in Before Starting Work so Document Assembler knows it's the shared pattern for all HTML files

## Task Commits

Each task was committed atomically:

1. **Task 1: Add semantic tokens + accessible combos specs to color-palette.html** - `1cdb879` (feat)
2. **Task 2: Add motion section + do/don'ts to visual-system.html, channel-voice matrix to voice-guide.html** - `6cc4bd4` (feat)

**Plan metadata:** (final docs commit — see below)

## Files Created/Modified
- `.claude/agents/document-assembler.md` - Added HTML rendering specs for semantic tokens, DTCG export, accessible combos, motion direction, imagery do/don'ts, and channel-voice matrix; updated Personality Application Notes for new sections; added .do-dont-grid cross-specimen note to Before Starting Work

## Decisions Made
- Semantic tokens cover 13 purpose-based names (surface, text, action, border, feedback categories) — comprehensive enough for any brand system
- DTCG JSON export is a single block covering color + structural tokens so a developer imports the full brand in one operation
- Accessible combination cards flag failures per client's actual compliance level (read from STATE.md Accessibility field) with red border, not just report the ratio
- Reduced-motion alternatives appear inline per row in the motion timing table — consistent with the Phase 04-01 decision to not use a separate section
- Channel-Voice Matrix row count is dynamic from STATE.md platform inventory rather than a static platform list

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 04 all three plans now complete: Visual Director has motion discovery + output spec (04-01), practical-toolkit.md has new toolkit sections (04-02), Document Assembler has HTML rendering specs for all new deliverable sections (04-03)
- Document Assembler is fully equipped to render: semantic tokens, DTCG JSON export, accessible combos, motion direction, do/don'ts across specimens, and channel-voice matrix
- DLVR-04, DLVR-06, DLVR-07 requirements satisfied

---
*Phase: 04-deliverable-expansions*
*Completed: 2026-03-27*
