# Phase 12: Design Kit - Research

**Researched:** 2026-04-20
**Domain:** Claude agent definition authoring — HTML/CSS design kit artifact generation
**Confidence:** HIGH

## Summary

Phase 12 creates a single new file: `.claude/agents/design-kit-packager.md`. This agent reads from design-kit-foundation outputs (tokens + post-processed specimens from Phase 10) and visual-direction.md Component Personality section, then produces seven output groups: atomized component HTML files, preview card HTML files, root files (README.md, package.json, HANDOFF.md), and a new landing-page.html specimen.

The pattern is now well-established by Phases 10 and 11. The Phase 10 `design-kit-foundation.md` agent and the Phase 11 `skill-bundle-packager.md` agent are near-exact structural analogs. The agent definition format, task organization, preflight checks, input declaration, output listing, and quality bar all follow verified patterns already in the codebase.

The primary research payload for this phase is the **content specification** of each output artifact — what each atomized component, preview card, and root file must contain, and how the landing-page conditional branching works. The structure of the agent definition file itself can be derived directly from the Phase 11 analog.

**Primary recommendation:** Write `design-kit-packager.md` as a single-file agent with four sequential tasks (pre-flight, components, previews + root files, landing page). Use `design-kit-foundation.md` and `skill-bundle-packager.md` as structural templates. The content for each task is fully specified by CONTEXT.md decisions and the patterns documented below.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-01:** Atomized components (button, card, form-field, nav, modal, alert, badge) are fully branded — they implement token values AND brand-specific behaviors from the Component Personality section (Section 8) of `visual-direction.md` (button fills, badge radius, hover states, accent borders).

**D-02:** Each component HTML file includes a comment block marking which values come from token variables (`var(--color-*)`) vs. which come from Component Personality decisions, so a designer knows exactly what is brand-driven vs. structural.

**D-03:** Components link to external token files via `<link>` tags (same `../tokens/` pattern as design-kit specimens from Phase 10).

**D-04:** Preview cards use the mini reference card pattern — visual preview zone (swatches, type specimen, spacing scale, component demos, brand lockup) plus a token value layer (2-3 key values as small monospace text below the visual).

**D-05:** Cards are designed for a 280-400px sweet spot rendering width. The 150px floor is handled with `min-width: 150px` and `overflow: hidden` on label rows — not by removing content.

**D-06:** Five preview cards: colors, type, spacing, components, and brand groups. Each is a standalone HTML file linking external tokens.

**D-07:** The landing page uses real brand copy from Phase outputs — tagline, core narrative boilerplate, and proof points from `brand-foundation.md`. No placeholder text or lorem ipsum.

**D-08:** Entity-type conditional keyed off `STATE.md` entity type:
- Individual: bio-led hero section, single CTA, personal story flow
- Org: product-led hero section, feature grid, dual CTA

**D-09:** landing-page.html links to external tokens (same pattern as other design-kit specimens).

**D-10:** Phase 8 calls design-kit-foundation and design-kit-packager as separate sequential agents — foundation first (tokens + post-processed specimens), then packager (components, preview cards, root files, landing page).

**D-11:** Design-kit-packager is a standalone agent definition at `.claude/agents/design-kit-packager.md` following the same sonnet/Read/Write/Glob/Grep pattern as skill-bundle-packager and design-kit-foundation.

**D-12:** Design-kit-packager reads design-kit-foundation outputs (tokens, post-processed specimens) as inputs — it does NOT re-read `visual-direction.md` for token values. It reads `visual-direction.md` only for the Component Personality section.

### Claude's Discretion

- Internal organization of the agent definition file (section ordering, task breakdown)
- Specific HTML/CSS structure of each atomized component (as long as Component Personality decisions are applied)
- Preview card CSS layout details (grid, flexbox, spacing within the constraint)
- README.md and HANDOFF.md content organization and structure
- package.json field values beyond name and description
- How the entity-type conditional is structured in the agent definition (if/else blocks, separate template sections, etc.)

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| DKIT-01 | design-kit-packager agent created (sonnet, Read/Write/Glob/Grep) | Agent frontmatter pattern from design-kit-foundation.md; structural analog is skill-bundle-packager.md |
| DKIT-02 | Atomized components (button, card, form-field, nav, modal, alert, badge) as standalone HTML linking to external tokens | Component structure patterns; token link pattern from Phase 10; Component Personality source in visual-direction.md §8 |
| DKIT-03 | Preview cards (colors, type, spacing, components, brand groups) rendering at 150-500px | Mini reference card pattern; CSS width constraint technique documented below |
| DKIT-04 | Design kit root files (README.md in brand voice, package.json, HANDOFF.md) | Root file content specification below; brand voice source from brand-foundation.md |
| DKIT-05 | Reference specimens (brand-foundation.html copy, color-palette.html copy, new landing-page.html) | Design-kit-foundation already produces the HTML copies; packager only creates landing-page.html; entity-type conditional pattern documented below |
</phase_requirements>

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Agent definition authoring | File system (agent .md file) | — | The entire phase output is a single agent definition file |
| Token consumption | Design Kit HTML (link tags) | — | Components and previews read tokens from `../tokens/`; packager does not re-extract them |
| Component HTML generation | Agent task (runtime) | — | Packager writes component files when invoked; static until then |
| Brand copy sourcing for landing page | Brand outputs (`brand-foundation.md`) | `STATE.md` (entity type) | Copy comes from Phase 5/8 outputs; entity type controls template path |
| Visual direction (Component Personality) | `visual-direction.md` §8 | — | Packager reads only this section of visual-direction.md per D-12 |

