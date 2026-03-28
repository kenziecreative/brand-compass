# Phase 7: Sync Phase 2 & Phase 5 Commands - Context

**Gathered:** 2026-03-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Update phase-2-audience.md, phase-5-messaging.md command files and the Document Assembler agent template to match the CLAUDE.md spec built across Phases 1-6. This is a sync/integration phase — the decisions about what these files should contain were already made. The command files and agent template just haven't been updated to match.

</domain>

<decisions>
## Implementation Decisions

### Question parity depth
- Full parity with CLAUDE.md — command files get all questions verbatim, same numbering, same wording
- Include all conditional annotations (entity-type conditionals, skip conditions, framing notes) so command files are self-contained
- Question numbering matches CLAUDE.md exactly (e.g., Q7, Q11, Q12, Q18-19 for Phase 2) for cross-referencing with success criteria
- Research Analyst step renamed from "Step 4: Optional Agent" to "Step 4: Launch Research Analyst (Required)" with explicit hard gate: "Do not proceed to Phase 3 until Research Analyst completes"

### Devil's advocate in Phase 5 command
- Full 3-step protocol as a dedicated step between "Refine & Confirm" and "Mark Complete": (1) check tagline against positioning, (2) generate contradicting alternative, (3) present tradeoff
- Pushback audit referenced in the Mark Complete step — silent self-check before closing the phase
- Copywriter launch prompt updated to mention customer-hero narrative (devil's advocate happens after Copywriter output, during selection — doesn't change what Copywriter generates)

### Conversation guidelines update
- Add phase-relevant directives, not full CLAUDE.md mirrors
- Phase 2 guidelines additions: voice capture reminder (capture vivid client phrases verbatim for Voice Notes), Research Analyst hard gate reinforcement ("Do NOT start Phase 3 until Research Analyst completes — no escape hatch")
- Phase 5 guidelines additions: pushback reminder (challenge safe choices), voice capture (note how client describes their story)
- Keep guidelines focused on phase-specific behavior, not system-wide directives

### Document Assembler customer-hero slot
- Customer-Hero Narrative placed after Core Narrative in Section 4: Tagline → Core Narrative → Customer-Hero Narrative → Boilerplates → Proof Points
- Source annotation: `[From Phase 5 / Copywriter — customer as protagonist, brand as guide]`
- Added to both markdown template AND HTML template spec (brand-foundation.html mirrors markdown structure)

### Claude's Discretion
- Exact wording of new conversation guideline bullets
- How to structure the Phase 5 step numbering (current steps shift to accommodate new devil's advocate step)
- Whether to add any minor formatting improvements while editing the command files

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `phase-2-audience.md`: Current structure has 6 steps (Check Prerequisites → Set Position → Discovery → Optional Agent → Synthesize → Mark Complete). Step 4 needs restructuring, Steps 3 needs question expansion.
- `phase-5-messaging.md`: Current structure has 6 steps (Check Prerequisites → Set Position → Discovery → Launch Copywriter → Refine → Mark Complete). Needs new step for devil's advocate between Refine and Mark Complete.
- `document-assembler.md`: Section 4 template at line ~259-272 has Tagline, Core Narrative, Boilerplates, Proof Points. Customer-Hero Narrative slot inserts between Core Narrative and Boilerplates.

### Established Patterns
- Entity-type conditionals use italic annotation: `*(Ask these only if entity type is business/organization...)*`
- Anti-anchored questions use open-ended framing before structured options, removed count specifications
- CLAUDE.md Phase 2 has 19 questions across 5 groups (Identifying Segments, Finding Common Thread, Market of One, Anti-Audience, Stakeholder Mapping)
- CLAUDE.md Phase 5 has 18 questions across 5 groups (Tagline, Brand Story, Boilerplates, Proof Points, Customer-Hero Story)

### Integration Points
- Phase 2 command → Research Analyst agent (hard gate before Phase 3)
- Phase 5 command → Copywriter agent (launch prompt references customer-hero)
- Document Assembler → brand-foundation.md template (Section 4) + brand-foundation.html spec
- Customer-Hero Pipeline: Phase 5 discovery Q15-18 → Copywriter → Document Assembler Section 4

</code_context>

<specifics>
## Specific Ideas

- Command files should be self-contained — a facilitator running `/brand-compass:phase-2-audience` shouldn't need to cross-reference CLAUDE.md for question lists or conditional logic
- The Research Analyst hard gate in Phase 2 is the most critical sync item — it's a process-integrity issue, not just a wording update

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 07-sync-phase2-phase5-commands*
*Context gathered: 2026-03-27*
