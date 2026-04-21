# Phase 10: Output Foundation - Pattern Map

**Mapped:** 2026-04-19
**Files analyzed:** 9 files to create or modify
**Analogs found:** 9 / 9

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `.claude/agents/document-assembler.md` | agent definition | transform (input list + template slots) | itself (targeted additions) | self |
| `.claude/agents/brand-verifier.md` | agent definition | config/path migration | `.claude/agents/document-assembler.md` | role-match |
| `.claude/skills/brand-compass/export/SKILL.md` | skill definition | config/path migration | `.claude/agents/brand-verifier.md` | role-match |
| `src/lib/content-loader.ts` | utility | file I/O (build-time glob) | itself (targeted additions) | self |
| `src/lib/content-parser.ts` | utility | transform (path mapping) | itself (targeted path string replacements) | self |
| `src/lib/phase-utils.ts` | utility | config data | itself (targeted path string replacements) | self |
| `src/components/OutputPage.tsx` | component | request-response (HEAD checks + render) | itself (targeted path string replacements) | self |
| `src/components/OutputViewer.tsx` | component | request-response (fetch + iframe/render) | itself (targeted srcUrl fix) | self |
| `.claude/agents/design-kit-foundation.md` | agent definition | file I/O + transform (read → write token files + post-process HTML) | `.claude/agents/image-generator.md` | role-match |

---

## Pattern Assignments

### `.claude/agents/document-assembler.md` — additions only

**What changes:** Three targeted additions to the existing file.
1. Add `voice-fingerprint.md` to the `## Input` section (D-10)
2. Add two new sections to the `voice-guide.md` template: Quantitative Voice Markers (after Section 3) and Voice Calibration Table (after Section 5) (D-11, D-13)
3. Replace `Language Bank` in `practical-toolkit.md` template with the Codify/Retire structure (D-12)
4. Add conflict-surface instructions (D-14)
5. Update all `workspace/output/` paths to `workspace/output/client/` (D-04)

**Input section pattern** (document-assembler.md lines 23-30) — copy format for new entry:
```markdown
## Input
- `workspace/STATE.md` for project status
- `workspace/drafts/visual-direction.md` for design system parameters and personality guidance (**required** for HTML outputs)
- All files in `workspace/research/` directory
- All files in `workspace/drafts/` directory
- Conversation context for decisions not yet documented
- Phase 5 boilerplates from `workspace/research/phase-5-messaging.md` or `workspace/drafts/messaging-options.md` (for GEO citation reformatting)
```
New entry to add (conditional pattern used elsewhere in the file):
```markdown
- `workspace/research/voice-fingerprint.md` for voice-dependent outputs (voice-guide.md, voice-guide.html, practical-toolkit.md). If absent, skip fingerprint sections.
```

**voice-guide.md template** (document-assembler.md lines 293-369) — existing structure to insert after:
- New `## Section 3b: Quantitative Voice Markers` goes after the closing `---` of Section 3 (line ~335) and before `## Section 4: Signature Moves`
- New `## Section 5b: Voice Calibration Table` goes after the closing `---` of Section 5 (line ~354) and before `## Section 6: Scaling by Context`

**practical-toolkit.md Language Bank** (document-assembler.md lines 702-712) — current form to replace:
```markdown
## Language Bank

### Phrases I Use
[From voice analysis + signature moves]

### Phrases I Never Use
[From guardrails]

### Say This / Not That
[Word substitutions]
```
Replace with the Codify/Retire structure from RESEARCH.md Pattern 4.

**Asset Pack Output Paths table** (document-assembler.md lines 103-114) — all 8 paths add `client/` prefix.

**Output Format headers** (document-assembler.md lines 192-614+) — all `workspace/output/X` → `workspace/output/client/X`.

---

### `.claude/agents/brand-verifier.md` — path migration only

**What changes:** All `workspace/output/` path strings in the file become `workspace/output/client/`.

**Affected sections** (brand-verifier.md lines 47-55 — Level 1 Existence check list):
```markdown
**Phase 8 (Assembly):**
- `workspace/output/brand-foundation.md`
- `workspace/output/brand-foundation.html`
- `workspace/output/voice-guide.md`
- `workspace/output/voice-guide.html`
- `workspace/output/color-palette.html`
- `workspace/output/visual-system.html`
- `workspace/output/ui-kit.html`
- `workspace/output/practical-toolkit.md`
```
Each path → add `client/` prefix.

