# Phase 13: Integration - Pattern Map

**Mapped:** 2026-04-20
**Files analyzed:** 14 files to be modified
**Analogs found:** 14 / 14

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `.claude/skills/brand-compass/export/SKILL.md` | skill (agent instruction) | request-response | existing export/SKILL.md itself (extend) | exact — extend in place |
| `.claude/agents/brand-verifier.md` | agent definition | batch/transform | existing brand-verifier.md itself (extend) | exact — extend in place |
| `CLAUDE.md` | config/documentation | static | existing CLAUDE.md Agent Table section | exact — extend in place |
| `.claude/skills/brand-compass/phase-8-toolkit/SKILL.md` | skill (orchestrator) | sequential/chained | existing phase-8-toolkit/SKILL.md Step 5/5b | exact — extend in place |
| `src/components/OutputPage.tsx` | component | request-response | existing OutputPage.tsx deliverables array (lines 10-47) | exact — same data shape |
| `src/components/OutputViewer.tsx` | component | request-response | existing OutputViewer.tsx fileTitles map (lines 9-26) | exact — add entries |
| `.claude/skills/brand-compass/phase-1-origin/SKILL.md` | skill (phase) | request-response | existing phase-1-origin/SKILL.md Step 6 | exact — extend Mark Complete |
| `.claude/skills/brand-compass/phase-2-audience/SKILL.md` | skill (phase) | request-response | existing phase-2-audience/SKILL.md Step 6 | exact — extend Mark Complete |
| `.claude/skills/brand-compass/phase-3-positioning/SKILL.md` | skill (phase) | request-response | same Step 6 pattern | exact |
| `.claude/skills/brand-compass/phase-4-personality/SKILL.md` | skill (phase) | request-response | same Step 6 pattern | exact |
| `.claude/skills/brand-compass/phase-5-messaging/SKILL.md` | skill (phase) | request-response | same Step 6 pattern | exact |
| `.claude/skills/brand-compass/phase-6-voice/SKILL.md` | skill (phase) | request-response | same Step 6 pattern | exact |
| `.claude/skills/brand-compass/phase-7-visual/SKILL.md` | skill (phase) | request-response | same Step 6 pattern | exact |
| `.claude/skills/brand-compass/checkpoint-a/SKILL.md` | skill (checkpoint) | request-response | existing checkpoint-a/SKILL.md Step 6 | exact — extend Pass Checkpoint |
| `.claude/skills/brand-compass/checkpoint-b/SKILL.md` | skill (checkpoint) | request-response | existing checkpoint-b/SKILL.md Step 7 | exact — extend Pass Checkpoint |

---

## Pattern Assignments

### `.claude/skills/brand-compass/export/SKILL.md` (skill, request-response)

**Analog:** existing `export/SKILL.md`

**Current Step 2 pattern** (lines 21-39) — single flat file list to replace with three per-bundle sections:
```markdown
## Step 2: Verify All Output Files

Check that all core deliverable files exist in the `workspace/output/client/` directory:

1. `workspace/output/client/brand-foundation.md` — Brand Foundation (Markdown)
...

If any are missing, flag them:

"The following deliverables are missing:
- [missing file] — [what it should contain]
```

**New per-bundle missing-file attribution pattern** (D-02, D-03) — replace flat list with:
```markdown
**Client Package — 8/8 files** (or "8 files — N missing")

Missing from Client Package — run Document Assembler:
- workspace/output/client/[filename]

**Agent Skill Bundle — 5/5 files** (or "N/5 files — N missing")

Missing from Agent Skill Bundle — run skill-bundle-packager:
- workspace/output/skill-bundle/[filename]

**Design Kit — 23/23 files** (or "N/23 files — N missing")

Missing from Design Kit — run design-kit-packager:
- workspace/output/design-kit/[filename]
```

**Current Step 5 summary table pattern** (lines 67-98) — existing single-bundle table to replicate per bundle:
```markdown
| Document | Format | Location |
|----------|--------|----------|
| Brand Foundation | Markdown | `workspace/output/client/brand-foundation.md` |
| Brand Foundation | HTML Specimen | `workspace/output/client/brand-foundation.html` |
...
```

