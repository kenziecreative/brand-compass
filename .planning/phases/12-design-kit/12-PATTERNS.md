# Phase 12: Design Kit - Pattern Map

**Mapped:** 2026-04-20
**Files analyzed:** 1 new file to create
**Analogs found:** 1 / 1

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `.claude/agents/design-kit-packager.md` | agent definition | file I/O + transform (read tokens + Component Personality + brand copy → write components, previews, root files, landing page) | `.claude/agents/skill-bundle-packager.md` | exact (same model, tools, multi-task sequential structure, pre-flight check pattern) |

---

## Pattern Assignments

### `.claude/agents/design-kit-packager.md` (agent definition, file I/O + transform)

**Primary structural analog:** `.claude/agents/skill-bundle-packager.md`
**Depth analog:** `.claude/agents/document-assembler.md` (200+ lines, specificity of instruction, quality bar with named checks)
**Pre-flight pattern analog:** `.claude/agents/skill-bundle-packager.md` lines 30-39 (numbered Glob existence checks, stop vs. continue branching)
**HTML output quality analog:** `.claude/skills/specimen-design/SKILL.md` (applies to component HTML files and landing-page.html)

---

### Pattern 1: YAML Frontmatter Block

**Source:** `.claude/agents/skill-bundle-packager.md` lines 1-17 (which itself copied from `.claude/agents/design-kit-foundation.md` lines 1-15)

Copy this structure exactly — `name`, `description` (multi-line with `>` scalar and `**Triggers:**` embedded inside the description block), `model`, `tools`:

```markdown
---
name: design-kit-packager
description: >
  Reads design-kit-foundation outputs (tokens, post-processed specimens) and
  visual-direction.md Component Personality section, then produces atomized
  component HTML files, preview cards, root documentation files, and a new
  landing-page.html specimen at workspace/output/design-kit/. Runs after
  design-kit-foundation completes.

  **Triggers:**
  - design-kit-foundation agent has completed (tokens and post-processed specimens exist)
  - Lead strategist requests design kit packaging

model: sonnet
tools: Read, Write, Glob, Grep
---
```

All existing file-processing agents use `model: sonnet` (document-assembler, design-kit-foundation, skill-bundle-packager, brand-verifier). Tool set `Read, Write, Glob, Grep` is the standard for agents that read/write files and do text processing without shell commands.

---

### Pattern 2: Opening Identity Statement

**Source:** `.claude/agents/skill-bundle-packager.md` line 19

Single sentence block immediately after frontmatter (no blank line between frontmatter closing `---` and this block). Names the agent, its core function, and its dependency:

From skill-bundle-packager.md line 19:
```markdown
You are the Skill Bundle Packager agent. You read completed brand engagement
outputs and produce a complete, usable skill bundle at
`workspace/output/skill-bundle/`. You run after Phase 8 assembly is complete
and all client outputs exist in `workspace/output/client/`. Your work has two
sequential parts: first, you extract source material verbatim from the client
package into three reference files; then, you synthesize that material into
SKILL.md (behavioral voice instructions) and brand-prompt.md (persona injection
prose). Task 2 depends on the source files created in Task 1 — always complete
Task 1 in full before beginning Task 2.
```

For design-kit-packager, write analogously:
```markdown
You are the Design Kit Packager agent. You read completed design-kit-foundation
outputs (tokens at workspace/output/design-kit/tokens/ and post-processed
specimens at workspace/output/design-kit/) and visual-direction.md Component
Personality section, then produce the remaining design kit artifacts: atomized
component HTML files, preview cards, root documentation files, and a new
landing-page.html specimen. You run after design-kit-foundation has completed.
Your work has four sequential tasks: pre-flight checks, then components, then
previews and root files, then landing page. Each task must complete before the
next begins.
```

---

### Pattern 3: Input Section

**Source:** `.claude/agents/skill-bundle-packager.md` lines 21-27

Bulleted list under `## Input` with file path in backtick, dash, description after the dash, and `(required)` / `(optional)` qualifiers:

```markdown
## Input

- `workspace/output/client/voice-guide.md` — primary source for voice definition,
  signature moves, guardrails, writing style, and calibration table (required)
- `workspace/output/client/brand-foundation.md` — positioning statement, archetype,
  core belief, and personality traits (required)
- `workspace/STATE.md` — brand name and entity type (required)
```

