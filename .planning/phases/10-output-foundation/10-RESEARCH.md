# Phase 10: Output Foundation - Research

**Researched:** 2026-04-19
**Domain:** File system restructure, token extraction pipeline, HTML post-processing, agent definition editing, React/Vite frontend path migration
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-01:** Token files (colors.css, typography.css, spacing.css, tokens.json, tailwind.config.js) are produced by a standalone token extraction step owned by Phase 10, not by the Document Assembler or the design-kit-packager.

**D-02:** The extraction step reads `workspace/drafts/visual-direction.md` and writes to `workspace/output/design-kit/tokens/`.

**D-03:** The Document Assembler's existing DTCG JSON block inside `color-palette.html` remains unchanged as the client-facing copyable artifact. The extraction step produces the actual files — same source, two distinct outputs for two distinct audiences.

**D-04:** All path references migrate in Phase 10 — Document Assembler, Brand Verifier, export skill, and all 5 frontend files update in one atomic pass.

**D-05:** Frontend `import.meta.glob` patterns must use static string literals per Vite constraint. Each subdirectory needs its own glob call.

**D-06:** Empty output subdirectories must be handled gracefully in the frontend — no crash or error state when skill-bundle/ or design-kit/ are empty.

**D-07:** Post-processing approach for design-kit specimens. Document Assembler generates client specimens as self-contained HTML (unchanged behavior). A thin post-processing step creates design-kit variants by swapping the inline `:root` block for external `<link>` tags.

**D-08:** Design-kit specimens stay structurally identical to client specimens — they differ only in token delivery method.

**D-09:** Post-processor must cleanly extract the `:root {}` block from each HTML file. The Document Assembler's CSS structure (single `:root` block) supports this.

**D-10:** Active weave — `workspace/research/voice-fingerprint.md` is added explicitly to the Document Assembler's input list AND the voice-guide/practical-toolkit templates gain structural slots for fingerprint data.

**D-11:** New template addition to voice-guide.md: Quantitative Markers section (sentence length averages, formality ratio, paragraph rhythm metrics from corpus analysis).

**D-12:** Language Bank in practical-toolkit.md: replace generic "Phrases I Use / Never Use" with the fingerprint's Codify / Retire classification.

**D-13:** New template addition to voice-guide.md: Calibration Table section ("too cold / just right / too warm" ranges).

**D-14:** When Phase 6 discovery intent conflicts with voice-fingerprint evidence, the assembler must surface the gap explicitly rather than silently picking one source.

### Claude's Discretion

- Token extraction step implementation form (agent, script, or skill)
- Specific CSS selector/regex strategy for `:root` block extraction in the post-processor
- Frontend empty-state UI for bundles that don't have content yet (skill-bundle/, design-kit/)
- Ordering of glob calls in content-loader.ts for the three subdirectories

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FOUN-01 | Token files (colors.css, typography.css, spacing.css, tokens.json DTCG, tailwind.config.js) generated at `workspace/output/design-kit/tokens/` | Token extraction step reads CSS custom properties block from visual-direction.md; token file formats documented in Code Examples section |
| FOUN-02 | Document Assembler generates design-kit specimens with external token links; client specimens remain self-contained with inline tokens | Post-processing approach documented; `:root` regex extraction pattern verified against actual HTML structure |
| FOUN-03 | Output directory restructured into `client/`, `skill-bundle/`, `design-kit/` subfolders | All affected files inventoried; migration scope documented in Architecture Patterns section |
| FOUN-04 | All path references in skills, agents, and frontend updated for new output structure | Complete file inventory with exact path strings to change for each file |
| FOUN-05 | Document Assembler reads voice-fingerprint.md as input (Voice Pipeline backlog fix) | voice-fingerprint.md structure analyzed; new template sections for voice-guide.md and practical-toolkit.md specified |
</phase_requirements>

---

## Summary

Phase 10 is a surgical refactoring phase with no new UI to invent and no new external dependencies to add. Every capability needed already exists in the codebase — this phase reorganizes, connects, and extends what's there.

The phase has five distinct workstreams: (1) restructure `workspace/output/` into three named subdirectories, (2) build a token extraction step that reads `visual-direction.md` and writes five token files to `design-kit/tokens/`, (3) build a post-processor that converts self-contained HTML specimens into external-token-linked design-kit variants, (4) migrate all path references across 8 files (2 agents, 1 skill, 5 frontend files) in one coordinated pass, and (5) wire `voice-fingerprint.md` into the Document Assembler with new template slots.

