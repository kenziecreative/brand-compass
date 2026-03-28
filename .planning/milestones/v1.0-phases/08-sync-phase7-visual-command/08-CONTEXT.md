# Phase 8: Sync Phase 7 Visual Command - Context

**Gathered:** 2026-03-28
**Status:** Ready for planning

<domain>
## Phase Boundary

Update phase-7-visual.md command file with all 7 milestone additions that exist in CLAUDE.md Phase 7 but are absent from the command file: accessibility constraints, visual adjective revisit, graphic devices, motion, core+flex, AI-generation rules, and verbal-to-visual reference. This is a sync/integration phase — all decisions about what these additions contain were made in Phases 3-6. The command file just hasn't been updated to match.

</domain>

<decisions>
## Implementation Decisions

### Discovery restructuring
- Full CLAUDE.md mirror — replace entire discovery section with CLAUDE.md's 34-question, 12-group sequence verbatim
- Question groups in order: Accessibility Constraints (Q1-3) → Visual Adjective Revisit (Q4) → Visual Direction (Q5-8) → Color (Q9-12) → Typography (Q13-15) → Mark/Logo (Q16-19) → Imagery (Q20-23) → Graphic Devices (Q24-26) → Motion (Q27-29) → Core+Flex (Q30-31) → AI-Generation Rules (Q32-33) → Application (Q34-35)
- Numbering matches CLAUDE.md exactly for cross-referencing with success criteria
- Full inline annotations included: entity-type conditionals, skip conditions, framing guidance, facilitator processing instructions
- Accessibility Constraint Capture block as bold inline annotation directly after Q1-3 (WCAG AA floor, AAA auto-escalation for regulated sectors, STATE.md update)
- Graphic device skip note as italic inline annotation after Q24-26 ("Not every brand needs these. If nothing surfaces, Visual Director skips pattern generation.")

### Launch prompt & check-in
- Replace launch prompt with CLAUDE.md version verbatim: references personality, archetypes, brand world, motion principles, graphic device direction (if applicable), accessibility requirements as hard constraints on color system
- Expand Visual Director check-in prompt to preview: color rationale, typography rationale, imagery style, mark direction, motion direction, graphic device direction (if applicable), and note that accessibility constraints were applied
- Full CLAUDE.md phase-complete criteria: visual direction approved, color palette finalized, typography selected, mark created, imagery style defined, graphic devices specified (if applicable), motion direction defined, core+flex elements classified, AI-generation rules captured (if applicable)

### Verbal-to-visual reference
- Directive placed in Step 2 (Set Position) as a "before starting discovery" instruction
- Point + purpose framing: "Read .claude/skills/visual-translation/verbal-to-visual-mappings.md. Use mappings as starting points — they inform your questions and help the Visual Director produce more precise output."

### Step structure
- Keep existing 7-step structure unchanged: Check Prerequisites → Set Position → Discovery → Launch Visual Director → Generate Assets → Synthesize & Confirm → Mark Complete
- Step 2 gains verbal-to-visual reference directive
- Step 3 expands from 6 question groups to 12 question groups (still one discovery conversation)
- AI-gen rules compilation noted in Step 4 (after Visual Director approval, before Image Generator)
- Step 6 (Synthesize & Confirm) fully expanded: Color Palette, Typography, Mark/Logo, Imagery Style, Motion Direction, Graphic Devices (if applicable), Core+Flex Classification, AI-Gen Guidelines (if applicable), Colors/Typography to Avoid
- Step 7 (Mark Complete) updated with full completion checklist matching CLAUDE.md

### Conversation guidelines
- Add 3-4 new bullets: accessibility is a hard constraint (not a preference), motion should reflect brand energy, graphic devices are optional (don't push if brand is minimal), core+flex helps clients think about consistency vs. flexibility

### Claude's Discretion
- Exact wording of new conversation guideline bullets
- Minor formatting improvements while editing the command file
- How to phrase the AI-gen rules compilation note in Step 4

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `phase-7-visual.md`: Current 7-step structure with 21 questions across 6 groups. Steps 1-2 and 4-7 need targeted updates; Step 3 needs full replacement
- CLAUDE.md Phase 7 section: Canonical source for all 34 questions, inline annotations, launch prompt, check-in prompt, and completion criteria
- Phase 7 context from Phase 7 sync: Established the "full parity" pattern — command files get all questions verbatim with same numbering

### Established Patterns
- Phase 7 sync (phase-2-audience.md, phase-5-messaging.md): Full CLAUDE.md question parity with entity-type conditionals, self-contained command files
- Inline annotations use italic for conditionals/skip notes, bold for capture/processing blocks
- Step structure preserved across syncs — questions expand within existing steps
- Conversation guidelines at bottom of command file for facilitator-level directives

### Integration Points
- `phase-7-visual.md` → Visual Director agent (launch prompt, blocking gate)
- `phase-7-visual.md` → Image Generator agent (post-approval asset generation)
- `phase-7-visual.md` → STATE.md (accessibility constraints, completion checklist)
- `.claude/skills/visual-translation/verbal-to-visual-mappings.md` → Referenced in Step 2

</code_context>

<specifics>
## Specific Ideas

- This sync follows the exact pattern established in Phase 7 for phase-2-audience.md and phase-5-messaging.md — full CLAUDE.md parity, self-contained, same numbering
- The command file should be readable as a standalone facilitator guide — someone running `/brand-compass:phase-7-visual` shouldn't need to cross-reference CLAUDE.md
- Accessibility capture logic is the most critical sync item — it's a hard constraint chain that feeds Visual Director, not an optional annotation

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 08-sync-phase7-visual-command*
*Context gathered: 2026-03-28*