For design-kit-packager, list all 6 inputs in order of required-first, conditional-last:
```markdown
## Input

- `workspace/output/design-kit/tokens/colors.css` — token values consumed by
  components and previews via <link> tags; not re-parsed for values (required)
- `workspace/output/design-kit/tokens/typography.css` — same (required)
- `workspace/output/design-kit/tokens/spacing.css` — same (required)
- `workspace/drafts/visual-direction.md` — read ONLY for Section 8 Component
  Personality; do not read for token values (required)
- `workspace/output/client/brand-foundation.md` — tagline, core narrative,
  proof points for landing-page.html (required)
- `workspace/STATE.md` — entity type for landing page template conditional (required)
- `workspace/assets/mark-explorations/` — optional; Glob for any mark asset
  to embed in brand-groups.html preview; skip gracefully if absent
```

---

### Pattern 4: Before Starting / Pre-Flight Checks

**Source:** `.claude/agents/skill-bundle-packager.md` lines 29-39

Numbered Glob-based existence checks per required file. Required files: stop with specific error message. Optional files: note and continue. After all checks pass: read the inputs that will be used throughout tasks.

From skill-bundle-packager.md lines 29-39:
```markdown
## Before Starting

Check that all required input files exist before doing any work:

1. Glob `workspace/output/client/voice-guide.md` — if not found, stop and
   report: "voice-guide.md not found at workspace/output/client/. Phase 8
   assembly must complete before running skill-bundle-packager."
2. Glob `workspace/output/client/brand-foundation.md` — if not found, stop
   and report: "brand-foundation.md not found at workspace/output/client/.
   Phase 8 assembly must complete before running skill-bundle-packager."
...
5. Glob `workspace/research/voice-fingerprint.md` — if found, read it now
   and note the voice profile one-liner and quantitative markers. If not
   found, note: "voice-fingerprint.md absent — proceeding without
   quantitative enrichment." Continue without stopping.

After all checks pass: Read all required input files now.
```

For design-kit-packager, apply the same pattern with six required checks and one conditional:

```markdown
## Before Starting

Check that all required input files exist before doing any work:

1. Glob `workspace/output/design-kit/tokens/colors.css` — if not found, stop
   and report: "design-kit-foundation has not run. tokens/colors.css not found.
   Run design-kit-foundation before design-kit-packager."
2. Glob `workspace/output/design-kit/tokens/typography.css` — if not found,
   stop and report same pattern.
3. Glob `workspace/output/design-kit/tokens/spacing.css` — if not found,
   stop and report same pattern.
4. Glob `workspace/drafts/visual-direction.md` — if not found, stop and
   report: "visual-direction.md not found. Component Personality cannot be
   read without this file."
5. Glob `workspace/output/client/brand-foundation.md` — if not found, stop
   and report: "brand-foundation.md not found. Landing page requires real
   brand copy."
6. Glob `workspace/STATE.md` — if not found, stop and report: "STATE.md not
   found. Entity type required for landing page conditional."
7. Glob `workspace/assets/mark-explorations/` — if found, note the path of
   the first mark asset for use in brand-groups.html. If not found, note:
   "No mark asset found — brand-groups.html will use text-based lockup."
   Continue without stopping.

After all checks pass: Read visual-direction.md Section 8 (Component
Personality) only. Read brand-foundation.md Section 4 (Messaging Architecture)
for tagline, boilerplate, and proof points. Read STATE.md Client section for
entity type. Do NOT read visual-direction.md for token values — those are
already in tokens/*.css files.
```

---

### Pattern 5: STATE.md Entity Type Field

**Source verified:** `workspace/STATE-template.md` lines 4-5 and `workspace/reference/example-brand/STATE.md` lines 4-5

The entity type is stored as the `**Type:**` bullet under `## Client`, NOT as a field called `entity_type`. This resolves RESEARCH.md Assumption A2.

From STATE-template.md lines 3-5:
```markdown
## Client
- **Name:** [Client Name]
- **Type:** [Industry/Business Type]
```

