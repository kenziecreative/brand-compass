# Phase 14: Token Path Fix - Research

**Researched:** 2026-04-21
**Domain:** HTML relative path correction in agent definition files
**Confidence:** HIGH

## Summary

Phase 14 is a surgical two-file text correction. The v2.0 milestone audit found a single category of bug across two agent definition files: root-level design-kit HTML files (`brand-foundation.html`, `color-palette.html`, `landing-page.html`) are written with `href="../tokens/..."` link tags instead of `href="tokens/..."`. Because these files are at the `workspace/output/design-kit/` root — not in a subdirectory — `../tokens/` resolves one directory above, to the non-existent `workspace/output/tokens/`. The correct sibling path is `tokens/`.

The bug exists in the agent instruction text (prose and code examples) and in the Quality Bar of `design-kit-foundation.md`, and in the landing page task of `design-kit-packager.md`. Subdirectory files (`components/*.html`, `previews/*.html`) correctly use `../tokens/` and must NOT be changed.

No runtime output files exist yet (`workspace/output/design-kit/` does not exist), so this phase is a pure definition fix — update the agent instructions before any real engagement runs the agents.

**Primary recommendation:** Edit the two agent `.md` files to replace `../tokens/` with `tokens/` in exactly the locations that affect root-level HTML files. Add a clear path-depth rationale comment at each corrected location to prevent regression.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FOUN-02 | Document Assembler generates design-kit specimens with external token links; client specimens remain self-contained with inline tokens | Fix is in design-kit-foundation.md Task 2 instructions which govern the post-processing step that writes root-level specimens. Correcting `../tokens/` to `tokens/` in those instructions satisfies the "external token links resolve correctly" intent. |
| DKIT-05 | Reference specimens (brand-foundation.html copy, color-palette.html copy, new landing-page.html) | Fix is in design-kit-packager.md Task 3 (landing-page.html) instructions. Correcting the link path ensures the specimen renders styled in a browser. |
</phase_requirements>

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Token CSS delivery to root-level HTML files | Agent definition (design-kit-foundation) | Agent definition (design-kit-packager) | Both agents write root-level HTML; fixing the `<link>` href in their instructions is the only change needed. No runtime code involved. |
| Token CSS delivery to subdirectory HTML files | Agent definition (design-kit-packager) | — | components/ and previews/ files correctly use `../tokens/` — no change needed |
| Path resolution verification | Browser (static file open) | — | Success criterion is opening a file in a browser and confirming tokens load |

## Standard Stack

No libraries, package managers, or installs are involved. The fix is text substitution inside markdown agent definition files.

### Files Involved

| File | Lines to Change | Change Description |
|------|-----------------|-------------------|
| `.claude/agents/design-kit-foundation.md` | 250-254, 282 | `../tokens/` → `tokens/` in Task 2 `<link>` example and Quality Bar item |
| `.claude/agents/design-kit-packager.md` | 391-394 | `../tokens/` → `tokens/` in Task 3 landing-page.html `<link>` example |

## Architecture Patterns

### Path Depth Reference

The design-kit output layout:

```
workspace/output/design-kit/          ← ROOT (depth 0 relative to design-kit/)
├── brand-foundation.html             ← root-level file
├── color-palette.html                ← root-level file
├── landing-page.html                 ← root-level file
├── tokens/                           ← sibling of root-level files
│   ├── colors.css
│   ├── typography.css
│   └── spacing.css
├── components/                       ← subdirectory (depth 1)
│   └── button.html                   ← uses ../tokens/ (one up to design-kit/, then into tokens/)
└── previews/                         ← subdirectory (depth 1)
    └── colors.html                   ← uses ../tokens/
```

Path resolution from each file location:

| File Location | Correct href | Resolves To |
|---------------|-------------|-------------|
| `design-kit/brand-foundation.html` | `tokens/colors.css` | `design-kit/tokens/colors.css` |
| `design-kit/brand-foundation.html` | `../tokens/colors.css` | `output/tokens/colors.css` (WRONG — does not exist) |
| `design-kit/components/button.html` | `../tokens/colors.css` | `design-kit/tokens/colors.css` (correct) |
| `design-kit/previews/colors.html` | `../tokens/colors.css` | `design-kit/tokens/colors.css` (correct) |

### Pattern 1: Root-Level Link Tag (CORRECTED)

```html
<!-- Files at design-kit/ root — tokens/ is a sibling directory -->
<link rel="stylesheet" href="tokens/colors.css">
<link rel="stylesheet" href="tokens/typography.css">
<link rel="stylesheet" href="tokens/spacing.css">
```

### Pattern 2: Subdirectory Link Tag (UNCHANGED — already correct)

```html
<!-- Files in components/ or previews/ — one level down from design-kit/ root -->
<link rel="stylesheet" href="../tokens/colors.css">
<link rel="stylesheet" href="../tokens/typography.css">
<link rel="stylesheet" href="../tokens/spacing.css">
```

### Anti-Patterns to Avoid