---

## Standard Stack

### Core
| Library/Tool | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Claude agent definition format | YAML frontmatter + markdown body | Agent behavioral instructions | Established pattern across all 15 existing agents in `.claude/agents/` [VERIFIED: codebase grep] |
| HTML + CSS (no JS) | HTML5 / CSS3 | Atomized components and preview cards | Matches specimen-design SKILL.md constraint: "Pre-render what you can. Save JavaScript for genuinely interactive features" [VERIFIED: .claude/skills/specimen-design/SKILL.md] |
| CSS Custom Properties | CSS3 | Token consumption via `var()` | Design-kit-foundation establishes the token variable pattern; components consume via `link` + `var()` [VERIFIED: design-kit-foundation.md] |

### Supporting
| Pattern | Purpose | When to Use |
|---------|---------|-------------|
| `<link rel="stylesheet" href="../tokens/{file}.css">` | External token loading | Every design-kit HTML file; path is relative from `design-kit/` to `design-kit/tokens/` |
| `/* [TOKEN] */` vs `/* [BRAND PERSONALITY] */` comment blocks | Annotate CSS source | Inside each component's `<style>` block per D-02 |
| `min-width: 150px; overflow: hidden` | Responsive floor for preview cards | On label rows within preview cards per D-05 |
| Entity-type conditional in agent definition | Conditional template branching | Landing page hero/CTA structure per D-08 |

**No installation needed.** This phase is agent definition authoring only — no npm packages, no build steps, no dependencies beyond the existing project files.

---

## Architecture Patterns

### System Architecture Diagram

```
visual-direction.md §8 (Component Personality)
        │
        ▼
[design-kit-packager agent]
        │
        ├─── reads ──► workspace/output/design-kit/tokens/*.css   (from Phase 10)
        │              workspace/output/design-kit/*.html           (from Phase 10)
        │              workspace/output/client/brand-foundation.md  (for landing page copy)
        │              workspace/STATE.md                           (entity type)
        │
        ├─── writes ─► workspace/output/design-kit/components/
        │                   button.html
        │                   card.html
        │                   form-field.html
        │                   nav.html
        │                   modal.html
        │                   alert.html
        │                   badge.html
        │
        ├─── writes ─► workspace/output/design-kit/previews/
        │                   colors.html
        │                   type.html
        │                   spacing.html
        │                   components.html
        │                   brand-groups.html
        │
        ├─── writes ─► workspace/output/design-kit/
        │                   README.md
        │                   package.json
        │                   HANDOFF.md
        │                   landing-page.html
        │
        └─── NOTE: brand-foundation.html and color-palette.html
                   already exist at workspace/output/design-kit/
                   (written by Phase 10 design-kit-foundation agent)
                   Packager does NOT re-write these — DKIT-05 success
                   criterion references the Phase 10 copies.
```

### Recommended Project Structure (Phase 12 outputs)

```
workspace/output/design-kit/
├── tokens/               # From Phase 10 (not touched by packager)
│   ├── colors.css
│   ├── typography.css
│   ├── spacing.css
│   ├── tokens.json
│   └── tailwind.config.js
├── *.html                # Post-processed specimens from Phase 10
│   ├── brand-foundation.html
│   ├── color-palette.html
│   └── [other client specimens]
├── components/           # NEW — Phase 12
│   ├── button.html
│   ├── card.html
│   ├── form-field.html
│   ├── nav.html
│   ├── modal.html
│   ├── alert.html
│   └── badge.html
├── previews/             # NEW — Phase 12
│   ├── colors.html
│   ├── type.html
│   ├── spacing.html
│   ├── components.html
│   └── brand-groups.html
├── README.md             # NEW — Phase 12
├── package.json          # NEW — Phase 12
├── HANDOFF.md            # NEW — Phase 12
└── landing-page.html     # NEW — Phase 12
```

---

## Architecture Patterns

### Pattern 1: Agent Definition File Structure

**What:** Single `.md` file at `.claude/agents/design-kit-packager.md` with YAML frontmatter and sequential task body. Follows design-kit-foundation.md / skill-bundle-packager.md structure exactly.

**Source:** `.claude/agents/design-kit-foundation.md` lines 1-15 + `.claude/agents/skill-bundle-packager.md` [VERIFIED: codebase read]

**Frontmatter template:**
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