From example-brand/STATE.md lines 4-5:
```markdown
- **Type:** Accounting & Compliance Services
```

The agent definition's entity-type conditional must read the `**Type:**` field from the `## Client` section. Classification logic:

```markdown
Read the `**Type:**` field from `workspace/STATE.md` Client section.

- If the value contains or matches: "individual", "artist", "creator", "solo",
  "freelance", "photographer", "musician", "writer", "coach" (sole practitioner
  keywords) → use Individual template (bio-led hero, single CTA, personal story
  flow).
- If the value contains or matches: "agency", "studio", "firm", "company",
  "services", "organization", "business", "nonprofit", "startup", "brand"
  (organizational keywords) → use Org template (product-led hero, feature grid,
  dual CTA).
- If absent, unclear, or doesn't match either set → default to Org template.
```

Note: RESEARCH.md used `entity_type` as the assumed field name — that assumption is INCORRECT. The correct field is `**Type:**`. The agent definition must instruct reading `**Type:**`, not `entity_type`.

---

### Pattern 6: Multi-Task Sequential Structure

**Source:** `.claude/agents/skill-bundle-packager.md` lines 44-45 and `.claude/agents/design-kit-foundation.md` lines 30-31

Numbered tasks with `### Task N:` headers, `---` dividers between tasks. Each task is dependent on the prior task's completion. The opening identity statement makes the sequential dependency explicit.

From design-kit-foundation.md lines 30-31:
```markdown
---

### Task 1: Token Extraction
```

From skill-bundle-packager.md lines 44-45:
```markdown
---

### Task 1: Source File Extraction
```

For design-kit-packager, use four tasks:

```markdown
---

### Task 1: Pre-Flight (same as "Before Starting" — executed as Task 0 before
             any write operations)

---

### Task 2: Atomized Components

[Write 7 component HTML files to workspace/output/design-kit/components/]

---

### Task 3: Preview Cards and Root Files

[Write 5 preview HTML files to workspace/output/design-kit/previews/]
[Write README.md, package.json, HANDOFF.md to workspace/output/design-kit/]

---

### Task 4: Landing Page

[Write landing-page.html to workspace/output/design-kit/ using entity-type
conditional]
```

---

### Pattern 7: Component HTML File Structure

**Source:** RESEARCH.md Code Examples (lines 500-587) + `.claude/agents/design-kit-foundation.md` Task 2 HTML pattern (lines 226-264)

The component HTML structure (from RESEARCH.md) is the canonical template. Key structural elements:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Brand Name] — [Component Name] Component</title>
  <!-- Google Fonts link if needed -->
  <!-- Design Kit Token Files (TWO levels up because components/ is a subdir) -->
  <link rel="stylesheet" href="../../tokens/colors.css">
  <link rel="stylesheet" href="../../tokens/typography.css">
  <link rel="stylesheet" href="../../tokens/spacing.css">
  <style>
    /* Component: [Name]
     * Tokens: all var() references below come from linked token files
     * Brand Personality: [description] — from visual-direction.md §8
     */
    .component-class {
      property: var(--token-name);   /* [TOKEN: --token-name] */
      property: hardcoded-value;     /* [BRAND PERSONALITY: reason] */
    }
  </style>
</head>
<body>
  <!-- Rendered component example(s) -->
  <!-- Usage note section -->
</body>
</html>
```

Critical: the relative path for `<link>` tags in `components/` subdirectory is `../../tokens/` (two levels up), NOT `../tokens/` which is the root-level pattern. The agent definition must explicitly state both:
- `components/` and `previews/` files: `href="../../tokens/[file].css"`
- `landing-page.html` at design-kit root: `href="../tokens/[file].css"`

The comment annotation pattern (`/* [TOKEN: --var-name] */` vs `/* [BRAND PERSONALITY: reason] */`) is per D-02 and must be stated explicitly in the agent task instructions.

No `:root {}` blocks allowed in component or preview HTML files. All custom property values must come from the linked external token files.

---

### Pattern 8: Subtask Output File Specs

**Source:** `.claude/agents/design-kit-foundation.md` lines 44-67 (File 1 through File 5 format blocks inside Task 1)

For each group of output files within a task, provide an explicit numbered subitem with the full path, content description, and where applicable a code block showing the format:

From design-kit-foundation.md lines 44-50:
```markdown
#### File 1: `workspace/output/design-kit/tokens/colors.css`