The most complex workstream is path migration (D-04). The frontend's `import.meta.glob` uses static string literals that Vite resolves at build time — these cannot be computed dynamically, so each new subdirectory needs its own explicit glob call. The `OutputViewer.tsx` constructs `srcUrl` as `/workspace/output/${filename}` hardcoded, and `OutputPage.tsx` has all file paths hardcoded as string literals — both require targeted edits. The Document Assembler and Brand Verifier path references are embedded in their markdown agent definition files, not TypeScript.

The token extraction step and post-processor are net-new logic. Both should follow the established agent pattern (sonnet, Read/Write/Glob/Grep) since the Document Assembler already does analogous CSS extraction work and the codebase has no standalone scripts. The `:root` block structure in example HTML specimens is consistent and well-delimited — regex extraction is straightforward.

**Primary recommendation:** Implement the token extractor and post-processor as an agent (or a single combined agent) following the Document Assembler's existing pattern. This keeps all brand output logic in the same system (agent definitions) and avoids introducing a new script/tool paradigm.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Output directory restructure | Filesystem / Workspace | — | Pure filesystem change; no UI tier owns this |
| Token file extraction | Agent (Claude) | — | Reads visual-direction.md, writes CSS/JSON; same pattern as Document Assembler |
| HTML post-processing (design-kit variants) | Agent (Claude) | — | Reads client HTML, rewrites `:root` block; agent tools sufficient |
| Path migration in agents/skills | Agent definition files | — | Text edits to markdown agent files in `.claude/agents/` and `.claude/skills/` |
| Path migration in frontend | Frontend (React/Vite) | — | TypeScript edits to src/lib/ and src/components/ files |
| Voice-fingerprint weave | Agent (Document Assembler) | — | Input list addition + template slot additions in agent definition |
| Empty-state UI for new bundles | Frontend (React) | — | OutputPage.tsx renders bundle state; needs graceful null handling |

---

## Standard Stack

No new libraries required. Phase 10 uses only what's already installed.

### Core (existing, no changes needed)

| Tool | Version | Purpose | Notes |
|------|---------|---------|-------|
| TypeScript | 5.9.3 | Frontend path migration edits | All 5 frontend files |
| React | 19.2.0 | OutputPage/OutputViewer component updates | |
| Vite `import.meta.glob` | 7.2.4 | Static glob patterns per subdirectory | Must be static string literals |
| Claude agent system | — | Token extractor, post-processor | `.claude/agents/*.md` pattern |

**Installation:** None required.

### What the Token Files Look Like

The token extraction step must produce exactly these 5 files at `workspace/output/design-kit/tokens/`:

| File | Format | Source | Content |
|------|--------|--------|---------|
| `colors.css` | CSS custom properties | Color Palette section of visual-direction.md | `--color-primary`, semantic tokens |
| `typography.css` | CSS custom properties | Typography section of visual-direction.md | `--font-*`, `--font-weight-*`, `--letter-spacing-*`, `--line-height-*` |
| `spacing.css` | CSS custom properties | Design System Parameters block | `--space-*`, `--radius-*`, `--shadow-*` |
| `tokens.json` | DTCG JSON | Same sources as above | All tokens in Design Tokens Community Group format |
| `tailwind.config.js` | JS config object | All token sources | Tailwind v3 `theme.extend` mapping tokens to CSS var references |

The source of truth is the `## Design System Parameters` / `### CSS Custom Properties Block` section in `visual-direction.md`. The Document Assembler already extracts this block and embeds it in HTML `:root` declarations — the token extractor re-uses the same parsing logic but writes to files instead. [VERIFIED: read from `workspace/reference/example-brand/drafts/visual-direction.md`]

---

## Architecture Patterns

### System Architecture Diagram