- **Changing subdirectory paths:** `components/*.html` and `previews/*.html` correctly use `../tokens/`. Do not touch them.
- **Over-applying the fix:** The `README.md` developer example at design-kit-packager.md line 349 already uses `href="tokens/colors.css"` (correct for a root-level consumer reading docs). Do not change this line.
- **Fixing the wrong thing:** This is an agent *instruction* fix, not a regex or post-processing logic fix. The agent writes HTML based on example code in its instructions — correct the example, and the agent will write correct HTML.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead |
|---------|-------------|-------------|
| Path correctness at runtime | A path-rewriting post-processing script | Correct instructions in the agent definition — the agent writes the correct path from the start |
| Regression prevention | A separate validation script | A clear explanatory comment inside each corrected agent instruction block |

## Common Pitfalls

### Pitfall 1: Confusing the Quality Bar Line with the Task Instructions

**What goes wrong:** Developer fixes the `<link>` example code in Task 2 step d but misses the Quality Bar assertion at line 282 of design-kit-foundation.md, which still says `../tokens/` is "correct" for root-level files. The next run of the agent passes its self-check against the wrong criterion.

**Why it happens:** The Quality Bar is a separate section from the task instructions — easy to miss when scanning for href strings.

**How to avoid:** The fix must update BOTH the `<link>` example in the task AND the Quality Bar line that references the path.

**Warning signs:** If the Quality Bar still says `../tokens/` after the edit, the agent will self-validate against the wrong standard.

### Pitfall 2: Fixing design-kit-foundation but Missing design-kit-packager

**What goes wrong:** design-kit-foundation.md is corrected (brand-foundation.html, color-palette.html). design-kit-packager.md Task 3 (landing-page.html) still uses `../tokens/`. The landing page renders unstyled.

**Why it happens:** DKIT-05 is partially associated with Phase 12 (design-kit-packager), so it may not be the first file opened.

**How to avoid:** Treat the fix as a two-file atomic change — both files must be edited in the same plan wave.

### Pitfall 3: Changing Subdirectory Paths

**What goes wrong:** Developer replaces all `../tokens/` occurrences globally. This breaks components/ and previews/ files which correctly need `../tokens/`.

**Why it happens:** Mechanical "find and replace" without reading context.

**How to avoid:** The fix is scoped to root-level file instructions only. Read each location before editing. The subdirectory CRITICAL path rule comments in design-kit-packager.md lines 62-84 and 197 are correct and must stay unchanged.

### Pitfall 4: The Explanatory Comment in design-kit-foundation.md is Also Wrong

**What goes wrong:** The prose explanation at line 254 currently says `../tokens/` "is correct because design-kit HTML files sit at `workspace/output/design-kit/[filename].html` -- one level up from the tokens directory." This rationale is backwards — the files are NOT one level up from tokens; tokens is a sibling directory one level DOWN from the same root.

**Why it happens:** The comment was written with incorrect relative-path mental model.

**How to avoid:** The inline prose explanation must be corrected alongside the `<link>` example, otherwise the agent will be confused by contradictory instruction (corrected code example, wrong prose explanation).

## Precise Change Specification

### File 1: `.claude/agents/design-kit-foundation.md`

**Change A — Task 2 link example (lines 250-254)**

Current:
```
      <link rel="stylesheet" href="../tokens/colors.css">
      <link rel="stylesheet" href="../tokens/typography.css">
      <link rel="stylesheet" href="../tokens/spacing.css">
      ```
      The relative path `../tokens/` is correct because design-kit HTML files sit at `workspace/output/design-kit/[filename].html` -- one level up from the tokens directory at `workspace/output/design-kit/tokens/`.
```

Replace with:
```
      <link rel="stylesheet" href="tokens/colors.css">
      <link rel="stylesheet" href="tokens/typography.css">
      <link rel="stylesheet" href="tokens/spacing.css">
      ```
      The relative path `tokens/` is correct because design-kit HTML files sit at `workspace/output/design-kit/[filename].html` -- at the same level as the `tokens/` directory, which is a sibling (not a parent). Using `../tokens/` would resolve to `workspace/output/tokens/` which does not exist.
```

**Change B — Quality Bar (line 282)**

Current:
```
- External `<link>` tags use relative paths (`../tokens/`) -- correct because design-kit HTML files sit at `workspace/output/design-kit/` alongside the `tokens/` directory
```

Replace with:
```
- External `<link>` tags use relative paths (`tokens/`) -- correct because design-kit HTML files sit at `workspace/output/design-kit/` alongside the `tokens/` sibling directory (NOT `../tokens/` which would resolve to the non-existent `workspace/output/tokens/`)
```

---

### File 2: `.claude/agents/design-kit-packager.md`

**Change C — Task 3 landing-page.html link example (lines 389-397)**

Current:
```
**Token link pattern — ONE level up because landing-page.html is at design-kit root:**

```html
<link rel="stylesheet" href="../tokens/colors.css">
<link rel="stylesheet" href="../tokens/typography.css">
<link rel="stylesheet" href="../tokens/spacing.css">
```

Do NOT use `../../tokens/` for this file. It sits at `workspace/output/design-kit/landing-page.html`, one level above the `tokens/` directory — not two levels.
```

