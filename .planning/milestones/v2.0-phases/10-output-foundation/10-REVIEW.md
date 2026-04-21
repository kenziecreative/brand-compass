---
phase: 10-output-foundation
reviewed: 2026-04-19T00:00:00Z
depth: standard
files_reviewed: 5
files_reviewed_list:
  - src/lib/content-loader.ts
  - src/lib/content-parser.ts
  - src/lib/phase-utils.ts
  - src/components/OutputPage.tsx
  - src/components/OutputViewer.tsx
findings:
  critical: 0
  warning: 4
  info: 3
  total: 7
status: issues_found
---

# Phase 10: Code Review Report

**Reviewed:** 2026-04-19
**Depth:** standard
**Files Reviewed:** 5
**Status:** issues_found

## Summary

Five files implementing the output foundation layer were reviewed: the content loader (build-time glob), the content parser (markdown section extraction), phase configuration utilities, and the two output UI components. The code is generally well-structured and TypeScript-typed throughout. No security vulnerabilities were found.

Four warnings were identified: a broken content-type guard in `OutputViewer`, a potential empty-filename bug in `content-loader`, an unsafe `filePath` reference that silently corrupts the URL if the param is undefined, and an `eslint-disable` comment that suppresses a legitimate dependency warning while masking the actual intent. Three info-level items cover a data inconsistency between `content-parser` and `phase-utils`, a minor section-parsing edge case, and a silently-uncovered asset pack scenario.

---

## Warnings

### WR-01: Inverted content-type guard never sets fileExists(false) correctly

**File:** `src/components/OutputViewer.tsx:54`

