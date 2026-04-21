# Phase 12: Design Kit - Context

**Gathered:** 2026-04-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Create the design-kit-packager agent (sonnet, Read/Write/Glob/Grep) that produces atomized components, preview cards, root files (README.md, package.json, HANDOFF.md), and a new landing-page.html specimen at `workspace/output/design-kit/`. This agent runs AFTER design-kit-foundation (Phase 10) has already produced tokens and post-processed client specimens. This phase does NOT modify the design-kit-foundation agent, token extraction pipeline, or client specimens.

</domain>

<decisions>
## Implementation Decisions

### Component Personality
- **D-01:** Atomized components (button, card, form-field, nav, modal, alert, badge) are **fully branded** — they implement token values AND brand-specific behaviors from the Component Personality section (Section 8) of `visual-direction.md` (button fills, badge radius, hover states, accent borders).
- **D-02:** Each component HTML file includes a comment block marking which values come from token variables (`var(--color-*)`) vs. which come from Component Personality decisions, so a designer knows exactly what is brand-driven vs. structural.
- **D-03:** Components link to external token files via `<link>` tags (same `../tokens/` pattern as design-kit specimens from Phase 10).

### Preview Cards
- **D-04:** Preview cards use the **mini reference card** pattern — visual preview zone (swatches, type specimen, spacing scale, component demos, brand lockup) plus a token value layer (2-3 key values as small monospace text below the visual).
- **D-05:** Cards are designed for a 280-400px sweet spot rendering width. The 150px floor is handled with `min-width: 150px` and `overflow: hidden` on label rows — not by removing content.
- **D-06:** Five preview cards: colors, type, spacing, components, and brand groups. Each is a standalone HTML file linking external tokens.

### Landing Page Specimen
- **D-07:** The landing page uses **real brand copy** from Phase outputs — tagline, core narrative boilerplate, and proof points from `brand-foundation.md`. No placeholder text or lorem ipsum.
- **D-08:** **Entity-type conditional** keyed off `STATE.md` entity type:
  - Individual: bio-led hero section, single CTA, personal story flow
  - Org: product-led hero section, feature grid, dual CTA
- **D-09:** landing-page.html links to external tokens (same pattern as other design-kit specimens).

### Agent Orchestration
- **D-10:** Phase 8 calls design-kit-foundation and design-kit-packager as **separate sequential agents** — foundation first (tokens + post-processed specimens), then packager (components, preview cards, root files, landing page).
- **D-11:** Design-kit-packager is a standalone agent definition at `.claude/agents/design-kit-packager.md` following the same sonnet/Read/Write/Glob/Grep pattern as skill-bundle-packager and design-kit-foundation.
- **D-12:** Design-kit-packager reads design-kit-foundation outputs (tokens, post-processed specimens) as inputs — it does NOT re-read `visual-direction.md` for token values. It reads `visual-direction.md` only for the Component Personality section.

### Claude's Discretion
- Internal organization of the agent definition file (section ordering, task breakdown)
- Specific HTML/CSS structure of each atomized component (as long as Component Personality decisions are applied)
- Preview card CSS layout details (grid, flexbox, spacing within the constraint)
- README.md and HANDOFF.md content organization and structure
- package.json field values beyond name and description
- How the entity-type conditional is structured in the agent definition (if/else blocks, separate template sections, etc.)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements & Roadmap
- `.planning/REQUIREMENTS.md` — DKIT-01 through DKIT-05 define all design kit requirements
- `.planning/ROADMAP.md` — Phase 12 success criteria and dependency on Phase 10

### Agent Definitions (pattern references)
- `.claude/agents/design-kit-foundation.md` — Phase 10 agent that handles token extraction + HTML post-processing (this agent's outputs are design-kit-packager's inputs)
- `.claude/agents/skill-bundle-packager.md` — Phase 11 agent following the same standalone pattern; closest structural analog for how design-kit-packager should be organized
- `.claude/agents/document-assembler.md` — Existing thorough agent definition (200+ lines); reference for input/output/task structure

### Phase 10 Context (prior decisions)
- `.planning/phases/10-output-foundation/10-CONTEXT.md` — Output directory structure, token pipeline, dual-specimen pattern decisions

### Phase 11 Context (prior decisions)
- `.planning/phases/11-agent-skill-bundle/11-CONTEXT.md` — Skill-bundle-packager pattern, translation rule, input mapping decisions

### Specimen Design Reference
- `.claude/skills/specimen-design/SKILL.md` — Quality standard for HTML specimens (applies to landing-page.html and atomized components)

### Example Brand Output
- `workspace/reference/example-brand/output/` — Example template structure showing existing specimen files (brand-foundation.html, color-palette.html, ui-kit.html, visual-system.html, voice-guide.html)

### Visual Direction (Component Personality source)
- `workspace/drafts/visual-direction.md` §8 (Component Personality) — Source for branded component behaviors (button style, badge shape, hover behavior, accent treatment)

### Brand Foundation (Landing page content source)
- `workspace/output/client/brand-foundation.md` — Source for tagline, core narrative, proof points used in landing-page.html

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- design-kit-foundation.md — produces tokens at `workspace/output/design-kit/tokens/` and post-processed specimens at `workspace/output/design-kit/*.html`; the packager reads these outputs as inputs
- skill-bundle-packager.md — closest structural analog for the new agent (standalone, sonnet, Read/Write/Glob/Grep, reads client outputs as inputs)
- Document Assembler's HTML specimens — established the `:root` + brand-token CSS pattern that design-kit specimens now use via external links
- visual-direction.md Component Personality section — defines per-component behavior decisions already made in Phase 7

### Established Patterns
- Agent definitions use `---` YAML frontmatter with name, description, model, tools fields
- Agents specify inputs, pre-flight checks, and tasks as sequential numbered sections
- Agents use Glob to check file existence before reading conditional inputs
- Design-kit HTML files link tokens via `<link rel="stylesheet" href="../tokens/{file}.css">`
- `workspace/output/design-kit/` directory exists with tokens/ subdirectory and post-processed specimens from Phase 10

### Integration Points
- `workspace/output/design-kit/components/` — target directory for atomized component HTML files (needs creation)
- `workspace/output/design-kit/previews/` — target directory for preview card HTML files (needs creation)
- `workspace/output/design-kit/` — root-level files (README.md, package.json, HANDOFF.md, landing-page.html)
- `workspace/STATE.md` — entity type for landing page conditional
- Phase 8 skill file will orchestrate this agent's launch (Phase 13 scope, not this phase)
- Brand Verifier will need design-kit structure checks (Phase 13 scope, not this phase)

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 12-design-kit*
*Context gathered: 2026-04-20*