**New Step 5 three-bundle table pattern** — replicate table structure three times:
```markdown
**Client Package (8 files):**
| Document | Format | Location |
|----------|--------|----------|
| Brand Foundation | Markdown | `workspace/output/client/brand-foundation.md` |
...

**Agent Skill Bundle (5 files):**
| Document | Format | Location |
|----------|--------|----------|
| SKILL.md | MD | `workspace/output/skill-bundle/SKILL.md` |
| Brand Prompt | MD | `workspace/output/skill-bundle/brand-prompt.md` |
| Voice Rules | MD | `workspace/output/skill-bundle/source/voice-rules.md` |
| Guardrails | MD | `workspace/output/skill-bundle/source/guardrails.md` |
| Language Bank | MD | `workspace/output/skill-bundle/source/language-bank.md` |

**Design Kit (23 files):**
| Document | Format | Location |
|----------|--------|----------|
| landing-page.html | HTML | `workspace/output/design-kit/landing-page.html` |
| README.md | MD | `workspace/output/design-kit/README.md` |
| HANDOFF.md | MD | `workspace/output/design-kit/HANDOFF.md` |
| package.json | JSON | `workspace/output/design-kit/package.json` |
| [5 token files, 7 components, 5 previews, 2 specimens — listed by subdirectory] |
```

---

### `.claude/agents/brand-verifier.md` (agent definition, batch/transform)

**Analog:** existing `brand-verifier.md` Level 1-6 structure

**Existing Level 1 pattern** (lines 31-55) — pattern to copy for Level 7 and Level 8 structure:
```markdown
### Level 1: Existence

Check that expected files exist for each completed phase.

**Phase 8 (Assembly):**
- `workspace/output/client/brand-foundation.md`
- `workspace/output/client/brand-foundation.html`
...
```

**Existing conditional-skip pattern** (lines 197-198 — Level 6):
```markdown
Skip this level if the voice fingerprint doesn't exist (note "Voice compliance skipped — no voice fingerprint available" as Info).
```

**New Level 7: Skill Bundle** — copy Level 1 structure, add conditional:
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
- Read `workspace/output/skill-bundle/brand-prompt.md`: scan for any `#` character. Flag as Critical
  if found. Count words (split on whitespace). Flag as Critical if under 150 or over 300.
- Read each source/ file: flag as Critical if any file is empty (0 bytes or whitespace only).
```

**New Level 8: Design Kit** — same two-tier A/B pattern:
```markdown
### Level 8: Design Kit

Only run if Phase 8 is complete. If `workspace/output/design-kit/` is entirely absent, report:
"Design Kit: Not yet generated — run design-kit-foundation then design-kit-packager after Phase 8."
Skip.

**Level 8A: Existence** (23 files total)

Token files (5): tokens/colors.css, tokens/typography.css, tokens/spacing.css,
  tokens/tokens.json, tokens/tailwind.config.js
Components (7): components/button.html, components/card.html, components/form-field.html,
  components/nav.html, components/modal.html, components/alert.html, components/badge.html
Previews (5): previews/colors.html, previews/type.html, previews/spacing.html,
  previews/components.html, previews/brand-groups.html
Root files (4): README.md, package.json, HANDOFF.md, landing-page.html
Post-processed specimens (2): brand-foundation.html, color-palette.html

**Level 8B: Substance**