**Issue:** The condition `r.headers.get('content-type')?.includes('text/html') === false` is logically broken. When `content-type` is `text/html`, the expression evaluates `true === false` which is `false`, so `setFileExists(false)` is never reached for the HTML branch. When `content-type` is absent, `undefined === false` is also `false`. The only code path that actually sets `fileExists(false)` is `!r.ok`. The content-type check is effectively dead code and the intent (detecting a redirect to the app's own HTML shell returning a 200 for a missing workspace file) is not achieved.

**Fix:** Use the actual `content-type` check as the primary guard, or remove it entirely since the dev server in `vite.config.ts` already returns a 404 for missing workspace files. The simplest correct form:

```ts
fetch(srcUrl, { method: 'HEAD' })
  .then(r => setFileExists(r.ok))
  .catch(() => setFileExists(false))
```

If the intent is to detect SPA fallthrough (a 200 with `text/html` meaning "file not found"), the guard needs to be affirmative, not negated:

```ts
const ct = r.headers.get('content-type') ?? ''
if (!r.ok || ct.includes('text/html')) {
  setFileExists(false)
} else {
  setFileExists(true)
}
```

---

### WR-02: filePath undefined produces a silent URL corruption

**File:** `src/components/OutputViewer.tsx:34-37`

**Issue:** `filePath` is typed as `string | undefined` from `useParams()`. Line 37 builds `srcUrl` with direct interpolation: `` const srcUrl = `/workspace/output/${filePath}` ``. If a user navigates directly to `/output/view/` with no trailing path, `filePath` is `undefined` and `srcUrl` becomes the string `/workspace/output/undefined` — a valid URL that silently fetches the wrong path. The same undefined value is also displayed to the user at line 75 in the path display.

**Fix:** Guard early and short-circuit to an error state:

```ts
const { '*': filePath } = useParams()

if (!filePath) {
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-sm text-muted-foreground">No file specified.</p>
    </div>
  )
}
```

Alternatively, narrow the type after the params destructure and handle it before the `useEffect` and JSX that depend on it.

---

### WR-03: Empty filename produced for paths ending with '/'

**File:** `src/lib/content-loader.ts:59`

**Issue:** `path.split('/').pop()` returns an empty string `''` for any path ending with `/` (e.g., `'/workspace/output/client/'`). The nullish coalescing operator `?? path` only kicks in for `null` or `undefined` — an empty string is falsy but not nullish, so the filename is silently set to `''`. This won't happen with typical `import.meta.glob` results, but any path that ends in a trailing slash (e.g., from a misconfigured glob or a future directory entry) will produce a `ContentFile` with `filename: ''` that is impossible to match on.

**Fix:** Guard against the empty string explicitly:

```ts
filename: path.split('/').pop() || path,
```

Using `||` instead of `??` catches both `null`/`undefined` and `''`.

---

### WR-04: useEffect dependency suppression hides stale closure risk

**File:** `src/components/OutputPage.tsx:64-74`

**Issue:** The `useEffect` that fires HEAD checks has `// eslint-disable-next-line react-hooks/exhaustive-deps` suppressing its dependency array. The actual dependencies — `allPaths` (which depends on `state` and `fileExists` indirectly via `allPaths`) — are excluded. The intent is a one-time check on mount, but `allPaths` is reconstructed on every render. If `state` ever changes (e.g., asset packs are added in a future session where state is reactive), the file existence checks will never re-run because the stale deps array remains `[]`. More immediately, suppression means there's no enforcement of the intent — the empty array `[]` should be explicit and the comment should explain the deliberate choice.

**Fix:** Memoize `allPaths` so that the dependency can be expressed honestly, and remove the suppression:

```tsx
const allPaths = useMemo(() => {
  const corePaths = deliverables.flatMap(d => d.files.map(f => f.filename))
  const packPaths = (state?.client?.assetPacks ?? [])
    .map(id => getAssetPack(id)?.outputFile)
    .filter((p): p is string => !!p)
  return [...corePaths, ...packPaths]
}, [state?.client?.assetPacks])

useEffect(() => {
  const checks = allPaths.map(path =>
    fetch(`/${path}`, { method: 'HEAD' })
      .then(r => [path, r.ok] as const)
      .catch(() => [path, false] as const),
  )
  Promise.all(checks).then(results => {
    setFileExists(Object.fromEntries(results))
  })
}, [allPaths])
```

---

## Info

### IN-01: Phase 3 research file mismatch between content-parser and phase-utils

**File:** `src/lib/content-parser.ts:62` and `src/lib/phase-utils.ts:53`

**Issue:** `content-parser.ts` references `competitive-brief.md` as the Phase 3 research file (line 62), but `phase-utils.ts` lists `agentOutputFile: 'workspace/research/competitive-landscape.md'` for Phase 3 (line 53). These two sources of truth are inconsistent. If the Research Analyst writes to `competitive-landscape.md`, the parser will load `competitive-brief.md` (which is also referenced for Phase 2), potentially showing Phase 2's audience research as Phase 3's agent output.

**Fix:** Align on one filename. The `content-parser.ts` Phase 2 and Phase 3 both point to `competitive-brief.md`, which is the filename referenced in `CLAUDE.md` as the Research Analyst's output. Update `phase-utils.ts` Phase 3 to match, or update `content-parser.ts` line 62 to use `competitive-landscape.md` if that's the intended filename.

---

### IN-02: Section extractor does not stop on a leading '---' divider

**File:** `src/lib/content-parser.ts:25`

**Issue:** The stop condition for a `---` divider is `line.trim() === '---' && result.length > 0`. If a `---` line appears as the very first line under a `## Section` heading (before any content has been pushed to `result`), it is not treated as a stop marker — capturing continues past it. This edge case is unlikely in practice but could silently include frontmatter-style dividers or document separators that appear at the start of a markdown section.

**Fix:** Remove the `result.length > 0` guard if `---` should always terminate a section:

```ts
if (line.startsWith('## ') || line.trim() === '---') {
  break
}
```

If the guard was intentional (to allow `---` within initial frontmatter), document the reasoning in a comment.

---

### IN-03: getRecommendedPacks silently returns empty for unknown clientType

**File:** `src/lib/phase-utils.ts:208-247`

**Issue:** `getRecommendedPacks` lowercases `clientType` and then compares it with `includes()` against exact string literals (`'startup'`, `'agency'`, etc.). The `ClientType` union in `brand.ts` includes `'other'` and allows arbitrary strings via `ClientType | string` in `ClientProfile`. Any client typed as `'other'`, empty string, or a free-text type not in the known list will match zero recommendations and return an empty array silently. There is no fallback or default recommendation set.

**Fix:** Add a fallback recommendation set for unknown or `'other'` types, or document that `[]` is the intentional return:

```ts
// After all specific checks:
if (recs.length === 0) {
  // Minimum useful recommendation for any client
  recs.push('social-media-kit')
}
```

---

_Reviewed: 2026-04-19_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
