# Phase 3: Output Quality - Context

**Gathered:** 2026-03-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Improve the quality and specificity of what the system already produces — add a customer-hero story framework to Phase 5, integrate accessibility as a design constraint flowing from Phase 7 questions through the Visual Director to the color palette HTML, install structural anti-sycophancy mechanisms (checkpoint challenge protocol, pushback audit, brand stress test), and add voice compliance verification to the Brand Verifier agent. No new deliverable types, no new agents — extending existing capabilities.

</domain>

<decisions>
## Implementation Decisions

### Customer-Hero Story Framework (QUAL-01)
- Lives in **Phase 5 discovery** — Copywriter generates both brand-origin and customer-hero narratives as separate options
- Uses the explicit **5-beat guide/hero structure**: (1) Customer has a problem, (2) They meet the guide (brand), (3) Guide gives them a plan, (4) They take action, (5) They succeed
- **Market of One from Phase 2 is the protagonist** — no new composite character needed. Phase 2 already captured their pain, context, and before/after
- **3-4 focused discovery questions** added to Phase 5 covering the beats Phase 2 didn't capture: how the customer encounters the brand, the "aha" moment, the plan/path offered, and what success looks like in the customer's words
- Phase 2 already has the problem/pain beats — Phase 5 questions avoid re-asking

### Accessibility Constraint Flow (QUAL-02)
- Accessibility discovery answers (already captured in Phase 7 opening) are **stored in a STATE.md 'Accessibility' field** — audience needs, compliance level, highest-risk platform
- **Visual Director agent definition updated to read the STATE.md Accessibility field as hard constraints** before generating visual direction
- **WCAG AA is the universal floor** for all clients. **AAA auto-escalated for regulated sectors** (government, healthcare, education). The facilitator doesn't ask the client to choose a level — it's determined by sector
- Color palette HTML always **labels which combinations also meet AAA**, even when AA is the requirement — clients can opt up by choosing from the labeled set
- Approved accessible combinations section uses a **pairing matrix** — grid of every foreground/background combination with contrast ratio, labeled AA/AAA/Fail, approved pairings highlighted, copyable CSS for each approved pair

### Anti-Sycophancy Architecture (QUAL-03)
- Checkpoint challenge expanded from paragraph instruction to **structured 4-step protocol**: (1) Identify weakest element, (2) Name specifically why it's weak, (3) Propose a stronger alternative, (4) Client must engage — accept revision or defend with reasoning
- **Pushback audit trigger** = self-check at the end of each discovery phase (1-6). Facilitator asks: "Did I push back at least once this phase? On what?" If zero pushback, must identify one area where the client's answer was too safe/generic and challenge it before closing the phase
- **Brand stress test in Phase 8** = apply the decision filter (5-7 yes/no questions) to 3 boundary-case scenarios: one that should clearly pass, one that should clearly fail, and one gray area. If the filter lets everything through or blocks everything, it's too loose/tight — facilitator adjusts

### Voice Compliance Verification (QUAL-04)
- **Brand Verifier agent definition** gets a new voice compliance check that compares generated output against the voice fingerprint using **quantitative metrics**:
  - **Sentence length distribution**: Compare average and range against fingerprint. Flag if average >30% off
  - **Signature move presence**: Check that each identified signature move appears at least once in longer outputs. Flag missing signatures
  - **Banned phrase scan**: Scan for any phrase in the voice guardrails "never use" list. Flag with exact location
  - **Vocabulary register**: Assess formal/casual ratio against fingerprint's polished-to-conversational ratio. Flag significant mismatches
- Divergence = **flagged for human review** with specific metrics and line references. No auto-rejection, no auto-regeneration — facilitator decides whether to revise or accept

### Claude's Discretion
- Exact wording of the 3-4 customer-hero discovery questions in Phase 5
- How the customer-hero story option is presented alongside the brand-origin narrative in Copywriter output
- Exact format of the STATE.md Accessibility field
- How the Visual Director agent definition structures the constraint-reading logic
- Pairing matrix HTML layout and styling details
- Specific thresholds for voice compliance metrics (>30% is a starting point, can be tuned)
- How the pushback audit self-check is worded in CLAUDE.md phase instructions

</decisions>

<specifics>
## Specific Ideas

- The customer-hero structure follows the StoryBrand pattern (Donald Miller) — customer as protagonist, brand as guide. This is a well-known framework that clients will recognize
- The 5-beat structure (problem → guide → plan → action → success) should be named explicitly in the Copywriter's instructions so it's a repeatable framework, not ad-hoc narrative construction
- The pairing matrix for accessible color combinations should follow the pattern used by major design systems (Material, Carbon) — grid format with contrast ratios is the industry standard
- Pushback audit self-check should feel like professional self-discipline, not bureaucratic compliance — the wording matters

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Copywriter agent** (`.claude/agents/copywriter.md`): Already generates narrative options with varying structural angles. Customer-hero framework adds a new narrative type alongside existing brand-origin
- **Brand Verifier agent** (`.claude/agents/brand-verifier.md`): Already has Level 4 (Coverage) and Level 5 (Personality Alignment) checks. Voice compliance becomes a new check level
- **Voice Analyzer agent** (`.claude/agents/voice-analyzer.md`): Already produces detailed quantitative fingerprint with sentence length, signature moves, banned phrases, vocabulary metrics — the exact data the voice compliance check needs
- **Checkpoint A/B commands** (`.claude/commands/brand-compass/checkpoint-a.md`, `checkpoint-b.md`): Already have "challenge weakest element" paragraph — expanding to structured protocol

### Established Patterns
- Entity-type conditional logic already exists in CLAUDE.md Phase 1 and Phase 3 — same pattern applies if customer-hero story needs entity-adaptive framing
- STATE.md already has Competitors and Visual Adjectives fields — Accessibility field follows the same pattern
- Phase 5 discovery questions are numbered sequentially — new customer-hero questions follow the same format
- Visual Director already reads design constraints from personality/archetype data — accessibility constraints follow the same input pattern

### Integration Points
- Phase 5 customer-hero questions → Copywriter input (agent reads Phase 5 discovery notes)
- Phase 7 accessibility answers → STATE.md Accessibility field → Visual Director constraint input
- Visual Director approved palette → Color palette HTML accessible combinations section
- Voice Analyzer fingerprint (`workspace/research/voice-fingerprint.md`) → Brand Verifier voice compliance check
- Checkpoint A/B commands → structured challenge protocol (both commands need same update)
- Phase 1-6 closing instructions in CLAUDE.md → pushback audit self-check

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-output-quality*
*Context gathered: 2026-03-27*