```
workspace/drafts/visual-direction.md
        │
        ├──► Document Assembler ──► workspace/output/client/*.html (self-contained, :root inline)
        │                                   │
        │                                   └──► Post-Processor ──► workspace/output/design-kit/*.html
        │                                                            (same HTML, :root replaced with <link> tags)
        │
        └──► Token Extractor ──► workspace/output/design-kit/tokens/
                                  colors.css
                                  typography.css
                                  spacing.css
                                  tokens.json
                                  tailwind.config.js

workspace/research/voice-fingerprint.md
        │
        └──► Document Assembler ──► voice-guide.md (Quantitative Markers, Calibration Table)
                                 └──► practical-toolkit.md (Codify/Retire Language Bank)

workspace/output/
├── client/              ← moved from workspace/output/*.md and *.html
│   ├── brand-foundation.md
│   ├── brand-foundation.html
│   ├── voice-guide.md
│   ├── voice-guide.html
│   ├── color-palette.html
│   ├── visual-system.html
│   ├── ui-kit.html
│   ├── practical-toolkit.md
│   └── [asset-pack-name].html  (per selected packs)
├── skill-bundle/        ← empty until Phase 11
└── design-kit/
    ├── tokens/          ← populated by Token Extractor
    │   ├── colors.css
    │   ├── typography.css
    │   ├── spacing.css
    │   ├── tokens.json
    │   └── tailwind.config.js
    └── [specimen].html  ← populated by Post-Processor (mirrors client/ HTML)
```

### Component Responsibilities

| Component | File | What Changes |
|-----------|------|-------------|
| Document Assembler | `.claude/agents/document-assembler.md` | (1) Output paths: `workspace/output/` → `workspace/output/client/`. (2) Input list: add `workspace/research/voice-fingerprint.md`. (3) Template slots in voice-guide.md and practical-toolkit.md for fingerprint data. (4) Conflict surface instructions (D-14). |
| Brand Verifier | `.claude/agents/brand-verifier.md` | All `workspace/output/` path references → `workspace/output/client/`. |
| Export skill | `.claude/skills/brand-compass/export/SKILL.md` | All `workspace/output/` path references → `workspace/output/client/`. |
| content-loader.ts | `src/lib/content-loader.ts` | Replace single `outputMdFiles` and `outputHtmlFiles` globs with per-subdirectory globs for `client/`, `skill-bundle/`, `design-kit/`. Update `loadOutputFiles()` to merge all three. Update `getFile()` lookup to cover new paths. |
| content-parser.ts | `src/lib/content-parser.ts` | All `PHASE_CONTENT_MAP` outputFile entries: `/workspace/output/X` → `/workspace/output/client/X`. |
| phase-utils.ts | `src/lib/phase-utils.ts` | All `ASSET_PACKS` `outputFile` strings: `workspace/output/X` → `workspace/output/client/X`. |
| OutputPage.tsx | `src/components/OutputPage.tsx` | All `deliverables` filename strings: `workspace/output/X` → `workspace/output/client/X`. Asset pack path strings. |
| OutputViewer.tsx | `src/components/OutputViewer.tsx` | `srcUrl` construction: `/workspace/output/${filename}` — must now handle subdirectory-qualified filenames OR be passed a full path. See Pitfall 1. |
| Token Extractor | net-new agent or combined step | New. Reads visual-direction.md, writes 5 token files to design-kit/tokens/. |
| Post-Processor | net-new agent or combined step | New. Reads client/ HTML, swaps `:root` for `<link>` tags, writes to design-kit/. |

### Pattern 1: Vite Static Glob for Subdirectories

**What:** `import.meta.glob` patterns must be string literals — Vite resolves them at build time and cannot accept runtime-computed strings.

**When to use:** Every subdirectory under `workspace/output/` needs its own glob call.

```typescript
// Source: Vite documentation constraint — verified against existing content-loader.ts pattern
// Each glob is a static string literal — DO NOT compute dynamically

const clientMdFiles = import.meta.glob('/workspace/output/client/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const clientHtmlFiles = import.meta.glob('/workspace/output/client/*.html', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const skillBundleFiles = import.meta.glob('/workspace/output/skill-bundle/**/*', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const designKitFiles = import.meta.glob('/workspace/output/design-kit/**/*', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>
```

[VERIFIED: existing `content-loader.ts` uses this exact pattern — each directory has a separate glob call]

### Pattern 2: `:root` Block Extraction from HTML

**What:** The post-processor needs to extract the entire `:root { ... }` block from a self-contained HTML file and replace it with `<link>` tags.

**Structure of the source HTML** (verified from example-brand/output/brand-foundation.html):

```html
<style>
/* ── Brand Tokens ─────────── */
:root {
  --navy: #0F2B3C;
  /* ... many properties ... */
  --transition-speed: 0.2s;
}

/* ── Reset ─────────────── */
*, *::before, ...
```

The `:root` block is always:
- Located inside the first `<style>` tag
- Preceded by a comment line
- Terminated by the first `}` that closes it (single level — no nested rules)

