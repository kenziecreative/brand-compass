---
phase: 13-integration
reviewed: 2026-04-20T00:00:00Z
depth: standard
files_reviewed: 15
files_reviewed_list:
  - src/components/OutputPage.tsx
  - src/components/OutputViewer.tsx
  - .claude/agents/brand-verifier.md
  - CLAUDE.md
  - .claude/skills/brand-compass/phase-8-toolkit/SKILL.md
  - .claude/skills/brand-compass/export/SKILL.md
  - .claude/skills/brand-compass/phase-1-origin/SKILL.md
  - .claude/skills/brand-compass/phase-2-audience/SKILL.md
  - .claude/skills/brand-compass/phase-3-positioning/SKILL.md
  - .claude/skills/brand-compass/phase-4-personality/SKILL.md
  - .claude/skills/brand-compass/phase-5-messaging/SKILL.md
  - .claude/skills/brand-compass/phase-6-voice/SKILL.md
  - .claude/skills/brand-compass/phase-7-visual/SKILL.md
  - .claude/skills/brand-compass/checkpoint-a/SKILL.md
  - .claude/skills/brand-compass/checkpoint-b/SKILL.md
findings:
  critical: 0
  warning: 4
  info: 3
  total: 7
status: issues_found
---

# Phase 13: Code Review Report

**Reviewed:** 2026-04-20
**Depth:** standard
**Files Reviewed:** 15
**Status:** issues_found

## Summary

Two TypeScript component files (OutputPage.tsx, OutputViewer.tsx), one agent definition (brand-verifier.md), the orchestration CLAUDE.md, and all phase SKILL.md files were reviewed. The skill files and CLAUDE.md are internally consistent and well-structured. No security vulnerabilities or data-loss risks were found.

Four warnings were found: one missing deliverable in the Brand Kit UI (practical-toolkit.md is never linked), one dead UI element (Export All button has no handler), one filename mismatch between phase-utils.ts and the rest of the codebase that will cause a broken agent output indicator in Phase 3, and one subtle content-type detection flaw in OutputViewer. Three info-level items round out the review.

---

## Warnings

### WR-01: `practical-toolkit.md` missing from OutputPage deliverables array

**File:** `src/components/OutputPage.tsx:10-69`
**Issue:** The `deliverables` constant defines all deliverables rendered on the Brand Kit page. `workspace/output/client/practical-toolkit.md` is absent from this array, even though it is listed in `OutputViewer.tsx`'s `fileTitles` map (line 17), referenced in `content-parser.ts` (line 89), expected by `brand-verifier.md` (Level 1 existence check, line 57), and produced by the Document Assembler (phase-8-toolkit SKILL.md Step 5). The file is generated but never shown in the UI — the client cannot navigate to it from the Brand Kit page.

**Fix:** Add a `practical-toolkit.md` entry to the `deliverables` array:
```tsx
{
  title: 'Practical Toolkit',
  files: [
    { filename: 'workspace/output/client/practical-toolkit.md', format: 'MD' },
  ],
  description: 'Bios, pitches, decision filter, content territories, language bank, GEO-ready outputs.',
  icon: FileText,
},
```

---

### WR-02: "Export All" button has no `onClick` handler — dead UI element

**File:** `src/components/OutputPage.tsx:242-246`
**Issue:** The Export All button renders when `allReady` is true but has no `onClick` handler. Clicking it does nothing. Users completing Phase 8 will see the button and expect it to trigger a download or packaging action that never fires. This is a functional gap, not just cosmetic — the button is the primary call-to-action at the end of the flow.

```tsx
// Current — no handler
<Button variant="accent" className="gap-2">
  <Download className="size-4" />
  Export All ({totalFiles} files)
</Button>
```

**Fix:** Either implement the export handler or replace with a visible placeholder that communicates the feature is coming. If export is out of scope for this phase, a disabled state with a tooltip is preferable to a silent no-op:
```tsx
<Button variant="accent" className="gap-2" disabled title="Export coming soon">
  <Download className="size-4" />
  Export All ({totalFiles} files)
</Button>
```

---

### WR-03: Phase 3 `agentOutputFile` filename mismatch — agent output indicator will always show absent

**File:** `src/lib/phase-utils.ts:53`
**Issue:** The Phase 3 config uses `agentOutputFile: 'workspace/research/competitive-landscape.md'`. Every other reference to this file in the codebase uses the correct filename `competitive-brief.md`:
- `src/lib/content-parser.ts` lines 62 and 67: `/workspace/research/competitive-brief.md`
- `.claude/agents/brand-verifier.md` Level 4 coverage check
- `.claude/skills/brand-compass/phase-3-positioning/SKILL.md` Step 1 prerequisite check
- `.claude/skills/brand-compass/phase-2-audience/SKILL.md` Step 4