**Opening identity statement** (immediately after frontmatter):
```
You are the Design Kit Packager agent. You read completed design-kit-foundation
outputs and visual-direction.md Component Personality, then produce the remaining
design kit artifacts: atomized components, preview cards, root documentation, and
a landing page. You run after design-kit-foundation has completed.
```

### Pattern 2: Pre-Flight Checks

**What:** Numbered Glob-based existence checks for required inputs. Stop on missing required file. Skip gracefully on optional/conditional inputs.

**Source:** `skill-bundle-packager.md` Before Starting section [VERIFIED: codebase read]

**Required inputs to check:**
1. `workspace/output/design-kit/tokens/colors.css` — if not found, stop and report: "design-kit-foundation has not run. tokens/colors.css not found. Run design-kit-foundation before design-kit-packager."
2. `workspace/output/design-kit/tokens/typography.css` — same stop message pattern
3. `workspace/output/design-kit/tokens/spacing.css` — same
4. `workspace/drafts/visual-direction.md` — if not found, stop and report: "visual-direction.md not found. Component Personality cannot be read without this file."
5. `workspace/output/client/brand-foundation.md` — if not found, stop and report: "brand-foundation.md not found. Landing page requires real brand copy."
6. `workspace/STATE.md` — if not found, stop and report: "STATE.md not found. Entity type required for landing page conditional."

**After checks pass:** Read visual-direction.md §8 Component Personality, brand-foundation.md (tagline, core narrative boilerplate, proof points), and STATE.md (entity type). Do not read visual-direction.md for token values — token values are already in the `tokens/` files.

### Pattern 3: Token Link Pattern

**What:** All design-kit HTML files reference external token files via `<link>` tags instead of inlining CSS custom properties. Relative path is `../tokens/` because HTML files sit at `design-kit/[subdir]/filename.html`.

**Source:** `design-kit-foundation.md` Task 2 instructions [VERIFIED: codebase read]

**CRITICAL path difference from foundation specimens:** Foundation specimens sit at `workspace/output/design-kit/filename.html` (one level) so their relative path is `../tokens/`. But component and preview files sit at `workspace/output/design-kit/components/` and `workspace/output/design-kit/previews/` (two levels deep) — their relative path must be `../../tokens/`.

```html
<!-- For components/ and previews/ subdirectories -->
<link rel="stylesheet" href="../../tokens/colors.css">
<link rel="stylesheet" href="../../tokens/typography.css">
<link rel="stylesheet" href="../../tokens/spacing.css">

<!-- For root-level files (landing-page.html) -->
<link rel="stylesheet" href="../tokens/colors.css">
<link rel="stylesheet" href="../tokens/typography.css">
<link rel="stylesheet" href="../tokens/spacing.css">
```

[ASSUMED] — The relative path difference between subdirectory and root-level files follows standard HTML relative URL semantics. The planner should verify the directory depth assumption against the actual output structure.

### Pattern 4: Component Anatomy

**What:** Each atomized component HTML file contains: (1) `<link>` tags to external token files, (2) a `<style>` block with component-specific CSS using token variables, annotated with `/* [TOKEN] */` and `/* [BRAND PERSONALITY] */` comments, (3) a rendered example of the component in the `<body>`, (4) a usage note.

**Source:** D-01, D-02, D-03 from CONTEXT.md; specimen-design SKILL.md for quality standards [VERIFIED: codebase read]

**Component CSS annotation pattern:**
```html
<style>
.btn-primary {
  background-color: var(--color-action);      /* [TOKEN: --color-action] */
  border-radius: var(--radius-sm);            /* [TOKEN: --radius-sm] */
  padding: var(--space-sm) var(--space-md);   /* [TOKEN: --space-sm, --space-md] */
  font-family: var(--font-body);              /* [TOKEN: --font-body] */
  font-weight: 600;                           /* [BRAND PERSONALITY: solid fill, professional weight] */
  transition: background-color var(--transition-speed) ease; /* [TOKEN: --transition-speed] */
}

.btn-primary:hover {
  background-color: var(--color-action-hover); /* [TOKEN: --color-action-hover] */
  /* [BRAND PERSONALITY: subtle color shift on hover, not scale or translate] */
}
</style>
```

**Seven components and their Component Personality sources (from visual-direction.md §8):**

| Component | Primary Personality Decision | Source Property |
|-----------|------------------------------|-----------------|
| button | Solid fill, moderate radius (var(--radius-sm)); teal primary, border-only secondary; hover = color shift | "Button style" in Component Personality |
| card | Flat with 1px light-gray border and subtle shadow (var(--shadow-sm)); left border accent teal on feature variants | "Card style" + "Accent treatment" |
| form-field | Input fields inherit radius-sm; focus state uses accent color (var(--color-action)); error state in emphasis/coral | Component Personality + brand palette |
| nav | Brand primary color background; body font, semibold weight for active items; horizontal for primary | Component Personality + typography tokens |
| modal | Shadow-lg (var(--shadow-lg)); radius-lg (var(--radius-lg)); overlay dims background | Component Personality + shadow tokens |
| alert | Four variants (info/success/warning/error); left border accent pattern; badge-shape containers | "Accent treatment" + "Badge shape" |
| badge | 4px radius (var(--radius-sm)) per "slightly rounded rectangle"; structured not casual | "Badge shape" in Component Personality |