**Regex approach** (simple, no dependency on a CSS parser):

```javascript
// Match from :root { to the closing } on its own line
// The :root block in Document Assembler output is always a top-level rule
const rootBlockRegex = /\/\*[^\n]*Brand Tokens[^\n]*\*\/\s*:root\s*\{[^}]*\}/s

// Replacement: external <link> tags pointing to design-kit/tokens/
const linkTags = [
  '<link rel="stylesheet" href="../tokens/colors.css">',
  '<link rel="stylesheet" href="../tokens/typography.css">',
  '<link rel="stylesheet" href="../tokens/spacing.css">',
].join('\n  ')

const designKitHtml = clientHtml.replace(rootBlockRegex, `/* Tokens loaded externally */`)
// Insert link tags before </head>
.replace('</head>', `  ${linkTags}\n</head>`)
```

[VERIFIED: `:root` block structure confirmed in `workspace/reference/example-brand/output/brand-foundation.html` lines 17-52]

**Fallback regex** (if comment-anchored match is too fragile):

```javascript
// More permissive: match :root { ... } block regardless of preceding comment
const rootBlockRegex = /:root\s*\{([^}]*)\}/s
```

Claude's discretion: choose whichever regex strategy proves most reliable against the actual Document Assembler output. The comment-anchored version is preferable because it avoids matching any other `:root` blocks that might appear in the HTML (unlikely but possible in ui-kit.html which has multiple component CSS sections).

### Pattern 3: Token File Formats

**colors.css** — extract hex values from the Color Palette section:

```css
/* Source: workspace/drafts/visual-direction.md — Color Palette section */
:root {
  --color-primary: #1B2B4B;
  --color-accent: #2A9D8F;
  --color-secondary: #64748B;
  --color-emphasis: #E8725C;
  --color-background: #FFFFFF;
  --color-surface: #F8F7F5;

  /* Semantic tokens — mapped from palette */
  --color-text-primary: var(--color-primary);
  --color-text-secondary: var(--color-secondary);
  --color-action: var(--color-accent);
  --color-action-hover: #238a7d; /* darkened by ~10% */
  --color-surface-raised: var(--color-surface);
  --color-border: #E2E4E8;
  --color-border-strong: var(--color-secondary);
}
```

**typography.css** — extract from Typography section + Design System Parameters:

```css
/* Source: workspace/drafts/visual-direction.md */
:root {
  --font-display: 'Plus Jakarta Sans', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --font-weight-heading: 700;
  --font-weight-body: 400;
  --font-weight-bold: 600;

  --letter-spacing-heading: -0.01em;
  --letter-spacing-label: 0.1em;

  --line-height-body: 1.7;
  --line-height-heading: 1.2;
}
```

**spacing.css** — extract from Design System Parameters CSS block:

```css
/* Source: workspace/drafts/visual-direction.md — Design System Parameters */
:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;

  --shadow-sm: 0 1px 2px rgba(27, 43, 75, 0.06);
  --shadow-md: 0 4px 12px rgba(27, 43, 75, 0.08);
  --shadow-lg: 0 8px 24px rgba(27, 43, 75, 0.12);

  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;

  --content-max-width: 900px;
  --transition-speed: 0.2s;
}
```

**tokens.json** — DTCG format (same structure as the existing DTCG block in color-palette.html):

```json
{
  "color": {
    "primary": { "$value": "#1B2B4B", "$type": "color", "$description": "Primary brand color" },
    "accent":  { "$value": "#2A9D8F", "$type": "color", "$description": "Action/CTA color" }
  },
  "size": {
    "radius": {
      "sm": { "$value": "4px",  "$type": "dimension" },
      "md": { "$value": "8px",  "$type": "dimension" },
      "lg": { "$value": "12px", "$type": "dimension" }
    },
    "spacing": {
      "xs": { "$value": "0.25rem", "$type": "dimension" },
      "sm": { "$value": "0.5rem",  "$type": "dimension" },
      "md": { "$value": "1rem",    "$type": "dimension" }
    }
  },
  "fontWeight": {
    "heading": { "$value": "700", "$type": "fontWeight" },
    "body":    { "$value": "400", "$type": "fontWeight" }
  }
}
```

[VERIFIED: DTCG structure confirmed from Document Assembler definition lines 408-434]

**tailwind.config.js** — maps CSS var references into Tailwind theme.extend:

```javascript
// Source: Design Tokens Community Group v0.1 spec — standard Tailwind token bridge
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        'brand-primary':   'var(--color-primary)',
        'brand-accent':    'var(--color-accent)',
        'brand-secondary': 'var(--color-secondary)',
        'brand-emphasis':  'var(--color-emphasis)',
      },
      borderRadius: {
        'brand-sm': 'var(--radius-sm)',
        'brand-md': 'var(--radius-md)',
        'brand-lg': 'var(--radius-lg)',
      },
      spacing: {
        'brand-sm': 'var(--space-sm)',
        'brand-md': 'var(--space-md)',
        'brand-lg': 'var(--space-lg)',
      },
    },
  },
}
```

[ASSUMED: Tailwind v3 format used above. Project uses Tailwind v4 internally (via @tailwindcss/vite 4.1.17), but the design-kit tailwind.config.js is a handoff artifact for the *recipient designer's* project which may use v3 or v4. The safe default is v3 format since most projects still use it. If the planner wants v4 CSS-based config instead, that's a reasonable discretion call.]

### Pattern 4: Voice-Fingerprint Integration

**Document Assembler input list addition** (D-10):

Add to the `## Input` section:
```
- `workspace/research/voice-fingerprint.md` for voice-dependent outputs (voice-guide.md, voice-guide.html, practical-toolkit.md). If absent, skip fingerprint sections.
```

**New sections in voice-guide.md template** (D-11, D-13):

After `## Section 3: Writing Style`, add:

```markdown
## Section 3b: Quantitative Voice Markers

[From voice-fingerprint.md — Quantitative Markers table. If voice-fingerprint absent, omit section.]

| Metric | This Brand | Category Norm |
|--------|-----------|---------------|
| Average sentence length | [from fingerprint] | [from fingerprint] |
| Paragraph length | [from fingerprint] | [from fingerprint] |
| Passive voice usage | [from fingerprint] | [from fingerprint] |
| Formality ratio | [from fingerprint] | [from fingerprint] |
```

And after `## Section 5: Guardrails`, add:

```markdown
## Section 5b: Voice Calibration Table

[From voice-fingerprint.md — Voice Calibration Guide table. If voice-fingerprint absent, omit section.]

| Dimension | Too Cold | Just Right | Too Warm |
|-----------|----------|-----------|---------|
| [from fingerprint] | ... | ... | ... |
```

**Language Bank replacement in practical-toolkit.md** (D-12):

Replace the existing `### Phrases I Use` / `### Phrases I Never Use` section with:

```markdown
### Language Bank

**Codify (use these — appear frequently and work well):**
[From voice-fingerprint.md — Recurring Phrases: Codify list]

**Retire (avoid these — appear frequently but don't work):**
[From voice-fingerprint.md — Recurring Phrases: Retire list]

**Say This / Not That**
[Generated from above — word substitutions derived from fingerprint retire list]
```

**Conflict surface instructions** (D-14): Add to Document Assembler:

```
When voice-fingerprint.md data conflicts with Phase 6 discovery intent (e.g., fingerprint says
"80/20 formal/conversational" but Phase 6 says "fully conversational voice"), surface the gap
explicitly in voice-guide.md:

> **Voice Gap Note:** Phase 6 discovery targeted [X] register. Corpus analysis (voice-fingerprint.md)
> measured [Y] in existing writing. Both are documented above. Choose one as the target, or use
> discovery intent as the aspiration and fingerprint data as the baseline.
```

### Anti-Patterns to Avoid

- **Glob with interpolation:** `import.meta.glob(\`/workspace/output/${subdir}/*.html\`)` — Vite cannot resolve this. Static strings only.
- **Mutating Document Assembler's `:root` output:** The client HTML specimens must remain unchanged. The post-processor creates new files in design-kit/, never modifying client/ files.
- **CSS parser dependency:** Do not introduce a npm CSS parser for `:root` extraction. The block structure is simple enough for regex given the Document Assembler produces consistent output.
- **Writing token files from the Document Assembler directly:** D-01 is explicit that the Document Assembler does not own token file production. The extraction step is separate.
- **Crashing on empty subdirectories:** If `skill-bundle/` or `design-kit/` have no files, `import.meta.glob` returns an empty object `{}` — this is fine. The `hasOutputFiles()` function and OutputPage component must handle empty collections without error.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| DTCG JSON structure | Custom schema | Follow the DTCG format already defined in Document Assembler lines 408-434 | Consistency — design-kit tokens.json must match what color-palette.html's DTCG block already shows clients |
| CSS token parsing | Custom CSS tokenizer | Regex against the known Document Assembler output format | The Document Assembler produces deterministic `:root` block structure; a full parser is overkill and adds dependencies |
| Font face loading in design-kit HTML | Embedded font data | Keep `<link>` tags for Google Fonts in design-kit specimens | Font files are binary and large; Google Fonts CDN link is already in client HTML |