**Pattern for All files in directory** (brand-verifier.md line 24):
```markdown
- All files in `workspace/output/` directory
```
This becomes:
```markdown
- All files in `workspace/output/client/` directory
```

All Level 3-6 references to specific output file paths follow the same replacement pattern.

---

### `.claude/skills/brand-compass/export/SKILL.md` — path migration only

**What changes:** All `workspace/output/` path strings → `workspace/output/client/`.

**Step 2 list** (export/SKILL.md lines 21-29) — 8 paths, each gets `client/` prefix.

**Step 5 summary table** (export/SKILL.md lines 71-83) — Location column entries, each gets `client/` prefix.

**Pattern for the table row format** (copy from lines 72-80):
```markdown
| Brand Foundation | Markdown | `workspace/output/brand-foundation.md` |
| Brand Foundation | HTML Specimen | `workspace/output/brand-foundation.html` |
```
→ becomes `workspace/output/client/brand-foundation.md` etc.

---

### `src/lib/content-loader.ts` — glob expansion + function updates

**Analog:** itself — Pattern 1 from RESEARCH.md exactly matches what is already in the file.

**Current glob pattern** (content-loader.ts lines 19-29) — the exact pattern to replace:
```typescript
const outputMdFiles = import.meta.glob('/workspace/output/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const outputHtmlFiles = import.meta.glob('/workspace/output/*.html', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>
```

**Replacement pattern** — four static glob calls following the same structure as the existing `researchFiles` and `draftFiles` globs above (lines 7-17):
```typescript
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

const skillBundleFiles = import.meta.glob('/workspace/output/skill-bundle/**/*.{html,md}', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const designKitFiles = import.meta.glob('/workspace/output/design-kit/**/*.{html,md}', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>
```
Note: use `**/*.{html,md}` for the two new subdirectories to avoid loading binary files (Pitfall 3 from RESEARCH.md).

**`loadOutputFiles()` current form** (content-loader.ts lines 62-67):
```typescript
export function loadOutputFiles(): ContentFile[] {
  return [
    ...toContentFiles(outputMdFiles, 'output', 'md'),
    ...toContentFiles(outputHtmlFiles, 'output', 'html'),
  ]
}
```
Update to spread all four new glob results. `directory` stays `'output'`; format is derived from file extension via `toContentFiles` — the existing format detection works since the helper reads the extension from the path.

**`getFile()` current form** (content-loader.ts lines 69-73):
```typescript
export function getFile(path: string): string | null {
  return (
    researchFiles[path] ?? draftFiles[path] ?? outputMdFiles[path] ?? outputHtmlFiles[path] ?? null
  )
}
```
Update to look up all four new output glob maps.

**`hasOutputFiles()` current form** (content-loader.ts lines 83-85):
```typescript
export function hasOutputFiles(): boolean {
  return Object.keys(outputMdFiles).length > 0 || Object.keys(outputHtmlFiles).length > 0
}
```
Update to check any of the four new maps. Empty-state handling: `Object.keys({}).length > 0` returns `false` naturally — no crash on empty directories (Pitfall, RESEARCH.md D-06).

---

### `src/lib/content-parser.ts` — path string replacements only

**What changes:** Three `outputFile` string values in `PHASE_CONTENT_MAP` (content-parser.ts lines 80-90).

**Current values** (lines 80-90):
```typescript
6: {
  outputFile: '/workspace/output/voice-guide.md',
  ...
},
7: {
  outputFile: '/workspace/drafts/visual-direction.md',  // NO CHANGE — stays in drafts
  ...
},
8: {
  outputFile: '/workspace/output/practical-toolkit.md',
},
```

**After migration:**
- Phase 6 `outputFile`: `/workspace/output/client/voice-guide.md`
- Phase 7 `outputFile`: `/workspace/drafts/visual-direction.md` — **unchanged**
- Phase 8 `outputFile`: `/workspace/output/client/practical-toolkit.md`

The `brand-foundation.md` lookup on line 111 (`getFile('/workspace/output/brand-foundation.md')`) also needs updating to `/workspace/output/client/brand-foundation.md`.

