# Roadmap: Brand Compass

## Milestones

- ✅ **v1.0 Feature Research Implementation** — Phases 1-9 (shipped 2026-03-28)
- 🚧 **v2.0 Multi-Bundle Output** — Phases 10-13 (in progress)

## Phases

<details>
<summary>✅ v1.0 Feature Research Implementation (Phases 1-9) — SHIPPED 2026-03-28</summary>

- [x] **Phase 1: Baseline + Quick Wins** - 3/3 plans — completed 2026-03-27
- [x] **Phase 2: Discovery Pipeline Reframe** - 2/2 plans — completed 2026-03-27
- [x] **Phase 3: Output Quality** - 2/2 plans — completed 2026-03-27
- [x] **Phase 4: Deliverable Expansions** - 3/3 plans — completed 2026-03-27
- [x] **Phase 5: Process Refinements** - 3/3 plans — completed 2026-03-28
- [x] **Phase 6: Forward-Looking Additions** - 2/2 plans — completed 2026-03-28
- [x] **Phase 7: Sync Phase 2 & Phase 5 Commands** - 2/2 plans — completed 2026-03-28
- [x] **Phase 8: Sync Phase 7 Visual Command** - 1/1 plan — completed 2026-03-28
- [x] **Phase 9: Sync Remaining Command Files** - 2/2 plans — completed 2026-03-28

Full details: milestones/v1.0-ROADMAP.md

</details>

### 🚧 v2.0 Multi-Bundle Output (In Progress)

**Milestone Goal:** Add two new output bundles (Agent Skill Bundle + Design Kit) alongside the existing client package, so Brand Compass output feeds directly into Claude Code/Cowork and Claude Design.

- [x] **Phase 10: Output Foundation** - Restructure output directory, externalize tokens, fix voice-fingerprint backlog item (completed 2026-04-20)
- [x] **Phase 11: Agent Skill Bundle** - Create skill-bundle-packager agent and all three skill bundle output files (completed 2026-04-20)
- [x] **Phase 12: Design Kit** - Create design-kit-packager agent and all design kit outputs (components, previews, specimens) (completed 2026-04-20)
- [ ] **Phase 13: Integration** - Wire all three bundles into export, verifier, Phase 8, CLAUDE.md, and React frontend

## Phase Details

### Phase 10: Output Foundation
**Goal**: The output directory structure and token pipeline are in place so both downstream phases have a clean surface to write into
**Depends on**: Nothing (first v2.0 phase)
**Requirements**: FOUN-01, FOUN-02, FOUN-03, FOUN-04, FOUN-05
**Success Criteria** (what must be TRUE):
  1. Running a brand engagement produces `workspace/output/client/`, `workspace/output/skill-bundle/`, and `workspace/output/design-kit/` as distinct subdirectories
  2. Token files (colors.css, typography.css, spacing.css, tokens.json, tailwind.config.js) exist under `workspace/output/design-kit/tokens/` after a Phase 7 completion
  3. Client-bundle HTML specimens are fully self-contained and render without any external file references
  4. Design-kit specimens link to the external token files rather than inlining tokens
  5. Document Assembler reads voice-fingerprint.md and incorporates it into voice-dependent outputs
**Plans:** 2/2 plans complete
Plans:
- [x] 10-01-PLAN.md — Agent definitions and skill updates (design-kit-foundation agent, Document Assembler voice-fingerprint weave, path migration for agents/skills)
- [x] 10-02-PLAN.md — Frontend path migration and empty-state handling (content-loader globs, path strings, OutputViewer fix, bundle placeholders)

### Phase 11: Agent Skill Bundle
**Goal**: The skill-bundle-packager agent exists and produces a complete, usable skill bundle at `workspace/output/skill-bundle/`
**Depends on**: Phase 10
**Requirements**: SKIL-01, SKIL-02, SKIL-03, SKIL-04
**Success Criteria** (what must be TRUE):
  1. Invoking the skill-bundle-packager agent produces output without errors using only Read/Write/Glob/Grep tools
  2. `skill-bundle/SKILL.md` contains valid frontmatter and all required sections (voice definition, signature moves, guardrails, language bank, positioning summary)
  3. `skill-bundle/brand-prompt.md` is 150-300 words of flowing prose with no headings or bullets
  4. `skill-bundle/source/` contains voice-rules.md, guardrails.md, and language-bank.md lifted from the client package