**Key insight:** This phase is plumbing, not invention. Every pattern already exists in the codebase — the work is connecting and redirecting existing flows.

---

## Common Pitfalls

### Pitfall 1: OutputViewer srcUrl breaks with subdirectory paths
**What goes wrong:** `OutputViewer.tsx` constructs `srcUrl` as `/workspace/output/${filename}` where `filename` is extracted from the URL parameter. After migration, files live at `/workspace/output/client/brand-foundation.html` — but the router route is `/output/view/*` and the `*` wildcard captures the full path after `view/`. The current code uses `filePath?.split('/').pop()` which strips subdirectory info.

**Root cause:** The component was designed assuming flat `workspace/output/` with no subdirectories. The `pop()` call discards subdirectory context.

**How to avoid:** The `srcUrl` should use the full path captured by `useParams()` `'*'` wildcard, not the basename alone. Change `srcUrl` to `/workspace/output/${filePath}` (using the full wildcard match). The `filename` variable (used for `fileTitles` lookup and extension detection) should remain the basename via `pop()`.

**Warning signs:** OutputViewer renders "File not found" for any file in a subdirectory.

### Pitfall 2: `fileTitles` lookup in OutputViewer misses new paths
**What goes wrong:** `fileTitles` is keyed by basename (e.g., `'brand-foundation.html'`). Since `srcUrl` will use full path but `filename` stays as basename, this lookup will still work — BUT if the same filename exists in multiple bundles (e.g., `client/color-palette.html` and `design-kit/color-palette.html`), title lookup is ambiguous.

**How to avoid:** For Phase 10, client/ files and design-kit/ files will have different names or the design-kit path will be distinct enough. No action needed now, but the planner should be aware for Phase 12 when design-kit specimens are added.

### Pitfall 3: import.meta.glob with `**/*` pattern loads binary files
**What goes wrong:** `design-kit/**/*` glob will match token CSS files, JSON, JS, and HTML — all as raw strings. CSS and JSON will parse fine as text, but the glob also matches any images or binary files placed under design-kit/ in the future.

**How to avoid:** Use specific extensions in design-kit glob: `/workspace/output/design-kit/**/*.{html,md}`. Token files (css, js, json) don't need to be loaded by the frontend since they're served directly as static files via Vite's serveWorkspace plugin.

### Pitfall 4: Vite serveWorkspace plugin serves nested paths — no change needed
**What goes wrong:** Developers might assume the serveWorkspace plugin needs updating for subdirectories.

**How to avoid:** Read the plugin implementation. It uses `req.url.startsWith('/workspace/')` and resolves with `path.resolve(__dirname, req.url.slice(1))` — this already handles any depth of path under `/workspace/`. No changes to vite.config.ts are required.

[VERIFIED: vite.config.ts serveWorkspace plugin reads directly — see line starting `const filePath = path.resolve(__dirname, req.url.slice(1))`]

### Pitfall 5: voice-fingerprint.md is optional
**What goes wrong:** Not all brand engagements produce a voice fingerprint. If no writing samples were provided, `workspace/research/voice-fingerprint.md` does not exist. An assembler that hard-requires it will fail.

**How to avoid:** Document Assembler instructions must make voice-fingerprint.md a conditional input: "Read if exists, skip fingerprint sections if absent." All new template sections (Quantitative Markers, Calibration Table, Language Bank) must be wrapped in "if voice-fingerprint absent, omit section" guards.

### Pitfall 6: `:root` regex edge cases in ui-kit.html and visual-system.html
**What goes wrong:** These files have more complex CSS structures than brand-foundation.html. `ui-kit.html` may have component-level `:root` overrides or scoped custom property declarations inside component demos.

**How to avoid:** The post-processor regex should specifically target the first `:root {}` block at the top of the `<style>` tag (the brand tokens block). Anchor the regex to start within the first `<style>` tag's content. Do not use a global replace.

---

## Complete File Inventory: Path Migration Scope

Every exact string that must change for FOUN-04.