Any UI component that uses `agentOutputFile` to check whether the Research Analyst output exists for Phase 3 will look for the wrong filename and never find the file, causing the indicator to show "missing" even after the agent has run successfully.

**Fix:**
```ts
// phase-utils.ts line 53 — change:
agentOutputFile: 'workspace/research/competitive-landscape.md',
// to:
agentOutputFile: 'workspace/research/competitive-brief.md',
```

Also update the `discoveryOutputKeys` on line 49 — `'competitive-landscape'` should be `'competitive-brief'` if that key is used for any lookup.

---

### WR-04: Content-type check in OutputViewer has incorrect operator precedence — null header treated as valid

**File:** `src/components/OutputViewer.tsx:62`
**Issue:** The condition `r.headers.get('content-type')?.includes('text/html') === false` has a subtle operator-precedence bug. The `=== false` comparison binds to the result of the optional chain, not the whole expression. When `content-type` is absent (header returns `null`), `null?.includes('text/html')` evaluates to `undefined`, and `undefined === false` is `false`. The overall condition then becomes `!r.ok || false`, meaning any 200 response with a missing Content-Type header is treated as a valid HTML file. In the dev server (Vite), static files are always served with correct headers, so this is latent rather than currently failing — but it is a logic error.

```ts
// Current — broken when content-type is null
if (!r.ok || r.headers.get('content-type')?.includes('text/html') === false) {
```

**Fix:** Restructure the check so a missing or non-HTML content-type explicitly fails:
```ts
const contentType = r.headers.get('content-type')
if (!r.ok || !contentType || !contentType.includes('text/html')) {
  setFileExists(false)
} else {
  setFileExists(true)
}
```

---

## Info

### IN-01: `useEffect` dependency suppression is misleading

**File:** `src/components/OutputPage.tsx:95`
**Issue:** `allPaths` is computed inline on every render but the `useEffect` that uses it has an empty `[]` dependency array with the exhaustive-deps rule suppressed. In practice this is not a runtime bug because `loadState()` reads build-time static data via `import.meta.glob` with `eager: true` — the value never changes at runtime. However, the suppression comment creates a maintenance hazard: if `loadState` is ever changed to fetch dynamic data, the effect will silently use stale paths. The comment also signals to future readers that this is intentional when the real fix would be straightforward.

**Fix:** Memoize `allPaths` with `useMemo` and use it as the dependency, then remove the suppression comment:
```tsx
const allPaths = useMemo(
  () => [
    ...deliverables.flatMap(d => d.files.map(f => f.filename)),
    ...(state?.client?.assetPacks ?? [])
      .map(id => getAssetPack(id)?.outputFile)
      .filter((p): p is string => !!p),
  ],
  [state?.client?.assetPacks]
)

useEffect(() => {
  // ... fetch checks
}, [allPaths])
```

---

### IN-02: `filePath` from URL params flows unsanitized into fetch and iframe src

**File:** `src/components/OutputViewer.tsx:45`
**Issue:** `filePath` is taken directly from the React Router wildcard param and composed into `srcUrl` as `/workspace/output/${filePath}` with no normalization or validation. A crafted URL like `/output/view/../../public/some-file` would issue a request to `/workspace/../../public/some-file`. In a browser SPA served from Vite this does not enable server-side traversal, but if the app is ever served from a production server with static file serving, this could be used to fetch or iframe arbitrary files outside `workspace/output/`. Additionally, the `sandbox="allow-scripts allow-same-origin"` on the iframe (line 124) allows `allow-same-origin`, which means sandboxed scripts can access the parent frame's cookies and localStorage.

**Fix:** Validate `filePath` against the known allowlist of output paths before using it, or at minimum normalize it by stripping `..` segments:
```ts
const safePath = filePath?.replace(/\.\.\//g, '').replace(/^\//, '') ?? ''
const srcUrl = `/workspace/output/${safePath}`
```

For the iframe sandbox, dropping `allow-same-origin` would be safer if the HTML files do not need to read parent-frame storage.

---

### IN-03: `brand-verifier.md` Level 7B word-count threshold for `brand-prompt.md` may be too narrow

**File:** `.claude/agents/brand-verifier.md:247`
**Issue:** Level 7B checks that `brand-prompt.md` is between 150 and 300 words and flags it Critical if outside that range. The upper bound of 300 words is fairly tight for a brand prompt that must capture positioning, personality, voice, audience, and guardrails for a full brand system. Complex clients with multiple audience segments or rich voice profiles may legitimately exceed 300 words. A Critical flag at 301 words would block delivery of an otherwise valid deliverable.

**Fix:** Consider changing the upper-bound violation to a Warning rather than Critical, or widening the window to 150-400 words. The lower bound Critical (under 150) is appropriate — an underpopulated brand prompt is a real quality failure.

---

_Reviewed: 2026-04-20_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
