# Phase 13: Integration - Context

**Gathered:** 2026-04-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Wire all three bundles (client, skill-bundle, design-kit) into the existing system — export command, brand verifier, Phase 8 skill orchestration, CLAUDE.md agent table and workspace documentation, and React frontend. Also fix stale `workspace/output/` paths in the Phase 8 skill file (should be `workspace/output/client/` for core files and asset packs). This phase does NOT modify the discovery phases (0-7), the Document Assembler, the two new packager agents, or the design-kit-foundation agent.

</domain>

<decisions>
## Implementation Decisions

### Export Command (INTG-01)
- **D-01:** Export presents **three distinct per-bundle sections** — Client Package, Agent Skill Bundle, Design Kit — each with its own file table and per-bundle missing-file flags.
- **D-02:** Missing files are attributed to their owning bundle with actionable guidance ("Design Kit — run design-kit-packager"). No flat/unified missing list.
- **D-03:** Each bundle section includes a completeness indicator (e.g., "5/5 files" or "3/5 files — 2 missing").

### Brand Verifier (INTG-02)
- **D-04:** **Existence + targeted substance checks** for both new bundles. No cross-bundle consistency checks (drift is unlikely in a single engagement — no re-packaging trigger exists).
- **D-05:** Skill bundle checks:
  - Level 1 (Existence): 5 expected files — SKILL.md, brand-prompt.md, source/voice-rules.md, source/guardrails.md, source/language-bank.md
  - Level 2 (Substance): SKILL.md line count >= 200, brand-prompt.md has no `#` heading characters and word count is 150-300, source/ files are non-empty with verbatim content
