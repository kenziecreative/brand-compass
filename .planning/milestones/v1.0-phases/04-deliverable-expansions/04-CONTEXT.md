# Phase 4: Deliverable Expansions - Context

**Gathered:** 2026-03-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Add new deliverable sections and outputs to the brand system: motion direction, Brand Compass Card, activation layer, semantic design tokens, content pillars, channel-voice matrix, systematic do/don't examples, accessible color combinations, strategic quick reference card, and brand stress test. This is about expanding WHAT the system produces — changes to CLAUDE.md Phase 7/8 sections, agent definitions (Visual Director, Document Assembler), and HTML templates.

</domain>

<decisions>
## Implementation Decisions

### Motion Direction (DLVR-01)
- Depth level: Principles + defaults — brand motion principles, recommended default timing/easing values, and reduced-motion fallback guidance. Not a full motion system with named animation tokens, but enough for a developer to implement consistent animations.
- Ownership: Visual Director generates motion direction as part of visual-direction.md. Document Assembler reads it and renders into visual-system.html. All visual decisions stay in one place.
- Reduced motion: Inline with each motion recommendation — each value includes its reduced-motion alternative right next to it (e.g., "Fade in over 300ms → reduced: instant appear"). Not a separate subsection.
- Discovery input: Add 2-3 motion-specific questions to Phase 7 discovery (before Visual Director launch). Questions like "Should interactions feel snappy or smooth?" and "How much movement is appropriate?" Give the Visual Director explicit client input.

### Brand Compass Card (DLVR-02)
- Format: Visual HTML diagram — 9-element strategic synthesis rendered as a branded HTML layout (center element surrounded by supporting elements, Unilever Brand Key model). Printable, scannable.
- Location: New section within brand-foundation.html, not a standalone file. Keeps all strategic content in one deliverable.
- No markdown-only version — the visual layout IS the deliverable.

### Activation Layer (DLVR-03)
- Structure: Prioritized checklist — implementation priority list ordered by impact, self-audit checklist, and internal brief template for orgs. No fixed 30-day timeline — client works through priorities at their own pace.
- Entity-type conditional: Shared checklist for everyone. Orgs get additional items: internal brief template, stakeholder rollout guidance, team alignment steps. Mirrors the entity-type conditionals already in Phases 1 and 3.
- Lives in practical-toolkit.md as a new section.

### Semantic Design Tokens (DLVR-04)
- Depth: Purpose-based names (--color-surface, --color-text-primary, --color-action, --color-feedback-success) mapped to the brand's palette values.
- Export: DTCG-format JSON block covering BOTH semantic color tokens AND structural Design System Parameters (radii, shadows, spacing, font weights). One JSON block a developer can import wholesale.
- Location: New section in color-palette.html after the tint scales.

### Accessible Color Combinations (DLVR-07)
- Format: Visual pairing cards showing each approved foreground/background combo with contrast ratio and pass/fail badges (AA, AAA).
- Location: In color-palette.html after the semantic tokens section. Visual Director already checks compliance — this makes it visible.

### Content Pillars (DLVR-05)
- Relationship to existing: Expand the Content Territories section in practical-toolkit.md. Add 3-5 named content pillars as a subsection within Content Territories. Each pillar gets a name, description, and example topics. Builds on "Topics I Own" rather than replacing it.
- Channel-voice matrix: Styled table in voice-guide.html. Rows = channels (Twitter, LinkedIn, Newsletter, Website, etc.), columns = voice dimensions (formality, length, signature moves, emoji policy). Extends the existing "Scaling by Context" from Phase 6.

### Do/Don't Examples (DLVR-06)
- Density: Key sections only — color usage (color-palette.html), imagery guidelines (visual-system.html), voice-by-context (voice-guide.html). 2-3 pairs per section with rationale.
- Pattern: Extend the existing .do-dont-grid CSS pattern from voice-guide.html into the other specimens. Consistent visual treatment across all specimens.

### Strategic Quick Reference Card (DLVR-08)
- Content: One-page strategic summary — core belief, positioning statement, audience in one sentence, tagline, 3 personality traits, contrarian POV, and territory. The "remind me who I am" card.
- Location: In practical-toolkit.md alongside the existing implementation quick reference (hex codes, fonts). Two distinct cards: strategic identity vs. implementation specs.

### Brand Stress Test (DLVR-09)
- Already defined in Phase 3 anti-sycophancy work: Apply decision filter to 3 boundary-case scenarios (clear pass, clear fail, gray area). Validate filter discrimination.
- Lives in practical-toolkit.md Phase 8 section. Document Assembler generates scenarios from the client's positioning and audience.

### Claude's Discretion
- Visual layout of the Brand Compass Card HTML (exact arrangement of 9 elements)
- Specific motion discovery question wording
- Which content pillar names to suggest based on Phase 3/4 outputs
- Do/don't example selection for each specimen section
- Stress test scenario generation
- Channel list for the voice matrix (based on client's platform inventory from Phase 0)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `.do-dont-grid` CSS pattern in voice-guide.html example: Two-column grid with `.do-card` / `.dont-card` styled cards. Extend this pattern into color-palette.html and visual-system.html.
- Design System Parameters extraction in Document Assembler: Already reads CSS custom properties from visual-direction.md. Motion direction can follow the same extraction pattern.
- Entity-type conditional pattern: Already implemented in Phases 1 and 3 for mission/vision and service definition. Activation layer org-additions follow the same STATE.md entity type check.
- Color-palette.html tint scale structure: Existing section organization (base colors → tint scales → CSS variables). Semantic tokens and accessible combos slot in after tint scales.

### Established Patterns
- Visual Director writes visual-direction.md → Document Assembler reads and renders into HTML specimens. Motion direction follows this same pipeline.
- CLAUDE.md Phase sections contain discovery questions → agent definitions contain processing instructions → HTML templates contain rendering specs. Each new deliverable needs all three touchpoints.
- practical-toolkit.md is markdown-only (no HTML counterpart). New sections (activation layer, strategic quick ref, content pillars, stress test) are all markdown.

### Integration Points
- CLAUDE.md Phase 7: Add motion discovery questions (before Visual Director launch, after accessibility questions)
- CLAUDE.md Phase 8: Add Brand Compass Card, activation layer, strategic quick reference card, brand stress test, expanded content territories as named deliverables
- Visual Director agent: Add motion direction output section to visual-direction.md template
- Document Assembler agent: Add Brand Compass Card rendering, semantic tokens section, accessible combos section, do/don't grid extension, channel-voice matrix table
- color-palette.html example template: Add semantic tokens section + accessible combos section
- visual-system.html example template: Add motion direction section + do/don't examples
- voice-guide.html example template: Add channel-voice matrix table + extend existing do/don'ts

</code_context>

<specifics>
## Specific Ideas

- Brand Compass Card should feel like a strategic artifact — a visual diagram, not a bullet list. Center element with surrounding elements, inspired by Unilever Brand Key model.
- Activation layer is a prioritized checklist, not a timeline. Clients should feel empowered to act at their own pace, not pressured by a week-by-week schedule.
- DTCG JSON export should be comprehensive (color + structural tokens) so a developer can import the entire brand system in one block.
- Accessible color combos presented as pairing cards — visual and practical, not just a compliance table.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 04-deliverable-expansions*
*Context gathered: 2026-03-27*
