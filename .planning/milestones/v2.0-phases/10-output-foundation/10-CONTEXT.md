# Phase 10: Output Foundation - Context

**Gathered:** 2026-04-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Restructure the output directory into three bundles (client/, skill-bundle/, design-kit/), create the token extraction pipeline, establish the dual-specimen pattern (self-contained client + external-token-linked design-kit), and fix the voice-fingerprint input gap in the Document Assembler. This phase delivers the surface that Phases 11 (Agent Skill Bundle) and 12 (Design Kit) write into.

</domain>

<decisions>
## Implementation Decisions

### Token Generation
- **D-01:** Token files (colors.css, typography.css, spacing.css, tokens.json, tailwind.config.js) are produced by a **standalone token extraction step owned by Phase 10**, not by the Document Assembler or the design-kit-packager.
- **D-02:** The extraction step reads `workspace/drafts/visual-direction.md` (same source as the Document Assembler) and writes to `workspace/output/design-kit/tokens/`.
- **D-03:** The Document Assembler's existing DTCG JSON block inside `color-palette.html` remains unchanged as the client-facing copyable artifact. The Phase 10 extraction step produces the actual files — same source, two distinct outputs for two distinct audiences (developer tooling vs. client specimen).

### Output Path Migration
- **D-04:** **All path references migrate in Phase 10** — Document Assembler, Brand Verifier, export skill, and all 5 frontend files (OutputViewer.tsx, OutputPage.tsx, content-loader.ts, content-parser.ts, phase-utils.ts) update in one atomic pass.
- **D-05:** Frontend `import.meta.glob` patterns must use static string literals per Vite constraint. Each subdirectory (client/, skill-bundle/, design-kit/) needs its own glob call.
- **D-06:** Empty output subdirectories must be handled gracefully in the frontend — no crash or error state when skill-bundle/ or design-kit/ are empty before Phases 11/12 run.

### Dual Specimen Strategy
- **D-07:** **Post-processing approach.** Document Assembler generates client specimens as self-contained HTML (unchanged behavior). A thin post-processing step creates design-kit variants by swapping the inline `:root` CSS custom properties block for external `<link>` tags referencing the token files in `design-kit/tokens/`.
- **D-08:** Design-kit specimens stay structurally identical to client specimens — they differ only in token delivery method (external links vs. inline CSS).
- **D-09:** The post-processor must cleanly extract the `:root {}` block from each HTML file. The Document Assembler's CSS structure (single `:root` block containing all custom properties) supports this.

### Voice-Fingerprint Integration
- **D-10:** **Active weave** — `workspace/research/voice-fingerprint.md` is added explicitly to the Document Assembler's input list AND the voice-guide/practical-toolkit templates gain structural slots for fingerprint data.
- **D-11:** New template additions to voice-guide.md: **Quantitative Markers** section (sentence length averages, formality ratio, paragraph rhythm metrics from corpus analysis).
- **D-12:** Language Bank in practical-toolkit.md: replace generic "Phrases I Use / Never Use" with the fingerprint's **Codify / Retire** classification (evidence-based from corpus analysis).
- **D-13:** New template addition to voice-guide.md: **Calibration Table** section ("too cold / just right / too warm" ranges derived from voice-fingerprint analysis).
- **D-14:** When Phase 6 discovery intent conflicts with voice-fingerprint evidence, the assembler must surface the gap explicitly rather than silently picking one source.

### Claude's Discretion
- Token extraction step implementation form (agent, script, or skill) — Claude decides based on codebase patterns
- Specific CSS selector/regex strategy for `:root` block extraction in the post-processor
- Frontend empty-state UI for bundles that don't have content yet (skill-bundle/, design-kit/ before Phases 11/12)
- Ordering of glob calls in content-loader.ts for the three subdirectories

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements & Roadmap
- `.planning/REQUIREMENTS.md` — FOUN-01 through FOUN-05 define all foundation requirements
- `.planning/ROADMAP.md` — Phase 10 success criteria and dependency chain

### Agent Definitions (files to modify)
- `.claude/agents/document-assembler.md` — Primary agent to update (input list, output paths, voice-fingerprint weave)
- `.claude/agents/brand-verifier.md` — Output path references to update

### Skill Files (files to modify)
- `.claude/skills/brand-compass/export/SKILL.md` — Output path references to update

### Frontend Files (files to modify)
- `src/components/OutputPage.tsx` — Output listing paths
- `src/components/OutputViewer.tsx` — File viewing paths
- `src/lib/content-loader.ts` — `import.meta.glob` patterns (static string constraint)
- `src/lib/content-parser.ts` — Phase-to-file mapping paths
- `src/lib/phase-utils.ts` — Asset pack output file paths

### Reference Materials
- `.claude/skills/specimen-design/SKILL.md` — Specimen quality standard (relevant to post-processor output quality)
- `workspace/reference/example-brand/output/` — Example template structure

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Document Assembler already extracts CSS custom properties from `visual-direction.md` and embeds them as `:root` blocks — token extraction step can reuse the same parsing logic
- DTCG JSON block generation logic in Document Assembler (for `color-palette.html`) produces a superset of `tokens.json` content
- `content-loader.ts` uses `import.meta.glob` with static patterns — established pattern to follow for new subdirectory globs

### Established Patterns
- Agent definitions use Read/Write/Glob/Grep tool set (sonnet model) — new extraction step should follow this
- HTML specimens are fully self-contained with embedded CSS — the `:root` block is a discrete unit at the top of each `<style>` section
- Frontend handles missing/empty workspace files gracefully via null checks and empty-state components

### Integration Points
- `workspace/output/` is the single output directory — becomes `workspace/output/client/`, `workspace/output/skill-bundle/`, `workspace/output/design-kit/`
- `workspace/output/design-kit/tokens/` is the new token file location
- `workspace/research/voice-fingerprint.md` → Document Assembler input pipeline
- `workspace/drafts/visual-direction.md` → Token extraction step input

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

*Phase: 10-output-foundation*
*Context gathered: 2026-04-19*