---

### `src/lib/phase-utils.ts` — path string replacements only

**What changes:** All 8 `outputFile` string values in the `ASSET_PACKS` array (phase-utils.ts lines 143-201).

**Current pattern** (phase-utils.ts lines 143-145):
```typescript
{
  id: 'social-media-kit',
  ...
  outputFile: 'workspace/output/social-media-kit.html',
},
```

**After migration:** `'workspace/output/client/social-media-kit.html'` for all 8 packs. The prefix `workspace/output/` becomes `workspace/output/client/` in every `outputFile` value.

---

### `src/components/OutputPage.tsx` — path string replacements + empty-state handling

**What changes:**
1. All `filename` strings in the `deliverables` array add `client/` into the path
2. `Link to` route changes: `basename` is used for the route — this must change to pass the full subdirectory-qualified path to the viewer (see OutputViewer pitfall below)
3. Asset pack section path construction

**Current `deliverables` pattern** (OutputPage.tsx lines 10-47):
```typescript
const deliverables = [
  {
    title: 'Brand Foundation',
    files: [
      { filename: 'workspace/output/brand-foundation.md', format: 'MD' },
      { filename: 'workspace/output/brand-foundation.html', format: 'HTML' },
    ],
    ...
  },
  ...
]
```
After migration, `filename` values become `workspace/output/client/brand-foundation.md`, etc.

**Route link pattern** (OutputPage.tsx line 107-108) — current:
```typescript
<Link to={`/output/view/${basename}`}>
```
After migration, `basename` (just the filename without directory) will break `OutputViewer` since it won't know the subdirectory. The route should use the full path relative to `workspace/output/`:
```typescript
const subPath = f.filename.replace('workspace/output/', '')
<Link to={`/output/view/${subPath}`}>
```
This makes `filePath` in OutputViewer equal to `client/brand-foundation.html`, which is exactly what `srcUrl` needs.

**Asset pack section** (OutputPage.tsx lines 164-192) — same pattern: use full subpath, not basename, for the `Link to` route.

**Empty-state handling for new bundles** (add after the existing `deliverables` section) — follow the existing `!anyExist ? 'opacity-50' : ''` pattern from line 92 for the card opacity. New bundle sections (Skill Bundle, Design Kit) should render as `opacity-50` cards with a "Coming in Phase 11/12" note when no files exist in those directories. The `fileExists` state check via `fetch HEAD` already returns `false` for non-existent files — use the same pattern.

---

### `src/components/OutputViewer.tsx` — srcUrl fix + breadcrumb update

**Current broken line** (OutputViewer.tsx line 37):
```typescript
const srcUrl = `/workspace/output/${filename}`
```
`filename` is derived on line 34 as `filePath?.split('/').pop() ?? ''` — this strips subdirectory info.

**Fix** (per RESEARCH.md Pitfall 1):
```typescript
const filename = filePath?.split('/').pop() ?? ''   // Keep for title lookup and extension detection
const srcUrl = `/workspace/output/${filePath}`       // Use full path for actual URL
```
`filePath` is already `const { '*': filePath } = useParams()` (line 29), so it captures the full wildcard match — `client/brand-foundation.html`, `design-kit/color-palette.html`, etc.

**Breadcrumb path display** (OutputViewer.tsx line 75) — current:
```typescript
<p className="text-xs font-mono text-muted-foreground">{`workspace/output/${filename}`}</p>
```
Update to use `filePath` for the accurate full path:
```typescript
<p className="text-xs font-mono text-muted-foreground">{`workspace/output/${filePath}`}</p>
```

`fileTitles` lookup (line 36) uses `filename` (basename only) — this remains correct since the map is keyed by basename.

---

### `.claude/agents/design-kit-foundation.md` — net new agent

**Analog:** `.claude/agents/image-generator.md` — same pattern: downstream agent that reads from `workspace/drafts/`, reads existing output files from Document Assembler, and writes new output files.