- Scan each components/*.html file for `:root {` blocks. Flag as Critical if found (components must
  link external tokens, not define their own).
- Read landing-page.html: scan for `[` characters. Flag as Critical if any `[bracket]` placeholder
  markers are present.
- Read any previews/*.html: check that `.preview-card` style includes `min-width: 150px`.
  Flag as Warning if absent.
```

**Existing Scores table** (lines 241-247) — add two rows:
```markdown
| Skill Bundle | N/5 files | [missing files if any] |
| Design Kit   | N/23 files | [missing files if any] |
```

---

### `CLAUDE.md` (config/documentation, static)

**Analog:** existing CLAUDE.md Agent Table (lines 144-156)

**Existing Agent Table row pattern** (lines 148-156):
```markdown
| Agent | Trigger | Input | Output Location | Blocking? |
|-------|---------|-------|-----------------|-----------|
| Research Analyst | Required — auto-launches at Phase 2 completion | Named competitors (STATE.md), audience segments (Phase 2), entity type (STATE.md), industry/domain | `workspace/research/competitive-brief.md` | No (runs in background, but must complete before Phase 3 begins) |
| Document Assembler | Phase completes OR client requests current state OR end of process | All completed outputs | `workspace/output/[document].md` | No |
```

**New rows to append to Agent Table** (D-12):
```markdown
| skill-bundle-packager | Phase 8 assembly complete — launched from Phase 8 Step 5b | workspace/output/client/ outputs | `workspace/output/skill-bundle/` | No |
| design-kit-packager | design-kit-foundation completes — launched from Phase 8 Step 5d | workspace/output/design-kit/tokens/, workspace/output/design-kit/*.html | `workspace/output/design-kit/components/`, previews/, root files | No |
```

**New Workspace Structure section** (D-13) — add after Agent Table, before Background Agent Protocol:
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

**New Multi-Bundle Output section** (D-14) — add after Workspace Structure:
```markdown
## Multi-Bundle Output

Three bundles are produced at end of engagement:

| Bundle | Contents | Downstream Consumer |
|--------|----------|---------------------|
| client/ | brand-foundation.md/html, voice-guide.md/html, color-palette.html, visual-system.html, ui-kit.html, practical-toolkit.md, asset pack specimens | Human client — shareable deliverables |
| skill-bundle/ | SKILL.md, brand-prompt.md, source/ files | Claude Code agents — ingest via skill or system prompt |
| design-kit/ | tokens/*.css/json/js, components/*.html, previews/*.html, landing-page.html, README.md, HANDOFF.md, package.json | Designer/developer — implementation reference |
```

---

### `.claude/skills/brand-compass/phase-8-toolkit/SKILL.md` (skill, sequential/chained)

**Analog:** existing phase-8-toolkit/SKILL.md Steps 5 and 5b

**Stale paths to fix** (lines 126-143) — every occurrence of `workspace/output/` without a bundle subdirectory must become `workspace/output/client/`:
```markdown
# Before (stale):
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
Also fix the identical listing in Step 6 (lines ~170-186). Grep for `workspace/output/` in this file and fix every occurrence that lacks a bundle subdirectory.

**Existing background agent launch pattern** (lines 118-123, Step 5) — copy for each new step:
```markdown
"Let me compile everything into your final documents. This generates your core deliverables plus
any asset pack specimens from everything we've built."

Update STATE.md Running Agents table.
```

**New Step 5b through 5e** — insert between current Step 5 and current Step 5b (which becomes Step 5e):
```markdown
## Step 5b: Launch skill-bundle-packager

After Document Assembler completes:

"Now I'm packaging your brand into a reusable Claude Code skill — your voice, guardrails, and
positioning as an agent-ready format. About 60-90 seconds."

Update STATE.md Running Agents table.

## Step 5c: Launch design-kit-foundation

"Now extracting your design tokens and post-processing the brand specimens. About 60 seconds."

Update STATE.md Running Agents table.

## Step 5d: Launch design-kit-packager

Only launch after design-kit-foundation completes successfully. If design-kit-foundation failed,
skip this step and tell the client: "The design kit foundation step did not complete —
design-kit-packager will be skipped. I can retry after we review the other deliverables."

"Building the component library, preview cards, and landing page from your tokens. About 2 minutes."

Update STATE.md Running Agents table.

## Step 5e: Quality Gate  [current Step 5b — renumber]

After all three packagers complete, run the Brand Verifier...
[existing Step 5b content unchanged except "After the Document Assembler completes" →
"After all three packager agents complete"]
```

---

### `src/components/OutputPage.tsx` (component, request-response)

**Analog:** existing `OutputPage.tsx` deliverables array (lines 10-47) and placeholder cards (lines 151-175)

**Existing deliverables array entry pattern** (lines 11-19):
```typescript
{
  title: 'Brand Foundation',
  files: [
    { filename: 'workspace/output/client/brand-foundation.md', format: 'MD' },
    { filename: 'workspace/output/client/brand-foundation.html', format: 'HTML' },
  ],
  description: 'Core belief, positioning, personality, archetypes — the strategic DNA.',
  icon: FileText,
},
```

**Existing file existence check pattern** (lines 64-74):
```typescript
useEffect(() => {
  const checks = allPaths.map(path =>
    fetch(`/${path}`, { method: 'HEAD' })
      .then(r => [path, r.ok] as const)
      .catch(() => [path, false] as const),
  )
  Promise.all(checks).then(results => {
    setFileExists(Object.fromEntries(results))
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])
```

**Existing card render pattern** (lines 88-147) — the `deliverables.map(d => ...)` block handles both existing and dimmed states based on `fileExists`; new bundle entries use the same map with no new rendering logic needed.

**Existing link path construction** (line 108):
```typescript
to={`/output/view/${f.filename.replace('workspace/output/', '')}`}
```

**Placeholder cards to replace** (lines 151-175) — the two static `Card` components with `opacity-50 border-dashed` for Agent Skill Bundle and Design Kit. Replace by adding entries to the `deliverables` array:

```typescript
// Add to deliverables array (skill bundle entry):
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
// Add to deliverables array (design kit entry):
{
  title: 'Design Kit',
  files: [
    { filename: 'workspace/output/design-kit/landing-page.html', format: 'HTML' },
    { filename: 'workspace/output/design-kit/README.md', format: 'MD' },
    { filename: 'workspace/output/design-kit/HANDOFF.md', format: 'MD' },
  ],
  description: 'Atomized components, design tokens, preview cards, and reference specimens.',
  icon: Code,
},
```

**allPaths fix** (lines 54-58) — the new bundle files must be counted. They are included automatically once added to the `deliverables` array, because `allCorePaths` is `deliverables.flatMap(d => d.files.map(f => f.filename))`.

---

### `src/components/OutputViewer.tsx` (component, request-response)

**Analog:** existing `OutputViewer.tsx` fileTitles map (lines 9-26)

**Existing fileTitles map pattern** (lines 9-26):
```typescript
const fileTitles: Record<string, string> = {
  'brand-foundation.md': 'Brand Foundation',
  'brand-foundation.html': 'Brand Foundation',
  'voice-guide.md': 'Voice & Expression Guide',
  ...
}
```

**New entries to add** — append to the fileTitles map:
```typescript
'SKILL.md': 'Agent Skill Definition',
'brand-prompt.md': 'Brand Prompt',
'voice-rules.md': 'Voice Rules',
'guardrails.md': 'Guardrails',
'language-bank.md': 'Language Bank',
'landing-page.html': 'Design Kit Landing Page',
'README.md': 'Design Kit README',
'HANDOFF.md': 'Design Kit Handoff Guide',
```

**Path translation — already works** (line 37): `const srcUrl = '/workspace/output/${filePath}'` handles subdirectory paths like `skill-bundle/SKILL.md` without modification. No changes needed beyond fileTitles.

---

### Phase Skill Files — Mark Complete Steps (10 files)

**Analog:** existing `phase-1-origin/SKILL.md` Step 6 (lines 108-121) and `phase-2-audience/SKILL.md` Step 6 (lines 94-107)

**Existing Mark Complete pattern** — canonical shape across all phase skill files:
```markdown
## Step 6: Mark Complete

Before marking complete, run the Pushback Audit self-check...

When the client confirms the outputs are right:

1. Update STATE.md:
   - Check `Phase N: [Name]` as complete
   - Check [discovery outputs] in Discovery Outputs
   - Set Next Action: "[next step]"
   - Add Session Log entry
2. Tell the client: "[completion message]. Run `/brand-compass:phase-[N+1]` when you're ready..."
```

**Existing checkpoint Pass Checkpoint pattern** — `checkpoint-a/SKILL.md` Step 6 (lines 93-100), `checkpoint-b/SKILL.md` Step 7 (lines 100-106):
```markdown
## Step 6: Pass Checkpoint

1. Update STATE.md:
   - Check `Checkpoint A: Phases 1-3 solid` as passed
   - Set Next Action: "Begin Phase 4: Personality & Archetypes"
   - Add Session Log entry noting checkpoint passed
2. Tell the client: "Checkpoint A passed..."
```

**Additions to make to every Mark Complete / Pass Checkpoint step** (D-17, D-18, D-20):

Insert into the STATE.md update block (item 1), after "Add Session Log entry":
```markdown
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
```

Append to item 2 (the tell-the-client message):
```markdown
   Suggest using `/clear` before starting Phase [N+1] to begin with a fresh context window.
```

**File-specific next phase values:**

| File | Current Completion Step | Next Phase Command |
|------|------------------------|--------------------|
| phase-1-origin/SKILL.md | Step 6 | `/brand-compass:phase-2-audience` |
| phase-2-audience/SKILL.md | Step 6 | `/brand-compass:phase-3-positioning` |
| phase-3-positioning/SKILL.md | Mark Complete step | `/brand-compass:phase-4-personality` (via Checkpoint A) |
| phase-4-personality/SKILL.md | Mark Complete step | `/brand-compass:phase-5-messaging` |
| phase-5-messaging/SKILL.md | Mark Complete step | `/brand-compass:phase-6-voice` |
| phase-6-voice/SKILL.md | Mark Complete step | `/brand-compass:phase-7-visual` (via Checkpoint B) |
| phase-7-visual/SKILL.md | Mark Complete step | `/brand-compass:phase-8-toolkit` |
| phase-8-toolkit/SKILL.md | Step 7 | `/brand-compass:export` |
| checkpoint-a/SKILL.md | Step 6 | `/brand-compass:phase-4-personality` |
| checkpoint-b/SKILL.md | Step 7 | `/brand-compass:phase-7-visual` |

---

## Shared Patterns

### Background Agent Launch Protocol
**Source:** `CLAUDE.md` Background Agent Protocol section (lines 164-172), `phase-8-toolkit/SKILL.md` Step 5 (lines 118-123)
**Apply to:** New Phase 8 steps 5b, 5c, 5d
```markdown
"[Tell client what the agent is doing and time estimate]"

Update STATE.md Running Agents table.
```
Time estimates for new agents: skill-bundle-packager = "60-90 seconds", design-kit-foundation = "60 seconds", design-kit-packager = "2 minutes".

### Conditional Skip on Absent Directory
**Source:** `brand-verifier.md` Level 6 skip pattern (lines 197-198)
**Apply to:** Verifier Level 7 and Level 8 checks
```markdown
Skip this level if [directory] doesn't exist (note "[Bundle]: Not yet generated — run [agent]" as Info).
```

### Failure Isolation
**Source:** Established in CONTEXT.md D-10; pattern mirrors existing "If required output, retry once before manual fallback" in CLAUDE.md Error Handling section (lines 271-278)
**Apply to:** Phase 8 Step 5d (design-kit-packager) — only runs if design-kit-foundation succeeded.
```markdown
If design-kit-foundation fails → skip design-kit-packager; report explicitly.
skill-bundle-packager failure is independent — does not block design-kit chain.
```

### STATE.md Section Overwrite (not append)
**Source:** CONTEXT.md D-20; all Mark Complete steps use this imperative form
**Apply to:** All 10 phase/checkpoint skill files
```markdown
**Replace** the `## Last Phase Handoff` section...
If `## Last Phase Handoff` does not yet exist, append it to the end of STATE.md.
```

---

## No Analog Found

None. Every file modified in Phase 13 has an exact in-place analog — the work is extension, not creation.

---

## Metadata

**Analog search scope:** `.claude/agents/`, `.claude/skills/brand-compass/`, `src/components/`, `src/lib/`
**Files scanned:** 14 target files + 4 supporting reference files
**Pattern extraction date:** 2026-04-20