[ASSUMED] — The form-field, nav, and modal Component Personality behaviors are inferred from the general token values and example brand visual-direction.md. Actual client visual-direction.md may specify different behaviors. The agent should read the actual `visual-direction.md` for its client.

### Pattern 5: Preview Card Structure

**What:** Mini reference card — visual preview zone at top (swatches, specimen, scale, demo, lockup), token value layer at bottom (2-3 values as small monospace text). Standalone HTML file linking external tokens. Designed for 280-400px sweet spot.

**Source:** D-04, D-05, D-06 from CONTEXT.md [VERIFIED: user decision]

**CSS structure for preview cards:**
```css
.preview-card {
  min-width: 150px;
  max-width: 400px;
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.preview-zone {
  padding: var(--space-md);
  /* visual content: swatches, specimens, scale bars */
}

.token-layer {
  border-top: 1px solid var(--color-border);
  padding: var(--space-sm) var(--space-md);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  overflow: hidden;   /* Per D-05: floor behavior uses overflow:hidden not content removal */
}

.token-chip {
  white-space: nowrap;
  min-width: 0;       /* allows flex children to shrink below content size */
}
```

**Five preview card content specs:**

| File | Preview Zone Content | Token Layer (2-3 values) |
|------|---------------------|--------------------------|
| `previews/colors.html` | Color swatches for all palette colors; semantic token rows | `--color-primary`, `--color-action`, `--color-border` |
| `previews/type.html` | Font name specimens at 3 sizes (display, body, mono); weight scale | `--font-display`, `--font-body`, `--font-weight-heading` |
| `previews/spacing.html` | Visual scale bars at xs/sm/md/lg/xl/2xl widths; radius dots | `--space-md`, `--radius-md`, `--transition-speed` |
| `previews/components.html` | Mini rendered button, badge, card, form input in brand tokens | `--color-action`, `--radius-sm`, `--shadow-sm` |
| `previews/brand-groups.html` | Brand lockup (wordmark + mark placeholder or text), tagline, primary color swatch | `--font-display`, `--color-primary`, brand slug |

### Pattern 6: Root Files

**What:** Three files at design-kit root level: README.md (in brand voice), package.json (valid JSON with name and description), HANDOFF.md (designer usage instructions).

**Source:** DKIT-04 requirement; D-07 establishes brand voice sourcing for landing page (same principle applies to README.md) [VERIFIED: REQUIREMENTS.md + CONTEXT.md]

**README.md content structure (brand voice):**
- Title: brand name + "Design Kit"
- Brand voice opening (pull from tagline or core belief — not a generic template opener)
- "What's in this kit" section: list of directories with one-line descriptions
- "How to use" quick start: open specimens in browser, import token files, use Tailwind config
- Written in the brand's voice (not generic technical prose)
- Source: brand-foundation.md for voice signal; visual-direction.md for brand name

**package.json minimum valid structure:**
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
Brand slug = brand name lowercased, spaces replaced with hyphens (same convention as skill-bundle-packager SKILL.md slug pattern [VERIFIED: skill-bundle-packager.md]).

**HANDOFF.md content structure:**
- Designer quick start: how to open specimens, where tokens live, how to import into Figma/Sketch via DTCG tokens.json
- Developer quick start: how to import tailwind.config.js, how to use CSS custom properties
- Component inventory: list of all component files and what each contains
- Preview card index: list of all preview files
- Token file index: what each token file covers
- "Read next": point to SKILL.md in skill-bundle for voice layer

### Pattern 7: Landing Page Specimen

**What:** New `landing-page.html` at design-kit root. Uses real brand copy (tagline, core narrative, proof points from brand-foundation.md). Links external tokens. Entity-type conditional on content structure.

**Source:** D-07, D-08, D-09 from CONTEXT.md [VERIFIED: user decision]

**Individual entity template:**
```
[Hero: bio-led, tagline as headline, personal story subhead]
[Single primary CTA]
[Core narrative section: personal story flow, proof points as personal statements]
[Contact / connect section]
```

**Org entity template:**
```
[Hero: product-led, tagline + one-sentence value prop as headline]
[Feature grid: 3-4 key offerings or proof points as cards]
[Dual CTA: primary action + secondary "learn more" style]
[About section: core narrative boilerplate]
```

**Copy sourcing from brand-foundation.md:**
- Hero headline → tagline (Section 4: Messaging Architecture > Tagline)
- Subheadline / value prop → one-sentence boilerplate (Section 4 > Boilerplate Descriptions)
- Body / story → core narrative (Section 4 > Core Narrative)
- Feature grid / proof points → proof points (Section 4 > Proof Points)