- **D-06:** Design kit checks:
  - Level 1 (Existence): All expected files — tokens/*.css, tokens/tokens.json, tokens/tailwind.config.js, components/*.html (7 components), previews/*.html (5 previews), README.md, package.json, HANDOFF.md, landing-page.html, plus post-processed specimens
  - Level 2 (Substance): Component HTML files contain no `:root {}` blocks (must link external tokens), landing-page.html has no `[bracket]` placeholder markers, preview cards render within 150-500px constraint
- **D-07:** These checks map to the Quality Bar sections already defined in both packager agent definitions — the verifier reuses the same criteria the agents self-check against.

### Phase 8 Orchestration (INTG-04)
- **D-08:** **Sequential with handoff** — agents run in a clear chain after Document Assembler completes:
  1. skill-bundle-packager (only needs client output, no design-kit dependency)
  2. design-kit-foundation (tokens + post-processed specimens)
  3. design-kit-packager (components, previews, root files, landing page — needs foundation output)
  4. Brand Verifier (quality gate across all three bundles)
- **D-09:** Status communication follows existing background agent protocol: name the agent, set time expectation, update STATE.md Running Agents table per launch.
- **D-10:** Failure handling: if design-kit-foundation fails, design-kit-packager is skipped with explicit "foundation step did not complete" message. skill-bundle-packager failure is independent and does not block the design-kit chain.
- **D-11:** Phase 8 skill file stale path fix: all `workspace/output/` references in the file listing (Steps 5, 6) must update to `workspace/output/client/` for core files and `workspace/output/client/[pack-id].html` for asset pack specimens.

### CLAUDE.md Updates (INTG-03)
- **D-12:** Agent Table gains 2 new rows for skill-bundle-packager and design-kit-packager (both already exist — design-kit-foundation was added in Phase 10).
- **D-13:** Workspace Structure section updated to show three-bundle output directory (`client/`, `skill-bundle/`, `design-kit/`).
- **D-14:** Multi-bundle output section added describing what each bundle contains and which downstream tool consumes it.

### React Frontend (INTG-05)
- **D-15:** Frontend `import.meta.glob` patterns for skill-bundle/ and design-kit/ already exist (Phase 10). Phase 13 verifies they work correctly with actual packager output and fixes any path issues discovered.
- **D-16:** OutputPage.tsx may need new sections or cards for skill-bundle and design-kit deliverables alongside the existing client deliverable cards.

### Phase Transition Handoffs (INTG-06)
- **D-17:** **STATE.md handoff block** — add a `## Last Phase Handoff` section written at each phase's Mark Complete step containing: what was decided, key outputs produced, and what happens next.
- **D-18:** Each phase's closing message includes a `/clear` nudge before starting the next phase ("Suggest `/clear` before starting Phase N+1 to start fresh").
- **D-19:** The existing resume skill reads STATE.md and synthesizes the handoff block into its briefing — no new session-detection heuristic or preamble logic needed in phase skill files.
- **D-20:** Handoff block is overwritten (not appended) at each phase completion — only the most recent handoff is stored.

### Claude's Discretion
- Specific wording of per-bundle export sections and missing-file messages
- Internal organization of new verifier Level sections (follows existing Level 1-6 pattern)
- Phase 8 skill step numbering for new agent launches (5c, 5d, etc. or restructured)
- CLAUDE.md section ordering and formatting for multi-bundle documentation
- Frontend card layout for skill-bundle and design-kit deliverables
- Handoff block field names and formatting within STATE.md

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements & Roadmap
- `.planning/REQUIREMENTS.md` — INTG-01 through INTG-06 define all integration requirements
- `.planning/ROADMAP.md` — Phase 13 success criteria and dependency on Phases 11 + 12

### Files to Modify
- `.claude/skills/brand-compass/export/SKILL.md` — Export command (INTG-01): add per-bundle sections
- `.claude/agents/brand-verifier.md` — Brand Verifier (INTG-02): add skill-bundle and design-kit check levels
- `CLAUDE.md` — Project instructions (INTG-03): agent table, workspace structure, multi-bundle section
- `.claude/skills/brand-compass/phase-8-toolkit/SKILL.md` — Phase 8 orchestration (INTG-04): add new agent launches + fix stale paths
- `src/components/OutputPage.tsx` — Frontend (INTG-05): skill-bundle and design-kit deliverable cards
- `src/lib/content-loader.ts` — Frontend (INTG-05): verify glob patterns work with actual output

### Phase Skill Files (INTG-06 handoff additions)
- `.claude/skills/brand-compass/phase-1-origin/SKILL.md` through `.claude/skills/brand-compass/phase-8-toolkit/SKILL.md` — Mark Complete steps gain /clear nudge
- `.claude/skills/brand-compass/checkpoint-a/SKILL.md` — Checkpoint completion handoff
- `.claude/skills/brand-compass/checkpoint-b/SKILL.md` — Checkpoint completion handoff

### Agent Definitions (reference — not modified in this phase)
- `.claude/agents/skill-bundle-packager.md` — Phase 11 agent (Quality Bar section informs verifier checks)
- `.claude/agents/design-kit-packager.md` — Phase 12 agent (Quality Bar section informs verifier checks)
- `.claude/agents/design-kit-foundation.md` — Phase 10 agent (orchestration dependency)
- `.claude/agents/document-assembler.md` — Existing assembler (orchestration dependency)

### Prior Phase Context
- `.planning/phases/10-output-foundation/10-CONTEXT.md` — Output directory structure, path migration, dual-specimen pattern
- `.planning/phases/11-agent-skill-bundle/11-CONTEXT.md` — Skill bundle agent pattern, input mapping
- `.planning/phases/12-design-kit/12-CONTEXT.md` — Design kit agent pattern, component personality, orchestration

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Brand Verifier already has 6 levels (Existence, Substance, Consistency, Coverage, Personality, Voice) — new bundle checks extend this pattern
- Export skill already has a Step 2 verification loop and Step 5 summary table — per-bundle sections extend this structure
- Phase 8 skill already has Steps 5 (Document Assembler) and 5b (Brand Verifier quality gate) — new steps extend this chain
- Frontend content-loader.ts already has `import.meta.glob` patterns for all three subdirectories (added in Phase 10)

### Established Patterns
- Phase skill files follow a consistent step-numbered structure with STATE.md updates at Mark Complete
- Agent launches in Phase 8 follow background agent protocol: tell client, set expectation, update Running Agents table
- CLAUDE.md Agent Table has columns: Agent, Trigger, Input, Output Location, Blocking?
- OutputPage.tsx uses a `deliverables` array of card objects with title, files, description, icon

### Integration Points
- `workspace/output/client/` — existing client output (Document Assembler)
- `workspace/output/skill-bundle/` — skill bundle output (skill-bundle-packager)
- `workspace/output/design-kit/` — design kit output (design-kit-foundation + design-kit-packager)
- `workspace/STATE.md` — phase state, running agents, session log, new handoff block

</code_context>

<specifics>
## Specific Ideas

- Phase 8 stale paths: Lines 126-143 of phase-8-toolkit/SKILL.md reference `workspace/output/` without the `client/` subdirectory — these need to become `workspace/output/client/` for core files and `workspace/output/client/[pack-id].html` for asset packs
- Verifier checks should mirror the Quality Bar sections already defined in skill-bundle-packager.md and design-kit-packager.md — same criteria, different enforcement point

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 13-integration*
*Context gathered: 2026-04-20*