`:root { }` block containing all `--color-*` properties. Include both palette
colors and semantic tokens. Format:

\`\`\`css
/* Design Tokens: Colors -- extracted from visual-direction.md */
:root { ... }
\`\`\`
```

For design-kit-packager Task 2, list all 7 components as numbered File entries:
- `#### File 1: workspace/output/design-kit/components/button.html`
- `#### File 2: workspace/output/design-kit/components/card.html`
- `#### File 3: workspace/output/design-kit/components/form-field.html`
- `#### File 4: workspace/output/design-kit/components/nav.html`
- `#### File 5: workspace/output/design-kit/components/modal.html`
- `#### File 6: workspace/output/design-kit/components/alert.html`
- `#### File 7: workspace/output/design-kit/components/badge.html`

For each component entry, specify: (1) which Component Personality property to read from visual-direction.md §8, (2) what brand-specific behavior to implement, (3) the CSS annotation requirement.

For Task 3, list 5 preview files + 3 root files:
- `#### File 1: workspace/output/design-kit/previews/colors.html`
- `#### File 2: workspace/output/design-kit/previews/type.html`
- `#### File 3: workspace/output/design-kit/previews/spacing.html`
- `#### File 4: workspace/output/design-kit/previews/components.html`
- `#### File 5: workspace/output/design-kit/previews/brand-groups.html`
- `#### File 6: workspace/output/design-kit/README.md`
- `#### File 7: workspace/output/design-kit/package.json`
- `#### File 8: workspace/output/design-kit/HANDOFF.md`

---

### Pattern 9: Preview Card HTML Structure

**Source:** RESEARCH.md Code Examples (lines 589-654) + D-04, D-05, D-06

Preview card CSS constraints (from RESEARCH.md Pattern 5):

```css
.preview-card {
  min-width: 150px;
  max-width: 400px;
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.token-layer {
  border-top: 1px solid var(--color-border);
  padding: var(--space-sm) var(--space-md);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  overflow: hidden;   /* D-05: floor behavior — clips, does not remove content */
}

.token-chip {
  white-space: nowrap;
  min-width: 0;
}
```

The agent definition must state D-05 explicitly: use `overflow: hidden` on the token layer and `min-width: 150px` on the card container to handle narrow widths — do NOT remove token labels from the DOM.

brand-groups.html mark handling: Glob `workspace/assets/mark-explorations/` for any mark file. If found, embed the first one. If absent, use text-based brand lockup (brand name in `var(--font-display)` + tagline).

---

### Pattern 10: package.json Slug Convention

**Source:** `.claude/agents/skill-bundle-packager.md` lines 156-159

Brand slug = brand name from STATE.md lowercased, spaces replaced with hyphens. From skill-bundle-packager.md:
```markdown
Where `[brand-slug]` is the brand name from `workspace/STATE.md` lowercased with
spaces replaced by hyphens (example: "Baseline Accounting" → "baseline-accounting")
```

For package.json:
```json
{
  "name": "[brand-slug]-design-kit",
  "version": "1.0.0",
  "description": "Design tokens and component library for [Brand Name]",
  "private": true,
  "brand": {
    "name": "[Brand Name]",
    "generated": "[ISO date]"
  }
}
```

---

### Pattern 11: Landing Page Entity-Type Conditional

**Source:** RESEARCH.md Pattern 7 (lines 394-427) + verified field name from STATE-template.md

The agent definition must contain explicit if/else blocks for template selection, reading the `**Type:**` field (not `entity_type` — see Pattern 5 above). From RESEARCH.md Code Examples (lines 658-688), the template block structure:

```markdown
### Landing Page Entity-Type Conditional

Read `**Type:**` from `workspace/STATE.md` Client section.

**If individual / artist / creator / solo / freelance → Individual Template:**

Hero: `<h1>` = tagline; subhead = one-sentence boilerplate; single CTA.
Content: core narrative as flowing prose; proof points as personal statements;
connect/contact section.

**If org / business / agency / studio / firm / services → Org Template:**

Hero: `<h1>` = tagline; subhead = one-sentence boilerplate; feature grid
(3-4 proof points as cards); dual CTA (primary + secondary "learn more").
Content: core narrative as brand narrative; about/mission section.

**If absent or ambiguous:** use Org template.
```