### `.claude/agents/document-assembler.md`
Lines containing `workspace/output/`:
- Asset Pack Output Paths table: 8 paths → `workspace/output/client/[pack].html`
- Output Format headers: `workspace/output/brand-foundation.md` → `workspace/output/client/brand-foundation.md`
- Same for all 8 core output documents
- Asset Pack HTML Guidelines: `workspace/output/` → `workspace/output/client/`

### `.claude/agents/brand-verifier.md`
Lines containing `workspace/output/`:
- Level 1 Existence check list: 8 file paths
- Level 3-5 references to output files
- Asset Pack Verification paths

### `.claude/skills/brand-compass/export/SKILL.md`
Lines containing `workspace/output/`:
- Step 2: 8 core deliverable paths
- Step 5 table: 8 rows
- Asset pack paths

### `src/lib/content-loader.ts`
- Lines 19-30: replace 2 glob calls with ~4 glob calls (one per subdirectory per format)
- Lines 63-67: `loadOutputFiles()` — merge from all subdirectory collections
- Lines 70-73: `getFile()` — cover new path keys

### `src/lib/content-parser.ts`
Lines in `PHASE_CONTENT_MAP`:
- Phase 6 `outputFile`: `/workspace/output/voice-guide.md` → `/workspace/output/client/voice-guide.md`
- Phase 7 `outputFile`: `/workspace/drafts/visual-direction.md` — NO CHANGE (stays in drafts)
- Phase 8 `outputFile`: `/workspace/output/practical-toolkit.md` → `/workspace/output/client/practical-toolkit.md`

### `src/lib/phase-utils.ts`
Lines in `ASSET_PACKS` array:
- 8 `outputFile` strings: `workspace/output/[pack].html` → `workspace/output/client/[pack].html`

### `src/components/OutputPage.tsx`
Lines in `deliverables` array:
- 9 `filename` strings across `files` arrays → add `client/` prefix
- Asset pack section: path construction → add `client/` prefix

### `src/components/OutputViewer.tsx`
- Line 37: `const srcUrl = \`/workspace/output/${filename}\`` → `const srcUrl = \`/workspace/output/${filePath}\``
- Line 75: breadcrumb path display — may need adjustment

---

## Token Extraction Step: Implementation Decision

**Recommendation:** Implement as a new agent definition at `.claude/agents/token-extractor.md`.

**Rationale:**
- All existing brand output logic lives in agents. Consistency.
- Read/Write/Glob/Grep tool set is sufficient for reading visual-direction.md and writing 5 text files.
- The post-processor can be a second agent OR combined into the same agent (token-extractor handles both token file generation and design-kit HTML post-processing).
- A standalone bash/node script would introduce a new paradigm (scripts/) with its own invocation mechanism — adds complexity without benefit.

**Combined agent approach (recommended):** A single `design-kit-foundation.md` agent that (1) reads visual-direction.md, (2) writes 5 token files, (3) reads each client/ HTML file, (4) post-processes them into design-kit/ HTML files. This is one task with one data source and sequential steps — no reason to split.

**Trigger:** Invoked by the Document Assembler (or by the Phase 8 skill) after client HTML specimens are complete, same way Image Generator is triggered after Visual Director completes.