**Entity type detection from STATE.md:**
```markdown
Read the `entity_type` field from workspace/STATE.md Client section.
If entity_type is "individual", "artist", "creator", or "solo" → use Individual template.
If entity_type is "business", "organization", "agency", "studio", or "brand" → use Org template.
If entity_type is absent or ambiguous → default to Org template.
```

[ASSUMED] — The exact field name and value set for entity type in STATE.md is inferred from workspace/STATE-template.md patterns and existing agent behavior. The planner should verify the exact STATE.md entity type field format against the actual STATE-template.md or an example STATE.md.

### Anti-Patterns to Avoid

- **Token re-extraction:** Packager must NOT read visual-direction.md CSS Custom Properties Block for token values. Tokens are already in `tokens/` files from Phase 10. Only read visual-direction.md §8 Component Personality section (D-12).
- **Inline `:root` blocks:** No inline CSS custom property declarations in component or preview HTML files. All token values come from external link tags. Any `:root {}` that slips in would bypass the token files.
- **Wrong relative paths for `../tokens/`:** Components and previews are in subdirectories — their paths to tokens/ are `../../tokens/`, not `../tokens/`. Root-level files use `../tokens/`. Getting this wrong silently breaks all token rendering.
- **Placeholder copy in landing page:** D-07 prohibits lorem ipsum or template placeholder text. Landing page must wait for brand-foundation.md to exist — pre-flight check #5 enforces this.
- **Overwriting Phase 10 output:** Packager must never write to `workspace/output/design-kit/*.html` at the root level — those post-processed specimens are owned by design-kit-foundation. Packager only writes to `components/`, `previews/`, and new root-level files it is explicitly responsible for.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Token value lookup | Do not re-parse visual-direction.md for CSS values | Read existing `tokens/*.css` files | Design-kit-foundation already did this extraction; redundant re-extraction risks value drift |
| Design system document format | Do not invent a new format for component docs | Use the established `link + style + body` HTML pattern from design-kit-foundation specimens | Consistent with existing design-kit specimens; opens in browser natively |
| Brand voice in README | Do not write generic technical prose | Read tagline/core belief from brand-foundation.md | The brand voice is already extracted; README should sound like the brand |

**Key insight:** This phase is a delivery-layer agent. All creative decisions (token values, component personality, brand voice) have already been made in earlier phases. The packager reads, formats, and structures — it does not re-derive or re-design.

---

## Runtime State Inventory

Not applicable — this is a greenfield agent definition phase with no rename/refactor operations.

---

## Common Pitfalls

### Pitfall 1: Wrong Token Link Relative Paths
**What goes wrong:** Components and previews sit in subdirectories (`components/`, `previews/`). If the agent uses `../tokens/` (the root-level specimen pattern), token files won't load and all `var()` calls render as unset/initial values.
**Why it happens:** design-kit-foundation uses `../tokens/` for files at the design-kit root. A naive copy of that pattern breaks for subdirectory files.
**How to avoid:** Agent definition must explicitly state two link patterns: `../../tokens/` for files in `components/` and `previews/`; `../tokens/` for `landing-page.html` at root.
**Warning signs:** Components render without colors or fonts when opened in a browser. CSS Inspector shows `var(--color-*)` resolving to empty strings.

### Pitfall 2: Agent Reads visual-direction.md for Token Values
**What goes wrong:** Agent reads the CSS Custom Properties Block from visual-direction.md instead of using existing token files. Results in hardcoded values instead of token variable references — the whole point of the design kit is broken.
**Why it happens:** Document Assembler and design-kit-foundation both read visual-direction.md — an implementer might follow that pattern without noticing the D-12 constraint.
**How to avoid:** Agent definition must explicitly prohibit re-reading token values from visual-direction.md. State: "Read visual-direction.md only for §8 Component Personality. Token values come from `tokens/*.css` files already extracted by design-kit-foundation."
**Warning signs:** Component files contain inline `--color-primary: #HEX` declarations instead of `var(--color-primary)`.

### Pitfall 3: Inline `:root {}` Slipping Into Component Files
**What goes wrong:** When writing component HTML with `<style>` blocks, an agent may habitually include `:root {}` declarations for CSS custom properties rather than relying on the external link tags.
**Why it happens:** Client-side HTML specimens in `workspace/output/client/` are self-contained and DO have `:root {}` inline. The component files should NOT.
**How to avoid:** Quality bar check: after each component file is written, verify it contains no `:root {}` block. All custom property references must be `var()` calls with values sourced from linked external files.
**Warning signs:** Removing the `<link>` tags from a component file and the component still renders correctly (means values are inlined, not externally loaded).

