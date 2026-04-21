# Phase 11: Agent Skill Bundle - Pattern Map

**Mapped:** 2026-04-20
**Files analyzed:** 1 new file to create
**Analogs found:** 1 / 1

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `.claude/agents/skill-bundle-packager.md` | agent definition | file I/O + transform (read sources → extract + synthesize → write 5 output files) | `.claude/agents/design-kit-foundation.md` | exact (same model, tools, two-task sequential structure) |

---

## Pattern Assignments

### `.claude/agents/skill-bundle-packager.md` (agent definition, file I/O + transform)

**Primary analog:** `.claude/agents/design-kit-foundation.md`
**Quality bar analog:** `.claude/agents/document-assembler.md` (200+ lines, depth and specificity of instruction)
**Translation rule analog:** `.claude/agents/copywriter.md` (Copy Mode / Translation Rule section — same "discovery language vs. stranger-facing output" discipline applied to SKILL.md synthesis)

---

### Pattern 1: YAML Frontmatter Block

**Source:** `.claude/agents/design-kit-foundation.md` lines 1-15

Copy this structure exactly — `name`, `description` (multi-line with `>` scalar and `**Triggers:**` embedded), `model`, `tools`:

```markdown
---
name: design-kit-foundation
description: >
  Extracts design tokens from visual-direction.md into standalone CSS/JSON/JS
  files, then post-processes client HTML specimens into design-kit variants
  with external token links. Produces the token pipeline and dual-specimen
  pattern for the design kit bundle.

  **Triggers:**
  - Document Assembler completes client HTML specimens
  - Lead strategist requests design kit generation

model: sonnet
tools: Read, Write, Glob, Grep
---
```

For skill-bundle-packager, substitute:
- `name: skill-bundle-packager`
- Description: what it reads (3 required + 1 conditional input files), what it produces (5 output files in `workspace/output/skill-bundle/`)
- Triggers: Phase 8 assembly complete; lead strategist requests skill bundle generation
- `model: sonnet` — same as design-kit-foundation, document-assembler, brand-verifier (all file-processing agents)
- `tools: Read, Write, Glob, Grep` — same as design-kit-foundation

---

### Pattern 2: Opening Identity Statement

**Source:** `.claude/agents/design-kit-foundation.md` line 17

Single sentence immediately after frontmatter naming the agent's role and core task:

```markdown
You are the Design Kit Foundation agent. You extract design tokens from the
approved visual direction and post-process client HTML specimens into design-kit
variants that reference those tokens externally. You run after the Document
Assembler has produced its client HTML files.
```

For skill-bundle-packager: "You are the Skill Bundle Packager agent. You read completed brand engagement outputs and produce a complete, usable skill bundle at `workspace/output/skill-bundle/`. You run after Phase 8 assembly is complete."

---

### Pattern 3: Input Section

**Source:** `.claude/agents/design-kit-foundation.md` lines 19-23

Bulleted list under `## Input` with file paths in backticks, inline description after `--`, and `(required)` / `(optional)` qualifiers:

```markdown
## Input

- `workspace/drafts/visual-direction.md` -- reads the CSS Custom Properties Block
  from the Design System Parameters section (required)
- `workspace/output/client/*.html` -- reads completed client HTML specimens for
  post-processing
- `workspace/STATE.md` -- reads client profile for brand context
```

For skill-bundle-packager, list all 5 inputs:
- `workspace/output/client/voice-guide.md` — primary source (required)
- `workspace/output/client/brand-foundation.md` — positioning and archetype context (required)
- `workspace/STATE.md` — brand name and entity type (required)
- `workspace/output/client/practical-toolkit.md` — targeted read for Language Bank / Codify-Retire section only (required for language-bank.md extraction)
- `workspace/research/voice-fingerprint.md` — optional; read if present for brand-prompt.md enrichment; skip if absent

---

### Pattern 4: Before Starting / Pre-Flight Checks

**Source:** `.claude/agents/design-kit-foundation.md` lines 25-28

Single `## Before Starting` section with explicit stop condition for missing required input:

```markdown
## Before Starting

Read `workspace/drafts/visual-direction.md` fully. Locate the
`## Design System Parameters` section and its `### CSS Custom Properties Block`.
This block is the single source of truth for all token values. If this section
does not exist in visual-direction.md, stop and report: "Design System Parameters
section not found in visual-direction.md. Cannot extract tokens without CSS
Custom Properties Block."
```

For skill-bundle-packager, expand to a numbered pre-flight check list (one Glob check per required file, with stop message per file). The conditional voice-fingerprint.md check is check #5 — if not found, note and continue rather than stop.

Also follow document-assembler.md's pattern of reading a skill file before starting work (lines 34-38 of document-assembler.md):

```markdown
## Before Starting Work
1. Read `.claude/skills/specimen-design/SKILL.md` — the design guide that defines
   what makes a brand specimen vs a generic template.
```

Skill-bundle-packager does not need a skill pre-read, but the sequential pre-flight numbered list format is the right pattern for its 5 existence checks.

---

### Pattern 5: Conditional Optional Input Handling

**Source:** `.claude/agents/brand-verifier.md` lines 42-43 and `.claude/agents/document-assembler.md` line 31

Pattern: state the conditional file in the Input section with "(optional — ...)" qualifier; in task instructions, Glob to check existence and branch:

From document-assembler.md line 31:
```markdown
- `workspace/research/voice-fingerprint.md` for voice-dependent outputs
  (voice-guide.md, voice-guide.html, practical-toolkit.md). If absent,
  skip fingerprint sections.
```

From brand-verifier.md (lines 42-43):
```markdown
- Phase 6: `workspace/research/voice-fingerprint.md` (optional — may be
  generated as early as Phase 1 if writing samples were provided; skip if absent)
```

For skill-bundle-packager's pre-flight check #5:
```markdown
5. Glob `workspace/research/voice-fingerprint.md` — if found, read it now
   and note the one-liner and quantitative markers for use in Tasks 1 and 2.
   If not found, note: "voice-fingerprint.md absent — proceeding without
   quantitative enrichment." Continue without stopping.
```

---

### Pattern 6: Two-Task Sequential Structure with `### Task N:` Headers

**Source:** `.claude/agents/design-kit-foundation.md` lines 30-31, 226-228

Numbered tasks with `---` dividers between them. Task 1 completes before Task 2 begins (Task 2 depends on Task 1 output):

```markdown
---

### Task 1: Token Extraction

[Task 1 instructions...]

---

### Task 2: HTML Post-Processing

[Task 2 instructions with note: "You run after the Document Assembler has
produced its client HTML files."]
```

For skill-bundle-packager:
- **Task 1: Source File Extraction** — verbatim copy of voice-guide.md Sections 3, 4, 5 (and conditional 3b, 5b) into 3 source/ files. No rewriting.
- **Task 2: Bundle Synthesis** — synthesize SKILL.md (200+ lines, 5 sections, behavioral rules) and brand-prompt.md (150-300 words, flowing prose) from source files + brand-foundation.md + STATE.md + optional voice-fingerprint.md.

Task 2 explicitly reads the source/ files created in Task 1 as one of its inputs — this is the dependency that makes sequential order mandatory.

---

### Pattern 7: Subtask File Output Spec (Format Templates Inside Tasks)

**Source:** `.claude/agents/design-kit-foundation.md` lines 44-67 (File 1 format block inside Task 1)

For each output file, provide an explicit header template and format specification inline within the task. Design-kit-foundation shows the pattern of naming each output file as a numbered subitem with a markdown code block showing the exact format:

```markdown
#### File 1: `workspace/output/design-kit/tokens/colors.css`

`:root { }` block containing all `--color-*` properties. Include both palette
colors and semantic tokens. Format:

\`\`\`css
/* Design Tokens: Colors -- extracted from visual-direction.md */
:root {
  ...
}
\`\`\`
```

For skill-bundle-packager Task 1, use this same pattern for each of the 3 source/ files:

**voice-rules.md header template** (from RESEARCH.md):
```markdown
# Voice Rules

*Extracted from voice-guide.md Sections 3 and 4.*
*Direct section copy — no rewriting.*
```

**guardrails.md header template**:
```markdown
# Guardrails

*Extracted from voice-guide.md Section 5.*
*Direct section copy — no rewriting.*
```

**language-bank.md header + structure** (merged from two sources):
```markdown
# Language Bank

*Merged from voice-guide.md (phrases to avoid) and practical-toolkit.md
(Codify/Retire classification).*
*Duplicates removed — practical-toolkit.md version retained for overlapping entries.*

## Codify (use these)
[from practical-toolkit.md]

## Retire (avoid these)
[merged, deduplicated]

## Say This / Not That
[from practical-toolkit.md, verbatim]
```

---

### Pattern 8: SKILL.md Five-Section Output Template

**Source:** RESEARCH.md Architecture Patterns — Pattern 5 and SKILL.md Five-Section Structure table; also `.claude/agents/document-assembler.md` voice-guide.md template (lines 294-402) for section numbering reference

The generated SKILL.md uses frontmatter matching the project's existing skill files. From `.claude/skills/brand-compass/phase-1-origin/SKILL.md` lines 1-5:

```markdown
---
name: phase-1-origin
description: "Phase 1: Origin & Belief"
disable-model-invocation: true
---
```

