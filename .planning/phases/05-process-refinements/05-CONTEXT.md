# Phase 5: Process Refinements - Context

**Gathered:** 2026-03-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Refine existing processes with conditional logic and codified mappings: brand architecture detection for multi-offer clients, client dynamic state tracking in STATE.md, anti-anchoring audit across discovery questions, verbal-to-visual translation reference file, stakeholder mapping for org entity types, and core+flex/AI-generation rules in Phase 7. All changes are to CLAUDE.md, STATE-template.md, agent definitions, and one new reference file. No new agents, no new phases, no new deliverables.

</domain>

<decisions>
## Implementation Decisions

### Brand Architecture Conditional (PROC-01)
- Trigger at **Phase 0 onboarding** — detect when the client describes multiple distinct offerings during the "what do you do" question
- **Simple binary question:** "Are these different offerings under ONE brand, or do they need SEPARATE brand identities?" Not the full branded-house/endorsed/house-of-brands spectrum — most Brand Compass clients are solopreneurs or small orgs where that level of nuance is unnecessary
- If **one brand** → proceed normally, all offerings under a single brand identity
- If **separate brands** → client picks which brand to develop first. Others captured as "future engagements" in STATE.md. No parallel brand tracks — the system is designed for one brand at a time
- Store decision in **new STATE.md Client section field**: `Brand Architecture: [single brand / multiple — developing: X, noted for future: Y, Z]`
- Add corresponding field to `workspace/STATE-template.md`
- Add conditional logic to CLAUDE.md Phase 0 section (or start.md) — only fires when multiple offerings are mentioned

### Client Dynamic State (PROC-02)
- New **Client Dynamic** section in STATE.md template, below the existing Client section
- **Four semi-structured fields:**
  1. **Interaction style:** Free-text description of how the client communicates (e.g., "verbose, prefers options over open questions, thinks out loud")
  2. **Pushback calibration:** Level + reasoning (e.g., "medium-high — responds well to direct challenge but needs the reasoning spelled out first")
  3. **Emotional moments:** Timestamped list of moments where the client lit up, got defensive, or showed strong energy — breadcrumbs for revisiting brand truths
  4. **Voice notes:** Running list of raw quotes, distinctive vocabulary, recurring metaphors — feeds Voice Analyzer and prevents Copywriter from defaulting to generic register
- **Update cadence:** Phase transitions only — when STATE.md is already being written. Observations accumulate in discovery notes and get consolidated at phase end. No mid-conversation writes that break rhythm
- **Calibration-aware pushback audit:** The existing pushback audit self-check (Phase 3 addition) reads the pushback calibration level. For high-calibration clients: "Did I push hard enough?" For low-calibration clients: "Did I push with enough reasoning to land?" Adaptive rather than binary

### Anti-Anchoring Audit (PROC-03)
- Audit discovery questions across Phases 1-4 in CLAUDE.md for anchoring bias
- Apply three principles: (1) open-ended framing before structured framing, (2) remove leading number specifications (e.g., "list 3 values" → "what values guide you?"), (3) offer multiple frames rather than single prompts where appropriate

### Claude's Discretion
- Anti-anchoring audit depth and specific question rewrites (PROC-03) — Claude determines which questions need rewriting vs. which are already well-framed
- Visual translation reference file format, scope, and location (PROC-04) — Claude determines the most useful mapping structure (archetype → visual, personality → color, voice → visual register)
- Stakeholder mapping question wording and placement within Phase 2 (PROC-05) — follows established entity-type conditional pattern
- Core+flex framing specifics for Phase 7 (PROC-06) — Claude determines which elements are "core" (fixed) vs. "flex" (adaptable) and how AI-generation rules are structured
- All PROC-04/05/06 implementations follow established patterns from prior phases — no novel patterns needed

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Entity-type conditional pattern** (CLAUDE.md Phases 1, 3): Already implemented for mission/vision and service definition — same gating logic applies to brand architecture trigger and stakeholder mapping
- **STATE-template.md Client section**: Already has Competitors, Visual Adjectives, Accessibility fields — Brand Architecture and Client Dynamic follow the same template pattern
- **Pushback Audit** (CLAUDE.md, added in Phase 3): Existing self-check at phase closing — calibration-aware version extends this, doesn't replace it
- **Passive Voice Capture** (CLAUDE.md): Already instructs facilitator to capture raw language — Voice Notes in Client Dynamic formalizes where these are stored
- **start.md onboarding groups**: Already organized into Group 1 (Identity), Group 2 (Platforms), Group 3 (Brand Context), Group 4 (Asset Packs) — brand architecture conditional fits in Group 1 or Group 3

### Established Patterns
- Entity-type check reads STATE.md `Type` field to gate conditional questions
- STATE.md fields use consistent format: `Field Name: [value]`
- Discovery questions are numbered sequentially within each phase section
- Agent definitions in `.claude/agents/` use markdown with structured sections

### Integration Points
- **start.md** → brand architecture question (conditional on multiple offerings mentioned)
- **STATE-template.md** → new Brand Architecture field + new Client Dynamic section
- **CLAUDE.md Phase 0** → reference to brand architecture conditional
- **CLAUDE.md Phases 1-4** → anti-anchoring rewrites across discovery questions
- **CLAUDE.md Phase 2** → stakeholder mapping conditional for org types
- **CLAUDE.md Phase 7** → core+flex framing + AI-generation rules section
- **CLAUDE.md Pushback Audit** → calibration-aware self-check update
- **New reference file** (PROC-04) → verbal-to-visual mappings, referenced from CLAUDE.md Phase 7

</code_context>

<specifics>
## Specific Ideas

- Brand architecture question should feel like a natural part of onboarding, not a technical architecture decision — "You mentioned X, Y, and Z. Are these all part of one brand, or do some of them need their own identity?" Not "What is your brand architecture model?"
- Client dynamic section should read like a facilitator's private notebook, not a clinical assessment — the goal is to help the next session feel like the facilitator remembers the client, not like they're reading a dossier
- Anti-anchoring is about removing subtle bias from questions, not rewriting the entire discovery sequence — light touch where questions are already well-framed, deeper rewrites only where the framing genuinely anchors the response

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 05-process-refinements*
*Context gathered: 2026-03-27*