### Pitfall 4: Landing Page with Missing or Placeholder Copy
**What goes wrong:** Agent writes landing-page.html with `[Insert tagline here]` or lorem ipsum because brand-foundation.md wasn't read or content wasn't extracted correctly.
**Why it happens:** The agent definition may instruct copy sourcing but the specific section paths within brand-foundation.md may not be spelled out precisely enough.
**How to avoid:** Agent definition must specify exact section paths: tagline from "Section 4: Messaging Architecture > Tagline", boilerplate from "Section 4 > Boilerplate Descriptions", proof points from "Section 4 > Proof Points". Pre-flight check requires brand-foundation.md to exist before any landing page work begins.
**Warning signs:** Landing page contains generic placeholder text, brackets `[ ]`, or lorem ipsum.

### Pitfall 5: Preview Cards Break Below 150px
**What goes wrong:** Label rows with long token names (`--color-action-hover: #value`) overflow or cause layout shifts at very narrow widths.
**Why it happens:** Token names are not truncatable — they have to be the full variable name to be useful.
**How to avoid:** Per D-05, use `min-width: 150px` on the card container and `overflow: hidden` on label rows. This clips long values rather than breaking layout. The card content still exists in the DOM; it's just not visible below the floor.
**Warning signs:** Cards expand beyond their container or cause horizontal scroll in the parent at narrow widths.

### Pitfall 6: Overwriting Phase 10 Design-Kit Specimens
**What goes wrong:** Agent writes to `workspace/output/design-kit/brand-foundation.html` or `color-palette.html` — files that design-kit-foundation already created correctly.
**Why it happens:** DKIT-05 says "reference specimens include brand-foundation.html and color-palette.html" — an implementer might interpret this as "create these files."
**How to avoid:** DKIT-05 is satisfied by the files Phase 10 already produced. The packager's only responsibility for DKIT-05 is landing-page.html. Agent definition must not list brand-foundation.html or color-palette.html as output files.
**Warning signs:** Phase 10 specimens are re-written with different token link paths or different content.

---

## Code Examples