For the generated output SKILL.md, the minimum fields are `name` and `description`. The `disable-model-invocation: true` field is specific to command-invoked skill files and should NOT be copied — the output SKILL.md is a persona/voice skill, not a command skill.

The agent definition must instruct the five-section structure explicitly:

```markdown
---
name: [brand-slug]-voice
description: >
  Voice and positioning instructions for [Brand Name]. Behavioral writing
  rules for any agent producing content in this brand's voice.
---

You are writing as [Brand Name]. Everything below defines how this brand
sounds, what it says, and what it never does.

## Voice Definition

[Behavioral instructions: sentence rhythm rules, register, tone. Format:
"Write in short declarative sentences of 14-18 words on average..." NOT
rationale like "The brand chose this voice because..."]

## Signature Moves

[Named techniques with frequency and "do this when X" instructions. NOT
"The brand uses The Plain Translation technique."]

## Guardrails

[Prohibitions, word substitution table, quality check questions.
Format: "Never use fear as a motivator..." with specific examples.]

## Language Bank

[Codify list (use these), Retire list (avoid with replacements),
Say This/Not That substitutions. Lifted from source/language-bank.md.]

## Positioning Summary

[Who this brand is, who it serves, what it owns — written as context the
consuming agent holds. NOT discovery rationale or strategy backstory.]
```

**Translation Rule** (from copywriter.md Copy Mode / Translation Rule, lines 199-229): The skill-bundle-packager must convert discovery terminology to behavioral instructions. The copywriter.md's "Translation Rule" section is the closest analog for this discipline:

From copywriter.md lines 204-210:
```markdown
## The Translation Rule

Discovery material is INTERNAL context. Copy is EXTERNAL communication.
The audience was not in the room during discovery — they have zero context.

**You must translate, not transcribe.**
```

For SKILL.md: archetype names ("Sage," "Rebel") translate to behavioral output descriptions; territory labels translate to positioning-as-context-the-agent-holds; coined Brand Compass terms (Market of One, intersection) are excluded entirely.

---

### Pattern 9: brand-prompt.md Composition Instructions

No direct analog exists in the codebase for 150-300 word flowing prose persona injection. The closest structural analog is the copywriter.md boilerplate generation section (lines 82-88), which specifies format and length constraints:

```markdown
### For Boilerplates
- Generate 2 options at each length
- One sentence (what you'd say at a conference)
- One paragraph (speaker bio length)
- Three paragraphs (full about page)
```

The brand-prompt.md instructions in the agent definition should specify:
1. Word count constraint (150-300 words)
2. No headings, no bullets — flowing prose
3. Priority order for elements (voice+archetype → positioning → signature moves → one guardrail)
4. If voice-fingerprint.md present: weave one-liner and quantitative markers into sections 1 and 3
5. Anti-pattern: "This file is a persona injection, not a brief. No `#` heading characters, no `-` or `*` bullets."

---

### Pattern 10: Output Section

**Source:** `.claude/agents/design-kit-foundation.md` lines 267-283

`## Output` section listing all files the agent produces, with path in backtick, dash, description:

```markdown
## Output

- `workspace/output/design-kit/tokens/colors.css`
- `workspace/output/design-kit/tokens/typography.css`
- `workspace/output/design-kit/tokens/spacing.css`
- `workspace/output/design-kit/tokens/tokens.json`
- `workspace/output/design-kit/tokens/tailwind.config.js`
- `workspace/output/design-kit/[specimen].html` (one per client HTML file -- same filename, new location)
```

For skill-bundle-packager, list all 5 output files:
```markdown
## Output

- `workspace/output/skill-bundle/SKILL.md` — 200+ line behavioral voice skill file
- `workspace/output/skill-bundle/brand-prompt.md` — 150-300 word persona injection prose
- `workspace/output/skill-bundle/source/voice-rules.md` — Sections 3+4 from voice-guide.md
- `workspace/output/skill-bundle/source/guardrails.md` — Section 5 (+5b if present) from voice-guide.md
- `workspace/output/skill-bundle/source/language-bank.md` — merged language bank
```

---

### Pattern 11: Quality Bar Section

**Source:** `.claude/agents/design-kit-foundation.md` lines 279-284 and `.claude/agents/document-assembler.md` lines 879-887

Design-kit-foundation's quality bar is a bulleted list of specific pass/fail checks:

```markdown
## Quality Bar
- Token files contain real values extracted from visual-direction.md -- not
  placeholder examples
- DTCG `tokens.json` matches the structure already used in `color-palette.html`'s
  DTCG block (per D-03) -- same token names and hierarchy
```

Document-assembler's quality bar adds named principles (`Complete`, `Consistent`, `Traceable`, `Usable`):