Copy sourcing from brand-foundation.md (exact section paths required in agent definition per RESEARCH.md Pitfall 4):
- Hero headline → Section 4: Messaging Architecture > Tagline
- Subheadline → Section 4 > Boilerplate Descriptions > one-sentence variant
- Body/story → Section 4 > Core Narrative
- Feature grid/proof points → Section 4 > Proof Points

Landing-page.html token link pattern (root level, one level up from tokens/):
```html
<link rel="stylesheet" href="../tokens/colors.css">
<link rel="stylesheet" href="../tokens/typography.css">
<link rel="stylesheet" href="../tokens/spacing.css">
```

---

### Pattern 12: Output Section

**Source:** `.claude/agents/design-kit-foundation.md` lines 267-275 and `.claude/agents/skill-bundle-packager.md` lines 275-283

`## Output` section listing all files the agent produces, each on its own line with path and dash description:

From design-kit-foundation.md lines 267-275:
```markdown
## Output

- `workspace/output/design-kit/tokens/colors.css`
- `workspace/output/design-kit/tokens/typography.css`
...
```

For design-kit-packager, list all 16 output files grouped by subdirectory:
```markdown
## Output

**Components (7 files):**
- `workspace/output/design-kit/components/button.html`
- `workspace/output/design-kit/components/card.html`
- `workspace/output/design-kit/components/form-field.html`
- `workspace/output/design-kit/components/nav.html`
- `workspace/output/design-kit/components/modal.html`
- `workspace/output/design-kit/components/alert.html`
- `workspace/output/design-kit/components/badge.html`

**Preview Cards (5 files):**
- `workspace/output/design-kit/previews/colors.html`
- `workspace/output/design-kit/previews/type.html`
- `workspace/output/design-kit/previews/spacing.html`
- `workspace/output/design-kit/previews/components.html`
- `workspace/output/design-kit/previews/brand-groups.html`

**Root files (4 files):**
- `workspace/output/design-kit/README.md`
- `workspace/output/design-kit/package.json`
- `workspace/output/design-kit/HANDOFF.md`
- `workspace/output/design-kit/landing-page.html`
```

Add an explicit "DO NOT write" note: the agent must not write to `workspace/output/design-kit/*.html` at the root level for brand-foundation.html or color-palette.html — those are owned by design-kit-foundation and must not be overwritten.

---

### Pattern 13: Quality Bar Section

**Source:** `.claude/agents/design-kit-foundation.md` lines 279-284 and `.claude/agents/skill-bundle-packager.md` lines 285-295

Design-kit-foundation uses bulleted specific pass/fail checks. Skill-bundle-packager uses `**Name:** — description` named checks. Use the named-check pattern (more specific):

From skill-bundle-packager.md lines 285-295:
```markdown
## Quality Bar
- **SKILL.md is 200+ lines** — if under 200, sections are too thin; expand behavioral
  examples and worked examples per section
- **SKILL.md has exactly five `## ` section headers:** Voice Definition, Signature Moves,
  Guardrails, Language Bank, Positioning Summary — no more, no fewer
```

For design-kit-packager, quality bar should include:
- All 7 component HTML files exist and contain no `:root {}` declarations
- All component `<link>` tags use `../../tokens/` (not `../tokens/`)
- All 5 preview cards render at 150px without horizontal scroll (overflow: hidden on token-layer)
- landing-page.html contains no `[bracket]` placeholder text and no lorem ipsum
- landing-page.html `<link>` tags use `../tokens/` (one level up, not two)
- `package.json` parses as valid JSON
- README.md is written in brand voice — no generic technical opener
- brand-foundation.html and color-palette.html at design-kit root are NOT overwritten
- All var() references in components resolve to token file values, not inline declarations

---

## Shared Patterns

### Agent Definition Frontmatter
**Source:** `.claude/agents/design-kit-foundation.md` lines 1-15
**Apply to:** `design-kit-packager.md` (mandatory)
```markdown
---
name: [agent-name]
description: >
  [multi-line description]

  **Triggers:**
  - [trigger 1]
  - [trigger 2]