### Atomized Component HTML Structure (button.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Brand Name] — Button Component</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=FONTNAME&display=swap" rel="stylesheet">
  <!-- Design Kit Token Files -->
  <link rel="stylesheet" href="../../tokens/colors.css">
  <link rel="stylesheet" href="../../tokens/typography.css">
  <link rel="stylesheet" href="../../tokens/spacing.css">
  <style>
    /* Component: Button
     * Tokens: all var() references below come from linked token files
     * Brand Personality: solid fill primary, border-only secondary,
     *   hover = color shift (not scale/translate) — from visual-direction.md §8
     */

    body {
      font-family: var(--font-body); /* [TOKEN: --font-body] */
      padding: var(--space-xl);      /* [TOKEN: --space-xl] */
      background: var(--color-background, #fff);
    }

    .btn {
      display: inline-flex;
      align-items: center;
      padding: var(--space-sm) var(--space-lg);  /* [TOKEN: --space-sm, --space-lg] */
      border-radius: var(--radius-sm);           /* [TOKEN: --radius-sm] */
      font-family: var(--font-body);             /* [TOKEN: --font-body] */
      font-weight: 600;                          /* [BRAND PERSONALITY: solid weight for CTAs] */
      cursor: pointer;
      border: 1px solid transparent;
      transition: background-color var(--transition-speed) ease,
                  border-color var(--transition-speed) ease; /* [TOKEN: --transition-speed] */
    }

    .btn-primary {
      background-color: var(--color-action);     /* [TOKEN: --color-action] */
      color: #fff;
      /* [BRAND PERSONALITY: solid fill — not gradient, not outline] */
    }

    .btn-primary:hover {
      background-color: var(--color-action-hover); /* [TOKEN: --color-action-hover] */
      /* [BRAND PERSONALITY: color shift on hover, not scale or box-shadow change] */
    }

    .btn-secondary {
      background-color: transparent;
      color: var(--color-action);                /* [TOKEN: --color-action] */
      border-color: var(--color-action);         /* [TOKEN: --color-action] */
      /* [BRAND PERSONALITY: border-only secondary — pairs with solid primary] */
    }

    .btn-secondary:hover {
      background-color: var(--color-action);     /* [TOKEN: --color-action] */
      color: #fff;
      /* [BRAND PERSONALITY: fills in on hover — reinforces solid-fill brand feel] */
    }
  </style>
</head>
<body>
  <h1 style="font-family: var(--font-display); margin-bottom: var(--space-xl);">Button</h1>

  <section>
    <h2>Primary</h2>
    <button class="btn btn-primary">Get Started</button>
    <button class="btn btn-primary" disabled style="opacity:0.5;">Disabled</button>
  </section>

  <section>
    <h2>Secondary</h2>
    <button class="btn btn-secondary">Learn More</button>
  </section>

  <section>
    <h2>Usage</h2>
    <p>Use <code>btn-primary</code> for the primary call to action — one per view.
    Use <code>btn-secondary</code> for supporting actions alongside a primary button.</p>
  </section>
</body>
</html>
```
[ASSUMED] — Exact CSS values interpolated from example brand visual-direction.md. Actual agent must read from the client's Component Personality section.

### Preview Card HTML Structure (colors.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>[Brand Name] — Colors Preview</title>
  <link rel="stylesheet" href="../../tokens/colors.css">
  <link rel="stylesheet" href="../../tokens/typography.css">
  <link rel="stylesheet" href="../../tokens/spacing.css">
  <style>
    body { margin: 0; padding: var(--space-md); font-family: var(--font-body); }

    .preview-card {
      min-width: 150px;
      max-width: 400px;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .preview-zone {
      padding: var(--space-md);
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-xs);
    }

    .swatch {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-sm);
    }

    .token-layer {
      border-top: 1px solid var(--color-border);
      padding: var(--space-sm) var(--space-md);
      font-family: var(--font-mono);
      font-size: 0.7rem;
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-xs);
      overflow: hidden;
    }

    .token-chip { white-space: nowrap; min-width: 0; }
  </style>
</head>
<body>
  <div class="preview-card">
    <div class="preview-zone">
      <div class="swatch" style="background: var(--color-primary);" title="primary"></div>
      <div class="swatch" style="background: var(--color-accent);" title="accent"></div>
      <div class="swatch" style="background: var(--color-secondary);" title="secondary"></div>
      <div class="swatch" style="background: var(--color-surface);" title="surface"></div>
      <div class="swatch" style="background: var(--color-action);" title="action"></div>
    </div>
    <div class="token-layer">
      <span class="token-chip">--color-primary</span>
      <span class="token-chip">--color-action</span>
      <span class="token-chip">--color-border</span>
    </div>
  </div>
</body>
</html>
```
[ASSUMED] — Preview card structure derived from D-04 and D-05 decisions. Specific token names (`--color-primary` etc.) will be whatever the client's actual token names are.

### Entity-Type Conditional in Agent Definition
```markdown
### Landing Page Entity-Type Conditional

Read `entity_type` from `workspace/STATE.md` Client section.

**If individual / artist / creator / solo → Individual Template:**

Hero section:
- `<h1>` set to tagline (from brand-foundation.md Section 4 > Tagline)
- Subhead: one-sentence boilerplate (Section 4 > Boilerplate > one-sentence variant)
- Single CTA button below hero

Content sections:
- Core narrative as flowing prose (Section 4 > Core Narrative)
- Proof points as personal statements (Section 4 > Proof Points)
- Connect / contact section with minimal CTA

**If org / business / agency / studio → Org Template:**

Hero section:
- `<h1>` set to tagline
- Subhead: one-sentence boilerplate
- Feature grid: 3-4 proof points as cards (Section 4 > Proof Points)
- Dual CTA: primary action + secondary "learn more"

Content sections:
- Core narrative as brand narrative (Section 4 > Core Narrative)
- About / mission section

**If entity_type is absent or ambiguous:** use Org template as default.
```

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| All output in `workspace/output/` flat | Three-bundle structure (`client/`, `skill-bundle/`, `design-kit/`) | This phase writes to `design-kit/` only |
| Client specimens are self-contained HTML | Design-kit specimens link external tokens | Components and previews follow the external-link pattern established in Phase 10 |
| No atomized component library | Standalone per-component HTML files | Each component is independently openable in a browser — consumable without a build step |
| No preview cards | Mini reference cards at 280-400px | Preview cards are the design-kit-first entry point for a designer |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Components and previews in subdirectories use `../../tokens/` relative path; root-level files use `../tokens/` | Pattern 3: Token Link Pattern | Tokens don't load; all var() calls render as unset. Low risk — straightforward HTML relative path math. |
| A2 | Entity type in STATE.md is checked against values: individual/artist/creator/solo (individual template) vs org/business/agency/studio/brand (org template) | Pattern 7: Landing Page Specimen | Wrong template applied for edge-case entity types. Medium risk — should verify exact field values from STATE-template.md before implementing. |
| A3 | form-field, nav, and modal Component Personality behaviors are inferred from token values, not explicitly stated in visual-direction.md §8 | Pattern 4: Component Anatomy | Components don't faithfully implement the brand's Component Personality. Low risk for this phase — agent reads the actual client visual-direction.md at runtime. |
| A4 | Preview card content for brand-groups.html uses wordmark text + tagline + primary color swatch as "brand lockup" | Pattern 5: Preview Card Structure | Brand group preview doesn't capture what designer needs. Medium risk — the agent definition should specify what "brand lockup" means in the absence of a real mark file. |
| A5 | button.html example code uses `var(--color-background, #fff)` fallback | Code Examples | Minor — the fallback is a safe default. No real risk. |

---

## Open Questions

1. **What is the exact entity_type field name and value set in STATE.md?**
   - What we know: STATE.md has an entity type field used by Document Assembler to conditionally include/exclude sections (e.g., Mission/Vision for org only)
   - What's unclear: The exact field path inside STATE.md (e.g., `Client.entity_type` vs `entity_type` at root) and the canonical value set
   - Recommendation: Read `workspace/STATE-template.md` or any example STATE.md (workspace/reference/example-brand/STATE.md) to confirm before writing the agent definition. Low effort, eliminates A2.

2. **Should brand-groups.html preview card include a text-based wordmark or a placeholder mark area?**
   - What we know: Phase 7 produces a mark concept but not necessarily an SVG file; the image-generator.md agent produces mark explorations at `workspace/assets/mark-explorations/`
   - What's unclear: Whether the packager should Glob for a mark asset or fall back to text-only lockup when no mark SVG exists
   - Recommendation: Default to text-based brand lockup (brand name in display font + tagline) with a Glob check for any mark asset at `workspace/assets/mark-explorations/`. If found, embed the first one.

---

## Environment Availability

Step 2.6: SKIPPED (no external dependencies — this phase is agent definition authoring only; all output is a single markdown file; no npm packages, runtime dependencies, or external services required).

---

## Validation Architecture

`workflow.nyquist_validation` is absent from `.planning/config.json` — treated as enabled.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Manual inspection + browser open |
| Config file | None — no automated test framework for agent definition files |
| Quick run command | `open workspace/output/design-kit/components/button.html` (after agent invocation) |
| Full suite command | Open all 7 components, 5 previews, landing-page.html in browser; verify token loading |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DKIT-01 | Agent definition file exists with valid frontmatter | manual-only | `ls .claude/agents/design-kit-packager.md` | ❌ Wave 0 (the file to create) |
| DKIT-02 | 7 component HTML files exist and render in browser | manual | `open workspace/output/design-kit/components/*.html` | ❌ Wave 0 |
| DKIT-03 | 5 preview cards render at 150-500px without breakage | manual | Browser DevTools responsive mode at 150px, 280px, 400px, 500px | ❌ Wave 0 |
| DKIT-04 | README.md, package.json, HANDOFF.md exist at design-kit root | smoke | `ls workspace/output/design-kit/README.md workspace/output/design-kit/package.json workspace/output/design-kit/HANDOFF.md` | ❌ Wave 0 |
| DKIT-05 | landing-page.html exists and contains real brand copy | manual | `grep -c "\[" workspace/output/design-kit/landing-page.html` (should return 0 — no placeholder brackets) | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** Verify file exists at expected path
- **Per wave merge:** Open HTML files in browser and confirm token rendering (swatches show brand colors, not unstyled defaults)
- **Phase gate:** All 7 components + 5 previews + landing page open without console errors; `package.json` parses as valid JSON; README.md contains no `[placeholder]` text

### Wave 0 Gaps

- [ ] `.claude/agents/design-kit-packager.md` — the primary deliverable; covers all five DKIT requirements
- [ ] No test framework config needed — validation is browser-based inspection per project pattern

---

## Security Domain

No security domain applicable — this phase creates an agent definition file (markdown) and HTML/CSS/JSON artifacts with no network calls, authentication, user input handling, or sensitive data processing. `security_enforcement` assessment: not applicable for static file generation agents.

---

## Sources

### Primary (HIGH confidence)
- `.claude/agents/design-kit-foundation.md` — verified agent pattern (frontmatter, input section, task structure, output section, quality bar)
- `.claude/agents/skill-bundle-packager.md` — verified structural analog (pre-flight checks, two-task sequential structure, conditional input handling)
- `.planning/phases/12-design-kit/12-CONTEXT.md` — all user decisions D-01 through D-12 verified from user session
- `.claude/skills/specimen-design/SKILL.md` — quality standard for HTML specimens; annotation and token link patterns
- `workspace/reference/example-brand/drafts/visual-direction.md` §8 — Component Personality section structure verified; token variable names confirmed
- `.planning/phases/10-output-foundation/10-PATTERNS.md` — Phase 10 pattern decisions; token link relative paths
- `.planning/phases/11-agent-skill-bundle/11-PATTERNS.md` — Phase 11 pattern decisions; agent definition structural patterns

### Secondary (MEDIUM confidence)
- `workspace/reference/example-brand/output/brand-foundation.html` — verified `:root` token block structure and HTML specimen anatomy
- `.planning/REQUIREMENTS.md` — DKIT-01 through DKIT-05 requirement definitions verified
- `.planning/ROADMAP.md` — Phase 12 success criteria verified

### Tertiary (LOW confidence / ASSUMED)
- Relative path calculation for `../../tokens/` from subdirectories — derived from HTML path mechanics; verified against stated directory structure but not tested at runtime
- STATE.md entity_type field name and value set — inferred from document-assembler conditional behavior; not directly verified from STATE-template.md

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — single-file deliverable using established codebase patterns
- Architecture: HIGH — all design decisions locked in CONTEXT.md; output structure clearly defined
- Pitfalls: HIGH — derived from verified patterns and explicit constraints in CONTEXT.md
- Landing page entity-type conditional: MEDIUM — field name/values need one verify step against STATE-template.md

**Research date:** 2026-04-20
**Valid until:** 2026-05-20 (stable domain — no external library versions in play)