```markdown
## Quality Bar
- **Complete** — don't leave sections blank if input exists
- **Consistent** — formatting and structure uniform across documents
```

For skill-bundle-packager, the quality bar should include:
- SKILL.md is 200+ lines
- No archetype names, territory labels, or Brand Compass framework terms appear in SKILL.md (translation rule enforced)
- brand-prompt.md is 150-300 words and contains no `#` or bullet characters
- source/ files contain verbatim section text from voice-guide.md — no paraphrasing
- language-bank.md has no duplicates between the Retire list and the merged voice-guide.md phrases-to-avoid entries

---

## Shared Patterns

### Agent frontmatter format
**Source:** `.claude/agents/design-kit-foundation.md` lines 1-15
**Apply to:** skill-bundle-packager.md — mandatory; the `---` YAML block, `name`, `description` with multi-line `>` scalar, embedded `**Triggers:**`, `model: sonnet`, `tools: Read, Write, Glob, Grep`

### Glob-based existence check (conditional inputs)
**Source:** `.claude/agents/document-assembler.md` line 31, `.claude/agents/brand-verifier.md` lines 42-43
**Apply to:** voice-fingerprint.md check in pre-flight — Glob returns empty list for missing file; that IS the existence check; no custom error logic needed

### Translation Rule (discovery language → stranger-agent behavioral instructions)
**Source:** `.claude/agents/copywriter.md` lines 199-235 (The Translation Rule + The Room-to-Breathe Check)
**Apply to:** Task 2 SKILL.md synthesis — the packager agent must perform the same translate-not-transcribe discipline as the copywriter does for public copy. Embed explicit worked examples of archetype translation in the agent definition to prevent discovery language leakage.

From copywriter.md lines 199-210 — use this section as the template for the SKILL.md translation instructions:
```markdown
## The Translation Rule

Discovery material is INTERNAL context. Copy is EXTERNAL communication.
The audience was not in the room during discovery — they have zero context.

**You must translate, not transcribe.**

- Discovery gives you raw material: metaphors, origin stories, coined terms,
  internal language
- Your job is to extract the MEANING and express it in language a stranger
  understands on first read
```

Adapt for SKILL.md: "Discovery material is internal Brand Compass context. SKILL.md is consumed by an agent that has never seen discovery. You must translate, not transcribe. Do not copy archetype names, territory labels, or Brand Compass framework terms into SKILL.md sections. For each archetype, read the voice data and translate: not 'You are a Sage' but 'You communicate as a teaching authority — share knowledge openly, explain reasoning, and never assert credentials without demonstrating them.'"

---

## Source File Section Reference

The document-assembler.md voice-guide.md template (lines 294-402) defines the exact section numbering that the packager agent reads from. Key mapping for agent instructions:

| Extraction Target | voice-guide.md Section Header | Content |
|-------------------|-------------------------------|---------|
| voice-rules.md | `## Section 3: Writing Style` | Sentence rhythm, structure usage, authenticity spectrum |
| voice-rules.md | `## Section 3b: Quantitative Voice Markers` | Conditional — include if present |
| voice-rules.md | `## Section 4: Signature Moves` | Named techniques with frequency and examples |
| guardrails.md | `## Section 5: Guardrails` | Never Do This, Words and Phrases to Avoid, Quality Check |
| guardrails.md | `## Section 5b: Voice Calibration Table` | Conditional — include if present |
| language-bank.md (source 1) | `## Section 5: Guardrails` > Words and Phrases to Avoid table | Three-column avoid/why/say-instead |
| language-bank.md (source 2) | `practical-toolkit.md` > `## Language Bank` | Codify/Retire lists + Say This/Not That table |

The reference example at `workspace/reference/example-brand/output/voice-guide.md` shows Section 3 (lines 29-54), Section 4 (lines 57-83), and Section 5 (lines 85-113). The reference practical-toolkit.md shows the Language Bank at lines 85-114 with "Phrases We Use / Phrases We Never Use" structure — note this is the older format. The new Codify/Retire format (from D-09) is defined in RESEARCH.md; the agent definition must instruct the packager to handle both formats gracefully and merge correctly.

---

## No Analog Found

No files are without analog. The single deliverable (`.claude/agents/skill-bundle-packager.md`) has a clear exact-match analog in `.claude/agents/design-kit-foundation.md`.

---

## Metadata

**Analog search scope:** `.claude/agents/` (15 agent definitions), `.claude/skills/brand-compass/phase-1-origin/SKILL.md` (skill frontmatter reference), `workspace/reference/example-brand/output/` (voice-guide.md and practical-toolkit.md source structures)
**Files scanned:** 7 files read directly; 15 agent definitions inventoried
**Pattern extraction date:** 2026-04-20