model: sonnet
tools: Read, Write, Glob, Grep
---
```

### Pre-Flight Glob Check Pattern (required vs. optional branching)
**Source:** `.claude/agents/skill-bundle-packager.md` lines 29-39
**Apply to:** design-kit-packager.md Before Starting section — 6 required (stop-on-missing) + 1 optional (continue-on-missing)
```markdown
N. Glob `[path]` — if not found, stop and report: "[specific message]."
N. Glob `[optional-path]` — if found, [action]. If not found, note: "[message]." Continue without stopping.
```

### Conditional Input Reading After Pre-Flight
**Source:** `.claude/agents/skill-bundle-packager.md` line 40
**Apply to:** design-kit-packager.md — after pre-flight checks pass, read the active inputs immediately before starting Task 2:
```markdown
After all checks pass: Read visual-direction.md §8 Component Personality,
brand-foundation.md Section 4, and STATE.md Client section. Do not read
visual-direction.md for token values.
```

### Token Link Relative Paths (two-level vs. one-level)
**Source:** RESEARCH.md Pattern 3 (lines 247-265) — CRITICAL distinction
**Apply to:** Every HTML file write instruction in design-kit-packager.md
- Files in `components/` or `previews/` subdirectories: `href="../../tokens/[file].css"`
- Files at `design-kit/` root (landing-page.html): `href="../tokens/[file].css"`
The agent definition must state this path difference explicitly in the task instructions for each file group. Getting this wrong causes silent rendering failure (all var() calls resolve to empty strings in browser).

### CSS Comment Annotation for Component Files
**Source:** RESEARCH.md Pattern 4 (lines 271-288) + D-02
**Apply to:** All 7 component HTML files generated by Task 2
```css
property: var(--token-name);   /* [TOKEN: --token-name] */
property: hardcoded-value;     /* [BRAND PERSONALITY: reason from visual-direction.md §8] */
```
The agent definition must instruct inclusion of this annotation on every CSS declaration in component `<style>` blocks.

### Anti-Token-Extraction Constraint (D-12)
**Source:** RESEARCH.md Anti-Patterns (lines 430-436) + CONTEXT.md D-12
**Apply to:** The Before Starting section and any component task instructions
The agent definition must explicitly prohibit reading visual-direction.md for CSS Custom Properties Block values. State: "Read visual-direction.md only for §8 Component Personality. Token values come from tokens/*.css files already extracted by design-kit-foundation. Any `:root {}` block in component output is a defect."

---

## STATE.md Field Name Correction

**RESEARCH.md Assumption A2 resolved:** RESEARCH.md assumed the STATE.md field name was `entity_type`. Verification against `workspace/STATE-template.md` lines 4-5 and `workspace/reference/example-brand/STATE.md` line 4 confirms:

- **Correct field:** `**Type:**` bullet under `## Client` section
- **Example value:** `Accounting & Compliance Services` (organizational) or equivalent
- **Incorrect assumption:** `entity_type` — this field does not exist in STATE.md

The agent definition must instruct reading the `**Type:**` field, not `entity_type`. The classification heuristic should match organizational keywords (services, firm, agency, studio, company, startup, organization, brand, nonprofit) vs. individual keywords (individual, artist, creator, solo, freelance, photographer, musician, writer, coach, consultant as sole practitioner).

---

## No Analog Found

All files have analog matches. No entries in this table.

---

## Metadata

**Analog search scope:** `.claude/agents/` (all 15 agent definitions), `.claude/skills/specimen-design/SKILL.md`, `.planning/phases/10-output-foundation/10-PATTERNS.md`, `.planning/phases/11-agent-skill-bundle/11-PATTERNS.md`, `workspace/STATE-template.md`, `workspace/reference/example-brand/STATE.md`, `workspace/reference/example-brand/drafts/visual-direction.md`
**Files scanned:** 9 files read directly
**STATE.md field verification:** Completed — `**Type:**` confirmed as the entity type field; `entity_type` assumption in RESEARCH.md is incorrect
**Pattern extraction date:** 2026-04-20
