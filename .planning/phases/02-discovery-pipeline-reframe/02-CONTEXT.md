# Phase 2: Discovery Pipeline Reframe - Context

**Gathered:** 2026-03-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Structural changes to the discovery pipeline: (1) verify and close PIPE-01 which was already satisfied by Phase 1 quick wins, (2) add visual preference pre-seeding to Phase 0 onboarding, and (3) reframe Phase 3 positioning from fill-in-the-blank to component-by-component exploration with entity-adaptive framing. Also update the Research Analyst agent definition to produce structured, entity-adaptive output that maps to the new positioning sequence.

</domain>

<decisions>
## Implementation Decisions

### PIPE-01 Scope
- PIPE-01 is already satisfied by Phase 1 quick wins (Research Analyst trigger changed to Required, Phase 2→3 hard gate written)
- Include a lightweight verification task that confirms criteria are met and marks PIPE-01 complete in REQUIREMENTS.md
- No new code changes needed for PIPE-01

### Visual Pre-Seeding (PIPE-02)
- Add a curated adjective selection to Phase 0 onboarding — provide 15-20 visual adjectives (bold, minimal, warm, industrial, playful, refined, etc.), client picks 3-5
- Store selections in STATE.md as a "Visual Adjectives" field in the Client section (alongside Competitors)
- Add corresponding field to workspace/STATE-template.md
- At Phase 7 start, facilitator revisits the adjectives explicitly: "You picked these before strategic work. Do they still feel right, or has something shifted?" — catches preference-vs-strategy drift
- This requires updates to: start.md (onboarding command), STATE-template.md, CLAUDE.md Phase 7 section

### Positioning Reframe (PIPE-03)
- Hybrid approach: explore positioning components first, synthesize into statement last
- Current "Complete: For [audience]..." fill-in-the-blank prompt moves from the OPENING of Phase 3's Positioning section to the END as a synthesis/capstone exercise
- New component exploration sequence before synthesis:
  1. Competitive alternatives (reference Research Analyst findings — "Your competitors claim X. What do you have that they don't?")
  2. Unique attributes (what concrete capabilities/approaches distinguish you)
  3. Value enabled (what those attributes make possible for the customer)
  4. Category framing (reference the outside-in category question already added; explore whether the current category serves them)
  5. Synthesis — NOW fill in the positioning statement template with confidence
- Note: "Target audience" component is already covered by Phase 2, so it's skipped in Phase 3
- Entity-adaptive conditional framing throughout:
  - **Business/org:** Competitive alternatives = named competitors, feature/capability gaps, market positioning
  - **Personal brand/creator:** Competitive alternatives = "what would your audience do instead?", voice/perspective differentiation, landscape white space
- The facilitator should weave Research Analyst competitive findings into the component exploration — not just reference them as a separate check-in
- Existing Phase 3 sections (Intersection, Territory, Unifying Lens, Contrarian View, Permission & Credibility, Service Definition) stay intact — they complement the reframed positioning, not replace it

### Research Analyst Agent Update
- Update the Research Analyst agent definition (.claude/agents/research-analyst.md) with:
  - **Structured output sections** mapping to positioning components: (1) Competitive alternatives landscape, (2) Claims competitors make (for unique attribute contrast), (3) Category framing in the market, (4) Language patterns and white space
  - **Entity-adaptive analysis:** Same section headings, but business gets competitor positioning analysis while personal brands get landscape/voice differentiation analysis
  - **Formalized inputs:** Named competitors (from STATE.md), audience segments (from Phase 2 discovery notes), entity type, industry/domain — agent definition specifies exactly what it receives
- Also update the CLAUDE.md Agent Table input column to reflect formalized inputs

### Claude's Discretion
- Exact curated adjective list for visual pre-seeding (15-20 options)
- Specific wording of the component exploration questions
- How to format the Research Analyst structured output sections
- Whether to add facilitator notes or keep conditional framing as inline instructions

</decisions>

<specifics>
## Specific Ideas

- The positioning reframe is inspired by April Dunford's "Obviously Awesome" methodology — build components first, statement writes itself
- For personal brands, "competitive alternatives" means "what would your audience do instead of engaging with you?" — not business competitors in the traditional sense
- The Phase 7 adjective revisit should explicitly call out that these were captured before strategic work: "You picked these before we did any strategic work. Now that we've defined your personality and archetypes, do they still feel right?"

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `workspace/STATE-template.md`: Already has Competitors field from Phase 1 — Visual Adjectives field goes next to it
- `.claude/commands/brand-compass/start.md`: Already has Group 3 (Brand Context) from Phase 1 — visual pre-seeding becomes Group 4 (or added to existing group)
- `.claude/agents/research-analyst.md`: Existing agent definition to be updated with structured output and entity-adaptive analysis

### Established Patterns
- Entity-type conditional logic already exists in CLAUDE.md Phase 1 (mission/vision) and Phase 3 (service definition) — same pattern for positioning component framing
- Phase 0 onboarding follows a grouped question structure (Group 1: Identity, Group 2: Platforms, Group 3: Brand Context, Group 4: Asset Packs) — visual pre-seeding fits as a new group
- Agent table in CLAUDE.md specifies Trigger, Input, Output Location, Blocking — Research Analyst row needs Input column updated

### Integration Points
- start.md question flow → STATE.md fields (onboarding writes state)
- CLAUDE.md Phase 3 section → Research Analyst output (facilitator references competitive brief during positioning)
- CLAUDE.md Phase 7 section → STATE.md Visual Adjectives field (facilitator reads and revisits)
- Research Analyst agent definition → workspace/research/competitive-brief.md (output format)

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-discovery-pipeline-reframe*
*Context gathered: 2026-03-27*