[ASSUMED: The combined agent approach is recommended based on codebase patterns, but whether to split into two agents is Claude's discretion per D-01 context.]

---

## Environment Availability

Step 2.6 SKIPPED — Phase 10 is purely code/file editing. No external tools, services, runtimes, CLIs, or databases beyond what the project already uses. Vite dev server and Node.js are already confirmed in use.

---

## Validation Architecture

No test framework detected in the project. [VERIFIED: STACK.md line 64 — "No testing framework detected (no Jest, Vitest, or similar in dependencies)"]

`workflow.nyquist_validation` is not set in `.planning/config.json` (only `_auto_chain_active: false` present) — treating as absent/disabled given no test framework exists.

**Manual verification approach** (what the planner should specify as acceptance criteria):

| Requirement | Verification Method |
|-------------|-------------------|
| FOUN-01 | After running token extractor on example-brand visual-direction.md, 5 files exist at `workspace/output/design-kit/tokens/` with correct CSS/JSON content |
| FOUN-02 | Opening a design-kit HTML specimen in a browser with token files present renders correctly; opening without token files shows unstyled HTML |
| FOUN-03 | `ls workspace/output/` shows 3 directories: client/, skill-bundle/, design-kit/ |
| FOUN-04 | Frontend loads at `localhost:3001` with no broken paths; OutputPage shows brand kit files from client/ |
| FOUN-05 | Voice-guide.md contains Quantitative Markers section and Calibration Table when voice-fingerprint.md is present |

---

## Security Domain

Not applicable. This phase edits local markdown files, TypeScript source files, and agent definitions. No authentication, no user input, no cryptographic operations, no external APIs.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Flat `workspace/output/` | Three-bundle `client/`, `skill-bundle/`, `design-kit/` | Phase 10 (this phase) | Downstream agents (Phase 11, 12) have clean separate directories to write into |
| Inline tokens in all HTML | Client: inline; design-kit: external link | Phase 10 | Design kit becomes a self-contained consumable package for designers/tools |
| Voice-fingerprint isolated in research/ | Voice-fingerprint woven into assembled output | Phase 10 | voice-guide.md and practical-toolkit.md gain evidence-based voice markers |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Tailwind v3 format used for design-kit tailwind.config.js handoff artifact | Code Examples — Pattern 3 | Design kit recipient can't use the config if their project uses v4. Low risk — the file is an example artifact, easily re-formatted. |
| A2 | Combined agent approach for token extractor + post-processor is recommended | Token Extraction Step section | If the planner has a reason to separate concerns, two agents are equally valid. |

---

## Open Questions

1. **Does the Document Assembler need to explicitly trigger the token extractor/post-processor, or is that a separate Phase 8 orchestration step?**
   - What we know: D-01 says the extraction step is "owned by Phase 10" but doesn't specify its trigger mechanism
   - What's unclear: Whether the extractor runs automatically after Phase 7 (similar to how Visual Director is blocking) or is manually invoked
   - Recommendation: The planner should define the trigger in the Document Assembler definition OR in the Phase 8 skill file. Given Phase 10's scope, just establish the agent — Phase 13 (Integration) is where Phase 8 skill orchestration is updated (INTG-04).

2. **Should `workspace/output/skill-bundle/` and `workspace/output/design-kit/` directories be created as empty directories in the workspace now?**
   - What we know: Git does not track empty directories; Vite glob will return `{}` gracefully for empty dirs
   - What's unclear: Whether creating `.gitkeep` files is needed
   - Recommendation: Add `.gitkeep` to `skill-bundle/` and `design-kit/tokens/` so the directory structure is visible in the repo before Phases 11/12 run. Not strictly required but helpful.

---

## Sources

### Primary (HIGH confidence)
- `workspace/reference/example-brand/output/brand-foundation.html` — verified `:root` block structure
- `workspace/reference/example-brand/drafts/visual-direction.md` — verified CSS Custom Properties Block structure and Design System Parameters section
- `workspace/reference/example-brand/research/voice-fingerprint.md` — verified voice-fingerprint.md sections (Quantitative Markers, Calibration Guide, Recurring Phrases)
- `src/lib/content-loader.ts` — verified `import.meta.glob` static string pattern
- `vite.config.ts` — verified serveWorkspace plugin handles arbitrary depth under /workspace/
- `.claude/agents/document-assembler.md` — verified existing output paths, DTCG format, CSS block embedding pattern
- `.claude/agents/brand-verifier.md` — verified all path references to update
- `.claude/skills/brand-compass/export/SKILL.md` — verified all path references to update
- `src/components/OutputPage.tsx` — verified hardcoded path strings
- `src/components/OutputViewer.tsx` — verified srcUrl construction vulnerability
- `src/lib/content-parser.ts` — verified PHASE_CONTENT_MAP outputFile paths
- `src/lib/phase-utils.ts` — verified ASSET_PACKS outputFile strings

### Secondary (MEDIUM confidence)
- `.planning/codebase/ARCHITECTURE.md` — architectural patterns confirmed (build-time loading, static file serving)
- `.planning/codebase/STACK.md` — confirmed no test framework, Vite 7.2.4, TypeScript 5.9.3

### Tertiary (LOW confidence)
- None.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new libraries; all existing tools verified
- Architecture: HIGH — every file to change identified and read; patterns verified against actual code
- Pitfalls: HIGH — derived from direct code reading, not inference
- Token file formats: HIGH (DTCG, CSS) / ASSUMED (tailwind.config.js version)

**Research date:** 2026-04-19
**Valid until:** 2026-06-01 (stable codebase — no external dependencies that might change)
