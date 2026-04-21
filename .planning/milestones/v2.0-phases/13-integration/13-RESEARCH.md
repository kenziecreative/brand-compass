# Phase 13: Integration - Research

**Researched:** 2026-04-20
**Domain:** Agent skill file authoring, React frontend wiring, multi-bundle system integration
**Confidence:** HIGH

## Summary

Phase 13 wires the three-bundle output model (client, skill-bundle, design-kit) into every surface that exposes it: the export command, the brand verifier, Phase 8 orchestration, CLAUDE.md documentation, and the React frontend. All implementation decisions are fully locked in CONTEXT.md — this phase is pure execution against those decisions.

The work is six parallel tracks that rarely block each other. Each track touches a specific file or small set of files with well-defined before/after states. The hardest intellectual work has already been done in Phases 10-12; Phase 13 is assembly and wiring.

The main implementation risk is the React frontend track (INTG-05): the OutputPage.tsx placeholder cards for skill-bundle and design-kit need to become functional, and the OutputViewer path-translation logic (`/output/view/*` → `workspace/output/...`) must handle the nested subdirectory structure of the new bundles. This is the only track requiring TypeScript work; all others are markdown/text edits.

**Primary recommendation:** Sequence the work as INTG-01 through INTG-06 in the order listed — they are mostly independent but the React frontend work is best validated last since it depends on understanding what the packagers actually produce.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Export verification and summary | Agent skill file (export/SKILL.md) | STATE.md (reads phase state) | The export command owns the delivery presentation layer |
| Brand quality gates | Agent definition (brand-verifier.md) | Phase 8 skill (orchestrates the call) | Verifier is a standalone agent; Phase 8 calls it after assembly |
| Phase 8 agent orchestration | Phase 8 skill file | STATE.md Running Agents table | Skill file defines the sequence; STATE.md tracks execution |
| System documentation | CLAUDE.md | workspace/STATE.md | CLAUDE.md is the authoritative agent table and workspace reference |
| Deliverable browsing UI | React frontend (OutputPage.tsx) | OutputViewer.tsx (viewing layer) | OutputPage owns bundle discovery; Viewer owns file rendering |
| Phase transition context | Phase skill files (Mark Complete steps) | workspace/STATE.md (## Last Phase Handoff) | Each skill file writes the handoff; STATE.md persists it |

## Standard Stack

### Core (no new dependencies)

This phase introduces no new libraries. All implementation is in existing files.

| File | Current State | What Changes |
|------|--------------|--------------|
| `.claude/skills/brand-compass/export/SKILL.md` | Single client bundle, flat missing-file list | Three per-bundle sections with completeness indicators |
| `.claude/agents/brand-verifier.md` | Levels 1-6 covering client output only | Two new Level sections for skill-bundle and design-kit |
| `CLAUDE.md` | Agent Table has 7 agents; no workspace structure section | 2 new agent rows; workspace structure section; multi-bundle output section |
| `.claude/skills/brand-compass/phase-8-toolkit/SKILL.md` | Steps 5 and 5b (assembler + verifier); stale `workspace/output/` paths | Steps 5c, 5d for new agents; stale paths fixed to `workspace/output/client/` |
| `src/components/OutputPage.tsx` | Two placeholder dashed-border cards for skill-bundle and design-kit | Functional bundle cards with file lists and existence checks |
| `.claude/skills/brand-compass/phase-{1-8}/SKILL.md` + checkpoints | Mark Complete steps have no handoff block | Add `## Last Phase Handoff` write to STATE.md + `/clear` nudge |

### Supporting (reference only — not modified)

| File | Role in Phase 13 |
|------|-----------------|
| `.claude/agents/skill-bundle-packager.md` | Quality Bar section informs verifier Level checks for INTG-02 |
| `.claude/agents/design-kit-packager.md` | Quality Bar section informs verifier Level checks for INTG-02 |
| `.claude/agents/design-kit-foundation.md` | Orchestration dependency in Phase 8 chain (D-08) |
| `src/lib/content-loader.ts` | Already has `import.meta.glob` for all three subdirs — verify at runtime, no edit expected |
| `src/lib/phase-utils.ts` | ASSET_PACKS array already uses `workspace/output/client/` paths — consistent |
| `src/components/OutputViewer.tsx` | Path translation: strips `workspace/output/` prefix, constructs `srcUrl` — works with subdirs |

## Architecture Patterns

### System Architecture Diagram

```
Phase 8 Skill (orchestrator)
        |
        v
Document Assembler ──> workspace/output/client/*
        |
        v
skill-bundle-packager ──> workspace/output/skill-bundle/
        |
        v
design-kit-foundation ──> workspace/output/design-kit/tokens/*
                         workspace/output/design-kit/*.html (copied)
        |
        v
design-kit-packager ──> workspace/output/design-kit/components/*
                        workspace/output/design-kit/previews/*
                        workspace/output/design-kit/landing-page.html
                        workspace/output/design-kit/README.md, package.json, HANDOFF.md
        |
        v
Brand Verifier (quality gate)
        |
        +----------+----------+
        |          |          |
    client/    skill-bundle/ design-kit/
                                |
                         Level 7: skill-bundle
                         Level 8: design-kit

React Frontend (read layer)
        |
   OutputPage.tsx
        |
        +----> Client Package cards (existing)
        +----> Skill Bundle card (new — functional)
        +----> Design Kit card (new — functional)
        +----> Asset Pack cards (existing)
                |
          OutputViewer.tsx
                |
          /output/view/{subdir}/{filename}
          --> srcUrl = /workspace/output/{subdir}/{filename}
```

### Recommended File Edit Sequence

The six INTG tracks are mostly independent. Recommended order to minimize confusion:

```
1. INTG-04: Phase 8 SKILL.md (path fixes + new agent steps) — quick, high-value fix
2. INTG-01: export/SKILL.md (three-bundle sections)
3. INTG-02: brand-verifier.md (new Level 7 + Level 8)
4. INTG-03: CLAUDE.md (agent table + workspace structure)
5. INTG-06: Phase skill files (Mark Complete handoff block — 10 files)
6. INTG-05: React frontend (OutputPage.tsx — TypeScript, most complex)
```

### Pattern 1: Export Per-Bundle Section Structure

**What:** The export command's Step 2 and Step 5 gain three separate bundle sections. Each section has its own file table and a completeness indicator.

**Completeness indicator format (D-03):**
```
**Client Package — 8/8 files**
```
or
```
**Design Kit — 14/18 files — 4 missing**
```

**Missing-file attribution format (D-02):**
```
Missing from Design Kit — run design-kit-packager:
- workspace/output/design-kit/landing-page.html
```

**Step 5 summary table per bundle (example):**
```
**Client Package (8 files):**
| Document | Format | Location |
|----------|--------|----------|
| Brand Foundation | MD | workspace/output/client/brand-foundation.md |
...

**Agent Skill Bundle (5 files):**
| Document | Format | Location |
|----------|--------|----------|
| SKILL.md | MD | workspace/output/skill-bundle/SKILL.md |
...

**Design Kit (18 files):**
| Document | Format | Location |
|----------|--------|----------|
| button.html | HTML | workspace/output/design-kit/components/button.html |
...
```

### Pattern 2: Brand Verifier Extension — New Levels

**What:** The verifier currently has Levels 1-6. Phase 13 adds Level 7 (skill-bundle) and Level 8 (design-kit). Each mirrors the two-tier pattern from existing levels: existence check first, substance check second.

**Level 7: Skill Bundle checks (from D-05):**

Level 7A — Existence (5 files):
- `workspace/output/skill-bundle/SKILL.md`
- `workspace/output/skill-bundle/brand-prompt.md`
- `workspace/output/skill-bundle/source/voice-rules.md`
- `workspace/output/skill-bundle/source/guardrails.md`
- `workspace/output/skill-bundle/source/language-bank.md`

Level 7B — Substance:
- SKILL.md line count >= 200
- brand-prompt.md has zero `#` heading characters, word count 150-300
- All three source/ files are non-empty

**Level 8: Design Kit checks (from D-06):**

Level 8A — Existence:
Token files (5): `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css`, `tokens/tokens.json`, `tokens/tailwind.config.js`
Components (7): `components/button.html`, `components/card.html`, `components/form-field.html`, `components/nav.html`, `components/modal.html`, `components/alert.html`, `components/badge.html`
Previews (5): `previews/colors.html`, `previews/type.html`, `previews/spacing.html`, `previews/components.html`, `previews/brand-groups.html`
Root files (4): `README.md`, `package.json`, `HANDOFF.md`, `landing-page.html`
Post-processed specimens (2): `brand-foundation.html`, `color-palette.html`
Total: 23 files

Level 8B — Substance:
- Component HTML files contain no `:root {}` blocks
- `landing-page.html` contains no `[bracket]` placeholder markers
- Preview cards have `min-width: 150px` on `.preview-card`

**Verifier output report format** — add rows to the Scores table in the existing output format:
```
| Skill Bundle | N/5 files | [missing files if any] |
| Design Kit   | N/23 files | [missing files if any] |
```

**Conditional check:** Both Level 7 and Level 8 should only run if Phase 8 is complete (same as existing Level 1 check). If skill-bundle directory is absent entirely, report it as "Not yet generated — run skill-bundle-packager" rather than a critical failure.

### Pattern 3: Phase 8 Orchestration Chain

**What:** Phase 8 currently has Step 5 (Document Assembler) and Step 5b (Brand Verifier). Phase 13 inserts three new steps between them.

**New chain (D-08):**
```
Step 5:  Document Assembler → workspace/output/client/*
Step 5b: skill-bundle-packager → workspace/output/skill-bundle/
Step 5c: design-kit-foundation → workspace/output/design-kit/tokens/ + specimens
Step 5d: design-kit-packager → workspace/output/design-kit/components/, previews/, root
Step 5e: Brand Verifier → quality gate across all three bundles
```

The current "Step 5b: Quality Gate" becomes Step 5e. The current "Step 5b" numbering can be preserved with sub-step lettering (5b, 5c, 5d, 5e) or renumbered — per Claude's Discretion in CONTEXT.md.

**Failure isolation (D-10):**
- If design-kit-foundation fails → skip design-kit-packager; report "design-kit-packager skipped — foundation step did not complete"
- skill-bundle-packager failure is independent; does not affect design-kit chain

**Stale path fix (D-11):** Lines 126-143 of phase-8-toolkit/SKILL.md have these stale paths:
```
Current (stale):             Correct:
workspace/output/            workspace/output/client/
workspace/output/brand-foundation.md    workspace/output/client/brand-foundation.md
workspace/output/social-media-kit.html  workspace/output/client/social-media-kit.html
(etc.)
```
All eight core file paths and all eight asset pack paths need the `client/` subdirectory inserted.

**Status communication per launch (D-09):** Each new step follows the background agent protocol: name the agent, set time expectation, update STATE.md Running Agents table. Time estimates:
- skill-bundle-packager: "About 60-90 seconds — synthesizing voice and positioning into agent-ready format"
- design-kit-foundation: "About 60 seconds — extracting tokens and post-processing specimens"
- design-kit-packager: "About 2 minutes — building components, previews, and landing page"

### Pattern 4: CLAUDE.md Agent Table Update

**What:** The Agent Table gains 2 new rows. design-kit-foundation was already added in Phase 10. The two rows for Phase 11 and Phase 12 agents:

```markdown
| skill-bundle-packager | Phase 8 assembly complete — launched from Phase 8 Step 5b | workspace/output/client/ outputs | workspace/output/skill-bundle/ | No |
| design-kit-packager | design-kit-foundation completes — launched from Phase 8 Step 5d | workspace/output/design-kit/tokens/, workspace/output/design-kit/*.html | workspace/output/design-kit/components/, previews/, root files | No |
```

**Workspace Structure section (D-13):**
```markdown
## Workspace Structure

workspace/
├── research/          — Agent research outputs (competitive brief, archetypes, voice fingerprint)
├── drafts/            — Draft content for review (messaging options, visual direction)
├── assets/            — Mark explorations, imagery
└── output/
    ├── client/        — Client brand package (Document Assembler output)
    ├── skill-bundle/  — Agent skill bundle (skill-bundle-packager output)
    └── design-kit/    — Component design kit (design-kit-foundation + design-kit-packager output)
```

**Multi-bundle output section (D-14):**
```markdown
## Multi-Bundle Output

Three bundles are produced at end of engagement:

| Bundle | Contents | Downstream Consumer |
|--------|----------|---------------------|
| client/ | brand-foundation.md/html, voice-guide.md/html, color-palette.html, visual-system.html, ui-kit.html, practical-toolkit.md, asset pack specimens | Human client — shareable deliverables |
| skill-bundle/ | SKILL.md, brand-prompt.md, source/ files | Claude Code agents — ingest via skill or system prompt |
| design-kit/ | tokens/*.css/json/js, components/*.html, previews/*.html, landing-page.html, README.md, HANDOFF.md, package.json | Designer/developer — implementation reference |
```

### Pattern 5: React Frontend — Functional Bundle Cards

**What:** OutputPage.tsx currently has two placeholder `Card` components for Agent Skill Bundle and Design Kit with `opacity-50` and `border-dashed`. These need to become functional cards that:
1. Check for file existence using `fetch(..., { method: 'HEAD' })`
2. Show file links when files exist (matching the existing client deliverable pattern)
3. Show dimmed/dashed state when files don't exist yet

**Skill Bundle card files:**
```typescript
{
  title: 'Agent Skill Bundle',
  files: [
    { filename: 'workspace/output/skill-bundle/SKILL.md', format: 'MD' },
    { filename: 'workspace/output/skill-bundle/brand-prompt.md', format: 'MD' },
    { filename: 'workspace/output/skill-bundle/source/voice-rules.md', format: 'MD' },
    { filename: 'workspace/output/skill-bundle/source/guardrails.md', format: 'MD' },
    { filename: 'workspace/output/skill-bundle/source/language-bank.md', format: 'MD' },
  ],
  description: 'Claude Code skill definition, brand prompt, and voice source files.',
  icon: FileText,
}
```

**Design Kit card** (D-16 says may need new sections or cards — per Claude's Discretion). The design kit has 23 files across 4 subdirectories. Options:
- Single card with a representative subset (tokens, components count, landing page)
- Separate sub-section cards per subdirectory (tokens, components, previews, root)

Recommendation: a single Design Kit card showing the high-value navigable files: `landing-page.html`, `README.md`, `HANDOFF.md`, plus subdirectory count indicators ("7 components", "5 previews", "5 token files"). Full file drill-down into components/ and previews/ can be a follow-up.

**OutputViewer path translation** — already works for nested paths. The `srcUrl` construction:
```typescript
const srcUrl = `/workspace/output/${filePath}`
```
`filePath` comes from the route wildcard `output/view/*`. If the link in OutputPage is:
```typescript
to={`/output/view/${f.filename.replace('workspace/output/', '')}`}
```
Then `skill-bundle/SKILL.md` maps to `srcUrl = /workspace/output/skill-bundle/SKILL.md`, which Vite serves correctly from the filesystem. The existing pattern handles subdirs without changes.

**The `fileTitles` map in OutputViewer** should gain entries for skill-bundle and design-kit filenames so the viewer shows friendly names rather than raw filenames.

**File existence check scope** — the `allPaths` calculation in OutputPage drives the "N of M files ready" counter. The new bundle files should be added to the total count.

### Pattern 6: Phase Transition Handoffs (INTG-06)

**What:** Each phase skill file's Mark Complete step gains two additions:
1. Write a `## Last Phase Handoff` block to STATE.md (D-17)
2. Add a `/clear` nudge to the completion message (D-18)

**Handoff block format (D-17):**
```markdown
## Last Phase Handoff

**Phase completed:** Phase N — [Phase Name]
**Completed:** [date]

**Key decisions made:**
- [Decision 1]
- [Decision 2]

**Key outputs produced:**
- [Output file or discovery artifact]

**What happens next:**
Run `/brand-compass:phase-[N+1]` to continue.
```

**The handoff block is overwritten at each phase completion (D-20)** — it is not appended; it replaces the previous `## Last Phase Handoff` section. This means the STATE.md write operation must either replace the section or append + overwrite.

**Implementation note:** The skill file instructions should tell the agent to overwrite the entire `## Last Phase Handoff` section in STATE.md. The simplest instruction: "Update `## Last Phase Handoff` section in STATE.md — replace the entire section with the new handoff block."

**The `/clear` nudge (D-18):**
```
Run `/brand-compass:phase-[N+1]` when you're ready. Suggest using `/clear` before starting the next phase to begin with a fresh context window.
```

**Files requiring this addition (10 files):**
- phase-1-origin/SKILL.md (Step 6)
- phase-2-audience/SKILL.md (Mark Complete step)
- phase-3-positioning/SKILL.md (Mark Complete step)
- phase-4-personality/SKILL.md (Mark Complete step)
- phase-5-messaging/SKILL.md (Mark Complete step)
- phase-6-voice/SKILL.md (Mark Complete step)
- phase-7-visual/SKILL.md (Mark Complete step)
- phase-8-toolkit/SKILL.md (Step 7)
- checkpoint-a/SKILL.md (Step 6)
- checkpoint-b/SKILL.md (completion step)

**The resume skill** (D-19) already reads STATE.md — the existing session start protocol in CLAUDE.md reads `Next Action` and synthesizes a briefing. The handoff block is additional context in the same STATE.md that the resume flow already reads. No new session-detection logic needed.

### Anti-Patterns to Avoid

- **Appending handoff blocks rather than replacing:** The handoff block must be overwritten, not appended. An accumulated list of old handoff blocks pollutes the STATE.md that agents read. The instruction must say "replace the ## Last Phase Handoff section."
- **Flat missing-file list in export:** D-02 explicitly prohibits a unified missing-file list. Each missing file must name its owning bundle and what command to run.
- **Cross-bundle consistency checks in verifier:** D-04 explicitly excludes cross-bundle drift checks. The verifier adds existence + substance checks only.
- **Verifier hard-failing on absent bundles:** If skill-bundle/ or design-kit/ don't exist, that is an "agent not yet run" state, not a critical failure. Report it as info/warning with the command to run, not as a blocking error.
- **design-kit-packager token paths in components:** The component `<link>` tags use `../tokens/` (one level up). The verifier substance check for `:root {}` absence catches this if the packager used inline tokens instead — this is the most common defect.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| File existence checks in React | Custom file system API | `fetch(..., { method: 'HEAD' })` | Already the established pattern in OutputPage.tsx line 66-74 |
| Bundle card layout from scratch | New component | Copy existing client deliverable card pattern | OutputPage.tsx lines 88-147 is the canonical card; replicate it |
| Verifier level numbering scheme | New numbering convention | Extend existing Level 1-6 pattern with Level 7, Level 8 | Consistent with existing agent structure |
| Handoff block parsing | Custom STATE.md parser | Prose instructions to overwrite a named section | Agents write markdown directly; no parsing needed |
| Agent timing estimates | Dynamic computation | Hardcoded prose estimates from existing pattern | Background agent protocol already uses hardcoded prose estimates |

**Key insight:** Every pattern in Phase 13 already exists in the codebase. The work is extension and wiring, not new invention.

## Common Pitfalls

### Pitfall 1: Stale Path Fix Scope
**What goes wrong:** Editor fixes only the file listing in Step 5 but misses the Step 6 review message. Both Step 5 and Step 6 of phase-8-toolkit/SKILL.md contain the path listing and both need `workspace/output/` updated to `workspace/output/client/`.
**Why it happens:** The CONTEXT.md note references lines 126-143 (Step 5), but the identical listing appears in Step 6 (lines ~170-186).
**How to avoid:** Grep for `workspace/output/` in phase-8-toolkit/SKILL.md and fix every occurrence that doesn't have `client/`, `skill-bundle/`, or `design-kit/` already.
**Warning signs:** Step 6 still shows `workspace/output/brand-foundation.md` (missing `client/` subdirectory).

### Pitfall 2: OutputViewer fileTitles Map Gaps
**What goes wrong:** Clicking a skill-bundle or design-kit file in OutputPage navigates to OutputViewer, which displays the raw filename as the title because `fileTitles` doesn't have an entry for `SKILL.md`, `HANDOFF.md`, etc.
**Why it happens:** `fileTitles` in OutputViewer.tsx only covers client bundle filenames.
**How to avoid:** Add entries for at minimum: `SKILL.md`, `brand-prompt.md`, `README.md`, `HANDOFF.md`, `landing-page.html`.
**Warning signs:** OutputViewer title bar shows "SKILL.md" rather than "Agent Skill Definition".

### Pitfall 3: Design Kit File Count in allPaths
**What goes wrong:** The "N of M files ready" counter in OutputPage shows the wrong denominator because allPaths doesn't include skill-bundle and design-kit files.
**Why it happens:** `allPaths` is constructed from `deliverables.flatMap(...)` + `assetPackPaths`. New bundle files must be explicitly included.
**How to avoid:** Ensure both skill-bundle file list and the design-kit representative file list are part of the total count calculation.
**Warning signs:** Counter shows "8 of 8 files ready" after Phase 8 even though skill-bundle and design-kit haven't been generated.

### Pitfall 4: Verifier Level Numbering Collision
**What goes wrong:** Adding new levels as "Level 7" and "Level 8" when the verifier output report currently has Level 5 (Personality) and Level 6 (Voice Compliance) — if Levels 5 and 6 are treated as the last, a reader may not notice that Levels 7 and 8 were added.
**Why it happens:** The verifier output format has a fixed Scores table. New rows may be missed in the Output Format section.
**How to avoid:** Update BOTH the Verification Levels section (adding Level 7 and Level 8 headings) AND the Output Format section (adding rows to the Scores table).
**Warning signs:** Levels 7/8 have check logic but don't appear in the verification report.

### Pitfall 5: Handoff Block Accumulation
**What goes wrong:** If the write instruction says "add" or "append" rather than "replace", multiple handoff blocks accumulate in STATE.md, bloating the resume context.
**Why it happens:** Markdown file editing naturally appends; explicit overwrite instructions are needed.
**How to avoid:** Each Mark Complete step instruction must say "Replace the ## Last Phase Handoff section" — not "Add a handoff block". If the section doesn't exist yet (first phase), the write creates it.
**Warning signs:** STATE.md has multiple `## Last Phase Handoff` sections after running several phases.

### Pitfall 6: Verifier Runs Against Absent Bundles
**What goes wrong:** If the verifier runs before skill-bundle-packager or design-kit-packager have run (e.g., manual `/brand-compass:verify` call during Phase 5), it will fail Level 7 and Level 8 checks even though those phases aren't started.
**Why it happens:** The verifier checks are designed for post-Phase-8 invocation but can be called manually at any time.
**How to avoid:** Level 7 and Level 8 checks should be conditional on Phase 8 being complete (same condition as Level 1 Phase 8 check). If Phase 8 is incomplete, skip Level 7 and Level 8 with "Skipped — Phase 8 not yet complete".
**Warning signs:** Verifier reports skill-bundle missing as a Critical failure during early discovery phases.

## Code Examples

### Functional Bundle Card in OutputPage.tsx

Add new entries to the `deliverables` array (or handle separately after the existing map):

```typescript
// Source: existing pattern from OutputPage.tsx lines 10-47
// Skill Bundle — add to deliverables array or as separate constant
{
  title: 'Agent Skill Bundle',
  files: [
    { filename: 'workspace/output/skill-bundle/SKILL.md', format: 'MD' },
    { filename: 'workspace/output/skill-bundle/brand-prompt.md', format: 'MD' },
    { filename: 'workspace/output/skill-bundle/source/voice-rules.md', format: 'MD' },
    { filename: 'workspace/output/skill-bundle/source/guardrails.md', format: 'MD' },
    { filename: 'workspace/output/skill-bundle/source/language-bank.md', format: 'MD' },
  ],
  description: 'Claude Code skill definition, brand prompt, and voice source files.',
  icon: FileText,
},
```

The existing `useEffect` / `fetch HEAD` loop and the card rendering map both work with this data shape without modification.

### OutputViewer Link Path Construction

The existing link pattern in OutputPage.tsx:
```typescript
// Source: OutputPage.tsx line 108
to={`/output/view/${f.filename.replace('workspace/output/', '')}`}
```
For `workspace/output/skill-bundle/SKILL.md`, this produces `/output/view/skill-bundle/SKILL.md`.

In OutputViewer.tsx, `filePath` (from `useParams`) will be `skill-bundle/SKILL.md`, so:
```typescript
const srcUrl = `/workspace/output/${filePath}`
// = /workspace/output/skill-bundle/SKILL.md
```
Vite serves this directly from the filesystem. No path translation change needed.

### STATE.md Handoff Block Write Instruction (for phase skill files)

```markdown
## Step N: Mark Complete

When the client confirms:

1. Update STATE.md:
   - Check `Phase N: [Name]` as complete
   - Set Next Action: "[next action]"
   - Add Session Log entry
   - **Replace** the `## Last Phase Handoff` section with:
     ```
     ## Last Phase Handoff

     **Phase completed:** Phase N — [Phase Name]
     **Completed:** [today's date]

     **Key decisions made:**
     - [Key decisions from this phase — list 2-4 items]

     **Key outputs produced:**
     - [List output files or named discovery artifacts]

     **What happens next:**
     Run `/brand-compass:phase-[N+1]` to continue.
     ```
     If `## Last Phase Handoff` does not yet exist, append it to the end of STATE.md.

2. Tell the client: "[existing completion message]
   Suggest using `/clear` before starting Phase [N+1] to begin with a fresh context window."
```

### Verifier Level 7 Check Pattern

```markdown
### Level 7: Skill Bundle

Only run if Phase 8 is complete. If `workspace/output/skill-bundle/` is entirely absent, report:
"Skill Bundle: Not yet generated — run skill-bundle-packager after Phase 8 assembly completes."
Skip to Level 8.

**Level 7A: Existence**

Check that all 5 expected files exist:
- `workspace/output/skill-bundle/SKILL.md`
- `workspace/output/skill-bundle/brand-prompt.md`
- `workspace/output/skill-bundle/source/voice-rules.md`
- `workspace/output/skill-bundle/source/guardrails.md`
- `workspace/output/skill-bundle/source/language-bank.md`

**Level 7B: Substance**

- Read `workspace/output/skill-bundle/SKILL.md`: count lines. Flag as Critical if under 200.
- Read `workspace/output/skill-bundle/brand-prompt.md`: scan for any `#` character. Flag as Critical if found. Count words (split on whitespace). Flag as Critical if under 150 or over 300.
- Read each source/ file: flag as Critical if any file is empty (0 bytes or whitespace only).
```

### Phase 8 Stale Path — Before and After

```markdown
# Before (stale — lines 126-133 of current SKILL.md):
1. `workspace/output/brand-foundation.md`
2. `workspace/output/brand-foundation.html`
...
- `workspace/output/social-media-kit.html`

# After (fixed):
1. `workspace/output/client/brand-foundation.md`
2. `workspace/output/client/brand-foundation.html`
...
- `workspace/output/client/social-media-kit.html`
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Single output directory (`workspace/output/`) | Three-bundle subdirectory model (`client/`, `skill-bundle/`, `design-kit/`) | Phase 10 | All path references in skill files and frontend must use the new paths |
| Phase 8 produces only client output | Phase 8 orchestrates 4 agents in sequence | Phase 13 (this work) | Phase 8 duration increases; new failure handling needed |
| Export command is client-only | Export describes 3 bundles with per-bundle missing-file attribution | Phase 13 (this work) | Export command is the primary delivery summary |
| Verifier covers client output only | Verifier covers all three bundles | Phase 13 (this work) | Quality gate is comprehensive end-of-engagement check |

**Still valid (not deprecated):**
- The background agent protocol pattern (CLAUDE.md) — unchanged
- The existing verifier Level 1-6 structure — extended, not replaced
- React `import.meta.glob` patterns in content-loader.ts — already updated in Phase 10, work as-is

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The skill-bundle file list in the export command is exactly 5 files (SKILL.md, brand-prompt.md, source/voice-rules.md, source/guardrails.md, source/language-bank.md) | Standard Stack, Code Examples | Low — these are the exact 5 output files from skill-bundle-packager.md Quality Bar section (verified) |
| A2 | The design kit total expected file count is 23 (5 tokens + 7 components + 5 previews + 4 root + 2 copied specimens) | Architecture Patterns, Verifier Level 8 | Low — derived from design-kit-foundation and design-kit-packager Output sections (verified) |
| A3 | OutputPage.tsx file existence check with `fetch HEAD` works for files in subdirectories like `skill-bundle/source/voice-rules.md` | Code Examples | Low — Vite serves all files under workspace/ as static assets; path traversal to subdirectories works |
| A4 | Phase 8 step renaming (5b → new 5b/5c/5d/5e) is at Claude's Discretion without a hard requirement | Architecture Patterns | Low — CONTEXT.md explicitly lists step numbering as Claude's Discretion |
| A5 | The checkpoint-b/SKILL.md has a Mark Complete step equivalent — not yet read in full | Common Pitfalls (INTG-06) | Low — checkpoint-a/SKILL.md confirmed to have a Mark Complete step; checkpoint-b almost certainly follows the same pattern |

**All claims A1-A4 are verified from canonical files. A5 is the only unconfirmed item — negligible risk.**

## Open Questions

1. **Design Kit card granularity (OutputPage.tsx)**
   - What we know: D-16 says OutputPage.tsx "may need new sections or cards" for skill-bundle and design-kit
   - What's unclear: Whether the design kit should be one card (representative files) or multiple sub-cards (by directory)
   - Recommendation: Claude's Discretion — one card showing landing-page.html, README.md, HANDOFF.md, and a "7 component files" count indicator. Individual component drill-down is future scope.

2. **checkpoint-b/SKILL.md Mark Complete structure**
   - What we know: checkpoint-a has a "Step 6: Pass Checkpoint" with STATE.md updates
   - What's unclear: checkpoint-b structure was not read — confirmation needed at execution time
   - Recommendation: Read checkpoint-b/SKILL.md at execution time before editing. The pattern will be equivalent to checkpoint-a.

## Environment Availability

Step 2.6: SKIPPED — Phase 13 is purely code/config/text edits with no external tool or service dependencies beyond the existing Node.js/Vite/TypeScript stack already installed.

## Validation Architecture

No automated test framework is present in this project (no jest/vitest config, no test files found). The project uses manual verification patterns: lint (`npm run lint`), build (`npm run build`), and test data loading (`npm run workspace:load`).

**Phase 13 verification is manual, checking against the INTG success criteria:**

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Command or Verification |
|--------|----------|-----------|------------------------|
| INTG-01 | Export shows three bundle sections with completeness indicators | Manual | Run export after Phase 8 with test data; confirm three sections present |
| INTG-01 | Missing files attributed to bundle with actionable guidance | Manual | Remove a file; confirm missing message names the bundle and command |
| INTG-02 | Verifier Level 7 checks pass for skill-bundle structure | Manual | Run `/brand-compass:verify` with test skill-bundle output; confirm Level 7 results |
| INTG-02 | Verifier Level 8 checks pass for design-kit structure | Manual | Run `/brand-compass:verify` with test design-kit output; confirm Level 8 results |
| INTG-02 | Verifier surfaces bundle-specific gaps | Manual | Remove one file per bundle; confirm per-bundle gap reporting |
| INTG-03 | CLAUDE.md agent table has 2 new rows | Automated | `grep -c "skill-bundle-packager\|design-kit-packager" CLAUDE.md` — should return ≥2 |
| INTG-03 | CLAUDE.md has workspace structure section | Automated | `grep -l "## Workspace Structure" CLAUDE.md` |
| INTG-04 | Phase 8 runs skill-bundle-packager and design-kit chain in sequence | Manual | Step through Phase 8 with test data; confirm 4 agents launch |
| INTG-04 | Stale paths fixed | Automated | `grep "workspace/output/brand-foundation" .claude/skills/brand-compass/phase-8-toolkit/SKILL.md` — should return 0 hits |
| INTG-05 | Frontend displays skill-bundle files when present | Manual | `npm run test:dev` — navigate to /output; confirm skill-bundle card active |
| INTG-05 | Frontend displays design-kit files when present | Manual | Same — confirm design-kit card active |
| INTG-05 | No broken paths or missing assets | Automated | `npm run build` — TypeScript and Vite build must pass without errors |
| INTG-06 | Phase skill files include `/clear` nudge | Automated | `grep -l "clear" .claude/skills/brand-compass/phase-*/SKILL.md` — 8+ files |
| INTG-06 | STATE.md gets Last Phase Handoff block | Manual | Complete a test phase; confirm `## Last Phase Handoff` appears in STATE.md |

### Quick build verification:
```bash
cd /Users/kelseyruger/Projects/a-emporium-working/gold-master-projects/brand-compass && npm run build
```

### Stale path audit (run before and after INTG-04):
```bash
grep -n "workspace/output/" .claude/skills/brand-compass/phase-8-toolkit/SKILL.md | grep -v "client/\|skill-bundle/\|design-kit/"
```

### Wave 0 Gaps

None — no test framework install or new test file creation required. All verification is grep-based or manual functional testing using `npm run test:dev`.

## Security Domain

INTG-01 through INTG-06 are documentation, agent skill file, and React frontend edits. No authentication, session management, input validation of user data, or cryptography is involved. Security domain is not applicable to this phase.

## Sources

### Primary (HIGH confidence)

All findings are derived from direct file reads of the canonical files in this codebase. No external sources consulted.

- `.claude/agents/brand-verifier.md` — existing Level 1-6 structure, Output Format section
- `.claude/agents/skill-bundle-packager.md` — Quality Bar section (exact file list, line count thresholds, word count thresholds)
- `.claude/agents/design-kit-packager.md` — Quality Bar section, Output section (complete file list)
- `.claude/skills/brand-compass/export/SKILL.md` — current Step 2, Step 5 structure
- `.claude/skills/brand-compass/phase-8-toolkit/SKILL.md` — current Step 5, Step 5b, stale paths at lines 126-143 and ~170-186
- `src/components/OutputPage.tsx` — existing deliverables array, file existence check pattern, placeholder cards
- `src/components/OutputViewer.tsx` — path translation logic, srcUrl construction
- `src/lib/content-loader.ts` — existing import.meta.glob patterns for all three subdirectories
- `src/lib/phase-utils.ts` — ASSET_PACKS with confirmed `workspace/output/client/` paths
- `.planning/phases/13-integration/13-CONTEXT.md` — all locked decisions D-01 through D-20

### Tertiary (LOW confidence)

None. All findings verified from codebase files.

## Metadata

**Confidence breakdown:**
- Export command changes: HIGH — current file read, locked decisions, clear before/after
- Brand verifier extension: HIGH — existing pattern directly maps to new levels; quality bar criteria from packager agents
- Phase 8 orchestration: HIGH — current step structure read, stale lines identified
- CLAUDE.md updates: HIGH — agent table columns confirmed, new row data from agent definitions
- React frontend: HIGH — OutputPage.tsx read, path logic understood, TypeScript shape verified
- Phase handoff additions: HIGH — Mark Complete pattern confirmed across phase-1 and checkpoint-a; shape is unambiguous

**Research date:** 2026-04-20
**Valid until:** 2026-05-20 (stable domain — file-editing work, not library-dependent)

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| INTG-01 | /brand-compass:export updated to verify and describe all three bundles | Per-bundle section structure with completeness indicators (D-01 through D-03); exact file lists for each bundle derived from packager agent Output sections |
| INTG-02 | Brand Verifier updated with three-bundle checks | Level 7 and Level 8 check criteria derived directly from skill-bundle-packager and design-kit-packager Quality Bar sections (D-05, D-06); conditional execution pattern documented |
| INTG-03 | CLAUDE.md updated (agent table, workspace structure, multi-bundle output section) | New agent table row data from agent definitions; workspace structure diagram; multi-bundle section schema (D-12 through D-14) |
| INTG-04 | Phase 8 skill file updated to orchestrate new agent launches | Four-step sequential chain (D-08); failure isolation logic (D-10); stale path fix with exact before/after (D-11); time estimates and status protocol (D-09) |
| INTG-05 | React frontend updated for new output directory structure | Skill-bundle file list (5 files); design-kit card approach; OutputViewer path compatibility confirmed; fileTitles map gap identified; allPaths count issue documented |
| INTG-06 | Phase transition context management — handoff block + /clear nudge | Handoff block format (D-17); overwrite vs append requirement (D-20); /clear nudge wording (D-18); list of 10 files to update; resume skill compatibility (D-19) |
</phase_requirements>