Replace with:
```
**Token link pattern — sibling directory because landing-page.html is at design-kit root:**

```html
<link rel="stylesheet" href="tokens/colors.css">
<link rel="stylesheet" href="tokens/typography.css">
<link rel="stylesheet" href="tokens/spacing.css">
```

Do NOT use `../tokens/` for this file. It sits at `workspace/output/design-kit/landing-page.html` — at the same level as `tokens/`, which is a sibling directory. `../tokens/` would resolve to the non-existent `workspace/output/tokens/`.
```

## Code Examples

### Verified Path Mapping [VERIFIED: filesystem inspection]

```
workspace/output/design-kit/      ← confirmed absent (no live output yet)
```

The path analysis below is verified by directory structure defined in `.claude/agents/design-kit-foundation.md` Output section (lines 268-274) and `.claude/agents/design-kit-packager.md` which confirms components/ and previews/ as subdirectories.

```
File: workspace/output/design-kit/brand-foundation.html
Target: workspace/output/design-kit/tokens/colors.css
Relative: tokens/colors.css   ← correct (sibling directory)

File: workspace/output/design-kit/components/button.html
Target: workspace/output/design-kit/tokens/colors.css
Relative: ../tokens/colors.css  ← correct (parent then sibling)
```

## Runtime State Inventory

This is a configuration-correction phase (agent instruction text). No runtime state is involved.

| Category | Items Found | Action Required |
|----------|-------------|-----------------|
| Stored data | None — no design-kit output exists yet | None |
| Live service config | None | None |
| OS-registered state | None | None |
| Secrets/env vars | None | None |
| Build artifacts | None — `workspace/output/design-kit/` does not exist | None |

**Nothing to migrate.** The agent definitions are the only source of truth for how agents write output. Fixing the instructions prevents incorrect output from ever being written.

## Environment Availability

Step 2.6: SKIPPED — this phase makes no external dependencies. All changes are text edits to markdown files already in the repository.

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Manual browser open (no automated test framework applicable to HTML path resolution in agent-written output) |
| Config file | None |
| Quick run command | `open workspace/output/design-kit/brand-foundation.html` (after a test run) |
| Full suite command | Open all three root-level HTML files in browser; confirm styled output loads |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FOUN-02 | Root-level design-kit specimens load token CSS and render styled | manual-only | `grep -n 'href="tokens/' .claude/agents/design-kit-foundation.md` (static verification) | ❌ Wave 0 (grep check added in Wave 0) |
| DKIT-05 | landing-page.html loads token CSS and renders styled | manual-only | `grep -n 'href="tokens/' .claude/agents/design-kit-packager.md` (static verification) | ❌ Wave 0 (grep check added in Wave 0) |

**Note:** The automated command column lists a static grep that can confirm the agent instructions contain the correct path strings. Full end-to-end browser verification requires a real engagement run which is out of scope for this phase.

### Sampling Rate

- **Per task commit:** `grep -c 'href="../tokens/' .claude/agents/design-kit-foundation.md .claude/agents/design-kit-packager.md` (should return 0 for root-level contexts)
- **Per wave merge:** Same grep across both files
- **Phase gate:** Both grep checks return 0 occurrences in root-level contexts before `/gsd-verify-work`

### Wave 0 Gaps

- [ ] No test infrastructure needed — static grep is sufficient and requires no setup

## Security Domain

Not applicable. This phase edits agent instruction text with no authentication, session management, input validation, or cryptographic concerns.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | No live design-kit output files exist yet (workspace/output/design-kit/ absent) | Runtime State Inventory | If output exists, it was generated with the wrong paths and would need to be regenerated — but this is not a code change, just a re-run of the agents |

**One assumed claim:** The assertion that no output exists was verified by filesystem inspection (`ls` returned empty), so this is effectively VERIFIED. The assumption log entry is included for completeness.

## Open Questions

None. The audit is thorough and the fix scope is unambiguous.

## Sources

### Primary (HIGH confidence)

- `.planning/v2.0-MILESTONE-AUDIT.md` — audit document with exact line numbers, file paths, and root cause analysis [VERIFIED: file read in this session]
- `.claude/agents/design-kit-foundation.md` — current agent instructions with confirmed buggy lines [VERIFIED: file read in this session]
- `.claude/agents/design-kit-packager.md` — current agent instructions with confirmed buggy lines [VERIFIED: file read in this session]
- HTML relative path resolution spec — `href="tokens/X"` from a sibling context vs `href="../tokens/X"` from a subdirectory context is standard browser behavior [VERIFIED: path analysis against known directory layout]

## Metadata

**Confidence breakdown:**
- Bug location: HIGH — exact line numbers confirmed by reading both files
- Fix correctness: HIGH — path depth analysis is deterministic given known directory layout
- Scope (no other files affected): HIGH — audit scoped the issue to these two files and these specific contexts; README.md line 349 already uses correct `tokens/` path

**Research date:** 2026-04-21
**Valid until:** Indefinite — this is a static text correction with no external dependencies