**Plans:** 1/1 plans complete
Plans:
- [x] 11-01-PLAN.md — Complete skill-bundle-packager agent definition (frontmatter, pre-flight checks, Task 1 source extraction, Task 2 bundle synthesis with translation rule)

### Phase 12: Design Kit
**Goal**: The design-kit-packager agent exists and produces a complete design kit at `workspace/output/design-kit/` that a designer or tool can consume directly
**Depends on**: Phase 10
**Requirements**: DKIT-01, DKIT-02, DKIT-03, DKIT-04, DKIT-05
**Success Criteria** (what must be TRUE):
  1. Invoking the design-kit-packager agent produces output without errors using only Read/Write/Glob/Grep tools
  2. Each atomized component (button, card, form-field, nav, modal, alert, badge) exists as a standalone HTML file linking to external token files and renders correctly in a browser
  3. Preview cards for colors, type, spacing, components, and brand groups render visually at 150-500px width without layout breakage
  4. Design kit root contains README.md written in brand voice, a valid package.json, and HANDOFF.md with usage instructions
  5. Reference specimens include brand-foundation.html, color-palette.html, and a new landing-page.html, all linked to external tokens
**Plans:** 1/1 plans complete
Plans:
- [x] 12-01-PLAN.md — Complete design-kit-packager agent definition (frontmatter, pre-flight checks, Task 1 components, Task 2 previews + root files, Task 3 landing page, output listing, quality bar)

### Phase 13: Integration
**Goal**: All three bundles are fully wired into the system — export command, verifier, Phase 8 orchestration, CLAUDE.md, and the React frontend all reflect the three-bundle model
**Depends on**: Phase 11, Phase 12
**Requirements**: INTG-01, INTG-02, INTG-03, INTG-04, INTG-05, INTG-06
**Success Criteria** (what must be TRUE):
  1. `/brand-compass:export` describes and verifies all three bundles (client, skill-bundle, design-kit) and reports missing files per bundle
  2. Brand Verifier checks pass for all three bundle structures and surface gaps specific to each bundle type
  3. The React frontend displays files from the new output directory structure without broken paths or missing assets
  4. Phase 8 skill file orchestrates launches of both skill-bundle-packager and design-kit-packager at the appropriate moment
  5. Phase completion provides a structured handoff summary; phase skill preambles detect new sessions and restore context automatically
**Plans**: TBD

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Baseline + Quick Wins | v1.0 | 3/3 | Complete | 2026-03-27 |
| 2. Discovery Pipeline Reframe | v1.0 | 2/2 | Complete | 2026-03-27 |
| 3. Output Quality | v1.0 | 2/2 | Complete | 2026-03-27 |
| 4. Deliverable Expansions | v1.0 | 3/3 | Complete | 2026-03-27 |
| 5. Process Refinements | v1.0 | 3/3 | Complete | 2026-03-28 |
| 6. Forward-Looking Additions | v1.0 | 2/2 | Complete | 2026-03-28 |
| 7. Sync Phase 2 & Phase 5 Commands | v1.0 | 2/2 | Complete | 2026-03-28 |
| 8. Sync Phase 7 Visual Command | v1.0 | 1/1 | Complete | 2026-03-28 |
| 9. Sync Remaining Command Files | v1.0 | 2/2 | Complete | 2026-03-28 |
| 10. Output Foundation | v2.0 | 2/2 | Complete    | 2026-04-20 |
| 11. Agent Skill Bundle | v2.0 | 1/1 | Complete    | 2026-04-20 |
| 12. Design Kit | v2.0 | 1/1 | Complete   | 2026-04-20 |
| 13. Integration | v2.0 | 0/TBD | Not started | - |