**Agent frontmatter pattern** (image-generator.md lines 1-14):
```markdown
---
name: image-generator
description: >
  Generates visual assets based on approved visual direction — mark explorations,
  color specimens, imagery samples. Only runs after client approves visual
  direction from the Visual Director.

  **Triggers:**
  - Visual direction has been approved by client
  - Lead strategist requests specific asset generation

model: sonnet
tools: Read, Write, Bash
---
```
New agent frontmatter follows this structure. Use `tools: Read, Write, Glob, Grep` (not `Bash`) — matches document-assembler and brand-verifier pattern since this agent reads/writes files and does text processing, not shell commands.

**Input section pattern** (image-generator.md lines 18-22):
```markdown
## Input
- Approved visual direction from `workspace/drafts/visual-direction.md`
- Specific asset request (mark explorations, color palette specimen, illustration samples)
- Any refinement notes from client
```

**Output location pattern** (image-generator.md lines 51-55):
```markdown
## Output Location
Write to `workspace/assets/[type]/`:
- `workspace/assets/mark-explorations/`
```

**Task structure pattern** (image-generator.md lines 23-50) — sequential named tasks with ### headings. Follow this for the two tasks: (1) token extraction, (2) HTML post-processing.

**Combined agent scope** (per RESEARCH.md recommendation): single agent with two sequential tasks:
1. **Token Extraction** — reads `workspace/drafts/visual-direction.md`, extracts the CSS Custom Properties Block, writes 5 files to `workspace/output/design-kit/tokens/`
2. **HTML Post-Processing** — reads each HTML file from `workspace/output/client/`, extracts `:root` block via regex (Pattern 2 from RESEARCH.md), replaces with `<link>` tags pointing to `../tokens/`, writes to `workspace/output/design-kit/`

**Trigger pattern** — document-assembler triggers it after client HTML specimens are complete, same way Visual Director triggers Image Generator. Add trigger reference in the document-assembler's output section instructions.

---

## Shared Patterns

### Agent Definition Frontmatter
**Source:** `.claude/agents/document-assembler.md` lines 1-20 / `.claude/agents/image-generator.md` lines 1-14
**Apply to:** New `design-kit-foundation.md` agent
```markdown
---
name: [agent-name]
description: >
  [description]

  **Triggers:**
  - [trigger 1]

model: sonnet
tools: Read, Write, Glob, Grep
---
```
All existing agents use `sonnet` model except `visual-director.md` (uses `opus`). New extraction/processing agent uses `sonnet`. Tool set is `Read, Write, Glob, Grep` for file-processing agents (document-assembler, brand-verifier pattern) — `Bash` only when shell commands are needed.

### Conditional File Handling (optional inputs)
**Source:** `.claude/agents/brand-verifier.md` lines 40-43
**Apply to:** Document Assembler additions for voice-fingerprint (D-10), new design-kit-foundation agent
```markdown
- `workspace/research/voice-fingerprint.md` (optional — may be generated as early as Phase 1 if writing samples were provided; skip if absent)
```
Pattern: parenthetical `(optional — [condition]; skip if absent)` for optional inputs.

### Static Vite Glob Pattern
**Source:** `src/lib/content-loader.ts` lines 7-29
**Apply to:** New subdirectory glob calls in `content-loader.ts`
```typescript
const [varName] = import.meta.glob('/workspace/[path]/*.{ext,ext}', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>
```
Every glob call must be a string literal. Each directory/format combination needs its own call.

### Empty State Component Pattern
**Source:** `src/components/OutputViewer.tsx` lines 91-105
**Apply to:** New bundle sections in `OutputPage.tsx`
```typescript
{fileExists === false || error ? (
  <div className="h-full flex items-center justify-center rounded-lg border border-dashed border-border bg-card">
    <div className="text-center space-y-2">
      <p className="text-sm text-muted-foreground">
        {error ?? `This file hasn't been generated yet.`}
      </p>
    </div>
  </div>
) : ...}
```
Dim cards with `opacity-50` for files not yet generated (OutputPage.tsx line 92 pattern). No crash — just visual state.

---

## No Analog Found

All files have close matches. No entries in this table.

---

## Metadata

**Analog search scope:** `.claude/agents/`, `.claude/skills/brand-compass/export/`, `src/lib/`, `src/components/`
**Files scanned:** 9 (all files to be modified) + 3 analog reference files (image-generator.md, visual-director.md, brand-verifier.md)
**Pattern extraction date:** 2026-04-19
